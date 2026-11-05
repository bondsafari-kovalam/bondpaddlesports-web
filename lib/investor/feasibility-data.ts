import 'server-only'

/**
 * CONFIDENTIAL. "Kumarakom Paddle Sports Centre: Feasibility Study", prepared by Jackson Peter, transcribed as
 * written from the 18-page version supplied for investors, which has no section 10. View only: the study is shown in
 * the portal and never served as a file, so don't add it to private/investor-documents/ or to the download route. `server-only` keeps it out of browser bundles, but it is
 * still source code: it must never be pushed to a public repository. It disagrees with the round deck on Kumarakom
 * (the executive summary says so); the deck's figures in round-data.ts stand until an approved deck changes them.
 */

export type Point = { lead?: string; text?: string; sub?: string[] }
export type Table = { caption: string; head: string[]; rows: string[][]; numeric?: number[]; highlight?: number[]; wrapHead?: boolean }

export type StudyStage = 'Hub' | 'Live' | 'Wave 1' | 'Wave 2' | 'Deferred'

export const FEASIBILITY_HUBS = [
  { name: 'Trivandrum hub', area: 'Thiruvananthapuram and Kollam districts' },
  { name: 'Ernakulam hub', area: 'Ernakulam, Thrissur, Alappuzha and Kottayam districts' },
]

/**
 * One entry per location; a new study adds a card here and its own page under /investor/feasibility/.
 * The page groups them by hub and keeps this order: the hub report first, then its spokes in opening order.
 */
export const FEASIBILITY_STUDIES: { id: string; location: string; hub: string; stage: StudyStage; title: string; verdict: string; stats: string[][] }[] = [
  { id: 'trivandrum-hub', location: 'Trivandrum hub', hub: 'Trivandrum hub', stage: 'Hub', title: 'Trivandrum Hub: Hub Feasibility Study', verdict: 'Go, at the Bond Kovalam campus in January 2027, with a leased workshop near Kovalam.', stats: [['₹120 lakh', 'Hub capex'], ['₹72 lakh', 'Hub overhead a year'], ['₹3.43 Cr', 'Mature revenue, 5 spokes'], ['₹1.79 Cr', 'Mature EBITDA, 5 spokes']] },
  { id: 'kovalam', location: 'Kovalam', hub: 'Trivandrum hub', stage: 'Wave 1', title: 'Kovalam Paddle Sports Centre: Paddle Sports Feasibility Study', verdict: 'Go, in January 2027 as the hub’s home spoke, run from the Bond campus with Vellayani as the flat-water partner.', stats: [['₹41 lakh', 'Capex, Model B'], ['₹1.44 Cr', 'Mature revenue, Model B'], ['₹86 lakh', 'Mature EBITDA, Model B'], ['1.0 years', 'Payback, Model B']] },
  { id: 'ernakulam-hub', location: 'Ernakulam hub', hub: 'Ernakulam hub', stage: 'Hub', title: 'Ernakulam Hub: Hub Feasibility Study', verdict: 'Go: the strongest hub in the network, based on the Goshree corridor at Mulavukad or south Vypin.', stats: [['₹120 lakh', 'Hub capex'], ['₹72 lakh', 'Hub overhead a year'], ['₹5.9 Cr', 'Mature revenue of its spokes'], ['₹2.7 Cr', 'Mature EBITDA of its spokes']] },
  { id: 'muziris-kottapuram', location: 'Muziris–Kottapuram', hub: 'Ernakulam hub', stage: 'Live', title: 'Muziris–Kottapuram Paddle Centre: Operating Review and Feasibility Study', verdict: 'Operate and optimise; move the concession into the right company.', stats: [['₹24 lakh', 'Capex, Model C'], ['₹65.2 lakh', 'Mature revenue, Model C'], ['₹21.8 lakh', 'Mature EBITDA, Model C'], ['2.1 years', 'Payback, Model C']] },
  { id: 'kumbalangi', location: 'Kumbalangi', hub: 'Ernakulam hub', stage: 'Wave 1', title: 'Kumbalangi Paddle Sports Centre: Paddle Sports Feasibility Study', verdict: 'Go, with a community partnership, from a shared jetty near Kallanchery.', stats: [['₹40 lakh', 'Capex, Model C'], ['₹65.0 lakh', 'Mature revenue, Model C'], ['₹28.1 lakh', 'Mature EBITDA, Model C'], ['2.3 years', 'Payback, Model C']] },
  { id: 'kumarakom', location: 'Kumarakom', hub: 'Ernakulam hub', stage: 'Wave 2', title: 'Kumarakom Paddle Sports Centre: Feasibility Study', verdict: 'Go, as a standalone spoke with its own launch point and resort sales partnerships.', stats: [['₹47 lakh', 'Capex'], ['₹1.31 Cr', 'Mature revenue'], ['₹70 lakh', 'Mature EBITDA'], ['1.4 years', 'Payback']] },
  { id: 'alappuzha', location: 'Alappuzha', hub: 'Ernakulam hub', stage: 'Wave 2', title: 'Alappuzha Paddle Sports Centre: Feasibility Study', verdict: 'Go, as a two-site cluster: a Punnamada–Kuttanad spoke in FY28 and a Marari satellite in FY29.', stats: [['₹47 lakh', 'Capex, Model B'], ['₹1.17 Cr', 'Mature revenue, Model B'], ['₹60 lakh', 'Mature EBITDA, Model B'], ['1.5 years', 'Payback, Model B']] },
  { id: 'marari-coastal-blueway', location: 'Marari Coastal Blueway', hub: 'Ernakulam hub', stage: 'Deferred', title: 'Marari Coastal Blueway Paddle Centre: Paddle Sports Feasibility Study', verdict: 'Defer to FY29; go only on two conditions.', stats: [['₹30 lakh', 'Capex, Model C'], ['₹64.4 lakh', 'Mature revenue, Model C'], ['₹28.8 lakh', 'Mature EBITDA, Model C'], ['1.8 years', 'Payback, Model C']] },
]

