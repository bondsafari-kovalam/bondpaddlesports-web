'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import {
  ACTIVITY_CATEGORIES,
  ACTIVITY_STATUSES,
  ACTIVITY_STATUS_LABELS,
  activityStatus,
  offeringsFor,
  startingPriceFor,
  waterTypesFor,
  type Activity,
} from '@/lib/activities'
import { REGIONS, WATER_TYPES, locations } from '@/lib/locations'

export type ActivityFilterState = {
  query: string
  category: string
  location: string
  region: string
  water: string
  skill: string
  duration: string
  status: string
}

export type SortKey = 'recommended' | 'price' | 'duration' | 'next-session'

export const emptyActivityFilters: ActivityFilterState = { query: '', category: '', location: '', region: '', water: '', skill: '', duration: '', status: '' }

const DURATION_BANDS = [
  { value: 'short', label: 'Under 1 hour', test: (m: number) => m < 60 },
  { value: 'medium', label: '1–2 hours', test: (m: number) => m >= 60 && m <= 120 },
  { value: 'long', label: 'Over 2 hours', test: (m: number) => m > 120 },
]

type FacetKey = Exclude<keyof ActivityFilterState, 'query'>

const facetMatchers: Record<FacetKey, (activity: Activity, value: string) => boolean> = {
  category: (a, v) => a.category === v,
  location: (a, v) => offeringsFor(a).some((o) => o.location.slug === v),
  region: (a, v) => offeringsFor(a).some((o) => o.location.region === v),
  water: (a, v) => (waterTypesFor(a) as string[]).includes(v),
  skill: (a, v) => a.skillLevel === v,
  duration: (a, v) => !!a.durationMinutes && !!DURATION_BANDS.find((band) => band.value === v)?.test(a.durationMinutes),
  status: (a, v) => activityStatus(a) === v,
}

export function matchesActivityFilters(activity: Activity, filters: ActivityFilterState, ignore?: FacetKey) {
  const query = filters.query.trim().toLowerCase()
  if (query && ![activity.name, activity.category, ...activity.tags].some((value) => value.toLowerCase().includes(query))) return false
  return (Object.keys(facetMatchers) as FacetKey[]).every((key) => key === ignore || !filters[key] || facetMatchers[key](activity, filters[key]))
}

function facetValues(activities: Activity[]): Record<FacetKey, { value: string; label: string }[]> {
  const offeredLocations = locations.filter((location) => activities.some((activity) => offeringsFor(activity).some((o) => o.location.slug === location.slug)))
  const skills = [...new Set(activities.map((a) => a.skillLevel).filter(Boolean))] as string[]
  return {
    category: ACTIVITY_CATEGORIES.map((value) => ({ value, label: value })),
    location: offeredLocations.map((location) => ({ value: location.slug, label: location.name })),
    region: REGIONS.map((value) => ({ value, label: value })),
    water: WATER_TYPES.map((value) => ({ value, label: value })),
    skill: skills.map((value) => ({ value, label: value })),
    duration: activities.some((a) => a.durationMinutes) ? DURATION_BANDS.map(({ value, label }) => ({ value, label })) : [],
    status: ACTIVITY_STATUSES.map((value) => ({ value, label: ACTIVITY_STATUS_LABELS[value] })),
  }
}

const facetLabels: Record<FacetKey, string> = { category: 'Activity type', location: 'Location', region: 'Region', water: 'Water type', skill: 'Skill level', duration: 'Duration', status: 'Availability' }

/** Sort options are enabled only when every activity has the data the sort needs. */
export function sortOptions(activities: Activity[]) {
  return [
    { value: 'recommended' as const, label: 'Recommended', enabled: true },
    { value: 'price' as const, label: 'Price: low to high', enabled: activities.some((a) => startingPriceFor(a)) },
    { value: 'duration' as const, label: 'Shortest duration', enabled: activities.some((a) => a.durationMinutes) },
    { value: 'next-session' as const, label: 'Next available session', enabled: false },
  ]
}

export function startingPriceSort(a: Activity, b: Activity) {
  return (startingPriceFor(a) ?? Infinity) - (startingPriceFor(b) ?? Infinity)
}

export function ActivitySearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative">
      <label htmlFor="activity-search" className="sr-only">Search activities by name</label>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden />
      <input id="activity-search" type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search activities, e.g. SUP" className="h-11 w-full rounded-full border border-line bg-paper-bright pl-11 pr-4 text-sm font-medium text-ink outline-none placeholder:text-slate focus:ring-2 focus:ring-teal" />
    </div>
  )
}

