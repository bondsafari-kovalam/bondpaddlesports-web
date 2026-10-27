'use client'

import { createContext, useContext, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Bell, CheckCircle2, X } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'

/** `event` completes “We’ll message you when {name} …”, e.g. “opens for enrolment” for courses. */
type Target = { name: string; slug: string; event?: string; title?: string }
type ContactMethod = 'email' | 'whatsapp'

const NotifyMeContext = createContext<(target: Target) => void>(() => {})

export function NotifyMeProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<Target | null>(null)
  return (
    <NotifyMeContext.Provider value={setTarget}>
      {children}
      {target && <NotifyMeDialog key={target.slug} target={target} onClose={() => setTarget(null)} />}
    </NotifyMeContext.Provider>
  )
}

export function NotifyMeButton({ name, slug, event, title, label = 'Notify me', variant = 'outline', className = '' }: Target & { label?: string; variant?: 'outline' | 'solid' | 'ink' | 'text' | 'onDark'; className?: string }) {
  const open = useContext(NotifyMeContext)
  const styles = {
    solid: 'rounded-full bg-sand px-5 py-3 text-sm font-semibold text-ink hover:bg-white',
    ink: 'rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink-soft',
    outline: 'rounded-full border border-ink/20 px-4 py-2.5 text-sm font-semibold text-ink hover:border-ink hover:bg-ink hover:text-white',
    text: 'text-sm font-bold text-teal hover:text-ink',
    onDark: 'rounded-full px-2 py-1 text-sm font-bold text-teal-pale hover:text-white',
  }[variant]
  return (
    <button type="button" onClick={() => open({ name, slug, event, title })} className={`inline-flex items-center justify-center gap-2 transition ${styles} ${focusRing} ${className}`} aria-label={`${label}: ${name}`}>
      <Bell className="size-4" aria-hidden /> {label}
    </button>
  )
}

function NotifyMeDialog({ target, onClose }: { target: Target; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const id = useId()
  const [method, setMethod] = useState<ContactMethod>('email')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const contact = String(data.get('contact') ?? '').trim()
    const next: Record<string, string> = {}
    if (method === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) next.contact = 'Enter a valid email address.'
    if (method === 'whatsapp' && !/^\+?[\d\s-]{10,16}$/.test(contact)) next.contact = 'Enter a valid mobile number, including country code if outside India.'
    if (!data.get('consent')) next.consent = 'Please confirm you would like to be notified.'
    setErrors(next)
    // No notification backend is configured yet: nothing is sent or stored.
    if (Object.keys(next).length === 0) setSubmitted(true)
  }

  const fieldClass = `mt-2 block w-full rounded-xl border border-line bg-paper-bright px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/30`

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby={`${id}-title`} className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-0 text-ink shadow-[0_30px_80px_color-mix(in_srgb,var(--color-ink)_35%,transparent)] backdrop:bg-ink/60 backdrop:backdrop-blur-sm">
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">{target.title ?? 'Notify me'}</p>
            <h2 id={`${id}-title`} className="mt-2 font-display text-2xl font-bold">{target.name}</h2>
          </div>
          <button type="button" onClick={() => ref.current?.close()} className={`flex size-9 shrink-0 items-center justify-center rounded-full border border-line ${focusRing}`} aria-label="Close"><X className="size-4" /></button>
        </div>

        {submitted ? (
          <div className="mt-6" role="status">
            <CheckCircle2 className="size-8 text-success" />
            <p className="mt-3 font-bold">Thanks — your request looks good.</p>
            <p className="mt-2 rounded-xl bg-sand-soft p-3 text-sm leading-6 text-sand-ink"><strong>Demo preview:</strong> the notification service is not connected yet, so your details were not sent or saved and you will not receive a message.</p>
            <button type="button" onClick={() => ref.current?.close()} className={`mt-6 w-full rounded-2xl bg-ink px-5 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-white ${focusRing}`}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <p className="text-sm leading-6 text-slate">We’ll send one message when {target.name} {target.event ?? 'opens for bookings'}.</p>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate">Name <span className="font-semibold normal-case tracking-normal">(optional)</span>
              <input name="name" autoComplete="name" className={fieldClass} />
            </label>
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-wider text-slate">Preferred contact method</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(['email', 'whatsapp'] as const).map((option) => (
                  <label key={option} className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-sm font-bold transition has-focus-visible:ring-2 has-focus-visible:ring-teal ${method === option ? 'border-ink bg-ink text-white' : 'border-line bg-paper-bright'}`}>
                    <input type="radio" name="method" value={option} checked={method === option} onChange={() => setMethod(option)} className="sr-only" />
                    {option === 'email' ? 'Email' : 'WhatsApp / SMS'}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate">{method === 'email' ? 'Email address' : 'Mobile number'}
              <input name="contact" type={method === 'email' ? 'email' : 'tel'} autoComplete={method === 'email' ? 'email' : 'tel'} required aria-invalid={!!errors.contact} aria-describedby={errors.contact ? `${id}-contact` : undefined} className={fieldClass} />
              {errors.contact && <span id={`${id}-contact`} className="mt-1.5 block text-xs font-semibold normal-case tracking-normal text-danger">{errors.contact}</span>}
            </label>
            <label className="flex gap-3 text-sm leading-5 text-ink">
              <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-ink" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? `${id}-consent` : undefined} />
              <span>Contact me once when {target.name} {target.event ?? 'opens'}. <span className="text-slate">Required for this notification.</span>{errors.consent && <span id={`${id}-consent`} className="mt-1 block text-xs font-semibold text-danger">{errors.consent}</span>}</span>
            </label>
            <label className="flex gap-3 text-sm leading-5 text-ink">
              <input type="checkbox" name="marketing" className="mt-0.5 size-4 shrink-0 accent-ink" />
              <span>Also send me Bond Safari news and offers. <span className="text-slate">Optional.</span></span>
            </label>
            <button type="submit" className={`w-full rounded-2xl bg-ink px-5 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-ink-soft ${focusRing}`}>Notify me</button>
            <p className="text-center text-xs text-slate">Demo form — submissions are not saved.</p>
          </form>
        )}
      </div>
    </dialog>
  )
}
