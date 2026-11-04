import 'server-only'
import type { Point, Table } from './feasibility-data'

/**
 * CONFIDENTIAL. "Trivandrum Hub: Hub Feasibility Study" (November 2026), prepared by Jackson Peter, transcribed as
 * written. View only, like every feasibility study: shown in the portal and never served as a file. It revises the
 * investor model's figures for Poovar and the Kollam line; the deck's figures in round-data.ts stand until an approved
 * deck changes them. It must never be pushed to a public repository.
 */

export const COVER_FACTS = [
  ['Destination', 'Trivandrum hub, Thiruvananthapuram district'],
  ['Hub', 'Trivandrum hub (this report)'],
  ['Network score / wave', '— · Opens FY27 (January 2027)'],
  ['Verdict', 'Go'],
  ['Date', 'November 2026'],
  ['Prepared for', 'The board and investors of Bond Safari Paddle Sports Pvt Ltd'],
]
export const VERDICT = 'Open the Trivandrum hub at the Bond Kovalam campus in January 2027, with a leased workshop near Kovalam. Its spokes cover its overhead more than twice over, but almost half of that comes from Kovalam alone, and two of the model’s sites (Poovar and Munroe) should be revised down.'
export const COVER_NOTE = 'Confidential. Prepared for named investors of Bond Safari Paddle Sports Pvt Ltd. Not an offer of securities to the public. Financial figures are management estimates for decision-making, not guarantees.'

export const HOW_TO_READ = [
  'All money is in ₹ lakh (1 lakh = 100,000; 100 lakh = 1 crore) unless marked ₹ Cr, before tax, at FY27 prices.',
  'Years 1 and 2 run at 60% and 85% of mature volume; years 3–5 at 100%, with no growth assumed. 5-year values are discounted at 25% a year, the early-stage rate used in our valuation report, after the initial capex.',
  'Capture is the share of the visitor base that books a paddle with us. It is the single most important assumption in every spoke, and every report says how to test it before money is committed.',
  'Model scores run from 1 (poor) to 5 (strong). The first criterion, value created, is scored automatically from the 5-year value so that all reports are scored the same way.',
]

// Executive summary
export const SUMMARY = [
  'The Trivandrum hub serves Thiruvananthapuram and Kollam districts from a base at Kovalam, beside Bond’s head office and the Academy’s first campus. It is Bond’s home market: Thiruvananthapuram district had 4.54 million visitors in 2025, including 166,429 foreign visitors, about a fifth of Kerala’s total.',
  'Of the eight spokes assessed, five should open: Kovalam (January 2027), Vellayani Lake, Varkala–Kappil, a Poovar resort pilot and a Munroe Island community partnership. Veli–Akkulam is deferred until DTPC offers terms, and Kadinamkulam–Anchuthengu and Ashtamudi stay in the pipeline.',
  'At maturity the five recommended spokes earn about ₹3.43 Cr of revenue and about ₹1.79 Cr of EBITDA before overheads, against the hub’s ₹72 lakh a year. That is comfortable, but concentrated: Kovalam provides almost half. The investor model’s South sites (FY31 revenue about ₹4.54 Cr including growth) overstate Poovar and the Kollam line, and should be revised.',
]
export const KEY_NUMBERS: Table = {
  caption: 'Key numbers',
  head: ['Measure', 'Value'],
  rows: [
    ['Hub capex (investor model, FY27)', '₹120 lakh'],
    ['Academy campus at Kovalam (FY27)', '₹40 lakh capex'],
    ['Hub overhead', '₹72 lakh a year; 5 staff'],
    ['Spokes assessed', '8: 5 open, 1 deferred, 2 pipeline'],
    ['Mature revenue, 5 recommended spokes', 'About ₹343 lakh (₹3.43 Cr)'],
    ['Mature EBITDA, 5 recommended spokes', 'About ₹179 lakh, about 2.5 times hub overhead'],
    ['Kovalam’s share of that EBITDA', 'About 48%'],
    ['Investor-model South sites, FY31 revenue', 'About ₹454 lakh, including growth'],
  ],
}
export const CONFLICTS: Point[] = [
  { text: 'The hub and the Kovalam spoke use the Bond campus, owned or leased by another Bond company. The paddle company should pay a written, arm’s-length rent, approved by the investor director; the model shows none.' },
  { text: 'Bond Adventures’ parasailing boat sits in the Vizhinjam Seaward Wharf yard, and Bond Adventures is challenging the storage charges with the Kerala Maritime Board. If the paddle hub also uses Vizhinjam, the two companies’ dealings with KMB must be kept separate, and neither should trade on the other’s position.' },
  { text: 'Jackson Peter sits on the KATPS Technical Committee, which accredits Bond’s competitors in this hub (Shiva Kayaking, Syzygy, the Paravur operators). He must recuse himself from every Bond site’s registration.' },
  { text: 'Government-facing work (DTPC, KMB, panchayats) for Bond’s own sites should be done openly by Bond Safari Paddle Sports, separately from any advisory work through Caplink.' },
]

