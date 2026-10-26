'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'
import { CheckboxField, SelectField, ServiceForm, TextAreaField, TextField, isEmail } from '@/components/academy/form-kit'
import { focusRing } from '@/components/locations/primitives'
import { CONTACT_ENQUIRY_TYPES, NEEDS_BOOKING_REFERENCE, submitContactEnquiry, type ContactEnquiryType } from '@/lib/contact'
import { STATUS_LABELS, locations } from '@/lib/locations'
import { cn } from '@/lib/utils'

const TypeContext = createContext<{ type: ContactEnquiryType | ''; setType: (type: ContactEnquiryType | '') => void }>({ type: '', setType: () => {} })
export const FORM_ID = 'enquiry'

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<ContactEnquiryType | ''>('')
  // Other pages can link to /contact?type=Membership to preselect the enquiry type.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('type')
    if (requested && (CONTACT_ENQUIRY_TYPES as readonly string[]).includes(requested)) setType(requested as ContactEnquiryType)
  }, [])
  return <TypeContext.Provider value={{ type, setType }}>{children}</TypeContext.Provider>
}

/** Scrolls to the form and preselects the enquiry type. */
export function EnquiryTypeLink({ type, children, className = '' }: { type: ContactEnquiryType; children: ReactNode; className?: string }) {
  const { setType } = useContext(TypeContext)
  return (
    <a href={`#${FORM_ID}`} onClick={() => { setType(type); window.setTimeout(() => document.getElementById('form-title')?.focus({ preventScroll: true }), 400) }} className={cn(focusRing, className)}>
      {children}
    </a>
  )
}

const INDIAN_PHONE = /^(\+91[\s-]?)?[6-9]\d{9}$/
const contactLocations = locations.filter((l) => l.hasDetailPage)
const locationLabel = (l: (typeof contactLocations)[number]) => `${l.name} — ${STATUS_LABELS[l.status]}`

export function ContactForm() {
  const { type, setType } = useContext(TypeContext)
  const needsReference = !!type && NEEDS_BOOKING_REFERENCE.includes(type)

  return (
    <ServiceForm
      submitLabel="Send enquiry"
      savedMessage="Thank you for contacting Bond Safari. Your enquiry has been received, and our team will review it."
      validate={(data) => {
        const e: Record<string, string> = {}
        if (String(data.get('website') ?? '')) e.website = 'Submission blocked.'
        if (!String(data.get('name') ?? '').trim()) e.name = 'Enter your full name.'
        if (!isEmail(String(data.get('email') ?? ''))) e.email = 'Enter a valid email address.'
        const phone = String(data.get('phone') ?? '').replace(/\s/g, '')
        if (phone && !INDIAN_PHONE.test(phone)) e.phone = 'Enter a 10-digit Indian mobile number, or leave it blank.'
        if (!data.get('type')) e.type = 'Choose what your enquiry is about.'
        if (!String(data.get('subject') ?? '').trim()) e.subject = 'Add a short subject.'
        if (String(data.get('message') ?? '').trim().length < 10) e.message = 'Tell us how we can help (at least 10 characters).'
        if (!data.get('consent')) e.consent = 'Please agree so we can use your details to respond.'
        return e
      }}
      submit={(data) => submitContactEnquiry(Object.fromEntries([...data.entries()].filter(([key]) => key !== 'website')))}
    >
      {(errors) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Full name" name="name" autoComplete="name" error={errors.name} />
            <TextField label="Email address" name="email" type="email" autoComplete="email" error={errors.email} />
            <TextField label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" optional error={errors.phone} />
            <SelectField label="Enquiry type" name="type" options={[...CONTACT_ENQUIRY_TYPES]} value={type} onChange={(e) => setType(e.target.value as ContactEnquiryType | '')} error={errors.type} />
            <SelectField label="Preferred location" name="location" optional options={contactLocations.map(locationLabel)} />
            {needsReference && <TextField label="Booking reference" name="bookingReference" optional hint="From your booking confirmation, if you have it." />}
          </div>
          <TextField label="Subject" name="subject" error={errors.subject} />
          <TextAreaField label="Message" name="message" placeholder="Tell us how we can help…" error={errors.message} />

          {/* Honeypot for basic spam protection; hidden from people and assistive tech. */}
          <div className="absolute -left-[9999px]" aria-hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

          <div className="space-y-3 border-t border-[#eef2ed] pt-5">
            <p className="flex gap-2 text-xs leading-5 text-[#57717b]"><ShieldCheck className="size-4 shrink-0 text-[#14785a]" aria-hidden />We use these details only to respond to your enquiry. Please don’t include payment or health details in your message. Our privacy policy will be linked here once published.</p>
            <CheckboxField name="consent" error={errors.consent}>I agree that Bond Safari may use my details to respond to this enquiry. <span className="text-[#57717b]">Required.</span></CheckboxField>
            <CheckboxField name="marketing">Send me occasional Bond Safari news and offers. <span className="text-[#57717b]">Optional.</span></CheckboxField>
          </div>
        </>
      )}
    </ServiceForm>
  )
}
