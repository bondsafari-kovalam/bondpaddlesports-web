/**
 * Bond Safari Paddle Sports locations: types and helpers. The data comes from the Bond backend's public API
 * (synced at build time into lib/generated/catalogue.json); photos stay in /public (lib/catalogue-media.ts).
 *
 * Only approved facts are recorded. Anything not yet supplied by the client
 * (activities per location, policies, coordinates, media, reviews) is left undefined so the UI
 * can show a marked placeholder instead of an invented value.
 */

import { LOCATION_MEDIA } from '@/lib/catalogue-media'
import catalogue from '@/lib/generated/catalogue.json'

export type LocationStatus = 'operating' | 'opening-soon' | 'coming-soon'
export type WaterType = 'Sea' | 'Backwater' | 'Lake' | 'River'
export type Region = 'North Kerala' | 'Central Kerala' | 'South Kerala'
export type ActivityId = 'kayaking' | 'canoeing' | 'sup' | 'guided-trails' | 'sunrise-sunset' | 'white-water'

export const STATUS_LABELS: Record<LocationStatus, string> = {
  operating: 'Operating now',
  'opening-soon': 'Opening soon',
  'coming-soon': 'Coming soon',
}

export const ACTIVITY_LABELS: Record<ActivityId, string> = {
  kayaking: 'Kayaking',
  canoeing: 'Canoeing',
  sup: 'Stand-up paddleboarding (SUP)',
  'guided-trails': 'Guided trails',
  'sunrise-sunset': 'Sunrise & sunset paddles',
  'white-water': 'White-water',
}

export const WATER_TYPES: WaterType[] = ['Sea', 'Backwater', 'Lake', 'River']
export const REGIONS: Region[] = ['North Kerala', 'Central Kerala', 'South Kerala']
export const STATUSES: LocationStatus[] = ['operating', 'opening-soon', 'coming-soon']

export type LocationImage = {
  src: string
  alt: string
  /** True when the photo is a stand-in, not approved photography of this Bond location. */
  illustrative?: boolean
}

export type LocationActivity = {
  id: ActivityId
  description?: string
  duration?: string
  skillLevel?: string
  startingPrice?: number
  image?: LocationImage
}

export type RelatedExperience = {
  name: string
  description: string
  /** Only approved experiences connected to live availability are shown to guests. */
  approved: boolean
}

export type VisitorInfo = {
  ageRequirement?: string
  swimmingRequirement?: string
  fitnessRequirement?: string
  healthRequirements?: string
  whatToBring?: string
  included?: string
  meetingPointAddress?: string
  directions?: string
  facilities?: string
  contact?: string
  guides?: string
  equipment?: string
  safetyRequirements?: string
  weatherClosures?: string
  seasonal?: string
  cancellationPolicy?: string
  weatherCancellation?: string
  rescheduling?: string
}

export type Location = {
  slug: string
  name: string
  status: LocationStatus
  region: Region
  /** Short geographical description shown under the name. */
  context: string
  waterTypes: WaterType[]
  summary?: string
  /** Full location description from the admin panel (plain text, paragraphs separated by blank lines). */
  description?: string
  /** ISO date, operating locations only. */
  operatingSince?: string
  plannedOpening?: string
  phase?: 'Phase 2 · FY28' | 'Phase 3 · FY29' | 'Phase 4 · FY30–31'
  meetingPoint?: string
  activities: LocationActivity[]
  startingPrice?: number
  image?: LocationImage
  /** Approved location media only; guest photos need recorded written permission. */
  gallery?: LocationImage[]
  /** Only operating and confirmed-upcoming locations get a full detail page. */
  hasDetailPage: boolean
  /** Precise coordinates must come from the client; never estimate them. */
  coordinates?: { lat: number; lng: number }
  /** Google Maps "Share → Embed a map" URL for the meeting point, as supplied by Bond (no API key needed). */
  map?: { embedUrl: string; directionsUrl: string; placeName: string }
  visitorInfo: VisitorInfo
  relatedExperiences?: RelatedExperience[]
}

type SyncedLocation = Omit<Location, 'image' | 'gallery'> & { remoteImage?: LocationImage }

/**
 * Locations from the Bond backend (public API → scripts/sync-catalogue.mjs → lib/generated/catalogue.json), with the
 * website's own photos matched by slug (lib/catalogue-media.ts). Edit content in the admin panel, then rebuild.
 */
export const locations: Location[] = (catalogue.locations as unknown as SyncedLocation[]).map(({ remoteImage, ...location }) => {
  const media = LOCATION_MEDIA[location.slug] ?? {}
  return { ...location, image: media.image ?? remoteImage, gallery: media.gallery }
})

export const PHASES = ['Phase 2 · FY28', 'Phase 3 · FY29', 'Phase 4 · FY30–31'] as const
export const HUBS = ['Kovalam', 'Kochi', 'Kozhikode', 'Payyanur']
export const DESTINATION_TARGET = { count: 18, by: 'FY31' }

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug && location.hasDetailPage)
}

export function locationHref(location: Location) {
  return `/locations/${location.slug}`
}

export function formatPrice(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
