/**
 * Booking submission boundary — connected to the Bond backend (POST /booking-requests).
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
 * 4. Attribution, which the shared contract (bond-safari-website docs/booking-api.md) has no fields
 *    for yet. `attribution` must be stored on the booking when it is CREATED, before any payment
 *    redirect, so it can't be lost if the guest returns in another browser (UPI apps and in-app
 *    browsers do this). Check `partner_code` against the partner register on the server, and
 *    keep attribution on the confirmed record so bookings, revenue and commission can be
 *    reported per location, source, campaign and partner.
 */

import type { ServiceResult } from '@/lib/academy-service'
import { bondApi, compact, newIdempotencyKey, text, toE164 } from '@/lib/bond-api'
import type { BookingAttribution } from '@/lib/attribution'
import type { BookingDraft, BookingQuote } from '@/lib/group-booking'

export type GroupBookingPayload = {
  locationSlug: string
  date: string
  people: number
  lead: BookingDraft['lead']
  activities: { slug: string; people: number; sessionId?: string }[]
  /** Shown to the guest; the engine recalculates and is the source of truth. */
  quotedTotal: number
  attribution: BookingAttribution
}

export function toGroupBookingPayload(draft: BookingDraft, quote: BookingQuote, attribution: BookingAttribution): GroupBookingPayload {
  return {
    locationSlug: draft.locationSlug,
    date: draft.date,
    people: draft.people,
    lead: { name: draft.lead.name.trim(), phone: draft.lead.phone.trim(), email: draft.lead.email.trim() },
    activities: quote.lines.map(({ pick }) => ({ slug: pick.slug, people: pick.people, sessionId: pick.sessionId || undefined })),
    quotedTotal: quote.total,
    attribution,
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * POST /booking-requests on the Bond backend: one request for the group (no payment, no seats held; the team
 * confirms on WhatsApp). The server re-validates activities and sessions and computes its own price estimate.
 * `idempotencyKey` makes a retried submission (double click, flaky network) return the same request.
 */
export async function submitGroupBooking(payload: GroupBookingPayload, idempotencyKey?: string): Promise<ServiceResult<{ groupBookingId: string }>> {
  const attribution = compact(
    Object.fromEntries(Object.entries(payload.attribution).map(([key, value]) => [key, typeof value === 'string' && value ? value : undefined])),
  )
  const result = await bondApi<{ reference: string }>('/booking-requests', {
    idempotencyKey: idempotencyKey ?? newIdempotencyKey(),
    body: {
      locationSlug: payload.locationSlug,
      date: payload.date,
      people: payload.people,
      items: payload.activities.map((item) =>
        compact({ activitySlug: item.slug, people: item.people, sessionId: item.sessionId && UUID.test(item.sessionId) ? item.sessionId : undefined }),
      ),
      lead: compact({ name: payload.lead.name, phone: toE164(payload.lead.phone), email: text(payload.lead.email) }),
      termsAccepted: true,
      ...(Object.keys(attribution).length ? { attribution } : {}),
    },
  })
  return result.ok ? { ok: true, data: { groupBookingId: result.data.reference } } : result
}
