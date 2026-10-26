/**
 * Group enquiry submission boundary.
 *
 * Integration still required (not connected):
 * 1. A server route (e.g. app/api/enquiries/group/route.ts) that validates the payload again,
 *    rejects honeypot/bot submissions and verifies a CAPTCHA token (e.g. Turnstile/reCAPTCHA).
 * 2. Forwarding to the shared Bond backend `POST /enquiries` (see bond-safari-website
 *    docs/booking-api.md), which returns `{ reference }`.
 * 3. Notifications to the groups team (email), CRM record creation, and optional WhatsApp alerts.
 *
 * An enquiry is never a booking: pricing, availability and safety requirements are confirmed by
 * the team before any booking or payment.
 */

export type EnquiryResult = { ok: true; data: { reference: string } } | { ok: false; reason: 'not-connected' | 'error'; message: string }

export async function submitGroupEnquiry(_payload: Record<string, unknown>): Promise<EnquiryResult> {
  return { ok: false, reason: 'not-connected', message: 'Group enquiries are not connected yet.' }
}
