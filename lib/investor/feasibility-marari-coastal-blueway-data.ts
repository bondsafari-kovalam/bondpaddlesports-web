import 'server-only'
import type { Point, Table } from './feasibility-data'
import { SAFETY as HUB_SAFETY } from './feasibility-trivandrum-hub-data'

/**
 * CONFIDENTIAL. "Marari Coastal Blueway Paddle Centre: Paddle Sports Feasibility Study" (November 2026), prepared by
 * Jackson Peter, transcribed as written. View only, like every feasibility study: shown in the portal and never served
 * as a file. It must never be pushed to a public repository.
 */

// These passages are worded the same in every spoke report of this series.
export { CLOSING_NOTE, COVER_NOTE, FINANCE_INTRO, HOW_TO_READ, KATPS_CONFLICT, LOCATIONS_INTRO, RETHINK_NOTE, SITE_HOLDER, SUMMARY_CAVEAT } from './feasibility-kovalam-data'

export const COVER_FACTS = [
  ['Destination', 'Marari Coastal Blueway, Alappuzha district'],
  ['Hub', 'Ernakulam hub'],
  ['Network score / wave', '78 / 100 · Wave 2 (FY29, once canals are cleared)'],
  ['Verdict', 'Defer to FY29; go only on two conditions'],
  ['Date', 'November 2026'],
  ['Prepared for', 'The board and investors of Bond Safari Paddle Sports Pvt Ltd'],
]
export const VERDICT_TITLE = 'The answer: Defer to FY29; go only on two conditions'
export const VERDICT = 'Open in FY29 only when the panchayats have cleared Phase I (Chethy Pozhi to Mararikulam South Pozhi) and the board has placed Blueway paddling in Bond Safari Paddle Sports. Operate under a panchayat licence, selling mainly through the Marari beach resorts.'

// Executive summary
export const SUMMARY = [
  'The Marari Coastal Blueway is Bond’s own proposal, submitted to the Alappuzha MLA, A. D. Thomas: a connected paddle network of coastal canals and pozhis (seasonal estuary outlets) behind the Marari beach strip. Phase I runs from Chethy Pozhi to Mararikulam South Pozhi. The panchayats are asked to clean, dredge and widen the waterways and raise small bridges; ASAP’s training partner trains local youth; and Bond Water Sports invests ₹2 crore and employs them.',
  'Commercially, Marari is attractive. Its beach resorts serve a premium, largely foreign market, there is no paddle operator on these canals, and the canals are calm. At about 4,000 paddlers at ₹1,400, a licensed Blueway operation earns about ₹64 lakh of revenue and ₹29 lakh of EBITDA on about ₹30 lakh of capex.',
  'It is not ready. The canals are uncleared and unsurveyed. And as proposed, the ₹2 crore investment and the operation sit in Bond Water Sports, while paddling belongs to Bond Safari Paddle Sports, the company investors are funding. This must be fixed before Marari is shown to investors as part of their plan.',
]
export const SUMMARY_WHY: Point[] = [
  { text: 'Marari’s beach resorts (including CGH Earth’s Marari Beach Resort) serve a premium, largely foreign market' },
  { text: 'No kayak or canoe operator found on these canals' },
  { text: 'A public project backed by the MLA and the panchayats, with a youth-skills purpose' },
  { text: 'Fits the Alappuzha cluster: the Punnamada–Kuttanad spoke is about 30–45 minutes away' },
]
export const SUMMARY_MODELS: Table = {
  caption: 'The models compared (mature year, ₹ lakh)',
  head: ['Model', 'Capex', 'Revenue', 'EBITDA', 'Margin', 'Payback', '5-year value'],
  rows: [
    ['A. Kit at four Marari resorts', '45', '43.2', '13.1', '30%', '4.6 years', '(21.5)'],
    ['B. Standalone base on a private canal-side plot', '34', '64.4', '33.2', '52%', '1.8 years', '34.5'],
    ['C. Blueway operator licence from the panchayats', '30', '64.4', '28.8', '45%', '1.8 years', '29.2'],
    ['D. Blueway as currently proposed (Bond Water Sports invests and operates)', '—', '—', '—', '—', '—', 'Not available'],
  ],
  numeric: [1, 2, 3, 4, 5, 6],
  highlight: [2],
}
export const CONFLICTS: Point[] = [
  { lead: 'Which company owns the Blueway.', text: 'The proposal names Bond Water Sports as the ₹2 Cr investor and operator, but paddling belongs to Bond Safari Paddle Sports. If unchanged, two Bond companies sell paddling in Alappuzha district and investors’ company is excluded from a project Bond itself designed. Fix: vest Blueway paddling and its investment in Bond Safari Paddle Sports, or sign a licence or right of first refusal on arm’s-length terms approved by the investor director.' },
  { lead: 'Political proximity.', text: 'The project runs through the local MLA and the panchayats. Any operator licence awarded to Bond must come through an open, published process.' },
  { lead: 'Government-facing work.', text: 'Where Bond advises government on the Blueway, route it through Caplink Financial Consultancy with Kishor Kumar as lead, as already agreed for KATPS-related work.' },
  { text: 'Jackson Peter sits on the KATPS Technical Committee and must recuse himself in writing from this site’s registration.' },
]

