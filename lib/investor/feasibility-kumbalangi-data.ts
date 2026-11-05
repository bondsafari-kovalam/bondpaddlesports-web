import 'server-only'
import type { Point, Table } from './feasibility-data'

/**
 * CONFIDENTIAL. "Kumbalangi Paddle Sports Centre: Paddle Sports Feasibility Study" (November 2026), prepared by Jackson
 * Peter, transcribed as written. View only, like every feasibility study: shown in the portal and never served as a
 * file. It must never be pushed to a public repository.
 */

// These passages are worded the same in every spoke report of this series.
export { CAPACITY, CLOSING_NOTE, COVER_NOTE, FINANCE_INTRO, HOW_TO_READ, KATPS_CONFLICT, LOCATIONS_INTRO, RETHINK_NOTE, SITE_HOLDER, SUMMARY_CAVEAT } from './feasibility-kovalam-data'

export const COVER_FACTS = [
  ['Destination', 'Kumbalangi, Ernakulam district'],
  ['Hub', 'Ernakulam hub'],
  ['Network score / wave', '80 / 100 · Wave 1 (FY28)'],
  ['Verdict', 'Go, with a community partnership'],
  ['Date', 'November 2026'],
  ['Prepared for', 'The board and investors of Bond Safari Paddle Sports Pvt Ltd'],
]
export const VERDICT_TITLE = 'The answer: Go, with a community partnership'
export const VERDICT = 'Open in FY28 as a community-partnered spoke with Kumbalangi Grama Panchayat and the Responsible Tourism Mission, from a shared jetty near Kallanchery. Run night ‘kavaru’ paddles only under a written night protocol approved by KATPS and the panchayat.'

// Executive summary
export const SUMMARY = [
  'Kumbalangi is India’s first model fishing and tourism village (2003), an island south of Fort Kochi with Chinese nets, mangroves and homestays. Since the 2019 film ‘Kumbalangi Nights’ it has become known for ‘kavaru’, the blue bioluminescence that appears in its backwaters from February to May. Kavaru kayaking is now marketed online.',
  'The best route in is a partnership with the community, not a private enclave. The integrated tourism village project is only about 15% complete after 22 years (a local source, January 2025), homestays already run canoe trips, and residents worry about waste and high-rise pressure. A shared jetty run with the panchayat and the Responsible Tourism Mission, with a 10% community share, gives Bond the licence to operate. It earns about ₹65 lakh of mature revenue and ₹28 lakh of EBITDA.',
  'Kavaru is the demand hook and the main safety risk. Bond’s standard bans paddling after dark. The report recommends a short, lit dusk-to-early-night product within sight of the jetty, only under a written night protocol.',
]
export const SUMMARY_WHY: Point[] = [
  { text: 'Known nationally through ‘Kumbalangi Nights’ and the kavaru season (February–May)' },
  { text: 'Fort Kochi (35,014 foreign visitors in 2025) and Kochi City hotels are 15–20 minutes away' },
  { text: 'Calm, shallow backwater with mangroves and Chinese nets' },
  { text: 'An existing Responsible Tourism trail and many homestays to partner with' },
]
export const SUMMARY_MODELS: Table = {
  caption: 'The models compared (mature year, ₹ lakh)',
  head: ['Model', 'Capex', 'Revenue', 'EBITDA', 'Margin', 'Payback', '5-year value'],
  rows: [
    ['A. Kit at four homestays', '36', '28.8', '3.7', '13%', 'Not within 5 years', '(33.8)'],
    ['B. Standalone private waterfront spoke', '47', '61.4', '27.7', '45%', '2.7 years', '6.9'],
    ['C. Community jetty with the panchayat and RT Mission', '40', '65.0', '28.1', '43%', '2.3 years', '16.5'],
  ],
  numeric: [1, 2, 3, 4, 5, 6],
  highlight: [2],
}
export const CONFLICTS: Point[] = [
  { text: 'The investor model treats Kumbalangi and Kadamakkudy as one Kochi site; this report takes half of that line.' },
  { text: 'Night paddling conflicts with Bond’s own safety standard. Do not sell kavaru paddles until a night protocol is approved in writing.' },
  { text: 'Bioluminescence is partly a symptom of eutrophication (Noctiluca blooms with low oxygen, per Down To Earth, April 2025). Marketing it uncritically could backfire; pair it with a clean-water message and action.' },
  { text: 'Jackson Peter sits on the KATPS Technical Committee and must recuse himself in writing from this site’s registration and from approving any night protocol.' },
]

