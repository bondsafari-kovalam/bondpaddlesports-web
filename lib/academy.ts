/**
 * Bond Safari Academy: courses, categories and course dates come from the Bond backend (public API → scripts/
 * sync-catalogue.mjs → lib/generated/catalogue.json); manage them in the admin panel (Academy). Pathway, water
 * environments, campuses and partner wording below are website content.
 *
 * The Paddle UK Qualification Pathway document has not been supplied yet, so qualification scope, entry
 * requirements, prerequisites and water-environment definitions are left undefined; the UI shows them as
 * "pending confirmation" rather than inventing them.
 */

import catalogue from '@/lib/generated/catalogue.json'

/** Category slug from the backend, e.g. 'start-paddling'. */
export type CourseCategoryId = string
export type CourseStatus = 'enrolment-open' | 'dates-coming-soon' | 'launching-2027' | 'fully-booked' | 'enquiry'
export type QualificationLevel = 'Personal award' | 'Safety' | 'Preparation' | 'Instructor' | 'Leader' | 'Coach' | 'Programme'
export type Discipline = 'SUP' | 'Canoe' | 'Sea kayak' | 'White water' | 'Multi-discipline'
export type WaterEnvironmentId = 'very-sheltered' | 'sheltered' | 'moderate' | 'advanced'
export type CampusId = 'kovalam' | 'muziris-kochi' | 'kodenchery'
export type Faq = { question: string; answer?: string }

export const COURSE_STATUS_LABELS: Record<CourseStatus, string> = {
  'enrolment-open': 'Enrolment open',
  'dates-coming-soon': 'Dates coming soon',
  'launching-2027': 'Launching 2027',
  'fully-booked': 'Fully booked',
  enquiry: 'Enquiry required',
}

export type CourseCategory = { id: CourseCategoryId; name: string; summary: string }

export const COURSE_CATEGORIES: CourseCategory[] = (catalogue as { academy?: { categories: CourseCategory[] } }).academy?.categories ?? []

export type Course = {
  slug: string
  name: string
  category: CourseCategoryId
  level: QualificationLevel
  discipline?: Discipline
  summary: string
  description?: string
  /** 2027 source price in rupees from the client brief; tax inclusion still to be confirmed. */
  price?: number
  status: CourseStatus
  professional: boolean
  featured?: boolean
  /** Where this course's page should send people instead of the generic enrolment flow. */
  enquiryHref?: string
  format?: string
  duration?: string
  trainingHours?: string
  campuses?: CampusId[]
  waterEnvironments?: WaterEnvironmentId[]
  ageRequirement?: string
  priorAwards?: string
  loggedHours?: string
  entryRequirements?: string
  assessment?: string
  outcomeScope?: string
  equipment?: string[]
  inclusions?: string[]
  tutorIds?: string[]
  membershipFee?: string
  cancellationPolicy?: string
  transferPolicy?: string
  /** Deposit in rupees. Only courses above ₹25,000 may take one, and only once the amount is configured. */
  depositAmount?: number
  groupEnrolment?: boolean
  faqs: Faq[]
}

export const DEPOSIT_THRESHOLD = 25000
export const BALANCE_DUE_DAYS_BEFORE = 14

type AcademySnapshot = { categories: CourseCategory[]; courses: Course[]; sessions: CourseSession[] }
const academy = (catalogue as { academy?: AcademySnapshot }).academy

/** Published courses, in the admin panel's order. */
export const courses: Course[] = academy?.courses ?? []

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug)
}

export function courseHref(course: Course) {
  return `/academy/courses/${course.slug}`
}

export function categoryName(id: CourseCategoryId) {
  return COURSE_CATEGORIES.find((category) => category.id === id)?.name ?? id
}

export function depositEligible(course: Course) {
  return !!course.price && course.price > DEPOSIT_THRESHOLD
}

export function formatRupees(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

// Qualification pathway --------------------------------------------------------------------------

export type PathwayStage = { id: string; label: string; text: string; level?: QualificationLevel; href: string }

export const PATHWAY_STAGES: PathwayStage[] = [
  { id: 'try', label: 'Try', text: 'Get on the water for the first time.', level: 'Personal award', href: '/academy/courses?category=start-paddling' },
  { id: 'learn', label: 'Learn', text: 'Build personal skills and confidence.', level: 'Personal award', href: '/academy/courses?category=start-paddling' },
  { id: 'qualify', label: 'Qualify', text: 'Train to teach paddlesport.', level: 'Instructor', href: '/academy/courses?level=Instructor' },
  { id: 'lead', label: 'Lead', text: 'Take responsibility for groups on the water.', level: 'Leader', href: '/academy/courses?level=Leader' },
  { id: 'coach', label: 'Coach', text: 'Develop other paddlers.', level: 'Coach', href: '/academy/courses?level=Coach' },
  { id: 'tutor', label: 'Tutor', text: 'Help train the next generation of paddlesport professionals.', href: '/academy/qualification-pathway#tutor' },
]

export type QualificationLevelInfo = {
  id: string
  name: string
  level?: QualificationLevel
  intendedLearner?: string
  entryRequirements?: string
  learningOutcomes?: string
  progression?: string
  scope?: string
  environments?: WaterEnvironmentId[]
}

/** Detail fields stay undefined until the Paddle UK Qualification Pathway document is supplied. */
export const QUALIFICATION_LEVELS: QualificationLevelInfo[] = [
  { id: 'personal-awards', name: 'Personal Awards', level: 'Personal award' },
  { id: 'instructor', name: 'Instructor', level: 'Instructor' },
  { id: 'leader', name: 'Leader', level: 'Leader' },
  { id: 'coach', name: 'Coach', level: 'Coach' },
  { id: 'tutor', name: 'Tutor' },
]

export const WATER_ENVIRONMENTS: { id: WaterEnvironmentId; name: string; definition?: string }[] = [
  { id: 'very-sheltered', name: 'Very Sheltered' },
  { id: 'sheltered', name: 'Sheltered' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'advanced', name: 'Advanced' },
]

// Campuses, partners, people ---------------------------------------------------------------------

export const CAMPUSES: { id: CampusId; name: string; planned: string; focus: string[] }[] = [
  { id: 'kovalam', name: 'Kovalam', planned: 'Planned from 2027', focus: ['Sea paddling', 'SUP', 'Instructor awards'] },
  { id: 'muziris-kochi', name: 'Muziris–Kochi', planned: 'Planned from 2028', focus: ['Flat-water paddling', 'Canoe', 'Schools'] },
  { id: 'kodenchery', name: 'Kodenchery', planned: 'Planned from 2029', focus: ['White-water training'] },
]

/** Exact approved wording. Logos and stronger claims need written partner permission first. */
export const PARTNER_STATEMENT = 'Paddle UK courses from 2027, subject to approval.'
export const PARTNER_LOGOS_APPROVED = false

export type Tutor = { id: string; name: string; role: string; qualifications: string[]; bio: string; photo?: string }
export const tutors: Tutor[] = []

export type Testimonial = { name: string; course: string; quote: string; consentRecorded: true }
export const testimonials: Testimonial[] = []

export type CourseSession = { id: string; courseSlug: string; startDate: string; endDate?: string; campus: CampusId; capacity?: number; remaining?: number }
/** Real, confirmed upcoming course dates (admin panel → Academy → Course dates). */
export const courseSessions: CourseSession[] = academy?.sessions ?? []
