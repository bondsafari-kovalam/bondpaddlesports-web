/**
 * Membership catalogue, Pearls rules and tiers. Source: the client brief.
 *
 * Not supplied yet (left undefined, shown as "set by the programme rules"): Pearl earning rates,
 * expiry and redemption limits, tier thresholds, what each Bond Blue option covers (e.g. family
 * size), renewal/expiry terms. Sign-up, payment and member data are not connected.
 */

export const MEMBERSHIP_SIGNUP_CONNECTED = false

export type BondBlueOption = { id: 'individual' | 'family' | 'digital'; name: string; price: number; highlight?: boolean; coverage?: string }

export const BOND_BLUE_OPTIONS: BondBlueOption[] = [
  { id: 'individual', name: 'Individual', price: 2499, highlight: true },
  { id: 'family', name: 'Family', price: 5999 },
  { id: 'digital', name: 'Digital', price: 999 },
]

export const SEASON_PASS = {
  price: 7999,
  season: 'October–May',
  earlyBird: { price: 6399, window: 'June–September' },
  /** Set by the business; the early-bird price is never shown unless this is true. */
  earlyBirdEnabled: false,
}

export type Plan = {
  id: 'club' | 'bond-blue' | 'season-pass'
  name: string
  tagline: string
  description: string
  benefits: string[]
  cta: string
}

export const PLANS: Plan[] = [
  {
    id: 'club',
    name: 'Bond Safari Club',
    tagline: 'Your adventure starts here.',
    description: 'Join the Bond Safari community and start earning rewards across participating Bond businesses.',
    benefits: [
      'Free membership',
      'Shared member ID across participating Bond businesses',
      'Earn Pearls on eligible purchases',
      'Redeem Pearls for discounts',
      'Access your membership details from your account',
      'Relevant member updates, if you choose to opt in',
    ],
    cta: 'Join free',
  },
  {
    id: 'bond-blue',
    name: 'Bond Blue',
    tagline: 'More adventures. More member benefits.',
    description: 'An annual membership for people who paddle often.',
    benefits: [
      '15% off eligible activities and purchases, subject to applicable terms',
      'Double Pearls on eligible transactions',
      'One free paddle hour per month, subject to availability and booking rules',
      'Digital membership pass',
      'Member benefits at participating Bond Safari locations',
    ],
    cta: 'Explore Bond Blue',
  },
  {
    id: 'season-pass',
    name: 'Paddle Season Pass',
    tagline: 'Make the most of paddle season.',
    description: `Unlimited paddling through the ${SEASON_PASS.season} season.`,
    benefits: [
      'Unlimited paddling at participating operating sites during the season',
      'Reservations subject to capacity and fair-use rules',
      'Digital pass for convenient member identification',
      'Access to eligible activities under the pass conditions',
      'Book your seat even when the session price is ₹0',
    ],
    cta: 'Get the Season Pass',
  },
]

export const COMPARISON: { benefit: string; values: [string, string, string] }[] = [
  { benefit: 'Free to join', values: ['Yes', 'No', 'No'] },
  { benefit: 'Earn Pearls', values: ['On eligible purchases', 'Double Pearls on eligible transactions', 'As defined by the programme rules'] },
  { benefit: 'Activity discount', values: ['Standard eligible rewards', '15% on eligible purchases', 'Covered paddling, subject to pass terms'] },
  { benefit: 'Monthly free paddle hour', values: ['No', 'One, subject to availability', 'Not applicable'] },
  { benefit: 'Unlimited seasonal paddling', values: ['No', 'No', 'Yes, subject to capacity and fair use'] },
  { benefit: 'Digital member identification', values: ['Account / member ID', 'Digital pass', 'Digital pass'] },
]

export const PEARL_RULES = [
  '1 Pearl = ₹1 discount when redeemed under the programme rules.',
  'Pearls can be redeemed for eligible discounts.',
  'Pearls are not cash and cannot be exchanged or transferred for cash.',
  'Expiry and redemption are subject to the approved loyalty programme rules.',
  'Eligible purchases and redemption limits may vary by business.',
]

export type Tier = { name: string; description: string; threshold?: string }

/** Thresholds and earning rates stay undefined until the approved programme rules are supplied. */
export const TIERS: Tier[] = [
  { name: 'Shore', description: 'Your starting tier.' },
  { name: 'Reef', description: 'Progress through eligible activity.' },
  { name: 'Ocean', description: 'Progress through eligible activity.' },
  { name: 'Abyss', description: 'Our highest tier.' },
]

export function formatRupee(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}