// 1. What the hub does
export const HUB_INTRO = [
  'The hub is the region’s workshop, store, training base and control room. It holds the expensive and specialised things once, so that each spoke can be light: a kiosk, racks, craft and a few guides.',
  'Trivandrum is also the Academy’s home campus. Guides trained at Kovalam staff Kovalam, Vellayani and Poovar directly, and the hub’s calm-water partner, Vellayani Lake, keeps training going through the monsoon when the sea is closed.',
]
export const HUB_HOLDS: Table = {
  caption: 'What the hub holds',
  head: ['Item', 'Detail', '₹ lakh'],
  rows: [
    ['Workshop and storage fit-out', 'Repairs, craft storage, PFD drying and inspection', '30'],
    ['Pickup and 2 trailers', 'Move craft between Kovalam, Vellayani, Poovar and events', '22'],
    ['Spare fleet (20 craft)', 'Replacements and peak-day top-ups for all spokes', '12'],
    ['Rescue boat', 'Hub rescue cover, also for Kovalam’s sea sessions', '7'],
    ['Office and briefing room', 'Booking, safety briefings, guide rota', '15'],
    ['IT, booking stack and CCTV', 'Common booking engine and loyalty integration', '6'],
    ['Safety and first-aid equipment', 'Hub stock for all spokes', '5'],
    ['Pre-operative costs', 'Recruitment, legal, registration', '13'],
    ['Contingency', '', '10'],
  ],
  numeric: [2],
}
export const REGION: Table = {
  caption: 'Region covered',
  head: ['Factor', 'Position'],
  rows: [
    ['Districts', 'Thiruvananthapuram and Kollam'],
    ['Base', 'Bond campus, Kovalam, with a leased workshop nearby'],
    ['Nearest spokes', 'Kovalam (0 km), Vellayani (7 km), Poovar (15 km), Veli–Akkulam (20 km)'],
    ['Furthest spokes', 'Munroe Island (about 95 km) and Ashtamudi (about 80 km)'],
    ['Visitors 2025', 'Thiruvananthapuram 4,542,275 (166,429 foreign); Kollam 550,372 (11,416 foreign)'],
  ],
}
export const SEASONS: Table = {
  caption: 'Seasons across the region',
  head: ['Period', 'Conditions', 'What it means'],
  rows: [
    ['October–May', 'Sea calm enough for morning sessions; peak foreign season December–February', 'All spokes open; Kovalam busiest'],
    ['June–September', 'Monsoon; sea closed', 'Kovalam closed; Vellayani and backwaters carry on; Academy training season'],
  ],
}

// 2. Where to base it
export const BASE_INTRO = 'The hub needs a workshop and store with trailer access, a classroom, and a slipway or beach launch for the rescue boat. Five options were scored from 1 to 5 on six criteria.'
export const BASE_OPTIONS: Table = {
  caption: 'Hub base options, scored from 1 to 5 on six criteria',
  head: ['Option', 'Access to spokes', 'Water / slipway', 'Land available', 'Cost', 'Academy fit', 'Permits', 'Total /30', 'Notes'],
  rows: [
    ['Bond Kovalam campus (head office and Academy)', '5', '3', '3', '5', '5', '4', '25', 'Base: office, classroom, Academy; frontage unverified'],
    ['Leased godown or plot on the Kovalam–Vizhinjam road', '5', '2', '4', '4', '3', '4', '22', 'Workshop and craft store with trailer access'],
    ['Vizhinjam Seaward Wharf yard (Kerala Maritime Board)', '4', '5', '2', '2', '2', '2', '17', 'Rescue-boat mooring only; PPP redevelopment and tariff dispute'],
    ['Vizhinjam fishing harbour', '4', '4', '1', '3', '2', '1', '15', 'Crowded and sensitive; new harbour planned'],
    ['Vellayani Lake bank', '4', '4', '2', '4', '4', '2', '20', 'Flat-water training site, not a workshop (construction embargo)'],
  ],
  numeric: [1, 2, 3, 4, 5, 6, 7],
  highlight: [0],
  wrapHead: true,
}
export const BASE_POINTS: Point[] = [
  { text: 'Recommended: the campus for the office, classroom and Academy, plus a leased workshop and craft store nearby. Use Vizhinjam only for mooring the rescue boat, and only once the storage-tariff question is settled.' },
  { text: 'The Kerala Maritime Board plans to redevelop the Vizhinjam minor port and its 160 m wharf under PPP (April 2025). Small craft may be squeezed out or charged more, so do not build the hub around Vizhinjam.' },
]

