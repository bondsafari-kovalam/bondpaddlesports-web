'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { CheckboxField, SelectField, ServiceForm, TextAreaField, TextField, isEmail } from '@/components/academy/form-kit'
import { activities } from '@/lib/activities'
import { locations } from '@/lib/locations'

/**
 * Feedback goes to the team, not straight onto the site. Integration still required: a server
 * route that validates and stores feedback (shared Bond `POST /enquiries`, kind "feedback") and a
 * moderation step before anything is published as a public review.
 */
async function submitFeedback(_payload: Record<string, unknown>) {
  return { ok: false as const, reason: 'not-connected' as const, message: 'Feedback submission is not connected yet.' }
}

const experienceOptions = [
  ...locations.filter((l) => l.status === 'operating').map((l) => l.name),
  ...activities.filter((a) => a.featured).map((a) => a.name),
  'Academy',
  'Group or corporate experience',
]

export function FeedbackForm() {
  const [rating, setRating] = useState(0)
  return (
    <ServiceForm
      submitLabel="Share your feedback"
      savedMessage="Thank you — your feedback has been received by the Bond Safari team."
      validate={(data) => {
        const e: Record<string, string> = {}
        const email = String(data.get('email') ?? '').trim()
        if (email && !isEmail(email)) e.email = 'Enter a valid email address, or leave it blank.'
        if (String(data.get('message') ?? '').trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).'
        if (!data.get('consent')) e.consent = 'Please confirm we may use your feedback as described.'
        return e
      }}
      submit={(data) => submitFeedback({ ...Object.fromEntries(data.entries()), rating: rating || undefined })}
    >
      {(errors) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" name="name" autoComplete="name" optional />
            <TextField label="Email" name="email" type="email" autoComplete="email" optional hint="Only if you’d like a reply." error={errors.email} />
          </div>
          <SelectField label="Activity or location" name="experience" options={experienceOptions} optional />
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-wider text-[#57717b]">Rating <span className="font-semibold normal-case tracking-normal">(optional)</span></legend>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex size-11 cursor-pointer items-center justify-center rounded-xl has-focus-visible:ring-2 has-focus-visible:ring-[#00a9c3]">
                  <input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} className="sr-only" />
                  <Star className={`size-6 ${value <= rating ? 'fill-[#f5b82e] text-[#f5b82e]' : 'text-[#c7d2d0]'}`} aria-hidden />
                  <span className="sr-only">{value} star{value > 1 ? 's' : ''}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <TextAreaField label="Your feedback" name="message" error={errors.message} />
          <p className="text-xs leading-5 text-[#57717b]">Your feedback goes to the Bond Safari team to help us improve. It isn’t published automatically; we’d ask your permission before sharing any part of it publicly.</p>
          <CheckboxField name="consent" error={errors.consent}>I agree that Bond Safari may store and use this feedback to review and improve its experiences. <span className="text-[#57717b]">Required.</span></CheckboxField>
        </>
      )}
    </ServiceForm>
  )
}
