import 'server-only'

/**
 * CONFIDENTIAL. The regional network plan from "Bond Paddle Sports Hub-and-Spoke Network" (28 October 2026),
 * transcribed from the brief supplied by the Bond team. Scores are the document's preliminary desk
 * assessments; rollout waves are proposals. Nothing here is an approval, a site agreement or a forecast.
 *
 * The approved 18-site financial plan stays in round-data.ts (PHASES, PROJECTIONS). Where this document
 * and the deck disagree, the deck's figures stand and the conflict is listed in NETWORK_DISCREPANCIES.
 * Fields left undefined were not stated in the brief; the UI shows them as such rather than guessing.
 */

export const NETWORK_SOURCE = 'Bond Paddle Sports Hub-and-Spoke Network, 28 October 2026'
export const NETWORK_SOURCE_NOTE = 'Source: Bond Paddle Sports Hub-and-Spoke Network, dated 28 October 2026. Location scores and rollout dates are preliminary planning assessments and remain subject to validation, approvals and funding.'

export type HubId = 'trivandrum' | 'ernakulam' | 'kozhikode' | 'kasaragod'
export type WaveId = 'operating' | 'wave-1' | 'wave-2' | 'wave-3' | 'pipeline'
export type SpokeStatus = 'operating' | 'proposed' | 'conditional' | 'academy' | 'pipeline'

export const NETWORK_KPIS = [
  { value: '4', label: 'Regional hubs', text: 'Trivandrum, Ernakulam, Kozhikode and Kasaragod' },
  { value: '31', label: 'Potential spokes', text: 'The full network opportunity, not committed openings' },
  { value: '2', label: 'Operating today', text: 'Muziris–Kottapuram and Muziris–North Paravur, per the source document' },
  { value: '18', label: 'Sites in the investor plan', text: 'The base case behind the deck and financial model' },
  { value: '13', label: 'Unfunded pipeline', text: 'Further locations with no funding or model behind them yet' },
]

export const HUBS: { id: HubId; number: number; name: string; base: string; summary: string; priority: string[]; later: string[]; note?: string }[] = [
  {
    id: 'trivandrum', number: 1, name: 'Trivandrum', base: 'Kovalam',
    summary: 'The southern coast and lakes, anchored by the existing Kovalam plan.',
    priority: ['Kovalam', 'Vellayani Lake', 'Varkala–Kappil–Edava'],
    later: ['Veli–Akkulam', 'Munroe Island', 'Poovar'],
    note: 'Poovar needs a review of existing operators and commercial terms before the planned opening is committed.',
  },
  {
    id: 'ernakulam', number: 2, name: 'Ernakulam', base: 'Kochi–Vypin area',
    summary: 'Home of today’s Muziris operations and the Kochi backwaters.',
    priority: ['Kadamakkudy', 'Kumbalangi'],
    later: ['Cherai–Vypin', 'Kumarakom', 'Alappuzha–Punnamada', 'Munroe Island', 'Marari Coastal Blueway'],
    note: 'Already operating: Muziris–Kottapuram and Muziris–North Paravur.',
  },
  {
    id: 'kozhikode', number: 3, name: 'Kozhikode', base: 'Feroke or Beypore',
    summary: 'Rivers and estuaries of the north, plus a specialist monsoon training option.',
    priority: ['Beypore–Chaliyar', 'Akalapuzha'],
    later: ['Pookode Lake', 'Elathur–Korapuzha', 'Kadalundi'],
    note: 'Kodenchery white-water is a specialised Academy training opportunity for the monsoon, subject to safety and operational suitability.',
  },
  {
    id: 'kasaragod', number: 4, name: 'Kasaragod', base: 'Near Nileshwar',
    summary: 'The northern backwaters, linked to the Bekal tourism and resort market.',
    priority: ['Bekal–Kottappuram', 'Valiyaparamba'],
    later: ['Chandragiri–Thekkil', 'Kavvayi', 'Parassinikkadavu'],
  },
]

export const HUB_NAMES: Record<HubId, string> = { trivandrum: 'Trivandrum', ernakulam: 'Ernakulam', kozhikode: 'Kozhikode', kasaragod: 'Kasaragod' }

