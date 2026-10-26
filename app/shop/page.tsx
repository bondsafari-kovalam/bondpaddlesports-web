import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { DemoShopToggle } from '@/components/shop/cart'
import { ShopCategoryCard } from '@/components/shop/product-bits'
import { ShopCatalogue } from '@/components/shop/shop-catalogue'
import { BookingAddOnSection, BulkOrderSection, FulfilmentAndSupport, MembershipSection, PaddlingEssentials, PageHero, ShopShell, StarterKitSection, ghost, gold } from '@/components/shop/shop-sections'
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
      <PageHero eyebrow="The Bond Safari Shop" title={<>Gear up for your<br /><span className="text-[#f5b82e]">next adventure.</span></>} description="Discover paddling essentials, comfortable waterwear and Bond Safari merchandise designed for life on and around the water.">
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#catalogue" className={gold}>Shop all products <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <a href="/shop/collections/paddling-equipment" className={ghost}>Explore paddling gear</a>
        </div>
        <div className="mt-6"><DemoShopToggle className="border-white/30 text-white" /></div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8" aria-labelledby="categories">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c95a22]">Shop by category</p>
        <h2 id="categories" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>What do you need?</RevealLines></h2>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">{SHOP_CATEGORIES.map((category) => <ShopCategoryCard key={category.id} category={category} />)}</RevealGroup>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><ShopCatalogue /></div>
      <PaddlingEssentials />
      <StarterKitSection />
      <BookingAddOnSection />
      <MembershipSection />
      <FulfilmentAndSupport />
      <BulkOrderSection />
    </ShopShell>
  )
}