// 3. The spokes it serves
export const SPOKES_INTRO = 'The hub’s eight spokes, ranked as in the network plan, with each spoke report’s recommended model and base case.'
export const SPOKES: Table = {
  caption: 'The hub’s eight spokes',
  head: ['Spoke', 'District', 'Water', 'Score', 'Wave', 'Recommended model', 'Mature revenue', 'Mature EBITDA'],
  rows: [
    ['Kovalam', 'Thiruvananthapuram', 'Sea and bays', '81', 'Wave 1 (Jan 2027)', 'B. Spoke run from the Bond campus', '143.6', '86.0'],
    ['Vellayani Lake', 'Thiruvananthapuram', 'Freshwater lake', '78', 'Wave 1 (FY28)', 'D. Panchayat licence at the Kireedam bridge site', '41.4', '20.5'],
    ['Varkala–Kappil–Edava', 'Thiruvananthapuram (Kollam border)', 'Backwater lake meeting the sea', '76', 'Wave 1 (FY28)', 'B. Standalone lakeside base at Kappil', '75.0', '38.8'],
    ['Veli–Akkulam', 'Thiruvananthapuram', 'Lagoon and city lake', '73', 'Deferred', 'C. DTPC concession at Veli', '20.7', '3.6'],
    ['Munroe Island', 'Kollam', 'Island canals', '70', 'Wave 2 (FY28–29)', 'C. Community partnership with boatmen and homestays', '36.2', '14.1'],
    ['Poovar', 'Thiruvananthapuram', 'Estuary and mangroves', '69', 'Pilot (FY27–28)', 'A. Kit and guides at waterfront resorts', '46.8', '19.4'],
    ['Kadinamkulam–Anchuthengu', 'Thiruvananthapuram', 'Backwater lake', '69', 'Pipeline', 'C. Partnership with Shiva Kayaking', '25.9', '6.5'],
    ['Ashtamudi, Kollam', 'Kollam', 'Large backwater lake', '65', 'Pipeline', 'C. Concession in the KMB lakefront PPP', '34.6', '12.8'],
  ],
  numeric: [3, 6, 7],
}
export const SPOKES_NOTE = 'Mature revenue and EBITDA are the base case of each spoke’s own feasibility report (₹ lakh, before hub and corporate overheads).'
export const SPOKES_POINTS: Point[] = [
  { text: 'Kovalam carries the hub. Its safety record is the hub’s biggest single risk.' },
  { text: 'Vellayani and Poovar work only because they are close enough to share Kovalam’s guides and rescue boat.' },
  { text: 'Munroe and Ashtamudi are 80–95 km away; together they could one day form a Kollam satellite cluster, but only if Munroe performs.' },
]

