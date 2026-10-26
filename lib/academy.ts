/**
 * Bond Safari Academy catalogue: courses, categories, pathway, water environments, campuses.
 *
 * Source: the client brief (course names, 2027 source prices, campus plan, partner wording, deposit
 * rule). The Paddle UK Qualification Pathway document has not been supplied yet, so qualification
 * scope, entry requirements, prerequisites and water-environment definitions are left undefined;
 * the UI shows them as "pending confirmation" rather than inventing them.
 */

export type CourseCategoryId = 'start-paddling' | 'become-an-instructor' | 'lead-and-coach' | 'programmes'
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

export const COURSE_CATEGORIES: CourseCategory[] = [
  { id: 'start-paddling', name: 'Start Paddling', summary: 'First paddles, personal skills and safety awards for new and improving paddlers.' },
  { id: 'become-an-instructor', name: 'Become an Instructor', summary: 'Training for people interested in teaching paddlesport, subject to entry requirements.' },
  { id: 'lead-and-coach', name: 'Lead and Coach', summary: 'Progression routes for people taking on greater responsibility on the water.' },
  { id: 'programmes', name: 'Programmes', summary: 'Longer programmes, bundles, schools and private coaching.' },
]

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

const courseFaqs: Faq[] = [
  { question: 'Who is this course for?' },
  { question: 'What are the entry requirements?' },
  { question: 'What equipment do I need?' },
]

type Seed = Pick<Course, 'slug' | 'name' | 'level' | 'summary' | 'price'> & Partial<Course>

function seed(category: CourseCategoryId, status: CourseStatus, professional: boolean, items: Seed[]): Course[] {
  return items.map((item) => ({ category, status, professional, faqs: courseFaqs, ...item }))
}

export const courses: Course[] = [
  ...seed('start-paddling', 'dates-coming-soon', false, [
    { slug: 'paddle-start', name: 'Paddle Start', level: 'Personal award', summary: 'A first step into paddlesport.', price: 1200, featured: true },
    { slug: 'paddle-safer', name: 'Paddle Safer', level: 'Personal award', summary: 'Safety skills for paddlers.', price: 1500 },
    { slug: 'sup-safer', name: 'SUP Safer', level: 'Personal award', discipline: 'SUP', summary: 'Safety skills for stand-up paddleboarders.', price: 2500 },
    { slug: 'paddle-discover', name: 'Paddle Discover', level: 'Personal award', summary: 'Build on your first paddles and develop personal skills.', price: 9500, featured: true },
    { slug: 'paddle-explore', name: 'Paddle Explore', level: 'Personal award', summary: 'Develop your personal paddling further.', price: 11000 },
    { slug: 'safety-and-rescue', name: 'Safety and Rescue', level: 'Safety', summary: 'Safety and rescue skills on the water.', price: 7500 },
  ]),
  ...seed('become-an-instructor', 'launching-2027', true, [
    { slug: 'sup-instructor', name: 'SUP Instructor', level: 'Instructor', discipline: 'SUP', summary: 'Instructor training for stand-up paddleboarding.', price: 42500, featured: true },
    { slug: 'paddlesport-instructor', name: 'Paddlesport Instructor', level: 'Instructor', discipline: 'Multi-discipline', summary: 'Instructor training for paddlesport.', price: 42500 },
    { slug: 'preparation-day', name: 'Preparation Day', level: 'Preparation', summary: 'A day of preparation before instructor training.', price: 6500 },
  ]),
  ...seed('lead-and-coach', 'launching-2027', true, [
    { slug: 'paddlesport-leader', name: 'Paddlesport Leader', level: 'Leader', discipline: 'Multi-discipline', summary: 'Leader training for paddlesport.', price: 49000, featured: true },
    { slug: 'open-water-canoe-leader', name: 'Open Water Canoe Leader', level: 'Leader', discipline: 'Canoe', summary: 'Leader training for open-water canoeing.', price: 54500 },
    { slug: 'sea-kayak-leader', name: 'Sea Kayak Leader', level: 'Leader', discipline: 'Sea kayak', summary: 'Leader training for sea kayaking.', price: 64500 },
    { slug: 'coach', name: 'Coach', level: 'Coach', summary: 'Coach training for paddlesport.', price: 83000 },
    { slug: 'white-water-safety', name: 'White Water Safety', level: 'Safety', discipline: 'White water', summary: 'Safety training for white water.', price: 28000 },
  ]),
  ...seed('programmes', 'dates-coming-soon', true, [
    { slug: 'bond-paddle-guide-programme', name: 'Bond Paddle Guide Programme', level: 'Programme', summary: 'Bond’s professional guide-training programme.', price: 136000, featured: true, enquiryHref: '/academy/careers' },
  ]),
  ...seed('programmes', 'enquiry', false, [
    { slug: 'pathway-bundles', name: 'Pathway bundles', level: 'Programme', summary: 'Combine courses along your pathway.' },
    { slug: 'schools-paddle-year', name: 'Schools Paddle Year', level: 'Programme', summary: 'A structured paddling programme for schools and colleges.', enquiryHref: '/academy/schools', groupEnrolment: true },
    { slug: 'private-coaching', name: 'Private coaching', level: 'Programme', summary: 'One-to-one or small-group coaching.' },
  ]),
]

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
/** Real, confirmed course dates only. Empty until the Academy publishes its schedule. */
export const courseSessions: CourseSession[] = []
