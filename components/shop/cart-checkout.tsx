'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, CalendarCheck, Check, Clock, CreditCard, Loader2, Lock, Minus, Plus, ShoppingBag, Trash2, XCircle } from 'lucide-react'
import { DemoBanner, SelectField, TextAreaField, TextField, isEmail, primaryButton } from '@/components/academy/form-kit'
import { MAX_QUANTITY, useCart, type CartLine } from '@/components/shop/cart'
import { MembershipDiscountNotice, ProductVisual } from '@/components/shop/product-bits'
import { GSTIN } from '@/components/shop/shop-forms'
import { focusRing } from '@/components/locations/primitives'
import { COLLECTION_POINTS, DEMO_CHARGES, HYGIENE_POLICY, INDIAN_STATES, formatINR, productHref } from '@/lib/shop'
import { createOrder, getOrder, getOrders, type Order, type OrderStatus } from '@/lib/shop-service'

const INDIAN_PHONE = /^(\+91[\s-]?)?[6-9]\d{9}$/
const PIN = /^[1-9]\d{5}$/

/** Totals are complete only when every mandatory charge is known; in the demo shop they use labelled demo charges. */
export function useTotals() {
  const { subtotal, demo, lines } = useCart()
  const known = demo
  const shipping = known ? DEMO_CHARGES.shipping : undefined
  const tax = known ? Math.round((subtotal + (shipping ?? 0)) * DEMO_CHARGES.gstRate) : undefined
  const total = shipping !== undefined && tax !== undefined ? subtotal + shipping + tax : undefined
  const blocked = lines.some((line) => !line.available)
  return { subtotal, shipping, tax, total, demo, blocked }
}

export function OrderSummary({ compact = false }: { compact?: boolean }) {
  const { subtotal, shipping, tax, total, demo } = useTotals()
  const { lines } = useCart()
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
      <h2 className="font-display text-xl font-bold">Order summary</h2>
      {compact && <ul className="mt-4 space-y-2 border-b border-mist pb-4 text-sm">{lines.map((line) => <li key={line.key} className="flex justify-between gap-3"><span>{line.quantity} × {line.product.name}{Object.values(line.options).length > 0 && <span className="text-slate"> ({Object.values(line.options).join(', ')})</span>}</span><span className="shrink-0">{line.unitPrice !== undefined ? formatINR(line.unitPrice * line.quantity) : '—'}</span></li>)}</ul>}
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
        <div className="flex justify-between text-slate"><dt>Member discount</dt><dd>Not applied — verification not connected</dd></div>
        <div className="flex justify-between"><dt>Shipping{demo && ' (demo)'}</dt><dd>{shipping !== undefined ? formatINR(shipping) : 'Calculated once configured'}</dd></div>
        <div className="flex justify-between"><dt>GST{demo && ` (demo ${DEMO_CHARGES.gstRate * 100}%)`}</dt><dd>{tax !== undefined ? formatINR(tax) : 'Calculated once configured'}</dd></div>
        <div className="flex justify-between border-t border-mist pt-3 font-display text-lg font-bold"><dt>Total payable</dt><dd>{total !== undefined ? formatINR(total) : 'Not yet available'}</dd></div>
      </dl>
    </div>
  )
}

