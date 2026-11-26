/**
 * One-time export of the website's hard-coded membership catalogue (lib/membership.ts at the time of the move) to
 * JSON, so the backend can import it (bondpaddlesports-admin: npm run membership:import -- <file>). Afterwards the
 * backend is the source of truth and the website reads it from GET /membership (scripts/sync-catalogue.mjs).
 *
 * Run from this folder with the backend's tsx (it understands the @/ path alias):
 *   node ../bondpaddlesports-admin/node_modules/tsx/dist/cli.mjs --tsconfig tsconfig.json scripts/export-membership.ts out.json
 */
import { writeFileSync } from 'node:fs'
import { BOND_BLUE_OPTIONS, COMPARISON, PEARL_RULES, PLANS, SEASON_PASS, TIERS } from '../lib/membership'

const out = process.argv[2]
if (!out) {
  console.error('usage: export-membership.ts <output.json>')
  process.exit(1)
}

const data = { exportedAt: new Date().toISOString(), plans: PLANS, bondBlueOptions: BOND_BLUE_OPTIONS, seasonPass: SEASON_PASS, comparison: COMPARISON, pearlRules: PEARL_RULES, tiers: TIERS }
writeFileSync(out, `${JSON.stringify(data, null, 2)}\n`)
console.log(`Exported ${PLANS.length} plans, ${TIERS.length} tiers to ${out}`)
