'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, SearchX, SlidersHorizontal, X } from 'lucide-react'
import { CourseCard } from '@/components/academy/course-card'
import { focusRing } from '@/components/locations/primitives'
import { CAMPUSES, COURSE_CATEGORIES, COURSE_STATUS_LABELS, courseSessions, courses, type Course } from '@/lib/academy'
import { RevealGroup } from '@/components/motion/reveal'

type Filters = { query: string; category: string; discipline: string; level: string; campus: string; month: string; price: string; status: string }
type FacetKey = Exclude<keyof Filters, 'query'>
const empty: Filters = { query: '', category: '', discipline: '', level: '', campus: '', month: '', price: '', status: '' }

const PRICE_BANDS = [
  { value: 'under-5000', label: 'Under ₹5,000', test: (p: number) => p < 5000 },
  { value: '5000-25000', label: '₹5,000–₹25,000', test: (p: number) => p >= 5000 && p <= 25000 },
  { value: '25000-50000', label: '₹25,000–₹50,000', test: (p: number) => p > 25000 && p <= 50000 },
  { value: 'over-50000', label: 'Over ₹50,000', test: (p: number) => p > 50000 },
]

const monthKey = (iso: string) => iso.slice(0, 7)
const monthLabel = (key: string) => new Date(`${key}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

const matchers: Record<FacetKey, (course: Course, value: string) => boolean> = {
  category: (c, v) => c.category === v,
  discipline: (c, v) => c.discipline === v,
  level: (c, v) => c.level === v,
  campus: (c, v) => !!c.campuses?.includes(v as never) || courseSessions.some((s) => s.courseSlug === c.slug && s.campus === v),
  month: (c, v) => courseSessions.some((s) => s.courseSlug === c.slug && monthKey(s.startDate) === v),
  price: (c, v) => !!c.price && !!PRICE_BANDS.find((band) => band.value === v)?.test(c.price),
  status: (c, v) => c.status === v,
}

function matches(course: Course, filters: Filters, ignore?: FacetKey) {
  const query = filters.query.trim().toLowerCase()
  if (query && ![course.name, course.summary, course.level, course.discipline ?? ''].some((value) => value.toLowerCase().includes(query))) return false
  return (Object.keys(matchers) as FacetKey[]).every((key) => key === ignore || !filters[key] || matchers[key](course, filters[key]))
}

/** Facets whose data does not exist yet (campus, month) are hidden rather than shown empty. */
function facetOptions(): { key: FacetKey; label: string; options: { value: string; label: string }[] }[] {
  const months = [...new Set(courseSessions.map((s) => monthKey(s.startDate)))].sort()
  const campusIds = new Set([...courses.flatMap((c) => c.campuses ?? []), ...courseSessions.map((s) => s.campus)])
  return [
    { key: 'category' as const, label: 'Category', options: COURSE_CATEGORIES.map((c) => ({ value: c.id, label: c.name })) },
    { key: 'discipline' as const, label: 'Craft or discipline', options: [...new Set(courses.map((c) => c.discipline).filter(Boolean))].map((d) => ({ value: d!, label: d! })) },
    { key: 'level' as const, label: 'Qualification level', options: [...new Set(courses.map((c) => c.level))].map((l) => ({ value: l, label: l })) },
    { key: 'campus' as const, label: 'Location', options: CAMPUSES.filter((c) => campusIds.has(c.id)).map((c) => ({ value: c.id, label: c.name })) },
    { key: 'month' as const, label: 'Month', options: months.map((m) => ({ value: m, label: monthLabel(m) })) },
    { key: 'price' as const, label: 'Price range', options: PRICE_BANDS.map(({ value, label }) => ({ value, label })) },
    { key: 'status' as const, label: 'Status', options: Object.entries(COURSE_STATUS_LABELS).map(([value, label]) => ({ value, label })) },
  ].filter((facet) => facet.options.length > 0)
}

function Selects({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  return (
    <>
      {facetOptions().map(({ key, label, options }) => {
        const pool = courses.filter((course) => matches(course, filters, key))
        return (
          <label key={key} className="rounded-2xl border border-[#dfe6e5] bg-[#f8faf8] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#57717b] focus-within:ring-2 focus-within:ring-[#00a9c3]">
            {label}
            <select value={filters[key]} onChange={(event) => setFilters({ ...filters, [key]: event.target.value })} className="mt-2 block min-h-6 w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-[#06263b] outline-none">
              <option value="">Any</option>
              {options.map((option) => {
                const count = pool.filter((course) => matchers[key](course, option.value)).length
                return <option key={option.value} value={option.value} disabled={count === 0 && filters[key] !== option.value}>{option.label} ({count})</option>
              })}
            </select>
          </label>
        )
      })}
    </>
  )
}

export function CourseSearch({ value, onChange, tone = 'light' }: { value: string; onChange: (v: string) => void; tone?: 'light' | 'dark' }) {
  return (
    <div className="relative">
      <label htmlFor={`course-search-${tone}`} className="sr-only">Search courses</label>
      <Search className={`pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ${tone === 'dark' ? 'text-white/60' : 'text-[#57717b]'}`} aria-hidden />
      <input id={`course-search-${tone}`} type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search courses, e.g. SUP" className={`min-h-12 w-full rounded-2xl py-4 pl-11 pr-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#00a9c3] ${tone === 'dark' ? 'border border-white/25 bg-white/10 text-white placeholder:text-white/55' : 'border border-[#dfe6e5] bg-[#f8faf8] text-[#06263b] placeholder:text-[#57717b]'}`} />
    </div>
  )
}

