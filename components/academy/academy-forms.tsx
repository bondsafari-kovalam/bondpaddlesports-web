'use client'

import { useState, type FormEvent } from 'react'
import { AlertCircle, BadgeCheck, Loader2, SearchX, ShieldAlert } from 'lucide-react'
import { CheckboxField, SelectField, ServiceForm, TextAreaField, TextField, isEmail, isPhone, primaryButton } from '@/components/academy/form-kit'
import { CAMPUSES, courses } from '@/lib/academy'
import { submitEnquiry, verifyCertificate, type CertificateRecord } from '@/lib/academy-service'

const campusOptions = [...CAMPUSES.map((campus) => `${campus.name} (${campus.planned.toLowerCase()})`), 'No preference']

function required(data: FormData, fields: Record<string, string>) {
  const errors: Record<string, string> = {}
  for (const [name, message] of Object.entries(fields)) if (!String(data.get(name) ?? '').trim()) errors[name] = message
  return errors
}

function contactErrors(data: FormData) {
  const errors: Record<string, string> = {}
  const email = String(data.get('email') ?? '').trim()
  const phone = String(data.get('phone') ?? '').trim()
  if (!isEmail(email)) errors.email = 'Enter a valid email address.'
  if (phone && !isPhone(phone)) errors.phone = 'Enter a valid phone number.'
  return errors
}

const toObject = (data: FormData) => Object.fromEntries(data.entries())

export function CareerInterestForm() {
  return (
    <ServiceForm
      submitLabel="Send expression of interest"
      savedMessage="Thanks — the Academy team will be in touch."
      validate={(data) => ({ ...required(data, { name: 'Enter your name.', experience: 'Tell us about your paddling experience.' }), ...contactErrors(data), ...(data.get('consent') ? {} : { consent: 'Please confirm we may contact you about the programme.' }) })}
      submit={(data) => submitEnquiry('careers', toObject(data))}
    >
      {(errors) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" name="name" autoComplete="name" error={errors.name} />
            <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
            <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional error={errors.phone} />
            <SelectField label="Location preference" name="location" options={campusOptions} optional />
          </div>
          <SelectField label="Current paddling experience" name="experience" options={['New to paddling', 'Some recreational paddling', 'Regular paddler', 'Already working on the water']} error={errors.experience} />
          <TextField label="Previous qualifications" name="qualifications" optional hint="Any paddlesport, first aid or water-safety awards." />
          <TextAreaField label="Message" name="message" optional />
          <CheckboxField name="consent" error={errors.consent}>Contact me about the Bond Paddle Guide Programme. <span className="text-slate">Required.</span></CheckboxField>
          <CheckboxField name="marketing">Also send me Bond Safari Academy news. <span className="text-slate">Optional.</span></CheckboxField>
        </>
      )}
    </ServiceForm>
  )
}

export function SchoolEnquiryForm() {
  return (
    <ServiceForm
      submitLabel="Send school enquiry"
      savedMessage="Thanks — the Academy team will contact you about your programme."
      validate={(data) => {
        const errors = { ...required(data, { school: 'Enter the school or college name.', contact: 'Enter a contact name.', groupSize: 'Enter an approximate group size.' }), ...contactErrors(data) }
        const size = Number(data.get('groupSize'))
        if (data.get('groupSize') && (!Number.isInteger(size) || size < 1)) errors.groupSize = 'Enter a whole number.'
        const gst = String(data.get('gst') ?? '').trim().toUpperCase()
        if (gst && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(gst)) errors.gst = 'Enter a valid 15-character GSTIN.'
        if (!data.get('consent')) errors.consent = 'Please confirm we may contact you about this enquiry.'
        return errors
      }}
      submit={(data) => submitEnquiry('schools', toObject(data))}
    >
      {(errors) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="School or college" name="school" autoComplete="organization" error={errors.school} />
            <TextField label="Contact person" name="contact" autoComplete="name" error={errors.contact} />
            <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
            <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional error={errors.phone} />
            <TextField label="Approximate group size" name="groupSize" inputMode="numeric" error={errors.groupSize} />
            <TextField label="Preferred date or term" name="term" optional />
            <SelectField label="Preferred location" name="location" options={campusOptions} optional />
            <SelectField label="Programme interest" name="interest" options={['Schools Paddle Year', 'Single visit', 'Not sure yet']} optional />
          </div>
          <TextAreaField label="Special requirements" name="requirements" optional hint="Accessibility, medical or learning needs we should plan for." />
          <TextField label="GST number" name="gst" optional hint="Only if you need a GST invoice." error={errors.gst} />
          <CheckboxField name="consent" error={errors.consent}>Contact me about this school enquiry. <span className="text-slate">Required.</span></CheckboxField>
        </>
      )}
    </ServiceForm>
  )
}

