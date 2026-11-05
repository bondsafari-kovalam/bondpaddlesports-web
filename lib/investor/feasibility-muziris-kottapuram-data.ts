import 'server-only'
import type { Point, Table } from './feasibility-data'

/**
 * CONFIDENTIAL. "Muziris–Kottapuram Paddle Centre: Operating Review and Feasibility Study" (November 2026), prepared by
 * Jackson Peter, transcribed as written. View only, like every feasibility study: shown in the portal and never served
 * as a file. It must never be pushed to a public repository.
 */

// These passages are worded the same in every spoke report of this series.
export { CLOSING_NOTE, COVER_NOTE, HOW_TO_READ, KATPS_CONFLICT, RETHINK_NOTE, SITE_HOLDER } from './feasibility-kovalam-data'

export const COVER_FACTS = [
  ['Destination', 'Muziris–Kottapuram, Thrissur district'],
  ['Hub', 'Ernakulam hub'],
  ['Network score / wave', '— · Live since 4 Oct 2026'],
  ['Verdict', 'Operate and optimise; move the concession into the right company'],
  ['Date', 'November 2026'],
  ['Prepared for', 'The board and investors of Bond Safari Paddle Sports Pvt Ltd'],
]
export const VERDICT_TITLE = 'The answer: Operate and optimise; move the concession into the right company'
export const VERDICT = 'Keep operating, add SUP, heritage paddle trails, school programmes and cross-selling, and transfer the Muziris concession from Bond Water Sports to Bond Safari Paddle Sports with Muziris Projects Ltd’s consent.'

// Executive summary
export const SUMMARY = [
  'Kottapuram is one of Bond’s two live paddle sites. It runs Muziris Projects Ltd’s (MPL) kayaks and canoes on the Periyar river mouth at Kodungallur under a concession awarded to Bond Water Sports Pvt Ltd: Bond collects the revenue, and pays MPL an agreed profit share and monthly charges. The site works as a low-capital, government-backed entry point, but on the investor model’s own numbers it is a small site, about ₹47 lakh of revenue a year at maturity.',
  'The most important issue is not demand but ownership. The concession sits in Bond Water Sports, while the investor round funds Bond Safari Paddle Sports, which owns kayaking, canoeing and SUP. Until the concession is transferred, or a written sub-licence is signed, revenue from a site presented to investors as theirs legally belongs to a sister company. This should be fixed before the next investor meeting.',
  'Commercially, the site should move from simple kayak and canoe hire to a heritage-led product: guided paddles to Kottappuram Fort and the Muziris museums, SUP lessons, school and college programmes, and Academy tasters, sold together with the Muziris Passport and Bond’s other experiences.',
]
export const SUMMARY_WHY: Point[] = [
  { text: 'The Muziris Heritage Project is a state flagship, and kayaking and canoeing were flagged off by the Tourism Minister in October 2026 (26 kayaks and 14 canoes across the Kottappuram and Paravur waterfronts, reported by Onmanorama on 18 October).' },
  { text: 'Kottappuram is the northern start of National Waterway 3 and the gateway to the Periyar mouth at Azhikode, with the Kottappuram Fort ruins on the water.' },
  { text: 'MPL owns the fleet, so Bond’s capital at risk is small (rescue boat, safety kit, kiosk).' },
  { text: 'MPL’s heritage boat services, suspended for about four years, are restarting, which should rebuild visitor flow.' },
]
export const SUMMARY_MODELS: Table = {
  caption: 'The models compared (mature year, ₹ lakh)',
  head: ['Model', 'Capex', 'Revenue', 'EBITDA', 'Margin', 'Payback', '5-year value'],
  rows: [
    ['A. Current concession, as is (hire only)', '14', '42.5', '7.9', '19%', '3.6 years', '(3.4)'],
    ['B. Concession plus SUP, heritage trails, schools and cross-sell', '22', '65.2', '21.8', '33%', '2.0 years', '20.0'],
    ['C. Expanded concession transferred to Bond Safari Paddle Sports', '24', '65.2', '21.8', '33%', '2.1 years', '18.0'],
  ],
  numeric: [1, 2, 3, 4, 5, 6],
  highlight: [2],
}
export const CONFLICTS: Point[] = [
  { lead: 'The concession is held by Bond Water Sports Pvt Ltd, not Bond Safari Paddle Sports Pvt Ltd.', text: 'Revenue and the contract belong to the sister company. Fix: novate the concession to Bond Safari Paddle Sports with MPL’s written consent, or sign an arm’s-length sub-licence approved by the investor director. Disclose the current position to investors in writing.' },
  { text: 'The MPL profit-share rate and monthly charges are not stated in our files. This report assumes 20% of revenue (the investor model’s concession rate) until the Letter of Acceptance terms are confirmed.' },
  { text: 'Jackson Peter sits on the KATPS Technical Committee and must recuse himself in writing from this site’s registration.' },
  { text: 'Cross-selling scuba and parasailing from bondsafarikovalam.com sends Kottapuram customers to Bond Water Sports and Bond Adventures. Commission between the companies must be on written arm’s-length terms.' },
]
export const SUMMARY_CAVEAT = 'All financial figures are Bond estimates for decision-making. They need validating on site before capital is committed.'