export const PREPARED_BY = 'Prepared By : Jackson Peter, Managing Director – Bond Group of Companies'

// Executive summary
export const SUMMARY_ANSWER: Point = { lead: 'The answer: go.', text: 'Kumarakom should open, but as a standalone spoke with its own launch point and resort sales partnerships. Bid for the Nalupanku jetty only if the sub-lease terms pass four tests. Do not place kit at individual resorts.' }
export const SUMMARY_WHY: Point[] = [
  { text: 'It had 517,722 visitors in 2025, 12% of them foreign, which is two-thirds of all visitors to Kottayam district.' },
  { text: 'It is the premium backwater resort cluster on Vembanad, so visitors spend more than average.' },
  { text: 'Paddling is thinly served: a few small tour operators charge ₹700–1,000 for a two-hour kayak, and none offers certified guides, stand-up paddleboards or courses.' },
]
export const SUMMARY_MODELS: Table = {
  caption: 'The three models compared (steady state, ₹ lakh a year)',
  head: ['Model', 'Capex', 'Revenue', 'EBITDA', 'Margin', 'Payback', '5-year value at 25%'],
  rows: [
    ['A. Kit and guides at partner resorts (5 resorts)', '55', '69', '21', '30%', '3.9 years', '−18'],
    ['B. Standalone spoke with resort sales partners', '47', '131', '70', '53%', '1.4 years', '+97'],
    ['C. Nalupanku jetty sub-lease (paddle + motorised) at 25% revenue share', '72', '144', '39', '27%', '3.0 years', '0'],
  ],
  numeric: [1, 2, 3, 4, 5, 6],
  highlight: [1],
}
export const SUMMARY_MEANS: Point[] = [
  { lead: 'B creates the most value with the least capital,', text: 'but it needs a waterfront lease and permits.' },
  { lead: 'Nalupanku (C) is attractive only on better terms.', text: 'At a 15% revenue share or an equivalent fixed rent, with a lease of at least five years, its 5-year value rises to about ₹33 lakh.' },
  { lead: 'C also raises a company-structure question.', text: 'Motorised rides belong to Bond Adventures Pvt Ltd, not to the paddle company that investors are funding.' },
]
export const SUMMARY_CORRECTION: Point = { lead: 'One correction to the investor plan.', text: 'The financial model assumes Kumarakom earns ₹1.91 Cr a year with an average ticket of ₹1,600. Market prices for a two-hour kayak are ₹700–1,000. This study’s base case is ₹1.31 Cr revenue and ₹70 lakh EBITDA. Kumarakom is still a strong site, but the plan should be revised down before investors rely on it.' }
export const SUMMARY_CAVEAT = 'All financial figures are Bond estimates for decision-making. They need validating with a visitor count on site and Gargi Resorts’ actual terms.'

// 1. Why Kumarakom
export const WHY_INTRO: Point = { lead: 'Kumarakom is Kerala’s best-known backwater resort cluster.', text: 'It sits on the eastern shore of Vembanad Lake, the state’s largest wetland and a Ramsar site. It also has the Kumarakom Bird Sanctuary and the densest concentration of premium lake resorts in the state, and it is where Kerala’s Responsible Tourism programme began. Visitors come for calm water, birds and village life. Paddling fits that better than any other activity.' }
export const WHY_REASONS: Point[] = [
  { lead: 'Volume with spending power.', text: 'It had 517,722 visitors in 2025, about 12% of them foreign (63,394). Most stay in resorts or houseboats rather than coming for a day, so they have time in the morning and evening, which is when paddling is best.' },
  { lead: 'Calm, sheltered water.', text: 'The canals and the lake edge can be paddled for most of the year. This suits beginners, families and stand-up paddleboarding (SUP), the three biggest segments in our plan.' },
  { lead: 'The gap in the market is quality, not supply.', text: 'Kayaks are already on offer, but from small operators with no certified guides, no structured routes, no SUP and no courses. A Paddle UK-standard operation would be clearly different.' },
  { lead: 'It extends the brand.', text: 'A visible presence in Kumarakom tells domestic and international visitors that Bond is a Kerala-wide paddle brand, not just a Kochi one.' },
]
export const HUB_FIT: Table = {
  caption: 'How Kumarakom fits the hub',
  head: ['Factor', 'Position'],
  rows: [
    ['Hub', 'Ernakulam (Kochi–Vypin base)'],
    ['Distance from the hub', 'About 60 km, roughly 1.5–2 hours by road'],
    ['What the hub provides', 'Spare kit, repairs, Academy-trained guides, the safety officer, stock for the shop, and central booking and marketing'],
    ['What the spoke needs locally', 'Storage, a launch point, a kiosk, 4–5 guides and a site lead'],
    ['Other spokes in the same region', 'Muziris Kottapuram and North Paravur (both live), plus the planned Ernakulam spokes'],
  ],
}
export const HUB_DISTANCE = 'The distance matters. At 1.5–2 hours, the hub cannot fix daily problems the same day. Kumarakom therefore needs a fuller local set-up than a typical spoke: spare craft on site, a trained site lead who can make safety calls, and its own rescue boat.'
export const SEASONS: Table = {
  caption: 'Seasons',
  head: ['Period', 'Conditions', 'What it means for paddling'],
  rows: [
    ['September–November', 'Post-monsoon, green and full', 'Strong; good for families and domestic holidays'],
    ['December–February', 'Peak season; migratory birds in January–February', 'Peak demand; sunrise bird paddles at premium prices'],
    ['March–May', 'Hot; domestic summer holidays in April–May', 'Steady early and late in the day; midday is too hot'],
    ['June–August', 'Monsoon; snake-boat races in August–September', 'Low demand and weather closures; races give event spikes'],
  ],
}
export const HYACINTH_NOTE = 'Water hyacinth is the main local operating risk. It can block canals and launch points for weeks, especially after the monsoon. Section 8 covers how to manage it.'