// 1. Why this destination
export const WHY_INTRO = 'The Blueway would run along the coastal canals and pozhis behind the Mararikulam beach strip in Alappuzha district, from Chethy, where a ₹111 crore fishing harbour with 1,620 m of breakwaters is under construction, south to Mararikulam South Pozhi. The canals are shallow, narrow and partly choked; the pozhis open to the sea seasonally. Nothing about navigability has been published.'
export const WHY_CASE: Point[] = [
  { lead: 'Premium resorts nearby.', text: 'Marari’s beach resorts sell to foreign and high-spending domestic guests who want calm, authentic activities.' },
  { lead: 'First mover.', text: 'No paddle operator works these canals today.' },
  { lead: 'A public mandate.', text: 'The Blueway was framed for the Government of Kerala and submitted to the MLA, with skills and jobs for local youth as stated aims.' },
  { lead: 'Cluster economics.', text: 'Shares guides and kit with the Punnamada–Kuttanad spoke and the Ernakulam hub.' },
]
export const HUB_FIT: Table = {
  caption: 'How it fits the hub',
  head: ['Factor', 'Position'],
  rows: [
    ['Hub', 'Ernakulam (Kochi–Vypin base)'],
    ['Distance from hub', 'About 55 km, 1.5 hours by NH 66 (estimate)'],
    ['Hub provides', 'Guides, kit, repairs, safety officer, booking'],
    ['Needed on site', 'Launch landing, container storage, kiosk, a site lead and 3 guides'],
    ['Neighbouring spoke', 'Alappuzha–Punnamada (Phase 1 of the Alappuzha cluster)'],
  ],
}
export const SEASONS: Table = {
  caption: 'Seasons',
  head: ['Period', 'Conditions', 'What it means for paddling'],
  rows: [
    ['October–March', 'Marari resort peak, largely foreign', 'Peak demand'],
    ['April–May', 'Hot; domestic holidays', 'Early-morning paddles'],
    ['June–September', 'Monsoon; pozhis may breach to the sea', 'Closed at pozhi mouths; canals only on calm days'],
  ],
}

// 2. Demand
export const VISITORS: Table = {
  caption: 'The visitor base',
  head: ['Measure', 'Visitors', 'Basis'],
  rows: [
    ['Alappuzha district, domestic', '864,288', 'Kerala Tourism Statistics 2025'],
    ['Alappuzha district, foreign', '68,630', 'KTS 2025 (foreign share about 7.4%)'],
    ['Alappuzha destination (town, beach, Punnamada)', '596,409', 'KTS 2025; Marari not listed separately'],
    ['Paddlers assumed at Marari', '4,000', 'Resort-led estimate; no Marari visitor count published'],
  ],
  numeric: [1],
}
export const VISITORS_NOTE = 'Marari is not in the 2025 top-20 destination lists, so there is no visitor base to apply a capture rate to. The 4,000 paddlers a year is a resort-led estimate: roughly 10–12 resorts and homestays of size along the strip, each sending one to two paddlers a day in season, plus Alappuzha cluster cross-sales. It must be tested with the resorts before any capex.'
export const CAPTURE_INTRO: Point = { lead: 'From visitors to paddlers.', text: 'Demand is set directly as 4,000 paddlers a year, not as a capture rate, because no Marari visitor figure exists. The same 4,000 is used in the Alappuzha study’s Phase 2.' }
export const SPEND_INTRO: Point = { lead: 'What each paddler spends.', text: 'We use an average of ₹1,400 per paddler, made up of:' }
export const SPEND_BLEND: Point[] = [
  { text: 'Guided canal and pozhi paddle, 2 hours, at ₹1,400 (premium resort benchmark: CGH Earth charges ₹2,000 for 1.5 hours at Kumarakom)' },
  { text: 'Sunrise paddle with fishing-village breakfast at ₹1,800' },
  { text: 'SUP lessons at ₹1,200' },
  { text: 'About 15% more from B2B: resort packages, youth-skills programmes and the shop' },
]
export const BASE_REVENUE: Point = { lead: 'Base-case revenue.', text: '4,000 paddlers × ₹1,400 × 1.15 ≈ ₹0.64 Cr a year once the site is mature (model C).' }
export const DEMAND_CHECK: Point[] = [
  { text: 'Navigability survey of Phase I: depth, width, bridges, culverts (drone and land survey proposed to the MLA)' },
  { text: 'Interviews with 10 Marari resorts on demand and commission' },
  { text: 'Panchayat timetable for clearing and dredging' },
]

