'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, CalendarClock, LayoutGrid, Map as MapIcon, SearchX } from 'lucide-react'
import { LocationImageFallback } from '@/components/locations/location-card'
import { ActiveFilterChips, LocationFilters, LocationSearch, emptyFilters, matchesFilters, type Filters } from '@/components/locations/location-filters'
import { LocationMap } from '@/components/locations/location-map'
import { LocationRoadmap } from '@/components/locations/location-roadmap'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { IllustrativeLabel, LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { HeroFilm } from '@/components/motion/ambient-video'
import { CountUp, ParallaxImage, Reveal, RevealGroup, RevealLines } from '@/components/motion/reveal'
import { SectionNav } from '@/components/site/section-nav'
import { ACTIVITY_LABELS, DESTINATION_TARGET, formatDate, formatPrice, locationHref, locations, type Location } from '@/lib/locations'

const SECTIONS = [
  { id: 'paddling-now', label: 'Paddling now', status: 'operating' },
  { id: 'opening-soon', label: 'Opening 2027', status: 'opening-soon' },
  { id: 'coming-soon', label: 'Coming soon', status: 'coming-soon' },
] as const

export function LocationsHero() {
  const operating = locations.filter((location) => location.status === 'operating').length
  const openingSoon = locations.filter((location) => location.status === 'opening-soon').length

  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink pb-12 pt-40 text-white lg:pb-16">
      <HeroFilm src="/video/sup-loop.mp4" poster="/video/sup-poster.jpg" focus="62% 50%" />

      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> Explore Kerala</p>
        <h1 className="max-w-3xl font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl lg:text-8xl"><RevealLines delay={0.3}>Find your place<br /><span className="text-sand">on the water.</span></RevealLines></h1>
        <Reveal as="p" delay={0.6} className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">From peaceful backwaters and heritage waterways to coastal adventures, discover where your next paddle begins.</Reveal>

        <Reveal delay={0.8} className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <dl className="grid grid-cols-3 gap-6 sm:gap-12">
            <div><dd className="font-display text-4xl font-bold text-sand sm:text-5xl"><CountUp value={operating} /></dd><dt className="mt-1 text-xs text-white/70 sm:text-sm">Operating now</dt></div>
            <div><dd className="font-display text-4xl font-bold sm:text-5xl"><CountUp value={openingSoon} /></dd><dt className="mt-1 text-xs text-white/70 sm:text-sm">Opening January 2027</dt></div>
            <div><dd className="font-display text-4xl font-bold sm:text-5xl"><CountUp value={DESTINATION_TARGET.count} /></dd><dt className="mt-1 text-xs text-white/70 sm:text-sm">Planned by {DESTINATION_TARGET.by}</dt></div>
          </dl>
          <a href="#directory" className={`inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-sand ${focusRing}`}>Browse locations <ArrowDown className="size-4" aria-hidden /></a>
        </Reveal>
      </div>
    </section>
  )
}

