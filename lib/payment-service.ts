/**
 * Online booking with payment (Razorpay Checkout), used by /book when every activity has a time chosen:
 *
 *   POST /bookings/group      one booking per activity (seats held ~15 min), one guest token
 *   POST /payments/order      ONE Razorpay order for the summed deposit (amount computed by the server)
 *   Razorpay Checkout         the guest pays in Razorpay's own window (card/UPI data never touches this site)
 *   POST /payments/verify     the server checks the signature and the payment with Razorpay, then confirms
 *
 * Only the public key id reaches the browser (from the order response); the key secret stays on the backend.
 */

import { bondApi, toE164, type ApiResult } from '@/lib/bond-api'
import type { BookingDraft } from '@/lib/group-booking'

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js'

type Group = { groupReference: string; accessToken: string; bookings: { reference: string }[] }

type Checkout = {
  keyId: string
  orderId: string
  amount: number
  amountMinor: string
  currency: string
  name: string
  description: string
  prefill: { name: string; email: string; contact: string }
  notes: Record<string, string>
}

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }

type RazorpayInstance = { open: () => void; on: (event: string, handler: (response: unknown) => void) => void }
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance
  }
}

export type PaymentOutcome =
  | { ok: true; reference: string; paidMinor: string; currency: string; outcome: string }
  | { ok: false; reason: 'dismissed' | 'expired' | 'not-connected' | 'error'; message: string; code?: string }

let scriptLoading: Promise<boolean> | null = null

/** Loads Razorpay Checkout once; resolves false when it cannot be loaded (offline, blocked). */
function loadCheckout(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.Razorpay) return Promise.resolve(true)
  scriptLoading ??= new Promise<boolean>((resolve) => {
    const script = document.createElement('script')
    script.src = CHECKOUT_SCRIPT
    script.async = true
    script.onload = () => resolve(!!window.Razorpay)
    script.onerror = () => {
      scriptLoading = null
      resolve(false)
    }
    document.body.appendChild(script)
  })
  return scriptLoading
}

/** Opens Checkout; resolves with Razorpay's success response, or null when the guest closes the window. */
function openCheckout(checkout: Checkout): Promise<RazorpayResponse | null> {
  return new Promise((resolve) => {
    const Razorpay = window.Razorpay!
    const instance = new Razorpay({
      key: checkout.keyId,
      order_id: checkout.orderId,
      amount: checkout.amount,
      currency: checkout.currency,
      name: checkout.name,
      description: checkout.description,
      prefill: checkout.prefill,
      notes: checkout.notes,
      handler: (response: RazorpayResponse) => resolve(response),
      modal: { ondismiss: () => resolve(null), confirm_close: true },
    })
    // A failed attempt keeps the window open so the guest can retry with another method; nothing to do here.
    instance.on('payment.failed', () => {})
    instance.open()
  })
}

const failure = (result: Extract<ApiResult<unknown>, { ok: false }>): PaymentOutcome => {
  if (result.reason === 'not-connected') return { ok: false, reason: 'not-connected', message: result.message }
  if (result.code === 'HOLD_EXPIRED') return { ok: false, reason: 'expired', message: result.message, code: result.code }
  return { ok: false, reason: 'error', message: result.message, code: result.code }
}

/**
 * Books every activity of the draft and takes the deposit in one Razorpay payment. `idempotencyKey` is reused for
 * retries of the same draft: the backend then returns the same bookings (and reuses the open order) instead of
 * holding seats twice.
 */
export async function bookAndPay(draft: BookingDraft, idempotencyKey: string): Promise<PaymentOutcome> {
  const group = await bondApi<Group>('/bookings/group', {
    idempotencyKey,
    body: {
      items: draft.picks.map((pick) => ({ sessionId: pick.sessionId, seats: pick.people })),
      contact: { name: draft.lead.name.trim(), email: draft.lead.email.trim(), phone: toE164(draft.lead.phone) },
      termsAccepted: true,
    },
  })
  if (!group.ok) return failure(group)
  const headers = { 'X-Booking-Token': group.data.accessToken }

  const order = await bondApi<{ checkout: Checkout }>('/payments/order', {
    headers,
    body: { groupReference: group.data.groupReference },
  })
  if (!order.ok) return failure(order)

  if (!(await loadCheckout())) {
    return { ok: false, reason: 'error', message: 'The payment window could not be loaded. Check your connection and try again.' }
  }
  const paid = await openCheckout(order.data.checkout)
  if (!paid) return { ok: false, reason: 'dismissed', message: 'Payment was not completed.' }

  const verified = await bondApi<{ outcome: string }>('/payments/verify', { body: paid })
  if (!verified.ok) return failure(verified)
  return {
    ok: true,
    reference: group.data.groupReference,
    paidMinor: order.data.checkout.amountMinor,
    currency: order.data.checkout.currency,
    outcome: verified.data.outcome,
  }
}
