/**
 * Booking adapter. The shared Bond booking engine is not connected yet, so `getAvailability`
 * returns clearly flagged demonstration data. Replace the body with an engine call (server-side,
 * so no keys reach the browser) and return `source: 'live'`.
 *
 * Production journey owned by the engine: activity + location → date + session → participants →
 * full price → extras → participant details → terms + waivers → payment → booking reference.
 * Capacity, maintenance blocks, cut-offs, guide ratios, weather closures, refunds, GST invoices,
 * membership/Pearls and audit trails are backend responsibilities.
 */

import { activitiesAt } from '@/lib/activities'
export { BOOKING_ENGINE_CONNECTED } from '@/lib/booking-config'

export type Session = {
  id: string
  label: string
  start: string
  seatsRemaining: number
  /** Undefined means the price is not configured: show "Price to be confirmed". */
  pricePerParticipant?: number
}

export type AddOn = { id: string; name: string; price: number }

export type Availability = {
  source: 'demo' | 'live'
  activities: string[]
  sessions: Session[]
  addOns: AddOn[]
  childPricing: boolean
  /** Fraction applied to the subtotal; demonstration value until finance confirms. */
  taxRate: number
  mandatoryCharges: { name: string; amount: number }[]
  membershipBenefits: boolean
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
