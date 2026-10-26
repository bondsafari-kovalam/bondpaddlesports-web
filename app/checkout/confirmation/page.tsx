import type { Metadata } from 'next'
import { ConfirmationView } from '@/components/shop/cart-checkout'
import { PageHero, ShopShell } from '@/components/shop/shop-sections'

export const metadata: Metadata = { title: 'Order status | Bond Safari Shop', robots: { index: false, follow: false } }

export default function ConfirmationPage() {
  return (
    <ShopShell>
      <PageHero compact eyebrow="Shop" title="Order status" />
      <div className="mx-auto max-w-3xl px-5 py-12"><ConfirmationView /></div>
    </ShopShell>
  )
}