// 1. Why this destination
export const WHY_INTRO = 'Kumbalangi is an island village south of Fort Kochi, surrounded by the Kallanchery and Kumbalangi lakes of the Kochi backwater, next to Chellanam and Edakochi. It was launched in 2003 as India’s first model fishing and tourism village. Visitors come for Chinese nets, mangroves, toddy tapping, coir making, country-boat rides and, from February to May, the kavaru bioluminescence.'
export const WHY_CASE: Point[] = [
  { lead: 'A known name.', text: 'The 2019 film ‘Kumbalangi Nights’ and recent coverage of kavaru kayaking (Onmanorama, February 2026) give it a profile beyond its size.' },
  { lead: 'Close to Fort Kochi.', text: 'Fort Kochi’s foreign visitors and city hotels (Taj Malabar runs ‘Kumbalangi adventures’) are a short drive away.' },
  { lead: 'Calm, shallow water.', text: 'Suits beginners and families; mangrove channels make good guided routes.' },
  { lead: 'Community infrastructure.', text: 'Homestays and the Responsible Tourism Mission’s Life Experience Trail give Bond partners from day one.' },
  { lead: 'A seasonal premium product.', text: 'Kavaru, done safely, is a product few places in India can offer.' },
]
export const HUB_FIT: Table = {
  caption: 'How it fits the hub',
  head: ['Factor', 'Position'],
  rows: [
    ['Hub', 'Ernakulam (Kochi–Vypin base)'],
    ['Distance from hub', 'About 20 km, 40–50 minutes via Thoppumpady (estimate)'],
    ['Hub provides', 'Guides, spare kit, repairs, safety officer, booking'],
    ['Needed on site', 'Shared jetty, kiosk, container storage, a site lead and 3 guides'],
    ['Sister spoke', 'Kadamakkudy, on the other side of Kochi; guides can rotate'],
  ],
}
export const SEASONS: Table = {
  caption: 'Seasons',
  head: ['Period', 'Conditions', 'What it means for paddling'],
  rows: [
    ['October–January', 'Cool, dry', 'Peak for day paddles'],
    ['February–May', 'Kavaru season; hot from March', 'Night-viewing demand; early-morning day paddles'],
    ['June–September', 'Monsoon; lower salinity', 'Low demand; good-weather days only'],
  ],
}

