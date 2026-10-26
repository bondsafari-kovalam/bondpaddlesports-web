import type { Metadata } from 'next'
import { CheckoutFlow } from '@/components/shop/cart-checkout'
import { PageHero, ShopShell } from '@/components/shop/shop-sections'

export const metadata: Metadata = { title: 'Checkout | Bond Safari Shop', robots: { index: false, follow: false } }

export default function CheckoutPage() {
  return (
    <ShopShell>
      <PageHero compact eyebrow="Shop" title="Checkout" />
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><CheckoutFlow /></div>
    </ShopShell>
  )
}
