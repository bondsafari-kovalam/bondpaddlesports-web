/**
 * Membership catalogue: plans and prices, Season Pass, comparison, Pearl rules and tiers, from the Bond backend
 * (GET /membership). The /membership page reads it live (lib/membership-live.ts); the build snapshot
 * (scripts/sync-catalogue.mjs → lib/generated/catalogue.json) is the fallback. Edit it in the admin panel.
 *
 * Not supplied yet (left undefined, shown as "set by the programme rules"): Pearl earning rates, expiry and
 * redemption limits, tier thresholds, what each Bond Blue option covers (e.g. family size), renewal/expiry terms.
 * Sign-up, payment and member data are not connected.
 */

import catalogue from '@/lib/generated/catalogue.json'

export const MEMBERSHIP_SIGNUP_CONNECTED = false

type ApiOption = { code: string; name: string; price: string; isHighlighted: boolean; coverage: string | null }
type ApiPlan = {
  code: string
  name: string
  tagline: string | null
  description: string | null
  benefits: string[]
  ctaLabel: string | null
  seasonLabel: string | null
  earlyBird: { price: string | null; window: string | null } | null
  options: ApiOption[]
}
/** GET /membership response. */
export type ApiMembership = {
  plans: ApiPlan[]
  tiers: { code: string; name: string; description: string | null; threshold: string | null }[]
  pearlRules: string[]
  comparison: { benefit: string; values: Record<string, string> }[]
}

/** The page is built around these three plans (their codes in the admin panel). */
const PLAN_CODES = ['club', 'bond-blue', 'season-pass'] as const

export type BondBlueOption = { id: string; name: string; price: number; highlight?: boolean; coverage?: string }

export type Plan = {
  id: (typeof PLAN_CODES)[number]
  name: string
  tagline: string
  description: string
  benefits: string[]
  cta: string
}

export type Tier = { name: string; description: string; threshold?: string }

export type SeasonPass = { price: number; season: string; earlyBird: { price: number; window: string }; earlyBirdEnabled: boolean }

/** Everything the membership page shows, in the shapes its sections use. */
export type MembershipData = {
  plans: Plan[]
  bondBlueOptions: BondBlueOption[]
  seasonPass: SeasonPass
  /** Benefit rows with one value per plan, in the plans order. */
  comparison: { benefit: string; values: [string, string, string] }[]
  pearlRules: string[]
  /** Thresholds and earning rates stay undefined until the approved programme rules are supplied. */
  tiers: Tier[]
}

/** Maps the backend catalogue to the page's shapes. Throws when one of the three plans is missing or retired. */
export function toMembershipData(api: ApiMembership): MembershipData {
  const planFor = (code: (typeof PLAN_CODES)[number]) => {
    const plan = api.plans.find((item) => item.code === code)
    if (!plan) throw new Error(`Membership plan "${code}" is missing or retired in the admin panel.`)
    return plan
  }
  const season = planFor('season-pass')
  return {
    plans: PLAN_CODES.map((code) => {
      const plan = planFor(code)
      return { id: code, name: plan.name, tagline: plan.tagline ?? '', description: plan.description ?? '', benefits: plan.benefits, cta: plan.ctaLabel ?? 'Join' }
    }),
    bondBlueOptions: planFor('bond-blue').options.map((option) => ({
      id: option.code,
      name: option.name,
      price: Number(option.price),
      highlight: option.isHighlighted || undefined,
      coverage: option.coverage ?? undefined,
    })),
    seasonPass: {
      price: Number(season.options[0]?.price ?? 0),
      season: season.seasonLabel ?? '',
      earlyBird: { price: Number(season.earlyBird?.price ?? 0), window: season.earlyBird?.window ?? '' },
      // Set in the admin panel; the early-bird price is never shown unless the offer is enabled.
      earlyBirdEnabled: season.earlyBird !== null,
    },
    comparison: api.comparison.map((row) => ({
      benefit: row.benefit,
      values: PLAN_CODES.map((code) => row.values[code] ?? '') as [string, string, string],
    })),
    pearlRules: api.pearlRules,
    tiers: api.tiers.map((tier) => ({ name: tier.name, description: tier.description ?? '', threshold: tier.threshold ?? undefined })),
  }
}

const snapshot = (catalogue as { membership?: ApiMembership }).membership
if (!snapshot) throw new Error('Membership catalogue missing: run `npm run catalogue:sync` against the Bond backend.')

/** Build snapshot (lib/generated/catalogue.json): the fallback when the live API cannot be reached. */
export const SNAPSHOT_MEMBERSHIP: MembershipData = toMembershipData(snapshot)

// Snapshot values for pages that are not live (e.g. About).
export const PLANS = SNAPSHOT_MEMBERSHIP.plans
export const BOND_BLUE_OPTIONS = SNAPSHOT_MEMBERSHIP.bondBlueOptions
export const SEASON_PASS = SNAPSHOT_MEMBERSHIP.seasonPass
export const COMPARISON = SNAPSHOT_MEMBERSHIP.comparison
export const PEARL_RULES = SNAPSHOT_MEMBERSHIP.pearlRules
export const TIERS = SNAPSHOT_MEMBERSHIP.tiers

export function formatRupee(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}
