/**
 * Group enquiry submission boundary.
 *
 * Connected to the Bond backend (POST /enquiries/group). Still to add on the backend side:
 * 1. A server route (e.g. app/api/enquiries/group/route.ts) that validates the payload again,
 *    rejects honeypot/bot submissions and verifies a CAPTCHA token (e.g. Turnstile/reCAPTCHA).
 * 2. Forwarding to the shared Bond backend `POST /enquiries` (see bond-safari-website
 *    docs/booking-api.md), which returns `{ reference }`.
 * 3. Notifications to the groups team (email), CRM record creation, and optional WhatsApp alerts.
 *
 * An enquiry is never a booking: pricing, availability and safety requirements are confirmed by
 * the team before any booking or payment.
 */

import { checked, keyFor, submitEnquiryTo, text, toE164, whole } from '@/lib/bond-api'
import { BUDGET_OPTIONS, ENQUIRY_TYPES, TIME_OPTIONS } from '@/lib/groups'

export type EnquiryResult = { ok: true; data: { reference: string } } | { ok: false; reason: 'not-connected' | 'error'; message: string }

const GROUP_TYPE_KEYS = ['corporate_team', 'school_or_college', 'friends_or_family', 'club_or_community', 'private_group', 'travel_or_tourism_partner', 'other'] as const
const BUDGET_KEYS = ['prefer_to_discuss', 'under_1000', '1000_to_2500', 'above_2500'] as const
const TIME_KEYS = ['morning', 'afternoon', 'evening', 'flexible'] as const

/** POST /enquiries/group on the Bond backend ("Corporate Team" is stored as a corporate enquiry there). */
export async function submitGroupEnquiry(payload: Record<string, unknown>): Promise<EnquiryResult> {
  return submitEnquiryTo('/enquiries/group', {
    name: text(payload.name),
    organisation: text(payload.organisation),
    email: text(payload.email),
    phone: toE164(payload.phone),
    groupType: keyFor(payload.type, ENQUIRY_TYPES, GROUP_TYPE_KEYS),
    participants: whole(payload.participants),
    // The select shows "Name (opening soon)"; the team needs the location name.
    preferredLocation: text(String(payload.location ?? '').split(' (')[0]),
    preferredActivity: text(payload.activity),
    preferredDate: text(payload.date),
    alternativeDate: text(payload.altDate),
    preferredTime: keyFor(payload.time, TIME_OPTIONS, TIME_KEYS),
    budgetBand: keyFor(payload.budget, BUDGET_OPTIONS, BUDGET_KEYS),
    message: text(payload.requirements),
    consent: checked(payload.consent),
    newsletterOptIn: checked(payload.marketing),
  })
}
