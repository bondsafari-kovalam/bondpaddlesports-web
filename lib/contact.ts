/**
 * Contact page data and submission boundary.
 *
 * Integration still required (not connected):
 * - A server route (e.g. app/api/contact/route.ts) that re-validates input, rejects honeypot/bot
 *   traffic, verifies a CAPTCHA token and applies rate limiting.
 * - Storage and routing via the shared Bond backend `POST /enquiries` (see bond-safari-website
 *   docs/booking-api.md), which returns `{ reference }`.
 * - Email notification to the right team per enquiry type, CRM record, optional WhatsApp alert.
 * Verified phone/email/WhatsApp details live in `CONTACT` (lib/site.ts).
 */

import { CONTACT } from '@/lib/site'

export const CONTACT_ENQUIRY_TYPES = [
  'General Enquiry',
  'Existing Booking',
  'New Booking',
  'Location Information',
  'Activities',
  'Academy / Courses',
  'Groups & Corporate',
  'Shop / Orders',
  'Membership',
  'Partnership',
  'Other',
] as const
export type ContactEnquiryType = (typeof CONTACT_ENQUIRY_TYPES)[number]

/** Types that ask for a booking reference. */
export const NEEDS_BOOKING_REFERENCE: ContactEnquiryType[] = ['Existing Booking']

export const WHATSAPP_MESSAGE = 'Hello Bond Safari, I have a question about your paddling experiences.'

export function whatsappHref() {
  if (!CONTACT.whatsapp) return undefined
  return `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
}

export function contactChannels() {
  return [
    CONTACT.email && { kind: 'email' as const, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    CONTACT.phone && { kind: 'phone' as const, label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    CONTACT.whatsapp && { kind: 'whatsapp' as const, label: 'WhatsApp', value: CONTACT.whatsapp, href: whatsappHref()! },
  ].filter(Boolean) as { kind: 'email' | 'phone' | 'whatsapp'; label: string; value: string; href: string }[]
}

export type SubmitResult = { ok: true; data: { reference: string } } | { ok: false; reason: 'not-connected' | 'error'; message: string }

export async function submitContactEnquiry(_payload: Record<string, unknown>): Promise<SubmitResult> {
  return { ok: false, reason: 'not-connected', message: 'Contact enquiries are not connected yet.' }
}
