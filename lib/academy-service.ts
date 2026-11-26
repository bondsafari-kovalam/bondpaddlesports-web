/**
 * Academy service boundary: what the pages call.
 *
 * Connected to the Bond backend:
 *   courses, categories, course dates   synced from GET /academy/courses · /categories · /batches (lib/academy.ts)
 *   certificate check                   POST /academy/certificates/verify
 *   careers, schools, contact forms     POST /enquiries/academy-careers · /academy-schools · /academy
 *
 * Not built yet (they answer "not connected" so the UI stays honest): online enrolment and payment, private
 * document storage (signed URLs, staff-only access, retention rules for ID and health declarations), Academy
 * review/approval, learner accounts, notifications, member discounts and Shop starter kits.
 */

import { BALANCE_DUE_DAYS_BEFORE, courseSessions, depositEligible, type Course, type CourseSession } from '@/lib/academy'
import { bondApi, checked, keyFor, submitEnquiryTo, text, toE164, whole } from '@/lib/bond-api'

export const ACADEMY_BACKEND_CONNECTED = false

export type EnrolmentStatus =
  | 'draft'
  | 'awaiting-payment'
  | 'awaiting-document-review'
  | 'approved'
  | 'additional-information-required'
  | 'rejected'
  | 'cancelled'
  | 'refunded'

export const ENROLMENT_STATUS: Record<EnrolmentStatus, { label: string; guidance: string; tone: 'neutral' | 'pending' | 'good' | 'bad' }> = {
  draft: { label: 'Draft', guidance: 'Your enrolment has not been submitted yet.', tone: 'neutral' },
  'awaiting-payment': { label: 'Awaiting payment', guidance: 'Complete payment to hold your place.', tone: 'pending' },
  'awaiting-document-review': { label: 'Awaiting document review', guidance: 'The Academy team is checking your documents against the entry requirements.', tone: 'pending' },
  approved: { label: 'Approved', guidance: 'You’re confirmed. Joining instructions will follow.', tone: 'good' },
  'additional-information-required': { label: 'Additional information required', guidance: 'Please upload the documents the Academy has asked for.', tone: 'pending' },
  rejected: { label: 'Rejected', guidance: 'You don’t yet meet the entry requirements. We’ll explain your options, including a preparation course or refund.', tone: 'bad' },
  cancelled: { label: 'Cancelled', guidance: 'This enrolment was cancelled.', tone: 'neutral' },
  refunded: { label: 'Refunded', guidance: 'Your payment has been refunded.', tone: 'neutral' },
}

export type DocumentKind = 'certificate' | 'logbook' | 'photo-id'
export type EnrolmentDocument = { kind: DocumentKind; fileName: string; status: 'uploaded' | 'accepted' | 'needs-replacement' }

export type Enrolment = {
  reference: string
  courseSlug: string
  session?: CourseSession
  status: EnrolmentStatus
  amountPaid: number
  balanceDue: number
  balanceDueDate?: string
  documents: EnrolmentDocument[]
  requiredDocuments: DocumentKind[]
  joiningInstructions?: string
  eLearningUrl?: string
  certificateNumber?: string
}

export type PaymentOption = { id: 'full' | 'deposit'; label: string; payNow: number; balance: number; available: boolean; note?: string }

export function getCourseSessions(courseSlug?: string) {
  return courseSessions.filter((session) => !courseSlug || session.courseSlug === courseSlug)
}

export function paymentOptions(course: Course, participants = 1): PaymentOption[] {
  const total = (course.price ?? 0) * participants
  const options: PaymentOption[] = [{ id: 'full', label: 'Pay in full', payNow: total, balance: 0, available: !!course.price }]
  if (depositEligible(course)) {
    const deposit = (course.depositAmount ?? 0) * participants
    options.push({
      id: 'deposit',
      label: 'Pay a deposit',
      payNow: deposit,
      balance: total - deposit,
      available: !!course.depositAmount,
      note: course.depositAmount ? `Balance due ${BALANCE_DUE_DAYS_BEFORE} days before the course.` : 'Deposit amount awaiting confirmation.',
    })
  }
  return options
}

