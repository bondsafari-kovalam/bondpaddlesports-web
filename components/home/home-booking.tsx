'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { DatePicker } from '@/components/booking/date-picker'

const LOCATIONS = ['Muziris–Kottapuram', 'Muziris–North Paravur', 'Kovalam']
const ACTIVITIES = ['Any activity', 'Kayaking', 'Canoeing', 'Stand-up paddleboarding']
// Only non-personal search choices are kept, and only for this tab, so a reload on a flaky
// connection doesn't wipe them. Names, contact details and payment data are never stored here.
const STORAGE_KEY = 'bond:home-booking'

type Saved = { location: string; activity: string; date: string | null }

function load(): Saved | null {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') } catch { return null }
}

/** The homepage "Where will you go?" panel: the only interactive part of the home page. */
export function HomeBooking() {
  const [location, setLocation] = useState(LOCATIONS[0])
  const [activity, setActivity] = useState(ACTIVITIES[0])
  const [date, setDate] = useState<Date | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    const saved = load()
    if (saved) {
      if (LOCATIONS.includes(saved.location)) setLocation(saved.location)
      if (ACTIVITIES.includes(saved.activity)) setActivity(saved.activity)
      if (saved.date && new Date(saved.date) >= new Date(new Date().toDateString())) setDate(new Date(saved.date))
    }
    setRestored(true)
  }, [])

  useEffect(() => {
    if (!restored) return
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ location, activity, date: date?.toISOString() ?? null } satisfies Saved)) } catch {}
  }, [restored, location, activity, date])

  const select = 'mt-2 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-ink outline-none'
  const field = 'rounded-2xl border border-line bg-paper-bright px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate'

  return (
    <section id="book" className="relative z-10 mx-auto -mt-8 max-w-6xl px-5 lg:-mt-14">
      <div className="rounded-3xl bg-white p-5 shadow-[0_20px_60px_color-mix(in_srgb,var(--color-ink)_16%,transparent)] sm:p-7">
        <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Plan your paddle</p><h2 className="mt-2 font-display text-2xl font-bold">Where will you go?</h2></div><CalendarDays className="size-7 text-teal" aria-hidden /></div>
        <div className="grid gap-3 md:grid-cols-4">
          <label className={field}>Location<select value={location} onChange={(e) => setLocation(e.target.value)} className={select}>{LOCATIONS.map((name) => <option key={name}>{name}</option>)}</select></label>
          <label className={field}>Activity<select value={activity} onChange={(e) => setActivity(e.target.value)} className={select}>{ACTIVITIES.map((name) => <option key={name}>{name}</option>)}</select></label>
          <DatePicker value={date} onChange={setDate} />
          <button type="button" onClick={() => setSubmitted(true)} className="rounded-2xl bg-ink px-5 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-ink-soft">{submitted ? 'Request received' : 'Find sessions'} <ArrowRight className="ml-2 inline size-4" aria-hidden /></button>
        </div>
        <p className="mt-4 text-xs text-slate-light">Live availability and payment will appear here once the booking engine is connected. This preview uses demonstration data.</p>
      </div>
    </section>
  )
}
