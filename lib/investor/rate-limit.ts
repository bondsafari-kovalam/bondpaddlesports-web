import 'server-only'

/**
 * Failed-login limiter held in server memory. On Vercel each serverless instance has its own
 * memory and instances are recycled, so this slows down casual guessing but is not a reliable,
 * global limit. A shared store (e.g. Upstash Redis or Vercel KV) is needed for that.
 */
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 5
const failures = new Map<string, { count: number; resetAt: number }>()

export function isRateLimited(key: string) {
  const entry = failures.get(key)
  if (!entry || entry.resetAt < Date.now()) return false
  return entry.count >= MAX_FAILURES
}

export function recordFailure(key: string) {
  const now = Date.now()
  const entry = failures.get(key)
  if (!entry || entry.resetAt < now) failures.set(key, { count: 1, resetAt: now + WINDOW_MS })
  else entry.count++
  // Keep the map from growing without bound on a long-lived instance.
  if (failures.size > 5000) for (const [k, v] of failures) if (v.resetAt < now) failures.delete(k)
}

export const clearFailures = (key: string) => failures.delete(key)
