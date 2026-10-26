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

/** Show product photography when supplied; otherwise use an illustrative category image. */
export function ProductVisual({ product, className = '', label = true }: { product: Product; className?: string; label?: boolean }) {
  const image = product.images[0]
  if (image && !image.illustrative) return <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className={`object-cover ${className}`} />
  if (image?.illustrative) {
    return (
      <div className={`relative overflow-hidden bg-[#06263b] ${className}`} role="img" aria-label={image.alt}>
        <img src={image.src} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
        <span className="absolute bottom-2 right-2 rounded-full bg-[#06263b]/75 px-2 py-1 text-[9px] font-semibold text-white/90 backdrop-blur">Illustrative</span>
      </div>
    )
  }
  const illustration = CATEGORY_IMAGES[product.category]
  return (
    <div className={`group relative overflow-hidden bg-[#06263b] ${className}`} role="img" aria-label={`${product.name}: illustrative category image`}>
      <img src={illustration.src} alt="" loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-105" />
      <span className="absolute bottom-2 right-2 rounded-full bg-[#06263b]/75 px-2 py-1 text-[9px] font-semibold text-white/90 backdrop-blur">Illustrative</span>
      {label && <span className="sr-only">Illustrative category image</span>}
    </div>
  )
}

export function ProductPrice({ product, variant, className = '' }: { product: Product; variant?: Variant; className?: string }) {
  const { demo } = useCart()
  const method = salesMethod(product)
  if (method === 'made-to-order') return <span className={`text-sm font-bold text-[#3d5862] ${className}`}>Made to order · enquiry</span>
  if (method === 'bundled-with-course') return <span className={`text-sm font-bold text-[#3d5862] ${className}`}>Bundled with eligible courses</span>
  const price = priceFor(product, demo, variant)
  if (price === undefined) return <span className={`text-sm font-semibold text-[#57717b] ${className}`}>Price to be confirmed</span>
  const demoPrice = product.price === undefined && !product.variants.some((v) => v.price)
  return <span className={`font-bold text-[#c95a22] ${className}`}>{formatINR(price)}{demoPrice && <span className="ml-1.5 rounded bg-[#fff1cf] px-1.5 py-0.5 align-middle text-[10px] font-extrabold uppercase text-[#7a4f00]">Demo</span>}</span>
}

/** Stock is only shown from the inventory service, or labelled demo stock in the demo shop. */
export function ProductStockStatus({ product, variant }: { product: Product; variant?: Variant }) {
  const { demo } = useCart()
  if (salesMethod(product) !== 'standard') return null
  if (!variant || variant.inStock === undefined) return <span className="text-xs text-[#57717b]">{demo && product.variants.length === 0 ? 'Demo stock' : 'Stock shown at checkout once inventory is connected'}</span>
  return variant.inStock
    ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#14785a]"><Check className="size-3.5" aria-hidden />In stock{demo && product.variants.length === 0 && ' (demo)'}</span>
    : <span className="text-xs font-semibold text-[#b42318]">Unavailable in this option{demo && product.variants.length === 0 && ' (demo)'}</span>
}

export function MembershipDiscountNotice({ compact = false }: { compact?: boolean }) {
  return (
    <p className={`flex gap-2 rounded-xl bg-[#e1f6fa] text-[#0b5f70] ${compact ? 'p-2.5 text-xs' : 'p-4 text-sm'}`}>
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
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5 transition hover:shadow-[0_20px_50px_rgba(6,38,59,.12)]">
      <a href={href} tabIndex={-1} aria-hidden className="relative block">
        <ProductVisual product={product} className="aspect-square w-full" label={false} />
        {product.featured && <span className="absolute left-3 top-3 rounded-full bg-[#06263b] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Featured</span>}
      </a>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b7f95]">{getCategory(product.category)?.name}</p>
        <h3 className="mt-1 font-display text-lg font-bold leading-tight"><a href={href} className={`rounded hover:text-[#0b7f95] ${focusRing}`}>{product.name}</a></h3>
        {summary && <p className="mt-1 text-xs text-[#57717b]">{summary}</p>}
        <div className="mt-3"><ProductPrice product={product} /></div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
          <a href={href} className={`inline-flex min-h-11 items-center gap-1 rounded text-sm font-bold text-[#06263b] hover:text-[#0b7f95] ${focusRing}`} aria-label={`View ${product.name}`}>View <ArrowRight className="size-4" aria-hidden /></a>
          {purchasable && quickVariant !== null && (quickVariant?.inStock !== false) ? (
            <button type="button" onClick={() => { add({ slug: product.slug, options: quickVariant?.options ?? {}, quantity: 1 }); setAdded(true) }} className={`inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#f5b82e] px-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#06263b] transition hover:bg-[#06263b] hover:text-white ${focusRing}`} aria-label={`Add ${product.name} to cart`}>
              {added ? <><Check className="size-4" aria-hidden />Added</> : <><ShoppingBag className="size-4" aria-hidden />Add</>}
            </button>
          ) : purchasable ? (
            <a href={href} className={`inline-flex min-h-11 items-center rounded-full border border-[#06263b]/20 px-4 text-xs font-extrabold uppercase tracking-[0.08em] ${focusRing}`}>Choose options</a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function ShopCategoryCard({ category }: { category: ShopCategory }) {
  const image = CATEGORY_IMAGES[category.id]
  return (
    <a href={categoryHref(category.id)} className={`group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5 transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(6,38,59,.12)] ${focusRing}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#06263b]">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute bottom-3 right-3 rounded-full bg-[#06263b]/75 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur">Illustrative image</span>
        {category.salesMethod !== 'standard' && <span className="absolute left-3 top-3 rounded-full bg-[#fff1cf] px-2.5 py-1 text-[10px] font-extrabold uppercase text-[#7a4f00]">{category.salesMethod === 'made-to-order' ? 'Enquiry' : 'With courses'}</span>}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-bold leading-tight sm:text-xl">{category.name}</h3>
        <p className="mt-1 hidden text-sm leading-6 text-[#57717b] sm:block">{category.summary}</p>
        <p className="mt-3 text-xs text-[#3d5862]">{category.types.join(' · ')}</p>
        <span className="mt-auto inline-flex items-center pt-4 text-sm font-bold text-[#0b7f95]">Explore category <ArrowRight className="ml-1 size-4" aria-hidden /></span>
      </div>
    </a>
  )
}

export function StarterKitCard({ product }: { product: Product }) {
  return (
    <article className="grid overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5 sm:grid-cols-[220px_1fr]">
      <ProductVisual product={product} className="aspect-square w-full sm:aspect-auto sm:h-full" />
      <div className="p-6">
        <h3 className="font-display text-2xl font-bold">{product.name}</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div><dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">Kit contents</dt><dd className="mt-1">{product.kitContents?.join(', ') ?? <span className="italic text-[#57717b]">To be confirmed by the Academy.</span>}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">Compatible courses</dt><dd className="mt-1">{product.compatibleCourses?.join(', ') ?? <span className="italic text-[#57717b]">To be confirmed.</span>}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">Price</dt><dd className="mt-1">Bundled with eligible courses; bundle price to be approved. Kit is not included in course fees unless the course says so.</dd></div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={productHref(product)} className={`inline-flex min-h-11 items-center rounded-full bg-[#06263b] px-5 text-sm font-bold text-white ${focusRing}`}>View kit</a>
          <a href="/academy/courses" className={`inline-flex min-h-11 items-center rounded-full border border-[#06263b]/20 px-5 text-sm font-bold ${focusRing}`}>Add during enrolment</a>
        </div>
      </div>
    </article>
  )
}

