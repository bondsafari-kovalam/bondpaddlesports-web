'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getInvestorConfig } from '@/lib/investor/config'
import { verifyAdminCredentials } from '@/lib/investor/credentials'
import { clearFailures, isRateLimited, recordFailure } from '@/lib/investor/rate-limit'
import { SESSION_COOKIE, createSessionToken, sessionCookieOptions } from '@/lib/investor/session'

export type LoginState = { error?: string; fieldErrors?: { identifier?: string; password?: string }; identifier?: string } | undefined

// One message for every credential failure, so responses don't reveal which part was wrong.
const GENERIC_ERROR = 'The details you entered don’t match our records. Check them and try again.'

/**
 * Server Action: Next.js rejects calls whose Origin doesn't match the host, which covers CSRF for
 * this form; the session cookie is also SameSite=Strict.
 */
export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const identifier = String(formData.get('identifier') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  const fieldErrors: NonNullable<LoginState>['fieldErrors'] = {}
  if (!identifier) fieldErrors.identifier = 'Enter your user ID or email.'
  else if (identifier.length > 254) fieldErrors.identifier = 'That user ID or email is too long.'
  if (!password) fieldErrors.password = 'Enter your password.'
  else if (password.length > 256) fieldErrors.password = 'That password is too long.'
  if (fieldErrors.identifier || fieldErrors.password) return { fieldErrors, identifier }

  const result = getInvestorConfig()
  if (!result.ok) return { error: 'Investor sign-in is not available right now. Please try again later.', identifier }

  const requestHeaders = await headers()
  const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() || requestHeaders.get('x-real-ip') || 'unknown'
  const keys = [`ip:${ip}`, `id:${identifier.toLowerCase()}`]
  if (keys.some(isRateLimited)) return { error: 'Too many unsuccessful attempts. Please wait 15 minutes and try again.', identifier }

  if (!(await verifyAdminCredentials(result.config, identifier, password))) {
    keys.forEach(recordFailure)
    return { error: GENERIC_ERROR, identifier }
  }

  keys.forEach(clearFailures)
  const { token, maxAge } = createSessionToken(result.config)
  ;(await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions(maxAge))
  redirect('/investor/dashboard')
}

export async function logout() {
  ;(await cookies()).set(SESSION_COOKIE, '', sessionCookieOptions(0))
  redirect('/investor/login')
}
