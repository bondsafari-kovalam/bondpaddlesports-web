'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'
import { CheckboxField, SelectField, ServiceForm, TextAreaField, TextField, isEmail } from '@/components/academy/form-kit'
import { focusRing } from '@/components/locations/primitives'
import { cn } from '@/lib/utils'
import { BUDGET_OPTIONS, ENQUIRY_TYPES, GROUP_LOCATIONS, OPEN_TO_RECOMMENDATIONS, TIME_OPTIONS, activityOptionsFor, type EnquiryType } from '@/lib/groups'
import { STATUS_LABELS } from '@/lib/locations'
import { submitGroupEnquiry } from '@/lib/enquiry-service'

type Preset = { type?: EnquiryType; activity?: string; location?: string }
type Ctx = { preset: Preset; choose: (preset: Preset) => void }

const EnquiryContext = createContext<Ctx>({ preset: {}, choose: () => {} })
export const ENQUIRY_ID = 'enquiry'

export function GroupEnquiryProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<Preset>({})
  return <EnquiryContext.Provider value={{ preset, choose: (next) => setPreset((current) => ({ ...current, ...next })) }}>{children}</EnquiryContext.Provider>
}

/** Scrolls to the enquiry form and preselects the matching enquiry type, activity or location. */
export function EnquiryButton({ children, preset = {}, className = '' }: { children: ReactNode; preset?: Preset; className?: string }) {
  const { choose } = useContext(EnquiryContext)
  return (
    <a
      href={`#${ENQUIRY_ID}`}
      onClick={() => {
        choose(preset)
        // Move focus to the form heading after the smooth scroll so keyboard users land there too.
        window.setTimeout(() => document.getElementById('enquiry-title')?.focus({ preventScroll: true }), 400)
      }}
      className={cn(focusRing, className)}
    >
      {children}
    </a>
  )
}

const INDIAN_PHONE = /^(\+91[\s-]?)?[6-9]\d{9}$/

function todayISO() {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

export function GroupEnquiryForm() {
  const { preset, choose } = useContext(EnquiryContext)
  const [today, setToday] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  useEffect(() => setToday(todayISO()), [])

  const location = GROUP_LOCATIONS.find((l) => l.slug === preset.location)
  const activityOptions = [...activityOptionsFor(preset.location), OPEN_TO_RECOMMENDATIONS]
  const activity = preset.activity && activityOptions.includes(preset.activity) ? preset.activity : ''

  return (
    <ServiceForm
      submitLabel="Submit group enquiry"
      savedMessage="Thank you for your enquiry. The Bond Safari team has received your request and will review the details."
      validate={(data) => {
        const e: Record<string, string> = {}
        // Honeypot: real visitors never see or fill this field.
        if (String(data.get('website') ?? '')) e.website = 'Submission blocked.'
        if (!String(data.get('name') ?? '').trim()) e.name = 'Enter your full name.'
        if (!isEmail(String(data.get('email') ?? ''))) e.email = 'Enter a valid email address.'
        if (!INDIAN_PHONE.test(String(data.get('phone') ?? '').replace(/\s/g, ''))) e.phone = 'Enter a 10-digit Indian mobile number, e.g. +91 98765 43210.'
        if (!data.get('type')) e.type = 'Choose the type of group.'
        const count = Number(data.get('participants'))
        if (!data.get('participants') || !Number.isInteger(count) || count < 1) e.participants = 'Enter an estimated number of participants.'
        const date = String(data.get('date') ?? '')
        if (date && today && date < today) e.date = 'Choose a date from today onwards.'
        const alt = String(data.get('altDate') ?? '')
        if (alt && today && alt < today) e.altDate = 'Choose a date from today onwards.'
        if (!data.get('consent')) e.consent = 'Please agree so we can use your details to respond to this enquiry.'
        return e
      }}
      submit={(data) => submitGroupEnquiry(Object.fromEntries([...data.entries()].filter(([key]) => key !== 'website')))}
    >
      {(errors) => (
        <>
          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-bold">Contact details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Full name" name="name" autoComplete="name" error={errors.name} />
              <TextField label="Organisation or group name" name="organisation" autoComplete="organization" optional />
              <TextField label="Work or contact email" name="email" type="email" autoComplete="email" error={errors.email} />
              <TextField label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" error={errors.phone} />
            </div>
          </fieldset>

          <fieldset className="space-y-4 border-t border-mist pt-6">
            <legend className="font-display text-lg font-bold">Group details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Enquiry type" name="type" options={[...ENQUIRY_TYPES]} value={preset.type ?? ''} onChange={(e) => choose({ type: (e.target.value || undefined) as EnquiryType | undefined })} error={errors.type} />
              <TextField label="Estimated number of participants" name="participants" inputMode="numeric" error={errors.participants} />
              <SelectField
                label="Preferred location"
                name="location"
                optional
                options={GROUP_LOCATIONS.map((l) => `${l.name}${l.status === 'operating' ? '' : ` (${STATUS_LABELS[l.status].toLowerCase()})`}`)}
                value={location ? `${location.name}${location.status === 'operating' ? '' : ` (${STATUS_LABELS[location.status].toLowerCase()})`}` : ''}
                onChange={(e) => choose({ location: GROUP_LOCATIONS.find((l) => e.target.value.startsWith(l.name))?.slug, activity: undefined })}
                hint={location && location.status !== 'operating' ? `${location.name} isn’t open yet${location.plannedOpening ? ` (planned ${location.plannedOpening})` : ''}. We can note your interest.` : undefined}
              />
              <SelectField label="Preferred activity" name="activity" optional options={activityOptions} value={activity} onChange={(e) => choose({ activity: e.target.value || undefined })} hint="The team confirms which activities run at each location." />
              <TextField label="Preferred date" name="date" type="date" min={today || undefined} optional value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} error={errors.date} />
              <TextField label="Alternative date" name="altDate" type="date" min={preferredDate || today || undefined} optional error={errors.altDate} />
              <SelectField label="Preferred time" name="time" optional options={TIME_OPTIONS} />
              <SelectField label="Approximate budget per person" name="budget" optional options={BUDGET_OPTIONS} />
            </div>
            <TextAreaField label="Additional requirements" name="requirements" optional hint="For example: student or corporate event details, accessibility needs, participant age ranges, swimming ability questions, transport or timing." />
          </fieldset>

          {/* Honeypot field for basic spam protection; hidden from people and assistive tech. */}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <div className="space-y-3 border-t border-mist pt-6">
            <p className="flex gap-2 text-xs leading-5 text-slate"><ShieldCheck className="size-4 shrink-0 text-success" aria-hidden />We use these details only to respond to your group enquiry and plan your experience. An enquiry is not a booking.</p>
            <CheckboxField name="consent" error={errors.consent}>I agree that Bond Safari may use my details to respond to this enquiry. <span className="text-slate">Required.</span></CheckboxField>
            <CheckboxField name="marketing">Send me occasional Bond Safari news and offers. <span className="text-slate">Optional.</span></CheckboxField>
          </div>
        </>
      )}
    </ServiceForm>
  )
}
