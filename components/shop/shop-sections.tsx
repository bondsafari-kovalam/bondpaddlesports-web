import type { ReactNode } from 'react'
import { ArrowRight, BadgePercent, CalendarCheck, CircleHelp, RotateCcw, Store, Truck } from 'lucide-react'
import { DemoShopBanner } from '@/components/shop/cart'
import { BulkOrderForm } from '@/components/shop/shop-forms'
import { ProductVisual, StarterKitCard } from '@/components/shop/product-bits'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { HYGIENE_POLICY, MEMBER_DISCOUNTS, getProduct, productHref } from '@/lib/shop'
import { ROUTES } from '@/lib/site'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { HERO_IMAGES } from '@/lib/hero-images'

export const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-7 text-sm font-semibold text-ink transition hover:bg-white ${focusRing}`
export const ghost = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink ${focusRing}`

export function ShopShell({ children, bookHref }: { children: ReactNode; bookHref?: string }) {
  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <DemoShopBanner />
      <div className="relative">
        <SiteHeader bookHref={bookHref} />
        {children}
      </div>
      <SiteFooter />
    </main>
  )
}

export function PageHero({ eyebrow, title, description, children, compact = false, soft = false, image = HERO_IMAGES.shop }: { eyebrow: string; title: ReactNode; description?: string; children?: ReactNode; compact?: boolean; soft?: boolean; image?: string }) {
  return (
    <section className={`relative overflow-hidden bg-ink text-white ${compact ? 'pb-10 pt-32 lg:pt-36' : 'pb-16 pt-36 lg:pb-24 lg:pt-44'}`}>
      <HeroBackdrop src={image} soft={soft} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> {eyebrow}</p>
        <h1 className={`font-display font-black leading-[.98] tracking-tight ${compact ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-7xl'}`}><RevealLines>{title}</RevealLines></h1>
        {description && <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{description}</p>}
        {children}
      </div>
    </section>
  )
}

/** Quick-scan service promises shown right under the shop hero. */
export function ShopServiceStrip() {
  const help = [
    { label: 'Shipping', href: '/shop/help#shipping' },
    { label: 'Care', href: '/shop/help#care' },
    { label: 'FAQs', href: '/shop/help#faqs' },
    { label: 'Contact', href: '/shop/help#contact' },
  ]
  const items: { icon: typeof Truck; title: string; body: ReactNode }[] = [
    { icon: Truck, title: 'Delivery across India', body: 'Charges depend on the product and destination, shown at checkout.' },
    { icon: Store, title: 'Click-and-collect', body: 'Collect at operating sites or hubs, where configured.' },
    { icon: RotateCcw, title: 'Returns', body: HYGIENE_POLICY },
    { icon: CircleHelp, title: 'Need help?', body: <span className="flex flex-wrap gap-x-3 gap-y-1">{help.map(({ label, href }) => <a key={label} href={href} className={`font-semibold text-ink underline-offset-4 hover:underline ${focusRing}`}>{label}</a>)}</span> },
  ]
  return (
    <section aria-label="Delivery, returns and help" className="border-b border-line bg-paper-bright">
      <ul className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex gap-4 border-b border-line px-5 py-6 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:px-8 lg:last:border-r-0">
            <Icon className="mt-0.5 size-5 shrink-0 text-teal-strong" strokeWidth={1.6} aria-hidden />
            <div><p className="text-sm font-semibold">{title}</p><div className="mt-1 text-xs leading-5 text-slate">{body}</div></div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProductTile({ slug, note, dark = false }: { slug: string; note: string; dark?: boolean }) {
  const item = getProduct(slug)!
  return (
    <li>
      <a href={productHref(item)} className={`group block ${focusRing}`}>
        <span className="block overflow-hidden rounded-2xl"><ProductVisual product={item} className="aspect-[4/3] w-full transition duration-700 group-hover:scale-105" /></span>
        <span className="mt-3 block font-display text-lg font-bold tracking-tight">{item.name}</span>
        <span className={`mt-0.5 flex items-center gap-1 text-xs font-semibold ${dark ? 'text-teal-pale group-hover:text-sand' : 'text-teal-strong group-hover:text-ink'}`}>{note} <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden /></span>
      </a>
    </li>
  )
}

export function PaddlingEssentials() {
  return (
    <section className="bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="essentials">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <Eyebrow tone="cyan">Paddling essentials</Eyebrow>
          <h2 id="essentials" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>The kit that<br /><span className="text-sand">goes on the water.</span></RevealLines></h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70">Paddles, buoyancy aids, dry bags and helmets. Each product page lists only verified specifications, and buoyancy aids show their certification standard once it has been confirmed.</p>
        </div>
        <RevealGroup as="ul" className="grid grid-cols-2 gap-x-4 gap-y-8">{['paddle', 'buoyancy-aid', 'dry-bag', 'helmet'].map((slug) => <ProductTile key={slug} slug={slug} note={getProduct(slug)!.type} dark />)}</RevealGroup>
      </div>
    </section>
  )
}

export function StarterKitSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="kits">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <Eyebrow>Academy starter kits</Eyebrow>
          <h2 id="kits" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Everything you need to get started.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-slate-strong">Relevant starter kits can be offered during Academy course enrolment. Academy learners receive 10% off eligible kit purchases for 30 days after their course, once verified.</p>
        </div>
        <StarterKitCard product={getProduct('academy-starter-kit')!} />
      </div>
    </section>
  )
}

export function BookingAddOnSection() {
  return (
    <section className="border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="add-to-booking">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <Eyebrow>Add gear to your paddle</Eyebrow>
          <h2 id="add-to-booking" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Pick it up at the jetty.</RevealLines></h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-strong">Eligible items such as rash guards and dry bags can be added to a paddle booking and collected at your jetty, once booking-linked purchases and collection points are connected.</p>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate"><CalendarCheck className="size-4" aria-hidden />Look for “Add to my booking” on eligible products.</p>
        </div>
        <RevealGroup as="ul" className="grid grid-cols-2 gap-4">{['rash-guard', 'dry-bag'].map((slug) => <ProductTile key={slug} slug={slug} note="Booking add-on eligible" />)}</RevealGroup>
      </div>
    </section>
  )
}

export function MembershipSection() {
  return (
    <section className="px-5 pb-24 lg:px-8 lg:pb-32" aria-labelledby="membership">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-3xl bg-sand p-8 sm:p-12 lg:flex-row lg:items-end">
        <div>
          <BadgePercent className="size-8" strokeWidth={1.4} aria-hidden />
          <h2 id="membership" className="mt-6 max-w-2xl font-display text-3xl font-black tracking-tight sm:text-4xl"><RevealLines>{MEMBER_DISCOUNTS.bondBlue.rule}</RevealLines></h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink/75">{MEMBER_DISCOUNTS.stacking} Your discount is applied at checkout once your membership has been verified.</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a href={ROUTES.membership} className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}>Compare membership <ArrowRight className="size-4" aria-hidden /></a>
          <a href={ROUTES.membership} className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Join Bond Safari Club</a>
        </div>
      </div>
    </section>
  )
}

export function BulkOrderSection() {
  return (
    <section id="bulk" className="scroll-mt-20 border-t border-line bg-paper-bright px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="bulk-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Corporate & bulk orders</Eyebrow>
          <h2 id="bulk-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Merchandise for your team.</RevealLines></h2>
          <p className="mt-4 text-base leading-7 text-slate-strong">Branded apparel, gear for groups, or SUP boards and kayaks made to order. Tell us what you need and we’ll prepare a quote.</p>
        </div>
        <BulkOrderForm />
      </div>
    </section>
  )
}
