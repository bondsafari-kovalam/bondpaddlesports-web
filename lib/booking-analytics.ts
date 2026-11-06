/**
 * Booking funnel events for Vercel Web Analytics, the site's existing analytics integration.
 * Page views are already recorded; these add the steps that make visit-to-booking conversion
 * measurable. Custom events need a Vercel plan that includes them, and are dropped otherwise.
 *
 * Revenue and partner reporting must come from backend booking records, not from these events.
 */

import { track } from '@vercel/analytics'
import type { BookingAttribution } from '@/lib/attribution'

export function trackBookingEvent(name: 'booking_started' | 'booking_confirmed', locationSlug: string, attribution: BookingAttribution) {
  track(name, {
    location: locationSlug,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    partner_code: attribution.partner_code,
  })
}
