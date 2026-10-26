'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, FileUp, Info, Loader2, Paperclip, X } from 'lucide-react'
import { CheckboxField, DemoBanner, SelectField, TextField, primaryButton } from '@/components/academy/form-kit'
import { CourseAction, CoursePrice } from '@/components/academy/course-card'
import { Pending, focusRing } from '@/components/locations/primitives'
import { BALANCE_DUE_DAYS_BEFORE, CAMPUSES, formatRupees, type Course, type CourseSession } from '@/lib/academy'
import { ENROLMENT_STATUS, createEnrolment, getCourseSessions, paymentOptions, type DocumentKind, type EnrolmentStatus } from '@/lib/academy-service'

const toneStyles = { neutral: 'bg-[#eef2ed] text-[#3d5862]', pending: 'bg-[#fff1cf] text-[#7a4f00]', good: 'bg-[#d9f7ed] text-[#14785a]', bad: 'bg-[#fdecea] text-[#b42318]' }

export function EnrolmentStatusBadge({ status }: { status: EnrolmentStatus }) {
  const info = ENROLMENT_STATUS[status]
  return <span className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${toneStyles[info.tone]}`}>{info.label}</span>
}

const DOC_LABELS: Record<DocumentKind, string> = { certificate: 'Previous certificates', logbook: 'Logbook', 'photo-id': 'Photo ID' }
const MAX_BYTES = 10 * 1024 * 1024
const ACCEPT = 'application/pdf,image/jpeg,image/png'

/** Client-side selection and checks only. Production uploads go to private storage via signed URLs. */
export function DocumentUpload({ kind, file, onChange, error }: { kind: DocumentKind; file?: File; onChange: (file?: File) => void; error?: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [localError, setLocalError] = useState('')
  const id = `upload-${kind}`
  return (
    <div className="rounded-2xl border border-dashed border-[#06263b]/20 bg-[#f8faf8] p-4">
      <p className="text-sm font-bold">{DOC_LABELS[kind]}</p>
      {file ? (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm">
          <span className="flex min-w-0 items-center gap-2"><Paperclip className="size-4 shrink-0 text-[#00a9c3]" aria-hidden /><span className="truncate">{file.name}</span></span>
          <button type="button" onClick={() => onChange(undefined)} className={`flex size-11 shrink-0 items-center justify-center rounded-full ${focusRing}`} aria-label={`Remove ${file.name}`}><X className="size-4" /></button>
        </div>
      ) : (
        <>
          <label htmlFor={id} className={`mt-3 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#dfe6e5] bg-white text-sm font-bold has-focus-visible:ring-2 has-focus-visible:ring-[#00a9c3]`}>
            <FileUp className="size-4" aria-hidden /> Choose file
            <input
              ref={inputRef}
              id={id}
              type="file"
              accept={ACCEPT}
              className="sr-only"
              aria-describedby={`${id}-hint`}
              onChange={(event) => {
                const selected = event.target.files?.[0]
                if (!selected) return
                if (!ACCEPT.split(',').includes(selected.type)) return setLocalError('Use a PDF, JPG or PNG file.')
                if (selected.size > MAX_BYTES) return setLocalError('Files must be 10 MB or smaller.')
                setLocalError('')
                onChange(selected)
              }}
            />
          </label>
          <p id={`${id}-hint`} className="mt-2 text-xs text-[#57717b]">PDF, JPG or PNG, up to 10 MB.</p>
        </>
      )}
      {(localError || error) && <p className="mt-2 text-xs font-semibold text-[#b42318]" role="alert">{localError || error}</p>}
    </div>
  )
}

const STEPS = ['Course & date', 'Eligibility', 'Learner details', 'Payment', 'Confirmation']

function Stepper({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-5 gap-1.5" aria-label="Enrolment progress">
      {STEPS.map((label, index) => (
        <li key={label} aria-current={index === step ? 'step' : undefined}>
          <div className={`h-1.5 rounded-full ${index <= step ? 'bg-[#f5b82e]' : 'bg-[#dfe6e5]'}`} />
          <p className={`mt-2 hidden text-xs font-bold sm:block ${index === step ? 'text-[#06263b]' : 'text-[#57717b]'}`}>{index < step && <Check className="mr-1 inline size-3.5 text-[#14785a]" aria-hidden />}{label}</p>
        </li>
      ))}
    </ol>
  )
}