function CartItemRow({ line }: { line: CartLine }) {
  const { update, remove } = useCart()
  return (
    <li className="flex gap-4 py-5">
      <a href={productHref(line.product)} className="size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28" tabIndex={-1} aria-hidden><ProductVisual product={line.product} className="size-full" label={false} /></a>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <a href={productHref(line.product)} className="font-display text-lg font-bold hover:text-teal">{line.product.name}</a>
            {Object.entries(line.options).map(([k, v]) => <p key={k} className="text-xs capitalize text-slate">{k}: {v}</p>)}
            <p className="mt-1 text-sm text-slate-strong">{line.unitPrice !== undefined ? `${formatINR(line.unitPrice)} each` : 'Price to be confirmed'}</p>
          </div>
          <p className="shrink-0 font-bold">{line.unitPrice !== undefined ? formatINR(line.unitPrice * line.quantity) : '—'}</p>
        </div>
        {!line.available && <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-danger"><AlertCircle className="size-3.5" aria-hidden />No longer available. Remove it to continue.</p>}
        {line.product.hygieneRestricted && <p className="mt-2 text-xs text-sand-ink">{HYGIENE_POLICY}</p>}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full border border-line" role="group" aria-label={`Quantity of ${line.product.name}`}>
            <button type="button" onClick={() => update(line.key, line.quantity - 1)} disabled={line.quantity <= 1} className={`flex size-11 items-center justify-center rounded-full disabled:opacity-40 ${focusRing}`} aria-label="Decrease quantity"><Minus className="size-4" /></button>
            <span className="w-8 text-center text-sm font-bold" aria-live="polite">{line.quantity}</span>
            <button type="button" onClick={() => update(line.key, line.quantity + 1)} disabled={line.quantity >= MAX_QUANTITY} className={`flex size-11 items-center justify-center rounded-full disabled:opacity-40 ${focusRing}`} aria-label="Increase quantity"><Plus className="size-4" /></button>
          </div>
          <button type="button" onClick={() => remove(line.key)} className={`inline-flex min-h-11 items-center gap-1 rounded px-2 text-sm font-semibold text-slate hover:text-danger ${focusRing}`} aria-label={`Remove ${line.product.name}`}><Trash2 className="size-4" aria-hidden />Remove</button>
        </div>
      </div>
    </li>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-ink/5">
      <ShoppingBag className="size-10 text-teal" strokeWidth={1.4} aria-hidden />
      <h2 className="mt-4 font-display text-2xl font-bold">Your cart is empty</h2>
      <p className="mt-2 text-sm text-slate">Find something for your next time on the water.</p>
      <a href="/shop" className={`mt-6 ${primaryButton}`}>Shop now</a>
    </div>
  )
}

export function CartView() {
  const { lines, hydrated, demo } = useCart()
  const { blocked } = useTotals()
  if (!hydrated) return <div className="h-64 animate-pulse rounded-3xl bg-white" aria-busy="true" />
  if (!lines.length) return <EmptyCart />
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div>
        <ul className="divide-y divide-mist rounded-3xl bg-white px-5 ring-1 ring-ink/5 sm:px-6">{lines.map((line) => <CartItemRow key={line.key} line={line} />)}</ul>
        <a href="/shop" className={`mt-4 inline-flex min-h-11 items-center text-sm font-bold text-teal ${focusRing}`}><ArrowLeft className="mr-1 size-4" aria-hidden />Continue shopping</a>
        {lines.some((line) => line.product.bookingAddOnEligible) && (
          <p className="mt-4 flex gap-2 rounded-2xl bg-mist p-4 text-sm text-slate-strong"><CalendarCheck className="size-5 shrink-0 text-teal" aria-hidden />Some items can be added to a paddle booking for collection at the jetty. This will be offered here once booking-linked purchases are connected; for now they’re a separate order.</p>
        )}
      </div>
      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <OrderSummary />
        <MembershipDiscountNotice compact />
        {blocked
          ? <p className="text-sm font-semibold text-danger" role="alert">Remove unavailable items to continue.</p>
          : <a href="/checkout" className={`${primaryButton} w-full`}>Proceed to checkout <ArrowRight className="ml-2 size-4" aria-hidden /></a>}
        {demo && <p className="text-center text-xs text-slate">Demo shop: stock is checked with the inventory service before any real order.</p>}
      </aside>
    </div>
  )
}

const STEPS = ['Contact', 'Delivery', 'Review', 'Payment']