export function AcademyContactForm() {
  return (
    <ServiceForm
      submitLabel="Contact the Academy"
      savedMessage="Thanks — we’ll reply soon."
      validate={(data) => ({ ...required(data, { name: 'Enter your name.', message: 'Enter a message.' }), ...contactErrors(data), ...(data.get('consent') ? {} : { consent: 'Please confirm we may reply to you.' }) })}
      submit={(data) => submitEnquiry('contact', toObject(data))}
    >
      {(errors) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" name="name" autoComplete="name" error={errors.name} />
            <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
            <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional error={errors.phone} />
            <SelectField label="Course of interest" name="course" options={courses.map((course) => course.name)} optional />
          </div>
          <TextAreaField label="Message" name="message" error={errors.message} />
          <CheckboxField name="consent" error={errors.consent}>Reply to me about this enquiry. <span className="text-slate">Required.</span></CheckboxField>
        </>
      )}
    </ServiceForm>
  )
}

type CheckState = { kind: 'idle' } | { kind: 'loading' } | { kind: 'valid'; record: CertificateRecord } | { kind: 'no-match' } | { kind: 'error' } | { kind: 'unavailable' }

export function CertificateCheckForm() {
  const [state, setState] = useState<CheckState>({ kind: 'idle' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const number = String(data.get('certificate') ?? '').trim()
    const surname = String(data.get('surname') ?? '').trim()
    const next: Record<string, string> = {}
    if (!number) next.certificate = 'Enter the certificate number.'
    if (!surname) next.surname = 'Enter the surname on the certificate.'
    setErrors(next)
    if (Object.keys(next).length) return
    setState({ kind: 'loading' })
    try {
      const result = await verifyCertificate(number, surname)
      if (result.ok) setState(result.data ? { kind: 'valid', record: result.data } : { kind: 'no-match' })
      else setState({ kind: result.reason === 'not-connected' ? 'unavailable' : 'error' })
    } catch {
      setState({ kind: 'error' })
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <TextField label="Certificate number" name="certificate" autoComplete="off" error={errors.certificate} />
        <TextField label="Surname" name="surname" autoComplete="family-name" error={errors.surname} />
        <button type="submit" disabled={state.kind === 'loading'} className={`${primaryButton} sm:mb-[1px]`}>
          {state.kind === 'loading' ? <Loader2 className="mr-2 size-4 animate-spin" aria-hidden /> : null}Check certificate
        </button>
      </form>

      <div aria-live="polite">
        {state.kind === 'valid' && (
          <div className="flex gap-3 rounded-2xl bg-success-soft p-5 text-sm text-success">
            <BadgeCheck className="size-6 shrink-0" aria-hidden />
            <div><p className="font-bold">Record found</p><p className="mt-1">{state.record.holderInitial}. {state.record.surname} completed {state.record.course} on {state.record.awardedOn}, delivered by {state.record.deliveredBy}.</p></div>
          </div>
        )}
        {state.kind === 'no-match' && <div className="flex gap-3 rounded-2xl bg-white p-5 text-sm text-slate-strong ring-1 ring-line"><SearchX className="size-6 shrink-0 text-slate" aria-hidden /><p><strong className="text-ink">No matching record.</strong> Check the number and surname exactly as printed. We can only confirm courses Bond Safari Academy delivered.</p></div>}
        {state.kind === 'error' && <div role="alert" className="flex gap-3 rounded-2xl bg-danger-soft p-5 text-sm text-danger"><AlertCircle className="size-6 shrink-0" aria-hidden /><p>We couldn’t check this right now. Please try again later.</p></div>}
        {state.kind === 'unavailable' && <div className="flex gap-3 rounded-2xl bg-sand-soft p-5 text-sm text-sand-ink"><ShieldAlert className="size-6 shrink-0" aria-hidden /><p><strong>Demo preview — nothing was checked.</strong> The certificate verification service isn’t connected yet, so this page cannot confirm or reject any certificate.</p></div>}
      </div>
    </div>
  )
}

