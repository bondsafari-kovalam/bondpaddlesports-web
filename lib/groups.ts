/**
 * Groups & Corporate: enquiry options and group-specific copy. Locations and activities come from
 * lib/locations.ts and lib/activities.ts so nothing is duplicated.
 *
 * Group sizes, lead times, group pricing, age limits, swimming requirements and weather rules have
 * not been supplied; the page says the team confirms them during the enquiry.
 */

import { activities, activitiesAt } from '@/lib/activities'
import { locations } from '@/lib/locations'

export const ENQUIRY_TYPES = [
  'Corporate Team',
  'School or College',
  'Friends or Family',
  'Club or Community',
  'Private Group',
  'Travel or Tourism Partner',
  'Other',
] as const
export type EnquiryType = (typeof ENQUIRY_TYPES)[number]

export const OPEN_TO_RECOMMENDATIONS = 'Open to recommendations'

/** The three core paddling activities groups can ask about. White-water is not offered here. */
export const GROUP_ACTIVITIES = activities.filter((activity) => ['kayaking', 'canoeing', 'stand-up-paddleboarding'].includes(activity.slug))

/** Locations with a public page, in their configured status order. */
export const GROUP_LOCATIONS = locations.filter((location) => location.hasDetailPage)

/**
 * Activity choices for a location: the location's configured activities when known, otherwise all
 * three core activities (the team confirms what runs where).
 */
export function activityOptionsFor(locationSlug?: string) {
  const known = locationSlug ? activitiesAt(locationSlug).filter((a) => GROUP_ACTIVITIES.includes(a)) : []
  return (known.length ? known : GROUP_ACTIVITIES).map((a) => a.name)
}

export const TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Flexible']
export const BUDGET_OPTIONS = ['Prefer to discuss', 'Under ₹1,000 per person', '₹1,000–₹2,500 per person', 'Above ₹2,500 per person']
