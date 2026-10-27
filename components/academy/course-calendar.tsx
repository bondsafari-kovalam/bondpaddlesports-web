'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, List } from 'lucide-react'
import { CourseStatusBadge } from '@/components/academy/course-card'
import { NoDatesState } from '@/components/academy/academy-sections'
import { focusRing } from '@/components/locations/primitives'
import { CAMPUSES, COURSE_CATEGORIES, courseHref, courseSessions, formatRupees, getCourse } from '@/lib/academy'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const selectClass = `min-h-11 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink ${focusRing}`

function monthDays(year: number, month: number) {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const total = new Date(year, month + 1, 0).getDate()
  return [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)] as (number | null)[]
}

const iso = (year: number, month: number, day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

/** Shows only real, configured course sessions; never generates dates. */
export function CourseCalendar() {
  const [cursor, setCursor] = useState<{ year: number; month: number } | null>(null)
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [category, setCategory] = useState('')
  const [campus, setCampus] = useState('')

  // The current month is read after mount so server and browser time zones can't disagree.
  useEffect(() => {
    const now = new Date()
    setCursor({ year: now.getFullYear(), month: now.getMonth() })
  }, [])

  const sessions = useMemo(() => courseSessions
    .map((session) => ({ session, course: getCourse(session.courseSlug)! }))
    .filter(({ session, course }) => (!category || course.category === category) && (!campus || session.campus === campus))
    .sort((a, b) => a.session.startDate.localeCompare(b.session.startDate)), [category, campus])

  if (!cursor) return <div className="h-96 animate-pulse rounded-3xl bg-white" aria-busy="true" />

  const monthKey = `${cursor.year}-${String(cursor.month + 1).padStart(2, '0')}`
  const inMonth = sessions.filter(({ session }) => session.startDate.startsWith(monthKey))
  const label = new Date(cursor.year, cursor.month, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  const shift = (delta: number) => {
    const d = new Date(cursor.year, cursor.month + delta, 1)
    setCursor({ year: d.getFullYear(), month: d.getMonth() })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => shift(-1)} className={`flex size-11 items-center justify-center rounded-full border border-line bg-white ${focusRing}`} aria-label="Previous month"><ChevronLeft className="size-5" /></button>
          <h2 className="min-w-44 text-center font-display text-xl font-bold" aria-live="polite">{label}</h2>
          <button type="button" onClick={() => shift(1)} className={`flex size-11 items-center justify-center rounded-full border border-line bg-white ${focusRing}`} aria-label="Next month"><ChevronRight className="size-5" /></button>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="sr-only" htmlFor="cal-category">Course category</label>
          <select id="cal-category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}><option value="">All categories</option>{COURSE_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          <label className="sr-only" htmlFor="cal-campus">Location</label>
          <select id="cal-campus" value={campus} onChange={(e) => setCampus(e.target.value)} className={selectClass}><option value="">All locations</option>{CAMPUSES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-line" role="group" aria-label="View">
            {([['calendar', 'Calendar', CalendarDays], ['list', 'List', List]] as const).map(([value, text, Icon]) => (
              <button key={value} type="button" onClick={() => setView(value)} aria-pressed={view === value} className={`inline-flex min-h-9 items-center gap-2 rounded-full px-4 text-sm font-bold ${view === value ? 'bg-ink text-white' : 'text-slate-strong'} ${focusRing}`}><Icon className="size-4" aria-hidden />{text}</button>
            ))}
          </div>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5">
          <div className="grid grid-cols-7 border-b border-mist bg-paper-bright text-center text-xs font-bold uppercase tracking-wider text-slate">{WEEKDAYS.map((d) => <div key={d} className="py-3">{d}</div>)}</div>
          <div className="grid grid-cols-7">
            {monthDays(cursor.year, cursor.month).map((day, index) => {
              const daySessions = day ? inMonth.filter(({ session }) => session.startDate === iso(cursor.year, cursor.month, day)) : []
              return (
                <div key={index} className="min-h-16 border-b border-r border-mist p-1.5 text-xs sm:min-h-24 sm:p-2">
                  {day && <span className="font-semibold text-slate">{day}</span>}
                  {daySessions.map(({ session, course }) => <a key={session.id} href={courseHref(course)} className="mt-1 block truncate rounded bg-ink px-1.5 py-1 text-[10px] font-bold text-white">{course.name}</a>)}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {inMonth.map(({ session, course }) => (
            <li key={session.id} className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-ink/5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold text-teal">{new Date(session.startDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · {CAMPUSES.find((c) => c.id === session.campus)?.name}</p>
                <p className="mt-1 font-display text-lg font-bold">{course.name}</p>
              </div>
              <div className="flex items-center gap-3">{course.price && <span className="font-bold text-teal-strong">{formatRupees(course.price)}</span>}<CourseStatusBadge status={course.status} /><a href={courseHref(course)} className="text-sm font-bold text-teal">View details</a></div>
            </li>
          ))}
        </ul>
      )}

      {inMonth.length === 0 && (
        sessions.length === 0
          ? <NoDatesState />
          : <p className="rounded-2xl bg-white p-5 text-sm text-slate ring-1 ring-ink/5">No courses this month. Try another month or remove a filter.</p>
      )}
    </div>
  )
}
