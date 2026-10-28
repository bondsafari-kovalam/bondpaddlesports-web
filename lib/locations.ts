/**
 * Single source of truth for Bond Safari Paddle Sports locations.
 *
 * Only facts from the approved brief are recorded here. Anything not yet supplied by the client
 * (activities per location, policies, coordinates, media, reviews) is left undefined so the UI
 * can show a marked placeholder instead of an invented value.
 */

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

const kovalamCrossSell: RelatedExperience[] = [
  { name: 'Discover Scuba Diving', description: 'A Bond Safari Kovalam experience.', approved: false },
  { name: 'Parasailing', description: 'A Bond Safari Kovalam experience.', approved: false },
]

const roadmap = (name: string, region: Region, phase: Location['phase'], waterTypes: WaterType[] = []): Location => ({
  slug: name.toLowerCase().replace(/[–\s]+/g, '-'),
  name,
  status: 'coming-soon',
  region,
  context: region,
  waterTypes,
  phase,
  activities: [],
  hasDetailPage: false,
  visitorInfo: {},
})

export const locations: Location[] = [
  {
    slug: 'muziris-kottapuram',
    name: 'Muziris–Kottapuram',
    status: 'operating',
    region: 'Central Kerala',
    context: 'Kottapuram, Kerala',
    waterTypes: ['Backwater'],
    summary: 'Backwater paddling from Kottapuram, operating since 4 October 2026.',
    operatingSince: '2026-10-04',
    activities: [],
    startingPrice: 1200,
    image: {
      src: 'https://images.unsplash.com/photo-1706724728271-a81750af4b8f?auto=format&fit=crop&w=1600&q=85',
      alt: 'Illustrative image of a kayaker paddling through Kerala mangrove backwaters',
      illustrative: true,
    },
    hasDetailPage: true,
    map: {
      placeName: 'Muziris Heritage Watertrails by Bond Safari',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.493055370176!2d76.2033723747964!3d10.197928089917845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081b610f2b8caf%3A0x57ee3f356bafc031!2sMuziris%20Heritage%20Watertrails%20by%20Bond%20Safari!5e1!3m2!1sen!2sin!4v1793176113819!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?cid=6336071224429363249',
    },
    visitorInfo: {},
  },
  {
    slug: 'muziris-north-paravur',
    name: 'Muziris–North Paravur',
    status: 'operating',
    region: 'Central Kerala',
    context: 'Thattukadavu Jetty, North Paravur',
    waterTypes: ['Backwater'],
    summary: 'Backwater paddling from Thattukadavu Jetty, operating since 17 October 2026.',
    operatingSince: '2026-10-17',
    meetingPoint: 'Thattukadavu Jetty',
    activities: [],
    startingPrice: 1200,
    image: {
      src: 'https://images.unsplash.com/photo-1554200429-bd32416aca62?auto=format&fit=crop&w=1600&q=85',
      alt: 'Illustrative image of two people paddling a tandem kayak near Paravoor, Kerala',
      illustrative: true,
    },
    hasDetailPage: true,
    map: {
      placeName: 'Muziris Heritage Watertrails by Bond Safari',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.011718315951!2d76.21926737479576!3d10.153573889959837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081bb22829ac7b%3A0x2850301a795ee52b!2sMuziris%20Heritage%20Watertrails%20by%20Bond%20Safari!5e1!3m2!1sen!2sin!4v1793175681529!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?cid=2904874649917515051',
    },
    visitorInfo: { meetingPointAddress: 'North Paravur, Thattukadavu Boat Jetty, Ernakulam, Keralam 683513' },
  },
  {
    slug: 'kovalam',
    name: 'Kovalam',
    status: 'operating',
    region: 'South Kerala',
    context: 'Kovalam coast, Kerala',
    waterTypes: ['Sea'],
    summary: 'Sea and coastal paddling on the Kovalam coast. Kayaking and canoeing are running now.',
    // Opening date and session prices not supplied yet; add operatingSince and startingPrice when confirmed.
    activities: [{ id: 'kayaking' }, { id: 'canoeing' }],
    image: {
      src: 'https://images.unsplash.com/photo-1722340081727-baae59878e6c?auto=format&fit=crop&w=1600&q=85',
      alt: 'Illustrative image of a sea kayaker paddling on open ocean',
      illustrative: true,
    },
    hasDetailPage: true,
    visitorInfo: {},
    relatedExperiences: kovalamCrossSell,
  },
  {
    slug: 'poovar',
    name: 'Poovar',
    status: 'opening-soon',
    region: 'South Kerala',
    context: 'Poovar, Kerala',
    waterTypes: [],
    summary: 'Planned to open in January 2027, subject to confirmation.',
    plannedOpening: 'January 2027, subject to confirmation',
    activities: [],
    image: {
      src: 'https://images.unsplash.com/photo-1516428516769-3056248b7f97?auto=format&fit=crop&w=1600&q=85',
      alt: 'Illustrative image of a kayak bow on calm open water',
      illustrative: true,
    },
    hasDetailPage: true,
    visitorInfo: {},
    relatedExperiences: kovalamCrossSell,
  },
  roadmap('Kochi–Kumbalangi', 'Central Kerala', 'Phase 2 · FY28'),
  roadmap('Kumarakom', 'Central Kerala', 'Phase 2 · FY28'),
  roadmap('Alappuzha', 'Central Kerala', 'Phase 2 · FY28'),
  roadmap('Cherai', 'Central Kerala', 'Phase 2 · FY28'),
  roadmap('Varkala–Kappil', 'South Kerala', 'Phase 2 · FY28'),
  roadmap('Kollam–Munroe', 'South Kerala', 'Phase 2 · FY28'),
  roadmap('Kozhikode–Kadalundi', 'North Kerala', 'Phase 3 · FY29'),
  roadmap('Kodenchery white-water', 'North Kerala', 'Phase 3 · FY29'),
  roadmap('Pookode Lake', 'North Kerala', 'Phase 3 · FY29', ['Lake']),
  roadmap('Valiyaparamba', 'North Kerala', 'Phase 4 · FY30–31'),
  roadmap('Parassinikkadavu', 'North Kerala', 'Phase 4 · FY30–31'),
  roadmap('Irringal', 'North Kerala', 'Phase 4 · FY30–31'),
  roadmap('Bekal', 'North Kerala', 'Phase 4 · FY30–31'),
  roadmap('Vellayani', 'South Kerala', 'Phase 4 · FY30–31'),
]

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
