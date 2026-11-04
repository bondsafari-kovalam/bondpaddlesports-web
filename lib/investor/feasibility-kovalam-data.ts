import 'server-only'
import type { Point, Table } from './feasibility-data'

/**
 * CONFIDENTIAL. "Kovalam Paddle Sports Centre: Paddle Sports Feasibility Study" (November 2026), prepared by Jackson
 * Peter, transcribed as written. View only, like every feasibility study: shown in the portal and never served as a
 * file. It must never be pushed to a public repository.
 */

// The cover note and reading guide are the same in every hub and spoke report of this series.
export { COVER_NOTE, HOW_TO_READ } from './feasibility-trivandrum-hub-data'

export const COVER_FACTS = [
  ['Destination', 'Kovalam, Thiruvananthapuram district'],
  ['Hub', 'Trivandrum hub'],
  ['Network score / wave', '81 / 100 · Wave 1 (opens January 2027, with the hub)'],
  ['Verdict', 'Go'],
  ['Date', 'November 2026'],
  ['Prepared for', 'The board and investors of Bond Safari Paddle Sports Pvt Ltd'],
]
export const VERDICT = 'Open in January 2027 as the hub’s home spoke, run from the Bond campus with sea SUP and sea kayaking for October–May, and keep Vellayani as the flat-water partner for beginners and the monsoon.'

// Executive summary
export const SUMMARY = [
  'Kovalam is the strongest spoke in the Trivandrum hub and the right place to start. It had 693,760 visitors in 2025, of whom 61,228 were foreign, the sixth-highest foreign count in Kerala. No operator sells kayaking here, and the only SUP offer we found costs ₹2,499 for 1.5–2 hours. Bond already runs parasailing on this beach and has its head office and Academy campus here.',
  'The constraint is the water, not demand. Kovalam is open sea with undercurrents close to shore; three tourists were rescued in March 2026 and the lifeguards have no rescue boat. Paddling must run only in the morning calm, in a marked zone away from swimmers, with our own rescue boat, and must stop from June to September. Beginners and monsoon training go to Vellayani Lake, 7 km away.',
  'The base case keeps the investor model’s 1.5% capture and ₹1,200 average ticket. That gives about ₹1.44 Cr of mature revenue and about ₹86 lakh of EBITDA from the campus, with capex of ₹41 lakh.',
]
export const SUMMARY_WHY: Point[] = [
  { text: '693,760 visitors in 2025 (632,532 domestic, 61,228 foreign); Kovalam is Kerala’s 6th foreign destination.' },
  { text: 'No kayak operator found; one SUP offer at ₹2,499. The gap is open.' },
  { text: 'Bond’s home: head office, Academy campus and Bond Adventures’ parasailing are already here.' },
  { text: 'Sea SUP and sea kayaking are premium products that inland lakes cannot offer.' },
]
export const SUMMARY_MODELS: Table = {
  caption: 'The models compared (mature year, ₹ lakh)',
  head: ['Model', 'Capex', 'Revenue', 'EBITDA', 'Margin', 'Payback', '5-year value'],
  rows: [
    ['A. Kit and guides at partner resorts', '40', '54.0', '20.1', '37%', '3.0 years', '(0.5)'],
    ['B. Spoke run from the Bond campus', '41', '143.6', '86.0', '60%', '1.0 years', '141.9'],
    ['C. Licence for the Vizhinjam port basin', '38', '59.8', '26.5', '44%', '2.3 years', '15.5'],
    ['D. Panchayat or DTPC beach jetty', '—', '—', '—', '—', '—', 'Not available'],
  ],
  numeric: [1, 2, 3, 4, 5, 6],
  highlight: [1],
}
export const SUMMARY_POINTS: Point[] = [
  { text: 'Model B, run from the Bond campus, is the plan. Kit at resorts (A) adds little because Kovalam’s resorts are a short walk from the beach, and a basin licence at Vizhinjam (C) is a monsoon fallback, not a main site.' },
  { text: 'The site depends on safety discipline more than any other in the network. A single serious incident on Kovalam beach would affect every Bond company here.' },
]
export const CONFLICTS: Point[] = [
  { text: 'The campus belongs to the Bond Group, not to Bond Safari Paddle Sports. If another Bond company owns or leases the premises, the paddle company must pay a written, arm’s-length rent (₹3 lakh a year is assumed), approved by the investor director.' },
  { text: 'Bond Adventures runs parasailing and speed boats from the same beach. Shared rescue boats, staff or bookings need written inter-company terms so that the paddle company neither subsidises nor is subsidised by its sister company.' },
  { text: 'Jackson Peter sits on the KATPS Technical Committee and must recuse himself in writing from this site’s registration and inspection. KATPS also accredits the competitors listed on Kerala Tourism’s portal.' },
  { text: 'Any rescue-boat or lifeguard partnership on Kovalam beach should be offered through Planet Ocean Foundation or openly to the Tourism Department, not tied to permits for Bond.' },
]
export const SUMMARY_CAVEAT = 'All financial figures are Bond estimates for decision-making. They need validating on site before capital is committed.'