// 4. Hub economics
export const ECONOMICS_INTRO = [
  'The hub’s overhead is ₹72 lakh a year in the investor model (staff, rent, vehicles and running costs), plus ₹120 lakh of capex in FY27. The Academy’s Kovalam campus adds ₹40 lakh of capex and its own fixed costs, which the Academy’s course revenue covers separately.',
  'The table below is the investor model’s revenue for this hub’s funded sites. The spoke reports revise two of them down: Poovar from about ₹97 lakh to about ₹47 lakh at maturity (resort pilot), and the Kollam line from about ₹65 lakh to about ₹36 lakh (Munroe partnership only). Vellayani moves earlier but smaller, and Veli–Akkulam is deferred.',
]
export const FUNDED_SITES: Table = {
  caption: 'Funded sites of this hub in the investor model (₹ lakh)',
  head: ['Site (investor model)', 'FY27', 'FY28', 'FY29', 'FY30', 'FY31', 'FY32', 'FY33'],
  rows: [
    ['Kovalam (Bond HQ)', '18.0', '114.9', '143.6', '155.1', '167.5', '177.4', '177.4'],
    ['Poovar estuary', '12.1', '77.3', '96.6', '104.3', '112.7', '121.7', '131.4'],
    ['Varkala – Kappil / Edava-Nadayara', '—', '37.5', '60.0', '75.0', '81.1', '87.5', '94.5'],
    ['Kollam – Ashtamudi / Munroe Island', '—', '32.4', '51.9', '64.9', '70.1', '75.7', '81.7'],
    ['Vellayani / Akkulam', '—', '—', '—', '—', '22.3', '35.7', '44.6'],
    ['Total site revenue incl. B2B', '30.0', '262.1', '352.1', '399.3', '453.6', '498.0', '529.7'],
  ],
  numeric: [1, 2, 3, 4, 5, 6, 7],
  highlight: [5],
}
export const HUB_COST: Table = {
  caption: 'Hub cost and contribution',
  head: ['Item', 'Value'],
  rows: [
    ['Hub overhead a year', '₹72 lakh'],
    ['EBITDA of the 5 recommended spokes (mature, before overheads)', 'About ₹179 lakh'],
    ['Contribution after hub overhead', 'About ₹107 lakh, before corporate overhead'],
    ['Kovalam alone', 'About ₹86 lakh of EBITDA'],
    ['Hub covered without Kovalam?', 'Just: about ₹93 lakh from the other four spokes'],
    ['Revenue change vs investor model (mature, 5 spokes)', 'About −₹80 lakh, mainly Poovar and Munroe'],
  ],
}
export const ECONOMICS_CLOSING = 'The hub is financially sound, but the plan’s numbers for this hub should be revised before the next investor meeting, mainly for Poovar.'

// 5. The Academy campus
export const ACADEMY = [
  'The Academy’s first campus is at Kovalam (FY27, ₹40 lakh capex: a training fleet of 12 sit-in kayaks, 8 SUPs and 4 canoes, spray decks and helmets, a rescue boat, a classroom with AV, accreditation and curriculum set-up).',
  'Kovalam gives sea skills; Vellayani gives calm-water training and assessments, and lets courses run through the monsoon. The hub’s guide pool comes from the Academy’s Bond Paddle Guide Programme, with priority for young people from the Kovalam and Vizhinjam fishing communities.',
  'Paddle UK delivery partnership and ASAP commission terms apply to courses run here, as set out in the 2027 rate card.',
]

// 6. People and organisation
export const PEOPLE: Table = {
  caption: 'Hub roles',
  head: ['Role', 'Number', 'What they do'],
  rows: [
    ['Hub manager', '1', 'Runs the hub and its spokes; owns gates and KPIs'],
    ['Safety officer', '1', 'Risk assessments, audits, incident reporting, KATPS and insurance'],
    ['Workshop technician', '1', 'Repairs, fleet inspection and maintenance'],
    ['Logistics driver', '1', 'Trailers between spokes and events'],
    ['Bookings and administration', '1', 'Common booking engine, partner commissions, reporting'],
    ['Spoke staff (separate)', 'About 20 in season', 'Site leads and guides at Kovalam, Vellayani, Varkala, Poovar and Munroe'],
  ],
}

// 7. Permits, safety and related parties
export const PERMITS: Point[] = [
  { text: 'The hub itself needs a trade licence, fire and safety clearance for the workshop, and CRZ checks for anything near the beach. The rescue boat must be registered with the Kerala Maritime Board.' },
  { text: 'Each spoke needs its own KATPS registration and permissions, listed in each spoke report.' },
  { lead: 'Conflict to manage.', text: 'Jackson Peter sits on the KATPS Technical Committee. He should recuse himself in writing from this site’s registration and inspection, and the recusal should be recorded with KATPS, as for every Bond site.' },
  { lead: 'Which company holds the site.', text: 'Kayaking, canoeing and SUP belong to Bond Safari Paddle Sports Pvt Ltd. Every lease, concession or bid for this site must be in that company’s name. Any motorised activity belongs to Bond Adventures Pvt Ltd, and any scuba or snorkelling to Bond Water Sports Pvt Ltd; shared costs between Bond companies must be on written arm’s-length terms approved by the investor director.' },
]
export const SAFETY: Table = {
  caption: 'Safety standard applied at every spoke',
  head: ['Area', 'Standard'],
  rows: [
    ['Guides', 'Paddle UK-qualified, at least Paddlesport Leader or SUP Instructor for open water; first aid and rescue trained'],
    ['Ratio', '1:6 for beginners; 1:8 for experienced guests; 1:4 for children'],
    ['Equipment', 'A PFD worn by every guest at all times; whistles; tow lines; spare paddles'],
    ['Rescue cover', 'A motorised rescue boat on standby whenever a group is on the water'],
    ['Weather and water', 'No sessions in thunderstorms, after dark, in strong wind or after heavy rain; daily water check'],
    ['Records', 'Risk assessment for each route; daily log; incident reporting; monthly audit by the hub safety officer'],
  ],
}

