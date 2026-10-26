import type { ReactNode } from 'react'
import { ArrowRight, BadgePercent, CalendarCheck, CircleHelp, FileText, HeartHandshake, LifeBuoy, Package, RotateCcw, Sparkles, Store, Truck } from 'lucide-react'
import { DemoShopBanner } from '@/components/shop/cart'
import { BulkOrderForm } from '@/components/shop/shop-forms'
import { StarterKitCard } from '@/components/shop/product-bits'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { HYGIENE_POLICY, MEMBER_DISCOUNTS, getProduct, productHref } from '@/lib/shop'
import { ROUTES } from '@/lib/site'

export const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`
export const ghost = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`

export function ShopShell({ children, bookHref }: { children: ReactNode; bookHref?: string }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
      <DemoShopBanner />
      <div className="relative">
        <SiteHeader bookHref={bookHref} />
        {children}
      </div>
      <SiteFooter />
    </main>
  )
}

export function PageHero({ eyebrow, title, description, children, compact = false }: { eyebrow: string; title: ReactNode; description?: string; children?: ReactNode; compact?: boolean }) {
  return (
    <section className={`relative overflow-hidden bg-[#06263b] text-white ${compact ? 'pb-10 pt-32 lg:pt-36' : 'pb-16 pt-36 lg:pb-24 lg:pt-44'}`}>
      <div className="absolute -right-24 top-20 size-[28rem] rounded-full border-[48px] border-[#00c8e8]/[.06]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> {eyebrow}</p>
        <h1 className={`font-display font-black leading-[.98] tracking-tight ${compact ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-7xl'}`}>{title}</h1>
        {description && <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{description}</p>}
        {children}
      </div>
    </section>
  )
}

export function PaddlingEssentials() {
  const items = ['paddle', 'buoyancy-aid', 'dry-bag', 'helmet'].map((slug) => getProduct(slug)!)
  return (
    <section className="bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-28" aria-labelledby="essentials">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <Eyebrow tone="cyan">Paddling essentials</Eyebrow>
          <h2 id="essentials" className="mt-3 font-display text-4xl font-black sm:text-5xl">The kit that<br /><span className="text-[#f5b82e]">goes on the water.</span></h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70">Paddles, buoyancy aids, dry bags and helmets. Each product page lists only verified specifications, and buoyancy aids show their certification standard once it has been confirmed.</p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <li key={item.slug}>
              <a href={productHref(item)} className={`group flex h-full flex-col rounded-3xl bg-white/[.06] p-5 transition hover:bg-white/10 ${focusRing}`}>
                <LifeBuoy className="size-7 text-[#00c8e8]" strokeWidth={1.3} aria-hidden />
                <span className="mt-8 font-display text-xl font-bold">{item.name}</span>
                <span className="mt-1 text-sm text-white/60">{item.type}</span>
                <span className="mt-4 text-xs font-bold text-[#f5b82e]">View product <ArrowRight className="inline size-3.5" aria-hidden /></span>
              </a>
            </li>
          ))}
        </ul>
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
          <h2 id="kits" className="mt-3 font-display text-4xl font-black sm:text-5xl">Everything you need to get started.</h2>
          <p className="mt-5 text-base leading-7 text-[#3d5862]">Relevant starter kits can be offered during Academy course enrolment. Academy learners receive 10% off eligible kit purchases for 30 days after their course, once verified.</p>
        </div>
        <StarterKitCard product={getProduct('academy-starter-kit')!} />
      </div>
    </section>
  )
}

