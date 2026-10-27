import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ShopCatalogue } from '@/components/shop/shop-catalogue'
import { PageHero, ShopShell } from '@/components/shop/shop-sections'
import { SHOP_CATEGORIES, categoryHref, getCategory } from '@/lib/shop'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return SHOP_CATEGORIES.map((category) => ({ slug: category.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).slug)
  if (!category) return {}
  const title = `${category.name} | Bond Safari Shop`
  return { title, description: category.summary, alternates: { canonical: categoryHref(category.id) }, openGraph: { title, description: category.summary, url: categoryHref(category.id), type: 'website' } }
}

export default async function CollectionPage({ params }: Props) {
  const category = getCategory((await params).slug)
  if (!category) notFound()
  return (
    <ShopShell>
      <PageHero compact eyebrow="Shop" title={category.name} description={category.summary}>
        <nav aria-label="Breadcrumb" className="mt-6 text-xs font-semibold text-white/70"><a href="/" className="hover:text-sand">Home</a> › <a href="/shop" className="hover:text-sand">Shop</a> › <span aria-current="page" className="text-white">{category.name}</span></nav>
        <p className="mt-4 text-sm text-white/70">Proposed range: {category.proposedRange} <span className="text-white/50">(category guide from the client brief, not individual prices)</span></p>
      </PageHero>
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16"><ShopCatalogue fixedCategory={category.id} heading={false} /></div>
    </ShopShell>
  )
}
