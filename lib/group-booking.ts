/**
 * The booking flow: one booking for a group, made of activities, each joined by some or all of the group.
 *
 * Pure data and rules shared by the booking UI and (later) the server route, so prices and
 * validation are computed the same way on both sides. Activities and prices come from the
 * activity catalogue; sessions, seats, tax and charges come from the booking adapter.
 */

import { offersAt } from '@/lib/activities'
import type { Availability, Session } from '@/lib/booking'
import { locations, type LocationImage } from '@/lib/locations'

/** The only bookable activities. */
export const GROUP_ACTIVITY_SLUGS = ['kayaking', 'canoeing', 'stand-up-paddleboarding'] as const

/** One person is a booking too; larger groups are arranged on WhatsApp. */
export const GROUP_SIZE = { min: 1, max: 20 }

export type GroupActivityOption = { slug: string; name: string; price?: number; duration?: string; image?: LocationImage }

/** An activity in the booking: how many of the group join it, and their preferred session ('' = no preference). */
export type ActivityPick = { slug: string; people: number; sessionId: string }

export type LeadBooker = { name: string; phone: string; email: string }

export type BookingDraft = {
  locationSlug: string
  date: string
  people: number
  picks: ActivityPick[]
  lead: LeadBooker
  acceptedTerms: boolean
}

export type BookingStep = 'when' | 'activities' | 'times' | 'details'
export const BOOKING_STEPS: { id: BookingStep; label: string }[] = [
  { id: 'when', label: 'When & who' },
  { id: 'activities', label: 'Activities' },
  { id: 'times', label: 'Times & price' },
  { id: 'details', label: 'Your details' },
]

/** The bookable activities offered at a location, priced from the catalogue (undefined = not configured). */
export function groupActivitiesAt(locationSlug: string): GroupActivityOption[] {
  const offers = offersAt(locationSlug)
  return GROUP_ACTIVITY_SLUGS.flatMap((slug) => {
    const offer = offers.find((item) => item.activity.slug === slug)
    return offer ? [{ slug, name: offer.activity.name, price: offer.price, duration: offer.duration, image: offer.activity.image }] : []
  })
}

/** Operating locations where at least one bookable activity runs. */
export function groupLocations() {
  return locations.filter((location) => location.status === 'operating' && groupActivitiesAt(location.slug).length > 0).map(({ slug, name }) => ({ slug, name }))
}

/** A smaller group can't have more people in an activity than are coming. */
export const fitPicks = (picks: ActivityPick[], people: number) => picks.map((pick) => ({ ...pick, people: Math.min(pick.people, people) }))

export type QuoteLine = { pick: ActivityPick; option: GroupActivityOption; amount: number }

export type BookingQuote = {
  lines: QuoteLine[]
  subtotal: number
  charges: { name: string; amount: number }[]
  tax: number
  total: number
  /** False while any chosen activity has no configured price; totals then exclude it. */
  priced: boolean
}

export function quoteBooking(picks: ActivityPick[], options: GroupActivityOption[], availability: Availability): BookingQuote {
  const bySlug = new Map(options.map((option) => [option.slug, option]))
  // Keep the guest's order, and ignore anything the location doesn't offer.
  const lines = picks.flatMap((pick) => {
    const option = bySlug.get(pick.slug)
    return option ? [{ pick, option, amount: (option.price ?? 0) * pick.people }] : []
  })
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)
  const chargesTotal = lines.length ? availability.mandatoryCharges.reduce((sum, charge) => sum + charge.amount, 0) : 0
  const tax = Math.round((subtotal + chargesTotal) * availability.taxRate)
  return {
    lines,
    subtotal,
    charges: lines.length ? availability.mandatoryCharges : [],
    tax,
    total: subtotal + chargesTotal + tax,
    priced: lines.every((line) => line.option.price !== undefined),
  }
}

export type BookingErrors = Record<string, string>

export const pickField = (slug: string, field: 'people' | 'session') => `${slug}-${field}`

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const isPhone = (value: string) => /^\+?[\d\s-]{10,16}$/.test(value)

