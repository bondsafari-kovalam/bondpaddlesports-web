/**
 * Client for the Bond backend's PUBLIC API (forms, booking requests, live session slots). Called from the browser so
 * each visitor gets their own rate limit; the public endpoints hold no secrets.
 *
 * NEXT_PUBLIC_BOND_API_URL  backend base URL including /api/v1, e.g. https://api.bondpaddlesports.com/api/v1.
 * Unset = not connected: every call answers `not-connected` and the UI keeps its honest demo notice. The backend
 * must list the website origin in CORS_ALLOWED_ORIGINS.
 */

export const BOND_API_URL = (process.env.NEXT_PUBLIC_BOND_API_URL ?? '').replace(/\/+$/, '')
export const BOND_API_CONNECTED = BOND_API_URL !== ''

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: 'not-connected' | 'error'; message: string; status?: number; code?: string; fields?: Record<string, string> }

const notConnected = { ok: false as const, reason: 'not-connected' as const, message: 'This service is not connected yet.' }

/** POST/GET JSON to the public API, mapped to ApiResult. Never throws. */
export async function bondApi<T>(path: string, options: { method?: 'GET' | 'POST'; body?: unknown; idempotencyKey?: string; headers?: Record<string, string> } = {}): Promise<ApiResult<T>> {
  if (!BOND_API_CONNECTED) return notConnected
  try {
    const response = await fetch(`${BOND_API_URL}${path}`, {
      method: options.method ?? (options.body === undefined ? 'GET' : 'POST'),
      headers: {
        accept: 'application/json',
        ...(options.body === undefined ? {} : { 'content-type': 'application/json' }),
        ...(options.idempotencyKey ? { 'Idempotency-Key': options.idempotencyKey } : {}),
        ...options.headers,
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })
    const payload = await response.json().catch(() => null)
    if (response.ok && payload?.success) return { ok: true, data: payload.data as T }
    const error = payload?.error
    const fields: Record<string, string> = {}
    if (Array.isArray(error?.details)) {
      for (const issue of error.details) {
        if (typeof issue?.field === 'string' && typeof issue?.message === 'string') fields[issue.field.replace(/^(body|query|params)\./, '')] ??= issue.message
      }
    }
    return { ok: false, reason: 'error', status: response.status, code: error?.code, message: error?.message ?? 'Something went wrong.', fields }
  } catch {
    return { ok: false, reason: 'error', message: 'Cannot reach the server. Check your connection and try again.' }
  }
}

/** "+91 98765 43210", "98765 43210", "09876543210", "919876543210" → "+919876543210". Undefined when empty. */
export function toE164(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const raw = value.replace(/[\s()-]/g, '')
  if (!raw) return undefined
  if (raw.startsWith('+')) return raw
  if (/^0\d{10}$/.test(raw)) return `+91${raw.slice(1)}`
  if (/^\d{10}$/.test(raw)) return `+91${raw}`
  if (/^91\d{10}$/.test(raw)) return `+${raw}`
  return `+${raw}`
}

/** Form value → trimmed string, or undefined when empty (the API rejects empty strings for optional fields). */
export function text(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed === '' ? undefined : trimmed
}

/** Checkbox value ("on" when ticked). */
export const checked = (value: unknown) => value === 'on' || value === 'true' || value === true

/** Whole number from a form value, or undefined. */
export function whole(value: unknown): number | undefined {
  const number = Number(typeof value === 'string' ? value.trim() : value)
  return Number.isInteger(number) && number > 0 ? number : undefined
}

/** Website option label → backend key by position (the lists are kept in the same order). */
export function keyFor<K extends string>(label: unknown, labels: readonly string[], keys: readonly K[]): K | undefined {
  const index = typeof label === 'string' ? labels.indexOf(label) : -1
  return index >= 0 ? keys[index] : undefined
}

/** Drops undefined values so strict API bodies only receive real fields. */
export function compact<T extends Record<string, unknown>>(values: T): Partial<T> {
  return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== undefined)) as Partial<T>
}

/** A random Idempotency-Key for one submission attempt (retries of the same attempt reuse it). */
export function newIdempotencyKey() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** Shapes a public enquiry answer `{ received, reference }` into the forms' ServiceResult. */
export async function submitEnquiryTo(path: string, body: Record<string, unknown>) {
  const result = await bondApi<{ received: true; reference: string }>(path, { body: compact(body), idempotencyKey: newIdempotencyKey() })
  return result.ok ? { ok: true as const, data: { reference: result.data.reference } } : result
}