function DirectoryToolbar({ filters, setFilters, view, setView, sections }: {
  filters: Filters
  setFilters: (filters: Filters) => void
  view: 'list' | 'map'
  setView: (view: 'list' | 'map') => void
  sections: { id: string; label: string; count: number }[]
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {view === 'list' && sections.length > 0 ? (
          <SectionNav sections={sections} label="Location sections" layoutId="location-section-pill" />
        ) : <p className="font-display text-lg font-bold">All locations</p>}

        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1 lg:w-72 lg:flex-none"><LocationSearch value={filters.query} onChange={(query) => setFilters({ ...filters, query })} /></div>
          <LocationFilters locations={locations} filters={filters} setFilters={setFilters} />
          <div className="inline-flex h-11 shrink-0 rounded-full border border-line bg-white p-1" role="group" aria-label="View">
            {([['list', 'List', LayoutGrid], ['map', 'Map', MapIcon]] as const).map(([value, label, Icon]) => (
              <button key={value} type="button" onClick={() => setView(value)} aria-pressed={view === value} className={`inline-flex items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition ${view === value ? 'bg-ink text-white' : 'text-slate-strong hover:text-ink'} ${focusRing}`}>
                <Icon className="size-4" aria-hidden /><span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeading({ id, index, title, description }: { id: string; index: number; title: string; description: string }) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-3 border-b border-line pb-6 sm:flex-row sm:items-end lg:mb-14">
      <h2 id={`${id}-title`} className="font-display text-4xl font-black tracking-tight sm:text-5xl"><span className="mr-4 align-top text-sm font-semibold tracking-[0.3em] text-slate-light">0{index}</span><RevealLines>{title}</RevealLines></h2>
      <p className="max-w-sm text-sm leading-6 text-slate">{description}</p>
    </div>
  )
}

/** Large editorial row for an operating location; image and copy swap sides down the list. */
function FeaturedLocation({ location, flip }: { location: Location; flip: boolean }) {
  const href = locationHref(location)
  return (
    <article className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
      <a href={href} tabIndex={-1} aria-hidden className={`relative block lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        {location.image
          ? <ParallaxImage src={location.image.src} alt="" className="aspect-[4/3] rounded-3xl lg:aspect-[16/11]" imgClassName="transition duration-1000 group-hover:scale-105" strength={6} />
          : <div className="aspect-[4/3] overflow-hidden rounded-3xl"><LocationImageFallback /></div>}
        <LocationStatusBadge status={location.status} className="absolute left-5 top-5" />
        {location.image?.illustrative && <IllustrativeLabel className="absolute bottom-4 right-4" />}
      </a>
      <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-strong">{location.region}</p>
        <h3 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><a href={href} className={`rounded transition hover:text-teal ${focusRing}`}>{location.name}</a></h3>
        <p className="mt-2 text-sm text-slate">{[location.context, ...location.waterTypes].join(' · ')}</p>
        {location.summary && <p className="mt-6 max-w-md text-base leading-7 text-slate-strong">{location.summary}</p>}
        {location.activities.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Activities running now">
            {location.activities.map((activity) => <li key={activity.id} className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium">{ACTIVITY_LABELS[activity.id]}</li>)}
          </ul>
        )}
        {(location.operatingSince || location.startingPrice) && (
          <dl className="mt-8 grid grid-cols-2 divide-x divide-line border-y border-line">
            {location.operatingSince && <div className="py-4 pr-4"><dt className="text-xs text-slate">Operating since</dt><dd className="mt-1 font-display text-lg font-bold">{formatDate(location.operatingSince)}</dd></div>}
            {location.startingPrice && <div className="py-4 pl-6"><dt className="text-xs text-slate">Sessions from</dt><dd className="mt-1 font-display text-lg font-bold">{formatPrice(location.startingPrice)}</dd></div>}
          </dl>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={`${href}#book`} className={`inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-strong ${focusRing}`} aria-label={`Book ${location.name}`}>Book a session <ArrowRight className="size-4" aria-hidden /></a>
          <a href={href} className={`inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-sm font-semibold transition hover:border-ink ${focusRing}`}>View location <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </div>
      </Reveal>
    </article>
  )
}

function UpcomingLocation({ location }: { location: Location }) {
  const href = locationHref(location)
  return (
    <article className="group">
      <a href={href} tabIndex={-1} aria-hidden className="relative block">
        {location.image
          ? <ParallaxImage src={location.image.src} alt="" className="aspect-[16/10] rounded-3xl" imgClassName="transition duration-1000 group-hover:scale-105" strength={5} />
          : <div className="aspect-[16/10] overflow-hidden rounded-3xl"><LocationImageFallback /></div>}
        <LocationStatusBadge status={location.status} className="absolute left-5 top-5" />
        {location.image?.illustrative && <IllustrativeLabel className="absolute bottom-4 right-4" />}
      </a>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-3xl font-black tracking-tight"><a href={href} className={`rounded transition hover:text-teal ${focusRing}`}>{location.name}</a></h3>
          <p className="mt-1 text-sm text-slate">{[location.context, ...location.waterTypes].join(' · ')}</p>
          {location.plannedOpening && <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-teal-strong"><CalendarClock className="size-4" aria-hidden />{location.plannedOpening}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <NotifyMeButton name={location.name} slug={location.slug} />
          <a href={href} className={`inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-teal ${focusRing}`} aria-label={`View ${location.name}`}>Details <ArrowRight className="size-4" aria-hidden /></a>
        </div>
      </div>
    </article>
  )
}

export function LocationsExplorer() {
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [view, setView] = useState<'list' | 'map'>('list')
  const results = useMemo(() => locations.filter((location) => matchesFilters(location, filters)), [filters])

  const byStatus = (status: Location['status']) => results.filter((location) => location.status === status)
  const operating = byStatus('operating')
  const openingSoon = byStatus('opening-soon')
  const future = byStatus('coming-soon')
  const sections = SECTIONS.map((section) => ({ ...section, count: byStatus(section.status).length })).filter((section) => section.count > 0)

  return (
    <>
      <LocationsHero />

      <div id="directory">
        <DirectoryToolbar filters={filters} setFilters={setFilters} view={view} setView={setView} sections={sections} />

        <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 lg:px-8 lg:pb-32">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <p className="text-sm text-slate" role="status" aria-live="polite"><span className="font-semibold text-ink">{results.length}</span> of {locations.length} locations</p>
            <ActiveFilterChips filters={filters} setFilters={setFilters} />
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-ink/15 px-6 py-20 text-center">
              <SearchX className="size-10 text-teal" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-4 font-display text-2xl font-bold">No locations match yet</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate">Try a different name or remove a filter. New destinations are added as they are confirmed.</p>
              <button type="button" onClick={() => setFilters(emptyFilters)} className={`mt-6 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white ${focusRing}`}>Clear all filters</button>
            </div>
          ) : view === 'map' ? (
            <LocationMap key={results.map((location) => location.slug).join()} locations={results} />
          ) : (
            <div className="space-y-28 lg:space-y-36">
              {operating.length > 0 && (
                <section id="paddling-now" aria-labelledby="paddling-now-title" className="scroll-mt-24">
                  <SectionHeading id="paddling-now" index={1} title="Paddling now" description="Open for guests today, on the Muziris backwaters and the Kovalam coast." />
                  <div className="space-y-24 lg:space-y-32">{operating.map((location, i) => <FeaturedLocation key={location.slug} location={location} flip={i % 2 === 1} />)}</div>
                </section>
              )}
              {openingSoon.length > 0 && (
                <section id="opening-soon" aria-labelledby="opening-soon-title" className="scroll-mt-24">
                  <SectionHeading id="opening-soon" index={2} title="Opening January 2027" description="Planned openings, subject to confirmation. Ask to be told the moment bookings open." />
                  <RevealGroup className="grid gap-x-8 gap-y-16 md:grid-cols-2">{openingSoon.map((location) => <UpcomingLocation key={location.slug} location={location} />)}</RevealGroup>
                </section>
              )}
              {future.length > 0 && (
                <section id="coming-soon" aria-labelledby="coming-soon-title" className="scroll-mt-24">
                  <SectionHeading id="coming-soon" index={3} title="Coming soon" description="Planned expansion with no confirmed dates yet." />
                  <LocationRoadmap locations={future} />
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