/** Errors for one step, keyed by field. Later steps re-check earlier ones so a stale draft can't slip through. */
export function validateStep(step: BookingStep, draft: BookingDraft, context: { today: string; sessions: Session[]; options: GroupActivityOption[] }): BookingErrors {
  const errors: BookingErrors = {}
  const order = BOOKING_STEPS.findIndex((item) => item.id === step)
  const reaches = (target: BookingStep) => order >= BOOKING_STEPS.findIndex((item) => item.id === target)

  if (reaches('when')) {
    if (!groupLocations().some((location) => location.slug === draft.locationSlug)) errors.location = 'Choose a location.'
    if (!draft.date) errors.date = 'Choose a date.'
    else if (context.today && draft.date < context.today) errors.date = 'Choose today or a later date.'
    if (!Number.isInteger(draft.people) || draft.people < GROUP_SIZE.min) errors.people = 'Add at least one person.'
    else if (draft.people > GROUP_SIZE.max) errors.people = `For more than ${GROUP_SIZE.max} people, message us on WhatsApp.`
  }

  if (reaches('activities')) {
    const offered = new Set(context.options.map((option) => option.slug))
    if (draft.picks.length === 0) errors.activities = 'Add at least one activity.'
    else if (draft.picks.some((pick) => !offered.has(pick.slug))) errors.activities = 'One of these activities isn’t offered at this location.'
    else if (new Set(draft.picks.map((pick) => pick.slug)).size !== draft.picks.length) errors.activities = 'Each activity can be added once.'
    for (const pick of draft.picks) {
      if (!Number.isInteger(pick.people) || pick.people < 1 || pick.people > draft.people) errors[pickField(pick.slug, 'people')] = `Choose between 1 and ${draft.people} ${draft.people === 1 ? 'person' : 'people'}.`
    }
  }

  if (reaches('times')) {
    for (const pick of draft.picks) {
      if (!pick.sessionId) continue
      const session = context.sessions.find((item) => item.id === pick.sessionId)
      if (!session) errors[pickField(pick.slug, 'session')] = 'This time isn’t available on this date. Choose another.'
      else if (session.seatsRemaining < pick.people) errors[pickField(pick.slug, 'session')] = `Only ${session.seatsRemaining} places left at this time. Choose another time.`
    }
  }

  if (step === 'details') {
    if (!draft.lead.name.trim()) errors['lead-name'] = 'Enter your name.'
    else if (draft.lead.name.trim().length > 80) errors['lead-name'] = 'Use 80 characters or fewer.'
    if (!isPhone(draft.lead.phone.trim())) errors['lead-phone'] = 'Enter a valid WhatsApp number.'
    if (draft.lead.email.trim() && !isEmail(draft.lead.email.trim())) errors['lead-email'] = 'Enter a valid email address, or leave it empty.'
    if (!draft.acceptedTerms) errors.terms = 'Accept the booking terms to continue.'
  }

  return errors
}

/** The step that owns a field, so the UI can send the guest back to fix it. */
export function stepForError(key: string): BookingStep {
  if (['location', 'date', 'people'].includes(key)) return 'when'
  if (key.startsWith('lead-') || key === 'terms') return 'details'
  if (key.endsWith('-session')) return 'times'
  return 'activities'
}

/** What a starter card (home, location or activity page) hands to the booking flow. */
export type BookingStart = { location?: string; date?: string; session?: string; people?: number; activity?: string }

export function bookingHref(start: BookingStart) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(start)) if (value !== undefined && value !== '') query.set(key, String(value))
  const search = query.toString()
  return `/book${search ? `?${search}` : ''}`
}

/** Reads untrusted query values; anything unknown is dropped, and the flow re-validates the rest. */
export function readBookingStart(params: Record<string, string | string[] | undefined>): BookingStart {
  const one = (key: string) => (typeof params[key] === 'string' ? (params[key] as string) : undefined)
  const people = Number(one('people'))
  return {
    location: one('location')?.slice(0, 80),
    date: /^\d{4}-\d{2}-\d{2}$/.test(one('date') ?? '') ? one('date') : undefined,
    session: one('session')?.slice(0, 40),
    people: Number.isInteger(people) && people >= GROUP_SIZE.min ? Math.min(people, GROUP_SIZE.max) : undefined,
    activity: GROUP_ACTIVITY_SLUGS.find((slug) => slug === one('activity')),
  }
}
