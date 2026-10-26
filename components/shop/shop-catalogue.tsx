'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, SearchX, SlidersHorizontal, X } from 'lucide-react'
import { useCart } from '@/components/shop/cart'
import { ProductCard } from '@/components/shop/product-bits'
import { focusRing } from '@/components/locations/primitives'
import { SHOP_CATEGORIES, getCategory, isPurchasable, priceFor, products, salesMethod, variantsFor, type Product, type ShopCategoryId } from '@/lib/shop'

type Filters = { query: string; category: string; type: string; size: string; colour: string; price: string; availability: string; fulfilment: string }
type FacetKey = Exclude<keyof Filters, 'query'>
const empty: Filters = { query: '', category: '', type: '', size: '', colour: '', price: '', availability: '', fulfilment: '' }
type Sort = 'featured' | 'price-asc' | 'price-desc' | 'newest'

const PRICE_BANDS = [
  { value: 'under-1000', label: 'Under ₹1,000', test: (p: number) => p < 1000 },
  { value: '1000-3000', label: '₹1,000–₹3,000', test: (p: number) => p >= 1000 && p <= 3000 },
  { value: 'over-3000', label: 'Over ₹3,000', test: (p: number) => p > 3000 },
]

function availability(product: Product, demo: boolean) {
  const method = salesMethod(product)
  if (method === 'made-to-order') return 'Made to order'
  if (method === 'bundled-with-course') return 'With eligible courses'
  return isPurchasable(product, demo) ? (demo && product.price === undefined ? 'Available (demo)' : 'Available to buy') : 'Price to be confirmed'
}

function optionValues(product: Product, demo: boolean, name: string) {
  return variantsFor(product, demo).variants.map((v) => v.options[name]).filter(Boolean)
}

function makeMatchers(demo: boolean): Record<FacetKey, (p: Product, v: string) => boolean> {
  return {
    category: (p, v) => p.category === v,
    type: (p, v) => p.type === v,
    size: (p, v) => optionValues(p, demo, 'size').includes(v),
    colour: (p, v) => optionValues(p, demo, 'colour').includes(v),
    price: (p, v) => { const price = priceFor(p, demo); return price !== undefined && !!PRICE_BANDS.find((b) => b.value === v)?.test(price) },
    availability: (p, v) => availability(p, demo) === v,
    fulfilment: (p, v) => (v === 'delivery' ? p.deliveryEligible : p.clickAndCollectEligible),
  }
}

