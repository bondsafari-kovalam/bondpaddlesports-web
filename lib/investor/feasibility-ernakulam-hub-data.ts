import 'server-only'
import type { Point, Table } from './feasibility-data'

/**
 * CONFIDENTIAL. "Ernakulam Hub: Hub Feasibility Study" (November 2026), prepared by Jackson Peter, transcribed as written.
 * View only, like every feasibility study: shown in the portal and never served as a file. It revises the investor
 * model's figures for Kumarakom; the deck's figures in round-data.ts stand until an approved deck changes them. It must
 * never be pushed to a public repository.
 */

// These passages are worded the same in every report of this series.
export { COVER_NOTE, HOW_TO_READ, SAFETY } from './feasibility-trivandrum-hub-data'

export const COVER_FACTS = [
  ['Destination', 'Ernakulam hub, Ernakulam district'],
  ['Hub', 'Ernakulam hub (this report)'],
  ['Network score / wave', '— · FY27 (open now)'],
  ['Verdict', 'Go: the strongest hub in the network'],
  ['Date', 'November 2026'],
  ['Prepared for', 'The board and investors of Bond Safari Paddle Sports Pvt Ltd'],
]
export const VERDICT_TITLE = 'The answer: Go: the strongest hub in the network'
export const VERDICT = 'Base the hub’s workshop, office and stores on the Goshree corridor at Mulavukad (or south Vypin), use Kadamakkudy as its training water, service rescue boats at the Vypin slipway, and open the Muziris–Kochi Academy campus in FY28. Its spokes cover the hub’s overhead about 3.8 times at maturity.'

// Executive summary
export const SUMMARY = [
  'The Ernakulam hub serves Ernakulam, Thrissur, Alappuzha and Kottayam districts: the two live Muziris sites, Kochi’s islands (Kadamakkudy and Kumbalangi), Cherai, Kumarakom, Alappuzha and, later, the Marari Coastal Blueway. It is the economic centre of the network. Its spokes’ own feasibility studies add up to about ₹5.9 Cr of mature revenue and ₹2.7 Cr of site EBITDA a year, against a hub overhead of ₹72 lakh.',
  'The best base is on the Goshree corridor at Mulavukad, or south Vypin: road links reach both Muziris sites, Kochi city and the Vypin–Munambam road, and Kadamakkudy’s calm canals (20–25 minutes away) give the hub its training water. KTDC’s newly upgraded Kochi International Marina at Bolgatty is the best brand location, but it is government land with a mixed delivery record, so it should be pursued for an Academy classroom or display, not depended on for the workshop.',
  'Two issues must be fixed for investors. The live Muziris concession is held by Bond Water Sports, not Bond Safari Paddle Sports. And the Coastal Blueway’s ₹2 Cr investment is proposed through Bond Water Sports, although paddling belongs to Bond Safari Paddle Sports.',
]
export const KEY_NUMBERS: Table = {
  caption: 'Key numbers',
  head: ['Measure', 'Value'],
  rows: [
    ['Hub capex (investor model, FY27)', '₹120 lakh'],
    ['Academy campus capex (Muziris–Kochi, FY28)', '₹25 lakh'],
    ['Hub overhead', '₹72 lakh a year; 5 staff'],
    ['Spokes served', '2 live, 6 to open, 1 reserve'],
    ['Mature revenue of its spokes (spoke studies)', 'About ₹5.9 Cr a year (excluding the reserve)'],
    ['Mature site EBITDA of its spokes', 'About ₹2.7 Cr a year, about 3.8× the hub overhead'],
    ['Investor-model site revenue for this hub, FY31', 'About ₹6.1 Cr'],
  ],
}
export const CONFLICTS: Point[] = [
  { lead: 'Muziris concession in the wrong company.', text: 'Bond Water Sports Pvt Ltd holds MPL’s Letter of Acceptance for both live sites. Novate it to Bond Safari Paddle Sports with MPL’s consent, or sign an interim sub-licence approved by the investor director, and tell investors in writing.' },
  { lead: 'Blueway ownership.', text: 'The ₹2 Cr Coastal Blueway investment is proposed through Bond Water Sports. Paddling should sit in Bond Safari Paddle Sports; the board must decide before Marari is shown to investors.' },
  { lead: 'Kumarakom overstated in the model.', text: 'The model’s ₹1,600 ticket should be ₹1,100; mature revenue falls from about ₹1.91 Cr to about ₹1.31 Cr.' },
  { lead: 'Nalupanku motorised rides', text: '(Kumarakom) belong to Bond Adventures; any bid must be separate and on arm’s-length terms.' },
  { text: 'Jackson Peter sits on the KATPS Technical Committee and must recuse himself in writing from every Bond site’s registration.' },
]

