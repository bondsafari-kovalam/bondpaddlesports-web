import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getInvestorConfig, type InvestorConfig } from './config'

/**
 * Stateless signed session for the single demo administrator. No database: the cookie carries
 * the claims plus an HMAC-SHA256 signature, and every protected request re-verifies both.
 *
 * Limitation: without persistent storage a session can't be revoked individually. Logout deletes
 * the cookie, but a copied token stays valid until it expires (SESSION_HOURS). To end every
 * session at once, change INVESTOR_SESSION_SECRET or INVESTOR_ADMIN_PASSWORD and redeploy.
 */
export const SESSION_COOKIE = 'bond_investor_session'
const SESSION_HOURS = 8

export type InvestorSession = { sub: 'admin'; role: 'admin'; iat: number; exp: number }

// The password is mixed into the key so changing it also invalidates existing sessions.
const signingKey = (config: InvestorConfig) => createHmac('sha256', config.sessionSecret).update(`investor-session:${config.password}`).digest()
const sign = (payload: string, config: InvestorConfig) => createHmac('sha256', signingKey(config)).update(payload).digest('base64url')

export function createSessionToken(config: InvestorConfig) {
  const now = Math.floor(Date.now() / 1000)
  const session: InvestorSession = { sub: 'admin', role: 'admin', iat: now, exp: now + SESSION_HOURS * 3600 }
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url')
  return { token: `${payload}.${sign(payload, config)}`, maxAge: SESSION_HOURS * 3600 }
}

function verifySessionToken(token: string | undefined, config: InvestorConfig): InvestorSession | null {
  const [payload, signature] = token?.split('.') ?? []
  if (!payload || !signature) return null
  const expected = Buffer.from(sign(payload, config))
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as InvestorSession
    if (session.sub !== 'admin' || session.role !== 'admin' || typeof session.exp !== 'number') return null
    return session.exp > Date.now() / 1000 ? session : null
  } catch {
    return null
  }
}

/** The verified session, or null. Never trusts anything the browser sends except the signed cookie. */
export async function getInvestorSession() {
  // Read the cookie before anything else: it marks every caller as per-request, so a portal page
  // can never be prerendered at build time (e.g. a static redirect baked in when env vars are absent).
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  const result = getInvestorConfig()
  if (!result.ok) return null
  return verifySessionToken(token, result.config)
}

/** For protected pages: returns the session or redirects to the login page. */
export async function requireInvestorSession() {
  const session = await getInvestorSession()
  if (!session) redirect('/investor/login')
  return session
}

export const sessionCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  // Scoped to the portal, so the cookie isn't sent with requests to the public site.
  path: '/investor',
  maxAge,
})