// 1. Why this destination
export const WHY_INTRO = 'Kottappuram sits at Kodungallur where the Periyar distributary meets the backwater and, a few kilometres west, the Arabian Sea at the Azhikode bar mouth. It is the northern start of National Waterway 3 (Kottapuram–Kollam) and part of the Muziris Heritage Project, alongside the Kottappuram Fort ruins (Portuguese, 1523), the Cheraman Juma Masjid and the Kodungallur Bhagavathy Temple. Muziris Projects Ltd, under the Department of Tourism, owns the kayak and canoe fleet; Bond operates it.'
export const WHY_CASE: Point[] = [
  { lead: 'A government-backed site.', text: 'MPL’s concession gives Bond a state flagship location, with public promotion and a fleet we did not have to buy.' },
  { lead: 'Heritage gives the paddle a story.', text: 'Paddling to the fort ruins and along the NW-3 waterfront is a product no rental operator can copy.' },
  { lead: 'Low capital at risk.', text: 'Our investment is a rescue boat, safety kit, kiosk and branding, about ₹14 lakh in the investor model.' },
  { lead: 'Academy and school pipeline.', text: 'The Ernakulam hub’s Academy campus (FY28) is planned for the Muziris–Kochi side; Kottapuram is a natural training and schools venue.' },
  { lead: 'Visitor flow is rebuilding.', text: 'MPL is restarting heritage boats (two 6-seater water taxis running; three 24-seater boats due), which brings people to the jetty.' },
]
export const HUB_FIT: Table = {
  caption: 'How it fits the hub',
  head: ['Factor', 'Position'],
  rows: [
    ['Hub', 'Ernakulam (Kochi–Vypin base)'],
    ['Distance from hub', 'About 33 km, about 60 minutes (estimate)'],
    ['Hub provides', 'Spare kit, repairs, guides, the safety officer, booking and marketing'],
    ['On site', 'MPL fleet, kiosk, a site lead and 2–3 guides'],
    ['Sister site', 'Muziris–North Paravur (Thattukadavu), about 15 km by road'],
  ],
}
export const SEASONS: Table = {
  caption: 'Seasons',
  head: ['Period', 'Conditions', 'What it means for paddling'],
  rows: [
    ['October–March', 'Cool season; Biennale visitors (December–March in Biennale years)', 'Peak; heritage tours and schools'],
    ['March–April', 'Kodungallur Bharani festival', 'Large local crowds; plan capacity and safety'],
    ['April–May', 'Hot; school holidays', 'Early-morning and evening sessions only'],
    ['June–September', 'High Periyar discharge, strong ebb flows, debris; possible dam releases upstream', 'Suspensions on high-flow days; Academy indoor and theory work'],
  ],
}