export const WAVES: { id: WaveId; name: string; when: string; text: string; sites: string[] }[] = [
  { id: 'operating', name: 'Existing operations', when: 'October 2026', text: 'Recorded as operating in the source document.', sites: ['Muziris–Kottapuram', 'Muziris–North Paravur'] },
  { id: 'wave-1', name: 'Wave 1', when: 'Jan 2027 – FY28', text: 'Trivandrum and Ernakulam priorities.', sites: ['Kovalam', 'Vellayani Lake', 'Varkala–Kappil–Edava', 'Kadamakkudy', 'Kumbalangi', 'Poovar, only if commercial terms are agreed'] },
  { id: 'wave-2', name: 'Wave 2', when: 'FY28 – FY29', text: 'Ernakulam depth and the Kozhikode hub.', sites: ['Cherai–Vypin', 'Kumarakom', 'Alappuzha–Punnamada', 'Munroe Island', 'Veli–Akkulam', 'Marari Coastal Blueway, subject to local approvals', 'Kozhikode hub: Beypore–Chaliyar and Akalapuzha', 'Kodenchery, as an Academy monsoon training base'] },
  { id: 'wave-3', name: 'Wave 3', when: 'FY30 – FY31', text: 'The Kasaragod hub and selected further destinations.', sites: ['Kasaragod hub: Bekal–Kottappuram and Valiyaparamba', 'Pookode Lake', 'Kadalundi', 'Elathur–Korapuzha', 'Chandragiri–Thekkil', 'Kavvayi', 'Parassinikkadavu'] },
  { id: 'pipeline', name: 'Future pipeline', when: 'FY32 onward', text: 'Unfunded. Considered only after earlier sites perform.', sites: ['Kadinamkulam–Anchuthengu', 'Ashtamudi', 'Dharmadam–Muzhappilangad', 'Karlad–Banasura', 'Thejaswini–Kariyangode', 'Pazhayangadi–Ezhimala'] },
]

export type Spoke = {
  name: string
  /** Undefined where the brief doesn't assign a hub (most future-pipeline sites). */
  hub?: HubId
  hubNote?: string
  /** Preliminary desk score out of 100; undefined where the brief gives none. */
  score?: number
  wave: WaveId
  status: SpokeStatus
  market?: string
  competition?: string
  dependency: string
  /** Whether the destination appears in the deck's 18-site plan (round-data PHASES). */
  inDeckPlan: boolean
}

const standard = 'Site visit, demand validation and permission checks'