export function BookingAddOnSection() {
  const items = ['rash-guard', 'dry-bag'].map((slug) => getProduct(slug)!)
  return (
    <section className="bg-[#eef2ed] px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="add-to-booking">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Add gear to your paddle</Eyebrow>
            <h2 id="add-to-booking" className="mt-3 font-display text-4xl font-black sm:text-5xl">Pick it up at the jetty.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#3d5862]">Eligible items such as rash guards and dry bags can be added to a paddle booking and collected at your jetty, once booking-linked purchases and collection points are connected.</p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#57717b]"><CalendarCheck className="size-4" aria-hidden />Look for “Add to my booking” on eligible products.</p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {items.map((item) => <li key={item.slug}><a href={productHref(item)} className={`flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-[#06263b]/5 hover:shadow-lg ${focusRing}`}><Package className="size-7 text-[#00a9c3]" aria-hidden /><span className="mt-6 font-display text-lg font-bold">{item.name}</span><span className="mt-1 text-xs font-bold text-[#0b7f95]">Booking add-on eligible</span></a></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function MembershipSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8" aria-labelledby="membership">
      <div className="relative overflow-hidden rounded-3xl bg-[#f5b82e] p-8 sm:p-12">
        <div className="absolute -right-16 -top-16 size-64 rounded-full border-[28px] border-white/20" aria-hidden />
        <BadgePercent className="relative size-9" strokeWidth={1.4} aria-hidden />
        <h2 id="membership" className="relative mt-6 max-w-2xl font-display text-3xl font-black sm:text-4xl">{MEMBER_DISCOUNTS.bondBlue.rule}</h2>
        <p className="relative mt-3 max-w-xl text-sm leading-6 text-[#06263b]/75">{MEMBER_DISCOUNTS.stacking} Your discount is applied at checkout once your membership has been verified.</p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <a href={ROUTES.membership} className={`inline-flex min-h-12 items-center rounded-full bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white ${focusRing}`}>Compare membership</a>
          <a href={ROUTES.membership} className={`inline-flex min-h-12 items-center rounded-full border border-[#06263b]/30 px-6 text-sm font-bold ${focusRing}`}>Join Bond Safari Club</a>
          <a href={ROUTES.membership} className={`inline-flex min-h-12 items-center rounded-full border border-[#06263b]/30 px-6 text-sm font-bold ${focusRing}`}>View membership benefits</a>
        </div>
      </div>
    </section>
  )
}

export function FulfilmentAndSupport() {
  const support = [
    { icon: Truck, label: 'Shipping and returns', href: '/shop/help#shipping' },
    { icon: Sparkles, label: 'Product care', href: '/shop/help#care' },
    { icon: HeartHandshake, label: 'Contact', href: '/shop/help#contact' },
    { icon: CircleHelp, label: 'FAQs', href: '/shop/help#faqs' },
    { icon: FileText, label: 'Membership terms', href: '/shop/help#membership-terms' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8" aria-labelledby="fulfilment">
      <h2 id="fulfilment" className="font-display text-3xl font-black">Delivery & collection</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5"><Truck className="size-8 text-[#00a9c3]" strokeWidth={1.4} aria-hidden /><h3 className="mt-5 font-display text-xl font-bold">Delivery across India</h3><p className="mt-2 text-sm leading-6 text-[#57717b]">Delivery estimates and charges depend on the product and destination, and are shown at checkout once configured.</p></div>
        <div className="rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5"><Store className="size-8 text-[#00a9c3]" strokeWidth={1.4} aria-hidden /><h3 className="mt-5 font-display text-xl font-bold">Click-and-collect</h3><p className="mt-2 text-sm leading-6 text-[#57717b]">Collect at operating sites or hubs where configured. Collection points will be listed on eligible products once set up.</p></div>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-[#7a4f00]"><RotateCcw className="size-4" aria-hidden />{HYGIENE_POLICY}</p>
      <nav aria-label="Shop support" className="mt-10 flex flex-wrap gap-2">
        {support.map(({ icon: Icon, label, href }) => <a key={label} href={href} className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold ring-1 ring-[#06263b]/10 hover:ring-[#06263b] ${focusRing}`}><Icon className="size-4 text-[#00a9c3]" aria-hidden />{label}</a>)}
      </nav>
    </section>
  )
}

export function BulkOrderSection() {
  return (
    <section id="bulk" className="scroll-mt-6 bg-white px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="bulk-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Corporate & bulk orders</Eyebrow>
          <h2 id="bulk-title" className="mt-3 font-display text-4xl font-black">Merchandise for your team.</h2>
          <p className="mt-4 text-base leading-7 text-[#3d5862]">Branded apparel, gear for groups, or SUP boards and kayaks made to order. Tell us what you need and we’ll prepare a quote.</p>
        </div>
        <BulkOrderForm />
      </div>
    </section>
  )
}
