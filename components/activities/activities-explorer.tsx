'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Info, SearchX } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ActivityCard, ActivityVisual } from '@/components/activities/activity-card'
import { ActiveActivityChips, ActivityFilters, ActivitySearch, emptyActivityFilters, matchesActivityFilters, sortOptions, startingPriceSort, type ActivityFilterState, type SortKey } from '@/components/activities/activity-filters'
import { IllustrativeLabel, LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { AmbientVideo, HeroFilm } from '@/components/motion/ambient-video'
import { Reveal, RevealGroup, RevealLines } from '@/components/motion/reveal'
import { activities, activitiesAt, activityHref, formatDuration, type Activity } from '@/lib/activities'
import { locationHref, locations } from '@/lib/locations'
import { ROUTES } from '@/lib/site'
import { FILMS } from '@/lib/media'

const featured = activities.filter((activity) => activity.featured)
const shortName = (activity: Activity) => (activity.slug === 'stand-up-paddleboarding' ? 'SUP' : activity.name)

export function ActivitiesHero() {
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink pb-14 pt-40 text-white lg:pb-20">
      <HeroFilm film={FILMS.kayaking} />

      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> Explore our experiences</p>
        <h1 className="max-w-3xl font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl lg:text-8xl"><RevealLines delay={0.3}>Find your rhythm<br /><span className="text-sand">on the water.</span></RevealLines></h1>
        <Reveal as="p" delay={0.6} className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">Discover Kerala from a different perspective. Paddle peaceful backwaters, explore beautiful waterways and find an experience that matches your pace.</Reveal>
        <Reveal delay={0.8} className="mt-10 flex flex-wrap gap-3">
          <a href="#experiences" className={`inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-sand ${focusRing}`}>Explore activities <ArrowDown className="size-4" aria-hidden /></a>
          <a href={ROUTES.locations} className={`inline-flex items-center rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink ${focusRing}`}>Find a location</a>
        </Reveal>
      </div>
    </section>
  )
}

function ShowcaseCard({ activity, index }: { activity: Activity; index: number }) {
  const href = activityHref(activity)
  const facts = [activity.skillLevel, activity.durationMinutes && formatDuration(activity.durationMinutes)].filter(Boolean)
  return (
    <a href={href} className={`group relative block h-[70svh] max-h-[680px] min-h-[420px] w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl text-white sm:w-[70vw] lg:w-[min(62vw,980px)] ${focusRing}`}>
      {activity.ambientVideo
        ? <AmbientVideo film={activity.ambientVideo} sizes="(min-width: 1024px) 62vw, 85vw" className="absolute inset-0 size-full transition duration-[1600ms] group-hover:scale-105" />
        : <ActivityVisual activity={activity} showLabel={false} className="absolute! inset-0" />}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_90%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_20%,transparent)_50%,transparent_75%)]" />
      {activity.image?.illustrative && <IllustrativeLabel className="absolute right-4 top-4" />}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">0{index + 1} · {activity.category}</p>
          <h3 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl">{activity.name}</h3>
          <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">{activity.summary}</p>
          {facts.length > 0 && <p className="mt-3 text-xs font-medium text-white/60">{facts.join(' · ')}</p>}
        </div>
        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition group-hover:bg-sand">Explore {shortName(activity)} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></span>
      </div>
    </a>
  )
}

/**
 * Pinned horizontal gallery: on large screens the section holds still while vertical scrolling slides
 * the cards sideways, with a progress line beneath. Phones and reduced motion get a native swipe row.
 */
