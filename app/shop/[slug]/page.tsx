import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MessageSquareQuote } from 'lucide-react'
import { ProductCard } from '@/components/shop/product-bits'
import { ProductGallery, ProductPurchasePanel, ProductSpecifications } from '@/components/shop/product-detail'
import { ShopShell } from '@/components/shop/shop-sections'
import { categoryHref, getCategory, getProduct, productHref, products, type Product } from '@/lib/shop'
import { SITE_URL } from '@/lib/site'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getProduct((await params).slug)
  if (!item) return {}
  const category = getCategory(item.category)!
  const title = `${item.name} | Bond Safari Shop`
  const description = item.description ?? `${item.name} from the Bond Safari Shop: ${category.name.toLowerCase()} for life on and around the water.`
  return {
    title,
    description,
    alternates: { canonical: productHref(item) },
    openGraph: { title, description, url: productHref(item), type: 'website', images: item.images[0] ? [{ url: item.images[0].src, alt: item.images[0].alt }] : undefined },
  }
}

// Product schema only with a real, confirmed price; demo prices never reach structured data.
function structuredData(item: Product) {
  const category = getCategory(item.category)!
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Shop', item: `${SITE_URL}/shop` },
        { '@type': 'ListItem', position: 2, name: category.name, item: `${SITE_URL}${categoryHref(category.id)}` },
        { '@type': 'ListItem', position: 3, name: item.name, item: `${SITE_URL}${productHref(item)}` },
      ],
    },
    ...(item.price !== undefined ? [{ '@context': 'https://schema.org', '@type': 'Product', name: item.name, sku: item.sku, offers: { '@type': 'Offer', priceCurrency: 'INR', price: item.price } }] : []),
  ]
}

export default async function ProductPage({ params }: Props) {
  const item = getProduct((await params).slug)
  if (!item) notFound()
  const category = getCategory(item.category)!
  const related = item.related.map((slug) => getProduct(slug)).filter((p): p is Product => !!p)

  return (
    <ShopShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(item)) }} />
      <div className="bg-ink pb-6 pt-28 lg:pt-32" />
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold text-slate">
          <a href="/" className="hover:text-teal">Home</a> › <a href="/shop" className="hover:text-teal">Shop</a> › <a href={categoryHref(category.id)} className="hover:text-teal">{category.name}</a> › <span aria-current="page" className="text-ink">{item.name}</span>
        </nav>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <ProductGallery product={item} />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">{category.name} · {item.type}</p>
            <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl"><RevealLines>{item.name}</RevealLines></h1>
            <div className="mt-6"><ProductPurchasePanel product={item} /></div>
          </div>
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <ProductSpecifications product={item} />
          <section aria-labelledby="reviews" className="h-fit rounded-3xl bg-white p-6 ring-1 ring-ink/5">
            <MessageSquareQuote className="size-7 text-teal" strokeWidth={1.4} aria-hidden />
            <h2 id="reviews" className="mt-4 font-display text-2xl font-bold">Reviews</h2>
            <p className="mt-2 text-sm leading-6 text-slate">No reviews yet. Only verified buyers will be able to review this product.</p>
          </section>
        </div>
        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="related">
            <h2 id="related" className="font-display text-3xl font-black"><RevealLines>You might also need</RevealLines></h2>
            <RevealGroup className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">{related.map((p) => <ProductCard key={p.slug} product={p} />)}</RevealGroup>
          </section>
        )}
      </div>
    </ShopShell>
  )
}