// 1. What the hub does
export const HUB_INTRO = [
  'The hub holds the expensive, specialised things once for the whole region: the workshop, spare fleet, trailers and vehicle, the safety officer, the booking and marketing team, and the shop’s stock. Spokes stay light: a landing, a kiosk, a container and a small team.',
  'Ernakulam is also the network’s commercial engine. Kochi City alone had 2,995,609 domestic and 198,202 foreign visitors in 2025, and the hub sits within 90 minutes of Kerala’s two biggest backwater markets, Kumarakom and Alappuzha.',
]
export const HUB_HOLDS: Table = {
  caption: 'What the hub holds',
  head: ['Item', 'Detail', '₹ lakh'],
  rows: [
    ['Workshop and storage fit-out', 'Repairs, craft storage, PFD drying and kit stores', '30'],
    ['Pickup vehicle and 2 trailers', 'Moves craft between spokes and to the satellite at Cherai', '22'],
    ['Spare fleet (20 craft)', 'Peak-season top-ups; replaces damaged craft within a day', '12'],
    ['Rescue boat', 'Hub cover and training', '7'],
    ['Office and briefing room', 'Booking, marketing, safety office', '15'],
    ['IT, booking stack and CCTV', 'Common booking engine, loyalty and shop integration', '6'],
    ['Safety and first-aid equipment', 'Hub stock and spoke kits', '5'],
    ['Pre-operative', 'Recruitment, legal, registrations', '13'],
    ['Contingency', '', '10'],
  ],
  numeric: [2],
}
export const REGION: Table = {
  caption: 'Region covered',
  head: ['Factor', 'Position'],
  rows: [
    ['Districts', 'Ernakulam, Thrissur, Alappuzha, Kottayam'],
    ['Base', 'Mulavukad (Goshree corridor) or south Vypin'],
    ['Nearest spoke', 'Kadamakkudy, about 10 km'],
    ['Furthest spokes', 'Kumarakom and Bhoothathankettu, about 60 km; Alappuzha and Marari about 55 km'],
    ['Academy campus', 'Muziris–Kochi, FY28 (₹25 lakh)'],
  ],
}
export const SEASONS: Table = {
  caption: 'Seasons across the region',
  head: ['Period', 'Conditions', 'What it means'],
  rows: [
    ['October–March', 'Peak across the region; Biennale years add Kochi visitors', 'All spokes open; spare fleet deployed to Kumarakom and Alappuzha'],
    ['April–May', 'School holidays; hot', 'Early and late sessions; Cherai satellite daily'],
    ['June–September', 'Monsoon; Periyar flood flows; Nehru Trophy in August', 'Reduced operations; Academy training; fleet maintenance'],
  ],
}

// 2. Where to base it
export const BASE_INTRO = 'No specific vacant waterfront plot was found online; these are desk options to be checked on site. Each is scored 1–5 on six criteria.'
export const BASE_OPTIONS: Table = {
  caption: 'Hub base options, scored 1–5 on six criteria',
  head: ['Option', 'Access to spokes', 'Water / slipway', 'Land available', 'Cost', 'Academy fit', 'Permits', 'Total /30', 'Notes'],
  rows: [
    ['Mulavukad island, Goshree corridor (private plot)', '5', '3', '3', '4', '4', '3', '22', 'Road links to Muziris, Kochi and Vypin; Water Metro terminal planned at Mulavukad North; CRZ limits on building'],
    ['South Vypin near Goshree and the Vypin jetty', '4', '3', '3', '4', '3', '3', '20', 'Closest to the Vypin–Munambam road to Cherai and Muziris; Sea Blue Shipyard’s 500 T slipway nearby for rescue-boat work'],
    ['Bolgatty Island: Kochi International Marina (KTDC)', '4', '5', '2', '2', '4', '3', '20', 'Best brand location and deep water; ₹2 Cr upgrade finished Aug 2026; government land needs a KTDC lease or MoU; record of delays'],
    ['Kadamakkudy / Pizhala', '4', '4', '2', '4', '5', '2', '21', 'Ideal training water; pokkali wetlands and CRZ make building hard; best as the training spoke'],
  ],
  numeric: [1, 2, 3, 4, 5, 6, 7],
  highlight: [0],
  wrapHead: true,
}
export const BASE_POINTS: Point[] = [
  { text: 'Recommended: workshop, stores and office at Mulavukad or south Vypin; training water at the Kadamakkudy spoke; rescue-boat servicing at the Vypin slipway.' },
  { text: 'Approach KTDC about an Academy classroom or display at Bolgatty marina, without making the hub depend on it.' },
  { text: 'Keep the workshop off the main harbour channels: Cochin Port, ICTT Vallarpadam and Water Metro traffic make on-water transfers unsafe.' },
]

