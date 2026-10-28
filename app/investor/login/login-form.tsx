'use client'

import { useActionState, useState } from 'react'
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Field, inputClass, primaryButton } from '@/components/academy/form-kit'
import { focusRing } from '@/components/locations/primitives'
import { login } from '../actions'

export function LoginForm({ disabled }: { disabled: boolean }) {
  const [state, action, pending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={action} noValidate className="space-y-5">
      {state?.error && <p role="alert" className="flex gap-2 rounded-xl bg-danger-soft p-3 text-sm font-semibold text-danger"><AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />{state.error}</p>}

      <Field label="User ID or email" error={state?.fieldErrors?.identifier}>
        {(a11y) => <input {...a11y} name="identifier" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} defaultValue={state?.identifier} required disabled={disabled} className={inputClass} />}
      </Field>

      <Field label="Password" error={state?.fieldErrors?.password}>
        {(a11y) => (
          <div className="relative">
            <input {...a11y} name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required disabled={disabled} className={`${inputClass} pr-14`} />
            <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className={`absolute right-1.5 top-1/2 mt-1 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate transition hover:text-ink ${focusRing}`}>
              {showPassword ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
            </button>
          </div>
        )}
      </Field>

      <button type="submit" disabled={disabled || pending} className={`${primaryButton} w-full`}>
        {pending ? <><Loader2 className="mr-2 size-4 animate-spin" aria-hidden />Signing in…</> : <>Sign in<ArrowRight className="ml-2 size-4" aria-hidden /></>}
      </button>
    </form>
  )
}
