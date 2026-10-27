'use client'

import { CheckboxField, SelectField, ServiceForm, TextAreaField, TextField, isEmail, isPhone } from '@/components/academy/form-kit'
import { SHOP_CATEGORIES } from '@/lib/shop'
import { submitShopEnquiry } from '@/lib/shop-service'

export const GSTIN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/

export function BulkOrderForm() {
  return (
    <ServiceForm
      submitLabel="Request a bulk order quote"
      savedMessage="Thanks — our team will prepare your quote."
      validate={(d) => {
        const e: Record<string, string> = {}
        if (!String(d.get('organisation') ?? '').trim()) e.organisation = 'Enter your organisation name.'
        if (!String(d.get('name') ?? '').trim()) e.name = 'Enter a contact name.'
        if (!isEmail(String(d.get('email') ?? ''))) e.email = 'Enter a valid email address.'
        const phone = String(d.get('phone') ?? '')
        if (phone && !isPhone(phone)) e.phone = 'Enter a valid phone number.'
        const qty = Number(d.get('quantity'))
        if (!d.get('quantity') || !Number.isInteger(qty) || qty < 1) e.quantity = 'Enter an approximate quantity.'
        const gst = String(d.get('gst') ?? '').trim().toUpperCase()
        if (gst && !GSTIN.test(gst)) e.gst = 'Enter a valid 15-character GSTIN.'
        if (!d.get('consent')) e.consent = 'Please confirm we may contact you about this quote.'
        return e
      }}
      submit={(d) => submitShopEnquiry('bulk-order', Object.fromEntries(d.entries()))}
    >
      {(errors) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Organisation" name="organisation" autoComplete="organization" error={errors.organisation} />
            <TextField label="Contact name" name="name" autoComplete="name" error={errors.name} />
            <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
            <TextField label="Phone" name="phone" type="tel" autoComplete="tel" optional error={errors.phone} />
            <SelectField label="Product interest" name="interest" options={SHOP_CATEGORIES.map((c) => c.name)} optional />
            <TextField label="Approximate quantity" name="quantity" inputMode="numeric" error={errors.quantity} />
            <TextField label="Required delivery date" name="date" type="date" optional />
            <TextField label="GST number" name="gst" optional hint="For a GST invoice." error={errors.gst} />
          </div>
          <TextAreaField label="Branding or customisation" name="branding" optional />
          <CheckboxField name="consent" error={errors.consent}>Contact me about this quote. <span className="text-slate">Required.</span></CheckboxField>
        </>
      )}
    </ServiceForm>
  )
}
