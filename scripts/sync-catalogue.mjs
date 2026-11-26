/**
 * Pulls the activity & location catalogue from the Bond backend's PUBLIC API and writes lib/generated/catalogue.json
 * in the website's own shapes (lib/activities.ts, lib/locations.ts read it). Runs before every build (`prebuild`)
 * and on demand:  pnpm catalogue:sync   (or: node scripts/sync-catalogue.mjs [--strict])
 *
 * BOND_API_URL  backend base URL including /api/v1, e.g. https://api.bondpaddlesports.com/api/v1
 *               (default http://localhost:3000/api/v1). Server-side only — never NEXT_PUBLIC_.
 *
 * If the API cannot be reached the last snapshot is kept and the build continues (a warning is printed), so a
 * backend outage never breaks a deploy. `--strict` turns that into a failure (use it in CI to catch drift).
 * The mapping lives in lib/catalogue-mapping.mjs (shared with the live loader, lib/catalogue-live.ts).
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toActivity, toCourse, toCourseCategory, toCourseSession, toLocation } from '../lib/catalogue-mapping.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(root, 'lib', 'generated', 'catalogue.json')
const API = (process.env.BOND_API_URL || 'http://localhost:3000/api/v1').replace(/\/+$/, '')
const strict = process.argv.includes('--strict')

async function get(path) {
  const response = await fetch(`${API}${path}`, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(15_000) })
  if (!response.ok) throw new Error(`${path} → HTTP ${response.status}`)
  const body = await response.json()
  if (!body?.success) throw new Error(`${path} → unexpected response`)
  return body.data
}

async function main() {
  const [locationList, activityList] = await Promise.all([
    get('/locations?limit=100&sort=recommended'),
    get('/activities?limit=100&sort=recommended'),
  ])
  const activities = []
  for (const summary of activityList) {
    const [detail, offerings] = await Promise.all([get(`/activities/${summary.slug}`), get(`/activities/${summary.slug}/locations?limit=100`)])
    activities.push(toActivity(detail, offerings))
  }
  // The list omits long fields (description, facilities, safety…): read each location's detail record.
  const locations = await Promise.all(locationList.map(async (summary) => toLocation({ ...summary, ...(await get(`/locations/${summary.slug}`)) })))
  // Academy: categories, published courses and upcoming course dates.
  const [courseCategories, courses, batches] = await Promise.all([get('/academy/categories'), get('/academy/courses'), get('/academy/batches')])
  const academy = { categories: courseCategories.map(toCourseCategory), courses: courses.map(toCourse), sessions: batches.map(toCourseSession) }
  // Membership: plans and prices, tiers, Pearl rules, comparison (lib/membership.ts maps it to the page's shapes).
  const membership = await get('/membership')
  const catalogue = { syncedAt: new Date().toISOString(), source: API, locations, activities, academy, membership }
  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, `${JSON.stringify(catalogue, null, 2)}\n`)
  console.log(`Catalogue synced from ${API}: ${catalogue.locations.length} locations, ${activities.length} activities, ${academy.courses.length} courses, ${academy.sessions.length} course dates, ${membership.plans.length} membership plans.`)
}

main().catch((error) => {
  const message = `Catalogue sync failed (${error.message}). Keeping the last snapshot in lib/generated/catalogue.json.`
  if (strict) {
    console.error(message)
    process.exit(1)
  }
  console.warn(`⚠ ${message}`)
})
