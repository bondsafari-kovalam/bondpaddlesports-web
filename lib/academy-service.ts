/**
 * Academy service boundary. Every function here is what the pages call; today each returns a
 * "not connected" result so the UI can be honest. In production these become server-side calls
 * to the shared Bond booking backend, following the contract in
 * bond-safari-website/docs/booking-api.md:
 *
 *   GET  /batches?course=<slug>&from=YYYY-MM-DD  → course dates and live capacity
 *   POST /holds  { kind: "course", batchId, payNow, balance, declarations, customer }
 *   POST /holds/:id/confirm                      → after the payment server verifies Razorpay
 *   POST /enquiries                              → register interest, careers, schools, contact
 *
 * Still to build server-side: private document storage (signed URLs, staff-only access, retention
 * rules for ID and health declarations), certificate verification, Academy review/approval with
 * role checks on the server, email/WhatsApp notifications, member discounts and Shop starter kits.
 */

import { BALANCE_DUE_DAYS_BEFORE, courseSessions, depositEligible, type Course, type CourseSession } from '@/lib/academy'

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

export async function submitEnquiry(_kind: 'interest' | 'careers' | 'schools' | 'contact', _payload: Record<string, unknown>): Promise<ServiceResult<{ reference: string }>> {
  return notConnected('Enquiry handling')
}

export async function createEnrolment(_payload: Record<string, unknown>): Promise<ServiceResult<Enrolment>> {
  return notConnected('Enrolment and payment')
}

export type CertificateRecord = { holderInitial: string; surname: string; course: string; awardedOn: string; deliveredBy: 'Bond Safari Academy' }

/** Must only ever confirm courses Bond actually delivered, returning the minimum personal data. */
export async function verifyCertificate(_certificateNumber: string, _surname: string): Promise<ServiceResult<CertificateRecord | null>> {
  return notConnected('Certificate verification')
}

export async function getLearnerEnrolments(): Promise<ServiceResult<Enrolment[]>> {
  return notConnected('Learner accounts')
}