// 3. Who we sell to
export const SEGMENTS: Table = {
  caption: 'Who we sell to',
  head: ['Segment', 'Who they are', 'What they want', 'Our product', 'How we reach them', 'Share'],
  rows: [
    ['Foreign resort guests', 'European and other foreign guests at Marari resorts', 'Quiet nature, village life, safety', 'Guided canal paddle; sunrise with breakfast', 'Resort desks on commission', '45%'],
    ['Domestic premium guests', 'High-spending domestic families and couples', 'A calm, private activity', 'Private guided paddle; family session', 'Resorts; website', '20%'],
    ['Alappuzha cluster visitors', 'Visitors to the Punnamada spoke', 'A different paddle', 'Coastal Blueway half day', 'Cross-sale from Punnamada', '15%'],
    ['Local youth', 'Mararikulam and Kanjikuzhy youth', 'Skills, jobs', 'Paddle UK training; guide pathway', 'Panchayats; ASAP; Academy', '10%'],
    ['Schools and groups', 'Alappuzha schools', 'Water safety', 'School paddle tier', 'Direct', '10%'],
  ],
}
export const POSITION: Point = { lead: 'Our position.', text: 'Marari’s quiet canals, paddled with local guides trained on the Blueway.' }
export const SEGMENTS_AVOID: Point[] = [
  { text: 'Pozhi mouths when open to the sea' },
  { text: 'Chethy harbour works area' },
]

// 4. Competition and pricing
export const OPERATORS: Table = {
  caption: 'Who already operates here',
  head: ['Operator or channel', 'What they offer', 'Published price', 'Notes'],
  rows: [
    ['No paddle operator found on the Marari canals', '—', '—', 'First-mover position'],
    ['Resort activity desks', 'Cycling, village walks, beach activities', 'Bundled or not published', 'Partners'],
    ['Alappuzha kayak operators (Punnamada)', 'Kayak tours 40 minutes away', '₹650–1,500', 'Indirect'],
  ],
}
export const COMPETITION_CONCLUSIONS: Point[] = [
  { text: 'No direct competition today; the risk is execution, not rivals.' },
  { text: 'Resort guests will pay a premium, but only for a well-run, safe product sold through their resort.' },
  { text: 'Once the canals are cleared with public money, other operators will want access; the licence terms must give Bond a fair, open-process exclusivity period.' },
]
export const PRICE_LIST: Table = {
  caption: 'Proposed price list (inclusive of GST; check against the 2027 rate card)',
  head: ['Product', 'Duration', 'Price'],
  rows: [
    ['Guided canal and pozhi paddle', '2 hours', '₹1,400'],
    ['Sunrise paddle with fishing-village breakfast', '3 hours', '₹1,800'],
    ['SUP lesson', '1.5 hours', '₹1,200'],
    ['Private family paddle (up to 4)', '1.5 hours', '₹4,500'],
    ['Paddle UK Start Paddling', 'Half day', 'From the rate card'],
  ],
  numeric: [2],
}
export const PRICE_NOTE = 'At the expected product mix, this gives an average of about ₹1,400 per paddler before B2B sales.'