// 2. Demand
export const VISITORS: Table = {
  caption: 'The visitor base',
  head: ['Measure', 'Visitors', 'Basis'],
  rows: [
    ['Thrissur district, domestic', '3,114,696', 'Kerala Tourism Statistics 2025'],
    ['Thrissur district, foreign', '24,201', 'KTS 2025 (foreign share about 0.8%)'],
    ['Muziris Heritage Project footfall', 'Not published', 'No MPL visitor or ticket counts found'],
    ['Visitor base used (investor model)', '180,000', 'Management estimate of visitors reachable at this site'],
  ],
  numeric: [1],
}
export const VISITORS_NOTE = 'Kodungallur and Muziris do not appear in the 2025 top-20 destination lists, and MPL publishes no footfall. The 180,000 base is the investor model’s estimate and is unverified. Demand will be almost entirely domestic: Thrissur’s foreign share is under 1%. Bond’s own ticket data from October 2026 is the best evidence and should replace this estimate after one season.'
export const CAPTURE_INTRO: Point = { lead: 'From visitors to paddlers.', text: 'The investor model uses 3% capture of 180,000 (5,400 paddlers) at ₹750. This study keeps that as the ‘as is’ case and models 3.5% at ₹900 for the expanded product, because guided heritage paddles, SUP and school groups widen the market beyond casual hire.' }
export const CAPTURE: Table = {
  caption: 'Paddlers at each capture rate',
  head: ['Capture', 'Paddlers a year', 'A day (255 days)', 'Peak day (≈2×)', 'Share of capacity (20 craft)'],
  rows: [
    ['1.75%', '3,150', '12', '25', '25%'],
    ['2.63%', '4,734', '19', '37', '37%'],
    ['3.5%', '6,300', '25', '49', '49%'],
    ['4.38%', '7,884', '31', '62', '61%'],
    ['5.25%', '9,450', '37', '74', '74%'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [2],
}
export const CAPACITY = 'Practical capacity is about 12,852 paddlers a year for 20 craft, on the investor model’s basis of four sessions a day, 1.4 people per craft, 255 operating days and 45% average use. The highlighted row is the base case.'
export const SPEND_INTRO: Point = { lead: 'What each paddler spends.', text: 'We use an average of ₹900 per paddler, made up of:' }
export const SPEND_BLEND: Point[] = [
  { text: 'Casual kayak and canoe hire, 30–60 minutes, at ₹300–500 (regional rentals sell at ₹299–449 for 30 minutes)' },
  { text: 'Guided heritage paddle to Kottappuram Fort, 1.5–2 hours, at ₹1,000–1,200' },
  { text: 'SUP taster and lesson at ₹900–1,200' },
  { text: 'School and college groups at ₹500–700 per student' },
  { text: 'About 15% more from B2B in the expanded case: schools, Academy tasters, corporate groups and the shop' },
]
export const BASE_REVENUE: Point = { lead: 'Base-case revenue.', text: '6,300 paddlers × ₹900 × 1.15 ≈ ₹0.65 Cr a year once the site is mature (model C).' }
export const DEMAND_CHECK: Point[] = [
  { text: 'Pull Bond’s own October–December 2026 ticket data: paddlers a day, price mix, weekday/weekend split' },
  { text: 'Ask MPL for Muziris Passport and museum visitor counts' },
  { text: 'Survey 200 visitors at the jetty on what they would buy (guided trail, SUP, combined tickets)' },
]

// 3. Who we sell to
export const SEGMENTS: Table = {
  caption: 'Who we sell to',
  head: ['Segment', 'Who they are', 'What they want', 'Our product', 'How we reach them', 'Share'],
  rows: [
    ['Domestic day-trippers', 'Families and groups from Thrissur, Ernakulam and Kodungallur', 'A short, safe outing', '30–60 minute kayak or canoe hire', 'Walk-in; Google; MPL counters', '35%'],
    ['Heritage visitors', 'Muziris Passport and museum visitors, Biennale visitors', 'Context and stories', 'Guided fort and waterfront paddle', 'MPL, Muziris museums, Biennale', '20%'],
    ['Schools and colleges', 'Thrissur and Ernakulam schools', 'Safe, educational activity', 'Heritage paddle with history session; Paddle UK Start', 'Direct to schools; Academy', '20%'],
    ['Young adults', 'Students and young professionals', 'Fun, photos', 'Sunset SUP and kayak', 'Instagram; Bond Membership', '15%'],
    ['Pilgrims and festival visitors', 'Kodungallur temple and Cheraman mosque visitors', 'Something to do nearby', 'Short hire sessions', 'Signage; temple-road kiosks', '10%'],
  ],
}
export const POSITION: Point = { lead: 'Our position.', text: 'The paddle way to see Muziris: certified guides, heritage stories and safe water, run in partnership with Muziris Projects Ltd.' }
export const SEGMENTS_AVOID: Point[] = [
  { text: 'Paddling towards the Azhikode bar mouth, where tidal currents run strong' },
  { text: 'Sessions on high-discharge monsoon or dam-release days' },
]

// 4. Competition and pricing
export const OPERATORS: Table = {
  caption: 'Who already operates here',
  head: ['Operator or channel', 'What they offer', 'Published price', 'Notes'],
  rows: [
    ['MPL water taxis and heritage boats', 'Two 6-seater water taxis; three 24-seater boats due; hop-on hop-off boats to resume', 'Not published', 'Partner, not rival: the same customers and the same jetty'],
    ['Universal Adventures (Munambam)', 'Kayak rental', '₹299 single / ₹449 double, 30 min', 'Sets the low regional benchmark'],
    ['Guided kayak trips, Pizhala (Kochi)', 'Sunset kayak with guide', '₹899–1,100, 1–2 hours', 'Regional guided benchmark'],
    ['Country-boat and motorboat operators', 'Informal boat rides on the river', 'Not published', 'Unverified; check on site'],
  ],
}
export const COMPETITION_CONCLUSIONS: Point[] = [
  { text: 'There is no direct paddle competitor at Kottappuram: the concession is effectively exclusive while it lasts.' },
  { text: 'Casual hire prices in the region are low (₹300–450 for 30 minutes), so hire alone will not make this a strong site.' },
  { text: 'The upside is in guided heritage paddles, SUP and school programmes at ₹900–1,200, which no one else offers here.' },
]
export const PRICE_LIST: Table = {
  caption: 'Proposed price list (inclusive of GST; check against the 2027 rate card)',
  head: ['Product', 'Duration', 'Price'],
  rows: [
    ['Kayak or canoe hire (30 minutes)', '30 minutes', '₹350'],
    ['Kayak or canoe hire (1 hour)', '1 hour', '₹600'],
    ['Guided Kottappuram Fort heritage paddle', '1.5–2 hours', '₹1,100'],
    ['SUP taster', '1 hour', '₹900'],
    ['School heritage paddle with history session (per student)', '2 hours', '₹600'],
    ['Paddle UK Start Paddling', 'Half day', 'From the rate card'],
  ],
  numeric: [2],
}
export const PRICE_NOTE = 'At the expected product mix, this gives an average of about ₹900 per paddler before B2B sales.'

// 5. Possible locations
export const LOCATIONS_INTRO = 'Each candidate launch point is scored from 1 (poor) to 5 (strong) on seven criteria; a high competition score means little competition. These are desk scores, to be checked on site visits.'
export const LOCATIONS: Table = {
  caption: 'Possible locations, scored from 1 to 5 on seven criteria',
  head: ['Location', 'Footfall', 'Water', 'Safety', 'Access', 'Site', 'Comp.', 'Permits', 'Total /35', 'Role'],
  rows: [
    ['Kottappuram boat jetty (MPL concession site)', '3', '3', '3', '4', '5', '5', '5', '28', 'Current base; keep'],
    ['Kottappuram Fort waterfront', '3', '4', '4', '3', '2', '5', '3', '24', 'Destination for guided heritage paddles'],
    ['NW-3 channel south towards Pallippuram', '2', '3', '2', '3', '2', '5', '3', '20', 'Experienced groups only; motor traffic'],
    ['Azhikode–Munakkal side', '3', '2', '1', '4', '2', '4', '3', '19', 'Not for paddling near the bar mouth'],
  ],
  numeric: [1, 2, 3, 4, 5, 6, 7, 8],
  highlight: [0],
  wrapHead: true,
}
export const LOCATION_POINTS: Point[] = [
  { text: 'The jetty’s ownership (MPL, Irrigation or municipality) is not confirmed online; check the concession documents.' },
  { text: 'Keep routes upstream and inside the backwater; avoid the Azhikode bar mouth and the main NW-3 channel with beginners.' },
]

// 6. Operating models
export const MODELS: { title: string; points: Point[] }[] = [
  {
    title: 'A. Current concession, as is (hire only)',
    points: [
      { lead: 'How it works.', text: 'Bond Water Sports runs MPL’s kayaks and canoes as simple hire, collects revenue, and pays MPL a profit share and monthly charges (modelled as 20% of revenue).' },
      { lead: 'For:', text: 'Already running; MPL owns the fleet; Minimal capital.' },
      { lead: 'Against:', text: 'Low prices and small volume; Contract sits in the wrong company; No product beyond hire.' },
      { lead: 'Verdict:', text: 'Viable but small, and structurally wrong for investors.' },
    ],
  },
  {
    title: 'B. Concession plus SUP, heritage trails, schools and cross-sell',
    points: [
      { lead: 'How it works.', text: 'The same concession, with 8 SUPs, guided Kottappuram Fort paddles, a schools programme, Academy tasters and combined tickets with the Muziris Passport. The contract stays with Bond Water Sports.' },
      { lead: 'For:', text: 'Higher average spend; Wider market; Builds the Academy pipeline.' },
      { lead: 'Against:', text: 'Contract still in the wrong company; Needs MPL’s agreement to add SUP and new products.' },
      { lead: 'Verdict:', text: 'The right product, in the wrong legal home.' },
    ],
  },
  {
    title: 'C. Expanded concession transferred to Bond Safari Paddle Sports',
    points: [
      { lead: 'How it works.', text: 'As B, but the concession is novated from Bond Water Sports to Bond Safari Paddle Sports with MPL’s written consent (or sub-licensed on arm’s-length terms approved by the investor director). Legal and transfer costs of about ₹2 lakh.' },
      { lead: 'For:', text: 'Revenue and contract belong to the company investors fund; Clean due diligence; Same commercial upside as B.' },
      { lead: 'Against:', text: 'Needs MPL consent; MPL may want to renegotiate terms; One-off legal cost.' },
      { lead: 'Verdict:', text: 'Recommended.' },
    ],
  },
]
export const COMPARISON_RESULT: Point = { lead: 'Result.', text: 'B and C have the same commercial case. C wins because it puts the contract and the revenue in the company investors are funding. A keeps the site alive but leaves money on the table.' }
export const COMPARISON_KEY = 'Key: A = Current concession, as is (hire only); B = Concession plus SUP, heritage trails, schools and cross-sell; C = Expanded concession transferred to Bond Safari Paddle Sports.'
export const COMPARISON: Table = {
  caption: 'Comparison of the models',
  head: ['Criterion', 'Weight', 'A', 'B', 'C'],
  rows: [
    ['Value created (5-year value)', '25%', '2', '3', '3'],
    ['Capital needed', '10%', '5', '4', '4'],
    ['Margin and resilience', '15%', '2', '3', '3'],
    ['Control of brand, quality, safety', '15%', '2', '3', '4'],
    ['Security of tenure', '10%', '2', '2', '4'],
    ['Speed to open and permit risk', '10%', '5', '4', '3'],
    ['Footfall and visibility', '10%', '3', '3', '3'],
    ['Environmental and reputational risk', '5%', '4', '4', '4'],
    ['Weighted score', '100%', '2.8', '3.1', '3.4'],
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
    ['Paddlers a year (mature)', '5,400', '6,300', '6,300'],
    ['Average ticket', '₹750', '₹900', '₹900'],
    ['B2B and courses on top', '5%', '15%', '15%'],
    ['Revenue share', '20%', '20%', '20%'],
    ['Variable costs', '19%', '19%', '19%'],
    ['Fixed costs a year', '18.0', '18.0', '18.0'],
    ['of which lease or rent', '0.0', '0.0', '0.0'],
    ['Capex', '14', '22', '24'],
  ],
  numeric: [1, 2, 3],
}
export const CAPEX: Point[] = [
  { lead: 'A. Current concession, as is (hire only):', text: 'Top-up craft 3; Safety kit (40 sets) 2; Rescue boat with outboard 7; Kiosk and branding 2; total 14.' },
  { lead: 'B. Concession plus SUP, heritage trails, schools and cross-sell:', text: 'Top-up craft and 8 SUPs 11; Safety kit 2; Rescue boat with outboard 7; Kiosk and branding 2; total 22.' },
  { lead: 'C. Expanded concession transferred to Bond Safari Paddle Sports:', text: 'Top-up craft and 8 SUPs 11; Safety kit 2; Rescue boat with outboard 7; Kiosk and branding 2; Legal and transfer costs 2; total 24.' },
]
export const MATURE_YEAR: Table = {
  caption: 'Mature year (year 3 onward)',
  head: ['', 'A', 'B', 'C'],
  rows: [
    ['Revenue', '42.5', '65.2', '65.2'],
    ['Less revenue share', '(8.5)', '(13.0)', '(13.0)'],
    ['Less variable costs', '(8.1)', '(12.4)', '(12.4)'],
    ['Less fixed costs', '(18.0)', '(18.0)', '(18.0)'],
    ['EBITDA', '7.9', '21.8', '21.8'],
    ['EBITDA margin', '19%', '33%', '33%'],
    ['Payback', '3.6 years', '2.0 years', '2.1 years'],
    ['5-year cumulative cash after capex', '11.4', '65.0', '63.0'],
    ['5-year value at 25%', '(3.4)', '20.0', '18.0'],
  ],
  numeric: [1, 2, 3],
  highlight: [4, 8],
}
export const FIVE_YEAR_PATH: Table = {
  caption: 'The five-year path for the recommended model (C)',
  head: ['Year', '1', '2', '3', '4', '5'],
  rows: [
    ['Volume vs mature', '60%', '85%', '100%', '100%', '100%'],
    ['Revenue', '39.1', '55.4', '65.2', '65.2', '65.2'],
    ['EBITDA', '5.9', '15.8', '21.8', '21.8', '21.8'],
    ['Cumulative cash after ₹24 lakh capex', '(18.1)', '(2.3)', '19.4', '41.2', '63.0'],
  ],
  numeric: [1, 2, 3, 4, 5],
}
export const SENSITIVITY: Table = {
  caption: 'How sensitive is the recommended model (C)?',
  head: ['Scenario', 'Mature revenue', 'Mature EBITDA', '5-year value', 'Payback'],
  rows: [
    ['Base case', '65.2', '21.8', '18.0', '2.1 years'],
    ['Demand one-third lower', '43.5', '8.5', '(12.1)', '4.5 years'],
    ['Price 18% lower', '53.5', '14.6', '1.7', '2.9 years'],
    ['Downside: demand one-third lower and price 18% lower', '35.6', '3.7', '(23.0)', 'Not within 5 years'],
    ['Severe: demand halved and price 18% lower', '26.7', '(1.7)', '(35.3)', 'Not within 5 years'],
    ['Demand one-third higher', '86.9', '35.0', '48.2', '1.4 years'],
    ['Price 18% higher', '76.9', '28.9', '34.3', '1.6 years'],
    ['Fixed costs 20% higher', '65.2', '18.2', '8.3', '2.5 years'],
    ['Capex 25% higher', '65.2', '21.8', '12.0', '2.4 years'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [0],
}
export const SENSITIVITY_READING: Point = { lead: 'Reading the sensitivities.', text: 'Mature-year EBITDA breaks even at about 1.58% capture (2,851 paddlers), 45% of the base case. The site is small, so absolute numbers move little, but the MPL share and the price mix matter more than volume. The real risk is MPL changing the concession, not demand.' }
export const REVENUE_SHARES: Table = {
  caption: 'Model C at different revenue shares',
  head: ['Share to the owner', 'Mature EBITDA', '5-year value at 25%'],
  rows: [
    ['10%', '28.3', '32.8'],
    ['15%', '25.0', '25.4'],
    ['20%', '21.8', '18.0'],
    ['25%', '18.5', '10.6'],
    ['30%', '15.3', '3.2'],
  ],
  numeric: [1, 2],
}
export const REVENUE_SHARES_NOTE = 'The MPL share is the key unknown. Every 5 points of revenue share moves mature EBITDA by about ₹3 lakh. The figures will be updated once the Letter of Acceptance terms are confirmed.'

// 8. The Muziris concession: ownership and terms
export const CONCESSION_INTRO = [
  'MPL awarded Bond Water Sports Pvt Ltd a Letter of Acceptance (reference MPL-515/26, following EOI MPL 442/25) to operate MPL’s kayaks and canoes in the Muziris Heritage zone. Bond handles payment collection and billing; revenue comes into Bond Water Sports’ account; Bond settles the agreed profit share and monthly charges to MPL each month.',
  'Bond Safari Paddle Sports investors are told this site is theirs. It is not, legally, until the concession is novated or sub-licensed. This report recommends asking MPL for written consent to novate both Muziris sites to Bond Safari Paddle Sports, and in the meantime signing a sub-licence that passes all paddle revenue and costs to Bond Safari Paddle Sports, approved by the investor director.',
]
export const TERMS: Table = {
  caption: 'Terms we need',
  head: ['Term', 'Our position', 'Walk away if'],
  rows: [
    ['Contract holder', 'Bond Safari Paddle Sports Pvt Ltd (by novation with MPL consent)', 'MPL refuses any transfer or sub-licence'],
    ['Profit share and charges', 'Confirm the LoA terms; model assumes 20% of revenue', 'Share above 30% of revenue equivalent'],
    ['Products', 'Right to add SUP, guided trails, schools and courses', 'Hire-only restriction'],
    ['Tenure', 'At least 5 years, with renewal', 'Under 3 years remaining'],
    ['Fleet', 'MPL replaces worn craft; Bond adds its own SUPs and safety kit', 'Bond must replace MPL’s fleet at its own cost'],
    ['Data', 'Bookings through Bond’s system; MPL sees reports', 'Bookings only through an MPL system'],
  ],
}
export const QUESTIONS: Point[] = [
  { text: 'What exactly are the profit-share rate and monthly charges in the Letter of Acceptance?' },
  { text: 'Will MPL consent to novation to Bond Safari Paddle Sports?' },
  { text: 'What is the concession’s term and renewal right?' },
  { text: 'Who owns and maintains the Kottappuram jetty?' },
  { text: 'Can SUP, guided trails and courses be added under the current terms?' },
]

// 9. Permits, environment and safety
export const PERMITS_INTRO = 'The site is an estuarine stretch of the Periyar at the start of National Waterway 3, with mangrove fringes, CRZ restrictions and protected heritage structures (the fort). MPL holds the site under the Department of Tourism; Bond holds the operating concession.'
export const PERMITS: Table = {
  caption: 'Permits checklist (to confirm with each authority)',
  head: ['Permit or registration', 'Authority', 'Applies here'],
  rows: [
    ['Concession', 'Muziris Projects Ltd (Dept of Tourism)', 'In place (Bond Water Sports)'],
    ['Adventure tourism operator registration', 'KATPS', 'Required for the operating company'],
    ['Craft and rescue-boat registration', 'Kerala Maritime Board', 'Rescue boat; check MPL fleet status'],
    ['Waterway use on NW-3', 'Inland Waterways Authority of India', 'Confirm; keep out of the navigation channel'],
    ['Trade licence', 'Kodungallur Municipality', 'Confirm'],
    ['Heritage structures', 'Archaeology Department (fort)', 'No landing or fixing to the ruins'],
    ['Insurance and GST', 'Insurer; GST', 'Required'],
  ],
}
export const ENVIRONMENT: Point[] = [
  { text: 'Paddle only; the rescue boat is the only motor craft' },
  { text: 'No landing on mangrove fringes; litter pick on every trip' },
  { text: 'Heritage code: no climbing on or mooring to the fort ruins' },
  { text: 'Local hiring from Kodungallur and Azhikode through the Academy' },
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
    ['Currents', 'Routes kept upstream of the Azhikode bar mouth; suspensions on high-discharge and dam-release days'],
  ],
}

// 10. Risks
export const RISK_REGISTER: Table = {
  caption: 'Risks',
  head: ['#', 'Risk', 'Likelihood', 'Impact', 'How we manage it'],
  rows: [
    ['1', 'Concession sits in Bond Water Sports, not this company', 'Certain until fixed', 'High', 'Novation or sub-licence; disclose to investors'],
    ['2', 'MPL changes terms or ends the concession', 'Medium', 'High', 'Written term and renewal; good reporting; joint promotion'],
    ['3', 'Profit share higher than modelled', 'Unknown', 'Medium', 'Insert LoA terms; renegotiate on product expansion'],
    ['4', 'Low prices limit revenue', 'High', 'Medium', 'Guided heritage paddles, SUP, schools'],
    ['5', 'Muziris Heritage Project maintenance stalls (reported as ‘rudderless’)', 'Medium', 'Medium', 'Joint plan with MPL; Bond cleans and maintains the jetty area it uses'],
    ['6', 'Monsoon flows and dam releases', 'High (seasonal)', 'Medium', 'Suspension rules; Academy theory in monsoon'],
    ['7', 'Festival crowds (Bharani)', 'Medium', 'Medium', 'Capacity limits; extra guides'],
    ['8', 'Safety incident near the bar mouth or NW-3 traffic', 'Low', 'Very high', 'Route limits; rescue boat; Paddle UK standard'],
    ['9', 'KATPS conflict', 'Certain', 'Medium', 'Written recusal'],
  ],
}
export const RISK_NOTE: Point = { lead: 'The risk that decides the case is ownership: until the concession is in Bond Safari Paddle Sports, the site’s revenue is not legally the investors’.' }

// 11. Recommendation and launch plan
export const RECOMMENDATION: Point[] = [
  { text: 'Keep operating; do not wait for the transfer to improve the product.' },
  { text: 'Write to MPL now asking for consent to novate both Muziris concessions to Bond Safari Paddle Sports; sign an interim sub-licence approved by the investor director.' },
  { text: 'Add 8 SUPs, a guided Kottappuram Fort paddle and a schools programme before the December–March peak.' },
  { text: 'Replace the investor model’s 180,000 visitor estimate with Bond’s own ticket data after the first season.' },
]
export const LAUNCH_PLAN: Table = {
  caption: 'Launch plan',
  head: ['When', 'Step', 'Owner', 'Gate'],
  rows: [
    ['November 2026', 'Letter to MPL on novation; interim sub-licence; confirm LoA terms', 'MD; company secretary', ''],
    ['November–December 2026', 'Add SUPs and guided fort paddle; schools outreach in Thrissur and Ernakulam', 'Site lead; Academy', ''],
    ['December 2026–March 2027', 'Peak-season operation; ticket and visitor data collection', 'Site lead', ''],
    ['By 31 March 2027', 'Novation or sub-licence signed', 'MD; investor director', 'Gate: contract in the right company'],
    ['April 2027', 'Review of first season against KPIs; revise model base', 'Board', 'Gate: continue, expand or renegotiate'],
  ],
}
export const KPIS: Table = {
  caption: 'First-year KPIs and gate thresholds',
  head: ['KPI', 'Target', 'Scale up if', 'Rethink if'],
  rows: [
    ['Paddlers in year 1', '3,780', '3,591 or more', 'Under 2,457'],
    ['Average spend per paddler (incl. B2B)', '₹1,035', '₹983 or more', 'Under ₹810'],
    ['EBITDA in year 1 (₹ lakh)', '5.9', '5.3 or more', 'Below zero'],
    ['Guest rating (Google, Tripadvisor)', '4.7', '4.6 or more', 'Under 4.3'],
    ['Safety', 'Zero reportable incidents', 'Zero', 'Any serious incident (immediate review)'],
    ['Guides from the local community', '75%', '75% or more', '—'],
  ],
}

// Sources
export const SOURCES: { title: string; url?: string }[] = [
  { title: 'Onmanorama: Water adventure tourism launched at Muziris (18 Oct 2026)', url: 'https://www.onmanorama.com/news/kerala/2026/10/18/water-adventure-tourism-muziris-heritage-project.html' },
  { title: 'Kerala Tourism: Muziris boat services resume', url: 'https://www.keralatourism.org/muziris-boat-services-resume' },
  { title: 'DTPC Thrissur: Kottappuram Muziris Fort', url: 'https://www.dtpcthrissur.com/destination/kottappuram-muziris-fort' },
  { title: 'Kerala Tourism: Kottappuram boat jetty gallery', url: 'https://www.keralatourism.org/muziris/picture-gallery/kottappuram-boat-jetty-1/22' },
  { title: 'inkl: Muziris Heritage Project ‘rudderless’', url: 'https://inkl.com/news/muziris-heritage-project-to-conserve-historic-port-s-legacy-rudderless' },
  { title: 'Universal Adventures: Kayaking in Kochi (price benchmark)', url: 'https://universaladventures.in/products/kayaking-in-kochi' },
  { title: 'Kerala Tourism Statistics 2025', url: 'https://www.keralatourism.org/tourismstatistics/tourists_statistics_202520260507114657.pdf' },
  { title: 'MPL Letter of Acceptance to Bond Water Sports (internal)' },
]
