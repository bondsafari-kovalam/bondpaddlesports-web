/**
 * Backend public API → website catalogue shapes (lib/locations.ts, lib/activities.ts). Shared by the build-time sync
 * (scripts/sync-catalogue.mjs) and the live loader (lib/catalogue-live.ts) so both produce the same data.
 *
 * options.signedImages  keep short-lived signed image URLs (X-Amz-…). Only the live loader sets it: its pages are
 *                       regenerated every minute, while a build snapshot would keep expired links.
 */

export const STATUS = { operating: 'operating', opening_soon: 'opening-soon', coming_soon: 'coming-soon' }
export const WATER = { sea: 'Sea', backwater: 'Backwater', lake: 'Lake', river: 'River' }
export const SKILL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', all_levels: 'All levels' }
const prune = (object) => Object.fromEntries(Object.entries(object).filter(([, value]) => value !== null && value !== undefined))
const nonEmpty = (list) => (Array.isArray(list) && list.length ? list : undefined)
const price = (decimal) => (decimal === null || decimal === undefined ? undefined : Number(decimal))


/** Text list ("Changing rooms, Drinking water") or undefined. */
const listText = (...lists) => {
  const items = lists.flatMap((list) => (Array.isArray(list) ? list : [])).map((value) => String(value).trim().replace(/\.$/, '')).filter(Boolean)
  return items.length ? items.join(', ') : undefined
}

/**
 * "Good to know" answers: the location's approved website wording (profile.visitorInfo) first; gaps are filled from
 * the location's own admin fields (meeting instructions, facilities & amenities, safety information, contact).
 */
function visitorInfo(item, profile) {
  const contact = [item.contact?.phone, item.contact?.email].filter(Boolean).join(' · ') || undefined
  return {
    ...prune({
      directions: item.meetingInstructions ?? undefined,
      facilities: listText(item.facilities, item.amenities),
      safetyRequirements: item.safetyInformation ?? undefined,
      contact,
    }),
    ...prune(profile.visitorInfo ?? {}),
  }
}

export function toLocation(item, options = {}) {
  const profile = item.profile ?? {}
  return prune({
    slug: item.slug,
    name: item.name,
    status: STATUS[item.operatingStatus] ?? 'coming-soon',
    region: item.region ?? 'Central Kerala',
    context: profile.context ?? item.region ?? '',
    waterTypes: (item.waterTypes ?? []).map((type) => WATER[type]).filter(Boolean),
    summary: item.shortDescription ?? undefined,
    description: item.description ?? undefined,
    operatingSince: profile.operatingSince,
    plannedOpening: profile.plannedOpening,
    phase: profile.roadmapPhase,
    meetingPoint: item.meetingPoint ?? undefined,
    activities: (profile.listedActivities ?? []).map((id) => ({ id })),
    startingPrice: price(item.startingPrice),
    hasDetailPage: item.hasDetailPage !== false,
    coordinates: item.latitude !== null && item.longitude !== null && item.latitude !== undefined ? { lat: item.latitude, lng: item.longitude } : undefined,
    map: profile.map,
    visitorInfo: visitorInfo(item, profile),
    relatedExperiences: nonEmpty(profile.relatedExperiences),
    // Backend image only when it is a stable URL (CDN); presigned URLs expire and are useless in a snapshot.
    remoteImage: item.featuredImage?.url && (options.signedImages || !/[?&]X-Amz-/.test(item.featuredImage.url)) ? { src: item.featuredImage.url, alt: item.featuredImage.altText ?? item.name } : undefined,
  })
}

/** "1–48 people", "Up to 6 people", "From 2 people" from the activity's participant limits. */
function groupSizeText(min, max) {
  if (min && max) return min === max ? `${min} people` : `${min}–${max} people`
  if (max) return `Up to ${max} people`
  if (min) return `From ${min} people`
  return undefined
}

function ageText(min, max) {
  if (min && max) return `${min}–${max}`
  if (min) return `${min}+`
  if (max) return `Up to ${max}`
  return undefined
}

