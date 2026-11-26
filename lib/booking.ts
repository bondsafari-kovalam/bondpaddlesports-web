/**
 * Booking adapter. With the Bond backend configured, `fetchAvailability` returns the live sessions of a location on
 * a date (GET /booking-requests/slots: per activity, free seats and per-person price). Without it, `getAvailability`
 * returns clearly flagged demonstration data.
 *
 * Production journey owned by the backend: activity + location → date + session → participants → request → the team
 * confirms on WhatsApp. Capacity, cut-offs, guide ratios, weather closures, refunds, GST invoices and audit trails are
 * backend responsibilities.
 */

import { activitiesAt } from '@/lib/activities'
import { bondApi } from '@/lib/bond-api'
export { BOOKING_ENGINE_CONNECTED } from '@/lib/booking-config'

export type Session = {
  id: string
  label: string
  start: string
  seatsRemaining: number
  /** Undefined means the price is not configured: show "Price to be confirmed". */
  pricePerParticipant?: number
  /** Live sessions belong to one activity; demo sessions apply to every activity. */
  activitySlug?: string
}

export type AddOn = { id: string; name: string; price: number }

export type Availability = {
  source: 'demo' | 'live'
  activities: string[]
  sessions: Session[]
  addOns: AddOn[]
  childPricing: boolean
  /** Fraction applied to the subtotal for the displayed estimate (GST); the team confirms the final amount. */
  taxRate: number
  mandatoryCharges: { name: string; amount: number }[]
  membershipBenefits: boolean
  /** True when live sessions could not be loaded (times then stay optional). */
  unavailable?: boolean
}

function seededSeats(seed: string) {
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return (hash % 9) + 2
}

export function getAvailability(locationSlug: string, date: string, pricePerParticipant?: number): Availability {
  return {
    source: 'demo',
    activities: activitiesAt(locationSlug).map((activity) => activity.name),
    sessions: [
      { id: 'morning', label: 'Morning', start: '07:00', seatsRemaining: seededSeats(`${locationSlug}${date}am`), pricePerParticipant },
      { id: 'afternoon', label: 'Afternoon', start: '15:30', seatsRemaining: seededSeats(`${locationSlug}${date}pm`), pricePerParticipant },
    ],
    addOns: [],
    childPricing: false,
    taxRate: 0.18,
    mandatoryCharges: [],
    membershipBenefits: false,
  }
}

type Slot = {
  id: string
  activitySlug: string
  startTime: string
  remainingSeats: number
  price: { amount: string } | null
}

const partOfDay = (time: string) => {
  const hour = Number(time.slice(0, 2))
  return hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening'
}

/** Live sessions from the Bond backend; falls back to demo data only when the backend is not configured. */
export async function fetchAvailability(locationSlug: string, date: string): Promise<Availability> {
  const demo = getAvailability(locationSlug, date)
  if (!locationSlug || !date) return { ...demo, source: 'live', sessions: [] }
  const query = new URLSearchParams({ location: locationSlug, date })
  const result = await bondApi<{ slots: Slot[] }>(`/booking-requests/slots?${query}`)
  if (!result.ok && result.reason === 'not-connected') return demo
  const sessions: Session[] = result.ok
    ? result.data.slots.map((slot) => ({
        id: slot.id,
        label: partOfDay(slot.startTime),
        start: slot.startTime,
        seatsRemaining: slot.remainingSeats,
        pricePerParticipant: slot.price ? Number(slot.price.amount) : undefined,
        activitySlug: slot.activitySlug,
      }))
    : []
  return { ...demo, source: 'live', sessions, unavailable: !result.ok }
}

/** Sessions an activity can be booked into: its own live sessions, or every demo session. */
export function sessionsFor(availability: Availability, activitySlug: string) {
  return availability.sessions.filter((session) => !session.activitySlug || session.activitySlug === activitySlug)
}
