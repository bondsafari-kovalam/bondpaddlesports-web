'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Info, Minus, Plus, Users } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { getAvailability } from '@/lib/booking'
import { formatPrice } from '@/lib/locations'

const fieldBox = 'rounded-2xl border border-line bg-paper-bright px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate focus-within:ring-2 focus-within:ring-teal'
const fieldInput = 'mt-2 block min-h-6 w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-ink outline-none'

export type BookableLocation = { slug: string; name: string; pricePerParticipant?: number }

function todayISO() {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

function Counter({ label, value, onChange, min = 0, max }: { label: string; value: number; onChange: (value: number) => void; min?: number; max: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold normal-case tracking-normal text-ink">{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className={`flex size-11 items-center justify-center rounded-full border border-line bg-white disabled:opacity-40 ${focusRing}`} aria-label={`Fewer ${label.toLowerCase()}`}><Minus className="size-3.5" /></button>
        <span className="w-6 text-center text-sm font-bold text-ink" aria-live="polite">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className={`flex size-11 items-center justify-center rounded-full border border-line bg-white disabled:opacity-40 ${focusRing}`} aria-label={`More ${label.toLowerCase()}`}><Plus className="size-3.5" /></button>
      </div>
    </div>
  )
}

/**
 * Shared booking form for location and activity pages. Reads availability through the booking
 * adapter; while that returns demo data, every figure is labelled and checkout is disabled.
 */
export function BookingForm({ title, locations, fixedActivity }: { title: string; locations: BookableLocation[]; fixedActivity?: string }) {
  // Dates are set after mount so server and browser time zones can't cause a hydration mismatch.
  const [today, setToday] = useState('')
  const [date, setDate] = useState('')
  useEffect(() => {
    const now = todayISO()
    setToday(now)
    setDate(now)
  }, [])

  const [locationSlug, setLocationSlug] = useState(locations[0]?.slug)
  const location = locations.find((item) => item.slug === locationSlug) ?? locations[0]
  const availability = useMemo(() => getAvailability(location.slug, date, location.pricePerParticipant), [location.slug, location.pricePerParticipant, date])
  const [activity, setActivity] = useState(fixedActivity ?? availability.activities[0])
  const [sessionId, setSessionId] = useState(availability.sessions[0]?.id)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [attempted, setAttempted] = useState(false)

  const session = availability.sessions.find((item) => item.id === sessionId) ?? availability.sessions[0]
  const price = session?.pricePerParticipant
  const participants = adults + (availability.childPricing ? children : 0)
  const subtotal = price ? price * participants : 0
  const charges = availability.mandatoryCharges.reduce((sum, charge) => sum + charge.amount, 0)
  const tax = Math.round((subtotal + charges) * availability.taxRate)
  const total = subtotal + charges + tax
  const isDemo = availability.source === 'demo'

  return (
    <div id="book" className="scroll-mt-6 rounded-3xl bg-white p-5 shadow-[0_20px_60px_color-mix(in_srgb,var(--color-ink)_16%,transparent)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Plan your paddle</p>
          <h2 className="mt-2 font-display text-2xl font-bold">{title}</h2>
        </div>
        <CalendarDays className="size-7 shrink-0 text-teal" aria-hidden />
      </div>

      {isDemo && (
        <p className="mt-4 flex gap-2 rounded-xl bg-sand-soft p-3 text-xs leading-5 text-sand-ink" role="note">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span><strong>Demonstration data.</strong> Activities, session times, seats and prices below are examples. Live availability will appear once the Bond booking engine is connected.</span>
        </p>
      )}

      <div className="mt-5 grid gap-3">
        {locations.length > 1 && (
          <label className={fieldBox}>Location
            <select value={location.slug} onChange={(event) => setLocationSlug(event.target.value)} className={fieldInput}>
              {locations.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
          </label>
        )}
        {!fixedActivity && (
          <label className={fieldBox}>Activity
            <select value={activity} onChange={(event) => setActivity(event.target.value)} className={fieldInput}>
              {availability.activities.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        )}
        <label className={fieldBox}>Date
          <input type="date" value={date} min={today || undefined} onChange={(event) => setDate(event.target.value || today)} className={fieldInput} />
        </label>
        <fieldset className={fieldBox}>
          <legend className="sr-only">Session</legend>
          <span aria-hidden>Session</span>
          <div className="mt-2 grid gap-2">
            {availability.sessions.map((item) => (
              <label key={item.id} className={`flex min-h-11 cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 normal-case tracking-normal transition has-focus-visible:ring-2 has-focus-visible:ring-teal ${item.id === session?.id ? 'border-ink bg-white' : 'border-transparent bg-white/60'}`}>
                <input type="radio" name="session" value={item.id} checked={item.id === session?.id} onChange={() => setSessionId(item.id)} className="sr-only" />
                <span><span className="block text-sm font-bold text-ink">{item.label} · {item.start}</span><span className="text-xs font-semibold text-slate">{item.seatsRemaining} seats left{isDemo && ' (demo)'}</span></span>
                <span className="text-sm font-bold text-teal-strong">{item.pricePerParticipant ? <>{formatPrice(item.pricePerParticipant)}<span className="text-xs font-semibold text-slate"> /person</span></> : <span className="text-xs text-slate">Price to be confirmed</span>}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className={`${fieldBox} space-y-3`}>
          <span className="flex items-center gap-2"><Users className="size-3.5" aria-hidden /> Participants</span>
          <Counter label="Adults" value={adults} onChange={setAdults} min={1} max={session?.seatsRemaining ?? 1} />
          {availability.childPricing
            ? <Counter label="Children" value={children} onChange={setChildren} max={Math.max(0, (session?.seatsRemaining ?? 0) - adults)} />
            : <p className="text-xs font-semibold normal-case tracking-normal text-slate">Child bookings: pricing and eligibility not yet configured.</p>}
        </div>
      </div>

      <dl className="mt-5 space-y-2 border-t border-mist pt-4 text-sm">
        {price ? (
          <>
            <div className="flex justify-between text-slate-strong"><dt>{participants} × {formatPrice(price)}</dt><dd>{formatPrice(subtotal)}</dd></div>
            {availability.mandatoryCharges.map((charge) => <div key={charge.name} className="flex justify-between text-slate-strong"><dt>{charge.name}</dt><dd>{formatPrice(charge.amount)}</dd></div>)}
            <div className="flex justify-between text-slate-strong"><dt>GST{isDemo && ` (demo rate ${Math.round(availability.taxRate * 100)}%)`}</dt><dd>{formatPrice(tax)}</dd></div>
          </>
        ) : null}
        <div className="flex justify-between text-xs text-slate"><dt>Extras</dt><dd>{availability.addOns.length ? `${availability.addOns.length} available` : 'None configured'}</dd></div>
        <div className="flex justify-between text-xs text-slate"><dt>Membership & Pearls</dt><dd>{availability.membershipBenefits ? 'Applied at checkout' : 'Not yet connected'}</dd></div>
        <div className="flex justify-between border-t border-mist pt-3 font-display text-lg font-bold"><dt>Total payable</dt><dd>{price ? formatPrice(total) : <span className="text-sm">Price to be confirmed</span>}</dd></div>
      </dl>

      <button type="button" onClick={() => setAttempted(true)} className={`mt-5 flex min-h-12 w-full items-center justify-center rounded-2xl bg-ink px-5 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-ink-soft ${focusRing}`}>
        Book now <ArrowRight className="ml-2 size-4" aria-hidden />
      </button>
      {attempted && isDemo && (
        <p className="mt-3 rounded-xl bg-mist p-3 text-xs leading-5 text-slate-strong" role="status">This is a demo preview: no booking was created and no payment was taken. Checkout opens once the booking engine is connected. You won’t need an account to book.</p>
      )}
      <p className="mt-3 text-center text-xs text-slate">Booking terms, waivers and cancellation policy: <a href="#booking-policies" className="font-semibold text-teal underline-offset-2 hover:underline">see policies</a></p>
    </div>
  )
}
