'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertTriangle, CalendarCheck, Check, ChevronDown, Minus, Plus, Ruler, ShoppingBag, Store, Truck, X } from 'lucide-react'
import { CheckboxField, SelectField, ServiceForm, TextAreaField, TextField, isEmail, isPhone } from '@/components/academy/form-kit'
import { DemoShopToggle, MAX_QUANTITY, useCart } from '@/components/shop/cart'
import { MembershipDiscountNotice, ProductPrice, ProductStockStatus, ProductVisual } from '@/components/shop/product-bits'
import { Pending, focusRing } from '@/components/locations/primitives'
import { COLLECTION_POINTS, HYGIENE_POLICY, getCategory, salesMethod, variantsFor, type Product, type Variant } from '@/lib/shop'
import { getActiveBooking, submitShopEnquiry } from '@/lib/shop-service'

export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (zoom) ref.current?.showModal(); else ref.current?.close() }, [zoom])
  const images = product.images
  if (!images.length) return <div className="overflow-hidden rounded-3xl"><ProductVisual product={product} className="aspect-square w-full" /></div>
  return (
    <div>
      <button type="button" onClick={() => setZoom(true)} className={`relative block w-full overflow-hidden rounded-3xl ${focusRing}`} aria-label="View larger image"><img src={images[index].src} alt={images[index].alt} className="aspect-square w-full object-cover" />{images[index].illustrative && <span className="absolute bottom-3 right-3 rounded-full bg-[#06263b]/75 px-3 py-1.5 text-[10px] font-semibold text-white/90 backdrop-blur">Illustrative image</span>}</button>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto" role="group" aria-label="Product images">
          {images.map((image, i) => <button key={image.src} type="button" onClick={() => setIndex(i)} aria-pressed={i === index} className={`size-20 shrink-0 overflow-hidden rounded-xl ring-2 ${i === index ? 'ring-[#06263b]' : 'ring-transparent'} ${focusRing}`}><img src={image.src} alt={`${image.alt} thumbnail`} className="size-full object-cover" /></button>)}
        </div>
      )}
      <dialog ref={ref} onClose={() => setZoom(false)} className="m-auto max-h-[90vh] max-w-4xl rounded-3xl bg-white p-2 backdrop:bg-[#06263b]/80" aria-label={images[index].alt}>
        <button type="button" onClick={() => setZoom(false)} className={`absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white ${focusRing}`} aria-label="Close"><X className="size-5" /></button>
        <img src={images[index].src} alt={images[index].alt} className="max-h-[85vh] rounded-2xl object-contain" />
      </dialog>
    </div>
  )
}

export function ProductVariantSelector({ optionNames, variants, selected, onChange }: { optionNames: string[]; variants: Variant[]; selected: Record<string, string>; onChange: (next: Record<string, string>) => void }) {
  return (
    <div className="space-y-4">
      {optionNames.map((name) => {
        const values = [...new Set(variants.map((v) => v.options[name]))]
        return (
          <fieldset key={name}>
            <legend className="text-xs font-bold uppercase tracking-wider text-[#57717b]">{name}{selected[name] && <span className="ml-2 normal-case tracking-normal text-[#06263b]">{selected[name]}</span>}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {values.map((value) => {
                const candidate = { ...selected, [name]: value }
                // An option is unavailable only if every variant compatible with the current choice is out of stock.
                const matching = variants.filter((v) => Object.entries(candidate).every(([k, val]) => v.options[k] === val))
                const unavailable = matching.length > 0 && matching.every((v) => v.inStock === false)
                const checked = selected[name] === value
                return (
                  <label key={value} className={`relative flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-bold transition has-focus-visible:ring-2 has-focus-visible:ring-[#00a9c3] ${checked ? 'border-[#06263b] bg-[#06263b] text-white' : 'border-[#dfe6e5] bg-white'} ${unavailable ? 'cursor-not-allowed text-[#57717b] line-through opacity-60' : ''}`}>
                    <input type="radio" name={name} value={value} checked={checked} disabled={unavailable} onChange={() => onChange(candidate)} className="sr-only" />
                    {value}{unavailable && <span className="sr-only"> (unavailable)</span>}
                  </label>
                )
              })}
            </div>
          </fieldset>
        )
      })}
    </div>
  )
}

