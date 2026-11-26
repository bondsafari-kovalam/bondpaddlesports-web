/**
 * Shop service boundary for the shared Bond platform (one customer account, membership/Pearls,
 * booking engine, inventory and shop across Bond websites). Every call reports "not connected"
 * until the backend exists; the UI never fakes stock, discounts, orders or payments.
 *
 * Backend responsibilities when connected:
 * - Inventory: one stock record per product per location (central warehouse, each site kiosk,
 *   online, future hubs); reservations during checkout; decrement on confirmed sale; kiosk sales
 *   sync online; returns/exchanges/transfers update stock; no overselling.
 * - Pricing & tax: server re-prices every cart; GST invoices with HSN codes; company-specific
 *   invoice ownership for cross-company orders.
 * - Discounts: verify Bond Blue (15% eligible items) or Academy learner (10% kit, 30 days) on the
 *   server; one discount per order; never trust a client flag.
 * - Payments: Indian gateway (UPI, cards, netbanking) via hosted checkout; the site never sees card
 *   details; confirmation only after server-side verification (see bond-safari-website
 *   docs/booking-api.md for the shared hold/confirm pattern). No payment splitting until the
 *   common platform supports it.
 * - Booking add-ons: attach items to an active booking with jetty collection when configured.
 * - Admin: products, images, variants, SKUs, prices, stock by location, orders, returns, collection
 *   options, hygiene flags, bulk enquiries, starter kits; role checks enforced on the server.
 */
import { checked, keyFor, submitEnquiryTo, text, toE164, whole } from '@/lib/bond-api'
import { SHOP_CATEGORIES } from '@/lib/shop'

export const SHOP_BACKEND_CONNECTED = false

export type Result<T> = { ok: true; data: T } | { ok: false; reason: 'not-connected' | 'error'; message: string }
const notConnected = (what: string): Result<never> => ({ ok: false, reason: 'not-connected', message: `${what} is not connected yet.` })

export type StockLocation = 'warehouse' | 'online' | `kiosk:${string}` | `hub:${string}`
export type StockLevel = { sku: string; location: StockLocation; available: number }

export async function getStock(_skus: string[]): Promise<Result<StockLevel[]>> {
  return notConnected('Inventory')
}

export type VerifiedDiscount = { kind: 'bond-blue' | 'academy-learner'; percent: number; eligibleSkus: string[] }

/** Returns at most one verified discount for the signed-in customer. */
export async function verifyMemberDiscount(_skus: string[]): Promise<Result<VerifiedDiscount | null>> {
  return notConnected('Membership verification')
}

export type ActiveBooking = { reference: string; activity: string; location: string; date: string; collectionPoint?: string }

export async function getActiveBooking(): Promise<Result<ActiveBooking | null>> {
  return notConnected('Booking linking')
}

export type OrderStatus = 'confirmed' | 'payment-pending' | 'payment-failed' | 'cancelled' | 'refunded'
export type Order = {
  reference: string
  status: OrderStatus
  items: { name: string; options: Record<string, string>; quantity: number; unitPrice: number }[]
  fulfilment: { method: 'delivery' | 'collect'; detail: string }
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  invoiceUrl?: string
}

export async function createOrder(_payload: Record<string, unknown>): Promise<Result<{ reference: string; paymentUrl: string }>> {
  return notConnected('Checkout and payment')
}

export async function getOrder(_reference: string): Promise<Result<Order>> {
  return notConnected('Order lookup')
}

export async function getOrders(): Promise<Result<Order[]>> {
  return notConnected('Customer accounts')
}

const PRODUCT_INTEREST_KEYS = ['apparel', 'waterwear', 'paddling_equipment', 'academy_starter_kits', 'sup_boards_and_kayaks'] as const
const QUANTITY_LABELS = ['1', '2–5', '6+']
const QUANTITY_KEYS = ['1', '2_to_5', '6_plus'] as const

/** Shop enquiry forms → Bond backend (bulk-order quote, made-to-order request). */
export async function submitShopEnquiry(kind: 'bulk-order' | 'made-to-order', payload: Record<string, unknown>): Promise<Result<{ reference: string }>> {
  if (kind === 'bulk-order') {
    return submitEnquiryTo('/enquiries/bulk-order', {
      organisation: text(payload.organisation),
      name: text(payload.name),
      email: text(payload.email),
      phone: toE164(payload.phone),
      productInterest: keyFor(payload.interest, SHOP_CATEGORIES.map((category) => category.name), PRODUCT_INTEREST_KEYS),
      quantity: whole(payload.quantity),
      deliveryDate: text(payload.date),
      gstNumber: text(payload.gst),
      branding: text(payload.branding),
      consent: checked(payload.consent),
    })
  }
  return submitEnquiryTo('/enquiries/made-to-order', {
    product: text(payload.product),
    name: text(payload.name),
    email: text(payload.email),
    phone: toE164(payload.phone),
    quantity: keyFor(payload.quantity, QUANTITY_LABELS, QUANTITY_KEYS),
    message: text(payload.message),
    consent: checked(payload.consent),
  })
}
