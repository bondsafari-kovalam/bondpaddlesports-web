'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import {
  ACTIVITY_LABELS,
  REGIONS,
  STATUSES,
  STATUS_LABELS,
  WATER_TYPES,
  type ActivityId,
  type Location,
  type LocationStatus,
  type Region,
  type WaterType,
} from '@/lib/locations'

export type Filters = {
  query: string
  region: Region | ''
  activity: ActivityId | ''
  water: WaterType | ''
  status: LocationStatus | ''
}

export const emptyFilters: Filters = { query: '', region: '', activity: '', water: '', status: '' }

export function matchesFilters(location: Location, filters: Filters, ignore?: keyof Filters) {
  const query = filters.query.trim().toLowerCase()
  return (
    (ignore === 'query' || !query || [location.name, location.context, location.region].some((value) => value.toLowerCase().includes(query))) &&
    (ignore === 'region' || !filters.region || location.region === filters.region) &&
    (ignore === 'activity' || !filters.activity || location.activities.some((activity) => activity.id === filters.activity)) &&
    (ignore === 'water' || !filters.water || location.waterTypes.includes(filters.water)) &&
    (ignore === 'status' || !filters.status || location.status === filters.status)
  )
}

type FacetKey = Exclude<keyof Filters, 'query'>

function facetOptions(locations: Location[], filters: Filters, key: FacetKey) {
  const pool = locations.filter((location) => matchesFilters(location, filters, key))
  const count = (predicate: (location: Location) => boolean) => pool.filter(predicate).length
  switch (key) {
    case 'region':
      return REGIONS.map((value) => ({ value, label: value, count: count((l) => l.region === value) }))
    case 'activity':
      return (Object.keys(ACTIVITY_LABELS) as ActivityId[]).map((value) => ({ value, label: ACTIVITY_LABELS[value], count: count((l) => l.activities.some((a) => a.id === value)) }))
    case 'water':
      return WATER_TYPES.map((value) => ({ value, label: value, count: count((l) => l.waterTypes.includes(value)) }))
    case 'status':
      return STATUSES.map((value) => ({ value, label: STATUS_LABELS[value], count: count((l) => l.status === value) }))
  }
}

const facetLabels: Record<FacetKey, string> = { region: 'Region', activity: 'Activity', water: 'Water type', status: 'Status' }

export function LocationSearch({ value, onChange, id = 'location-search', tone = 'light' }: { value: string; onChange: (value: string) => void; id?: string; tone?: 'light' | 'dark' }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">Search by location name</label>
      <Search className={`pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ${tone === 'dark' ? 'text-white/60' : 'text-slate'}`} aria-hidden />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search locations, e.g. Kovalam"
        className={`h-11 w-full rounded-full pl-11 pr-4 text-sm font-medium outline-none transition focus:ring-2 focus:ring-teal ${tone === 'dark' ? 'border border-white/25 bg-white/10 text-white placeholder:text-white/55 backdrop-blur-md' : 'border border-line bg-paper-bright text-ink placeholder:text-slate'}`}
      />
    </div>
  )
}

function FacetSelects({ locations, filters, setFilters }: { locations: Location[]; filters: Filters; setFilters: (filters: Filters) => void }) {
  return (
    <>
      {(Object.keys(facetLabels) as FacetKey[]).map((key) => {
        const options = facetOptions(locations, filters, key)
        const unavailable = options.every((option) => option.count === 0 && option.value !== filters[key])
        return (
          <label key={key} className="rounded-2xl border border-line bg-paper-bright px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate focus-within:ring-2 focus-within:ring-teal">
            {facetLabels[key]}
            <select
              value={filters[key]}
              onChange={(event) => setFilters({ ...filters, [key]: event.target.value })}
              className="mt-2 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-ink outline-none"
            >
              <option value="">{unavailable && key === 'activity' ? 'Being confirmed' : `Any ${facetLabels[key].toLowerCase()}`}</option>
              {options.map((option) => <option key={option.value} value={option.value} disabled={option.count === 0 && option.value !== filters[key]}>{option.label} ({option.count})</option>)}
            </select>
          </label>
        )
      })}
    </>
  )
}

/** "Filters" button plus the facet dialog: a bottom sheet on phones, a centred panel on larger screens. */
export function LocationFilters({ locations, filters, setFilters }: { locations: Location[]; filters: Filters; setFilters: (filters: Filters) => void }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const activeCount = (Object.keys(facetLabels) as FacetKey[]).filter((key) => filters[key]).length
  const resultCount = locations.filter((location) => matchesFilters(location, filters)).length

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink ${focusRing}`} aria-haspopup="dialog">
        <SlidersHorizontal className="size-4" aria-hidden /> Filters{activeCount > 0 && <span className="rounded-full bg-ink px-1.5 text-xs text-white">{activeCount}</span>}
      </button>

      <dialog ref={dialogRef} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) setOpen(false) }} aria-label="Filter locations" className="mb-0 mt-auto w-full max-w-none rounded-t-3xl bg-white p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm sm:m-auto sm:max-w-md sm:rounded-3xl">
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line sm:hidden" aria-hidden />
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Filter locations</h2>
            <button type="button" onClick={() => setOpen(false)} className={`flex size-9 items-center justify-center rounded-full border border-line ${focusRing}`} aria-label="Close filters"><X className="size-4" /></button>
          </div>
          <div className="grid gap-3"><FacetSelects locations={locations} filters={filters} setFilters={setFilters} /></div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setFilters({ ...emptyFilters, query: filters.query })} className={`rounded-full border border-line py-3.5 text-sm font-semibold ${focusRing}`}>Clear filters</button>
            <button type="button" onClick={() => setOpen(false)} className={`rounded-full bg-ink py-3.5 text-sm font-semibold text-white ${focusRing}`}>Show {resultCount} {resultCount === 1 ? 'location' : 'locations'}</button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function ActiveFilterChips({ filters, setFilters }: { filters: Filters; setFilters: (filters: Filters) => void }) {
  const chips = [
    filters.query && { key: 'query' as const, label: `“${filters.query}”` },
    filters.region && { key: 'region' as const, label: filters.region },
    filters.activity && { key: 'activity' as const, label: ACTIVITY_LABELS[filters.activity] },
    filters.water && { key: 'water' as const, label: filters.water },
    filters.status && { key: 'status' as const, label: STATUS_LABELS[filters.status] },
  ].filter(Boolean) as { key: keyof Filters; label: string }[]

  if (chips.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button key={chip.key} type="button" onClick={() => setFilters({ ...filters, [chip.key]: '' })} className={`inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white ${focusRing}`} aria-label={`Remove filter ${chip.label}`}>
          {chip.label} <X className="size-3" aria-hidden />
        </button>
      ))}
      <button type="button" onClick={() => setFilters(emptyFilters)} className={`rounded px-2 text-xs font-bold text-teal underline-offset-4 hover:underline ${focusRing}`}>Clear all</button>
    </div>
  )
}
