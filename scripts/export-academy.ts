/**
 * One-time export of the website's hard-coded Academy catalogue (lib/academy.ts at the time of the move) to JSON, so
 * the backend can import it (bondpaddlesports-admin: npm run academy:import -- <file>). Afterwards the backend is
 * the source of truth and the website reads courses from the public API (scripts/sync-catalogue.mjs).
 *
 * Run from this folder with the backend's tsx (it understands the @/ path alias):
 *   node ../bondpaddlesports-admin/node_modules/tsx/dist/cli.mjs --tsconfig tsconfig.json scripts/export-academy.ts out.json
 */
import { writeFileSync } from 'node:fs'
import { COURSE_CATEGORIES, courses } from '../lib/academy'

const out = process.argv[2]
if (!out) {
  console.error('usage: export-academy.ts <output.json>')
  process.exit(1)
}

writeFileSync(
  out,
  `${JSON.stringify({ exportedAt: new Date().toISOString(), categories: COURSE_CATEGORIES, courses }, null, 2)}\n`,
)
console.log(`Exported ${COURSE_CATEGORIES.length} categories and ${courses.length} courses to ${out}`)