// 1. Why this destination
export const WHY_INTRO = 'Kovalam is a chain of crescent beaches (Lighthouse, Hawah and Samudra) separated by rocky headlands, about 13 km south of Thiruvananthapuram city and 14–15 km from the airport. It is Kerala’s best-known beach and the base of the Bond Group: head office, Academy campus and FlyKovalam parasailing. The water is open sea with semi-sheltered bays, beginner surf at Lighthouse Beach in season and undercurrents close to shore.'
export const WHY_CASE: Point[] = [
  { lead: 'Large, international market.', text: '693,760 visitors in 2025, 8.8% foreign, the highest foreign share in the district. Many stay several nights in resorts and Ayurveda centres, so they have time for a morning activity.' },
  { lead: 'An open gap.', text: 'We found no one selling kayaking or sea kayaking. The only SUP offer, Universal Adventures, charges ₹2,499 for 1.5–2 hours. Surf schools sell sessions at ₹1,800–4,000.' },
  { lead: 'Lowest cost to start.', text: 'The campus provides storage, staff, a classroom and the Academy. The spoke needs craft, a rescue boat and a beach kiosk, not a new building.' },
  { lead: 'A showcase for investors and partners.', text: 'A professional sea-paddling operation on Kerala’s best-known beach is the brand’s shop window, and the place where Paddle UK courses and the Academy are most visible.' },
]
export const HUB_FIT: Table = {
  caption: 'How it fits the hub',
  head: ['Factor', 'Position'],
  rows: [
    ['Hub', 'Trivandrum (this spoke sits at the hub base)'],
    ['Distance from hub', '0 km; Vellayani Lake is 7 km (about 15 minutes) inland'],
    ['Hub provides', 'Workshop, spare fleet, Academy guides, safety officer, central booking'],
    ['Needed on site', 'Beach kiosk, craft racks, a dedicated rescue boat, 6 guides in season'],
    ['Neighbouring spokes', 'Vellayani Lake (flat-water partner), Poovar (15 km), Veli–Akkulam (city)'],
  ],
}
export const SEASONS: Table = {
  caption: 'Seasons',
  head: ['Period', 'Conditions', 'What it means for paddling'],
  rows: [
    ['October–November', 'Sea settling after the monsoon', 'Opening weeks; mornings only; domestic holidays'],
    ['December–February', 'Peak foreign season; calmest sea', 'Peak demand for sea SUP, sunrise paddles and courses'],
    ['March–May', 'Hot; Indian summer holidays', 'Early mornings and evenings; families'],
    ['June–September', 'Monsoon; rough sea; rides suspended', 'Closed on the sea; move lessons and training to Vellayani'],
  ],
}