export function ShopCatalogue({ fixedCategory, heading = true }: { fixedCategory?: ShopCategoryId; heading?: boolean }) {
  const { demo } = useCart()
  const [filters, setFilters] = useState<Filters>({ ...empty, category: fixedCategory ?? '' })
  const [sort, setSort] = useState<Sort>('featured')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDialogElement>(null)
  const matchers = useMemo(() => makeMatchers(demo), [demo])

  useEffect(() => { if (drawerOpen) drawerRef.current?.showModal(); else drawerRef.current?.close() }, [drawerOpen])

  const matches = (p: Product, ignore?: FacetKey) => {
    const q = filters.query.trim().toLowerCase()
    if (q && ![p.name, p.type, getCategory(p.category)!.name].some((s) => s.toLowerCase().includes(q))) return false
    return (Object.keys(matchers) as FacetKey[]).every((k) => k === ignore || !filters[k] || matchers[k](p, filters[k]))
  }

  const pool = fixedCategory ? products.filter((p) => p.category === fixedCategory) : products
  const results = pool.filter((p) => matches(p))
  const priced = pool.some((p) => priceFor(p, demo) !== undefined)
  const sorted = sort === 'featured' ? [...results].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    : sort === 'newest' ? [...results].sort((a, b) => (b.addedOn ?? '').localeCompare(a.addedOn ?? ''))
    : [...results].sort((a, b) => ((priceFor(a, demo) ?? Infinity) - (priceFor(b, demo) ?? Infinity)) * (sort === 'price-desc' ? -1 : 1))

  // Only facets with data are shown: sizes, colours and prices exist only once configured (or in the demo shop).
  const facets: { key: FacetKey; label: string; options: { value: string; label: string }[] }[] = [
    { key: 'category' as const, label: 'Category', options: fixedCategory ? [] : SHOP_CATEGORIES.map((c) => ({ value: c.id, label: c.name })) },
    { key: 'type' as const, label: 'Product type', options: [...new Set(pool.map((p) => p.type))].map((t) => ({ value: t, label: t })) },
    { key: 'size' as const, label: 'Size', options: [...new Set(pool.flatMap((p) => optionValues(p, demo, 'size')))].map((s) => ({ value: s, label: s })) },
    { key: 'colour' as const, label: 'Colour', options: [...new Set(pool.flatMap((p) => optionValues(p, demo, 'colour')))].map((c) => ({ value: c, label: c })) },
    { key: 'price' as const, label: 'Price', options: priced ? PRICE_BANDS.map(({ value, label }) => ({ value, label })) : [] },
    { key: 'availability' as const, label: 'Availability', options: [...new Set(pool.map((p) => availability(p, demo)))].map((a) => ({ value: a, label: a })) },
    { key: 'fulfilment' as const, label: 'Delivery / collection', options: [{ value: 'delivery', label: 'Delivery across India' }, { value: 'collect', label: 'Click-and-collect eligible' }] },
  ].filter((f) => f.options.length > 0)

  const selects = facets.map(({ key, label, options }) => {
    const base = pool.filter((p) => matches(p, key))
    return (
      <label key={key} className="rounded-2xl border border-[#dfe6e5] bg-[#f8faf8] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#57717b] focus-within:ring-2 focus-within:ring-[#00a9c3]">
        {label}
        <select value={filters[key]} onChange={(e) => setFilters({ ...filters, [key]: e.target.value })} className="mt-2 block min-h-6 w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-[#06263b] outline-none">
          <option value="">Any</option>
          {options.map((o) => { const n = base.filter((p) => matchers[key](p, o.value)).length; return <option key={o.value} value={o.value} disabled={!n && filters[key] !== o.value}>{o.label} ({n})</option> })}
        </select>
      </label>
    )
  })

  const search = (
    <div className="relative">
      <label htmlFor="shop-search" className="sr-only">Search products</label>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#57717b]" aria-hidden />
      <input id="shop-search" type="search" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} placeholder="Search products, e.g. dry bag" className="min-h-12 w-full rounded-2xl border border-[#dfe6e5] bg-[#f8faf8] py-3 pl-11 pr-11 text-sm font-semibold text-[#06263b] outline-none placeholder:text-[#57717b] focus:ring-2 focus:ring-[#00a9c3] [&::-webkit-search-cancel-button]:hidden" />
      {filters.query && <button type="button" onClick={() => setFilters({ ...filters, query: '' })} className={`absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full ${focusRing}`} aria-label="Clear search"><X className="size-4" /></button>}
    </div>
  )

  const activeCount = (Object.keys(empty) as (keyof Filters)[]).filter((k) => filters[k] && !(k === 'category' && fixedCategory)).length

  return (
    <section id="catalogue" className="scroll-mt-6" aria-labelledby={heading ? 'catalogue-title' : undefined}>
      {heading && (
        <div className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c95a22]">All products</p>
          <h2 id="catalogue-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Find your next water essential.</h2>
        </div>
      )}
      <div className="rounded-3xl bg-white p-4 shadow-[0_20px_60px_rgba(6,38,59,.10)] sm:p-6">
        <div className="flex gap-2 lg:hidden">
          <div className="flex-1">{search}</div>
          <button type="button" onClick={() => setDrawerOpen(true)} aria-haspopup="dialog" className={`flex min-h-12 shrink-0 items-center gap-2 rounded-2xl bg-[#06263b] px-4 text-sm font-bold text-white ${focusRing}`}><SlidersHorizontal className="size-4" aria-hidden />Filters{activeCount > 0 && <span className="rounded-full bg-[#f5b82e] px-1.5 text-xs text-[#06263b]">{activeCount}</span>}</button>
        </div>
        <div className="hidden gap-3 lg:grid lg:grid-cols-4">
          <div className="lg:col-span-1">{search}</div>
          {selects}
        </div>
      </div>

      <dialog ref={drawerRef} onClose={() => setDrawerOpen(false)} aria-label="Filter products" className="mb-0 mt-auto w-full max-w-none rounded-t-3xl bg-white p-0 text-[#06263b] backdrop:bg-[#06263b]/60 lg:hidden">
        <div className="max-h-[85vh] overflow-y-auto p-5">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-bold">Filter products</h2><button type="button" onClick={() => setDrawerOpen(false)} className={`flex size-11 items-center justify-center rounded-full border border-[#dfe6e5] ${focusRing}`} aria-label="Close filters"><X className="size-4" /></button></div>
          <div className="grid gap-3">{selects}</div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setFilters({ ...empty, query: filters.query, category: fixedCategory ?? '' })} className={`min-h-12 rounded-2xl border border-[#dfe6e5] text-sm font-bold ${focusRing}`}>Clear filters</button>
            <button type="button" onClick={() => setDrawerOpen(false)} className={`min-h-12 rounded-2xl bg-[#06263b] text-sm font-extrabold text-white ${focusRing}`}>Show {results.length}</button>
          </div>
        </div>
      </dialog>

      <div className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-[#3d5862]" role="status" aria-live="polite"><span className="font-display text-lg font-bold text-[#06263b]">{results.length}</span> of {pool.length} products</p>
          {activeCount > 0 && <button type="button" onClick={() => setFilters({ ...empty, category: fixedCategory ?? '' })} className={`min-h-11 rounded px-2 text-sm font-bold text-[#0b7f95] hover:underline ${focusRing}`}>Clear all</button>}
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#3d5862]">Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={`min-h-11 rounded-full border border-[#dfe6e5] bg-white px-4 text-sm font-bold text-[#06263b] ${focusRing}`}>
            <option value="featured">Featured</option>
            <option value="price-asc" disabled={!priced}>Price: low to high{priced ? '' : ' (no prices yet)'}</option>
            <option value="price-desc" disabled={!priced}>Price: high to low{priced ? '' : ' (no prices yet)'}</option>
            <option value="newest" disabled={!pool.some((p) => p.addedOn)}>Newest{pool.some((p) => p.addedOn) ? '' : ' (no dates yet)'}</option>
          </select>
        </label>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-[#06263b]/15 bg-white px-6 py-16 text-center">
          <SearchX className="size-10 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
          <h3 className="mt-4 font-display text-2xl font-bold">No products match</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#57717b]">Try a different search or remove a filter.</p>
          <button type="button" onClick={() => setFilters({ ...empty, category: fixedCategory ?? '' })} className={`mt-6 min-h-11 rounded-full bg-[#06263b] px-5 text-sm font-bold text-white ${focusRing}`}>Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">{sorted.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      )}
    </section>
  )
}
