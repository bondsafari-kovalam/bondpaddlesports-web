/**
 * Booking submission boundary.
 *
 * Integration still required (not connected):
 * 1. A server route (e.g. app/api/bookings/route.ts) that re-runs `validateStep('details', …)` and
 *    `quoteBooking` from lib/group-booking.ts, so prices and rules never come from the browser.
 * 2. Forwarding to the shared Bond booking engine, e.g. `POST /bookings/groups`, which must:
 *    - create ONE parent booking and return its `groupBookingId`;
 *    - create one line per activity, linked to that parent ID, with its headcount, preferred
 *      session and priced amount;
 *    - hold seats atomically for every line, and check capacity per activity (craft count,
 *      guide ratios), not just per session; the adapter only exposes session seats today;
 *    - apply age rules per activity (minimum ages are not configured in the catalogue yet);
 *    - take a single payment from the lead booker and issue one GST invoice for the booking.
 * 3. A WhatsApp confirmation to the lead booker with the confirmed slots, and per-person names and
 *    waivers collected before the session (the flow only asks for headcounts).
 */

import type { ServiceResult } from '@/lib/academy-service'
import type { BookingDraft, BookingQuote } from '@/lib/group-booking'

export type GroupBookingPayload = {
  locationSlug: string
  date: string
  people: number
  lead: BookingDraft['lead']
  activities: { slug: string; people: number; sessionId?: string }[]
  /** Shown to the guest; the engine recalculates and is the source of truth. */
  quotedTotal: number
}

export function toGroupBookingPayload(draft: BookingDraft, quote: BookingQuote): GroupBookingPayload {
  return {
    locationSlug: draft.locationSlug,
    date: draft.date,
    people: draft.people,
    lead: { name: draft.lead.name.trim(), phone: draft.lead.phone.trim(), email: draft.lead.email.trim() },
    activities: quote.lines.map(({ pick }) => ({ slug: pick.slug, people: pick.people, sessionId: pick.sessionId || undefined })),
    quotedTotal: quote.total,
  }
}

export async function submitGroupBooking(_payload: GroupBookingPayload): Promise<ServiceResult<{ groupBookingId: string }>> {
  return { ok: false, reason: 'not-connected', message: 'Bookings are not connected to the booking engine yet.' }
}