// 3. The spokes it serves
export const SPOKES_INTRO = 'Nine destinations sit under the Ernakulam hub. The table shows each one’s recommended model and mature-year results from its own feasibility report.'
export const SPOKES: Table = {
  caption: 'The nine destinations under the hub',
  head: ['Spoke', 'District', 'Water', 'Score', 'Wave', 'Recommended model', 'Mature revenue', 'Mature EBITDA'],
  rows: [
    ['Muziris–Kottapuram', 'Thrissur', 'River mouth, heritage', '—', 'Live (Oct 2026)', 'C. Expanded concession transferred to Bond Safari Paddle Sports', '65.2', '21.8'],
    ['Muziris–North Paravur (Thattukadavu)', 'Ernakulam', 'Backwater, heritage', '—', 'Live (Oct 2026)', 'C. Expanded concession transferred to Bond Safari Paddle Sports', '68.8', '24.0'],
    ['Kadamakkudy', 'Ernakulam', 'Island backwaters', '84', 'Wave 1 (FY28)', 'B. Standalone canal-edge spoke (Pizhala–Moolampilly)', '67.8', '32.9'],
    ['Kumbalangi', 'Ernakulam', 'Backwater, mangroves', '80', 'Wave 1 (FY28)', 'C. Community jetty with the panchayat and RT Mission', '65.0', '28.1'],
    ['Marari Coastal Blueway', 'Alappuzha', 'Coastal canals and pozhis', '78', 'Wave 2 (FY29)', 'C. Blueway operator licence from the panchayats', '64.4', '28.8'],
    ['Cherai–Vypin', 'Ernakulam', 'Backwater behind the beach', '77', 'Satellite (FY28)', 'C. Weekend and holiday satellite from the hub', '14.3', '5.6'],
    ['Kumarakom', 'Kottayam', 'Vembanad Lake', '76', 'Wave 2 (FY28)', 'B. Standalone spoke with resort sales partners', '131.0', '69.8'],
    ['Alappuzha–Punnamada', 'Alappuzha', 'Vembanad and Kuttanad canals', '76', 'Wave 2 (FY28)', 'B. Standalone canal-edge spoke (Pallathuruthy–Chungam)', '116.6', '60.1'],
    ['Bhoothathankettu', 'Ernakulam', 'Irrigation reservoir', '—', 'Reserve', 'A. Kayak add-on at DTPC’s boat jetty', '16.5', '1.1'],
  ],
  numeric: [3, 6, 7],
}
export const SPOKES_NOTE = 'Mature revenue and EBITDA are the base case of each spoke’s own feasibility report (₹ lakh, before hub and corporate overheads).'
export const SPOKES_POINTS: Point[] = [
  { text: 'Kumarakom and Alappuzha are the two largest spokes, about 42% of the hub’s mature spoke revenue between them.' },
  { text: 'Cherai is recommended only as a weekend satellite, and Bhoothathankettu only as a reserve.' },
  { text: 'Marari depends on canal clearing and on the Blueway’s company being settled; it should be treated as upside.' },
]