export const SPOKES: Spoke[] = [
  { name: 'Muziris–Kottapuram', hub: 'ernakulam', wave: 'operating', status: 'operating', dependency: 'Muziris Project fleet licence', inDeckPlan: true },
  { name: 'Muziris–North Paravur', hub: 'ernakulam', wave: 'operating', status: 'operating', dependency: 'Muziris Project fleet licence', inDeckPlan: true },
  { name: 'Kadamakkudy', hub: 'ernakulam', score: 84, wave: 'wave-1', status: 'proposed', market: 'Backwater experiences near Kochi', dependency: standard, inDeckPlan: false },
  { name: 'Kovalam', hub: 'trivandrum', score: 81, wave: 'wave-1', status: 'proposed', dependency: standard, inDeckPlan: true },
  { name: 'Kumbalangi', hub: 'ernakulam', score: 80, wave: 'wave-1', status: 'proposed', market: 'Backwater experiences near Kochi', dependency: standard, inDeckPlan: true },
  { name: 'Vellayani Lake', hub: 'trivandrum', score: 78, wave: 'wave-1', status: 'proposed', market: 'Freshwater paddling near Kovalam', dependency: standard, inDeckPlan: true },
  { name: 'Varkala–Kappil–Edava', hub: 'trivandrum', score: 76, wave: 'wave-1', status: 'proposed', dependency: standard, inDeckPlan: true },
  { name: 'Poovar', hub: 'trivandrum', score: 69, wave: 'wave-1', status: 'conditional', competition: 'Existing operators to be reviewed', dependency: 'Review of existing operators and agreed commercial terms', inDeckPlan: true },
  { name: 'Marari Coastal Blueway', hub: 'ernakulam', score: 78, wave: 'wave-2', status: 'conditional', dependency: 'Local approvals; operating company to be clarified', inDeckPlan: false },
  { name: 'Cherai–Vypin', hub: 'ernakulam', score: 77, wave: 'wave-2', status: 'proposed', dependency: standard, inDeckPlan: true },
  { name: 'Kumarakom', hub: 'ernakulam', score: 76, wave: 'wave-2', status: 'proposed', market: 'Premium backwater tourism market', competition: 'Established destination; differentiation is important', dependency: standard, inDeckPlan: true },
  { name: 'Alappuzha–Punnamada', hub: 'ernakulam', score: 76, wave: 'wave-2', status: 'proposed', market: 'Premium backwater tourism market', competition: 'Established destination; differentiation is important', dependency: standard, inDeckPlan: true },
  { name: 'Beypore–Chaliyar', hub: 'kozhikode', score: 76, wave: 'wave-2', status: 'proposed', market: 'River and estuary experiences', dependency: standard, inDeckPlan: false },
  { name: 'Veli–Akkulam', hub: 'trivandrum', score: 73, wave: 'wave-2', status: 'proposed', dependency: standard, inDeckPlan: false },
  { name: 'Akalapuzha', hub: 'kozhikode', score: 72, wave: 'wave-2', status: 'proposed', dependency: standard, inDeckPlan: false },
  { name: 'Munroe Island', hub: 'trivandrum', hubNote: 'Listed under both Trivandrum and Ernakulam', score: 70, wave: 'wave-2', status: 'proposed', dependency: standard, inDeckPlan: true },
  { name: 'Kodenchery white-water', hub: 'kozhikode', score: 60, wave: 'wave-2', status: 'academy', market: 'Potential Academy training use in the monsoon', dependency: 'Safety and operational suitability for monsoon training', inDeckPlan: true },
  { name: 'Bekal–Kottappuram', hub: 'kasaragod', score: 80, wave: 'wave-3', status: 'proposed', market: 'Backwaters linked to the regional tourism and resort market', dependency: standard, inDeckPlan: true },
  { name: 'Valiyaparamba', hub: 'kasaragod', score: 78, wave: 'wave-3', status: 'proposed', market: 'Backwaters linked to the regional tourism and resort market', dependency: standard, inDeckPlan: true },
  { name: 'Kavvayi', hub: 'kasaragod', score: 75, wave: 'wave-3', status: 'proposed', dependency: standard, inDeckPlan: false },
  { name: 'Pookode Lake', hub: 'kozhikode', score: 70, wave: 'wave-3', status: 'proposed', dependency: standard, inDeckPlan: true },
  { name: 'Kadalundi', hub: 'kozhikode', wave: 'wave-3', status: 'proposed', dependency: standard, inDeckPlan: true },
  { name: 'Elathur–Korapuzha', hub: 'kozhikode', wave: 'wave-3', status: 'proposed', dependency: standard, inDeckPlan: false },
  { name: 'Chandragiri–Thekkil', hub: 'kasaragod', wave: 'wave-3', status: 'proposed', dependency: standard, inDeckPlan: false },
  { name: 'Parassinikkadavu', hub: 'kasaragod', wave: 'wave-3', status: 'proposed', dependency: standard, inDeckPlan: true },
  { name: 'Kadinamkulam–Anchuthengu', wave: 'pipeline', status: 'pipeline', dependency: 'Funding, then full site assessment', inDeckPlan: false },
  { name: 'Ashtamudi', wave: 'pipeline', status: 'pipeline', dependency: 'Funding, then full site assessment', inDeckPlan: false },
  { name: 'Dharmadam–Muzhappilangad', wave: 'pipeline', status: 'pipeline', dependency: 'Funding, then full site assessment', inDeckPlan: false },
  { name: 'Karlad–Banasura', wave: 'pipeline', status: 'pipeline', dependency: 'Funding, then full site assessment', inDeckPlan: false },
  { name: 'Thejaswini–Kariyangode', wave: 'pipeline', status: 'pipeline', dependency: 'Funding, then full site assessment', inDeckPlan: false },
  { name: 'Pazhayangadi–Ezhimala', wave: 'pipeline', status: 'pipeline', dependency: 'Funding, then full site assessment', inDeckPlan: false },
]

export const MODEL_POINTS = [
  { title: 'A hub', text: 'A regional operating centre that can support equipment, staffing, training and coordination for the destinations around it.' },
  { title: 'A spoke', text: 'A single destination where Bond offers kayaking, canoeing or stand-up paddleboarding, once the right approvals are in place.' },
]

export const RATIONALE = [
  { title: 'Coordinate nearby sites', text: 'One hub oversees several destinations within its region.' },
  { title: 'Share resources where practical', text: 'Spare fleet, workshops and senior guides can serve more than one site.' },
  { title: 'One experience, one safety process', text: 'The same standards and briefings at every destination.' },
  { title: 'Feed the Academy', text: 'Destinations double as training water for Academy courses.' },
  { title: 'Grow in stages', text: 'New spokes open only after demand and earlier sites prove out.' },
]

export const CRITERIA = [
  { name: 'Visitor demand', weight: 30, text: 'Are enough visitors already coming, and will they pay for a guided paddle?' },
  { name: 'Water conditions and seasonality', weight: 20, text: 'Is the water calm and safe enough, and for how many months a year?' },
  { name: 'Competitive gap', weight: 20, text: 'How many operators are already there, and is there room for a certified offer?' },
  { name: 'Ease of entry and permissions', weight: 15, text: 'How straightforward are the licences, concessions and local approvals?' },
  { name: 'Strategic fit with the hub', weight: 15, text: 'How well does the site share staff, kit and customers with its regional hub?' },
]

