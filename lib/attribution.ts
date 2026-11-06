/**
 * Marketing and partner attribution: where a visitor came from, kept until they book.
 *
 * Captured on any page by components/site/attribution-capture.tsx and attached to the booking
 * payload in lib/group-booking-service.ts. localStorage is used because every internal link is a
 * full page load, other tabs share it, and a same-origin payment redirect leaves it intact.
 * It holds campaign names and partner codes only, never anything about the guest.
 *
 * Attribution rules, confirmed by Bond on 6 November 2026 (change them in ATTRIBUTION_RULES):
 * - UTM: first-touch, 30 days. The campaign that first brought the visitor keeps the credit.
 * - Partner: last-touch, 30 days. A newer valid partner link replaces an older one and renews the window.
 * - A visit with no partner code, or a malformed one, never clears a stored partner.
 * - UTM and partner expire separately, each from its own capture time.
 *
 * Commission is not calculated here. Rates, the base amount, refunds and payouts belong to the
 * backend and are undecided; the "Bond Paddle Sports Backend Requirements" doc tracks them.
 * The rule that matters at this end: commission is earned only on confirmed, paid bookings.
 *
 * Everything here arrives from a URL, so it is untrusted. The backend must check `partner_code`
 * against the partner register before paying commission on it.
 */

export type AttributionModel = 'first-touch' | 'last-touch'

export const ATTRIBUTION_RULES: Record<'utm' | 'partner', { model: AttributionModel; windowDays: number }> = {
  utm: { model: 'first-touch', windowDays: 30 },
  partner: { model: 'last-touch', windowDays: 30 },
}

const STORAGE_KEY = 'bond-attribution-v1'
const DAY_MS = 24 * 60 * 60 * 1000

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
export type UtmKey = (typeof UTM_KEYS)[number]

/** The shape sent with a booking; keys match the URL parameters so reports read the same as links. */
export type BookingAttribution = Record<UtmKey, string | null> & {
  partner_code: string | null
  utm_captured_at: string | null
  partner_captured_at: string | null
}

export const EMPTY_ATTRIBUTION: BookingAttribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
  partner_code: null,
  utm_captured_at: null,
  partner_captured_at: null,
}

// Lower-cased so "Instagram" and "instagram" don't split into two rows in a report.
const LOWERCASED: UtmKey[] = ['utm_source', 'utm_medium', 'utm_campaign']

function cleanUtm(key: UtmKey, value: unknown) {
  if (typeof value !== 'string') return null
  const text = value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 100)
  return (LOWERCASED.includes(key) ? text.toLowerCase() : text) || null
}

export function cleanPartnerCode(value: unknown) {
  if (typeof value !== 'string') return null
  const code = value.trim().toUpperCase()
  return /^[A-Z0-9_-]{3,32}$/.test(code) ? code : null
}

const isLive = (capturedAt: unknown, windowDays: number, now: Date): capturedAt is string => {
  if (typeof capturedAt !== 'string') return false
  const age = now.getTime() - new Date(capturedAt).getTime()
  return age >= 0 && age < windowDays * DAY_MS
}

/** Rebuilds a stored value field by field, so a corrupt or edited entry can't reach a booking. */
export function restoreAttribution(stored: unknown, now: Date): BookingAttribution {
  const raw = (stored && typeof stored === 'object' ? stored : {}) as Partial<Record<keyof BookingAttribution, unknown>>
  const next = { ...EMPTY_ATTRIBUTION }
  if (isLive(raw.utm_captured_at, ATTRIBUTION_RULES.utm.windowDays, now)) {
    for (const key of UTM_KEYS) next[key] = cleanUtm(key, raw[key])
    if (UTM_KEYS.some((key) => next[key])) next.utm_captured_at = raw.utm_captured_at
  }
  const partner = cleanPartnerCode(raw.partner_code)
  if (partner && isLive(raw.partner_captured_at, ATTRIBUTION_RULES.partner.windowDays, now)) {
    next.partner_code = partner
    next.partner_captured_at = raw.partner_captured_at
  }
  return next
}

/** Applies a landing URL's query string to what is already held. */
export function mergeAttribution(current: BookingAttribution, search: string, now: Date): BookingAttribution {
  const params = new URLSearchParams(search)
  const next = { ...current }
  const incoming = UTM_KEYS.map((key) => [key, cleanUtm(key, params.get(key))] as const)
  if (incoming.some(([, value]) => value) && (ATTRIBUTION_RULES.utm.model === 'last-touch' || !next.utm_captured_at)) {
    for (const [key, value] of incoming) next[key] = value
    next.utm_captured_at = now.toISOString()
  }
  const partner = cleanPartnerCode(params.get('partner_code'))
  if (partner && (ATTRIBUTION_RULES.partner.model === 'last-touch' || !next.partner_code)) {
    next.partner_code = partner
    next.partner_captured_at = now.toISOString()
  }
  return next
}

export function readAttribution(now = new Date()): BookingAttribution {
  try {
    return restoreAttribution(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null'), now)
  } catch {
    return { ...EMPTY_ATTRIBUTION }
  }
}

/** Records any tracking parameters in `search` and returns what is now held. Safe to call repeatedly. */
export function captureAttribution(search: string, now = new Date()): BookingAttribution {
  const current = readAttribution(now)
  const next = mergeAttribution(current, search, now)
  if (next.utm_captured_at !== current.utm_captured_at || next.partner_captured_at !== current.partner_captured_at) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable: attribution lasts for this page view only */
    }
  }
  return next
}

/** One line for a WhatsApp booking, so the team can credit the source by hand; empty when there is nothing to credit. */
export function attributionNote(attribution: BookingAttribution) {
  const { partner_code: partner, utm_source: source, utm_campaign: campaign } = attribution
  return [partner && `Partner: ${partner}`, source && `Source: ${source}`, campaign && `Campaign: ${campaign}`].filter(Boolean).join(' · ')
}
