import type { Metadata } from 'next'
import { GroupBooking } from '@/components/booking/group-booking'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { readBookingStart } from '@/lib/group-booking'
import { HERO_IMAGES } from '@/lib/hero-images'
import { ROUTES } from '@/lib/site'

const description = 'Book kayaking, canoeing or stand-up paddleboarding with Bond Safari, for yourself or your whole group, in one booking.'

export const metadata: Metadata = {
  title: 'Book your paddle | Bond Safari Paddle Sports',
  description,
  alternates: { canonical: ROUTES.book },
  openGraph: { title: 'Book your paddle | Bond Safari Paddle Sports', description, url: ROUTES.book, type: 'website' },
}

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const start = readBookingStart(await searchParams)
  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <SiteHeader bookHref="#booking" />
      <section className="relative overflow-hidden bg-ink pb-14 pt-36 text-white lg:pb-16 lg:pt-44">
        <HeroBackdrop src={HERO_IMAGES.groups} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale">Book</p>
          <h1 className="max-w-3xl font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl">Book your paddle. <span className="text-sand">Solo or together.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80">Come on your own or bring the whole group. Add activities, choose who joins each one, and book it all at once.</p>
        </div>
      </section>
      <div id="booking" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 lg:px-8 lg:py-16">
        <GroupBooking start={start} />
      </div>
      <SiteFooter />
    </main>
  )
}
