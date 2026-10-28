import 'server-only'
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import type { InvestorConfig } from './config'

const scrypt = promisify(scryptCallback) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>
const KEY_LENGTH = 64

/**
 * INVESTOR_ADMIN_PASSWORD may be the plain password or, preferably, a hash made with
 * `node scripts/hash-investor-password.mjs` in the form `scrypt:<salt base64>:<hash base64>`.
 * Either way the submitted password is run through scrypt and compared in constant time.
 */
async function storedHash(password: string): Promise<{ salt: Buffer; hash: Buffer }> {
  const [scheme, salt, hash] = password.split(':')
  if (scheme === 'scrypt' && salt && hash) return { salt: Buffer.from(salt, 'base64'), hash: Buffer.from(hash, 'base64') }
  // Plain value: hash it once per server instance with a random salt.
  plainCache ??= (async () => { const s = randomBytes(16); return { salt: s, hash: await scrypt(password, s, KEY_LENGTH) } })()
  return plainCache
}
let plainCache: Promise<{ salt: Buffer; hash: Buffer }> | undefined

const digest = (value: string) => createHash('sha256').update(value).digest()
const sameText = (a: string, b: string) => timingSafeEqual(digest(a), digest(b))

/** True only when the identifier (user ID or email) and password both match the configured admin. */
export async function verifyAdminCredentials(config: InvestorConfig, identifier: string, password: string) {
  const id = identifier.trim()
  // Compare both identifiers and always hash the password, so timing doesn't reveal which part was wrong.
  const idMatches = sameText(id, config.userId) || sameText(id.toLowerCase(), config.email)
  const { salt, hash } = await storedHash(config.password)
  const attempt = await scrypt(password, salt, hash.length || KEY_LENGTH)
  const passwordMatches = attempt.length === hash.length && timingSafeEqual(attempt, hash)
  return idMatches && passwordMatches
}