function ActivityShowcase({ items }: { items: Activity[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [distance, setDistance] = useState(0)
  const pinned = distance > 0 && !reduce

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      const wide = window.matchMedia('(min-width: 1024px)').matches
      setDistance(track && wide ? Math.max(0, track.scrollWidth - window.innerWidth) : 0)
    }
    // Re-measure whenever the track changes size, including when pinning switches it to its full width.
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (progress) => -progress * distance)

  return (
    <section id="experiences" ref={sectionRef} aria-labelledby="experiences-title" className="relative bg-ink text-white" style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}>
      <div className={pinned ? 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden' : 'py-20'}>
        <motion.div ref={trackRef} style={pinned ? { x } : undefined} className={`flex items-stretch gap-5 px-5 lg:gap-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] ${pinned ? 'w-max' : 'snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none]'}`}>
          <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-end pb-2 sm:w-[60vw] lg:w-[min(30vw,420px)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Choose an activity first</p>
            <h2 id="experiences-title" className="mt-4 font-display text-4xl font-black leading-[1] tracking-tight sm:text-6xl"><RevealLines>Your kind<br />of adventure<br /><span className="text-sand">starts here.</span></RevealLines></h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/70">From a relaxed first paddle to a guided water trail, each experience is shaped around you, the location and the conditions.</p>
            <p className="mt-8 hidden items-center gap-2 text-xs font-semibold text-white/50 lg:flex">Keep scrolling <ArrowRight className="size-3.5" aria-hidden /></p>
          </div>
          {items.map((activity, i) => <ShowcaseCard key={activity.slug} activity={activity} index={i} />)}
        </motion.div>
        {pinned && (
          <div className="mx-auto mt-10 h-px w-full max-w-7xl bg-white/15 px-8">
            <motion.div className="h-px origin-left bg-sand" style={{ scaleX: scrollYProgress }} />
          </div>
        )}
      </div>
    </section>
  )
}

function LocationAvailabilityOverview() {
  const shown = locations.filter((location) => location.hasDetailPage)
  return (
    <section className="px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="by-location">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Activities by location</p>
            <h2 id="by-location" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Where can you paddle?</RevealLines></h2>
          </div>
          <p className="flex max-w-md gap-2 text-sm leading-6 text-slate"><Info className="mt-1 size-4 shrink-0 text-teal-strong" aria-hidden />Line-ups marked “preview” are demonstration pairings until Bond confirms what runs at each location.</p>
        </div>
        <RevealGroup as="ul">{shown.map((location) => {
            const offered = activitiesAt(location.slug)
            return (
              <li key={location.slug} className="group grid gap-4 border-b border-line py-7 transition-colors hover:bg-paper-bright md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-8 md:px-4">
                <div>
                  <LocationStatusBadge status={location.status} />
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{location.name}</h3>
                  <p className="mt-1 text-xs text-slate">{[location.context, ...location.waterTypes].join(' · ')}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {offered.length
                    ? offered.map((activity) => {
                        const demo = activity.offerings.find((o) => o.locationSlug === location.slug)?.source === 'demo'
                        return <li key={activity.slug}><a href={activityHref(activity)} className={`inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-ink transition hover:border-ink ${focusRing}`}>{activity.name}{demo && <span className="text-[10px] font-bold uppercase text-sand-ink">Preview</span>}</a></li>
                      })
                    : <li className="text-sm italic text-slate">Activity line-up to be confirmed</li>}
                </ul>
                <a href={locationHref(location)} className={`inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-teal ${focusRing}`}>View location <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
              </li>
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
      <ActivityShowcase items={featured} />

      <section id="all-activities" aria-labelledby="all-title">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 lg:px-8 lg:pt-32">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Explore all activities</p>
          <h2 id="all-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Every way onto the water.</RevealLines></h2>
        </div>

        <div className="sticky top-0 z-20 border-y border-line bg-paper/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p className="text-sm text-slate" role="status" aria-live="polite"><span className="font-semibold text-ink">{results.length}</span> of {activities.length} activities</p>
            <div className="flex flex-wrap items-center gap-2">
              <div className="w-full sm:w-64"><ActivitySearch value={filters.query} onChange={(query) => setFilters({ ...filters, query })} /></div>
              <ActivityFilters activities={activities} filters={filters} setFilters={setFilters} resultCount={results.length} />
              <label className="min-w-0 flex-1 sm:flex-none">
                <span className="sr-only">Sort by</span>
                <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className={`h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink ${focusRing}`}>
                  {sorts.map((option) => <option key={option.value} value={option.value} disabled={!option.enabled}>{option.label}{option.enabled ? '' : ' (awaiting data)'}</option>)}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-8 pt-8 lg:px-8">
          <ActiveActivityChips filters={filters} setFilters={setFilters} />
          {results.length === 0 ? (
            <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-ink/15 px-6 py-20 text-center">
              <SearchX className="size-10 text-teal" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-4 font-display text-2xl font-bold">No activities match yet</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate">Try a different name or remove a filter. New experiences are added as they are confirmed.</p>
              <button type="button" onClick={() => setFilters(emptyActivityFilters)} className={`mt-6 min-h-11 rounded-full bg-ink px-5 text-sm font-semibold text-white ${focusRing}`}>Clear all filters</button>
            </div>
          ) : (
            <RevealGroup className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{results.map((activity) => <ActivityCard key={activity.slug} activity={activity} />)}</RevealGroup>
          )}
        </div>
      </section>

      <LocationAvailabilityOverview />
    </>
  )
}