// 2. Demand
export const VISITORS: Table = {
  caption: 'The visitor base',
  head: ['Measure', 'Visitors', 'Basis'],
  rows: [
    ['Kovalam, domestic (2025)', '632,532', 'Kerala Tourism Statistics 2025 (state rank #8)'],
    ['Kovalam, foreign (2025)', '61,228', 'Kerala Tourism Statistics 2025 (state rank #6)'],
    ['Kovalam, total', '693,760', 'Market used in this study (same as the investor model)'],
    ['Thiruvananthapuram district', '4,542,275', '4,375,846 domestic and 166,429 foreign'],
  ],
  numeric: [1],
}
export const VISITORS_NOTE = 'The figures count visitors staying in registered accommodation. They leave out day-trippers from the city and Tamil Nadu, who come in large numbers at weekends, so the real beach crowd is larger.'
export const CAPTURE_INTRO: Point = { lead: 'From visitors to paddlers.', text: 'We keep the investor model’s 1.5%. It is cautious for a beach with no paddle competitor, but the sea limits sessions to calm mornings and closes for four months, so we do not raise it.' }
export const CAPTURE: Table = {
  caption: 'Paddlers at each capture rate',
  head: ['Capture', 'Paddlers a year', 'A day (255 days)', 'Peak day (≈2×)', 'Share of capacity (20 craft)'],
  rows: [
    ['0.75%', '5,203', '20', '41', '40%'],
    ['1.12%', '7,770', '30', '61', '60%'],
    ['1.5%', '10,406', '41', '82', '81%'],
    ['1.87%', '12,973', '51', '102', '101% (needs more craft)'],
    ['2.25%', '15,610', '61', '122', '121% (needs more craft)'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [2],
}
export const CAPACITY = 'Practical capacity is about 12,852 paddlers a year for 20 craft, on the investor model’s basis of four sessions a day, 1.4 people per craft, 255 operating days and 45% average use. The highlighted row is the base case.'
export const SPEND_INTRO: Point = { lead: 'What each paddler spends.', text: 'We use an average of ₹1,200 per paddler, made up of:' }
export const SPEND_BLEND: Point[] = [
  { text: 'Sunrise sea SUP or kayak, 1.5 hours, ₹1,200–1,500' },
  { text: 'SUP lessons for beginners at ₹1,500' },
  { text: 'Guided headland paddle to Vizhinjam lighthouse for experienced guests at ₹1,800' },
  { text: 'Paddle UK courses through the Academy (counted in the Academy, not here)' },
  { text: 'About 15% more from B2B: resort packages, corporate groups and the shop' },
]
export const BASE_REVENUE: Point = { lead: 'Base-case revenue.', text: '10,406 paddlers × ₹1,200 × 1.15 ≈ ₹1.44 Cr a year once the site is mature (model B).' }
export const DEMAND_CHECK: Point[] = [
  { text: 'Count of SUP and surf customers on Lighthouse Beach over two weeks in December–January' },
  { text: 'Ten resort and Ayurveda centre interviews on selling a morning paddle' },
  { text: 'Agree a paddle zone with the lifeguards and tourism police before the count ends' },
]

// 3. Who we sell to
export const SEGMENTS: Table = {
  caption: 'Who we sell to',
  head: ['Segment', 'Who they are', 'What they want', 'Our product', 'How we reach them', 'Share'],
  rows: [
    ['Foreign beach guests', 'Europeans, Russians and others staying 1–2 weeks', 'A morning activity; lessons; safety', 'Sunrise SUP; SUP lessons; Paddle UK Discover', 'Resort desks, Google, Tripadvisor', '35%'],
    ['Domestic couples and friend groups', 'Bengaluru, Chennai and Kerala weekenders', 'Fun, photos, something new', 'Sunset SUP sessions; group kayak', 'Instagram, Bond Membership', '25%'],
    ['Families', 'Indian families in holidays', 'Safe, short, supervised', 'Double kayaks inside the marked zone', 'Hotels, the website', '15%'],
    ['Ayurveda and wellness guests', 'Long-stay resort guests', 'Gentle, calm activity', 'SUP yoga, calm-water sessions at Vellayani', 'Resort partnerships', '10%'],
    ['Learners', 'People who want certification', 'Paddle UK awards', 'Academy courses on campus', 'Academy, website', '10%'],
    ['Corporate and MICE', 'Technopark and Kochi companies at Kovalam resorts', 'Team activity', 'Team paddle challenges', 'Direct B2B', '5%'],
  ],
}
export const POSITION: Point = { lead: 'Our position.', text: 'Sea paddling at Kerala’s best-known beach, run by the people who already run its water sports, to Paddle UK standards.' }
export const SEGMENTS_AVOID: Point[] = [
  { text: 'Sessions in surf or wind, or in the swimmers’ flagged zones' },
  { text: 'Any paddling from June to September on the sea' },
  { text: 'Long open-sea trips for beginners' },
]

// 4. Competition and pricing
export const OPERATORS: Table = {
  caption: 'Who already operates here',
  head: ['Operator or channel', 'What they offer', 'Published price', 'Notes'],
  rows: [
    ['Universal Adventures (Beach Road)', 'SUP, 1.5–2 hours', '₹2,499 per person (list ₹2,999)', 'Online seller; listing also mentions fishing, so the product may be resold'],
    ['Kovalam Surf Club', 'Surf school and board hire', 'Not published; Kerala Tourism range ₹1,800–4,000 per surf session', 'SUP offer not confirmed'],
    ['Motorised ride operators on the beach', '5–20 minute speed-boat and banana rides', '₹300–1,500 per ride', 'Includes Bond Adventures’ FlyKovalam parasailing'],
    ['Shiva Kayaking (Kaikkara, 40 km north)', 'Backwater kayaking and canoeing', 'Not published', 'The only KATPS-accredited water sports operator listed for the district'],
  ],
}
export const COMPETITION_CONCLUSIONS: Point[] = [
  { text: 'There is no direct kayak competitor, and SUP is priced at ₹2,499, so ₹1,200–1,500 for a guided sunrise session is competitive and still premium.' },
  { text: 'The real competition for guests’ time is the surf schools and motorised rides. Packages with parasailing must be sold on arm’s-length terms between Bond companies.' },
  { text: 'Safety, not price, is the barrier to entry. A visible rescue boat and certified guides are the selling point.' },
]
export const PRICE_LIST: Table = {
  caption: 'Proposed price list (inclusive of GST; check against the 2027 rate card)',
  head: ['Product', 'Duration', 'Price'],
  rows: [
    ['Sunrise sea SUP or kayak (guided)', '1.5 hours', '₹1,200'],
    ['SUP lesson for beginners', '1.5 hours', '₹1,500'],
    ['Headland paddle to the lighthouse (experienced)', '2 hours', '₹1,800'],
    ['Family double-kayak session', '1 hour', '₹2,000 per kayak'],
    ['Sunset SUP (calm days only)', '1 hour', '₹1,000'],
    ['Paddle UK Discover / Start Paddling', 'Half day', 'From the rate card'],
  ],
  numeric: [2],
}
export const PRICE_NOTE = 'At the expected product mix, this gives an average of about ₹1,200 per paddler before B2B sales.'

// 5. Possible locations
export const LOCATIONS_INTRO = 'Each candidate launch point is scored from 1 (poor) to 5 (strong) on seven criteria; a high competition score means little competition. These are desk scores, to be checked on site visits.'
export const LOCATIONS: Table = {
  caption: 'Possible locations, scored from 1 to 5 on seven criteria',
  head: ['Location', 'Footfall', 'Water', 'Safety', 'Access', 'Site', 'Comp.', 'Permits', 'Total /35', 'Role'],
  rows: [
    ['Bond campus beach frontage (if available; unverified)', '5', '3', '3', '5', '4', '4', '4', '28', 'Base: storage, briefing and launch'],
    ['Lighthouse Beach, south end outside the flagged zones', '5', '2', '2', '5', '3', '3', '3', '23', 'Sales kiosk; SUP lessons on calm mornings'],
    ['Hawah and Samudra bays (north)', '4', '3', '3', '4', '3', '4', '3', '24', 'Second launch on calmer days'],
    ['Vizhinjam port basin (Kerala Maritime Board)', '2', '4', '2', '4', '2', '5', '2', '21', 'Sheltered fallback; shared with fishing and port traffic'],
    ['Vellayani Lake (own report)', '2', '5', '5', '4', '2', '5', '2', '25', 'Flat-water partner for beginners and the monsoon'],
  ],
  numeric: [1, 2, 3, 4, 5, 6, 7, 8],
  highlight: [0],
  wrapHead: true,
}
export const LOCATION_POINTS: Point[] = [
  { text: 'Whether the campus has usable beach frontage is not confirmed. If it does not, the kiosk goes on Lighthouse Beach with a licence from the panchayat or DTPC and craft are carried from campus.' },
  { text: 'All sea launches are beach launches through the shore break. The paddle zone must be marked with buoys and agreed with the lifeguards.' },
]

// 6. Operating models
export const MODELS: { title: string; points: Point[] }[] = [
  {
    title: 'A. Kit and guides at partner resorts',
    points: [
      { lead: 'How it works.', text: 'We place craft and a guide at three beachfront resorts, including The Leela Kovalam. Resorts sell to guests and keep 25%.' },
      { lead: 'For:', text: 'Guests on site; Premium prices; No beach licence needed for the resort’s own frontage.' },
      { lead: 'Against:', text: 'Kovalam resorts are close enough to walk to our kiosk anyway; Splits kit and guides across three surf beaches; Least control of safety.' },
      { lead: 'Verdict:', text: 'Not needed. Use resorts as commission sales partners.' },
    ],
  },
  {
    title: 'B. Spoke run from the Bond campus',
    points: [
      { lead: 'How it works.', text: 'Bond Safari Paddle Sports runs the spoke from the Kovalam campus, with a beach kiosk and buoyed zone, its own rescue boat, and sales to walk-ins, online, resorts (commission only) and Bond’s existing parasailing customers.' },
      { lead: 'For:', text: 'Lowest set-up cost: storage, staff and classroom already on campus; Full control of safety and brand; Shares the hub’s spare fleet and Academy guides; Cross-sells with parasailing.' },
      { lead: 'Against:', text: 'Sea conditions limit sessions to calm mornings; Closed four months a year; Related-party rent and shared-cost terms needed.' },
      { lead: 'Verdict:', text: 'Recommended.' },
    ],
  },
  {
    title: 'C. Licence for the Vizhinjam port basin',
    points: [
      { lead: 'How it works.', text: 'A licence from the Kerala Maritime Board to run beginner sessions in the sheltered Vizhinjam basin, paying a fee of about 10% of revenue.' },
      { lead: 'For:', text: 'Sheltered water behind breakwaters; Usable on days the beach is too rough.' },
      { lead: 'Against:', text: 'Fishing and port traffic; port construction; The minor port is being redeveloped under PPP (April 2025); Low footfall; not a tourist spot.' },
      { lead: 'Verdict:', text: 'A fallback for rough days, not a site. Ask for it within any small-craft agreement at Vizhinjam.' },
    ],
  },
  {
    title: 'D. Panchayat or DTPC beach jetty',
    points: [{ lead: 'Not available here.', text: 'There is no DTPC or panchayat water sports jetty on Kovalam beach. The beach itself is public land under CRZ, so the kiosk licence is covered under Model B.' }],
  },
]
export const COMPARISON_RESULT: Point = { lead: 'Result.', text: 'Model B scores highest by a wide margin. Its advantage is that the Bond campus already provides most of the cost of a spoke.' }
export const COMPARISON_KEY = 'Key: A = Kit and guides at partner resorts; B = Spoke run from the Bond campus; C = Licence for the Vizhinjam port basin.'
export const COMPARISON: Table = {
  caption: 'Comparison of the models',
  head: ['Criterion', 'Weight', 'A', 'B', 'C'],
  rows: [
    ['Value created (5-year value)', '25%', '2', '5', '3'],
    ['Capital needed', '10%', '3', '4', '4'],
    ['Margin and resilience', '15%', '2', '4', '3'],
    ['Control of brand, quality, safety', '15%', '2', '5', '3'],
    ['Security of tenure', '10%', '2', '3', '2'],
    ['Speed to open and permit risk', '10%', '4', '4', '2'],
    ['Footfall and visibility', '10%', '3', '5', '1'],
    ['Environmental and reputational risk', '5%', '4', '4', '3'],
    ['Weighted score', '100%', '2.5', '4.4', '2.7'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [8],
}

// 7. Financial assessment
export const FINANCE_INTRO = 'All figures in ₹ lakh, before tax, Bond estimates. Ramp 60%, 85%, then 100% of mature volume; no growth after year 3; discounted at 25%.'
export const ASSUMPTIONS: Table = {
  caption: 'Key assumptions',
  head: ['Assumption', 'A', 'B', 'C'],
  rows: [
    ['Paddlers a year (mature)', '3,000', '10,406', '5,203'],
    ['Average ticket', '₹1,800', '₹1,200', '₹1,000'],
    ['B2B and courses on top', '0%', '15%', '15%'],
    ['Revenue share', '25%', '—', '10%'],
    ['Variable costs', '10%', '19%', '19%'],
    ['Fixed costs a year', '15.0', '30.3', '16.0'],
    ['of which lease or rent', '0.0', '3.0', '0.0'],
    ['Capex', '40', '41', '38'],
  ],
  numeric: [1, 2, 3],
}
export const CAPEX: Point[] = [
  { lead: 'A. Kit and guides at partner resorts:', text: 'Craft and safety kit (3 sets) 30; Rescue boat 6; Racks and branding 4; total 40.' },
  { lead: 'B. Spoke run from the Bond campus:', text: 'Craft: 12 SUPs and 8 sea kayaks with paddles, leashes and PFDs 27; Rescue boat (dedicated) 6; Beach kiosk, racks, buoys and branding 8; total 41.' },
  { lead: 'C. Licence for the Vizhinjam port basin:', text: 'Craft and safety kit (16 craft) 22; Rescue boat 6; Storage container and pontoon access 10; total 38.' },
]
export const MATURE_YEAR: Table = {
  caption: 'Mature year (year 3 onward)',
  head: ['', 'A', 'B', 'C'],
  rows: [
    ['Revenue', '54.0', '143.6', '59.8'],
    ['Less revenue share', '(13.5)', '—', '(6.0)'],
    ['Less variable costs', '(5.4)', '(27.3)', '(11.4)'],
    ['Less fixed costs', '(15.0)', '(30.3)', '(16.0)'],
    ['EBITDA', '20.1', '86.0', '26.5'],
    ['EBITDA margin', '37%', '60%', '44%'],
    ['Payback', '3.0 years', '1.0 years', '2.3 years'],
    ['5-year cumulative cash after capex', '41.2', '325.1', '71.1'],
    ['5-year value at 25%', '(0.5)', '141.9', '15.5'],
  ],
  numeric: [1, 2, 3],
  highlight: [4, 8],
}
export const FIVE_YEAR_PATH: Table = {
  caption: 'The five-year path for the recommended model (B)',
  head: ['Year', '1', '2', '3', '4', '5'],
  rows: [
    ['Volume vs mature', '60%', '85%', '100%', '100%', '100%'],
    ['Revenue', '86.2', '122.1', '143.6', '143.6', '143.6'],
    ['EBITDA', '39.5', '68.6', '86.0', '86.0', '86.0'],
    ['Cumulative cash after ₹41 lakh capex', '(1.5)', '67.1', '153.1', '239.1', '325.1'],
  ],
  numeric: [1, 2, 3, 4, 5],
}
export const SENSITIVITY: Table = {
  caption: 'How sensitive is the recommended model (B)?',
  head: ['Scenario', 'Mature revenue', 'Mature EBITDA', '5-year value', 'Payback'],
  rows: [
    ['Base case', '143.6', '86.0', '141.9', '1.0 years'],
    ['Demand one-third lower', '95.7', '47.2', '53.8', '1.7 years'],
    ['Price 18% lower', '117.8', '65.1', '94.4', '1.3 years'],
    ['Downside: demand one-third lower and price 18% lower', '78.5', '33.3', '22.1', '2.3 years'],
    ['Severe: demand halved and price 18% lower', '58.9', '17.4', '(14.1)', '3.9 years'],
    ['Demand one-third higher', '177.4', '113.4', '204.1', '0.7 years'],
    ['Price 18% higher', '169.5', '107.0', '189.5', '0.8 years'],
    ['Fixed costs 20% higher', '143.6', '80.0', '125.7', '1.1 years'],
    ['Capex 25% higher', '143.6', '86.0', '131.7', '1.2 years'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [0],
}
export const SENSITIVITY_READING: Point = { lead: 'Reading the sensitivities.', text: 'Mature-year EBITDA breaks even at about 0.39% capture (2,711 paddlers), 26% of the base case. Even with demand a third lower and prices 18% lower, Model B keeps a positive 5-year value, because its fixed costs are low and the campus is shared. The real downside is not demand but an incident that closes the beach to water sports.' }
export const REVENUE_SHARES: Table = {
  caption: 'Model C at different revenue shares',
  head: ['Share to the owner', 'Mature EBITDA', '5-year value at 25%'],
  rows: [
    ['10%', '26.5', '15.5'],
    ['15%', '23.5', '8.7'],
    ['20%', '20.5', '1.9'],
    ['25%', '17.5', '(4.9)'],
    ['30%', '14.5', '(11.7)'],
  ],
  numeric: [1, 2],
}

// 8. Related-party terms and the beach licence
export const RELATED_INTRO = [
  'Kovalam is the one spoke where the main counterparties are Bond’s own companies. The paddle company will use campus space, may share a rescue boat with Bond Adventures, and will sell alongside FlyKovalam parasailing. Investors in Bond Safari Paddle Sports need to see these arrangements written down and priced fairly.',
  'The beach kiosk and buoyed zone need permission from the panchayat (Venganoor or Kottukal, to confirm) and DTPC Thiruvananthapuram, and a zone agreed with the lifeguards and tourism police.',
]
export const TERMS: Table = {
  caption: 'Terms we need',
  head: ['Term', 'Our position', 'Walk away if'],
  rows: [
    ['Campus space', 'Written licence from the owning Bond company at about ₹3 lakh a year, reviewed yearly', 'Free use with no paperwork (understates costs) or rent above market'],
    ['Shared rescue boat and crew', 'Hourly recharge at cost plus 10%, logged daily', 'Uncharged sharing'],
    ['Joint packages with parasailing', 'Each company books its own revenue; commission at the same rate it pays third parties', 'One company collecting all package revenue'],
    ['Beach kiosk and zone', 'Licence for the kiosk; buoyed paddle zone agreed with the lifeguards', 'No marked zone, or a zone inside the swimmers’ flags'],
    ['Approval', 'Investor director signs off all inter-company terms', 'Terms set by the MD alone'],
  ],
}
export const QUESTIONS: Point[] = [
  { text: 'Which Bond company owns or leases the campus, and on what terms?' },
  { text: 'Does the campus have beach frontage usable as a launch?' },
  { text: 'Which panchayat and DTPC office license beach kiosks at Lighthouse Beach?' },
  { text: 'Will the lifeguards and tourism police agree a buoyed paddle zone?' },
]
export const SITE_HOLDER: Point = { lead: 'Which company holds the site.', text: 'Kayaking, canoeing and SUP belong to Bond Safari Paddle Sports Pvt Ltd. Every lease, concession or bid for this site must be in that company’s name. Any motorised activity belongs to Bond Adventures Pvt Ltd, and any scuba or snorkelling to Bond Water Sports Pvt Ltd; shared costs between Bond companies must be on written arm’s-length terms approved by the investor director.' }

// 9. Permits, environment and safety
export const PERMITS_INTRO = 'Kovalam’s beaches are in the Coastal Regulation Zone, and the Tourism Department added lifeguard flags and a siren system at six stations in March 2026 after rescues from undercurrents. Paddling must fit inside that safety regime from day one.'
export const PERMITS: Table = {
  caption: 'Permits checklist (to confirm with each authority)',
  head: ['Permit or registration', 'Authority', 'Applies here'],
  rows: [
    ['Adventure tourism operator registration', 'KATPS (Department of Tourism)', 'Required'],
    ['Beach kiosk licence', 'Panchayat; DTPC Thiruvananthapuram', 'Required'],
    ['CRZ check for any fixed structure', 'Kerala Coastal Zone Management Authority', 'Only if anything fixed is built; racks and kiosk should be movable'],
    ['Rescue-boat registration', 'Kerala Maritime Board', 'Required (powered craft)'],
    ['Paddle zone and safety plan', 'Tourism police; lifeguards; Vizhinjam Coastal Police', 'Agreed in writing'],
    ['Insurance and GST', 'Insurer; GST', 'Required'],
  ],
}
export const KATPS_CONFLICT: Point = { lead: 'Conflict to manage.', text: 'Jackson Peter sits on the KATPS Technical Committee. He should recuse himself in writing from this site’s registration and inspection, and the recusal should be recorded with KATPS, as for every Bond site.' }
export const ENVIRONMENT: Point[] = [
  { text: 'Movable kiosk and racks only; nothing permanent on the beach' },
  { text: 'Zero single-use plastic; beach clean-ups with Planet Ocean Foundation' },
  { text: 'Offer rescue cover and lifeguard training to the Tourism Department openly (the lifeguards have asked for a rescue boat), not as a condition of any permit' },
  { text: 'Hire and train guides from the Kovalam and Vizhinjam fishing communities' },
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
    ['Sea limits', 'Sessions only below a set wind and swell limit; no sessions in surf; daily go/no-go by the site lead'],
    ['Traffic', 'Paddle zones kept clear of motorboats, ferries and fishing craft; high-visibility vests; groups only on open water'],
  ],
}

// 10. Risks
export const RISK_REGISTER: Table = {
  caption: 'Risks',
  head: ['#', 'Risk', 'Likelihood', 'Impact', 'How we manage it'],
  rows: [
    ['1', 'Incident in surf or undercurrent', 'Low–Medium', 'Very high', 'Morning-only, buoyed zone, dedicated rescue boat, ratios, daily go/no-go'],
    ['2', 'Authorities restrict water sports after an incident by any operator', 'Medium', 'High', 'Visible safety leadership; join lifeguard rescue cover; move sessions to Vellayani'],
    ['3', 'Monsoon closure longer than planned', 'Medium', 'Medium', 'Vellayani as the monsoon site; Academy training in the low season'],
    ['4', 'Related-party terms questioned by investors', 'Certain to arise', 'Medium', 'Written licence and recharge terms; investor director approval'],
    ['5', 'Crowding and conflict with swimmers and fishing boats', 'Medium', 'Medium', 'Marked zone; early hours; fishing community hires'],
    ['6', 'Coastal erosion changes the beach', 'Medium', 'Low', 'Movable kit; alternate launch at Hawah or Samudra'],
    ['7', 'Price undercutting by resold SUP offers', 'Low', 'Low', 'Compete on safety and certification, not price'],
    ['8', 'KATPS conflict', 'Certain to arise', 'Medium', 'Written recusal recorded with KATPS'],
  ],
}
export const RISK_NOTE: Point = { lead: 'The risk that decides this site is safety, not demand. The buoyed zone, the dedicated rescue boat and the go/no-go rule must be in place before the first paying guest.' }

// 11. Recommendation and launch plan
export const RECOMMENDATION: Point[] = [
  { text: 'Open in January 2027 with 12 craft, mornings only, in a buoyed zone agreed with the lifeguards; add the remaining 8 craft for the 2027–28 season.' },
  { text: 'Sign the campus licence and shared-rescue-boat terms with the other Bond companies before opening, approved by the investor director.' },
  { text: 'Use Vellayani Lake for beginners, families and the monsoon.' },
  { text: 'Offer rescue cover and lifeguard training to the Tourism Department openly, through Planet Ocean Foundation.' },
]
export const LAUNCH_PLAN: Table = {
  caption: 'Launch plan',
  head: ['When', 'Step', 'Owner', 'Gate'],
  rows: [
    ['November 2026', 'Confirm campus frontage; draft inter-company terms; meet the lifeguards and DTPC on a paddle zone', 'MD; hub manager', ''],
    ['December 2026', 'KATPS registration (with MD recusal); rescue-boat registration; kiosk licence', 'Safety officer', 'Gate 1: zone and permits secured'],
    ['January 2027', 'Soft opening with 12 craft; morning sessions', 'Site lead', ''],
    ['February–May 2027', 'Resort partner sales; Academy courses; count and review', 'Site lead; Academy', 'Gate 0 (in season): 1.5% capture credible'],
    ['June–September 2027', 'Sea closed; sessions and training at Vellayani', 'Hub manager', ''],
    ['October 2027', 'Full fleet of 20 craft for the first full season', 'Site lead', ''],
    ['March 2028', 'First-year review', 'Board', 'Gate 2: scale, hold or move'],
  ],
}
export const KPIS: Table = {
  caption: 'First-year KPIs and gate thresholds',
  head: ['KPI', 'Target', 'Scale up if', 'Rethink if'],
  rows: [
    ['Paddlers in year 1', '6,244', '5,932 or more', 'Under 4,058'],
    ['Average spend per paddler (incl. B2B)', '₹1,380', '₹1,311 or more', 'Under ₹1,080'],
    ['EBITDA in year 1 (₹ lakh)', '39.5', '35.5 or more', 'Below zero'],
    ['Guest rating (Google, Tripadvisor)', '4.7', '4.6 or more', 'Under 4.3'],
    ['Safety', 'Zero reportable incidents', 'Zero', 'Any serious incident (immediate review)'],
    ['Guides from the local community', '75%', '75% or more', '—'],
  ],
}
export const RETHINK_NOTE = 'Rethink means one of three options: reduce the fleet and move spare craft to another spoke in the hub, switch to another launch model, or close and move the kit. Kit is mobile, which limits the loss to set-up costs and the first year’s lease.'

// Sources
export const SOURCES: { title: string; url?: string }[] = [
  { title: 'Kerala Tourism Statistics 2025', url: 'https://www.keralatourism.org/tourismstatistics/tourists_statistics_202520260507114657.pdf' },
  { title: 'Kerala Tourism: Kovalam water sports', url: 'https://www.keralatourism.org/adventure-tourism/watersports/kovalam' },
  { title: 'Kerala Tourism: Surfing at Kovalam', url: 'https://www.keralatourism.org/adventure-tourism/surfing/kovalam' },
  { title: 'Universal Adventures: SUP in Kovalam', url: 'https://www.universaladventures.in/products/stand-up-paddling-in-kovalam-kerala' },
  { title: 'Onmanorama: Kovalam lifeguard flags after rescues (Mar 2026)', url: 'https://www.onmanorama.com/news/kerala/2026/03/03/kovalam-beach-tourists-lifeguard-flags.html' },
  { title: 'Kerala Tourism: accredited operators, Thiruvananthapuram', url: 'https://www.keralatourism.org/adventure-tour-operators?a=watersports&d=thiruvananthapuram' },
  { title: 'Bond Safari Paddle Sports financial model and hub-and-spoke network (internal)' },
]
export const CLOSING_NOTE = 'Prepared for the board and investors of Bond Safari Paddle Sports Pvt Ltd. Figures are estimates for decision-making, not guarantees. Confirm all permits and terms with the relevant authorities before committing capital. Desk research as of November 2026; facts marked unverified must be checked before use.'
