/**
 * Activity catalogue: single source of truth for /activities and every activity-to-location link.
 *
 * Only brief-supported facts are recorded. Durations, skill levels, ages, group sizes, inclusions,
 * safety rules and prices are left undefined until Bond supplies approved values; the UI then
 * hides the field or shows a marked placeholder.
 */

import { locations, type Location, type LocationImage, type WaterType } from '@/lib/locations'
import { BOOKING_ENGINE_CONNECTED } from '@/lib/booking-config'

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
}

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
  ambientVideo?: { src: string; poster: string; focus?: string }
  offerings: Offering[]
  durationMinutes?: number
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels'
  minimumAge?: string
  groupSize?: string
  sessionFormat?: string
  swimmingRequirement?: string
  healthRequirement?: string
  experienceHighlights?: string[]
  learningOutcomes?: string[]
  inclusions?: string[]
  whatToBring?: string[]
  safety?: { equipment?: string; supervision?: string; weather?: string }
  related: string[]
  nextSteps: NextStep[]
  faqs: Faq[]
  featured?: boolean
  seo?: { title?: string; description?: string }
}

const defaultFaqs = (name: string): Faq[] => [
  { question: `Is ${name.toLowerCase()} suitable for beginners?` },
  { question: 'What should I bring?' },
  { question: 'What is included?' },
  { question: 'What are the participation requirements?' },
  { question: 'What happens if the weather is unsuitable?' },
  { question: 'How do I change or cancel a booking?' },
]

// Preview pairing mirroring the homepage booking widget; replace with confirmed offerings from Bond.
const muzirisDemo: Offering[] = [
  { locationSlug: 'muziris-kottapuram', source: 'demo' },
  { locationSlug: 'muziris-north-paravur', source: 'demo', meetingPoint: 'Thattukadavu Jetty' },
]