export function ProductSizeGuide({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (open) ref.current?.showModal(); else ref.current?.close() }, [open])
  if (!product.hasSizeGuide) return null
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0b7f95] ${focusRing}`}><Ruler className="size-4" aria-hidden />Size guide</button>
      <dialog ref={ref} onClose={() => setOpen(false)} aria-labelledby="size-guide-title" className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-white p-6 text-[#06263b] backdrop:bg-[#06263b]/60">
        <div className="flex items-center justify-between"><h2 id="size-guide-title" className="font-display text-2xl font-bold">Size guide</h2><button type="button" onClick={() => setOpen(false)} className={`flex size-11 items-center justify-center rounded-full border border-[#dfe6e5] ${focusRing}`} aria-label="Close size guide"><X className="size-4" /></button></div>
        {product.sizeGuide ? (
          <table className="mt-5 w-full text-left text-sm"><thead><tr>{product.sizeGuide.headers.map((h) => <th key={h} scope="col" className="border-b border-[#dfe6e5] py-2">{h}</th>)}</tr></thead><tbody>{product.sizeGuide.rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="py-2">{cell}</th> : <td key={i} className="py-2">{cell}</td>)}</tr>)}</tbody></table>
        ) : <p className="mt-5"><Pending>Measurements will be added from the supplier’s approved size chart.</Pending></p>}
      </dialog>
    </>
  )
}