export function CourseCatalogue() {
  const [filters, setFilters] = useState<Filters>(empty)
  const [ready, setReady] = useState(false)

  // Filters from the URL (e.g. ?category=start-paddling) are applied after mount, so the full
  // catalogue is still pre-rendered as HTML for search engines.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setFilters({ ...empty, ...Object.fromEntries(Object.keys(empty).map((key) => [key, params.get(key) ?? ''])) })
    setReady(true)
  }, [])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDialogElement>(null)

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    if (!ready) return
    const query = new URLSearchParams(Object.entries(filters).filter(([, value]) => value))
    window.history.replaceState(null, '', query.size ? `?${query}` : window.location.pathname)
  }, [filters, ready])

  useEffect(() => {
    if (drawerOpen) drawerRef.current?.showModal()
    else drawerRef.current?.close()
  }, [drawerOpen])

  const results = useMemo(() => courses.filter((course) => matches(course, filters)), [filters])
  const active = (Object.keys(filters) as (keyof Filters)[]).filter((key) => filters[key])

  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl px-5 lg:px-8">
        <div className="rounded-3xl bg-white p-4 shadow-[0_20px_60px_rgba(6,38,59,.14)] sm:p-6">
          <div className="flex gap-2 lg:hidden">
            <div className="flex-1"><CourseSearch value={filters.query} onChange={(query) => setFilters({ ...filters, query })} /></div>
            <button type="button" onClick={() => setDrawerOpen(true)} aria-haspopup="dialog" className={`flex min-h-12 shrink-0 items-center gap-2 rounded-2xl bg-[#06263b] px-4 text-sm font-bold text-white ${focusRing}`}><SlidersHorizontal className="size-4" aria-hidden /> Filters{active.filter((k) => k !== 'query').length > 0 && <span className="rounded-full bg-[#f5b82e] px-1.5 text-xs text-[#06263b]">{active.filter((k) => k !== 'query').length}</span>}</button>
          </div>
          <div className="hidden gap-3 lg:grid lg:grid-cols-[1.4fr_repeat(5,1fr)]">
            <CourseSearch value={filters.query} onChange={(query) => setFilters({ ...filters, query })} />
            <Selects filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>

      <dialog ref={drawerRef} onClose={() => setDrawerOpen(false)} aria-label="Filter courses" className="mb-0 mt-auto w-full max-w-none rounded-t-3xl bg-white p-0 text-[#06263b] backdrop:bg-[#06263b]/60 lg:hidden">
        <div className="max-h-[85vh] overflow-y-auto p-5">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-bold">Filter courses</h2><button type="button" onClick={() => setDrawerOpen(false)} className={`flex size-11 items-center justify-center rounded-full border border-[#dfe6e5] ${focusRing}`} aria-label="Close filters"><X className="size-4" /></button></div>
          <div className="grid gap-3"><Selects filters={filters} setFilters={setFilters} /></div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setFilters({ ...empty, query: filters.query })} className={`min-h-12 rounded-2xl border border-[#dfe6e5] text-sm font-bold ${focusRing}`}>Clear filters</button>
            <button type="button" onClick={() => setDrawerOpen(false)} className={`min-h-12 rounded-2xl bg-[#06263b] text-sm font-extrabold text-white ${focusRing}`}>Show {results.length} courses</button>
          </div>
        </div>
      </dialog>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16" aria-label="Courses">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[#3d5862]" role="status" aria-live="polite"><span className="font-display text-lg font-bold text-[#06263b]">{results.length}</span> of {courses.length} courses</p>
          {active.length > 0 && <button type="button" onClick={() => setFilters(empty)} className={`min-h-11 w-fit rounded px-2 text-sm font-bold text-[#0b7f95] underline-offset-4 hover:underline ${focusRing}`}>Clear filters</button>}
        </div>
        {results.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-[#06263b]/15 bg-white px-6 py-16 text-center">
            <SearchX className="size-10 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-bold">No courses found</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#57717b]">Try a different search or remove a filter.</p>
            <button type="button" onClick={() => setFilters(empty)} className={`mt-6 min-h-11 rounded-full bg-[#06263b] px-5 text-sm font-bold text-white ${focusRing}`}>Clear filters</button>
          </div>
        ) : (
          <div className="space-y-14">
            {COURSE_CATEGORIES.map((category) => {
              const inCategory = results.filter((course) => course.category === category.id)
              if (!inCategory.length) return null
              return (
                <div key={category.id}>
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><h2 className="font-display text-2xl font-bold">{category.name}</h2><p className="text-sm text-[#57717b]">{category.summary}</p></div>
                  <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{inCategory.map((course) => <CourseCard key={course.slug} course={course} />)}</RevealGroup>
                </div>
              )
            })}
          </div>
        )}
        <p className="mt-12 text-xs leading-5 text-[#57717b]">Prices are the supplied 2027 source rates. Tax inclusion and the final payable amount are confirmed against the approved rate card at enrolment.</p>
      </section>
    </>
  )
}
