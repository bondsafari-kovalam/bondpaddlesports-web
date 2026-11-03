'use client'

import { useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { AlertCircle, ArrowLeft, ArrowRight, Check, Clock, Info, Loader2, MapPin, Phone, Plus, RotateCcw, Users, X } from 'lucide-react'
import { Stepper, openPicker } from '@/components/booking/stepper'
import { DemoBanner, TextField } from '@/components/academy/form-kit'
import { focusRing } from '@/components/locations/primitives'
import { getAvailability, type Session } from '@/lib/booking'
import { whatsappHref } from '@/lib/contact'
import {
  BOOKING_STEPS,
  GROUP_SIZE,
  fitPicks,
  groupActivitiesAt,
  groupLocations,
  pickField,
  quoteBooking,
  stepForError,
  validateStep,
  type BookingDraft,
  type BookingErrors,
  type BookingQuote,
  type BookingStart,
  type BookingStep,
  type GroupActivityOption,
  type LeadBooker,
} from '@/lib/group-booking'
import { submitGroupBooking, toGroupBookingPayload } from '@/lib/group-booking-service'
import { formatPrice } from '@/lib/locations'
import { CONTACT, ROUTES } from '@/lib/site'
import { cn } from '@/lib/utils'

// Versioned so a change to the draft shape never restores an incompatible object.
const STORAGE_KEY = 'bond-booking-draft-v3'
const DATE_CHIPS = 9

const toISO = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
const fromISO = (iso: string) => new Date(`${iso}T00:00:00`)
const todayISO = () => toISO(new Date())
const addDays = (iso: string, days: number) => {
  const date = fromISO(iso)
  date.setDate(date.getDate() + days)
  return toISO(date)
}
const longDate = (iso: string) => fromISO(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
const peopleCount = (n: number) => `${n} ${n === 1 ? 'person' : 'people'}`

const initialDraft = (locationSlug: string): BookingDraft => ({
  locationSlug,
  date: '',
  people: 1,
  picks: [],
  lead: { name: '', phone: '', email: '' },
  acceptedTerms: false,
})

type Action =
  | { type: 'restore'; draft: BookingDraft }
  | { type: 'location'; slug: string; offered: string[] }
  | { type: 'date'; date: string }
  | { type: 'people'; people: number }
  | { type: 'add'; slug: string }
  | { type: 'remove'; slug: string }
  | { type: 'pick-people'; slug: string; people: number }
  | { type: 'pick-session'; slug: string; sessionId: string }
  | { type: 'lead'; patch: Partial<LeadBooker> }
  | { type: 'terms'; accepted: boolean }

function reducer(draft: BookingDraft, action: Action): BookingDraft {
  const updatePick = (slug: string, patch: Partial<BookingDraft['picks'][number]>) => draft.picks.map((pick) => (pick.slug === slug ? { ...pick, ...patch } : pick))
  switch (action.type) {
    case 'restore': return action.draft
    // A new location keeps the activities it also offers and drops the rest.
    case 'location': return { ...draft, locationSlug: action.slug, picks: draft.picks.filter((pick) => action.offered.includes(pick.slug)) }
    case 'date': return { ...draft, date: action.date }
    case 'people': return { ...draft, people: action.people, picks: fitPicks(draft.picks, action.people) }
    // Everyone joins a newly added activity; the guest can lower it.
    case 'add': return draft.picks.some((pick) => pick.slug === action.slug) ? draft : { ...draft, picks: [...draft.picks, { slug: action.slug, people: draft.people, sessionId: '' }] }
    case 'remove': return { ...draft, picks: draft.picks.filter((pick) => pick.slug !== action.slug) }
    case 'pick-people': return { ...draft, picks: updatePick(action.slug, { people: action.people }) }
    case 'pick-session': return { ...draft, picks: updatePick(action.slug, { sessionId: action.sessionId }) }
    case 'lead': return { ...draft, lead: { ...draft.lead, ...action.patch } }
    case 'terms': return { ...draft, acceptedTerms: action.accepted }
  }
}

/** Accepts only a stored draft whose shape still matches, so a corrupt entry can't break the page. */
function readStored(validLocations: string[]): { draft: BookingDraft; step: number } | null {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null')
    const draft = parsed?.draft as BookingDraft | undefined
    if (!draft || !validLocations.includes(draft.locationSlug) || !Number.isInteger(draft.people) || !Array.isArray(draft.picks) || !draft.picks.every((pick) => typeof pick?.slug === 'string' && Number.isInteger(pick.people))) return null
    return { draft: { ...initialDraft(draft.locationSlug), ...draft }, step: Math.min(Math.max(Number(parsed.step) || 0, 0), BOOKING_STEPS.length - 1) }
  } catch {
    return null
  }
}

/** A fresh draft from a starter card's choices; its activity arrives already added for the whole group. */
function draftFromStart(start: BookingStart, validLocations: string[], fallback: string): BookingDraft {
  const locationSlug = start.location && validLocations.includes(start.location) ? start.location : fallback
  const people = start.people ?? 1
  const offered = groupActivitiesAt(locationSlug).map((option) => option.slug)
  const picks = start.activity && offered.includes(start.activity) ? [{ slug: start.activity, people, sessionId: start.session ?? '' }] : []
  return { ...initialDraft(locationSlug), date: start.date ?? '', people, picks }
}

/**
 * The single booking flow for one person or a whole group: pick a date and group size, add
 * activities and how many join each, choose times, then leave contact details. Starter cards
 * elsewhere on the site link here with their choices.
 */
export function GroupBooking({ start }: { start?: BookingStart }) {
  const allLocations = useMemo(groupLocations, [])
  const [draft, dispatch] = useReducer(reducer, allLocations[0]?.slug ?? '', initialDraft)
  const [stepIndex, setStepIndex] = useState(0)
  const [today, setToday] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [notice, setNotice] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'not-connected' | 'error'>('idle')
  const panelRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const inFlight = useRef(false)

  // Dates and the saved draft load after mount so server and browser output match on hydration.
  useEffect(() => {
    const now = todayISO()
    setToday(now)
    const slugs = allLocations.map((location) => location.slug)
    const fromLink = start && Object.values(start).some((value) => value !== undefined)
    const stored = fromLink ? null : readStored(slugs)
    const next = fromLink ? draftFromStart(start, slugs, allLocations[0]?.slug ?? '') : stored?.draft
    if (next) dispatch({ type: 'restore', draft: { ...next, date: next.date && next.date >= now ? next.date : now } })
    else dispatch({ type: 'date', date: now })
    if (stored) setStepIndex(stored.step)
    // Drop the query once applied, so a refresh restores the saved draft instead of starting over.
    if (fromLink) window.history.replaceState(null, '', window.location.pathname)
    setHydrated(true)
  }, [allLocations, start])

  useEffect(() => {
    if (!hydrated) return
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ draft, step: stepIndex })) } catch {}
  }, [draft, stepIndex, hydrated])

  const step = BOOKING_STEPS[stepIndex].id
  const location = allLocations.find((item) => item.slug === draft.locationSlug) ?? allLocations[0]
  const options = useMemo(() => (location ? groupActivitiesAt(location.slug) : []), [location])
  const availability = useMemo(() => getAvailability(location?.slug ?? '', draft.date), [location, draft.date])
  const quote = useMemo(() => quoteBooking(draft.picks, options, availability), [draft.picks, options, availability])
  const context = { today, sessions: availability.sessions, options }
  const errors: BookingErrors = showErrors ? validateStep(step, draft, context) : {}
  const isDemo = availability.source === 'demo'
  const contactHref = whatsappHref() ?? (CONTACT.phone ? `tel:${CONTACT.phone.replace(/\s/g, '')}` : ROUTES.contact)

  useEffect(() => {
    if (!attempt) return
    const invalid = panelRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    ;(invalid?.matches('input, select, textarea, button') ? invalid : invalid?.querySelector<HTMLElement>('input, button'))?.focus()
  }, [attempt])

  function showFirstError(found: BookingErrors) {
    setStepIndex(BOOKING_STEPS.findIndex((item) => item.id === stepForError(Object.keys(found)[0])))
    setShowErrors(true)
    setAttempt((n) => n + 1)
  }

  function goTo(target: number) {
    if (target > stepIndex) {
      // Moving forward validates everything up to the step being left, then sends the guest to the first problem.
      const found = validateStep(BOOKING_STEPS[target - 1].id, draft, context)
      if (Object.keys(found).length) return showFirstError(found)
    }
    setShowErrors(false)
    setStepIndex(target)
    setSubmitState('idle')
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      headingRef.current?.focus({ preventScroll: true })
    })
  }

  // On the first step, Back leaves the flow for the page the guest came from (home if they landed here directly).
  function goBack() {
    if (stepIndex > 0) return goTo(stepIndex - 1)
    if (document.referrer.startsWith(window.location.origin) && window.history.length > 1) window.history.back()
    else window.location.href = '/'
  }

  function changeLocation(slug: string) {
    const offered = groupActivitiesAt(slug).map((option) => option.slug)
    const dropped = draft.picks.filter((pick) => !offered.includes(pick.slug)).length
    dispatch({ type: 'location', slug, offered })
    const name = allLocations.find((item) => item.slug === slug)?.name
    setNotice(dropped ? `${dropped} ${dropped === 1 ? 'activity was' : 'activities were'} removed because ${name} doesn’t offer ${dropped === 1 ? 'it' : 'them'}.` : '')
  }

  async function submit() {
    if (inFlight.current) return
    const found = validateStep('details', draft, context)
    if (Object.keys(found).length) return showFirstError(found)
    inFlight.current = true
    setSubmitState('sending')
    try {
      const result = await submitGroupBooking(toGroupBookingPayload(draft, quote))
      // A real reference would move to a confirmation page; until the engine is connected this never succeeds.
      setSubmitState(result.ok ? 'idle' : result.reason === 'not-connected' ? 'not-connected' : 'error')
    } catch {
      setSubmitState('error')
    } finally {
      inFlight.current = false
    }
  }

  function startOver() {
    try { sessionStorage.removeItem(STORAGE_KEY) } catch {}
    dispatch({ type: 'restore', draft: { ...initialDraft(allLocations[0]?.slug ?? ''), date: today } })
    setStepIndex(0)
    setShowErrors(false)
    setNotice('')
    setSubmitState('idle')
  }

  if (!location) {
    return <p className="rounded-3xl bg-white p-8 text-sm text-slate-strong">No location is taking bookings right now. <a href={ROUTES.contact} className="font-semibold text-teal hover:underline">Contact us</a> and our team will help you plan your paddle.</p>
  }

  const added = (slug: string) => draft.picks.some((pick) => pick.slug === slug)
  const lastStep = stepIndex === BOOKING_STEPS.length - 1

  return (
    <section ref={panelRef} aria-labelledby="booking-step-heading" className="mx-auto max-w-3xl scroll-mt-28">
      <Progress current={stepIndex} onSelect={goTo} />

      {isDemo && <div className="mt-6"><DemoBanner><strong>Demonstration data.</strong> Times, places and prices are examples until the Bond booking engine is connected. No booking is created and no payment is taken.</DemoBanner></div>}

      {!hydrated ? (
        <div className="mt-8 space-y-3" aria-busy="true" aria-label="Loading booking">
          {[0, 1, 2].map((i) => <div key={i} className="h-20 animate-pulse rounded-3xl bg-mist" />)}
        </div>
      ) : (
        <div key={step} className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
          {step !== 'when' && <TripCard date={draft.date} people={draft.people} locationName={location.name} onChange={() => goTo(0)} />}

          <h2 id="booking-step-heading" ref={headingRef} tabIndex={-1} className={cn('font-display text-3xl font-bold outline-none sm:text-4xl', step !== 'when' && 'mt-8')}>{STEP_TITLES[step].title}</h2>
          {STEP_TITLES[step].intro && <p className="mt-2 text-sm leading-6 text-slate-strong">{STEP_TITLES[step].intro}</p>}

          <div className="mt-6">
            {step === 'when' && (
              <div className="grid gap-6">
                {draft.picks.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {quote.lines.map(({ option }) => <li key={option.slug} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink"><Check className="size-4 text-teal" aria-hidden />{option.name} added</li>)}
                  </ul>
                )}
                {allLocations.length > 1 && (
                  <fieldset aria-invalid={!!errors.location}>
                    <legend className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate"><MapPin className="size-3.5" aria-hidden />Where</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {allLocations.map((item) => (
                        <label key={item.slug} className={cn('cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition has-focus-visible:ring-2 has-focus-visible:ring-teal', item.slug === location.slug ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink')}>
                          <input type="radio" name="booking-location" value={item.slug} checked={item.slug === location.slug} onChange={() => changeLocation(item.slug)} className="sr-only" />
                          {item.name}
                        </label>
                      ))}
                    </div>
                    {errors.location && <ErrorText>{errors.location}</ErrorText>}
                  </fieldset>
                )}
                {notice && <p role="status" className="flex gap-2 rounded-xl bg-sand-soft p-3 text-xs leading-5 text-sand-ink"><Info className="mt-0.5 size-4 shrink-0" aria-hidden />{notice}</p>}
                <DateChoice today={today} value={draft.date} error={errors.date} onChange={(date) => dispatch({ type: 'date', date })} />
                <div>
                  <div className="flex items-center justify-between gap-4 rounded-3xl border border-line bg-white p-5 sm:p-6">
                    <div>
                      <p className="font-display text-xl font-bold" id="group-size-label">How many people in your group?</p>
                      <p className="mt-1 text-sm text-teal-strong">Everyone coming, even if they don’t join every activity</p>
                    </div>
                    <div role="group" aria-labelledby="group-size-label" aria-invalid={!!errors.people}>
                      <Stepper large label="People" value={draft.people} onChange={(people) => dispatch({ type: 'people', people })} min={GROUP_SIZE.min} max={GROUP_SIZE.max} />
                    </div>
                  </div>
                  {errors.people && <ErrorText>{errors.people}</ErrorText>}
                  <p className="mt-3 text-sm text-slate">More than {GROUP_SIZE.max} people? <a href={contactHref} className="font-semibold text-teal hover:underline">Message us on WhatsApp</a>.</p>
                </div>
              </div>
            )}

            {step === 'activities' && (
              <div className="grid gap-3" aria-invalid={!!errors.activities}>
                {options.map((option) => {
                  const pick = draft.picks.find((item) => item.slug === option.slug)
                  return (
                    <ActivityRow
                      key={option.slug}
                      option={option}
                      groupSize={draft.people}
                      joining={pick?.people}
                      error={errors[pickField(option.slug, 'people')]}
                      onAdd={() => dispatch({ type: 'add', slug: option.slug })}
                      onRemove={() => dispatch({ type: 'remove', slug: option.slug })}
                      onJoining={(people) => dispatch({ type: 'pick-people', slug: option.slug, people })}
                    />
                  )
                })}
                {errors.activities && <ErrorText>{errors.activities}</ErrorText>}
                <p className="text-xs leading-5 text-slate">Minimum ages for each activity are confirmed by the Bond team before your session.</p>
              </div>
            )}

            {step === 'times' && (
              <div className="grid gap-4">
                {quote.lines.map(({ pick, option }) => (
                  <TimeCard
                    key={pick.slug}
                    name={option.name}
                    people={pick.people}
                    sessions={availability.sessions}
                    selected={pick.sessionId}
                    isDemo={isDemo}
                    error={errors[pickField(pick.slug, 'session')]}
                    onSelect={(sessionId) => dispatch({ type: 'pick-session', slug: pick.slug, sessionId: sessionId === pick.sessionId ? '' : sessionId })}
                    onRemove={() => dispatch({ type: 'remove', slug: pick.slug })}
                  />
                ))}
                {quote.lines.length === 0 && (
                  <p className="rounded-3xl border border-dashed border-line p-6 text-sm text-slate-strong">No activities yet. <button type="button" onClick={() => goTo(1)} className="font-semibold text-teal hover:underline">Add an activity</button></p>
                )}
                <BookingSummary quote={quote} date={draft.date} sessions={availability.sessions} taxRate={availability.taxRate} isDemo={isDemo} />
              </div>
            )}

            {step === 'details' && (
              <div className="grid gap-5">
                <TextField label="Your name" placeholder="Full name" autoComplete="name" maxLength={80} value={draft.lead.name} onChange={(event) => dispatch({ type: 'lead', patch: { name: event.target.value } })} error={errors['lead-name']} />
                <TextField label="WhatsApp number" type="tel" placeholder="+91 98765 43210" autoComplete="tel" value={draft.lead.phone} onChange={(event) => dispatch({ type: 'lead', patch: { phone: event.target.value } })} error={errors['lead-phone']} hint="We confirm your times and send the booking here." />
                <TextField label="Email" optional type="email" placeholder="you@example.com" autoComplete="email" value={draft.lead.email} onChange={(event) => dispatch({ type: 'lead', patch: { email: event.target.value } })} error={errors['lead-email']} />
                <div>
                  <label className="flex min-h-11 gap-3 text-sm leading-5 text-ink">
                    <input type="checkbox" checked={draft.acceptedTerms} onChange={(event) => dispatch({ type: 'terms', accepted: event.target.checked })} className="mt-0.5 size-5 shrink-0 accent-ink" aria-invalid={!!errors.terms} />
                    <span>{draft.people > 1 ? 'I’m booking for my whole group and accept the booking terms, waivers and cancellation policy on their behalf.' : 'I accept the booking terms, waiver and cancellation policy.'}</span>
                  </label>
                  {errors.terms && <p className="ml-8"><ErrorText>{errors.terms}</ErrorText></p>}
                </div>
                <BookingSummary quote={quote} date={draft.date} sessions={availability.sessions} taxRate={availability.taxRate} isDemo={isDemo} />
                {submitState === 'not-connected' && (
                  <p role="status" className="flex gap-3 rounded-2xl bg-mist p-4 text-sm leading-6 text-slate-strong"><Info className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden /><span><strong className="text-ink">Demo preview: no booking was created and no payment was taken.</strong> Once the booking engine is connected, this creates one booking for your group with all {quote.lines.length === 1 ? 'its activity' : `${quote.lines.length} activities`}, and we confirm the times on WhatsApp.</span></p>
                )}
                {submitState === 'error' && (
                  <p role="alert" className="flex gap-3 rounded-2xl bg-danger-soft p-4 text-sm text-danger"><AlertCircle className="size-5 shrink-0" aria-hidden />Something went wrong and the booking wasn’t sent. Your details are saved; please try again.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-end">
        <button type="button" onClick={startOver} className={`inline-flex min-h-11 items-center gap-2 px-1 text-xs font-bold text-slate transition hover:text-ink ${focusRing}`}><RotateCcw className="size-3.5" aria-hidden />Start over</button>
      </div>

      <div className="sticky bottom-4 z-20 mt-4 flex items-center gap-3 rounded-full border border-line bg-white p-2.5 shadow-[0_20px_60px_color-mix(in_srgb,var(--color-ink)_16%,transparent)] sm:gap-4 sm:p-3">
        <a href={contactHref} target={contactHref.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label="Ask us on WhatsApp" className={`flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-ink transition hover:border-ink ${focusRing}`}><Phone className="size-5" aria-hidden /></a>
        <div className="min-w-0 flex-1" aria-live="polite">
          <p className="truncate font-display text-xl font-bold leading-tight sm:text-2xl">{quote.lines.length === 0 ? formatPrice(0) : quote.priced ? formatPrice(quote.total) : 'Price on request'}</p>
          <p className="truncate text-xs text-teal-strong">{peopleCount(draft.people)} · {quote.lines.length} {quote.lines.length === 1 ? 'activity' : 'activities'}{quote.lines.length > 0 && quote.priced && ' · incl. GST'}</p>
        </div>
        <button type="button" onClick={goBack} aria-label={stepIndex > 0 ? `Back to ${BOOKING_STEPS[stepIndex - 1].label}` : 'Back to the previous page'} className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-line px-3.5 text-sm font-bold uppercase tracking-widest text-ink transition hover:border-ink sm:px-5 ${focusRing}`}>
          <ArrowLeft className="size-4" aria-hidden /><span className="hidden sm:inline">Back</span>
        </button>
        <button type="button" onClick={lastStep ? submit : () => goTo(stepIndex + 1)} disabled={!hydrated || submitState === 'sending'} className={`inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-sand py-1.5 pl-5 pr-1.5 text-sm font-extrabold uppercase tracking-widest text-ink transition hover:brightness-95 disabled:opacity-60 sm:pl-7 ${focusRing}`}>
          {submitState === 'sending' ? 'Sending' : lastStep ? 'Confirm' : 'Continue'}
          <span className="flex size-10 items-center justify-center rounded-full bg-ink text-white" aria-hidden>{submitState === 'sending' ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}</span>
        </button>
      </div>
    </section>
  )
}

const STEP_TITLES: Record<BookingStep, { title: string; intro?: string }> = {
  when: { title: 'When are you coming?' },
  activities: { title: 'What would you like to do?', intro: 'Add as many activities as you like, and choose how many of your group join each one.' },
  times: { title: 'Pick a time for each', intro: 'Preferred times are optional. We confirm the exact slot on WhatsApp.' },
  details: { title: 'Who should we confirm with?' },
}

function ErrorText({ children }: { children: ReactNode }) {
  return <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-danger"><AlertCircle className="size-3.5" aria-hidden />{children}</span>
}

function Progress({ current, onSelect }: { current: number; onSelect: (index: number) => void }) {
  return (
    <nav aria-label="Booking progress">
      <ol className="grid grid-cols-4 gap-2 sm:gap-3">
        {BOOKING_STEPS.map((item, index) => {
          const done = index < current
          const active = index === current
          return (
            <li key={item.id}>
              <button type="button" onClick={() => onSelect(index)} aria-current={active ? 'step' : undefined} className={`group w-full text-left ${focusRing}`}>
                <span className={cn('block h-1 rounded-full transition-colors', done || active ? 'bg-teal' : 'bg-line')} aria-hidden />
                <span className="mt-3 flex items-center gap-2">
                  <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition', active ? 'bg-ink text-white' : done ? 'bg-teal text-white' : 'bg-sand-soft text-ink group-hover:bg-mist')}>
                    {done ? <Check className="size-4" aria-hidden /> : index + 1}
                  </span>
                  <span className={cn('truncate text-[0.7rem] font-bold uppercase tracking-wider', active ? 'text-ink' : 'hidden text-slate sm:inline')}>{item.label}<span className="sr-only">{done ? ' (completed)' : ''}</span></span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function DateChoice({ today, value, error, onChange }: { today: string; value: string; error?: string; onChange: (date: string) => void }) {
  const input = useRef<HTMLInputElement>(null)
  const days = today ? Array.from({ length: DATE_CHIPS }, (_, i) => addDays(today, i)) : []
  const later = value && !days.includes(value) ? value : ''
  return (
    <fieldset aria-invalid={!!error}>
      <legend className="sr-only">Date</legend>
      <div className="-mx-5 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0">
        {days.map((iso, i) => {
          const date = fromISO(iso)
          const selected = iso === value
          return (
            <label key={iso} className={cn('flex min-w-[5.25rem] shrink-0 cursor-pointer snap-start flex-col items-center rounded-3xl border px-3 py-3.5 text-center transition has-focus-visible:ring-2 has-focus-visible:ring-teal', selected ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink')}>
              <input type="radio" name="booking-date" value={iso} checked={selected} onChange={() => onChange(iso)} className="sr-only" />
              <span className={cn('text-xs font-semibold uppercase', selected ? 'text-white/80' : 'text-ink')}>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
              <span className="mt-1 font-display text-2xl font-bold">{date.getDate()}</span>
              <span className={cn('text-xs font-semibold uppercase', selected ? 'text-white/80' : 'text-teal-strong')}>{date.toLocaleDateString('en-IN', { month: 'short' })}</span>
            </label>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label htmlFor="booking-later-date" className="text-sm text-slate-strong">Need a later date?</label>
        <input ref={input} id="booking-later-date" type="date" value={later} min={today || undefined} onChange={(event) => event.target.value && onChange(event.target.value)} onClick={() => openPicker(input.current)} className={cn('min-h-11 cursor-pointer rounded-2xl border bg-white px-4 text-sm font-semibold text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/30', later ? 'border-ink' : 'border-line')} />
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </fieldset>
  )
}

function TripCard({ date, people, locationName, onChange }: { date: string; people: number; locationName: string; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-line bg-white px-5 py-4 sm:px-6">
      <div className="min-w-0">
        <p className="font-display text-xl font-bold">{date ? longDate(date) : 'Date not chosen'}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-teal-strong">
          <span className="inline-flex items-center gap-1.5"><Users className="size-3.5" aria-hidden />{people === 1 ? 'Just you' : `Group of ${people}`}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden />{locationName}</span>
        </p>
      </div>
      <button type="button" onClick={onChange} className={`shrink-0 border-b border-ink pb-0.5 text-xs font-bold uppercase tracking-widest text-ink transition hover:border-teal hover:text-teal ${focusRing}`}>Change</button>
    </div>
  )
}

function ActivityRow({ option, groupSize, joining, error, onAdd, onRemove, onJoining }: {
  option: GroupActivityOption
  groupSize: number
  joining?: number
  error?: string
  onAdd: () => void
  onRemove: () => void
  onJoining: (people: number) => void
}) {
  const isAdded = joining !== undefined
  return (
    <article className={cn('rounded-3xl border bg-white p-3 transition sm:p-4', error ? 'border-danger' : isAdded ? 'border-ink' : 'border-line')}>
      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-mist sm:size-20">
          {option.image && <Image src={option.image.src} alt="" fill sizes="80px" className="object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold sm:text-xl">{option.name}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-strong">
            {option.duration && <><Clock className="size-3.5" aria-hidden />{option.duration} ·</>}
            {option.price ? `${formatPrice(option.price)} / person` : 'Price on request'}
          </p>
        </div>
        <button type="button" onClick={isAdded ? onRemove : onAdd} aria-pressed={isAdded} aria-label={isAdded ? `Remove ${option.name}` : `Add ${option.name}`} className={cn('inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-xs font-bold uppercase tracking-widest transition', isAdded ? 'border-ink bg-ink text-white hover:bg-ink-soft' : 'border-line text-ink hover:border-ink', focusRing)}>
          {isAdded ? <><Check className="size-4" aria-hidden />Added</> : <><Plus className="size-4" aria-hidden />Add</>}
        </button>
      </div>
      {isAdded && groupSize > 1 && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-paper-bright px-4 py-2.5" role="group" aria-label={`People joining ${option.name}`} aria-invalid={!!error}>
          <p className="text-sm text-slate-strong">How many of your group join?<span className="block text-xs text-slate">{joining === groupSize ? 'Everyone' : `${joining} of ${groupSize}`}</span></p>
          <Stepper label={`People joining ${option.name}`} value={joining} onChange={onJoining} min={1} max={groupSize} />
        </div>
      )}
      {error && <p className="px-1"><ErrorText>{error}</ErrorText></p>}
    </article>
  )
}

function TimeCard({ name, people, sessions, selected, isDemo, error, onSelect, onRemove }: {
  name: string
  people: number
  sessions: Session[]
  selected: string
  isDemo: boolean
  error?: string
  onSelect: (sessionId: string) => void
  onRemove: () => void
}) {
  return (
    <article className={cn('rounded-3xl border bg-white p-4 sm:p-5', error ? 'border-danger' : 'border-line')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold">{name}</h3>
          <p className="mt-0.5 text-sm text-teal-strong">{peopleCount(people)}</p>
        </div>
        <button type="button" onClick={onRemove} aria-label={`Remove ${name}`} className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper-bright text-slate transition hover:border-danger hover:text-danger ${focusRing}`}><X className="size-4" aria-hidden /></button>
      </div>
      <fieldset className="mt-4" aria-invalid={!!error}>
        <legend className="sr-only">Preferred time for {name}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {sessions.map((session) => {
            const isSelected = session.id === selected
            const tooFew = session.seatsRemaining < people
            return (
              <button key={session.id} type="button" aria-pressed={isSelected} disabled={tooFew && !isSelected} onClick={() => onSelect(session.id)} className={cn('flex min-h-16 flex-col items-center justify-center rounded-2xl border px-3 py-2.5 text-center transition disabled:cursor-not-allowed disabled:opacity-50', isSelected ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink', focusRing)}>
                <span className="font-display text-base font-bold">{session.label}</span>
                <span className={cn('text-xs', isSelected ? 'text-white/80' : 'text-teal-strong')}>{session.start} · {tooFew ? `only ${session.seatsRemaining} places` : `${session.seatsRemaining} places left`}{isDemo && ' (demo)'}</span>
              </button>
            )
          })}
        </div>
      </fieldset>
      {error && <ErrorText>{error}</ErrorText>}
    </article>
  )
}

function BookingSummary({ quote, date, sessions, taxRate, isDemo }: { quote: BookingQuote; date: string; sessions: Session[]; taxRate: number; isDemo: boolean }) {
  if (!quote.lines.length) return null
  return (
    <div className="mt-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-strong">Your booking</p>
      <div className="mt-3 overflow-hidden rounded-3xl">
        <ul className="divide-y divide-line/70 bg-sand-soft">
          {quote.lines.map(({ pick, option, amount }) => {
            const session = sessions.find((item) => item.id === pick.sessionId)
            return (
              <li key={pick.slug} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold">{option.name}</p>
                  <p className="text-sm text-slate-strong">{date && longDate(date)}{session && ` · ${session.label} ${session.start}`} · {peopleCount(pick.people)}{option.price ? ` × ${formatPrice(option.price)}` : ''}</p>
                </div>
                <p className="shrink-0 font-display text-lg font-bold">{option.price ? formatPrice(amount) : <span className="text-sm">On request</span>}</p>
              </li>
            )
          })}
          {quote.charges.map((charge) => <li key={charge.name} className="flex justify-between px-5 py-3 text-sm text-slate-strong"><span>{charge.name}</span><span>{formatPrice(charge.amount)}</span></li>)}
          <li className="flex justify-between px-5 py-3 text-sm text-slate-strong"><span>GST{isDemo && ` (demo rate ${Math.round(taxRate * 100)}%)`}</span><span>{formatPrice(quote.tax)}</span></li>
        </ul>
        <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
          <span className="text-sm font-bold uppercase tracking-widest">Total</span>
          <span className="font-display text-xl font-bold">{quote.priced ? formatPrice(quote.total) : 'Price on request'}</span>
        </div>
      </div>
      {!quote.priced && <p className="mt-2 text-xs leading-5 text-slate">Some activities here don’t have a price yet. Bond confirms the price on WhatsApp before you pay.</p>}
    </div>
  )
}
