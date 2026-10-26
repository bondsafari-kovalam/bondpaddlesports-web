import type { Metadata } from 'next'
import { CartView } from '@/components/shop/cart-checkout'
import { PageHero, ShopShell } from '@/components/shop/shop-sections'

export const metadata: Metadata = { title: 'Cart | Bond Safari Shop', robots: { index: false, follow: false } }

export default function CartPage() {
  return (
    <ShopShell>
      <PageHero compact eyebrow="Shop" title="Your cart" />
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><CartView /></div>
    </ShopShell>
  )
}
