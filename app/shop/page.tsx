import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { DemoShopToggle } from '@/components/shop/cart'
import { ShopCategoryCard } from '@/components/shop/product-bits'
import { ShopCatalogue } from '@/components/shop/shop-catalogue'
import { BookingAddOnSection, BulkOrderSection, MembershipSection, PaddlingEssentials, PageHero, ShopServiceStrip, ShopShell, StarterKitSection, ghost, gold } from '@/components/shop/shop-sections'
import { SHOP_CATEGORIES } from '@/lib/shop'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'

const description = 'The Bond Safari Shop: apparel, waterwear, paddling equipment, Academy starter kits and made-to-order SUP boards and kayaks. Delivery across India.'

export const metadata: Metadata = {
  title: 'Shop | Bond Safari Paddle Sports',
  description,
  alternates: { canonical: '/shop' },
  openGraph: { title: 'The Bond Safari Shop', description, url: '/shop', type: 'website' },
}

export default function ShopPage() {
  return (
    <ShopShell>
      <PageHero soft eyebrow="The Bond Safari Shop" title={<>Gear up for your<br /><span className="text-sand">next adventure.</span></>} description="Discover paddling essentials, comfortable waterwear and Bond Safari merchandise designed for life on and around the water.">
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#catalogue" className={gold}>Shop all products <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <a href="/shop/collections/paddling-equipment" className={ghost}>Explore paddling gear</a>
        </div>
        <div className="mt-6"><DemoShopToggle className="border-white/30 text-white transition hover:bg-white/10" /></div>
      </PageHero>
      <ShopServiceStrip />

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-20 lg:px-8 lg:pt-28" aria-labelledby="categories">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Shop by category</p>
            <h2 id="categories" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>What do you need?</RevealLines></h2>
          </div>
          <a href="#catalogue" className="inline-flex w-fit items-center gap-1.5 border-b border-ink/25 pb-1 text-sm font-semibold transition hover:border-ink">Browse all products <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <RevealGroup className="-mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">{SHOP_CATEGORIES.map((category) => <div key={category.id} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto"><ShopCategoryCard category={category} /></div>)}</RevealGroup>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 lg:px-8 lg:pb-32"><ShopCatalogue /></div>
      <PaddlingEssentials />
      <StarterKitSection />
      <BookingAddOnSection />
      <MembershipSection />
      <BulkOrderSection />
    </ShopShell>
  )
}