// 4. Hub economics
export const ECONOMICS_INTRO = [
  'The investor model funds six lines under this hub: the two Muziris concessions from FY27, and Kochi (Kumbalangi and Kadamakkudy as one line), Kumarakom, Alappuzha and Cherai from FY28. The table below shows their site revenue including B2B, before any corrections from the spoke studies.',
  'On a like-for-like mature basis (year 3, before the model’s 8% growth), the model’s six lines earn about ₹5.6 Cr. The spoke studies give about ₹5.3 Cr for the same sites. The main difference is Kumarakom (about ₹60 lakh lower), partly offset by the expanded Muziris product (about ₹40 lakh higher). Splitting Kochi into two spokes adds a second set of fixed costs, so site EBITDA falls by more than revenue.',
]
export const FUNDED_SITES: Table = {
  caption: 'Funded sites of this hub in the investor model (₹ lakh)',
  head: ['Site (investor model)', 'FY27', 'FY28', 'FY29', 'FY30', 'FY31', 'FY32', 'FY33'],
  rows: [
    ['Muziris – Paravur Thattukadavu', '5.8', '37.3', '46.6', '50.3', '54.3', '58.7', '63.4'],
    ['Muziris – Kottapuram', '5.8', '37.3', '46.6', '50.3', '54.3', '58.7', '63.4'],
    ['Kochi – Kumbalangi / Kadamakkudy', '—', '71.5', '114.4', '143.0', '154.4', '162.6', '162.6'],
    ['Kumarakom (Vembanad)', '—', '95.3', '152.4', '190.5', '205.8', '222.2', '236.5'],
    ['Alappuzha – Punnamada / Kuttanad', '—', '58.3', '93.3', '116.6', '125.9', '136.0', '146.9'],
    ['Cherai / Vypeen', '—', '9.1', '14.5', '18.1', '19.6', '21.1', '22.8'],
    ['Total site revenue incl. B2B', '11.6', '308.6', '467.7', '568.8', '614.3', '659.3', '695.5'],
  ],
  numeric: [1, 2, 3, 4, 5, 6, 7],
  highlight: [6],
}
export const HUB_COST: Table = {
  caption: 'Hub cost and contribution',
  head: ['Item', 'Value'],
  rows: [
    ['Hub capex (FY27)', '₹120 lakh'],
    ['Hub overhead', '₹72 lakh a year'],
    ['Mature site EBITDA of funded and pipeline spokes (spoke studies, excluding the reserve)', 'About ₹271 lakh a year'],
    ['Contribution after hub overhead', 'About ₹199 lakh a year, before corporate overhead'],
    ['Coverage of hub overhead', 'About 3.8 times'],
    ['Academy campus (FY28)', '₹25 lakh capex; about ₹15.6 lakh a year fixed cost'],
  ],
}
export const ECONOMICS_CLOSING = 'The Ernakulam hub covers its own overhead even without Kumarakom, Alappuzha and Marari: the two Muziris sites and the two Kochi spokes alone earn about ₹1.1 Cr of site EBITDA at maturity.'

// 5. The Academy campus
export const ACADEMY = [
  'The investor model opens the Muziris–Kochi Academy campus in FY28 with ₹25 lakh of capex: a training fleet (₹10 lakh), kit (₹3 lakh), a rescue boat (₹6.5 lakh), a classroom (₹4 lakh) and contingency (₹1.5 lakh).',
  'Recommended set-up: classroom and theory at the hub base (or at Bolgatty if KTDC agrees), water sessions at Kadamakkudy and Thattukadavu. Both are calm, tidal and within 45 minutes. Schools from Ernakulam and Thrissur, Kochi corporates, and guides for the Kumarakom and Alappuzha spokes are the main learners.',
  'Kumbalangi’s community guides, Marari’s Blueway youth and the Muziris sites’ local staff should all come through the campus, which gives the hub a steady supply of Paddle UK-qualified guides.',
]

// 6. People and organisation
export const PEOPLE: Table = {
  caption: 'Hub roles',
  head: ['Role', 'Number', 'What they do'],
  rows: [
    ['Hub manager', '1', 'Runs the region: spokes, gates, budgets, partners (MPL, DTPC, panchayats)'],
    ['Safety officer', '1', 'Risk assessments, audits, incident reviews, KATPS liaison (with MD recused)'],
    ['Workshop and fleet technician', '1', 'Repairs, maintenance, trailer moves'],
    ['Sales and partnerships lead', '1', 'Houseboats, resorts, corporates, schools, OTAs'],
    ['Operations coordinator', '1', 'Rosters, bookings, guide rotation'],
    ['Academy lead (from FY28)', '1', 'Paddle UK courses; guide pipeline'],
  ],
}

// 7. Permits, safety and related parties
export const PERMITS: Point[] = [
  { text: 'The hub base itself needs: a trade licence from Mulavukad or the relevant panchayat; CRZ clearance for any waterfront structure; Kerala Maritime Board registration of the rescue boat and trailers’ craft; and, at Bolgatty, a KTDC lease or MoU.' },
  { text: 'Each spoke needs its own KATPS registration and permissions, set out in its report. Vembanad–Kol is a Ramsar wetland, and the State Wetland Authority is tightening control of the lake.' },
  { lead: 'Conflict to manage.', text: 'Jackson Peter sits on the KATPS Technical Committee. He should recuse himself in writing from this site’s registration and inspection, and the recusal should be recorded with KATPS, as for every Bond site.' },
  { lead: 'Which company holds the site.', text: 'Kayaking, canoeing and SUP belong to Bond Safari Paddle Sports Pvt Ltd. Every lease, concession or bid for this site must be in that company’s name. Any motorised activity belongs to Bond Adventures Pvt Ltd, and any scuba or snorkelling to Bond Water Sports Pvt Ltd; shared costs between Bond companies must be on written arm’s-length terms approved by the investor director.' },
]