// 2. Demand
export const VISITORS: Table = {
  caption: 'The base: who comes to Kumarakom (Kerala Tourism Statistics 2025)',
  head: ['Group', 'Visitors in 2025', 'Share'],
  rows: [
    ['Domestic', '454,328', '88%'],
    ['Foreign', '63,394', '12%'],
    ['Kumarakom total', '517,722', '100%'],
    ['Kottayam district total', '771,976', 'Kumarakom is 67% of the district'],
  ],
  numeric: [1],
  highlight: [2],
}
export const VISITORS_NOTE = 'These figures count tourist arrivals at registered accommodation. They leave out day-trippers from Kottayam, Kochi and Alappuzha and local residents. So they understate the real market, which gives the estimate below a margin of safety.'
export const CAPTURE_INTRO: Point = { lead: 'From visitors to paddlers.', text: 'The key assumption is capture: the share of visitors who book a paddle session with us. Kayaking has the most experience in Kerala, where operators at established sites report 1–3%. We use 2% as the base case.' }
export const CAPTURE: Table = {
  caption: 'Paddlers at each capture rate',
  head: ['Capture rate', 'Paddlers a year', 'A day on average (270 operating days)', 'On a peak day (about 2×)'],
  rows: [
    ['1.0% (cautious)', '5,177', '19', '38'],
    ['1.5%', '7,766', '29', '58'],
    ['2.0% (base)', '10,354', '38', '77'],
    ['2.5% (strong)', '12,943', '48', '96'],
  ],
  numeric: [1, 2, 3],
  highlight: [2],
}
export const CAPACITY: Point = { lead: 'Can the site handle it?', text: 'With 20 craft, four sessions a day (two at sunrise and two in the late afternoon) and about 1.4 people per craft, the site has about 112 seats a day, or about 30,000 a year. The base case uses roughly a third of that, so peak days fit with room to spare. The real limits are guides and the weather, not boats.' }
export const SPEND_INTRO: Point = { lead: 'What each paddler spends.', text: 'We use an average of ₹1,100 per paddler, blending:' }
export const SPEND_BLEND: Point[] = [
  { text: 'guided kayak tours at ₹900–1,200;' },
  { text: 'SUP lessons and sunrise bird paddles at ₹1,200–1,800;' },
  { text: 'family and group sessions at a discount.' },
]
export const SPEND_B2B = 'On top of that, B2B sales add about 15%: resort groups, corporate offsites, school trips, Paddle UK taster courses and shop sales.'
export const BASE_REVENUE: Point = { lead: 'Base-case revenue (standalone spoke):', text: '10,354 paddlers × ₹1,100 × 1.15 ≈ ₹1.31 Cr a year once the site is mature.' }
export const DEMAND_UPSIDE_INTRO: Point = { lead: 'What would make demand higher.', text: 'Three things could push capture towards 2.5%:' }
export const DEMAND_UPSIDE: Point[] = [
  { text: 'Membership: the Paddle Season Pass works at every Bond site.' },
  { text: 'Cross-selling from bondsafarikovalam.com bookings.' },
  { text: 'Partner resorts promoting us actively.' },
]
export const DEMAND_UPSIDE_NOTE = 'We have not included these in the base case.'
export const DEMAND_CHECK: Point = { lead: 'What we still need to check.', text: 'Before committing capital, we should run a two-week count on site in December or January. It would count paddlers at existing operators and survey visitors at the main jetties and three resorts. It costs very little and would confirm or correct the capture rate, which is the single assumption the whole case depends on (Section 5).' }

// 3. Competition and pricing
export const OPERATORS: Table = {
  caption: 'Who already sells paddling in Kumarakom',
  head: ['Operator', 'What they offer', 'Price', 'Quality signals'],
  rows: [
    ['Sreestours (Kavanattinkara)', 'Guided kayak tours, 6–8am and 4–6pm', '₹1,000 single, ₹1,400 double, for 2 hours', 'Small local operator; no certification shown'],
    ['Kumarakom Adventure Club', 'Motorised rides, kayaks and pedal boats', 'Not published', 'Listed on Tripadvisor with no reviews'],
    ['DTPC Kottayam', 'Announced a 26-kayak service at the SN Pavilion (about 2021)', 'Low government rates', 'Current status unclear; may not be running'],
    ['Resorts', 'Shikara (canopied boat) and country-canoe rides for guests', 'Often bundled into the room rate', 'Guests only; boatman-led, not paddling'],
    ['State Water Transport ferries', 'Public ferry across the lake', 'About ₹20', 'Transport, not an experience'],
    ['Malarikkal and village canoe rides', 'Country canoe through paddy and water-lily areas', '₹300–700', 'Seasonal (lilies peak August–October)'],
  ],
}
export const COMPETITION_CONCLUSIONS: Point[] = [
  { lead: 'Price is anchored at ₹700–1,000 for a two-hour kayak.', text: 'We can charge a premium for certified guides, better kit, SUP and a branded experience. But ₹1,600, the ticket in the current investor model, is well above what visitors see elsewhere in Kumarakom. We price the core tour at ₹999–1,200 and take the premium on special products.' },
  { lead: 'No one offers SUP, courses or Paddle UK-certified guides.', text: 'That is our clearest difference, and it also leads into the Academy.' },
  { lead: 'Resorts are partners, not rivals.', text: 'Their shikara and canoe rides are passive sightseeing. Our paddling is active. Resorts want activities to sell to guests, and they do not want to carry the safety risk themselves.' },
]
export const PRICE_LIST: Table = {
  caption: 'Proposed price list for Kumarakom (inclusive of GST; confirm against the 2027 rate card)',
  head: ['Product', 'Duration', 'Price'],
  rows: [
    ['Guided canal kayak tour (single)', '2 hours', '₹1,100'],
    ['Guided canal kayak tour (double, per person)', '2 hours', '₹850'],
    ['Sunrise bird paddle, December–February', '2.5 hours', '₹1,600'],
    ['SUP lesson for beginners', '1.5 hours', '₹1,200'],
    ['Family session, 2 adults and 2 children', '1.5 hours', '₹2,800'],
    ['Sunset SUP or kayak', '1.5 hours', '₹1,000'],
    ['Paddle UK Discover / Start Paddling taster', 'Half day', 'From the rate card'],
    ['Resort guest rate (sold through the resort)', '—', 'List price; the resort earns commission'],
  ],
}
export const PRICE_NOTE = 'This blend gives an average of about ₹1,100 per paddler. The study uses that figure, not ₹1,600.'

