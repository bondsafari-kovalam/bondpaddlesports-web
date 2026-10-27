'use client'

import { useState } from 'react'
import { ArrowRight, BadgePercent, Check, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/shop/cart'
import { focusRing } from '@/components/locations/primitives'
import {
  MEMBER_DISCOUNTS,
  categoryHref,
  formatINR,
  getCategory,
  isPurchasable,
  priceFor,
  productHref,
  salesMethod,
  variantsFor,
  type Product,
  type ShopCategory,
  type ShopCategoryId,
  type Variant,
} from '@/lib/shop'
import { SmartImage } from '@/components/site/smart-image'

const CATEGORY_IMAGES: Record<ShopCategoryId, { src: string; alt: string }> = {
  apparel: {
    src: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=1000&q=85',
    alt: 'Model wearing a plain T-shirt and cap outdoors',
  },
  waterwear: {
    src: 'https://images.unsplash.com/photo-1761279668226-151d09384afb?auto=format&fit=crop&w=1000&q=85',
    alt: 'Woman in swimwear relaxing on a paddleboard',
  },
  'paddling-equipment': {
    src: 'https://images.unsplash.com/photo-1689753423166-d246faaf5a54?auto=format&fit=crop&w=1000&q=85',
    alt: 'Kayaker wearing a helmet and buoyancy aid',
  },
  'academy-starter-kits': {
    src: 'https://images.unsplash.com/photo-1780049503868-76af0eccd11b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Kayak and life jackets ready by the water',
  },
  'boards-and-kayaks': {
    src: 'https://images.unsplash.com/photo-1769852635551-f6a97498e61e?auto=format&fit=crop&w=1000&q=85',
    alt: 'Kayaks and paddleboards stacked on a beach',
  },
}

// Product tiles are at most a quarter of the page wide on desktop and half on phones.
const PRODUCT_SIZES = '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw'

/** Show product photography when supplied; otherwise use an illustrative category image. */
export function ProductVisual({ product, className = '', label = true }: { product: Product; className?: string; label?: boolean }) {
  const image = product.images[0]
  if (image && !image.illustrative) return <div className={`relative overflow-hidden ${className}`}><SmartImage src={image.src} alt={image.alt} fill sizes={PRODUCT_SIZES} className="object-cover" /></div>
  if (image?.illustrative) {
    return (
      <div className={`relative overflow-hidden bg-ink ${className}`} role="img" aria-label={image.alt}>
        <SmartImage src={image.src} alt="" fill sizes={PRODUCT_SIZES} className="object-cover" />
        <span className="absolute bottom-2 right-2 rounded-full bg-ink/75 px-2 py-1 text-[9px] font-semibold text-white/90 backdrop-blur">Illustrative</span>
      </div>
    )
  }
  const illustration = CATEGORY_IMAGES[product.category]
  return (
    <div className={`group relative overflow-hidden bg-ink ${className}`} role="img" aria-label={`${product.name}: illustrative category image`}>
      <SmartImage src={illustration.src} alt="" fill sizes={PRODUCT_SIZES} className="object-cover transition duration-700 group-hover:scale-105" />
      <span className="absolute bottom-2 right-2 rounded-full bg-ink/75 px-2 py-1 text-[9px] font-semibold text-white/90 backdrop-blur">Illustrative</span>
      {label && <span className="sr-only">Illustrative category image</span>}
    </div>
  )
}

export function ProductPrice({ product, variant, className = '' }: { product: Product; variant?: Variant; className?: string }) {
  const { demo } = useCart()
  const method = salesMethod(product)
  if (method === 'made-to-order') return <span className={`text-sm font-bold text-slate-strong ${className}`}>Made to order · enquiry</span>
  if (method === 'bundled-with-course') return <span className={`text-sm font-bold text-slate-strong ${className}`}>Bundled with eligible courses</span>
  const price = priceFor(product, demo, variant)
  if (price === undefined) return <span className={`text-sm font-semibold text-slate ${className}`}>Price to be confirmed</span>
  const demoPrice = product.price === undefined && !product.variants.some((v) => v.price)
  return <span className={`font-bold text-teal-strong ${className}`}>{formatINR(price)}{demoPrice && <span className="ml-1.5 rounded bg-sand-soft px-1.5 py-0.5 align-middle text-[10px] font-extrabold uppercase text-sand-ink">Demo</span>}</span>
}

/** Stock is only shown from the inventory service, or labelled demo stock in the demo shop. */
export function ProductStockStatus({ product, variant }: { product: Product; variant?: Variant }) {
  const { demo } = useCart()
  if (salesMethod(product) !== 'standard') return null
  if (!variant || variant.inStock === undefined) return <span className="text-xs text-slate">{demo && product.variants.length === 0 ? 'Demo stock' : 'Stock shown at checkout once inventory is connected'}</span>
  return variant.inStock
    ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-success"><Check className="size-3.5" aria-hidden />In stock{demo && product.variants.length === 0 && ' (demo)'}</span>
    : <span className="text-xs font-semibold text-danger">Unavailable in this option{demo && product.variants.length === 0 && ' (demo)'}</span>
}

export function MembershipDiscountNotice({ compact = false }: { compact?: boolean }) {
  return (
    <p className={`flex gap-2 rounded-xl bg-mist text-teal-strong ${compact ? 'p-2.5 text-xs' : 'p-4 text-sm'}`}>
      <BadgePercent className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{MEMBER_DISCOUNTS.bondBlue.rule} {MEMBER_DISCOUNTS.stacking} Discounts are applied only after your membership is verified.</span>
    </p>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const { demo, add } = useCart()
  const [added, setAdded] = useState(false)
  const href = productHref(product)
  const { optionNames, variants } = variantsFor(product, demo)
  const purchasable = isPurchasable(product, demo)
  const quickVariant = variants.length === 1 ? variants[0] : variants.length === 0 ? undefined : null
  const summary = optionNames.map((name) => `${new Set(variants.map((v) => v.options[name])).size} ${name === 'colour' ? 'colours' : `${name}s`}`).join(' · ')

  return (
    <article className="group flex flex-col">
      <a href={href} tabIndex={-1} aria-hidden className="relative block overflow-hidden rounded-2xl bg-mist">
        <ProductVisual product={product} className="aspect-[4/5] w-full transition duration-700 group-hover:scale-105" label={false} />
        {product.featured && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink backdrop-blur">Featured</span>}
      </a>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">{getCategory(product.category)?.name}</p>
        <h3 className="mt-1 font-display text-lg font-bold leading-tight tracking-tight"><a href={href} className={`rounded transition hover:text-teal ${focusRing}`}>{product.name}</a></h3>
        {summary && <p className="mt-1 text-xs text-slate">{summary}</p>}
        <div className="mt-2"><ProductPrice product={product} className="text-ink" /></div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
          <a href={href} className={`inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ink transition hover:text-teal ${focusRing}`} aria-label={`View ${product.name}`}>View <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
          {purchasable && quickVariant !== null && (quickVariant?.inStock !== false) ? (
            <button type="button" onClick={() => { add({ slug: product.slug, options: quickVariant?.options ?? {}, quantity: 1 }); setAdded(true) }} className={`inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-teal-strong ${focusRing}`} aria-label={`Add ${product.name} to cart`}>
              {added ? <><Check className="size-4" aria-hidden />Added</> : <><ShoppingBag className="size-4" aria-hidden />Add</>}
            </button>
          ) : purchasable ? (
            <a href={href} className={`inline-flex min-h-11 items-center rounded-full border border-ink/20 px-4 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Choose options</a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function ShopCategoryCard({ category }: { category: ShopCategory }) {
  const image = CATEGORY_IMAGES[category.id]
  return (
    <a href={categoryHref(category.id)} className={`group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-ink text-white ${focusRing}`}>
      <SmartImage src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 42vw, 68vw" className="object-cover transition duration-1000 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_88%,transparent)_0%,transparent_60%)]" />
      {category.salesMethod !== 'standard' && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase text-ink">{category.salesMethod === 'made-to-order' ? 'Enquiry' : 'With courses'}</span>}
      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-semibold text-white/85 backdrop-blur">Illustrative image</span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-xl font-bold leading-tight tracking-tight">{category.name}</h3>
          <p className="mt-1 text-xs text-white/70">{category.types.join(' · ')}</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition group-hover:bg-sand"><ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></span>
      </div>
    </a>
  )
}

export function StarterKitCard({ product }: { product: Product }) {
  return (
    <article className="grid overflow-hidden rounded-3xl border border-line bg-paper-bright sm:grid-cols-[240px_1fr]">
      <ProductVisual product={product} className="aspect-square w-full sm:aspect-auto sm:h-full" />
      <div className="p-6">
        <h3 className="font-display text-2xl font-bold">{product.name}</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div><dt className="text-xs font-bold uppercase tracking-wider text-slate">Kit contents</dt><dd className="mt-1">{product.kitContents?.join(', ') ?? <span className="italic text-slate">To be confirmed by the Academy.</span>}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-slate">Compatible courses</dt><dd className="mt-1">{product.compatibleCourses?.join(', ') ?? <span className="italic text-slate">To be confirmed.</span>}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-slate">Price</dt><dd className="mt-1">Bundled with eligible courses; bundle price to be approved. Kit is not included in course fees unless the course says so.</dd></div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={productHref(product)} className={`inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-teal-strong ${focusRing}`}>View kit</a>
          <a href="/academy/courses" className={`inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Add during enrolment</a>
        </div>
      </div>
    </article>
  )
}

