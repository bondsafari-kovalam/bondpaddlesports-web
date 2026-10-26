import type { Metadata } from 'next'
import { OrdersView } from '@/components/shop/cart-checkout'
import { PageHero, ShopShell } from '@/components/shop/shop-sections'

export const metadata: Metadata = { title: 'My orders | Bond Safari Paddle Sports', robots: { index: false, follow: false } }

export default function OrdersPage() {
  return (
    <ShopShell>
      <PageHero compact eyebrow="My account" title="My orders" />
      <div className="mx-auto max-w-4xl px-5 py-12"><OrdersView /></div>
    </ShopShell>
  )
}