// 4. The three operating models
export const MODELS: { title: string; how: string; list?: Point[]; closing?: string; strengths: Point[]; weaknesses: Point[] }[] = [
  {
    title: 'Model A: Kit and guides placed at partner resorts',
    how: 'We place 4–6 craft and a guide at each of five lakefront resorts. Guests book through the resort, and the resort keeps about 25% of revenue for hosting us and selling the sessions.',
    strengths: [{ text: 'Customers are already on site.' }, { text: 'No waterfront lease is needed.' }, { text: 'It quickly builds premium partnerships.' }],
    weaknesses: [
      { lead: 'Only resort guests are reached.', text: 'Houseboat visitors, homestay guests and day-trippers are left out.' },
      { lead: 'Kit and staff are spread thin.', text: 'Five small sites need five sets of kit, five guides and five safety set-ups for about 770 paddlers each.' },
      { lead: 'Each resort can end the arrangement at any time,', text: 'often when management changes.' },
      { lead: 'We control the experience less.', text: 'The resort’s brand comes first, and the guest data stays with the resort.' },
      { lead: 'Quality varies,', text: 'because one guide works alone at each resort.' },
    ],
  },
  {
    title: 'Model B: Our own standalone spoke, with resorts as sales partners',
    how: 'Bond Safari Paddle Sports runs one branded launch point on the canal or lake edge, on a leased or licensed plot with a jetty, kiosk, storage and changing area. It sells to everyone:',
    list: [{ text: 'walk-ins;' }, { text: 'online bookings;' }, { text: 'houseboats and homestays;' }, { text: 'resort guests, through a commission of 10–15% paid only on sessions the resort sells.' }],
    closing: 'The resort carries no kit and takes no risk.',
    strengths: [{ text: 'It serves the whole market.' }, { text: 'All kit and staff are in one place, so they are used efficiently.' }, { text: 'The site carries our brand, our data and the Paddle UK standard.' }, { text: 'It is the right base for Academy courses.' }],
    weaknesses: [{ text: 'We need to find a suitable waterfront plot and secure permits ourselves.' }, { text: 'We carry the lease and fixed costs whether or not demand arrives.' }],
  },
  {
    title: 'Model C: Sub-lease of water sports at Nalupanku jetty',
    how: 'The panchayat owns the Nalupanku water sports jetty and has leased it to Gargi Resorts. Gargi is inviting water sports operators to bid for a sub-lease.',
    list: [{ text: 'The operator brings its own equipment, both paddle craft and motorised “toys”.' }, { text: 'The operator pays Gargi a revenue share or rent.' }, { text: 'We assume a 25% revenue share; the real terms are still unknown.' }],
    strengths: [{ text: 'A ready, public jetty with visibility and an existing customer flow.' }, { text: 'The permits may already be held by the lessor.' }, { text: 'Quick to start.' }],
    weaknesses: [
      { lead: 'Three layers of contract.', text: 'The panchayat leases to Gargi, Gargi sub-leases to us, and our tenure can never be longer than Gargi’s.' },
      { lead: 'The money is in the motorised rides.', text: 'Jet skis, speed boats and towables make about 60% of the revenue.', sub: ['Motorised activities belong to Bond Adventures Pvt Ltd, not the paddle company that investors are funding.', 'They need more capital, more permits and more insurance.', 'They are the most likely to be restricted on a Ramsar wetland.'] },
      { lead: 'A 25% revenue share takes most of the profit.' },
    ],
  },
]
export const COMPARISON: Table = {
  caption: 'Comparison of the three models, scored 1 (poor) to 5 (strong)',
  head: ['Criterion', 'Weight', 'A. Resorts', 'B. Standalone', 'C. Nalupanku'],
  rows: [
    ['Value created (5-year value at 25%)', '25%', '1', '5', '2'],
    ['Capital needed', '10%', '3', '4', '2'],
    ['Margin and resilience to lower demand', '15%', '2', '4', '2'],
    ['Control of brand, quality and data', '15%', '2', '5', '3'],
    ['Security of tenure', '10%', '2', '3', '2'],
    ['Speed to open and permit risk', '10%', '4', '2', '4'],
    ['Fit with this company’s activities (paddle only)', '10%', '5', '5', '2'],
    ['Environmental and reputational risk', '5%', '4', '4', '2'],
    ['Weighted score', '100%', '2.5', '4.2', '2.4'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [8],
}
export const COMPARISON_INTRO = 'Scored 1 (poor) to 5 (strong). Weights reflect what matters to investors in Bond Safari Paddle Sports.'
export const COMPARISON_RESULT: Point = { lead: 'Result.', text: 'Model B scores clearly highest. Resorts work best as sales partners for B rather than as places to host kit, which is how B already uses them. Nalupanku is worth bidding for only as a second launch point on terms that pass the tests in Section 6.' }

// 5. Financial assessment
export const FINANCE_INTRO = 'All figures are in ₹ lakh, before tax. They are Bond estimates. Years 1 and 2 are at 60% and 85% of mature volume, and years 3–5 are at 100%. Values are discounted at 25% a year, the early-stage rate used in our valuation report.'
export const ASSUMPTIONS: Table = {
  caption: 'Key assumptions',
  head: ['Assumption', 'A. Resorts', 'B. Standalone', 'C. Nalupanku (paddle + motorised)'],
  rows: [
    ['Paddlers or riders a year (mature)', '3,850 (770 at each of 5 resorts)', '10,354 (2% capture)', 'About 9,000 paddle + motorised riders'],
    ['Average spend', '₹1,800 (resort premium)', '₹1,100, plus 15% from B2B and courses', 'Paddle ₹54 lakh + motorised ₹90 lakh in total'],
    ['Revenue share or rent', '25% to resorts', 'Lease of ₹9 lakh a year (in fixed costs)', '25% to Gargi Resorts (assumed)'],
    ['Variable costs (commissions, payment fees, consumables, fuel)', '10%', '19%', '19.4% (includes fuel)'],
    ['Fixed costs a year', '24.5', '36.3 (staff 18.6, site 8.7, lease 9.0)', '41.0'],
    ['Capex', '55', '47', '72'],
  ],
}
export const CAPEX: Table = {
  caption: 'What the capex buys',
  head: ['Item', 'A', 'B', 'C'],
  rows: [
    ['Kayaks, canoes and SUPs, with paddles and PFDs', '45 (5 sets)', '27 (20 craft)', '18'],
    ['Jet skis (2)', '—', '—', '24'],
    ['Speed boat', '—', '—', '15'],
    ['Towables (banana boat, ringos)', '—', '—', '3'],
    ['Rescue boat and safety kit', '6', '6', '6'],
    ['Pontoon, kiosk, storage, branding', '4', '14', '6'],
    ['Total', '55', '47', '72'],
  ],
  numeric: [1, 2, 3],
  highlight: [6],
}
export const MATURE_YEAR: Table = {
  caption: 'Mature year (year 3 onward)',
  head: ['', 'A. Resorts', 'B. Standalone', 'C. Nalupanku'],
  rows: [
    ['Revenue', '69.3', '131.0', '144.0'],
    ['Less revenue share', '(17.3)', '—', '(36.0)'],
    ['Less variable costs', '(6.9)', '(24.9)', '(27.9)'],
    ['Less fixed costs', '(24.5)', '(36.3)', '(41.0)'],
    ['EBITDA', '20.5', '69.8', '39.1'],
    ['EBITDA margin', '30%', '53%', '27%'],
    ['Payback on capex', '3.9 years', '1.4 years', '3.0 years'],
    ['5-year cumulative EBITDA, after capex', '22.8', '243.7', '79.4'],
    ['5-year value at 25%', '(18.5)', '96.6', '(0.3)'],
  ],
  numeric: [1, 2, 3],
  highlight: [4],
}
export const FIVE_YEAR_PATH: Table = {
  caption: 'The five-year path for Model B',
  head: ['Year', '1', '2', '3', '4', '5'],
  rows: [
    ['Volume vs mature', '60%', '85%', '100%', '100%', '100%'],
    ['Revenue', '78.6', '111.3', '131.0', '131.0', '131.0'],
    ['EBITDA', '27.4', '53.9', '69.8', '69.8', '69.8'],
    ['Cumulative cash after ₹47 lakh capex', '(19.6)', '34.3', '104.1', '173.9', '243.7'],
  ],
  numeric: [1, 2, 3, 4, 5],
}
export const SENSITIVITY: Table = {
  caption: 'How sensitive is Model B?',
  head: ['Scenario', 'Mature revenue', '5-year value at 25%', 'Payback'],
  rows: [
    ['Base: 2% capture, ₹1,100', '131.0', '96.6', '1.4 years'],
    ['1.5% capture, ₹1,100', '98.2', '36.3', '2.1 years'],
    ['1.5% capture, ₹1,000', '89.3', '19.8', '2.4 years'],
    ['1% capture, ₹900 (downside)', '53.6', '(46.0)', 'Not within 5 years'],
    ['2.5% capture, ₹1,100', '163.7', '156.9', '1.0 year'],
    ['2% capture, ₹1,400', '166.7', '162.3', '1.0 year'],
    ['Fixed costs 20% higher', '131.0', '77.1', '1.6 years'],
    ['Variable costs at 25%', '131.0', '78.7', '1.5 years'],
    ['Capex 25% higher', '131.0', '84.8', '1.6 years'],
  ],
  numeric: [1, 2, 3],
  highlight: [3],
}
export const SENSITIVITY_POINTS: Point[] = [
  { lead: 'Capture and price matter most.', text: 'Costs and capex move the result much less.' },
  { lead: 'Mature-year EBITDA breaks even at about 0.7% capture,', text: 'roughly a third of the base case.' },
  { lead: 'The case for B is strong but not unconditional.', text: 'If demand came in at 1% at ₹900, the spoke would not repay its capital within five years.' },
  { lead: 'The on-site count in Section 2 is the cheapest way to remove this risk.', text: 'The kit can also be moved to another spoke if the site fails, which limits the loss to set-up costs and the first year’s lease.' },
]
export const REVENUE_SHARES: Table = {
  caption: 'Model C at different revenue shares',
  head: ['Revenue share to Gargi', 'Mature EBITDA (paddle + motorised)', '5-year value at 25%'],
  rows: [
    ['10%', '60.7', '48.9'],
    ['15%', '53.5', '32.5'],
    ['20%', '46.3', '16.1'],
    ['25% (assumed)', '39.1', '(0.3)'],
    ['30%', '31.9', '(16.6)'],
  ],
  numeric: [1, 2],
  highlight: [1],
}
export const PADDLE_ONLY_INTRO: Point = { lead: 'Paddle-only at Nalupanku', text: '(Bond Safari Paddle Sports’ part alone). Assumptions:' }
export const PADDLE_ONLY_ASSUMPTIONS: Point[] = [{ text: 'revenue ₹54 lakh;' }, { text: 'capex about ₹30 lakh (craft, safety and kiosk share);' }, { text: 'fixed costs about ₹11 lakh.' }]
export const PADDLE_ONLY: Table = {
  caption: 'Paddle-only at Nalupanku',
  head: ['Revenue share', 'Mature EBITDA', '5-year value at 25%', 'Payback'],
  rows: [
    ['15%', '24.6', 'About 21', 'About 2 years'],
    ['25%', '19.2', 'About 9', 'About 2.4 years'],
  ],
  numeric: [1, 2, 3],
}
export const PADDLE_ONLY_NOTE = 'As a second launch point next to Model B, the paddle-only part could share guides and kit, which would lower its fixed costs further.'

// 6. The Nalupanku sub-lease
export const BID_KNOWN: Point = { lead: 'What we know.', text: 'The panchayat owns the jetty and has leased it to Gargi Resorts. Gargi is inviting water sports operators from across Kerala to apply for a sub-lease. The operator invests in all equipment and “toys”.' }
export const BID_UNVERIFIED: Point = { lead: 'What we have not verified.', text: 'Online searches found no public record of the Nalupanku jetty tender or the Gargi Resorts head lease (a “Garggi Village Homestay” appears in listings, which may or may not be the same business). Everything in this section depends on the details you gave us. All of it needs confirming from documents before we bid.' }
export const CONTRACT_LAYERS: Table = {
  caption: 'Three layers of contract, three points of risk',
  head: ['Layer', 'Parties', 'Risk to us', 'What we need to see'],
  rows: [
    ['1. Head lease', 'Panchayat → Gargi Resorts', 'If the head lease ends, is cancelled or is challenged, our sub-lease ends with it', 'A copy of the head lease, its term, its renewal terms and any clause on sub-letting'],
    ['2. Sub-lease', 'Gargi Resorts → operator', 'Revenue share, tenure, exclusivity, exit', 'A draft sub-lease before we invest'],
    ['3. Permission to operate', 'Panchayat, Kerala Maritime Board, KATPS, wetland authority', 'If the jetty’s permits do not cover our activities, we cannot operate', 'Written proof of which permits the lessor holds and which the operator must obtain'],
  ],
}
export const BID_CONDITIONS_INTRO = 'We would bid only if all four tests are met. Bid in writing on these terms; walk away if they are refused.'
export const BID_CONDITIONS: Point[] = [
  { lead: 'Economics.', text: 'Revenue share of no more than 15% (or a fixed rent of no more than ₹8 lakh a year for paddling). No minimum guarantee in year 1.' },
  { lead: 'Tenure.', text: 'At least five years, running alongside Gargi’s head lease, with written panchayat consent to the sub-lease. If the head lease ends early, Gargi refunds a pro-rata share of our set-up costs.' },
  { lead: 'Exclusivity and exit.', text: 'Exclusive right to paddle sports at the jetty. Our equipment remains ours and can be removed at any time. Exit on 90 days’ notice if permits are withdrawn.' },
  { lead: 'Permits and safety.', text: 'Gargi or the panchayat holds and maintains the jetty’s permits. We hold our own KATPS registration and insurance. We set the safety rules for our activities.' },
]
export const COMPANY_INTRO = 'Motorised rides are a Bond Adventures Pvt Ltd activity. If we bid for both paddling and motorised rides:'
export const COMPANY_POINTS: Point[] = [
  { lead: 'Two separate sub-leases.', text: 'Bond Safari Paddle Sports and Bond Adventures each sign their own sub-lease, with costs and revenue kept apart.' },
  { lead: 'Shared costs on written terms.', text: 'Any shared costs (kiosk, staff, rescue boat) are split on written arm’s-length terms.' },
  { lead: 'Investor director approval.', text: 'These terms are approved by the investor director, because the managing director controls both companies.' },
  { lead: 'No capital from this round.', text: 'No funds from the paddle company’s investor round go into motorised craft.' },
]
export const COMPANY_NOTE = 'This keeps the business that investors are funding separate. It also avoids the investor concern that their money subsidises a sister company.'
export const RECOMMENDED_BID: Point[] = [
  { lead: 'What.', text: 'A paddle-only bid by Bond Safari Paddle Sports, with an optional, separate bid by Bond Adventures for motorised rides.' },
  { lead: 'When.', text: 'Only after Model B’s site is secured, or as Kumarakom’s first launch point if a suitable standalone plot cannot be found within three months.' },
]
export const GARGI_QUESTIONS_LEAD = 'Questions to put to Gargi Resorts before submitting:'
export const GARGI_QUESTIONS = [
  'Head lease term, remaining years and renewal right.',
  'Does the head lease allow sub-letting? Has the panchayat consented?',
  'Which permits does the jetty hold, and in whose name?',
  'How many operators will be appointed, and for which activities?',
  'Revenue share or rent, minimum guarantee and how revenue is measured.',
  'Current visitor numbers at the jetty, and records for the last two seasons.',
  'Who is responsible for jetty maintenance, hyacinth clearing, toilets and parking?',
  'Evaluation criteria and timeline for the applications.',
]

// 7. Permits, environment and safety
export const PERMITS_INTRO = 'Vembanad is a Ramsar wetland, and the Kumarakom Bird Sanctuary is on its shore. Regulators are tightening control of the lake. In July 2025 the State Wetland Authority ordered a crackdown on unlicensed houseboats and set the lake’s carrying capacity at about 350 houseboats. Paddling has a far lighter footprint than motor craft, and that is a selling point with regulators. But we should expect scrutiny, and we should build the environmental case into every application.'
export const PERMITS: Table = {
  caption: 'Permits checklist (to confirm with each authority)',
  head: ['Permit or registration', 'Authority', 'Applies to', 'Model B', 'Model C'],
  rows: [
    ['Adventure tourism operator registration', 'KATPS (Kerala Adventure Tourism Promotion Society)', 'All adventure activities', 'Required', 'Required (each company)'],
    ['Trade licence and site permission', 'Kumarakom Grama Panchayat', 'Any commercial premises', 'Required', 'Held by the lessor? Confirm'],
    ['Registration of craft, crew and safety equipment', 'Kerala Maritime Board', 'Motorised craft; check whether it covers non-motorised craft', 'Rescue boat', 'All motorised craft'],
    ['Wetland and Coastal Regulation Zone check', 'State Wetland Authority; Kerala Coastal Zone Management Authority', 'Structures on the water’s edge (pontoon, kiosk)', 'Required for any fixed structure', 'Jetty already built; confirm'],
    ['Consent to operate', 'Kerala State Pollution Control Board', 'Likely only for motorised craft and fuel storage', 'Unlikely', 'Likely'],
    ['Bird sanctuary buffer and no-go zones', 'Forest Department', 'Routes near the sanctuary', 'Routes agreed in writing', 'Routes agreed in writing'],
    ['Public liability and personal accident insurance', 'Insurer', 'All participants', 'Required', 'Required'],
    ['GST registration for the place of business', 'GST', 'Supplies at the site', 'Required', 'Required'],
  ],
}
export const KATPS_CONFLICT: Point = { lead: 'Conflict to manage.', text: 'Jackson Peter sits on the KATPS Technical Committee. He should recuse himself in writing from the registration of any Bond site, including Kumarakom, and the recusal should be recorded with KATPS. This is the same rule as in the investor deck.' }
export const ENVIRONMENT: Point[] = [
  { lead: 'Paddle-first.', text: 'Non-motorised craft only at the standalone spoke.' },
  { lead: 'Sanctuary rules.', text: 'No entry into sanctuary waters. Bird paddles run on routes agreed with the Forest Department, with a quiet code: no feeding birds and no approaching nests.' },
  { lead: 'Zero waste.', text: 'No single-use plastic on site; litter-picking on every trip (“paddle and pick”).' },
  { lead: 'Hyacinth plan.', text: 'At least two alternative launch points and routes. Work with the panchayat on clearing, possibly through a paid local clearing team.' },
  { lead: 'Local people first.', text: 'Hire and train guides from Kumarakom, working through the Responsible Tourism network. Sell local produce and crafts at the kiosk.' },
]
export const SAFETY: Table = {
  caption: 'Safety standard',
  head: ['Area', 'Standard'],
  rows: [
    ['Guides', 'Paddle UK-qualified, at least Paddlesport Leader or SUP Instructor for open water; first aid and rescue trained'],
    ['Guide-to-guest ratio', '1:6 for beginners, 1:8 for experienced guests; 1:4 for children'],
    ['Equipment', 'Life jacket (PFD) for every guest, always worn; whistle; tow line; spare paddle'],
    ['Rescue cover', 'A motorised rescue boat on standby whenever a group is on the water'],
    ['Weather and water', 'No sessions in thunderstorms, after dark or in strong wind; monsoon closures set by the site lead; a daily check of water and hyacinth'],
    ['Traffic', 'Routes keep clear of houseboat and ferry lanes; high-visibility vests and flags'],
    ['Records', 'Written risk assessment, daily log, incident reporting, audits by the hub safety officer'],
  ],
}

// 8. Risks
export const RISK_REGISTER: Table = {
  caption: 'Risks',
  head: ['#', 'Risk', 'Likelihood', 'Impact', 'How we manage it'],
  rows: [
    ['1', 'Demand below plan (capture under 1.5%)', 'Medium', 'High', 'Two-week count on site before signing; phased kit (12 craft first, 8 more after the first peak season); kit can move to another spoke'],
    ['2', 'Prices below ₹1,100 because of local competition', 'Medium', 'Medium', 'Lead with SUP, sunrise bird paddles and courses, which local operators do not offer; resort packages'],
    ['3', 'No suitable waterfront plot for Model B', 'Medium', 'High', 'Shortlist three or more sites (Kavanattinkara, the canal side near the Kottayam–Kumarakom road, resort-owned waterfront); Nalupanku as the fallback'],
    ['4', 'Nalupanku head lease ends or is challenged', 'Unknown', 'High', 'See the head lease before bidding; co-terminous tenure with panchayat consent; pro-rata refund clause'],
    ['5', 'Wetland rules tighten (activity limits or new permits)', 'Medium', 'Medium', 'Paddle only; environmental commitments in Section 7; early talks with the Wetland Authority'],
    ['6', 'Water hyacinth blocks routes', 'High (seasonal)', 'Medium', 'Alternative launch points; route flexibility; work with the panchayat on clearing'],
    ['7', 'Safety incident', 'Low', 'Very high', 'Paddle UK standard; ratios; rescue boat; audits; insurance; incident drills'],
    ['8', 'Distance from the hub (60 km) delays support', 'Medium', 'Low', 'Spare craft and repair kit on site; trained site lead; weekly hub visit'],
    ['9', 'Guide recruitment and retention', 'Medium', 'Medium', 'Recruit locally; train through the Academy; career pathway; season bonuses'],
    ['10', 'Resorts promote their own rides instead of ours', 'Medium', 'Low', 'Commission only on sales; resort-branded packages; one contact in each resort'],
    ['11', 'Related-party conflict (motorised rides in Bond Adventures; MD controls both companies)', 'Certain to arise', 'Medium', 'Separate contracts; arm’s-length terms; investor director approval; no paddle-company funds in motorised craft'],
    ['12', 'KATPS conflict (MD on the Technical Committee)', 'Certain to arise', 'Medium', 'Written recusal recorded with KATPS'],
    ['13', 'Monsoon and floods (as in 2018)', 'Medium', 'Medium', 'Seasonal closure built into the plan; kit stored on high ground; insurance'],
  ],
}
export const RISK_NOTE: Point = { lead: 'The risks that decide the case are 1 and 3:', text: 'demand and site. The two-week count and the site shortlist come first in the launch plan for that reason.' }

// 9. Recommendation and launch plan
export const RECOMMENDATION: Point[] = [
  { lead: 'Open Kumarakom as a standalone Bond Safari Paddle Sports spoke (Model B)', text: 'under the Ernakulam hub, with resorts, houseboats and homestays as commission-only sales partners.' },
  { lead: 'Do not place kit at individual resorts (Model A).', text: 'It needs more capital for less value and gives us less control.' },
  { lead: 'Respond to Gargi Resorts now, with a conditional paddle-only expression of interest for Nalupanku (Model C).', sub: ['Turn it into a bid only if the four tests in Section 6 are met.', 'If Bond wants the motorised rides, Bond Adventures bids for them separately on its own capital.'] },
  { lead: 'Spend nothing on equipment until the demand count and site are confirmed.' },
]
export const LAUNCH_PLAN: Table = {
  caption: 'Launch plan',
  head: ['When', 'Step', 'Owner', 'Gate'],
  rows: [
    ['November 2026', 'Ask Gargi Resorts for the head lease, permits and draft terms; send a conditional expression of interest', 'MD', '—'],
    ['November–December 2026', 'Shortlist 3+ standalone waterfront sites; talk to the panchayat; first resort partner meetings', 'Ernakulam hub manager', '—'],
    ['December 2026–January 2027', 'Two-week demand count and visitor survey in peak season', 'Hub manager plus 2 Academy trainees', 'Gate 0: capture of 1.5% or more is credible; price of ₹1,000 or more is accepted'],
    ['February–March 2027', 'Sign the site lease; apply for KATPS (with MD recusal), panchayat and other permits; recruit a site lead and 4 local guides', 'MD; safety officer', 'Gate 1: site and permits secured'],
    ['April–May 2027 (start of FY28)', 'Soft opening with 12 craft; sunrise and sunset sessions; resort partner launch', 'Site lead', '—'],
    ['June–August 2027', 'Monsoon: limited sessions; guide training; snake-boat race events', 'Site lead; Academy', '—'],
    ['September 2027', 'Full opening with 20 craft and SUP for the peak season', 'Site lead', '—'],
    ['March 2028', 'Review the first full year against KPIs', 'Board', 'Gate 2: scale, hold or move'],
  ],
}
export const EQUIPMENT_NOTE = 'Equipment is bought in two stages: about ₹32 lakh at the soft opening and about ₹15 lakh before the September 2027 peak, after the soft opening has proved demand.'
export const KPIS: Table = {
  caption: 'KPIs and Gate 2 thresholds (FY28, first year)',
  head: ['KPI', 'Target', 'Scale up if', 'Rethink if'],
  rows: [
    ['Paddlers', '6,200 (60% of mature)', '6,200 or more', 'Under 4,000'],
    ['Average spend per paddler (including B2B)', '₹1,265 (₹1,100 × 1.15)', '₹1,200 or more', 'Under ₹1,000'],
    ['EBITDA', '₹27 lakh (35% margin)', '₹25 lakh or more', 'Below zero'],
    ['Share of bookings via resort partners', '25%', '25% or more', 'Under 10%'],
    ['Guest rating (Google, Tripadvisor)', '4.7', '4.6 or more', 'Under 4.3'],
    ['Safety', 'Zero reportable incidents', 'Zero', 'Any serious incident (immediate review)'],
    ['Guides from the local community', '75%', '75% or more', '—'],
  ],
}
export const RETHINK_NOTE: Point = { lead: 'Rethink', text: 'means one of three options: cut the fleet and move the spare craft to another Ernakulam spoke, switch to Nalupanku, or close and move the kit.' }

// Sources
export const SOURCES = [
  'Kerala Tourism, Kerala Tourism Statistics 2025, keralatourism.org: visitor arrivals for Kumarakom and Kottayam district.',
  'Sreestours, Kumarakom kayaking tour page: prices and session times.',
  'Tripadvisor, Kumarakom water sports listings (Kumarakom Adventure Club).',
  'Onmanorama, Kumarakom travel guide (11 February 2026).',
  'Onmanorama, State Wetland Authority crackdown on illegal houseboats on Vembanad (15 July 2025).',
  'inkl / The Hindu syndication, DTPC Kottayam kayak expeditions at the SN Pavilion (about 2021).',
  'Bond Safari Paddle Sports financial model and investor deck V02 (internal).',
  'Nalupanku jetty and Gargi Resorts sub-lease: as described by Bond management; not independently verified.',
]
export const CLOSING_NOTE = 'Prepared for the Bond Safari Paddle Sports board and investors. The figures are estimates for decision-making, not guarantees. Confirm all permits and terms with the relevant authorities before committing capital.'
