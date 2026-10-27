import type { Metadata } from 'next'
import { OrdersView } from '@/components/shop/cart-checkout'
import { PageHero, ShopShell } from '@/components/shop/shop-sections'
import { HERO_IMAGES } from '@/lib/hero-images'

type Props = { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Order | Bond Safari Paddle Sports', robots: { index: false, follow: false } }

export default async function OrderPage({ params }: Props) {
  const reference = decodeURIComponent((await params).id)
  return (
    <ShopShell>
      <PageHero compact image={HERO_IMAGES.account} eyebrow="My account" title={`Order ${reference}`} />
      <div className="mx-auto max-w-4xl px-5 py-12"><OrdersView reference={reference} /></div>
    </ShopShell>
  )
}