// 5. Possible locations
export const LOCATIONS: Table = {
  caption: 'Possible locations, scored from 1 to 5 on seven criteria',
  head: ['Location', 'Footfall', 'Water', 'Safety', 'Access', 'Site', 'Comp.', 'Permits', 'Total /35', 'Role'],
  rows: [
    ['Mararikulam central canal landing (panchayat)', '3', '3', '4', '4', '3', '5', '3', '25', 'Base for the licensed model'],
    ['Chethy Pozhi (north end)', '2', '2', '2', '3', '2', '5', '2', '18', 'Phase I limit; harbour works'],
    ['Mararikulam South Pozhi (south end)', '2', '3', '3', '3', '3', '5', '3', '22', 'Route end; check access'],
    ['Resort frontages along the strip', '3', '3', '4', '4', '2', '5', '3', '24', 'Sales and pick-up points if they front the canals (unverified)'],
  ],
  numeric: [1, 2, 3, 4, 5, 6, 7, 8],
  highlight: [0],
  wrapHead: true,
}
export const LOCATION_POINTS: Point[] = [
  { text: 'No location can be confirmed until the navigability survey is done.' },
  { text: 'Pozhi mouths are dynamic and open to surf in the monsoon; routes stay inside the canals.' },
]

// 6. Operating models
export const MODELS: { title: string; points: Point[] }[] = [
  {
    title: 'A. Kit at four Marari resorts',
    points: [
      { lead: 'How it works.', text: 'We place craft and a guide at four resorts that front water; the resort keeps 25%.' },
      { lead: 'For:', text: 'Premium guests on site; No canal licence needed if resorts have their own water.' },
      { lead: 'Against:', text: 'Unverified that resorts front usable canals; Small, scattered operations; Least control.' },
      { lead: 'Verdict:', text: 'Not recommended; use resorts as sales partners.' },
    ],
  },
  {
    title: 'B. Standalone base on a private canal-side plot',
    points: [
      { lead: 'How it works.', text: 'Bond leases a private plot on the cleared canal with a small pontoon and kiosk and sells through resorts and online.' },
      { lead: 'For:', text: 'Clear tenure; Full control.' },
      { lead: 'Against:', text: 'Rent on top of a licence to use public canals; Depends on canal clearing anyway.' },
      { lead: 'Verdict:', text: 'Fallback if no panchayat landing is available.' },
    ],
  },
  {
    title: 'C. Blueway operator licence from the panchayats',
    points: [
      { lead: 'How it works.', text: 'Once Phase I is cleared, the panchayats license an operator through an open process. Bond Safari Paddle Sports operates from a panchayat landing, pays 10% of revenue into a canal-maintenance fund and hires and trains local youth.' },
      { lead: 'For:', text: 'Fits the Blueway’s public purpose; No rent; low capex; Community and political support.' },
      { lead: 'Against:', text: 'Depends on clearing and an open licence process; Shared control; Tenure set by the panchayats.' },
      { lead: 'Verdict:', text: 'Recommended, subject to the two conditions.' },
    ],
  },
  {
    title: 'D. Blueway as currently proposed (Bond Water Sports invests and operates)',
    points: [{ lead: 'Not available here.', text: 'This is the current proposal. Its returns would accrue to Bond Water Sports, not to Bond Safari Paddle Sports, so it is not an option for this company’s investors. It is shown to make the choice explicit.' }],
  },
]
export const COMPARISON_RESULT: Point = { lead: 'Result.', text: 'B and C score the same. B earns slightly more because a ₹2 lakh rent costs less than a 10% community fund, but it still depends on public canals being cleared and on panchayat permission to use them. C is recommended because the Blueway is a public project, and an open-process licence with a community fund is the durable way to operate on a public waterway. B is the fallback.' }
export const COMPARISON_KEY = 'Key: A = Kit at four Marari resorts; B = Standalone base on a private canal-side plot; C = Blueway operator licence from the panchayats.'
export const COMPARISON: Table = {
  caption: 'Comparison of the models',
  head: ['Criterion', 'Weight', 'A', 'B', 'C'],
  rows: [
    ['Value created (5-year value)', '25%', '1', '3', '3'],
    ['Capital needed', '10%', '3', '3', '4'],
    ['Margin and resilience', '15%', '2', '4', '4'],
    ['Control of brand, quality, safety', '15%', '2', '5', '4'],
    ['Security of tenure', '10%', '2', '3', '3'],
    ['Speed to open and permit risk', '10%', '3', '2', '2'],
    ['Footfall and visibility', '10%', '3', '3', '3'],
    ['Environmental and reputational risk', '5%', '4', '4', '5'],
    ['Weighted score', '100%', '2.1', '3.4', '3.4'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [8],
}

// 7. Financial assessment
export const ASSUMPTIONS: Table = {
  caption: 'Key assumptions',
  head: ['Assumption', 'A', 'B', 'C'],
  rows: [
    ['Paddlers a year (mature)', '2,400', '4,000', '4,000'],
    ['Average ticket', '₹1,800', '₹1,400', '₹1,400'],
    ['B2B and courses on top', '0%', '15%', '15%'],
    ['Revenue share', '25%', '—', '10%'],
    ['Variable costs', '10%', '22%', '22%'],
    ['Fixed costs a year', '15.0', '17.0', '15.0'],
    ['of which lease or rent', '0.0', '2.0', '0.0'],
    ['Capex', '45', '34', '30'],
  ],
  numeric: [1, 2, 3],
}
export const CAPEX: Point[] = [
  { lead: 'A. Kit at four Marari resorts:', text: 'Craft and PFDs (4 sets) 33; Rescue boat and safety kit 6; Racks and branding 6; total 45.' },
  { lead: 'B. Standalone base on a private canal-side plot:', text: 'Craft: 16 kayaks, canoes and SUPs 22; Rescue boat and safety kit 6; Pontoon, kiosk, storage 6; total 34.' },
  { lead: 'C. Blueway operator licence from the panchayats:', text: 'Craft: 16 kayaks, canoes and SUPs 22; Rescue boat and safety kit 6; Kiosk and storage 2; total 30.' },
]
export const MATURE_YEAR: Table = {
  caption: 'Mature year (year 3 onward)',
  head: ['', 'A', 'B', 'C'],
  rows: [
    ['Revenue', '43.2', '64.4', '64.4'],
    ['Less revenue share', '(10.8)', '—', '(6.4)'],
    ['Less variable costs', '(4.3)', '(14.2)', '(14.2)'],
    ['Less fixed costs', '(15.0)', '(17.0)', '(15.0)'],
    ['EBITDA', '13.1', '33.2', '28.8'],
    ['EBITDA margin', '30%', '52%', '45%'],
    ['Payback', '4.6 years', '1.8 years', '1.8 years'],
    ['5-year cumulative cash after capex', '5.0', '104.5', '89.9'],
    ['5-year value at 25%', '(21.5)', '34.5', '29.2'],
  ],
  numeric: [1, 2, 3],
  highlight: [4, 8],
}
export const FIVE_YEAR_PATH: Table = {
  caption: 'The five-year path for the recommended model (C)',
  head: ['Year', '1', '2', '3', '4', '5'],
  rows: [
    ['Volume vs mature', '60%', '85%', '100%', '100%', '100%'],
    ['Revenue', '38.6', '54.7', '64.4', '64.4', '64.4'],
    ['EBITDA', '11.3', '22.2', '28.8', '28.8', '28.8'],
    ['Cumulative cash after ₹30 lakh capex', '(18.7)', '3.5', '32.3', '61.1', '89.9'],
  ],
  numeric: [1, 2, 3, 4, 5],
}
export const SENSITIVITY: Table = {
  caption: 'How sensitive is the recommended model (C)?',
  head: ['Scenario', 'Mature revenue', 'Mature EBITDA', '5-year value', 'Payback'],
  rows: [
    ['Base case', '64.4', '28.8', '29.2', '1.8 years'],
    ['Demand one-third lower', '42.9', '14.2', '(4.0)', '3.2 years'],
    ['Price 18% lower', '52.8', '20.9', '11.3', '2.4 years'],
    ['Downside: demand one-third lower and price 18% lower', '35.2', '8.9', '(15.9)', '4.8 years'],
    ['Severe: demand halved and price 18% lower', '26.4', '3.0', '(29.5)', 'Not within 5 years'],
    ['Demand one-third higher', '85.9', '43.4', '62.4', '1.3 years'],
    ['Price 18% higher', '76.0', '36.7', '47.1', '1.5 years'],
    ['Fixed costs 20% higher', '64.4', '25.8', '21.1', '2.1 years'],
    ['Capex 25% higher', '64.4', '28.8', '21.7', '2.1 years'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [0],
}
export const SENSITIVITY_READING: Point = { lead: 'Reading the sensitivities.', text: 'Mature-year EBITDA breaks even at about 1,370 paddlers, 34% of the base case.' }
export const REVENUE_SHARES: Table = {
  caption: 'Model C at different revenue shares',
  head: ['Share to the owner', 'Mature EBITDA', '5-year value at 25%'],
  rows: [
    ['10%', '28.8', '29.2'],
    ['15%', '25.6', '21.9'],
    ['20%', '22.4', '14.6'],
    ['25%', '19.1', '7.3'],
    ['30%', '15.9', '(0.1)'],
  ],
  numeric: [1, 2],
}
export const REVENUE_SHARES_NOTES = [
  'The licensed model stays value-positive up to about a 30% fund share. At 10% it earns about ₹4 lakh a year less EBITDA than a private plot (B), which is the price of operating a public waterway with community support.',
  'These figures cover only the paddle operation. The Blueway proposal’s ₹2 crore also covers swimming and water-safety training and local employment, which belong to Bond Water Sports’ scope and are not modelled here.',
]

// 8. The Blueway: which company, and on what terms
export const BLUEWAY_INTRO = [
  'The Blueway proposal asks the MLA to take the project up with the grama panchayats (canal and pozhi-bank cleaning, dredging and widening where needed, raising small bridges) and to commission a drone, land-survey and GIS study. Once the waterways are clear, Bond Water Sports would invest ₹2 crore and employ local youth for paddling and swimming training, with ASAP’s training partner training them.',
  'Recommended board decision: paddle operations and the paddle part of the investment sit in Bond Safari Paddle Sports; swimming and water-safety training stay with Bond Water Sports. Update the proposal to the MLA to name the right company before the panchayats act.',
]
export const TERMS: Table = {
  caption: 'Terms we need',
  head: ['Term', 'Our position', 'Walk away if'],
  rows: [
    ['Operator', 'Bond Safari Paddle Sports Pvt Ltd', 'Licence must be in Bond Water Sports’ name'],
    ['Award', 'Open, published process', 'Direct award without a process'],
    ['Community fund', '10% of paddle revenue', 'Above 30%'],
    ['Tenure', '5 years with renewal, given Bond’s design work', 'Under 3 years'],
    ['Canal maintenance', 'Panchayats maintain; operator contributes via the fund', 'All dredging on the operator'],
    ['Exclusivity', 'Sole paddle operator for an initial period set in the open process', 'Unlimited operators from day one'],
  ],
}
export const QUESTIONS: Point[] = [
  { text: 'Will the board move Blueway paddling into Bond Safari Paddle Sports?' },
  { text: 'When will the panchayats clear Phase I, and with what funding?' },
  { text: 'Who owns each canal: Irrigation Department or panchayats?' },
  { text: 'Will the navigability survey be commissioned, and by whom?' },
  { text: 'Which Marari resorts front usable canals?' },
]

// 9. Permits, environment and safety
export const PERMITS_INTRO = 'The Blueway lies in the CRZ coastal strip. Pozhi mouths are dynamic, canals are choked, and the Chethy fishing harbour is under construction at the northern end.'
export const PERMITS: Table = {
  caption: 'Permits checklist (to confirm with each authority)',
  head: ['Permit or registration', 'Authority', 'Applies here'],
  rows: [
    ['Adventure tourism operator registration', 'KATPS', 'Required'],
    ['Canal use and licence', 'Mararikulam North/South and Kanjikuzhy grama panchayats; Irrigation Department', 'Required'],
    ['Harbour area', 'Harbour Engineering Department / Fisheries', 'Keep clear of Chethy works'],
    ['Waterfront structures', 'Kerala Coastal Zone Management Authority', 'Removable only'],
    ['Rescue-boat registration', 'Kerala Maritime Board', 'Required'],
    ['Insurance and GST', 'Insurer; GST', 'Required'],
  ],
}
export const ENVIRONMENT: Point[] = [
  { text: 'Paddle only on the Blueway' },
  { text: 'Canal cleaning as part of the community fund; litter pick on every trip' },
  { text: 'Local youth hired and trained first' },
  { text: 'No paddling at open pozhi mouths' },
]
export const SAFETY: Table = { ...HUB_SAFETY, caption: 'Safety standard' }

// 10. Risks
export const RISK_REGISTER: Table = {
  caption: 'Risks',
  head: ['#', 'Risk', 'Likelihood', 'Impact', 'How we manage it'],
  rows: [
    ['1', 'Canals not cleared, or cleared late', 'High', 'High', 'No capex before clearing; Phase 1 Alappuzha spoke carries the cluster'],
    ['2', 'Company conflict over the Blueway', 'Certain unless resolved', 'High', 'Board decision; update the proposal to the MLA'],
    ['3', 'Navigability poorer than assumed (depth, bridges)', 'Medium', 'High', 'Survey first; shorter route if needed'],
    ['4', 'Resort demand lower than 4,000', 'Medium', 'Medium', 'Resort interviews; cross-sales from Punnamada'],
    ['5', 'Political perception of favour', 'Medium', 'Medium', 'Open process; published terms; Caplink for government-facing work'],
    ['6', 'Surf and currents at pozhi mouths', 'Medium', 'Very high', 'Routes inside canals; closure rules'],
    ['7', 'Harbour construction disruption', 'Medium', 'Low', 'Keep the north end out of routes until complete'],
    ['8', 'KATPS conflict', 'Certain', 'Medium', 'Written recusal'],
  ],
}
export const RISK_NOTE: Point = { lead: 'Two conditions decide this site: the canals must be cleared, and the Blueway’s paddling must sit in Bond Safari Paddle Sports. Without both, it should not be presented to investors as part of their plan.' }

// 11. Recommendation and launch plan
export const RECOMMENDATION: Point[] = [
  { text: 'Take the board decision on the Blueway’s company now and update the proposal to the MLA.' },
  { text: 'Spend nothing on Marari kit until Phase I is cleared and surveyed.' },
  { text: 'Open in FY29 under a panchayat licence awarded through an open process, selling mainly through resorts.' },
  { text: 'Train local youth through the Academy in FY28 so guides are ready when the canals are.' },
]
export const LAUNCH_PLAN: Table = {
  caption: 'Launch plan',
  head: ['When', 'Step', 'Owner', 'Gate'],
  rows: [
    ['November 2026', 'Board decision on Blueway ownership; revised proposal to the MLA', 'MD; board', ''],
    ['FY28 (clearing)', 'Panchayats clear Phase I; navigability survey; resort interviews', 'Panchayats; Bond', 'Gate 0: canals cleared and surveyed'],
    ['FY28 (training)', 'Train 8–10 local youth as guides', 'Academy; ASAP partner', ''],
    ['Early FY29', 'Open licence process; KATPS registration (with MD recusal)', 'Panchayats; MD', 'Gate 1: licence to Bond Safari Paddle Sports'],
    ['October 2028', 'Opening for the resort season', 'Site lead', ''],
    ['March 2029', 'First-season review', 'Board', 'Gate 2'],
  ],
}
export const KPIS: Table = {
  caption: 'First-year KPIs and gate thresholds',
  head: ['KPI', 'Target', 'Scale up if', 'Rethink if'],
  rows: [
    ['Paddlers in year 1', '2,400', '2,280 or more', 'Under 1,560'],
    ['Average spend per paddler (incl. B2B)', '₹1,610', '₹1,529 or more', 'Under ₹1,260'],
    ['EBITDA in year 1 (₹ lakh)', '11.3', '10.1 or more', 'Below zero'],
    ['Guest rating (Google, Tripadvisor)', '4.7', '4.6 or more', 'Under 4.3'],
    ['Safety', 'Zero reportable incidents', 'Zero', 'Any serious incident (immediate review)'],
    ['Guides from the local community', '75%', '75% or more', '—'],
  ],
}

// Sources
export const SOURCES: { title: string; url?: string }[] = [
  { title: 'Kerala Tourism Statistics 2025', url: 'https://www.keralatourism.org/tourismstatistics/tourists_statistics_202520260507114657.pdf' },
  { title: 'Maritime Gateway: Chethi fishing harbour', url: 'https://www.maritimegateway.com/tag/chethi-fishing-harbour/' },
  { title: 'CGH Earth: kayaking packages (premium benchmark)', url: 'https://www.cghearth.com/kayaking-packages.pdf' },
  { title: 'Kerala Tourism: Marari Beach Resort accredited centre', url: 'https://www.keralatourism.org/accredited-centres/view_details/MjI2Mw==' },
  { title: 'Bond: Alappuzha Coastal Blueway proposal to the MLA (internal)' },
]