export type ServiceResult<T> = { ok: true; data: T } | { ok: false; reason: 'not-connected' | 'error'; message: string }

const notConnected = (what: string): ServiceResult<never> => ({ ok: false, reason: 'not-connected', message: `${what} is not connected yet.` })

const EXPERIENCE_LABELS = ['New to paddling', 'Some recreational paddling', 'Regular paddler', 'Already working on the water']
const EXPERIENCE_KEYS = ['new_to_paddling', 'some_recreational', 'regular_paddler', 'working_on_the_water'] as const
const PROGRAMME_LABELS = ['Schools Paddle Year', 'Single visit', 'Not sure yet']
const PROGRAMME_KEYS = ['schools_paddle_year', 'single_visit', 'not_sure'] as const

/** Academy forms → Bond backend enquiries (careers, schools and contact). `interest` has no form yet. */
export async function submitEnquiry(kind: 'interest' | 'careers' | 'schools' | 'contact', payload: Record<string, unknown>): Promise<ServiceResult<{ reference: string }>> {
  const location = text(payload.location) === 'No preference' ? undefined : text(payload.location)
  switch (kind) {
    case 'careers':
      return submitEnquiryTo('/enquiries/academy-careers', {
        name: text(payload.name),
        email: text(payload.email),
        phone: toE164(payload.phone),
        preferredLocation: location,
        experience: keyFor(payload.experience, EXPERIENCE_LABELS, EXPERIENCE_KEYS),
        qualifications: text(payload.qualifications),
        message: text(payload.message),
        consent: checked(payload.consent),
        newsletterOptIn: checked(payload.marketing),
      })
    case 'schools':
      return submitEnquiryTo('/enquiries/academy-schools', {
        organisation: text(payload.school),
        name: text(payload.contact),
        email: text(payload.email),
        phone: toE164(payload.phone),
        groupSize: whole(payload.groupSize),
        term: text(payload.term),
        preferredLocation: location,
        programmeInterest: keyFor(payload.interest, PROGRAMME_LABELS, PROGRAMME_KEYS),
        message: text(payload.requirements),
        gstNumber: text(payload.gst),
        consent: checked(payload.consent),
      })
    case 'contact':
      return submitEnquiryTo('/enquiries/academy', {
        name: text(payload.name),
        email: text(payload.email),
        phone: toE164(payload.phone),
        courseOfInterest: text(payload.course),
        message: text(payload.message),
        consent: checked(payload.consent),
      })
    default:
      return notConnected('Enquiry handling')
  }
}

export async function createEnrolment(_payload: Record<string, unknown>): Promise<ServiceResult<Enrolment>> {
  return notConnected('Enrolment and payment')
}

export type CertificateRecord = { holderInitial: string; surname: string; course: string; awardedOn: string; deliveredBy: 'Bond Safari Academy' }

type VerifiedCertificate = { holderInitial: string; surname: string; course: string; awardedOn: string }

/**
 * POST /academy/certificates/verify. The backend only confirms a VALID certificate Bond delivered whose number and
 * surname match, with the minimum personal data; anything else is `null` (no match).
 */
export async function verifyCertificate(certificateNumber: string, surname: string): Promise<ServiceResult<CertificateRecord | null>> {
  const result = await bondApi<{ certificate: VerifiedCertificate | null }>('/academy/certificates/verify', {
    body: { certificateNumber: certificateNumber.trim(), surname: surname.trim() },
  })
  if (!result.ok) {
    // A number that cannot be a certificate number (rejected by validation) simply matches nothing.
    if (result.code === 'VALIDATION_ERROR') return { ok: true, data: null }
    return { ok: false, reason: result.reason, message: result.message }
  }
  const found = result.data.certificate
  return {
    ok: true,
    data: found ? { holderInitial: found.holderInitial.replace(/\.$/, ''), surname: found.surname, course: found.course, awardedOn: found.awardedOn, deliveredBy: 'Bond Safari Academy' } : null,
  }
}

export async function getLearnerEnrolments(): Promise<ServiceResult<Enrolment[]>> {
  return notConnected('Learner accounts')
}