const DEMO_SESSION: CourseSession = { id: 'demo', courseSlug: 'demo', startDate: '', campus: 'kovalam' }

function ageOn(dob: string) {
  const birth = new Date(dob)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--
  return age
}

export function CourseEnrolmentStepper({ course }: { course: Course }) {
  const sessions = getCourseSessions(course.slug)
  const [demo, setDemo] = useState(false)
  const [step, setStep] = useState(0)
  const [sessionId, setSessionId] = useState('')
  const [files, setFiles] = useState<Partial<Record<DocumentKind, File>>>({})
  const [dob, setDob] = useState('')
  const [payment, setPayment] = useState<'full' | 'deposit'>('full')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => { if (demo || sessions.length) headingRef.current?.focus() }, [step, demo, sessions.length])
  // Focus the first invalid field once the error state has rendered.
  useEffect(() => { if (attempt) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [role="alert"]')?.focus() }, [attempt])

  const available = demo ? [DEMO_SESSION] : sessions
  const required: DocumentKind[] = course.professional && course.level !== 'Programme' ? ['certificate', 'logbook', 'photo-id'] : []
  const minor = dob ? ageOn(dob) < 18 : false
  const options = paymentOptions(course)
  const chosen = options.find((option) => option.id === payment && option.available) ?? options[0]

  if (!sessions.length && !demo) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,38,59,.10)] sm:p-8">
        <h2 className="font-display text-2xl font-bold">Enrolment isn’t open yet</h2>
        <p className="mt-2 text-sm leading-6 text-[#3d5862]">{course.status === 'enquiry' ? `${course.name} is arranged on enquiry.` : `Dates for ${course.name} haven’t been announced. Register your interest and we’ll tell you when enrolment opens.`}</p>
        <div className="mt-6 flex flex-wrap gap-3"><CourseAction course={course} /></div>
        <div className="mt-8 border-t border-[#eef2ed] pt-6">
          <p className="text-sm text-[#57717b]">Want to see how enrolment will work? Walk through the journey with demonstration data. Nothing is saved and no payment is taken.</p>
          <button type="button" onClick={() => { setDemo(true); setSessionId('demo') }} className={`mt-4 inline-flex min-h-11 items-center rounded-full border border-[#06263b]/20 px-5 text-sm font-bold ${focusRing}`}>Preview the enrolment journey (demo)</button>
        </div>
      </div>
    )
  }

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const e: Record<string, string> = {}
    if (step === 0 && !sessionId) e.session = 'Choose a course date.'
    if (step === 1) {
      required.forEach((kind) => { if (!files[kind]) e[kind] = `Upload your ${DOC_LABELS[kind].toLowerCase()}.` })
      if (!data.get('eligible')) e.eligible = 'Please confirm you have read the entry requirements.'
    }
    if (step === 2) {
      if (!String(data.get('name') ?? '').trim()) e.name = 'Enter the learner’s full name.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email') ?? ''))) e.email = 'Enter a valid email address.'
      if (!/^\+?[\d\s-]{10,16}$/.test(String(data.get('phone') ?? ''))) e.phone = 'Enter a valid phone number.'
      if (!dob) e.dob = 'Enter the learner’s date of birth.'
      if (!data.get('swimming')) e.swimming = 'Select the learner’s swimming ability.'
      if (!data.get('health')) e.health = 'Please complete the health declaration.'
      if (minor) {
        if (!String(data.get('guardianName') ?? '').trim()) e.guardianName = 'Enter the parent or guardian’s name.'
        if (!/^\+?[\d\s-]{10,16}$/.test(String(data.get('guardianPhone') ?? ''))) e.guardianPhone = 'Enter a valid phone number.'
        if (!data.get('guardianConsent')) e.guardianConsent = 'A parent or guardian must give consent.'
      }
    }
    if (step === 3 && !data.get('terms')) e.terms = 'Please accept the booking terms.'
    setErrors(e)
    if (Object.keys(e).length) {
      setAttempt((n) => n + 1)
      return
    }
    if (step === 3) return pay()
    setStep(step + 1)
  }

  async function pay() {
    setSubmitting(true)
    await createEnrolment({ course: course.slug, sessionId, payment })
    setSubmitting(false)
    setStep(4)
  }

  const session = available.find((item) => item.id === sessionId)
  const campusName = session && CAMPUSES.find((campus) => campus.id === session.campus)?.name

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,38,59,.10)] sm:p-8">
      {demo && <div className="mb-6"><DemoBanner><strong>Demo preview.</strong> The date below is not a real course date, files stay on your device, and no enrolment or payment is created.</DemoBanner></div>}
      <Stepper step={step} />
      <h2 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-2xl font-bold outline-none">{STEPS[step]}</h2>

      {step < 4 ? (
        <form ref={formRef} onSubmit={next} noValidate className="mt-6 space-y-5" key={step}>
          {step === 0 && (
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-wider text-[#57717b]">Course date</legend>
              <div className="mt-3 grid gap-2">
                {available.map((item) => (
                  <label key={item.id} className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-2xl border p-4 has-focus-visible:ring-2 has-focus-visible:ring-[#00a9c3] ${sessionId === item.id ? 'border-[#06263b] bg-[#f8faf8]' : 'border-[#dfe6e5]'}`}>
                    <input type="radio" name="session" value={item.id} checked={sessionId === item.id} onChange={() => setSessionId(item.id)} className="sr-only" />
                    <span><span className="block font-bold">{item.startDate ? new Date(item.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Demo date — not a real course date'}</span><span className="text-sm text-[#57717b]">{CAMPUSES.find((c) => c.id === item.campus)?.name}{item.remaining !== undefined && ` · ${item.remaining} places left`}</span></span>
                    <CoursePrice course={course} />
                  </label>
                ))}
              </div>
              {errors.session && <p role="alert" tabIndex={-1} className="mt-2 text-xs font-semibold text-[#b42318]">{errors.session}</p>}
            </fieldset>
          )}

          {step === 1 && (
            <>
              <div className="rounded-2xl bg-[#eef2ed] p-4 text-sm"><p className="font-bold">Entry requirements for {course.name}</p><p className="mt-1">{course.entryRequirements ?? <Pending>To be confirmed from the Paddle UK qualification documents.</Pending>}</p></div>
              {required.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-3">{required.map((kind) => <DocumentUpload key={kind} kind={kind} file={files[kind]} error={errors[kind]} onChange={(file) => setFiles({ ...files, [kind]: file })} />)}</div>
              ) : <p className="text-sm text-[#57717b]">No documents are needed for this course.</p>}
              <CheckboxField name="eligible" error={errors.eligible}>I have read the entry requirements. I understand the Academy will review my documents, and if I don’t meet them I’ll be offered a preparation course or refund under the approved process.</CheckboxField>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Learner’s full name" name="name" autoComplete="name" error={errors.name} />
                <TextField label="Date of birth" name="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} error={errors.dob} />
                <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                <TextField label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
              </div>
              <SelectField label="Swimming ability" name="swimming" options={['Confident swimmer', 'Can swim a little', 'Cannot swim']} error={errors.swimming} hint="Course-specific swimming requirements will be shown here once confirmed." />
              <CheckboxField name="health" error={errors.health}>I confirm the learner is fit to take part and I will tell the Academy about any medical condition relevant to paddling. <span className="text-[#57717b]">Used only to keep the learner safe on this course.</span></CheckboxField>
              {minor && (
                <fieldset className="space-y-4 rounded-2xl border border-[#f5b82e] bg-[#fffaf0] p-4">
                  <legend className="px-1 text-sm font-bold">Parent or guardian (learner is under 18)</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="Parent or guardian name" name="guardianName" error={errors.guardianName} />
                    <TextField label="Parent or guardian phone" name="guardianPhone" type="tel" error={errors.guardianPhone} />
                  </div>
                  <CheckboxField name="guardianConsent" error={errors.guardianConsent}>As parent or guardian, I consent to this learner taking part in {course.name}.</CheckboxField>
                </fieldset>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <fieldset>
                <legend className="text-xs font-bold uppercase tracking-wider text-[#57717b]">Payment option</legend>
                <div className="mt-3 grid gap-2">
                  {options.map((option) => (
                    <label key={option.id} className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border p-4 has-focus-visible:ring-2 has-focus-visible:ring-[#00a9c3] ${option.available ? 'cursor-pointer' : 'opacity-60'} ${chosen.id === option.id ? 'border-[#06263b] bg-[#f8faf8]' : 'border-[#dfe6e5]'}`}>
                      <input type="radio" name="payment" value={option.id} disabled={!option.available} checked={chosen.id === option.id} onChange={() => setPayment(option.id)} className="sr-only" />
                      <span><span className="block font-bold">{option.label}</span>{option.note && <span className="text-xs text-[#57717b]">{option.note}</span>}</span>
                      <span className="font-bold">{option.available ? formatRupees(option.payNow) : '—'}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <dl className="space-y-2 rounded-2xl bg-[#f8faf8] p-4 text-sm">
                <div className="flex justify-between"><dt>Course fee (2027 rate)</dt><dd>{course.price ? formatRupees(course.price) : 'On enquiry'}</dd></div>
                <div className="flex justify-between text-xs text-[#57717b]"><dt>Member discounts & bundles</dt><dd>Not yet connected</dd></div>
                <div className="flex justify-between text-xs text-[#57717b]"><dt>Academy starter kit</dt><dd>Available once the Shop is connected</dd></div>
                <div className="flex justify-between border-t border-[#dfe6e5] pt-2 font-display text-lg font-bold"><dt>Pay now</dt><dd>{formatRupees(chosen.payNow)}</dd></div>
                {chosen.balance > 0 && <div className="flex justify-between text-xs"><dt>Balance due {BALANCE_DUE_DAYS_BEFORE} days before the course</dt><dd>{formatRupees(chosen.balance)}</dd></div>}
              </dl>
              <CheckboxField name="terms" error={errors.terms}>I accept the booking terms, cancellation and transfer policy, and the digital waiver. <span className="text-[#57717b]">Final wording awaiting approval.</span></CheckboxField>
            </>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eef2ed] pt-5">
            {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className={`inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold ${focusRing}`}><ArrowLeft className="mr-2 size-4" aria-hidden />Back</button> : <span />}
            <button type="submit" disabled={submitting} className={primaryButton}>{submitting && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />}{step === 3 ? (demo ? 'Pay (demo — no charge)' : 'Pay securely') : 'Continue'}{step < 3 && <ArrowRight className="ml-2 size-4" aria-hidden />}</button>
          </div>
        </form>
      ) : (
        <Confirmation course={course} demo={demo} campusName={campusName} payNow={chosen.payNow} balance={chosen.balance} uploaded={Object.values(files).filter(Boolean).length} />
      )}
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return <div className="flex justify-between gap-4 py-2"><dt className="text-[#57717b]">{label}</dt><dd className="text-right font-semibold">{children}</dd></div>
}

function Confirmation({ course, demo, campusName, payNow, balance, uploaded }: { course: Course; demo: boolean; campusName?: string; payNow: number; balance: number; uploaded: number }) {
  const status: EnrolmentStatus = 'draft'
  return (
    <div className="mt-6 space-y-6" role="status">
      <DemoBanner><strong>{demo ? 'Demo preview — no enrolment was created and no payment was taken.' : 'Enrolment service not connected.'}</strong> Once enrolment and payment are live, this page shows your reference only after payment is verified.</DemoBanner>
      <dl className="divide-y divide-[#eef2ed] text-sm">
        <Row label="Enrolment reference">Issued after verified payment</Row>
        <Row label="Course">{course.name}</Row>
        <Row label="Location">{campusName ?? '—'}</Row>
        <Row label="Paid now">{formatRupees(payNow)}{demo && ' (demo)'}</Row>
        {balance > 0 && <Row label="Balance due">{formatRupees(balance)}, {BALANCE_DUE_DAYS_BEFORE} days before the course</Row>}
        <Row label="Documents">{uploaded ? `${uploaded} selected (not uploaded in demo)` : 'None required'}</Row>
        <Row label="Status"><EnrolmentStatusBadge status={status} /></Row>
        <Row label="Joining instructions">Sent once your enrolment is approved</Row>
        <Row label="eLearning">Linked here where the course includes it</Row>
      </dl>
      <div className="rounded-2xl bg-[#eef2ed] p-5">
        <p className="flex items-center gap-2 font-bold"><Info className="size-4" aria-hidden />What happens next</p>
        <ol className="mt-3 space-y-2 text-sm text-[#3d5862]">
          <li>1. {ENROLMENT_STATUS['awaiting-document-review'].guidance}</li>
          <li>2. If anything is missing, your status changes to <strong>{ENROLMENT_STATUS['additional-information-required'].label}</strong> and we’ll tell you what to upload.</li>
          <li>3. Your enrolment shows <strong>Approved</strong> only once the review is complete.</li>
        </ol>
      </div>
      <a href="/account/courses" className={primaryButton}>Go to my courses</a>
    </div>
  )
}