function FacetSelects({ activities, filters, setFilters }: { activities: Activity[]; filters: ActivityFilterState; setFilters: (filters: ActivityFilterState) => void }) {
  const values = facetValues(activities)
  return (
    <>
      {(Object.keys(facetLabels) as FacetKey[]).filter((key) => values[key].length > 0).map((key) => {
        const pool = activities.filter((activity) => matchesActivityFilters(activity, filters, key))
        return (
          <label key={key} className="rounded-2xl border border-line bg-paper-bright px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate focus-within:ring-2 focus-within:ring-teal">
            {facetLabels[key]}
            <select value={filters[key]} onChange={(event) => setFilters({ ...filters, [key]: event.target.value })} className="mt-2 block min-h-6 w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-ink outline-none">
              <option value="">Any</option>
              {values[key].map((option) => {
                const count = pool.filter((activity) => facetMatchers[key](activity, option.value)).length
                return <option key={option.value} value={option.value} disabled={count === 0 && option.value !== filters[key]}>{option.label} ({count})</option>
              })}
            </select>
          </label>
        )
      })}
    </>
  )
}

/** "Filters" button plus the facet dialog: a bottom sheet on phones, a centred panel on larger screens. */
export function ActivityFilters({ activities, filters, setFilters, resultCount }: {
  activities: Activity[]
  filters: ActivityFilterState
  setFilters: (filters: ActivityFilterState) => void
  resultCount: number
}) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const activeCount = (Object.keys(facetLabels) as FacetKey[]).filter((key) => filters[key]).length

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink ${focusRing}`} aria-haspopup="dialog">
        <SlidersHorizontal className="size-4" aria-hidden /> Filters{activeCount > 0 && <span className="rounded-full bg-ink px-1.5 text-xs text-white">{activeCount}</span>}
      </button>

      <dialog ref={dialogRef} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) setOpen(false) }} aria-label="Filter activities" className="mb-0 mt-auto w-full max-w-none rounded-t-3xl bg-white p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm sm:m-auto sm:max-w-lg sm:rounded-3xl">
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line sm:hidden" aria-hidden />
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Filter activities</h2>
            <button type="button" onClick={() => setOpen(false)} className={`flex size-11 items-center justify-center rounded-full border border-line ${focusRing}`} aria-label="Close filters"><X className="size-4" /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2"><FacetSelects activities={activities} filters={filters} setFilters={setFilters} /></div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setFilters({ ...emptyActivityFilters, query: filters.query })} className={`min-h-12 rounded-full border border-line text-sm font-semibold ${focusRing}`}>Clear filters</button>
            <button type="button" onClick={() => setOpen(false)} className={`min-h-12 rounded-full bg-ink text-sm font-semibold text-white ${focusRing}`}>Show {resultCount} {resultCount === 1 ? 'activity' : 'activities'}</button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function ActiveActivityChips({ filters, setFilters }: { filters: ActivityFilterState; setFilters: (filters: ActivityFilterState) => void }) {
  const labelFor = (key: keyof ActivityFilterState, value: string) => {
    if (key === 'query') return `“${value}”`
    if (key === 'location') return locations.find((location) => location.slug === value)?.name ?? value
    if (key === 'status') return ACTIVITY_STATUS_LABELS[value as keyof typeof ACTIVITY_STATUS_LABELS]
    if (key === 'duration') return DURATION_BANDS.find((band) => band.value === value)?.label ?? value
    return value
  }
  const active = (Object.keys(filters) as (keyof ActivityFilterState)[]).filter((key) => filters[key])
  if (active.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-2">
      {active.map((key) => (
        <button key={key} type="button" onClick={() => setFilters({ ...filters, [key]: '' })} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full bg-ink px-3 text-xs font-bold text-white ${focusRing}`} aria-label={`Remove filter ${labelFor(key, filters[key])}`}>
          {labelFor(key, filters[key])} <X className="size-3" aria-hidden />
        </button>
      ))}
      <button type="button" onClick={() => setFilters(emptyActivityFilters)} className={`min-h-9 rounded px-2 text-xs font-bold text-teal underline-offset-4 hover:underline ${focusRing}`}>Clear all</button>
    </div>
  )
}
