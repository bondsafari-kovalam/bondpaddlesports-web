'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, LayoutGrid, Map as MapIcon, SearchX } from 'lucide-react'
import { LocationCard } from '@/components/locations/location-card'
import { ActiveFilterChips, LocationFilters, LocationSearch, emptyFilters, matchesFilters, type Filters } from '@/components/locations/location-filters'
import { LocationMap } from '@/components/locations/location-map'
import { LocationRoadmap } from '@/components/locations/location-roadmap'
import { Eyebrow, IllustrativeLabel, focusRing } from '@/components/locations/primitives'
import { DESTINATION_TARGET, locations, type Location } from '@/lib/locations'
import { HeroImage, RevealGroup, RevealLines } from '@/components/motion/reveal'

const heroImage = locations.find((location) => location.status === 'operating' && location.image)?.image

export function LocationsHero({ query, onQueryChange }: { query: string; onQueryChange: (query: string) => void }) {
  const operating = locations.filter((location) => location.status === 'operating').length
  const openingSoon = locations.filter((location) => location.status === 'opening-soon').length

  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden bg-[#06263b] pb-14 pt-40 text-white lg:min-h-[700px] lg:pb-20">
      {heroImage && <HeroImage src={heroImage.src} alt="" />}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,38,59,.92)_0%,rgba(6,38,59,.6)_50%,rgba(6,38,59,.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,38,59,.95),transparent_60%)]" />
      {heroImage?.illustrative && <IllustrativeLabel className="absolute bottom-4 right-4 z-10" />}
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> Explore Kerala</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl"><RevealLines>Find your place<br /><span className="text-[#f5b82e]">on the water.</span></RevealLines></h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">From peaceful backwaters and heritage waterways to coastal adventures, discover the places where your next paddle begins.</p>
          <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={(event) => { event.preventDefault(); document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' }) }} role="search">
            <div className="flex-1"><LocationSearch id="hero-location-search" value={query} onChange={onQueryChange} tone="dark" /></div>
            <button type="submit" className={`inline-flex items-center justify-center rounded-2xl bg-[#f5b82e] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`}>Explore locations <ArrowRight className="ml-2 size-4" aria-hidden /></button>
          </form>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div className="flex items-baseline gap-2"><dd className="font-display text-2xl font-bold text-[#f5b82e]">{operating}</dd><dt className="text-white/70">operating now</dt></div>
            <div className="flex items-baseline gap-2"><dd className="font-display text-2xl font-bold">{openingSoon}</dd><dt className="text-white/70">opening January 2027</dt></div>
            <div className="flex items-baseline gap-2"><dd className="font-display text-2xl font-bold">{DESTINATION_TARGET.count}</dd><dt className="text-white/70">destinations planned by {DESTINATION_TARGET.by}</dt></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

export function LocationGrid({ title, description, locations }: { title: string; description?: string; locations: Location[] }) {
  if (locations.length === 0) return null
  return (
    <section aria-label={title}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        {description && <p className="text-sm text-[#57717b]">{description}</p>}
      </div>
      <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{locations.map((location) => <LocationCard key={location.slug} location={location} />)}</RevealGroup>
    </section>
  )
}

export function LocationsExplorer() {
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [view, setView] = useState<'list' | 'map'>('list')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const results = useMemo(() => locations.filter((location) => matchesFilters(location, filters)), [filters])

  const operating = results.filter((location) => location.status === 'operating')
  const openingSoon = results.filter((location) => location.status === 'opening-soon')
  const future = results.filter((location) => location.status === 'coming-soon')

  return (
    <>
      <LocationsHero query={filters.query} onQueryChange={(query) => setFilters({ ...filters, query })} />

      <section id="directory" className="relative z-10 mx-auto -mt-8 max-w-7xl scroll-mt-6 px-5 lg:-mt-12 lg:px-8">
        <div className="rounded-3xl bg-white p-4 shadow-[0_20px_60px_rgba(6,38,59,.16)] sm:p-6">
          <div className="mb-4 hidden items-center justify-between lg:flex">
            <div><Eyebrow>Location directory</Eyebrow><h2 className="mt-2 font-display text-2xl font-bold">Where will you paddle?</h2></div>
          </div>
          <LocationFilters locations={locations} filters={filters} setFilters={setFilters} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8 lg:pb-28">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#3d5862]" role="status" aria-live="polite"><span className="font-display text-lg font-bold text-[#06263b]">{results.length}</span> of {locations.length} locations</p>
            <ActiveFilterChips filters={filters} setFilters={setFilters} />
          </div>
          <div className="inline-flex w-fit rounded-full bg-white p-1 ring-1 ring-[#dfe6e5]" role="group" aria-label="View">
            {([['list', 'List', LayoutGrid], ['map', 'Map', MapIcon]] as const).map(([value, label, Icon]) => (
              <button key={value} type="button" onClick={() => setView(value)} aria-pressed={view === value} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${view === value ? 'bg-[#06263b] text-white' : 'text-[#3d5862] hover:text-[#06263b]'} ${focusRing}`}>
                <Icon className="size-4" aria-hidden /> {label}
              </button>
            ))}
          </div>
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-[#06263b]/15 bg-white px-6 py-16 text-center">
            <SearchX className="size-10 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
            <h3 className="mt-4 font-display text-2xl font-bold">No locations match yet</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#57717b]">Try a different name or remove a filter. New destinations are added as they are confirmed.</p>
            <button type="button" onClick={() => setFilters(emptyFilters)} className={`mt-6 rounded-full bg-[#06263b] px-5 py-3 text-sm font-bold text-white ${focusRing}`}>Clear all filters</button>
          </div>
        ) : view === 'map' ? (
          <LocationMap key={results.map((location) => location.slug).join()} locations={results} />
        ) : (
          <div className="space-y-14">
            <LocationGrid title="Paddling now" description="Open for guests today" locations={operating} />
            <LocationGrid title="Opening January 2027" description="Planned openings, subject to confirmation" locations={openingSoon} />
            {future.length > 0 && (
              <section aria-label="Coming soon">
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold">Coming soon</h3>
                  <p className="text-sm text-[#57717b]">Planned expansion · no confirmed dates</p>
                </div>
                <LocationRoadmap locations={future} />
              </section>
            )}
          </div>
        )}
      </section>
    </>
  )
}
