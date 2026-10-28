import 'server-only'

/**
 * Investor portal configuration, read on the server only. Values come from Vercel environment
 * variables; none of them may use the NEXT_PUBLIC_ prefix, so they never reach the browser bundle.
 */
export type InvestorConfig = { userId: string; email: string; password: string; sessionSecret: string }

const REQUIRED = ['INVESTOR_ADMIN_USER_ID', 'INVESTOR_ADMIN_EMAIL', 'INVESTOR_ADMIN_PASSWORD', 'INVESTOR_SESSION_SECRET'] as const

/** Shorter secrets are treated as missing so a weak value can't quietly sign sessions. */
const MIN_SECRET_LENGTH = 32

export type ConfigResult = { ok: true; config: InvestorConfig } | { ok: false; problems: string[] }

export function getInvestorConfig(): ConfigResult {
  const problems: string[] = REQUIRED.filter((name) => !process.env[name]?.trim()).map((name) => `${name} is not set`)
  const secret = process.env.INVESTOR_SESSION_SECRET?.trim() ?? ''
  if (secret && secret.length < MIN_SECRET_LENGTH) problems.push(`INVESTOR_SESSION_SECRET must be at least ${MIN_SECRET_LENGTH} characters`)
  if (problems.length) return { ok: false, problems }
  return {
    ok: true,
    config: {
      userId: process.env.INVESTOR_ADMIN_USER_ID!.trim(),
      email: process.env.INVESTOR_ADMIN_EMAIL!.trim().toLowerCase(),
      password: process.env.INVESTOR_ADMIN_PASSWORD!,
      sessionSecret: secret,
    },
  }
}
