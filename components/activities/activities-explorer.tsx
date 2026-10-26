'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Info, MapPin, SearchX } from 'lucide-react'
import { ActivityCard, ActivityCategoryCard, ActivityVisual } from '@/components/activities/activity-card'
import { ActiveActivityChips, ActivityFilters, emptyActivityFilters, matchesActivityFilters, sortOptions, startingPriceSort, type ActivityFilterState, type SortKey } from '@/components/activities/activity-filters'
import { Eyebrow, LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { activities, activitiesAt, activityHref } from '@/lib/activities'
import { locationHref, locations } from '@/lib/locations'
import { ROUTES } from '@/lib/site'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'

const featured = activities.filter((activity) => activity.featured)

export function ActivitiesHero() {
  return (
    <section className="relative overflow-hidden bg-[#06263b] pb-16 pt-36 text-white lg:pb-24 lg:pt-44">
      <div className="absolute -right-24 top-24 size-[28rem] rounded-full border-[48px] border-[#00c8e8]/[.06]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> Explore our experiences</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl"><RevealLines>Find your rhythm<br /><span className="text-[#f5b82e]">on the water.</span></RevealLines></h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">Discover Kerala from a different perspective. Paddle through peaceful backwaters, explore beautiful waterways and find an experience that matches your pace.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#all-activities" className={`inline-flex min-h-12 items-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`}>Explore activities <ArrowRight className="ml-2 size-4" aria-hidden /></a>
            <a href={ROUTES.locations} className={`inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`}>Find a location</a>
          </div>
        </div>
        {/* Replace these placeholders with approved Bond paddling photography or video. */}
        <RevealGroup className="grid grid-cols-3 gap-3" aria-hidden>{featured.map((activity, index) => (
            <div key={activity.slug} className={index === 1 ? 'translate-y-8' : ''}>
              <ActivityVisual activity={activity} showLabel={false} className="aspect-[3/5] rounded-3xl" />
              <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/70">{activity.slug === 'stand-up-paddleboarding' ? 'SUP' : activity.name}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function LocationAvailabilityOverview() {
  const shown = locations.filter((location) => location.hasDetailPage)
  return (
    <section className="bg-[#eef2ed] px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="by-location">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Activities by location</Eyebrow>
        <h2 id="by-location" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Where can you paddle?</RevealLines></h2>
        <p className="mt-4 flex max-w-2xl gap-2 text-sm leading-6 text-[#3d5862]"><Info className="mt-1 size-4 shrink-0 text-[#c95a22]" aria-hidden />Activity line-ups marked “preview” are demonstration pairings until Bond confirms what runs at each location. Session times appear here once the booking engine is connected.</p>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{shown.map((location) => {
            const offered = activitiesAt(location.slug)
            return (
              <article key={location.slug} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
                <LocationStatusBadge status={location.status} className="w-fit" />
                <h3 className="mt-4 font-display text-xl font-bold">{location.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-[#57717b]"><MapPin className="size-3.5" aria-hidden />{[location.context, ...location.waterTypes].join(' · ')}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {offered.length
                    ? offered.map((activity) => {
                        const demo = activity.offerings.find((o) => o.locationSlug === location.slug)?.source === 'demo'
                        return <li key={activity.slug}><a href={activityHref(activity)} className="font-semibold text-[#06263b] hover:text-[#0b7f95]">{activity.name}</a>{demo && <span className="ml-2 rounded-full bg-[#fff1cf] px-2 py-0.5 text-[10px] font-bold uppercase text-[#7a4f00]">Preview</span>}</li>
                      })
                    : <li className="text-sm italic text-[#57717b]">Activity line-up to be confirmed</li>}
                </ul>
                <a href={locationHref(location)} className={`mt-6 inline-flex min-h-11 items-center text-sm font-bold text-[#0b7f95] hover:text-[#06263b] ${focusRing}`}>View location <ArrowRight className="ml-1 size-4" aria-hidden /></a>
              </article>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

export function ActivitiesExplorer() {
  const [filters, setFilters] = useState<ActivityFilterState>(emptyActivityFilters)
  const [sort, setSort] = useState<SortKey>('recommended')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const sorts = sortOptions(activities)

  const results = useMemo(() => {
    const filtered = activities.filter((activity) => matchesActivityFilters(activity, filters))
    if (sort === 'price') return [...filtered].sort(startingPriceSort)
    if (sort === 'duration') return [...filtered].sort((a, b) => (a.durationMinutes ?? Infinity) - (b.durationMinutes ?? Infinity))
    return filtered
  }, [filters, sort])

  return (
    <>
      <ActivitiesHero />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="featured-title">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div><Eyebrow>Choose an activity first</Eyebrow><h2 id="featured-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Your kind of adventure<br />starts here.</RevealLines></h2></div>
          <p className="max-w-lg text-base leading-7 text-[#3d5862]">From a relaxed first paddle to a guided water trail, discover experiences designed around your interests, the location and the conditions.</p>
        </div>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">{featured.map((activity) => <ActivityCategoryCard key={activity.slug} activity={activity} />)}</RevealGroup>
      </section>

      <section id="all-activities" className="scroll-mt-6 bg-white/60 px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="all-title">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Explore all activities</Eyebrow>
          <h2 id="all-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Every way onto the water.</RevealLines></h2>

          <div className="mt-10 rounded-3xl bg-white p-4 shadow-[0_20px_60px_rgba(6,38,59,.10)] sm:p-6">
            <ActivityFilters activities={activities} filters={filters} setFilters={setFilters} resultCount={results.length} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          </div>

          <div className="mb-8 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#3d5862]" role="status" aria-live="polite"><span className="font-display text-lg font-bold text-[#06263b]">{results.length}</span> of {activities.length} activities</p>
              <ActiveActivityChips filters={filters} setFilters={setFilters} />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#3d5862]">Sort by
              <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className={`min-h-11 rounded-full border border-[#dfe6e5] bg-white px-4 text-sm font-bold text-[#06263b] ${focusRing}`}>
                {sorts.map((option) => <option key={option.value} value={option.value} disabled={!option.enabled}>{option.label}{option.enabled ? '' : ' (awaiting data)'}</option>)}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-[#06263b]/15 bg-white px-6 py-16 text-center">
              <SearchX className="size-10 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-4 font-display text-2xl font-bold">No activities match yet</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#57717b]">Try a different name or remove a filter. New experiences are added as they are confirmed.</p>
              <button type="button" onClick={() => setFilters(emptyActivityFilters)} className={`mt-6 min-h-11 rounded-full bg-[#06263b] px-5 text-sm font-bold text-white ${focusRing}`}>Clear all filters</button>
            </div>
          ) : (
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map((activity) => <ActivityCard key={activity.slug} activity={activity} />)}</RevealGroup>
          )}
        </div>
      </section>

      <LocationAvailabilityOverview />
    </>
  )
}