export function DeliveryOptions({ product, value, onChange }: { product: Product; value: 'delivery' | 'collect'; onChange: (v: 'delivery' | 'collect') => void }) {
  const collectReason = !product.clickAndCollectEligible ? 'This product isn’t available for click-and-collect.' : COLLECTION_POINTS.length === 0 ? 'No collection points are configured yet.' : ''
  const options = [
    { id: 'delivery' as const, icon: Truck, label: 'Delivery across India', note: product.deliveryEligible ? 'Delivery estimate and charges depend on the product and destination; shown at checkout once configured.' : 'Not available for delivery.', disabled: !product.deliveryEligible },
    { id: 'collect' as const, icon: Store, label: 'Click-and-collect', note: collectReason || COLLECTION_POINTS.map((p) => p.name).join(', '), disabled: !!collectReason },
  ]
  return (
    <fieldset>
      <legend className="text-xs font-bold uppercase tracking-wider text-[#57717b]">Delivery or collection</legend>
      <div className="mt-2 grid gap-2">
        {options.map(({ id, icon: Icon, label, note, disabled }) => (
          <label key={id} className={`flex min-h-14 gap-3 rounded-2xl border p-3 has-focus-visible:ring-2 has-focus-visible:ring-[#00a9c3] ${disabled ? 'opacity-60' : 'cursor-pointer'} ${value === id && !disabled ? 'border-[#06263b] bg-[#f8faf8]' : 'border-[#dfe6e5]'}`}>
            <input type="radio" name="fulfilment" checked={value === id && !disabled} disabled={disabled} onChange={() => onChange(id)} className="sr-only" />
            <Icon className="mt-0.5 size-5 shrink-0 text-[#00a9c3]" aria-hidden />
            <span><span className="block text-sm font-bold">{label}</span><span className="text-xs text-[#57717b]">{note}</span></span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function AddToBookingButton({ product }: { product: Product }) {
  const [state, setState] = useState<'idle' | 'checking' | 'none' | 'not-connected'>('idle')
  if (!product.bookingAddOnEligible) return null
  return (
    <div>
      <button type="button" onClick={async () => { setState('checking'); const r = await getActiveBooking(); setState(r.ok ? (r.data ? 'idle' : 'none') : 'not-connected') }} className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#06263b]/20 px-5 text-sm font-bold ${focusRing}`}>
        <CalendarCheck className="size-4" aria-hidden />{state === 'checking' ? 'Checking your bookings…' : 'Add to my booking'}
      </button>
      {state === 'not-connected' && <p className="mt-2 text-xs leading-5 text-[#3d5862]" role="status">Adding gear to a paddle booking isn’t connected yet. <a href="/locations" className="font-bold text-[#0b7f95]">Choose a paddle</a> and buy separately for now; collection at the jetty will be offered once configured.</p>}
      {state === 'none' && <p className="mt-2 text-xs text-[#3d5862]" role="status">You don’t have an active booking. <a href="/locations" className="font-bold text-[#0b7f95]">Book a paddle</a> first.</p>}
    </div>
  )
}

function MadeToOrderEnquiry({ product }: { product: Product }) {
  return (
    <div className="rounded-3xl bg-[#f8faf8] p-5 ring-1 ring-[#dfe6e5]">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c95a22]">Made to order · enquiry required</p>
      <p className="mt-2 text-sm text-[#3d5862]">Tell us what you need and we’ll come back with options. A deposit-based order becomes available once approved pricing, terms and payment are in place.</p>
      <div className="mt-5">
        <ServiceForm
          submitLabel="Send enquiry"
          savedMessage="Thanks — we’ll be in touch about your order."
          validate={(d) => { const e: Record<string, string> = {}; if (!String(d.get('name') ?? '').trim()) e.name = 'Enter your name.'; if (!isEmail(String(d.get('email') ?? ''))) e.email = 'Enter a valid email address.'; const p = String(d.get('phone') ?? ''); if (p && !isPhone(p)) e.phone = 'Enter a valid phone number.'; if (!d.get('consent')) e.consent = 'Please confirm we may reply to you.'; return e }}
          submit={(d) => submitShopEnquiry('made-to-order', { product: product.slug, ...Object.fromEntries(d.entries()) })}
        >
          {(errors) => (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" name="name" autoComplete="name" error={errors.name} />
                <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                <TextField label="Phone" name="phone" type="tel" optional error={errors.phone} />
                <SelectField label="Quantity" name="quantity" options={['1', '2–5', '6+']} optional />
              </div>
              <TextAreaField label="What are you looking for?" name="message" optional />
              <CheckboxField name="consent" error={errors.consent}>Reply to me about this enquiry. <span className="text-[#57717b]">Required.</span></CheckboxField>
            </>
          )}
        </ServiceForm>
      </div>
    </div>
  )
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { demo, add } = useCart()
  const method = salesMethod(product)
  const { optionNames, variants } = useMemo(() => variantsFor(product, demo), [product, demo])
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [fulfilment, setFulfilment] = useState<'delivery' | 'collect'>('delivery')
  const [added, setAdded] = useState(false)

  useEffect(() => { setSelected({}); setAdded(false) }, [demo])

  const complete = optionNames.every((name) => selected[name])
  const variant = variants.find((v) => optionNames.every((name) => v.options[name] === selected[name]))
  const hasPrice = product.price !== undefined || (demo && !!product.demo)
  const canAdd = method === 'standard' && hasPrice && complete && variant?.inStock !== false

  return (
    <div className="space-y-6">
      <div>
        <ProductPrice product={product} variant={variant} className="text-3xl" />
        {product.sku && <p className="mt-1 text-xs text-[#57717b]">SKU {variant?.sku ?? product.sku}</p>}
        <div className="mt-2"><ProductStockStatus product={product} variant={variant} /></div>
      </div>

      {method === 'made-to-order' && <MadeToOrderEnquiry product={product} />}

      {method === 'bundled-with-course' && (
        <div className="rounded-2xl bg-[#eef2ed] p-5 text-sm leading-6">
          Starter kits are offered during Academy course enrolment. Contents, compatible courses and bundle price will be published once approved.
          <a href="/academy/courses" className={`mt-4 flex min-h-12 items-center justify-center rounded-2xl bg-[#06263b] text-sm font-bold text-white ${focusRing}`}>Browse Academy courses</a>
        </div>
      )}

      {method === 'standard' && (
        <>
          {!hasPrice && (
            <div className="rounded-2xl bg-[#eef2ed] p-5 text-sm leading-6 text-[#3d5862]">
              This product will be available to buy once its price, options and stock are confirmed. The client brief proposes {getCategory(product.category)?.proposedRange} for {getCategory(product.category)?.name.toLowerCase()} as a category guide, not this product’s price.
              <div className="mt-4"><DemoShopToggle /></div>
            </div>
          )}
          {optionNames.length > 0 && <ProductVariantSelector optionNames={optionNames} variants={variants} selected={selected} onChange={(next) => { setSelected(next); setAdded(false) }} />}
          <ProductSizeGuide product={product} />
          {hasPrice && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#57717b]" id="qty-label">Quantity</span>
              <div className="flex items-center rounded-full border border-[#dfe6e5] bg-white" role="group" aria-labelledby="qty-label">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} className={`flex size-11 items-center justify-center rounded-full disabled:opacity-40 ${focusRing}`} aria-label="Decrease quantity"><Minus className="size-4" /></button>
                <span className="w-8 text-center font-bold" aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity(Math.min(MAX_QUANTITY, quantity + 1))} disabled={quantity >= MAX_QUANTITY} className={`flex size-11 items-center justify-center rounded-full disabled:opacity-40 ${focusRing}`} aria-label="Increase quantity"><Plus className="size-4" /></button>
              </div>
            </div>
          )}
          <DeliveryOptions product={product} value={fulfilment} onChange={setFulfilment} />
          {product.hygieneRestricted && <p className="flex gap-2 rounded-xl bg-[#fff1cf] p-3 text-xs font-semibold leading-5 text-[#7a4f00]"><AlertTriangle className="size-4 shrink-0" aria-hidden />{HYGIENE_POLICY}</p>}
          {hasPrice && (
            <div className="space-y-2">
              <button type="button" disabled={!canAdd} onClick={() => { add({ slug: product.slug, options: selected, quantity }); setAdded(true) }} className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#f5b82e] px-5 text-sm font-extrabold uppercase tracking-[0.1em] text-[#06263b] transition hover:bg-[#06263b] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}>
                {added ? <><Check className="size-4" aria-hidden />Added to cart</> : <><ShoppingBag className="size-4" aria-hidden />{complete ? 'Add to cart' : `Choose ${optionNames.filter((n) => !selected[n]).join(' and ')}`}</>}
              </button>
              {added && <a href="/cart" className={`flex min-h-11 items-center justify-center text-sm font-bold text-[#0b7f95] ${focusRing}`}>View cart</a>}
            </div>
          )}
          <AddToBookingButton product={product} />
          <MembershipDiscountNotice compact />
        </>
      )}
    </div>
  )
}

export function ProductSpecifications({ product }: { product: Product }) {
  const sections: [string, React.ReactNode][] = [
    ['Description', product.description],
    ['Features', product.features?.length ? <ul className="list-disc space-y-1 pl-5">{product.features.map((f) => <li key={f}>{f}</li>)}</ul> : undefined],
    ['Specifications', product.specifications ? <dl className="grid grid-cols-2 gap-2">{Object.entries(product.specifications).map(([k, v]) => <div key={k} className="contents"><dt className="font-semibold">{k}</dt><dd>{v}</dd></div>)}</dl> : undefined],
    ...(product.type === 'Buoyancy aids' ? [['Certification', product.certificationStandard ? `Certified to ${product.certificationStandard}` : 'Certification standard to be confirmed. This product is not shown as certified until the standard is verified.'] as [string, React.ReactNode]] : []),
    ['Materials', product.materials],
    ['Care instructions', product.care],
    ['Shipping & returns', <>{product.hygieneRestricted && <strong className="block">{HYGIENE_POLICY}</strong>}<a href="/shop/help#returns" className="font-bold text-[#0b7f95]">Shipping and returns policy</a></>],
  ]
  return (
    <div className="divide-y divide-[#dfe6e5] overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
      {sections.map(([title, body], i) => (
        <details key={title} className="group" open={i === 0}>
          <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between px-6 py-4 font-display font-bold hover:bg-[#f8faf8] [&::-webkit-details-marker]:hidden ${focusRing}`}>{title}<ChevronDown className="size-5 text-[#00a9c3] transition group-open:rotate-180" aria-hidden /></summary>
          <div className="px-6 pb-5 text-sm leading-6 text-[#3d5862]">{body ?? <Pending>Verified details to be added.</Pending>}</div>
        </details>
      ))}
    </div>
  )
}