// 8. Risks
export const RISK_REGISTER: Table = {
  caption: 'Risks',
  head: ['#', 'Risk', 'Likelihood', 'Impact', 'How we manage it'],
  rows: [
    ['1', 'Serious incident at Kovalam affects the whole hub and every Bond company there', 'Low–Medium', 'Very high', 'Strict sea limits; dedicated rescue boat; audits'],
    ['2', 'Hub revenue concentrated in Kovalam', 'Certain', 'Medium', 'Grow Vellayani and Varkala; keep Poovar and Munroe light'],
    ['3', 'Vizhinjam PPP squeezes small craft', 'Medium', 'Low', 'Do not base the hub at Vizhinjam'],
    ['4', 'Investor model overstates Poovar and Kollam', 'Certain', 'Medium', 'Revise the model; tell investors in writing'],
    ['5', 'Related-party costs not reflected', 'High', 'Medium', 'Written campus rent and recharge terms'],
    ['6', 'KATPS conflict with accredited competitors', 'Certain to arise', 'Medium', 'Written recusal recorded with KATPS'],
  ],
}

// 9. Launch plan and gates
export const LAUNCH_PLAN: Table = {
  caption: 'Launch plan and gates',
  head: ['When', 'Step', 'Owner', 'Gate'],
  rows: [
    ['November 2026', 'Agree campus licence and inter-company terms; lease the workshop', 'MD; investor director', 'Terms approved'],
    ['December 2026', 'Fit out workshop; buy hub kit; KATPS registrations (with MD recusal)', 'Hub manager; safety officer', 'Gate 1: hub ready'],
    ['January 2027', 'Hub opens with Kovalam and the Academy campus; Poovar resort pilot', 'Hub manager', ''],
    ['April–October 2027', 'Vellayani, Varkala and Munroe open as their gates are met', 'Hub manager', 'Spoke gates'],
    ['March 2028', 'First hub review', 'Board', 'Gate 2: hub covers its overhead from spokes'],
  ],
}

// Sources
export const SOURCES: { title: string; url?: string }[] = [
  { title: 'Kerala Tourism Statistics 2025', url: 'https://www.keralatourism.org/tourismstatistics/tourists_statistics_202520260507114657.pdf' },
  { title: 'Indian Infrastructure: KMB to redevelop the minor port at Vizhinjam (Apr 2025)', url: 'https://indianinfrastructure.com/2025/04/29/kerala-maritime-board-to-redevelop-the-minor-port-at-vizhinjam/' },
  { title: 'The Week: New Vizhinjam fishing harbour nod (Oct 2026)', url: 'https://www.theweek.in/news/maritime/2026/10/05/new-vizhinjam-fishing-harbour-project-gets-in-principle-nod-from-kerala-govt.amp.html' },
  { title: 'Onmanorama: Kovalam lifeguard flags (Mar 2026)', url: 'https://www.onmanorama.com/news/kerala/2026/03/03/kovalam-beach-tourists-lifeguard-flags.html' },
  { title: 'Kerala Tourism: accredited operators, Thiruvananthapuram', url: 'https://www.keralatourism.org/adventure-tour-operators?a=watersports&d=thiruvananthapuram' },
  { title: 'Kerala Kaumudi: Vellayani construction statement (Sep 2024)', url: 'https://keralakaumudi.com/en/kerala/general/attention-property-owners-suresh-gopi-reveals-area-in-thiruvananthapuram-where-no-construction-activities-will-be-allowed-from-now-on-1384352' },
  { title: 'Bond Safari Paddle Sports financial model and hub-and-spoke network (internal)' },
]
export const CLOSING_NOTE = 'Prepared for the board and investors of Bond Safari Paddle Sports Pvt Ltd. Figures are estimates for decision-making, not guarantees. Desk research as of November 2026.'
