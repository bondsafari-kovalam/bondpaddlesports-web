/**
 * Activity catalogue for /activities and every activity-to-location link: types and helpers. The data comes from the
 * Bond backend's public API (synced at build time into lib/generated/catalogue.json).
 *
 * Only brief-supported facts are recorded. Durations, skill levels, ages, group sizes, inclusions,
 * safety rules and prices are left undefined until Bond supplies approved values; the UI then
 * hides the field or shows a marked placeholder.
 */

import { locations, type Location, type LocationImage, type WaterType } from '@/lib/locations'
import { BOOKING_ENGINE_CONNECTED } from '@/lib/booking-config'
import catalogue from '@/lib/generated/catalogue.json'
import type { Film } from '@/lib/media'

export type ActivityCategory = 'Paddling' | 'Guided experience' | 'Private session' | 'White-water'
export type ActivityStatus = 'available' | 'opening-soon' | 'coming-soon' | 'no-sessions'
export type NextStep = 'academy' | 'membership' | 'season-pass' | 'longer-experience'

export const ACTIVITY_STATUS_LABELS: Record<ActivityStatus, string> = {
  available: 'Available to book',
  'opening-soon': 'Opening soon',
  'coming-soon': 'Coming soon',
  'no-sessions': 'No sessions currently listed',
}

export type Offering = {
  locationSlug: string
  /**
   * confirmed: verified by Bond. demo: preview pairing used until Bond confirms the line-up.
   * planned: tied to a roadmap location that is not open yet.
   */
  source: 'confirmed' | 'demo' | 'planned'
  pricePerParticipant?: number
  duration?: string
  meetingPoint?: string
  /** Live location (lib/catalogue-live.ts); otherwise looked up in the snapshot by slug. */
  location?: Location
  /** Earliest upcoming session with free places here (live data only). */
  nextSession?: NextSessionInfo
}

export type NextSessionInfo = { date: string; time: string; seatsRemaining: number }

export type Faq = { question: string; answer?: string }

export type Activity = {
  slug: string
  name: string
  category: ActivityCategory
  /** Free-form tags let admins add experiences such as sunset SUP yoga without a new layout. */
  tags: string[]
  summary: string
  description?: string
  image?: LocationImage
  video?: { src: string; captions: string }
  /** Muted, decorative loop shown in place of the image where motion adds atmosphere. */
  /** `focus` is the CSS object-position that keeps the subject in frame when the loop is cropped tall. */
  ambientVideo?: Film
  offerings: Offering[]
  durationMinutes?: number
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels'
  minimumAge?: string
  groupSize?: string
  /** The activity's own water types (admin); location water types are preferred when the activity is offered. */
  waterTypes?: WaterType[]
  sessionFormat?: string
  swimmingRequirement?: string
  healthRequirement?: string
  experienceHighlights?: string[]
  learningOutcomes?: string[]
  inclusions?: string[]
  exclusions?: string[]
  whatToBring?: string[]
  safety?: { equipment?: string; supervision?: string; weather?: string }
  /** General safety information from the admin panel. */
  safetyInformation?: string
  cancellationPolicy?: string
  related: string[]
  nextSteps: NextStep[]
  faqs: Faq[]
  featured?: boolean
  seo?: { title?: string; description?: string }
  /** True when the offerings' `nextSession` values come from live backend sessions (lib/catalogue-live.ts). */
  sessionsKnown?: boolean
}

type SyncedActivity = Omit<Activity, 'image' | 'video' | 'ambientVideo'> & { remoteImage?: LocationImage }

/**
 * Activities from the Bond backend (public API → scripts/sync-catalogue.mjs → lib/generated/catalogue.json), photos
 * included: only the image uploaded in the admin panel is used. Offerings come from the backend too:
 * `confirmed` = available at that location, `planned` = coming soon. The /activities pages read the same data live
 * (lib/catalogue-live.ts).
 */
export const activities: Activity[] = (catalogue.activities as unknown as SyncedActivity[]).map(({ remoteImage, ...activity }) => ({
  ...activity,
  image: remoteImage,
}))

export const ACTIVITY_CATEGORIES: ActivityCategory[] = ['Paddling', 'Guided experience', 'Private session', 'White-water']
export const ACTIVITY_STATUSES: ActivityStatus[] = ['available', 'opening-soon', 'coming-soon', 'no-sessions']

export function getActivity(slug: string) {
  return activities.find((activity) => activity.slug === slug)
}

export function activityHref(activity: Activity) {
  return `/activities/${activity.slug}`
}

export type ResolvedOffering = Offering & { location: Location }

export function offeringsFor(activity: Activity): ResolvedOffering[] {
  return activity.offerings.flatMap((offering) => {
    const location = offering.location ?? locations.find((item) => item.slug === offering.locationSlug)
    return location ? [{ ...offering, location }] : []
  })
}

/** Per-person price for an offering. Demo pairings borrow the location's homepage price so previews can show totals. */
export function offeringPrice(offering: Offering) {
  if (offering.pricePerParticipant) return offering.pricePerParticipant
  return offering.source === 'demo' ? locations.find((item) => item.slug === offering.locationSlug)?.startingPrice : undefined
}

export type LocationOffer = { activity: Activity; offering: Offering; price?: number; duration?: string }

/** What a location offers (confirmed or demo). Location pages and the booking flow both read this, so they can't disagree. */
export function offersAt(locationSlug: string): LocationOffer[] {
  return activities.flatMap((activity) => {
    const offering = activity.offerings.find((item) => item.locationSlug === locationSlug && item.source !== 'planned')
    if (!offering) return []
    const duration = offering.duration ?? (activity.durationMinutes ? `${activity.durationMinutes} min` : undefined)
    return [{ activity, offering, price: offeringPrice(offering), duration }]
  })
}

/** Activities a location offers, used by the booking adapter. */
export function activitiesAt(locationSlug: string) {
  return offersAt(locationSlug).map((offer) => offer.activity)
}

/**
 * "Available to book" requires a confirmed offering at an operating location AND a connected
 * booking engine. Demo pairings never make an activity bookable.
 */
export function activityStatus(activity: Activity): ActivityStatus {
  const resolved = offeringsFor(activity)
  // Live sessions known: "available" only when an operating location has an upcoming session with free places.
  if (activity.sessionsKnown) {
    if (resolved.some((o) => o.nextSession && o.source === 'confirmed' && o.location.status === 'operating')) return 'available'
  } else if (BOOKING_ENGINE_CONNECTED && resolved.some((o) => o.source === 'confirmed' && o.location.status === 'operating')) return 'available'
  if (resolved.some((o) => o.location.status === 'operating')) return 'no-sessions'
  if (resolved.some((o) => o.location.status === 'opening-soon')) return 'opening-soon'
  if (resolved.some((o) => o.location.status === 'coming-soon')) return 'coming-soon'
  return 'no-sessions'
}

export function waterTypesFor(activity: Activity): WaterType[] {
  const fromLocations = [...new Set(offeringsFor(activity).flatMap((offering) => offering.location.waterTypes))]
  return fromLocations.length ? fromLocations : (activity.waterTypes ?? [])
}

export function startingPriceFor(activity: Activity) {
  const prices = activity.offerings.filter((offering) => offering.source === 'confirmed' && offering.pricePerParticipant).map((offering) => offering.pricePerParticipant!)
  return prices.length ? Math.min(...prices) : undefined
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return [hours && `${hours} hr`, rest && `${rest} min`].filter(Boolean).join(' ')
}