// 8. Risks
export const RISK_REGISTER: Table = {
  caption: 'Risks',
  head: ['#', 'Risk', 'Likelihood', 'Impact', 'How we manage it'],
  rows: [
    ['1', 'Muziris concession remains in Bond Water Sports', 'Certain until fixed', 'High', 'Novation or sub-licence; investor disclosure'],
    ['2', 'Blueway paddling sits in Bond Water Sports', 'Certain unless resolved', 'High', 'Board decision; revised proposal to the MLA'],
    ['3', 'Kumarakom revenue below the model', 'High', 'Medium', 'Update the model now (₹1.31 Cr, not ₹1.91 Cr)'],
    ['4', 'No suitable hub plot on the Goshree corridor', 'Medium', 'Medium', 'Vypin and Bolgatty alternatives; container-based workshop'],
    ['5', 'Too many spokes opening in FY28 at once', 'Medium', 'High', 'Phase: Kochi spokes first, Kumarakom and Alappuzha after Gate 1'],
    ['6', 'Water hyacinth and wetland rules on Vembanad', 'High', 'Medium', 'Spoke-level plans; shared guide pool'],
    ['7', 'Safety incident in a busy region', 'Low', 'Very high', 'One safety standard; monthly audits; rescue boats at every spoke'],
    ['8', 'KATPS conflict', 'Certain', 'Medium', 'Written recusal for every site'],
  ],
}

// 9. Launch plan and gates
export const LAUNCH_PLAN: Table = {
  caption: 'Launch plan and gates',
  head: ['When', 'Step', 'Owner', 'Gate'],
  rows: [
    ['November 2026', 'Novation letter to MPL; board decision on the Blueway; hub plot search', 'MD; board', ''],
    ['December 2026–January 2027', 'Demand counts at Kumarakom, Alappuzha, Kadamakkudy and Cherai', 'Hub manager', 'Gate 0 for each spoke'],
    ['By March 2027', 'Hub base lease; workshop fit-out; recruit hub team', 'MD', 'Gate 1: hub base operating'],
    ['April–May 2027 (FY28)', 'Kadamakkudy (April) and Kumbalangi (May) open; Cherai satellite for school holidays', 'Hub manager', ''],
    ['April–September 2027', 'Kumarakom and Alappuzha soft open, full opening in September', 'Hub manager', 'Spoke Gate 1s'],
    ['FY28', 'Muziris–Kochi Academy campus opens', 'Academy lead', ''],
    ['FY29', 'Marari Blueway opens if canals are cleared and the company question is settled', 'Board', 'Blueway conditions met'],
  ],
}

// Sources
export const SOURCES: { title: string; url?: string }[] = [
  { title: 'Kerala Tourism Statistics 2025', url: 'https://www.keralatourism.org/tourismstatistics/tourists_statistics_202520260507114657.pdf' },
  { title: 'Onmanorama: Kochi marina yachts abandoned (Oct 2025)', url: 'https://www.onmanorama.com/news/kerala/2025/10/03/foreign-luxuary-yachts-abandoned-kochi-marina.html' },
  { title: 'TravTalk: Kochi Marina ₹2 Cr upgrade (Aug 2026)', url: 'https://travtalkindia.com/kochi-marina-targets-40-yacht-arrivals-after-%e2%82%b92-cr-upgrade/' },
  { title: 'KTDC: Kochi International Marina', url: 'https://www.ktdc.com/kochi-international-marina/' },
  { title: 'Noonsite: Cochin boatyards (Sea Blue Shipyard, Vypin)', url: 'https://www.noonsite.com/place/india/cochin-kochi/view/boatyards' },
  { title: 'Onmanorama: Water Metro to reach Kadamakkudy (Jul 2025)', url: 'https://www.onmanorama.com/travel/travel-news/2025/07/26/water-metro-reach-kadamakkudy.html' },
  { title: 'Wikipedia: Mulavukad Gram Panchayat', url: 'https://en.wikipedia.org/wiki/Mulavukad_Gram_Panchayat' },
  { title: 'Bond Safari Paddle Sports financial model; spoke feasibility reports (internal)' },
]
export const CLOSING_NOTE = 'Prepared for the board and investors of Bond Safari Paddle Sports Pvt Ltd. Figures are estimates for decision-making, not guarantees. Desk research as of November 2026.'
