'use client'

import { useEffect, useId, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import type { ServiceResult } from '@/lib/academy-service'

export const inputClass = 'mt-2 block min-h-12 w-full rounded-xl border border-[#dfe6e5] bg-[#f8faf8] px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#06263b] outline-none transition focus:border-[#00a9c3] focus:ring-2 focus:ring-[#00a9c3]/30 aria-[invalid=true]:border-[#b42318]'
export const primaryButton = `inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#0b3850] disabled:opacity-60 ${focusRing}`

type FieldProps = { label: string; error?: string; hint?: string; optional?: boolean; children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode }

export function Field({ label, error, hint, optional, children }: FieldProps) {
  const id = useId()
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-[#57717b]">{label}{optional && <span className="ml-1 font-semibold normal-case tracking-normal">(optional)</span>}</label>
      {children({ id, 'aria-invalid': !!error, 'aria-describedby': describedBy })}
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-[#57717b]">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-[#b42318]"><AlertCircle className="size-3.5" aria-hidden />{error}</p>}
    </div>
  )
}

export function TextField({ label, error, hint, optional, ...props }: Omit<FieldProps, 'children'> & InputHTMLAttributes<HTMLInputElement>) {
  return <Field label={label} error={error} hint={hint} optional={optional}>{(a11y) => <input {...a11y} {...props} className={inputClass} />}</Field>
}

export function SelectField({ label, error, hint, optional, options, ...props }: Omit<FieldProps, 'children'> & SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  return (
    <Field label={label} error={error} hint={hint} optional={optional}>
      {(a11y) => <select {...a11y} {...props} className={inputClass}><option value="">Select…</option>{options.map((option) => <option key={option}>{option}</option>)}</select>}
    </Field>
  )
}

export function TextAreaField({ label, error, hint, optional, ...props }: Omit<FieldProps, 'children'> & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <Field label={label} error={error} hint={hint} optional={optional}>{(a11y) => <textarea rows={4} {...a11y} {...props} className={inputClass} />}</Field>
}

export function CheckboxField({ name, children, error }: { name: string; children: ReactNode; error?: string }) {
  const id = useId()
  return (
    <div>
      <label className="flex min-h-11 gap-3 text-sm leading-5 text-[#06263b]">
        <input type="checkbox" name={name} className="mt-0.5 size-5 shrink-0 accent-[#06263b]" aria-invalid={!!error} aria-describedby={error ? id : undefined} />
        <span>{children}</span>
      </label>
      {error && <p id={id} className="ml-8 flex items-center gap-1 text-xs font-semibold text-[#b42318]"><AlertCircle className="size-3.5" aria-hidden />{error}</p>}
    </div>
  )
}

export function DemoBanner({ children }: { children: ReactNode }) {
  return <p className="flex gap-2 rounded-xl bg-[#fff1cf] p-3 text-xs leading-5 text-[#7a4f00]" role="note"><Info className="mt-0.5 size-4 shrink-0" aria-hidden /><span>{children}</span></p>
}

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
export const isPhone = (value: string) => /^\+?[\d\s-]{10,16}$/.test(value)

type Validator = (data: FormData) => Record<string, string>

/**
 * Validates, calls the service, and only shows success when the service actually saved the data.
 * While the backend is not connected, a valid submission shows an honest "not sent" state.
 */
export function ServiceForm({ validate, submit, children, submitLabel, savedMessage }: {
  validate: Validator
  submit: (data: FormData) => Promise<ServiceResult<{ reference: string }>>
  children: (errors: Record<string, string>) => ReactNode
  submitLabel: string
  savedMessage: string
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'saved' | 'not-connected' | 'error'>('idle')
  const [reference, setReference] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  // Synchronous guard so a fast double-click can't submit twice before the button re-renders disabled.
  const inFlight = useRef(false)
  const [attempt, setAttempt] = useState(0)

  // Focus the first invalid field once the error state has rendered.
  useEffect(() => {
    if (attempt) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }, [attempt])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    const data = new FormData(event.currentTarget)
    const next = validate(data)
    setErrors(next)
    if (Object.keys(next).length) {
      setAttempt((n) => n + 1)
      return
    }
    setState('sending')
    inFlight.current = true
    const result = await submit(data).finally(() => { inFlight.current = false })
    if (result.ok) {
      setReference(result.data.reference)
      setState('saved')
    } else setState(result.reason === 'not-connected' ? 'not-connected' : 'error')
  }

  if (state === 'saved') return <p role="status" className="flex gap-3 rounded-2xl bg-[#d9f7ed] p-5 text-sm text-[#14785a]"><CheckCircle2 className="size-5 shrink-0" aria-hidden />{savedMessage} Reference: {reference}</p>

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      {children(errors)}
      <button type="submit" disabled={state === 'sending'} className={`${primaryButton} w-full sm:w-auto`}>
        {state === 'sending' && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />}{submitLabel}
      </button>
      {state === 'not-connected' && <DemoBanner><strong>Demo preview:</strong> your details look good, but this form isn’t connected yet, so nothing was sent or saved.</DemoBanner>}
      {state === 'error' && <p role="alert" className="text-sm font-semibold text-[#b42318]">Something went wrong. Please try again.</p>}
    </form>
  )
}
