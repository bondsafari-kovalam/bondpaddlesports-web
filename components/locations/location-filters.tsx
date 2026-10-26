'use client'

import { useEffect, useRef } from 'react'
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
      <Search className={`pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ${tone === 'dark' ? 'text-white/60' : 'text-[#57717b]'}`} aria-hidden />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search locations, e.g. Kovalam"
        className={`w-full rounded-2xl py-4 pl-11 pr-4 text-sm font-semibold outline-none transition focus:ring-2 focus:ring-[#00a9c3] ${tone === 'dark' ? 'border border-white/25 bg-white/10 text-white placeholder:text-white/55 backdrop-blur-md' : 'border border-[#dfe6e5] bg-[#f8faf8] text-[#06263b] placeholder:text-[#57717b]'}`}
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
          <label key={key} className="rounded-2xl border border-[#dfe6e5] bg-[#f8faf8] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#57717b] focus-within:ring-2 focus-within:ring-[#00a9c3]">
            {facetLabels[key]}
            <select
              value={filters[key]}
              onChange={(event) => setFilters({ ...filters, [key]: event.target.value })}
              className="mt-2 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-[#06263b] outline-none"
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

export function LocationFilters({ locations, filters, setFilters, drawerOpen, setDrawerOpen }: {
  locations: Location[]
  filters: Filters
  setFilters: (filters: Filters) => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}) {
  const drawerRef = useRef<HTMLDialogElement>(null)
  const activeCount = (Object.keys(facetLabels) as FacetKey[]).filter((key) => filters[key]).length
  const resultCount = locations.filter((location) => matchesFilters(location, filters)).length

  useEffect(() => {
    if (drawerOpen) drawerRef.current?.showModal()
    else drawerRef.current?.close()
  }, [drawerOpen])

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="flex gap-2 lg:contents">
          <div className="flex-1 [&_input]:h-full lg:[&_input]:py-[22px]"><LocationSearch value={filters.query} onChange={(query) => setFilters({ ...filters, query })} /></div>
          <button type="button" onClick={() => setDrawerOpen(true)} className={`flex shrink-0 items-center gap-2 rounded-2xl border border-[#dfe6e5] bg-[#06263b] px-4 text-sm font-bold text-white lg:hidden ${focusRing}`} aria-haspopup="dialog">
            <SlidersHorizontal className="size-4" aria-hidden /> Filters{activeCount > 0 && <span className="rounded-full bg-[#f5b82e] px-1.5 text-xs text-[#06263b]">{activeCount}</span>}
          </button>
        </div>
        <div className="hidden lg:contents"><FacetSelects locations={locations} filters={filters} setFilters={setFilters} /></div>
      </div>

      <dialog ref={drawerRef} onClose={() => setDrawerOpen(false)} aria-label="Filter locations" className="mb-0 mt-auto w-full max-w-none rounded-t-3xl bg-white p-0 text-[#06263b] backdrop:bg-[#06263b]/60 lg:hidden">
        <div className="max-h-[85vh] overflow-y-auto p-5">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#dfe6e5]" aria-hidden />
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Filter locations</h2>
            <button type="button" onClick={() => setDrawerOpen(false)} className={`flex size-9 items-center justify-center rounded-full border border-[#dfe6e5] ${focusRing}`} aria-label="Close filters"><X className="size-4" /></button>
          </div>
          <div className="grid gap-3"><FacetSelects locations={locations} filters={filters} setFilters={setFilters} /></div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setFilters({ ...emptyFilters, query: filters.query })} className={`rounded-2xl border border-[#dfe6e5] py-4 text-sm font-bold ${focusRing}`}>Clear filters</button>
            <button type="button" onClick={() => setDrawerOpen(false)} className={`rounded-2xl bg-[#06263b] py-4 text-sm font-extrabold text-white ${focusRing}`}>Show {resultCount} {resultCount === 1 ? 'location' : 'locations'}</button>
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
        <button key={chip.key} type="button" onClick={() => setFilters({ ...filters, [chip.key]: '' })} className={`inline-flex items-center gap-1.5 rounded-full bg-[#06263b] px-3 py-1.5 text-xs font-bold text-white ${focusRing}`} aria-label={`Remove filter ${chip.label}`}>
          {chip.label} <X className="size-3" aria-hidden />
        </button>
      ))}
      <button type="button" onClick={() => setFilters(emptyFilters)} className={`rounded px-2 text-xs font-bold text-[#0b7f95] underline-offset-4 hover:underline ${focusRing}`}>Clear all</button>
    </div>
  )
}