export const OPPORTUNITIES = [
  { places: 'Kadamakkudy and Kumbalangi', text: 'Backwater experiences close to Kochi.' },
  { places: 'Vellayani Lake', text: 'A freshwater paddling option near Kovalam.' },
  { places: 'Kumarakom and Alappuzha', text: 'Premium backwater tourism markets, where standing out matters.' },
  { places: 'Beypore–Chaliyar', text: 'River and estuary experiences.' },
  { places: 'Bekal and Valiyaparamba', text: 'Backwaters linked to the regional tourism and resort market.' },
  { places: 'Kodenchery', text: 'Potential Academy training use during the monsoon.' },
]

export const DIFFERENTIATION = ['Certified guides', 'Academy training', 'Premium guided trails', 'Combined experiences']

export const FINANCE_ROWS: { scope: string; sites: string; status: string; modelled: boolean }[] = [
  { scope: 'Base-case investor plan', sites: '18 sites by FY31', status: 'Modelled in the deck and financial model', modelled: true },
  { scope: 'Further network spokes', sites: '13 potential locations', status: 'Not yet modelled', modelled: false },
  { scope: 'Revenue, EBITDA and profit for the further spokes', sites: '—', status: 'Not yet modelled', modelled: false },
  { scope: 'Valuation impact of the wider network', sites: '—', status: 'None assumed', modelled: false },
]

export const FINANCE_POINTS = [
  'Later waves depend on how earlier sites perform, on available funding, on permissions and on operating capacity.',
  'Opening all four hubs too early could raise capital spending and put pressure on cash flow, which is why the plan is staged.',
  'Future bank loans or new investment are not assumed to be available automatically.',
]

export const RISKS: { title: string; points: string[]; flag?: string }[] = [
  { title: 'Demand', points: ['Validate local visitor numbers and willingness to pay.', 'Count existing paddle and motorboat operators.', 'Confirm realistic seasonal demand.'] },
  { title: 'Water and seasonality', points: ['Inspect water depth, currents, launch points and monsoon suitability.', 'Set safe operating conditions and weather-related closure rules.'] },
  { title: 'Permissions and concessions', points: ['Confirm the right permission for each lake, river, estuary or coastal site.', 'Check the relevant departments, port or maritime authorities, tourism concessions, local panchayats and environmental restrictions.', 'No destination is shown as approved until its permissions are confirmed.'] },
  { title: 'Capital and cash flow', points: ['Phase expansion in line with the existing financial plan.', 'Do not assume future bank loans or investment will be available.'] },
  { title: 'Safety and governance', points: ['Verify the registrations and safety procedures each destination needs.', 'Anyone involved in a relevant registration decision should formally recuse themselves where there is a conflict of interest.'] },
  {
    title: 'Company ownership and related parties',
    points: ['Clarify which legal entity will invest in and operate each site.'],
    flag: 'Unresolved: the report names Bond Water Sports as a proposed ₹2 crore investor in the Marari Coastal Blueway, while paddling activities are intended to sit with Bond Safari Paddle Sports Pvt Ltd. This arrangement is not final.',
  },
]

/** Nothing in the project evidences any of these as done, so every item stays unverified. */
export const READINESS_CHECKLIST = [
  'Dry-season site visit completed',
  'Monsoon assessment completed',
  'Water depth and current assessed',
  'Launch point and equipment storage reviewed',
  'Parking, toilets and mobile connectivity checked',
  'Visitor statistics obtained or requested',
  'Competitor assessment completed',
  'Relevant permissions identified',
  'Commercial concession terms reviewed',
  'Required registrations and safety procedures confirmed',
  'Operating company and ownership clarified',
  'Financial assumptions reviewed',
]

/** Conflicts between this document and the approved deck. The deck's figures stand until reconciled. */
export const NETWORK_DISCREPANCIES = [
  'Hub bases differ: the deck lists Kovalam, Kochi, Kozhikode and Payyanur; this document proposes Kovalam, the Kochi–Vypin area, Feroke or Beypore, and near Nileshwar.',
  'Kadamakkudy is the highest-scoring destination (84) and a Wave 1 priority here, but it is not one of the deck’s 18 sites.',
  'Irringal is one of the deck’s 18 sites but does not appear in this network plan, so 14 network destinations sit outside the deck’s plan against the 13 stated.',
  'Timing differs: Vellayani is Phase 4 (FY30–31) in the deck but Wave 1 here; Kadalundi and Pookode are FY29 in the deck but Wave 3 here.',
  'Poovar is a firm Phase 1 site in the deck but conditional on commercial terms here.',
  'Munroe Island is listed under both the Trivandrum and Ernakulam hubs.',
  'Hubs are not assigned for most future-pipeline destinations.',
]