export function toActivity(item, offerings, options = {}) {
  const profile = item.profile ?? {}
  const requirements = nonEmpty(item.requirements)?.map((value) => String(value).trim().replace(/\.$/, '')).join('. ')
  return prune({
    slug: item.slug,
    name: item.name,
    category: item.category?.name ?? 'Paddling',
    tags: profile.tags ?? [],
    summary: item.shortDescription ?? '',
    description: item.description ?? undefined,
    offerings: offerings.map((offering) =>
      prune({
        locationSlug: offering.location.slug,
        source: offering.availabilityStatus === 'available' ? 'confirmed' : 'planned',
        pricePerParticipant: price(offering.price),
        duration: offering.durationMinutes ? `${offering.durationMinutes} min` : undefined,
      }),
    ),
    durationMinutes: item.durationMinutes ?? undefined,
    skillLevel: SKILL[item.difficultyLevel],
    minimumAge: ageText(item.minimumAge, item.maximumAge),
    groupSize: profile.groupSize ?? groupSizeText(item.minParticipants, item.maxParticipants),
    waterTypes: nonEmpty((item.waterTypes ?? []).map((type) => WATER[type]).filter(Boolean)),
    sessionFormat: profile.sessionFormat,
    swimmingRequirement: profile.swimmingRequirement,
    healthRequirement: profile.healthRequirement ?? (requirements ? `${requirements}.` : undefined),
    experienceHighlights: nonEmpty(item.highlights),
    learningOutcomes: nonEmpty(profile.learningOutcomes),
    inclusions: nonEmpty(item.inclusions),
    exclusions: nonEmpty(item.exclusions),
    whatToBring: nonEmpty(profile.whatToBring),
    safety: profile.safety,
    safetyInformation: item.safetyInformation ?? undefined,
    cancellationPolicy: item.cancellationPolicy ?? undefined,
    related: profile.related ?? [],
    nextSteps: (profile.nextSteps ?? []).map((step) => step.replace(/_/g, '-')),
    faqs: profile.faqs ?? [],
    featured: item.isFeatured || undefined,
    seo: item.metaTitle || item.metaDescription ? prune({ title: item.metaTitle ?? undefined, description: item.metaDescription ?? undefined }) : undefined,
    remoteImage: item.featuredImage?.url && (options.signedImages || !/[?&]X-Amz-/.test(item.featuredImage.url)) ? { src: item.featuredImage.url, alt: item.featuredImage.altText ?? item.name } : undefined,
  })
}

// ---- Academy (GET /academy/categories, /academy/courses, /academy/batches) ------------------------------------------

const LEVEL = {
  personal_award: 'Personal award',
  safety: 'Safety',
  preparation: 'Preparation',
  instructor: 'Instructor',
  leader: 'Leader',
  coach: 'Coach',
  programme: 'Programme',
}
const DISCIPLINE = { sup: 'SUP', canoe: 'Canoe', sea_kayak: 'Sea kayak', white_water: 'White water', multi_discipline: 'Multi-discipline' }
/** The website's status ids; "launching_soon" keeps the website's "Launching 2027" badge. */
const COURSE_STATUS = {
  enrolment_open: 'enrolment-open',
  dates_coming_soon: 'dates-coming-soon',
  launching_soon: 'launching-2027',
  fully_booked: 'fully-booked',
  enquiry: 'enquiry',
}
const hyphen = (value) => value.replace(/_/g, '-')
const amount = (decimal) => (decimal === null || decimal === undefined ? undefined : Number(decimal))

export function toCourseCategory(item) {
  return prune({ id: item.slug, name: item.name, summary: item.summary ?? '' })
}

export function toCourse(item) {
  const details = item.details ?? {}
  return prune({
    slug: item.slug,
    name: item.name,
    category: item.category?.slug,
    level: LEVEL[item.level] ?? 'Programme',
    discipline: item.discipline ? DISCIPLINE[item.discipline] : undefined,
    summary: item.summary,
    description: item.description ?? undefined,
    price: amount(item.price),
    status: COURSE_STATUS[item.status] ?? 'dates-coming-soon',
    professional: !!item.isProfessional,
    featured: item.isFeatured || undefined,
    enquiryHref: item.enquiryHref ?? undefined,
    format: details.format,
    duration: details.duration,
    trainingHours: details.trainingHours,
    campuses: nonEmpty((details.campuses ?? []).map(hyphen)),
    waterEnvironments: nonEmpty((details.waterEnvironments ?? []).map(hyphen)),
    ageRequirement: details.ageRequirement,
    priorAwards: details.priorAwards,
    loggedHours: details.loggedHours,
    entryRequirements: details.entryRequirements,
    assessment: details.assessment,
    outcomeScope: details.outcomeScope,
    equipment: nonEmpty(details.equipment),
    inclusions: nonEmpty(details.inclusions),
    membershipFee: details.membershipFee,
    cancellationPolicy: details.cancellationPolicy,
    transferPolicy: details.transferPolicy,
    depositAmount: amount(item.depositAmount),
    groupEnrolment: item.groupEnrolment || undefined,
    faqs: details.faqs ?? [],
    seo: item.metaTitle || item.metaDescription ? prune({ title: item.metaTitle ?? undefined, description: item.metaDescription ?? undefined }) : undefined,
  })
}

/** A dated run of a course → the website's CourseSession. */
export function toCourseSession(item) {
  return prune({
    id: item.id,
    courseSlug: item.course.slug,
    startDate: item.startDate,
    endDate: item.endDate ?? undefined,
    campus: hyphen(item.campus),
    capacity: item.capacity ?? undefined,
    remaining: item.seatsRemaining ?? undefined,
  })
}