export const activities: Activity[] = [
  {
    slug: 'kayaking',
    name: 'Kayaking',
    category: 'Paddling',
    tags: ['paddling', 'kayak'],
    summary: 'Glide through quiet waters, hidden channels and living landscapes.',
    image: {
      src: 'https://images.unsplash.com/photo-1646440912030-d58d2394b1cd?auto=format&fit=crop&w=1400&q=85',
      alt: 'Kayaker paddling through a calm tropical mangrove channel',
      illustrative: true,
    },
    ambientVideo: { src: '/video/kayaking-loop.mp4', poster: '/video/kayaking-poster.jpg', focus: '72% 50%' },
    offerings: muzirisDemo,
    related: ['canoeing', 'guided-trails'],
    nextSteps: ['academy', 'longer-experience', 'membership'],
    faqs: defaultFaqs('Kayaking'),
    featured: true,
  },
  {
    slug: 'canoeing',
    name: 'Canoeing',
    category: 'Paddling',
    tags: ['paddling', 'canoe', 'shared'],
    summary: 'Find your rhythm on the water with a craft built for shared adventure.',
    image: {
      src: 'https://images.unsplash.com/photo-1635749687861-4341928cbf97?auto=format&fit=crop&w=1400&q=85',
      alt: 'Paddler in a canoe on quiet, calm water',
      illustrative: true,
    },
    ambientVideo: { src: '/video/canoeing-loop.mp4', poster: '/video/canoeing-poster.jpg' },
    offerings: muzirisDemo,
    related: ['kayaking', 'private-sessions'],
    nextSteps: ['academy', 'membership'],
    faqs: defaultFaqs('Canoeing'),
    featured: true,
  },
  {
    slug: 'stand-up-paddleboarding',
    name: 'Stand-up paddleboarding',
    category: 'Paddling',
    tags: ['paddling', 'sup'],
    summary: 'A fresh perspective, a full-body workout and a slower way to explore.',
    image: {
      src: 'https://images.unsplash.com/photo-1557151498-af2467d6f7f4?auto=format&fit=crop&w=1400&q=85',
      alt: 'Stand-up paddleboarders on the sea at dusk',
      illustrative: true,
    },
    ambientVideo: { src: '/video/sup-loop.mp4', poster: '/video/sup-poster.jpg', focus: '62% 50%' },
    offerings: muzirisDemo,
    related: ['sunrise-paddles', 'sunset-paddles'],
    nextSteps: ['academy', 'season-pass'],
    faqs: defaultFaqs('Stand-up paddleboarding'),
    featured: true,
  },
  {
    slug: 'guided-trails',
    name: 'Guided trails',
    category: 'Guided experience',
    tags: ['guided', 'trail'],
    summary: 'Paddle a set route on the water with a Bond guide.',
    image: {
      src: 'https://images.unsplash.com/photo-1533690117405-12bd19ce56e3?auto=format&fit=crop&w=1400&q=85',
      alt: 'Illustrative kayak trail through a mangrove waterway',
      illustrative: true,
    },
    offerings: [],
    related: ['kayaking', 'canoeing'],
    nextSteps: ['longer-experience', 'membership'],
    faqs: defaultFaqs('Guided trails'),
  },
  {
    slug: 'sunrise-paddles',
    name: 'Sunrise paddles',
    category: 'Guided experience',
    tags: ['guided', 'sunrise', 'timed'],
    summary: 'A paddle timed for the first light of the day.',
    image: {
      src: 'https://images.unsplash.com/photo-1647036003499-94eebb3388c7?auto=format&fit=crop&w=1400&q=85',
      alt: 'Illustrative canoe paddle on a lake at sunrise',
      illustrative: true,
    },
    offerings: [],
    related: ['sunset-paddles', 'stand-up-paddleboarding'],
    nextSteps: ['season-pass', 'membership'],
    faqs: defaultFaqs('Sunrise paddles'),
  },
  {
    slug: 'sunset-paddles',
    name: 'Sunset paddles',
    category: 'Guided experience',
    tags: ['guided', 'sunset', 'timed'],
    summary: 'A paddle timed for the evening light.',
    image: {
      src: 'https://images.unsplash.com/photo-1436162716854-dcb9157bfac1?auto=format&fit=crop&w=1400&q=85',
      alt: 'Illustrative kayaker on the water at sunset',
      illustrative: true,
    },
    offerings: [],
    related: ['sunrise-paddles', 'stand-up-paddleboarding'],
    nextSteps: ['season-pass', 'membership'],
    faqs: defaultFaqs('Sunset paddles'),
  },
  {
    slug: 'private-sessions',
    name: 'Private paddling sessions',
    category: 'Private session',
    tags: ['private', 'groups'],
    summary: 'A paddling session reserved for just your group.',
    image: {
      src: 'https://images.unsplash.com/photo-1723215629906-bc05bd6f36a1?auto=format&fit=crop&w=1400&q=85',
      alt: 'Illustrative group gathered on kayaks in the water',
      illustrative: true,
    },
    offerings: [],
    related: ['canoeing', 'guided-trails'],
    nextSteps: ['membership'],
    faqs: defaultFaqs('Private paddling sessions'),
  },
  {
    slug: 'white-water',
    name: 'White-water experiences',
    category: 'White-water',
    tags: ['white-water', 'river'],
    summary: 'Moving-water paddling, planned for the Kodenchery white-water destination.',
    image: {
      src: 'https://images.unsplash.com/photo-1767471716671-60052b672451?auto=format&fit=crop&w=1400&q=85',
      alt: 'Illustrative kayaker navigating white-water rapids',
      illustrative: true,
    },
    offerings: [{ locationSlug: 'kodenchery-white-water', source: 'planned' }],
    related: ['kayaking'],
    nextSteps: ['academy'],
    faqs: defaultFaqs('White-water experiences'),
  },
]

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
    const location = locations.find((item) => item.slug === offering.locationSlug)
    return location ? [{ ...offering, location }] : []
  })
}

/** Names of activities a location offers (confirmed or demo), used by the booking adapter. */
export function activitiesAt(locationSlug: string) {
  return activities.filter((activity) => activity.offerings.some((offering) => offering.locationSlug === locationSlug && offering.source !== 'planned'))
}

/**
 * "Available to book" requires a confirmed offering at an operating location AND a connected
 * booking engine. Demo pairings never make an activity bookable.
 */
export function activityStatus(activity: Activity): ActivityStatus {
  const resolved = offeringsFor(activity)
  if (BOOKING_ENGINE_CONNECTED && resolved.some((o) => o.source === 'confirmed' && o.location.status === 'operating')) return 'available'
  if (resolved.some((o) => o.location.status === 'operating')) return 'no-sessions'
  if (resolved.some((o) => o.location.status === 'opening-soon')) return 'opening-soon'
  if (resolved.some((o) => o.location.status === 'coming-soon')) return 'coming-soon'
  return 'no-sessions'
}

export function waterTypesFor(activity: Activity): WaterType[] {
  return [...new Set(offeringsFor(activity).flatMap((offering) => offering.location.waterTypes))]
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