// 2. Demand
export const VISITORS: Table = {
  caption: 'The visitor base',
  head: ['Measure', 'Visitors', 'Basis'],
  rows: [
    ['Kochi City, domestic', '2,995,609', 'Kerala Tourism Statistics 2025'],
    ['Kochi City, foreign', '198,202', 'KTS 2025'],
    ['Fort Kochi, foreign', '35,014', 'KTS 2025'],
    ['Kochi leisure base in the investor model', '1,130,089', 'For Kumbalangi and Kadamakkudy together'],
    ['Base used for Kumbalangi', '565,045', 'Half of the combined Kochi line'],
  ],
  numeric: [1],
}
export const VISITORS_NOTE = 'Kumbalangi has no published visitor count. The base is a share of Kochi’s leisure visitors. Kavaru season brings crowds at night that are not in any statistic, and crowd-control complaints were reported in 2025.'
export const CAPTURE_INTRO: Point = { lead: 'From visitors to paddlers.', text: 'We use 1% capture for the community jetty model, the same as the investor model, and 0.9% for a private site with less community promotion.' }
export const CAPTURE: Table = {
  caption: 'Paddlers at each capture rate',
  head: ['Capture', 'Paddlers a year', 'A day (255 days)', 'Peak day (≈2×)', 'Share of capacity (20 craft)'],
  rows: [
    ['0.5%', '2,825', '11', '22', '22%'],
    ['0.75%', '4,238', '17', '33', '33%'],
    ['1%', '5,650', '22', '44', '44%'],
    ['1.25%', '7,063', '28', '55', '55%'],
    ['1.5%', '8,476', '33', '66', '66%'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [2],
}
export const SPEND_INTRO: Point = { lead: 'What each paddler spends.', text: 'We use an average of ₹1,000 per paddler, made up of:' }
export const SPEND_BLEND: Point[] = [
  { text: 'Day mangrove and Chinese-net paddle, 2 hours, at ₹1,000' },
  { text: 'Dusk kavaru paddle (February–May, under protocol) at ₹1,500' },
  { text: 'SUP lessons at ₹1,200; family sessions at a discount' },
  { text: 'About 15% more from B2B: hotel excursions, schools, corporate groups and the shop' },
]
export const BASE_REVENUE: Point = { lead: 'Base-case revenue.', text: '5,650 paddlers × ₹1,000 × 1.15 ≈ ₹0.65 Cr a year once the site is mature (model C).' }
export const DEMAND_CHECK: Point[] = [
  { text: 'Meet Kumbalangi Grama Panchayat and the Responsible Tourism Mission on a shared jetty and community share' },
  { text: 'Observe kavaru-season crowds on two nights in February 2027 before designing the night product' },
  { text: 'Count homestay canoe trips and their prices' },
]

// 3. Who we sell to
export const SEGMENTS: Table = {
  caption: 'Who we sell to',
  head: ['Segment', 'Who they are', 'What they want', 'Our product', 'How we reach them', 'Share'],
  rows: [
    ['Fort Kochi and city tourists', 'Domestic and foreign visitors in Kochi', 'Village life and a short paddle', '2-hour mangrove and Chinese-net paddle', 'Hotels; GetYourGuide; Fort Kochi homestays', '35%'],
    ['Kavaru seekers', 'Young domestic visitors, couples', 'See the blue glow', 'Dusk kavaru paddle under protocol', 'Instagram; Onmanorama-style coverage', '20%'],
    ['Kochi weekend groups', 'Residents and students', 'Fun and photos', 'Sunset SUP and kayak', 'Instagram; Bond Membership', '20%'],
    ['Homestay guests', 'Guests at Kumbalangi homestays', 'Something to do at the village', 'Morning paddle from the homestay', 'Homestay commission', '15%'],
    ['Schools and corporates', 'Kochi schools and companies', 'Learning and team-building', 'School paddle tier; team paddles', 'Direct B2B', '10%'],
  ],
}
export const POSITION: Point = { lead: 'Our position.', text: 'Kumbalangi paddled with the village: certified guides, local hosts and a share for the community.' }
export const SEGMENTS_AVOID: Point[] = [
  { text: 'Large night groups in kavaru season' },
  { text: 'Routes close to fixed nets and Chinese nets while they are working' },
]

// 4. Competition and pricing
export const OPERATORS: Table = {
  caption: 'Who already operates here',
  head: ['Operator or channel', 'What they offer', 'Published price', 'Notes'],
  rows: [
    ['KRTMS Kumbalangi Life Experience Trail', 'Day trail with country-boat ride, Chinese nets, toddy tapping', 'Not published (paid offline)', 'Partner, not rival'],
    ['Lokalee and other OTAs', 'Full-day village tour with canoe boating, from Kochi', 'Not published, 7–8 hours', 'Tour resellers'],
    ['Clicatour', 'Canoe ride through mangroves from Cochin', 'Not verified', 'Reseller'],
    ['Homestay canoe trips', 'Country-canoe rides for guests', 'Usually bundled; not published', 'Price competition for casual rides'],
    ['Kavaru kayaking sellers', 'Night kayaking in bioluminescence season', 'Names and prices not verified', 'Check on site in February'],
  ],
}
export const COMPETITION_CONCLUSIONS: Point[] = [
  { text: 'There is no established certified paddle operator in Kumbalangi; most boating is country canoes run by homestays.' },
  { text: 'The Responsible Tourism trail and homestays are better as partners than as competitors.' },
  { text: 'Kavaru kayaking is already being sold. Bond’s advantage is a safe, controlled version.' },
]
export const PRICE_LIST: Table = {
  caption: 'Proposed price list (inclusive of GST; check against the 2027 rate card)',
  head: ['Product', 'Duration', 'Price'],
  rows: [
    ['Mangrove and Chinese-net guided paddle', '2 hours', '₹1,000'],
    ['Dusk kavaru paddle (February–May, under protocol)', '1.5 hours', '₹1,500'],
    ['Village paddle with Responsible Tourism trail (joint product)', 'Half day', '₹1,800'],
    ['SUP lesson', '1.5 hours', '₹1,200'],
    ['Family session, 2 adults and 2 children', '1.5 hours', '₹2,600'],
  ],
  numeric: [2],
}
export const PRICE_NOTE = 'At the expected product mix, this gives an average of about ₹1,000 per paddler before B2B sales.'

// 5. Possible locations
export const LOCATIONS: Table = {
  caption: 'Possible locations, scored from 1 to 5 on seven criteria',
  head: ['Location', 'Footfall', 'Water', 'Safety', 'Access', 'Site', 'Comp.', 'Permits', 'Total /35', 'Role'],
  rows: [
    ['Kallanchery (Responsible Tourism trail point)', '3', '4', '4', '4', '4', '4', '4', '27', 'Base for the community jetty model'],
    ['Private waterfront plot near the village centre', '3', '4', '4', '4', '3', '4', '3', '25', 'Base for Model B'],
    ['Homestay waterfronts', '2', '4', '4', '3', '3', '3', '4', '23', 'Sales and pick-up points'],
    ['Kavaru viewing spots (Mundamveli, Chellanam, Anjilithara, Attathadom)', '3', '3', '2', '3', '2', '3', '2', '18', 'Seasonal night product only, under protocol'],
  ],
  numeric: [1, 2, 3, 4, 5, 6, 7, 8],
  highlight: [0],
  wrapHead: true,
}
export const LOCATION_POINTS: Point[] = [
  { text: 'Choose the base where the panchayat and community will back it; Kallanchery fits the existing trail.' },
  { text: 'Kavaru spots change with the bloom; design night routes within sight of a lit jetty.' },
]

// 6. Operating models
export const MODELS: { title: string; points: Point[] }[] = [
  {
    title: 'A. Kit at four homestays',
    points: [
      { lead: 'How it works.', text: 'We place 4–5 craft at each of four homestays; the homestay sells to guests and keeps 25%.' },
      { lead: 'For:', text: 'Guests on site; Community income; No lease.' },
      { lead: 'Against:', text: 'Small volumes; Four lone guides; Uneven quality.' },
      { lead: 'Verdict:', text: 'Too small and too hard to keep safe.' },
    ],
  },
  {
    title: 'B. Standalone private waterfront spoke',
    points: [
      { lead: 'How it works.', text: 'Bond leases a private waterfront plot with pontoon and kiosk and sells to all visitors.' },
      { lead: 'For:', text: 'Full control; Clear tenure.' },
      { lead: 'Against:', text: 'Seen as an outsider in a community-tourism village; Higher fixed costs; Lower promotion from the panchayat and the RT trail.' },
      { lead: 'Verdict:', text: 'Fallback if the community model is refused.' },
    ],
  },
  {
    title: 'C. Community jetty with the panchayat and RT Mission',
    points: [
      { lead: 'How it works.', text: 'Kumbalangi Grama Panchayat provides a shared jetty and storage near Kallanchery for about ₹2 lakh a year. Bond runs the paddle operation and pays 10% of revenue into a community fund for canal cleaning and local training. Joint products are sold with the Responsible Tourism trail.' },
      { lead: 'For:', text: 'Licence to operate in a community-tourism village; Promotion through the panchayat and RT Mission; Lower capex.' },
      { lead: 'Against:', text: '10% community share; Shared control with the panchayat; Tenure depends on panchayat terms.' },
      { lead: 'Verdict:', text: 'Recommended, if the panchayat agrees in writing.' },
    ],
  },
]
export const COMPARISON_RESULT: Point = { lead: 'Result.', text: 'C and B produce similar numbers, but C earns the community’s support in a village where tourism is a public project. That matters more here than a few lakh of EBITDA.' }
export const COMPARISON_KEY = 'Key: A = Kit at four homestays; B = Standalone private waterfront spoke; C = Community jetty with the panchayat and RT Mission.'
export const COMPARISON: Table = {
  caption: 'Comparison of the models',
  head: ['Criterion', 'Weight', 'A', 'B', 'C'],
  rows: [
    ['Value created (5-year value)', '25%', '1', '2', '3'],
    ['Capital needed', '10%', '4', '3', '4'],
    ['Margin and resilience', '15%', '2', '4', '4'],
    ['Control of brand, quality, safety', '15%', '2', '5', '4'],
    ['Security of tenure', '10%', '2', '3', '3'],
    ['Speed to open and permit risk', '10%', '4', '2', '3'],
    ['Footfall and visibility', '10%', '2', '3', '4'],
    ['Environmental and reputational risk', '5%', '4', '3', '5'],
    ['Weighted score', '100%', '2.3', '3.1', '3.6'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [8],
}

// 7. Financial assessment
export const ASSUMPTIONS: Table = {
  caption: 'Key assumptions',
  head: ['Assumption', 'A', 'B', 'C'],
  rows: [
    ['Paddlers a year (mature)', '2,400', '5,085', '5,650'],
    ['Average ticket', '₹1,200', '₹1,050', '₹1,000'],
    ['B2B and courses on top', '0%', '15%', '15%'],
    ['Revenue share', '25%', '—', '10%'],
    ['Variable costs', '10%', '19%', '19%'],
    ['Fixed costs a year', '15.0', '22.0', '18.0'],
    ['of which lease or rent', '0.0', '4.0', '2.0'],
    ['Capex', '36', '47', '40'],
  ],
  numeric: [1, 2, 3],
}
export const CAPEX: Point[] = [
  { lead: 'A. Kit at four homestays:', text: 'Craft and PFDs (4 sets) 26; Rescue boat and safety kit 6; Racks and branding 4; total 36.' },
  { lead: 'B. Standalone private waterfront spoke:', text: 'Craft 27; Rescue boat and safety kit 6; Pontoon, kiosk, storage, branding 14; total 47.' },
  { lead: 'C. Community jetty with the panchayat and RT Mission:', text: 'Craft 27; Rescue boat and safety kit 6; Kiosk, storage and night-safety lighting 7; total 40.' },
]
export const MATURE_YEAR: Table = {
  caption: 'Mature year (year 3 onward)',
  head: ['', 'A', 'B', 'C'],
  rows: [
    ['Revenue', '28.8', '61.4', '65.0'],
    ['Less revenue share', '(7.2)', '—', '(6.5)'],
    ['Less variable costs', '(2.9)', '(11.7)', '(12.3)'],
    ['Less fixed costs', '(15.0)', '(22.0)', '(18.0)'],
    ['EBITDA', '3.7', '27.7', '28.1'],
    ['EBITDA margin', '13%', '45%', '43%'],
    ['Payback', 'Not within 5 years', '2.7 years', '2.3 years'],
    ['5-year cumulative cash after capex', '(27.7)', '64.3', '75.3'],
    ['5-year value at 25%', '(33.8)', '6.9', '16.5'],
  ],
  numeric: [1, 2, 3],
  highlight: [4, 8],
}
export const FIVE_YEAR_PATH: Table = {
  caption: 'The five-year path for the recommended model (C)',
  head: ['Year', '1', '2', '3', '4', '5'],
  rows: [
    ['Volume vs mature', '60%', '85%', '100%', '100%', '100%'],
    ['Revenue', '39.0', '55.2', '65.0', '65.0', '65.0'],
    ['EBITDA', '9.7', '21.2', '28.1', '28.1', '28.1'],
    ['Cumulative cash after ₹40 lakh capex', '(30.3)', '(9.1)', '19.0', '47.2', '75.3'],
  ],
  numeric: [1, 2, 3, 4, 5],
}
export const SENSITIVITY: Table = {
  caption: 'How sensitive is the recommended model (C)?',
  head: ['Scenario', 'Mature revenue', 'Mature EBITDA', '5-year value', 'Payback'],
  rows: [
    ['Base case', '65.0', '28.1', '16.5', '2.3 years'],
    ['Demand one-third lower', '43.3', '12.8', '(18.5)', '4.5 years'],
    ['Price 18% lower', '53.3', '19.8', '(2.4)', '3.1 years'],
    ['Downside: demand one-third lower and price 18% lower', '35.5', '7.2', '(31.1)', 'Not within 5 years'],
    ['Severe: demand halved and price 18% lower', '26.6', '0.9', '(45.4)', 'Not within 5 years'],
    ['Demand one-third higher', '86.6', '43.5', '51.4', '1.6 years'],
    ['Price 18% higher', '76.7', '36.4', '35.4', '1.9 years'],
    ['Fixed costs 20% higher', '65.0', '24.5', '6.8', '2.7 years'],
    ['Capex 25% higher', '65.0', '28.1', '6.5', '2.7 years'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [0],
}
export const SENSITIVITY_READING: Point = { lead: 'Reading the sensitivities.', text: 'Mature-year EBITDA breaks even at about 0.39% capture (2,205 paddlers), 39% of the base case.' }
export const REVENUE_SHARES: Table = {
  caption: 'Model C at different revenue shares',
  head: ['Share to the owner', 'Mature EBITDA', '5-year value at 25%'],
  rows: [
    ['10%', '28.1', '16.5'],
    ['15%', '24.9', '9.1'],
    ['20%', '21.6', '1.7'],
    ['25%', '18.4', '(5.7)'],
    ['30%', '15.1', '(13.1)'],
  ],
  numeric: [1, 2],
}
export const REVENUE_SHARES_NOTE = 'Above a community share of about 17%, the private site (B) becomes the better option on 5-year value.'

// 8. The community partnership and the night protocol
export const PARTNERSHIP_INTRO = [
  'Propose to Kumbalangi Grama Panchayat and the Responsible Tourism Mission: a shared jetty near Kallanchery, 10% of paddle revenue into a community fund, at least 75% local guides, joint village-and-paddle products, and a cap on group sizes.',
  'Kavaru night paddles need a written protocol before any sale: dusk to two hours after sunset only; routes within sight of a lit jetty; ratio 1:4; lights on every craft and PFD; rescue boat on the water; no paddling in a bloom with low-oxygen fish kills; approval from KATPS (with the MD recused) and the panchayat.',
]
export const TERMS: Table = {
  caption: 'Terms we need',
  head: ['Term', 'Our position', 'Walk away if'],
  rows: [
    ['Partner', 'Kumbalangi Grama Panchayat with the RT Mission', 'Panchayat wants an exclusive local operator only'],
    ['Community share', '10% of paddle revenue', 'Above 20%'],
    ['Jetty and storage', 'Shared jetty and lockable storage for about ₹2 lakh a year', 'No secure storage'],
    ['Tenure', '5 years with renewal', 'Under 3 years'],
    ['Night paddles', 'Allowed under the written protocol', 'Required at large scale without protocol'],
  ],
}
export const QUESTIONS: Point[] = [
  { text: 'Will the panchayat agree to a shared jetty and a community share?' },
  { text: 'Who sells kavaru kayaking now, at what price and with what safety?' },
  { text: 'Are there local rules on night paddling?' },
  { text: 'Which homestays would partner on commission?' },
]

// 9. Permits, environment and safety
export const PERMITS_INTRO = 'Kumbalangi’s backwater lies in CRZ and the Vembanad–Kol Ramsar system. Its ecology is under stress: Noctiluca blooms above 100,000 cells per litre with low oxygen and fish deaths (Down To Earth, April 2025), waste dumping and saltwater intrusion.'
export const PERMITS: Table = {
  caption: 'Permits checklist (to confirm with each authority)',
  head: ['Permit or registration', 'Authority', 'Applies here'],
  rows: [
    ['Adventure tourism operator registration', 'KATPS', 'Required; night protocol to be approved'],
    ['Trade licence and jetty agreement', 'Kumbalangi Grama Panchayat', 'Required'],
    ['Rescue-boat registration', 'Kerala Maritime Board', 'Required'],
    ['Waterfront structures', 'Kerala Coastal Zone Management Authority', 'Removable structures only'],
    ['Fisheries interests', 'Fisheries Department; local fishers', 'Agree routes'],
    ['Insurance and GST', 'Insurer; GST', 'Required; night activity declared to the insurer'],
  ],
}
export const ENVIRONMENT: Point[] = [
  { text: 'Clean-water message with every kavaru product, and part of the community fund for waste clearing' },
  { text: 'No paddling through mangrove roots; no landing on bunds' },
  { text: 'Group caps in kavaru season' },
  { text: 'At least 75% of guides from the village' },
]
export const SAFETY: Table = {
  caption: 'Safety standard',
  head: ['Area', 'Standard'],
  rows: [
    ['Guides', 'Paddle UK-qualified, at least Paddlesport Leader or SUP Instructor for open water; first aid and rescue trained'],
    ['Ratio', '1:6 for beginners; 1:8 for experienced guests; 1:4 for children'],
    ['Equipment', 'A PFD worn by every guest at all times; whistles; tow lines; spare paddles'],
    ['Rescue cover', 'A motorised rescue boat on standby whenever a group is on the water'],
    ['Weather and water', 'No sessions in thunderstorms, after dark, in strong wind or after heavy rain; daily water check'],
    ['Records', 'Risk assessment for each route; daily log; incident reporting; monthly audit by the hub safety officer'],
    ['Night protocol', 'Dusk to two hours after sunset; lit routes in sight of the jetty; ratio 1:4; lights on every craft; rescue boat on the water'],
  ],
}

// 10. Risks
export const RISK_REGISTER: Table = {
  caption: 'Risks',
  head: ['#', 'Risk', 'Likelihood', 'Impact', 'How we manage it'],
  rows: [
    ['1', 'Night-paddle incident', 'Low–Medium', 'Very high', 'Written protocol; small groups; lights; rescue boat; insurer informed'],
    ['2', 'Community opposition to an outside operator', 'Medium', 'High', 'Community jetty model; local hiring; 10% fund'],
    ['3', 'Algal blooms and pollution', 'High (seasonal)', 'Medium', 'Suspend in low-oxygen events; clean-water action'],
    ['4', 'Slow government project delivery', 'High', 'Low', 'Do not depend on project infrastructure'],
    ['5', 'Homestay price competition', 'Medium', 'Low', 'Partner with homestays on commission'],
    ['6', 'Demand split with Kadamakkudy', 'Medium', 'Medium', 'Different product: heritage village and kavaru vs islands and training'],
    ['7', 'KATPS conflict', 'Certain', 'Medium', 'Written recusal, including on the night protocol'],
  ],
}
export const RISK_NOTE: Point = { lead: 'The two risks that decide the case are community acceptance and night safety. Neither can be fixed with money; both need written agreements before opening.' }

// 11. Recommendation and launch plan
export const RECOMMENDATION: Point[] = [
  { text: 'Open in FY28 as a community-partnered spoke from a shared jetty near Kallanchery.' },
  { text: 'Agree the community share, local hiring and group caps with the panchayat and RT Mission first.' },
  { text: 'Launch day paddles first; add kavaru paddles in February 2028 only under an approved night protocol.' },
  { text: 'Run Kumbalangi and Kadamakkudy with a shared guide pool.' },
]
export const OPENING_MOVED_TITLE = 'Opening moved to FY29'
export const OPENING_MOVED = 'Funding decision, 3 Nov 2026: this opening moves from FY28 to FY29 to keep the round at ₹6.75 Cr. Read every date in the launch plan below as 12 months later; the gates and KPIs are unchanged.'
export const LAUNCH_PLAN: Table = {
  caption: 'Launch plan',
  head: ['When', 'Step', 'Owner', 'Gate'],
  rows: [
    ['November 2026–January 2027', 'Panchayat and RT Mission talks; homestay partners', 'Ernakulam hub manager', ''],
    ['February 2027', 'Observe kavaru-season nights; draft night protocol', 'Safety officer', 'Gate 0: community support and site agreed'],
    ['March 2027', 'Agreement signed; KATPS registration (with MD recusal)', 'MD; safety officer', 'Gate 1'],
    ['May 2027', 'Opening with day paddles', 'Site lead', ''],
    ['February 2028', 'Kavaru paddles under the approved protocol', 'Site lead; safety officer', 'Night protocol approved'],
    ['March 2028', 'First-year review', 'Board', 'Gate 2'],
  ],
}
export const KPIS: Table = {
  caption: 'First-year KPIs and gate thresholds',
  head: ['KPI', 'Target', 'Scale up if', 'Rethink if'],
  rows: [
    ['Paddlers in year 1', '3,390', '3,221 or more', 'Under 2,204'],
    ['Average spend per paddler (incl. B2B)', '₹1,150', '₹1,093 or more', 'Under ₹900'],
    ['EBITDA in year 1 (₹ lakh)', '9.7', '8.7 or more', 'Below zero'],
    ['Guest rating (Google, Tripadvisor)', '4.7', '4.6 or more', 'Under 4.3'],
    ['Safety', 'Zero reportable incidents', 'Zero', 'Any serious incident (immediate review)'],
    ['Guides from the local community', '75%', '75% or more', '—'],
  ],
}

// Sources
export const SOURCES: { title: string; url?: string }[] = [
  { title: 'Kerala Tourism: Kumbalangi tourism village', url: 'https://keralatourism.org/destination/kumbalangi-kochi-tourist-village/353' },
  { title: 'Kerala Tourism: Kumbalangi Life Experience Trail', url: 'https://www.keralatourism.org/responsible-tourism/life-experience-trails-keralam/trails/kumbalangi' },
  { title: 'Onmanorama: Kavaru season begins in Kumbalangi (Mar 2025)', url: 'https://www.onmanorama.com/travel/kerala/2025/03/12/kumbalangi-nights-kavaru-kerala-paddy-fields-blue-light-season-kochi.amp.html' },
  { title: 'Onmanorama: Kavaru kayaking in Kumbalangi (Feb 2026)', url: 'https://www.onmanorama.com/web-stories/travel/2026/02/08/kayak-kumbalangi-kavaru-season-valentines-day.html' },
  { title: 'Down To Earth: Kochi’s bioluminescent backwaters crisis (Apr 2025)', url: 'https://www.downtoearth.org.in/amp/story/environment/behind-the-beauty-of-kochis-bioluminescent-backwaters-lies-a-looming-crisis' },
  { title: 'The News Minute: Kumbalangi faces ecosystem challenges (Jan 2025)', url: 'https://www.thenewsminute.com/kerala/kumbalangi-model-tourism-village-an-idyllic-hamlet-faces-ecosystem-challenges' },
  { title: 'Lokalee: Kumbalangi village tour', url: 'https://lokalee.app/tours/kumbalangi-village-tour-from-cochin' },
  { title: 'TripXL: Kayaking in Kochi price guide', url: 'https://tripxl.com/blog/kayaking-in-kochi' },
  { title: 'Kerala Tourism Statistics 2025', url: 'https://www.keralatourism.org/tourismstatistics/tourists_statistics_202520260507114657.pdf' },
]