export function CheckoutFlow() {
  const router = useRouter()
  const { lines, hydrated, demo } = useCart()
  const { total, blocked } = useTotals()
  const [step, setStep] = useState(0)
  const [method, setMethod] = useState<'delivery' | 'collect'>('delivery')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [data, setData] = useState<Record<string, string>>({})
  const [paying, setPaying] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => { if (step) headingRef.current?.focus() }, [step])
  // Focus the first invalid field once the error state has rendered.
  useEffect(() => { if (attempt) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus() }, [attempt])

  if (!hydrated) return <div className="h-64 animate-pulse rounded-3xl bg-white" aria-busy="true" />
  if (!lines.length) return <EmptyCart />
  if (blocked) return <p className="rounded-3xl bg-white p-6 text-sm">Some items in your cart are unavailable. <a href="/cart" className="font-bold text-teal">Review your cart</a>.</p>

  const collectAvailable = COLLECTION_POINTS.length > 0 && lines.every((line) => line.product.clickAndCollectEligible)

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>
    const e: Record<string, string> = {}
    if (step === 0) {
      if (!form.name?.trim()) e.name = 'Enter your full name.'
      if (!isEmail(form.email ?? '')) e.email = 'Enter a valid email address.'
      if (!INDIAN_PHONE.test((form.phone ?? '').replace(/\s/g, ''))) e.phone = 'Enter a 10-digit Indian mobile number.'
    }
    if (step === 1 && method === 'delivery') {
      if (!form.address?.trim()) e.address = 'Enter your address.'
      if (!form.city?.trim()) e.city = 'Enter your city.'
      if (!form.state) e.state = 'Select your state.'
      if (!PIN.test(form.pin ?? '')) e.pin = 'Enter a valid 6-digit PIN code.'
    }
    if (step === 1 && method === 'collect' && !form.collectionPoint) e.collectionPoint = 'Choose a collection point.'
    if (step === 2 && form.gst && !GSTIN.test(form.gst.trim().toUpperCase())) e.gst = 'Enter a valid 15-character GSTIN.'
    setErrors(e)
    if (Object.keys(e).length) { setAttempt((n) => n + 1); return }
    setData({ ...data, ...form })
    setStep(step + 1)
  }

  async function pay() {
    setPaying(true)
    const result = await createOrder({ items: lines.map(({ slug, options, quantity }) => ({ slug, options, quantity })), fulfilment: method, customer: data })
    setPaying(false)
    // The server would return a gateway URL; confirmation is shown only for an order it confirms.
    if (result.ok) window.location.href = result.data.paymentUrl
    else router.push(`/checkout/confirmation?status=${result.reason}`)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5 sm:p-8">
        {demo && <div className="mb-6"><DemoBanner><strong>Demo shop.</strong> Prices, shipping and GST are examples. No order is created and no payment is taken.</DemoBanner></div>}
        <ol className="grid grid-cols-4 gap-1.5" aria-label="Checkout progress">
          {STEPS.map((label, i) => <li key={label} aria-current={i === step ? 'step' : undefined}><div className={`h-1.5 rounded-full ${i <= step ? 'bg-sand' : 'bg-line'}`} /><p className={`mt-2 text-xs font-bold ${i === step ? 'text-ink' : 'text-slate'}`}>{i < step && <Check className="mr-1 inline size-3.5 text-success" aria-hidden />}{label}</p></li>)}
        </ol>
        <h2 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-2xl font-bold outline-none">{['Contact information', 'Delivery or collection', 'Review your order', 'Payment'][step]}</h2>

        {step < 3 ? (
          <form ref={formRef} onSubmit={next} noValidate className="mt-6 space-y-4" key={step}>
            {step === 0 && (
              <>
                <p className="text-sm text-slate">Checking out as a guest. <span className="font-semibold">Sign in</span> will be available once Bond accounts are connected; you won’t need an account to buy.</p>
                <TextField label="Full name" name="name" autoComplete="name" defaultValue={data.name} error={errors.name} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Email" name="email" type="email" autoComplete="email" defaultValue={data.email} error={errors.email} />
                  <TextField label="Mobile number" name="phone" type="tel" autoComplete="tel" placeholder="+91" defaultValue={data.phone} error={errors.phone} />
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <fieldset>
                  <legend className="sr-only">Fulfilment method</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {([['delivery', 'Delivery across India', true, ''], ['collect', 'Click-and-collect', collectAvailable, COLLECTION_POINTS.length ? 'Not every item in your cart can be collected.' : 'No collection points are configured yet.']] as const).map(([id, label, enabled, reason]) => (
                      <label key={id} className={`flex min-h-14 flex-col justify-center rounded-2xl border p-4 has-focus-visible:ring-2 has-focus-visible:ring-teal ${enabled ? 'cursor-pointer' : 'opacity-60'} ${method === id ? 'border-ink bg-paper-bright' : 'border-line'}`}>
                        <input type="radio" name="method" value={id} checked={method === id} disabled={!enabled} onChange={() => setMethod(id)} className="sr-only" />
                        <span className="font-bold">{label}</span>{!enabled && <span className="text-xs text-slate">{reason}</span>}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {method === 'delivery' ? (
                  <>
                    <TextField label="Address" name="address" autoComplete="street-address" defaultValue={data.address} error={errors.address} />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <TextField label="City" name="city" autoComplete="address-level2" defaultValue={data.city} error={errors.city} />
                      <SelectField label="State" name="state" options={INDIAN_STATES} defaultValue={data.state} error={errors.state} />
                      <TextField label="PIN code" name="pin" inputMode="numeric" autoComplete="postal-code" defaultValue={data.pin} error={errors.pin} />
                    </div>
                    <TextAreaField label="Delivery instructions" name="instructions" optional rows={2} defaultValue={data.instructions} />
                  </>
                ) : (
                  <SelectField label="Collection point" name="collectionPoint" options={COLLECTION_POINTS.map((p) => p.name)} error={errors.collectionPoint} />
                )}
              </>
            )}
            {step === 2 && (
              <>
                <ul className="divide-y divide-mist text-sm">{lines.map((line) => <li key={line.key} className="flex justify-between gap-3 py-3"><span>{line.quantity} × {line.product.name}{Object.values(line.options).length > 0 && <span className="text-slate"> · {Object.values(line.options).join(', ')}</span>}</span><span className="font-semibold">{formatINR((line.unitPrice ?? 0) * line.quantity)}</span></li>)}</ul>
                <p className="rounded-2xl bg-paper-bright p-4 text-sm"><strong>{method === 'delivery' ? 'Delivering to' : 'Collecting from'}:</strong> {method === 'delivery' ? `${data.address}, ${data.city}, ${data.state} ${data.pin}` : data.collectionPoint}</p>
                {lines.some((line) => line.product.hygieneRestricted) && <p className="flex gap-2 rounded-xl bg-sand-soft p-3 text-xs font-semibold text-sand-ink"><AlertTriangle className="size-4 shrink-0" aria-hidden />{HYGIENE_POLICY}</p>}
                <TextField label="Business GST number" name="gst" optional hint="For a GST invoice." defaultValue={data.gst} error={errors.gst} />
                <TextField label="Business name" name="business" optional defaultValue={data.business} />
              </>
            )}
            <div className="flex justify-between border-t border-mist pt-5">
              {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className={`inline-flex min-h-12 items-center px-3 text-sm font-bold ${focusRing}`}><ArrowLeft className="mr-2 size-4" aria-hidden />Back</button> : <a href="/cart" className={`inline-flex min-h-12 items-center px-3 text-sm font-bold ${focusRing}`}><ArrowLeft className="mr-2 size-4" aria-hidden />Cart</a>}
              <button type="submit" className={primaryButton}>Continue <ArrowRight className="ml-2 size-4" aria-hidden /></button>
            </div>
          </form>
        ) : (
          <div className="mt-6 space-y-5">
            <p className="flex gap-3 rounded-2xl bg-paper-bright p-4 text-sm text-slate-strong"><Lock className="size-5 shrink-0 text-success" aria-hidden />You’ll pay on the payment provider’s secure page (UPI, cards or netbanking). Card details never touch this website.</p>
            <div className="flex justify-between font-display text-xl font-bold"><span>Total payable{demo && ' (demo)'}</span><span>{total !== undefined ? formatINR(total) : '—'}</span></div>
            <button type="button" onClick={pay} disabled={paying || total === undefined} className={`${primaryButton} w-full`}>{paying ? <Loader2 className="mr-2 size-4 animate-spin" aria-hidden /> : <CreditCard className="mr-2 size-4" aria-hidden />}{demo ? 'Pay (demo — no charge)' : 'Pay securely'}</button>
            {total === undefined && <p className="text-xs text-danger">Payment opens once every charge (shipping, GST) can be shown before you pay.</p>}
            <button type="button" onClick={() => setStep(2)} className={`inline-flex min-h-11 items-center text-sm font-bold ${focusRing}`}><ArrowLeft className="mr-2 size-4" aria-hidden />Back to review</button>
          </div>
        )}
      </div>
      <aside className="lg:sticky lg:top-6 lg:self-start"><OrderSummary compact /></aside>
    </div>
  )
}

const statusView: Record<OrderStatus | 'not-connected' | 'error', { icon: typeof Check; title: string; text: string; tone: string }> = {
  confirmed: { icon: Check, title: 'Order confirmed', text: 'Thank you. We’ve emailed your confirmation.', tone: 'bg-success-soft text-success' },
  'payment-pending': { icon: Clock, title: 'Payment pending', text: 'We’re waiting for your payment provider to confirm. This page updates once it does.', tone: 'bg-sand-soft text-sand-ink' },
  'payment-failed': { icon: XCircle, title: 'Payment failed', text: 'No money was taken. You can try again.', tone: 'bg-danger-soft text-danger' },
  cancelled: { icon: XCircle, title: 'Order cancelled', text: 'This order was cancelled.', tone: 'bg-mist text-slate-strong' },
  refunded: { icon: Check, title: 'Order refunded', text: 'Your payment has been refunded.', tone: 'bg-mist text-slate-strong' },
  'not-connected': { icon: AlertCircle, title: 'No order was created', text: 'Checkout and payment aren’t connected yet, so no order was placed and no payment was taken. Your cart is unchanged.', tone: 'bg-sand-soft text-sand-ink' },
  error: { icon: AlertCircle, title: 'We couldn’t load this order', text: 'Please try again in a moment.', tone: 'bg-danger-soft text-danger' },
}

export function OrderStatusView({ order, state }: { order?: Order; state: keyof typeof statusView }) {
  const view = statusView[state]
  const Icon = view.icon
  return (
    <div className="space-y-6">
      <div className={`flex gap-4 rounded-3xl p-6 ${view.tone}`} role="status">
        <Icon className="size-8 shrink-0" aria-hidden />
        <div><h2 className="font-display text-2xl font-bold">{view.title}</h2><p className="mt-1 text-sm">{view.text}</p></div>
      </div>
      {order && (
        <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
          <p className="text-sm text-slate">Order reference <strong className="text-ink">{order.reference}</strong></p>
          <ul className="mt-4 divide-y divide-mist text-sm">{order.items.map((item) => <li key={item.name + JSON.stringify(item.options)} className="flex justify-between py-2"><span>{item.quantity} × {item.name}</span><span>{formatINR(item.unitPrice * item.quantity)}</span></li>)}</ul>
          <p className="mt-4 text-sm">{order.fulfilment.method === 'delivery' ? 'Delivery' : 'Collection'}: {order.fulfilment.detail}</p>
          <p className="mt-2 font-display text-lg font-bold">Total {formatINR(order.total)}</p>
          {order.invoiceUrl && <a href={order.invoiceUrl} className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-teal">Download GST invoice</a>}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {(state === 'payment-failed' || state === 'not-connected') && <a href="/checkout" className={primaryButton}>Try again</a>}
        {order && <a href={`/account/orders/${order.reference}`} className={`inline-flex min-h-12 items-center rounded-2xl border border-ink/20 px-6 text-sm font-bold ${focusRing}`}>View order</a>}
        <a href="/shop" className={`inline-flex min-h-12 items-center rounded-2xl border border-ink/20 px-6 text-sm font-bold ${focusRing}`}>Continue shopping</a>
      </div>
    </div>
  )
}

/** Confirmation reads the order from the server by reference; it never trusts query-string status. */
export function ConfirmationView() {
  const [state, setState] = useState<{ order?: Order; view: keyof typeof statusView } | null>(null)
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (!ref) return setState({ view: 'not-connected' })
    getOrder(ref).then((r) => setState(r.ok ? { order: r.data, view: r.data.status } : { view: r.reason === 'not-connected' ? 'not-connected' : 'error' }))
  }, [])
  if (!state) return <div className="flex min-h-48 items-center justify-center"><Loader2 className="size-8 animate-spin text-teal" aria-label="Loading order" /></div>
  return <OrderStatusView order={state.order} state={state.view} />
}

export function OrdersView({ reference }: { reference?: string }) {
  const [state, setState] = useState<'loading' | 'signed-out' | 'ready'>('loading')
  const [orders, setOrders] = useState<Order[]>([])
  useEffect(() => {
    getOrders().then((r) => { if (r.ok) { setOrders(r.data); setState('ready') } else setState('signed-out') })
  }, [])
  if (state === 'loading') return <div className="flex min-h-48 items-center justify-center"><Loader2 className="size-8 animate-spin text-teal" aria-label="Loading orders" /></div>
  if (state === 'signed-out') {
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-ink/5">
        <ShoppingBag className="mx-auto size-10 text-teal" strokeWidth={1.4} aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold">Sign in to see your orders</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate">{reference ? `Order ${reference} can be viewed once you’re signed in.` : 'Your shop orders, invoices and returns live in your Bond account.'} Sign-in will be available once Bond accounts are connected to this site.</p>
        <button type="button" disabled className={`mt-6 ${primaryButton}`}>Sign in (coming soon)</button>
      </div>
    )
  }
  const shown = reference ? orders.filter((o) => o.reference === reference) : orders
  if (!shown.length) return <p className="rounded-3xl bg-white p-6 text-sm">{reference ? 'Order not found.' : 'You haven’t placed any orders yet.'} <a href="/shop" className="font-bold text-teal">Shop now</a></p>
  return <div className="space-y-4">{shown.map((order) => <OrderStatusView key={order.reference} order={order} state={order.status} />)}</div>
}
