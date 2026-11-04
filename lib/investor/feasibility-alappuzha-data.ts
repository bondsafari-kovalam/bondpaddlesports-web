import 'server-only'
import type { Point, Table } from './feasibility-data'

/**
 * CONFIDENTIAL. "Alappuzha Paddle Sports Centre: Feasibility Study", prepared by Jackson Peter, transcribed as written.
 * View only, like every feasibility study: shown in the portal and never served as a file. It must never be pushed to a
 * public repository.
 */

// Executive summary
export const SUMMARY_ANSWER: Point = { lead: 'The answer: go, as a two-site cluster.' }
export const SUMMARY_PHASES: Point[] = [
  { lead: 'Phase 1 (FY28): a Punnamada–Kuttanad spoke.', text: 'Open on the backwaters next to Alappuzha town, under the Ernakulam hub.', sub: ['First choice: a concession at a DTPC-operated jetty on Punnamada or Kainakary, if DTPC offers one on acceptable terms.', 'Fallback: our own standalone site on a canal edge.'] },
  { lead: 'Phase 2 (FY29): a Marari satellite.', text: 'It would be tied to the Alappuzha Coastal Blueway and sold through the Marari beach resorts.' },
  { lead: 'Do not place kit at individual resorts.', text: 'Panchayat jetties are worth adding later as low-cost satellites, not as the anchor.' },
]
export const SUMMARY_WHY: Point[] = [
  { lead: 'Volume.', text: 'The Alappuzha and Kuttanad destinations had 614,452 visitors in 2025, including 63,609 foreign visitors. That is more than Kumarakom and the largest backwater market in Kerala.' },
  { lead: 'A ready-made paddling audience.', text: 'About 800 houseboats work Vembanad Lake, and their guests are already on the water at sunrise, the best time to paddle.' },
  { lead: 'The Nehru Trophy Boat Race', text: 'gives Punnamada a national profile every August.' },
  { lead: 'Competitors compete on price, not on quality or range.', text: 'Existing operators sell two- to four-hour kayak tours for about ₹650–1,500. None offers stand-up paddleboarding (SUP), certified guides or courses.' },
]
export const SUMMARY_MODELS: Table = {
  caption: 'The four models compared (mature year, ₹ lakh a year, values discounted at 25%)',
  head: ['Model', 'Capex', 'Revenue', 'EBITDA', 'Margin', 'Payback', '5-year value'],
  rows: [
    ['A. Kit and guides at 5 resorts', '55', '63', '17', '26%', '4.7 years', '−28'],
    ['B. Standalone canal-edge spoke', '47', '117', '60', '52%', '1.5 years', '+75'],
    ['C. DTPC jetty concession (20% share, 2% capture)', '40', '141', '63', '44%', '1.2 years', '+93'],
    ['D. Panchayat jetty (rent, 1% capture)', '40', '71', '36', '51%', '2.0 years', '+34'],
  ],
  numeric: [1, 2, 3, 4, 5, 6],
  highlight: [1, 2],
}
export const SUMMARY_HOW_TO_READ: Point[] = [
  { lead: 'C beats B only if the DTPC jetty brings more footfall.', text: 'C is modelled at 2% capture against B’s 1.5%. At the same 1.5% capture, C’s value falls to about ₹43 lakh, below B. So take a DTPC concession only if it brings visibly higher footfall and the share is no more than 25% with at least five years’ tenure.' },
  { lead: 'The investor plan holds for Alappuzha.', text: 'The financial model already assumes 1.5% capture and ₹1,100 a ticket, giving about ₹1.17 Cr of revenue including B2B. This study’s Model B reaches the same revenue. The only change is about ₹7 lakh a year of lease or concession cost, which the model leaves out. Kumarakom, by contrast, needed a downward revision.' },
]
export const SUMMARY_CONFLICTS: Point[] = [
  { lead: 'Which company owns the Blueway?', text: 'The Coastal Blueway proposal says Bond Water Sports will invest ₹2 crore. Paddling belongs to Bond Safari Paddle Sports, the company investors are funding. If the two companies run paddling on the same Alappuzha waters, they compete. Decide now that Blueway paddling sits in Bond Safari Paddle Sports, or set written terms between the two companies.' },
  { lead: 'Bid in the right company’s name.', text: 'Any DTPC or panchayat concession should be bid for by Bond Safari Paddle Sports, not Bond Water Sports. The Muziris licence is the precedent to avoid.' },
  { lead: 'KATPS recusal.', text: 'Jackson Peter sits on the KATPS Technical Committee. He should recuse himself in writing from registering this site, as for every Bond site.' },
  { lead: 'Political links.', text: 'The Blueway runs through the local MLA and the panchayats. Any jetty awarded to us should come through an open tender or a published process, so it cannot be seen as a favour.' },
]
export const SUMMARY_CAVEAT = 'All financial figures are Bond estimates for decision-making. They need validating with a demand count on site and DTPC’s actual terms.'

// 1. Why Alappuzha
export const WHY_INTRO: Point = { lead: 'Alappuzha is the centre of Kerala’s backwater tourism.' }
export const WHY_FACTS: Point[] = [
  { text: 'It is the houseboat capital of the state, on the southern arm of Vembanad Lake.' },
  { text: 'It borders Kuttanad, a below-sea-level landscape of paddy fields, canals and villages.' },
  { text: 'Punnamada Lake is the home of the Nehru Trophy Boat Race, and Alappuzha town has a heritage canal network.' },
  { text: 'Its coast includes Alappuzha beach and Marari, one of Kerala’s best-known premium beach-resort strips.' },
]
export const WHY_REASONS: Point[] = [
  { lead: 'It is the biggest backwater market.', text: 'It had 614,452 visitors in 2025 across the Alappuzha and Kuttanad destinations, more than Kumarakom’s 517,722. Counting the whole district, the figure is 932,918.' },
  { lead: 'Visitors are already on the water at sunrise.', text: 'Houseboat guests wake up on the lake, often moored near canal mouths, and that is the best time to paddle. No other Kerala destination offers a captive early-morning audience like this.' },
  { lead: 'Its canals are the product.', text: 'Kuttanad’s narrow canals (Kainakary, Pulinkunnu, Kavalam, Nedumudi) are too narrow for houseboats and too slow for motorboats. Kayaks and canoes are the natural way to see them, and foreign visitors already seek this out.' },
  { lead: 'Its events reach a national audience.', text: 'The Nehru Trophy (22 August 2026 was the 72nd edition) and the Champions Boat League put Punnamada on national television every year.' },
  { lead: 'It completes the Central cluster.', text: 'With Muziris (live), Kochi and Kumarakom, Alappuzha makes the Ernakulam hub the strongest of the four hubs.' },
]
export const HUB_FIT: Table = {
  caption: 'How it fits the hub',
  head: ['Factor', 'Position'],
  rows: [
    ['Hub', 'Ernakulam (Kochi–Vypin base)'],
    ['Distance', 'Alappuzha town is about 55 km from Kochi (about 1.5 hours by NH 66). Marari is about 40 km (about 1 hour).'],
    ['What the hub provides', 'Spare kit, repairs, Academy-trained guides, the safety officer, shop stock, central booking and marketing'],
    ['What the spoke needs locally', 'Storage, a launch point, a kiosk, a site lead and 5–6 guides; spare craft and its own rescue boat'],
    ['Shared with Kumarakom', 'Both are on Vembanad, so they can share guides and spare kit in peak season. Water hyacinth and wetland rules are the same risks for both.'],
  ],
}
export const SEASONS: Table = {
  caption: 'Seasons',
  head: ['Period', 'Conditions', 'What it means for paddling'],
  rows: [
    ['September–November', 'Post-monsoon; canals full and green', 'Strong, especially for domestic visitors'],
    ['December–February', 'Peak season for foreign and domestic visitors; best weather', 'Peak demand; sunrise and canal tours sell out'],
    ['March–May', 'Hot; Indian school holidays in April–May', 'Steady early in the morning and late in the afternoon'],
    ['June–August', 'Monsoon; strong currents after heavy rain; boat races in August', 'Low demand and weather closures; race-season events'],
  ],
}
export const HYACINTH_NOTE = 'Water hyacinth is the main local operating risk. It can block canals for weeks after the monsoon. Section 9 covers how to manage it.'

// 2. Demand
export const VISITORS: Table = {
  caption: 'Who comes to Alappuzha (Kerala Tourism Statistics 2025)',
  head: ['Destination', 'Domestic', 'Foreign', 'Total'],
  rows: [
    ['Alappuzha (town, beach, Punnamada)', '550,843 (state rank #10)', '45,566 (#7)', '596,409'],
    ['Kuttanad', 'Not in the top 20 (included under “Others”)', '18,043 (#11)', '18,043+'],
    ['Market used in this study', '', '', '614,452'],
    ['Alappuzha district total', '864,288', '68,630', '932,918'],
  ],
  numeric: [3],
  highlight: [2],
}
export const MARKET_LARGER: Point = { lead: 'The market is probably larger than these figures.', text: 'They count visitors staying in registered accommodation. They leave out:' }
export const MARKET_LEFT_OUT: Point[] = [
  { text: 'day-trippers from Kochi on houseboat day cruises, a very large group in Alappuzha;' },
  { text: 'guests on the roughly 400 unlicensed houseboats;' },
  { text: 'domestic visitors to Kuttanad, whom the statistics do not list separately.' },
]
export const MARKET_CAUTIOUS = 'Using 614,452 is therefore cautious.'
export const HOUSEBOAT_CHECK: Point = { lead: 'Cross-check: houseboat guests.', text: 'The Kerala Houseboat Owners Federation estimates about 800 houseboats on Vembanad. Suppose each is occupied about 250 nights a year with an average of 2.5 guests. That is about 500,000 guest-nights. If 2% of them took a sunrise paddle, that alone would be about 10,000 paddlers. These are our assumptions, not published figures.' }
export const CAPTURE_INTRO: Point = { lead: 'From visitors to paddlers.', text: 'We use 1.5% capture as the base case, the same rate as the investor model. It is lower than Kumarakom’s 2% because Alappuzha already has several kayak operators.' }
export const CAPTURE: Table = {
  caption: 'Paddlers at each capture rate',
  head: ['Capture rate', 'Paddlers a year', 'A day on average (255 operating days)', 'Peak day (about 2×)', 'Share of practical capacity (20 craft)'],
  rows: [
    ['0.75%', '4,608', '18', '36', '36%'],
    ['1.0% (cautious)', '6,145', '24', '48', '48%'],
    ['1.5% (base)', '9,217', '36', '72', '72%'],
    ['2.0%', '12,289', '48', '96', '96%'],
    ['2.5% (strong)', '15,361', '60', '120', 'Needs 24+ craft'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [2],
}
export const CAPACITY = 'The investor model sets practical capacity at about 12,850 paddlers a year for 20 craft. That assumes four sessions a day, 1.4 people per craft, 255 days and 45% average use. The base case fits within it. Above 2% capture, the spoke would need more craft or a second launch point, which is the Phase 2 Marari site.'
export const SPEND_INTRO: Point = { lead: 'What each paddler spends.', text: 'We use an average of ₹1,100, made up of:' }
export const SPEND_BLEND: Point[] = [
  { text: '2-hour sunrise and sunset kayak tours at ₹900–1,100;' },
  { text: 'half-day Kuttanad canal tours with breakfast at ₹1,800–2,200, mainly bought by foreign visitors;' },
  { text: 'SUP lessons at ₹1,200;' },
  { text: 'family and group sessions at a discount.' },
]
export const SPEND_B2B_INTRO = 'On top of that, about 15% comes from B2B:'
export const SPEND_B2B: Point[] = [{ text: 'houseboat operators;' }, { text: 'corporate groups from Kochi;' }, { text: 'school trips;' }, { text: 'Paddle UK tasters;' }, { text: 'the shop.' }]
export const BASE_REVENUE: Point = { lead: 'Base-case revenue (one spoke):', text: '9,217 paddlers × ₹1,100 × 1.15 ≈ ₹1.17 Cr a year once the site is mature. This matches the investor model.' }
export const DEMAND_CHECK_INTRO: Point = { lead: 'What we still need to check.', text: 'Before committing capital, run a two-week count on site in December or January:' }
export const DEMAND_CHECK: Point[] = [
  { text: 'count paddlers at existing operators near Punnamada and the Zero Jetty;' },
  { text: 'survey houseboat guests at the main moorings;' },
  { text: 'interview 10 houseboat operators about sending guests to us on commission.' },
]
export const DEMAND_CHECK_NOTE = 'The count confirms or corrects the capture rate. The interviews test whether houseboats can be our main sales channel.'

// 3. Who we sell to
export const SEGMENTS_INTRO = 'Seven groups, ranked by how much they matter in the first two years.'
export const SEGMENTS: Table = {
  caption: 'Who we sell to',
  head: ['#', 'Segment', 'Who they are', 'What they want', 'Our product', 'How we reach them', 'Share of paddlers (est.)'],
  rows: [
    ['1', 'Houseboat guests', 'Domestic families and couples, and foreign couples, on overnight cruises', 'Something to do at sunrise before check-out; a closer look at village canals', '2-hour sunrise canal paddle from or near the mooring; pick-up by our rescue boat', 'Commission (10–15%) to houseboat operators and booking agents; QR codes on board', '30%'],
    ['2', 'Foreign independent travellers', 'Europeans, Americans and Australians, often backpackers or slow travellers, 2–4 nights in town', 'An authentic Kuttanad canal day; safety; English-speaking guides', 'Half-day canal tour with breakfast in a village home; full-day Kuttanad paddle', 'Google, Tripadvisor, GetYourGuide, Viator, homestay partners', '20%'],
    ['3', 'Domestic weekend groups', 'Young professionals and friend groups from Kochi, Bengaluru, Chennai and Coimbatore', 'Fun, photos, something new', 'Sunset SUP, kayak races, “paddle and picnic”', 'Instagram, Reels, influencer trips, the Bond Membership pass', '20%'],
    ['4', 'Families on holiday', 'Domestic families in April–May and October–December', 'Safe, short, child-friendly', '1.5-hour family session in double kayaks and canoes', 'Hotels, homestays, the website', '12%'],
    ['5', 'Premium resort guests', 'Guests at lake resorts on Punnamada and beach resorts at Marari', 'Private, well-run experiences', 'Private guided paddles; bird and photography paddles', 'Resorts sell on commission (10–15%); nothing stored at the resort', '8%'],
    ['6', 'Corporate and MICE groups', 'Kochi IT parks and companies holding offsites in Alappuzha resorts', 'Team-building with a story', 'Team canoe races on the race course; paddle-and-lunch packages', 'Direct B2B sales from the hub; event planners', '5% (but 15% of revenue)'],
    ['7', 'Schools, colleges and local youth', 'Students from Alappuzha, Kottayam and Kochi; local young people', 'Water safety, skills, careers', 'Paddle UK Start and Discover; school paddle tier; Academy guide pathway', 'Schools and colleges; the panchayats; the Blueway skills programme', '5%'],
  ],
}
export const POSITION: Point = { lead: 'Our position.', text: 'Kerala’s backwaters, paddled properly. Every trip has a certified guide, good kit and a safety boat, and we offer SUP and courses that no one else in Alappuzha does. The aim is to be the best-rated paddle operator in Alappuzha on Google and Tripadvisor within 12 months, because that is how independent travellers choose.' }
export const SEGMENTS_AVOID: Point[] = [
  { lead: 'Day-trippers on the busy main houseboat routes.', text: 'They have little time, and mixing beginners with houseboat traffic is a safety risk.' },
  { lead: 'Sea kayaking off Alappuzha beach.', text: 'The surf is unsuitable for beginners. We can offer sea kayaking later, only to Academy-trained paddlers.' },
]

// 4. Competition and pricing
export const OPERATORS: Table = {
  caption: 'Who already sells paddling in Alappuzha (published prices, checked November 2026)',
  head: ['Operator or channel', 'What they offer', 'Published price', 'Notes'],
  rows: [
    ['Universal Adventures (by the Zero Jetty iron bridge)', '2.5–3 hour kayaking', '₹649–899 per person (the page also says ₹750)', 'Low-price, online-led; prices are inconsistent'],
    ['Sreestours', 'Sunrise and sunset tours on Punnamada lake (about 2.5 hours); 4-hour canal tours; village tours', '₹500–1,500 an hour by kayak type (the booking widget says “from ₹5,000”)', 'Launches from the lakeside; reaching the canals takes about an hour'],
    ['Tour aggregators (Holidify, Expedia, Pelago, Viator)', 'Village kayaking tours, sunrise tours, kayak plus shikara with a meal', 'About ₹800–1,500 per person; longer tours priced higher', 'Several small local operators sell through these sites'],
    ['International packaged trips (e.g. Responsible Travel)', 'Multi-day Kuttanad kayaking with homestays', 'About US$430 for a multi-day trip', 'Shows that foreign visitors will pay for a well-run multi-day product'],
    ['Shikara and country-boat operators', 'Motor shikara and punted canoe rides', 'Often ₹300–800 an hour per boat', 'Sightseeing, not paddling, but the same customers'],
    ['DTPC Alappuzha beach (from February 2025)', 'Speed boats, with rafts and beach vehicles planned; water bikes at the Kainakary Vattakayal terminal', 'Not published', 'Motorised; inspected by KATPS. Shows DTPC is actively bringing in operators'],
  ],
}
export const COMPETITION_CONCLUSIONS: Point[] = [
  { lead: 'The market price for a 2–3 hour tour is ₹650–1,500.', text: 'Our ₹900–1,100 sits in the middle. We earn the difference through certified guides, better boats, a rescue boat and English-speaking guides.' },
  { lead: 'The premium is in the half-day canal tour.', text: 'Foreign visitors pay ₹1,800–2,500 for a well-run half day with breakfast. Few local operators run it well, and that is where we should aim to lead.' },
  { lead: 'No one sells SUP, Paddle UK courses or guaranteed safety standards.', text: 'That is our clearest difference.' },
]
export const PRICE_LIST: Table = {
  caption: 'Proposed price list for Alappuzha (inclusive of GST; check against the 2027 rate card)',
  head: ['Product', 'Duration', 'Price'],
  rows: [
    ['Sunrise canal paddle (single kayak)', '2 hours', '₹1,000'],
    ['Sunrise canal paddle (double kayak, per person)', '2 hours', '₹800'],
    ['Half-day Kuttanad canal tour with village breakfast', '4 hours', '₹1,900'],
    ['Full-day Kuttanad paddle with lunch', '7 hours', '₹3,500'],
    ['Sunset SUP or kayak on Punnamada', '1.5 hours', '₹900'],
    ['SUP lesson for beginners', '1.5 hours', '₹1,200'],
    ['Family session, 2 adults and 2 children', '1.5 hours', '₹2,600'],
    ['Houseboat sunrise add-on (sold through the houseboat)', '2 hours', '₹1,000 list; the houseboat earns commission'],
    ['Paddle UK Discover / Start Paddling', 'Half day', 'From the rate card'],
  ],
}
export const PRICE_NOTE = 'At the expected product mix, this gives an average of about ₹1,100 per paddler.'

// 5. Possible locations
export const LOCATIONS_INTRO = 'We looked at ten possible launch points. Each is scored from 1 (poor) to 5 (strong) on seven criteria. A high competition score means little competition. These are desk scores, to be checked on site visits.'
export const LOCATIONS: Table = {
  caption: 'Possible locations, scored from 1 to 5 on seven criteria',
  head: ['#', 'Location', 'Footfall', 'Water and route', 'Safety (distance from traffic)', 'Road access', 'Site available', 'Competition', 'Permits', 'Total (out of 35)', 'Role'],
  rows: [
    ['1', 'Pallathuruthy–Chungam canal edge (houseboat moorings south-east of town)', '4', '4', '3', '5', '3', '3', '4', '26', 'Base for Model B'],
    ['2', 'Deep Kuttanad canals: Nedumudi, Pulinkunnu, Kavalam', '2', '5', '5', '2', '3', '4', '4', '25', 'Tour routes, reached from the base'],
    ['3', 'Alappuzha heritage town canals (Vadai, Commercial)', '4', '2', '4', '5', '3', '5', '2', '25', 'Urban heritage paddle; explore with Muziris Projects Ltd'],
    ['4', 'Kainakary–Vattakayal DTPC terminal', '3', '4', '3', '3', '4', '4', '3', '24', 'Base for Model C if DTPC offers a paddle concession'],
    ['5', 'Marari: Chethy Pozhi to Mararikulam South Pozhi (Blueway Phase I)', '3', '3', '4', '4', '3', '5', '2', '24', 'Phase 2 satellite'],
    ['6', 'Punnamada: Finishing Point and the DTPC houseboat terminal', '5', '3', '2', '5', '3', '2', '3', '23', 'Sales point; sunset SUP in a buoyed zone only'],
    ['7', 'Muhamma–Pathiramanal island (panchayat jetty)', '2', '3', '2', '4', '4', '5', '3', '23', 'Model D satellite for experienced paddlers'],
    ['8', 'Thanneermukkom bund', '2', '3', '3', '4', '3', '5', '3', '23', 'Later option'],
    ['9', 'Thottappally spillway and pozhi', '1', '3', '3', '4', '3', '5', '3', '22', 'Not a priority'],
    ['10', 'Alappuzha beach (sea)', '5', '1', '1', '5', '3', '3', '3', '21', 'Not for beginners; later sea-kayak courses only'],
  ],
  numeric: [2, 3, 4, 5, 6, 7, 8, 9],
  highlight: [0, 3, 4],
  wrapHead: true,
}
export const LOCATION_POINTS: Point[] = [
  { lead: 'The best base is on the canal edge, not the open lake.', sub: ['Pallathuruthy–Chungam is close to where houseboats moor overnight, so guests can walk or be ferried to us at sunrise.', 'It has road access from Alappuzha town.', 'It leads straight into the narrow canals, where houseboats cannot go.'] },
  { lead: 'Punnamada is for selling, not paddling.', text: 'It has the most people but also the most houseboat traffic. Use it for a kiosk and signs, and for sunset SUP only inside a marked, buoyed area.' },
  { lead: 'Kainakary is the DTPC option.', text: 'DTPC already plans water bikes at the Vattakayal terminal. A paddle concession there works only if motorised and paddle zones are kept apart.' },
  { lead: 'Marari fits the Blueway and the premium resorts,', text: 'but its canals must be cleared first. That makes it Phase 2.' },
  { lead: 'The heritage canals are a long shot worth one meeting.', sub: ['Muziris Projects Ltd runs the Alappuzha Heritage Project, which includes rejuvenating the town canals.', 'Bond already operates the Muziris concession for the same body.', 'The project has largely stalled, and water quality is poor. Raise it with Muziris Projects Ltd, but do not count on it.'] },
]

// 6. The four operating models
export const MODELS: { title: string; how: string; list?: Point[]; closing?: string; points: Point[] }[] = [
  {
    title: 'A. Kit and guides placed at partner resorts',
    how: 'We place 4–6 craft and a guide at each of five resorts: three at Marari and two on the Punnamada lake shore. The resort sells sessions to its guests and keeps about 25% of the revenue.',
    points: [
      { lead: 'For:', text: 'guests are already there; no lease is needed; it builds premium partnerships.' },
      { lead: 'Against:', sub: ['It reaches only resort guests and misses houseboats, which are Alappuzha’s biggest segment.', 'Five sets of kit and five lone guides is the least efficient set-up and the hardest to keep safe.', 'Any resort can end the arrangement.'] },
      { lead: 'Verdict:', text: 'the weakest model in Alappuzha. Use resorts as sales partners only.' },
    ],
  },
  {
    title: 'B. Our own standalone canal-edge spoke',
    how: 'Bond Safari Paddle Sports leases a waterfront plot at Pallathuruthy–Chungam, with a pontoon, kiosk, storage and changing area. It sells to everyone:',
    list: [{ text: 'houseboat operators, on 10–15% commission;' }, { text: 'walk-ins and online bookings;' }, { text: 'resorts and homestays;' }, { text: 'groups.' }],
    closing: 'Tours go into the Kuttanad canals.',
    points: [
      { lead: 'For:', text: 'the whole market; full control of brand, safety and data; a base for the Academy; kit and staff in one place.' },
      { lead: 'Against:', text: 'we must find and lease a site and get the permits ourselves, and we carry the lease (about ₹7 lakh a year).' },
      { lead: 'Verdict:', text: 'the strongest model we can control, and the default plan.' },
    ],
  },
  {
    title: 'C. Concession at a DTPC-operated jetty',
    how: 'DTPC Alappuzha runs public terminals, including the houseboat terminal area near Punnamada and the Kainakary–Vattakayal terminal, where it plans water sports. DTPC has been bringing in private operators for beach adventure activities since February 2025. We would bid for a paddle concession:',
    list: [{ text: 'we bring the kit, guides and safety;' }, { text: 'DTPC provides the jetty, visibility and permits;' }, { text: 'we pay DTPC a revenue share (about 20% assumed, similar to Muziris).' }],
    points: [
      { lead: 'For:', sub: ['Lower capex (₹40 lakh) because the jetty exists.', 'A government-backed site with more footfall (modelled at 2% capture).', 'Faster permits.'] },
      { lead: 'Against:', sub: ['Tenure depends on DTPC’s tender terms, which are often 1–3 years.', 'DTPC may cap our prices.', 'We may share the jetty with jet-ski and speed-boat operators, which is a safety and brand risk.'] },
      { lead: 'Verdict:', text: 'the best financial result if the footfall and terms are right. Bid on strict conditions (Section 8).' },
    ],
  },
  {
    title: 'D. Panchayat-owned jetty on rent',
    how: 'We rent a grama panchayat jetty, for example at Muhamma (for Pathiramanal), Thanneermukkom or Mararikulam, for a fixed rent of about ₹3 lakh a year.',
    points: [
      { lead: 'For:', text: 'low rent, good relations with the community, and a natural fit with the Blueway’s aims of skills and jobs for young people.' },
      { lead: 'Against:', text: 'low footfall (1% capture); open-lake water at Muhamma is not for beginners; tenure is often short.' },
      { lead: 'Verdict:', text: 'a good low-cost satellite once the main spoke is proven. Not the anchor.' },
    ],
  },
]
export const COMPARISON: Table = {
  caption: 'Comparison',
  head: ['Criterion', 'Weight', 'A. Resorts', 'B. Standalone', 'C. DTPC jetty', 'D. Panchayat jetty'],
  rows: [
    ['Value created (5-year value at 25%)', '25%', '1', '4', '5', '2'],
    ['Capital needed', '10%', '3', '3', '4', '4'],
    ['Margin and resilience to lower demand', '15%', '1', '4', '3', '4'],
    ['Control of brand, quality and safety', '15%', '2', '5', '3', '4'],
    ['Security of tenure', '10%', '2', '3', '3', '2'],
    ['Speed to open and permit risk', '10%', '4', '2', '4', '3'],
    ['Footfall and visibility', '10%', '3', '3', '5', '2'],
    ['Environmental and reputational risk', '5%', '4', '4', '3', '4'],
    ['Weighted score', '100%', '2.1', '3.7', '3.9', '3.0'],
  ],
  numeric: [1, 2, 3, 4, 5],
  highlight: [8],
}
export const COMPARISON_RESULT: Point = { lead: 'Result.', text: 'C and B are close, and both are far ahead of A.' }
export const COMPARISON_POINTS: Point[] = [
  { text: 'C scores slightly higher, but only because of assumptions we cannot check until DTPC publishes terms: higher footfall, a 20% share, adequate tenure.' },
  { text: 'B is the model we control.' },
  { text: 'The plan is therefore to bid for C if DTPC offers it on our conditions, and otherwise open B. Do not wait for DTPC beyond a set deadline (Section 11).' },
  { text: 'Add Marari (Phase 2) and a panchayat satellite (D) once the main spoke is proven.' },
]

// 7. Financial assessment
export const FINANCE_INTRO = 'All figures are in ₹ lakh, before tax. They are Bond estimates. Years 1 and 2 run at 60% and 85% of mature volume, and years 3–5 at 100%, with no growth after year 3. This is more cautious than the investor model, which assumes 8% annual volume growth once a site matures. Values are discounted at 25%, the early-stage rate in our valuation report.'
export const ASSUMPTIONS: Table = {
  caption: 'Key assumptions',
  head: ['Assumption', 'A. Resorts', 'B. Standalone', 'C. DTPC jetty', 'D. Panchayat jetty'],
  rows: [
    ['Market base', '5 resorts × 700 guests', '614,452 visitors', '614,452 visitors', '614,452 visitors'],
    ['Capture', '—', '1.5%', '2.0% (more footfall at a public jetty)', '1.0%'],
    ['Paddlers a year (mature)', '3,500', '9,217', '12,289', '6,145'],
    ['Average ticket', '₹1,800 (resort premium)', '₹1,100', '₹1,000 (DTPC may cap prices)', '₹1,000'],
    ['B2B and courses on top', '—', '+15%', '+15%', '+15%'],
    ['Revenue share or rent', '25% to resorts', 'Lease ₹7 lakh (in fixed costs)', '20% to DTPC', 'Rent ₹3 lakh (in fixed costs)'],
    ['Variable costs', '10%', '19%', '19%', '19%'],
    ['Fixed costs', '24.5', '34.3 (staff 18.6, site 8.7, lease 7.0)', '23.6 (staff 18.6, site 5.0)', '21.0 (staff 12.0, site 6.0, rent 3.0)'],
    ['Capex', '55', '47', '40', '40'],
  ],
}
export const CAPEX: Table = {
  caption: 'What the capex buys',
  head: ['Item', 'A', 'B', 'C', 'D'],
  rows: [
    ['Craft: kayaks, canoes and SUPs, with paddles and PFDs', '45 (5 sets)', '27 (20 craft)', '27', '27'],
    ['Rescue boat and safety kit', '6', '6', '6', '6'],
    ['Pontoon, kiosk, storage, branding', '4', '14', '7 (kiosk and branding only)', '7'],
    ['Total', '55', '47', '40', '40'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [3],
}
export const MATURE_YEAR: Table = {
  caption: 'Mature year (year 3 onward)',
  head: ['', 'A. Resorts', 'B. Standalone', 'C. DTPC jetty', 'D. Panchayat'],
  rows: [
    ['Revenue', '63.0', '116.6', '141.3', '70.7'],
    ['Less revenue share', '(15.8)', '—', '(28.3)', '—'],
    ['Less variable costs', '(6.3)', '(22.2)', '(26.8)', '(13.4)'],
    ['Less fixed costs', '(24.5)', '(34.3)', '(23.6)', '(21.0)'],
    ['EBITDA', '16.5', '60.1', '62.6', '36.2'],
    ['EBITDA margin', '26%', '52%', '44%', '51%'],
    ['Payback', '4.7 years', '1.5 years', '1.2 years', '2.0 years'],
    ['5-year cumulative EBITDA, after capex', '4.9', '201.7', '225.6', '109.6'],
    ['5-year value at 25%', '(27.8)', '75.4', '92.5', '33.6'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [4, 8],
}
export const FIVE_YEAR_PATH: Table = {
  caption: 'The five-year path for Model B',
  head: ['Year', '1', '2', '3', '4', '5'],
  rows: [
    ['Volume vs mature', '60%', '85%', '100%', '100%', '100%'],
    ['Revenue', '70.0', '99.1', '116.6', '116.6', '116.6'],
    ['EBITDA', '22.4', '46.0', '60.1', '60.1', '60.1'],
    ['Cumulative cash after ₹47 lakh capex', '(24.6)', '21.4', '81.5', '141.6', '201.7'],
  ],
  numeric: [1, 2, 3, 4, 5],
}
export const SENSITIVITY: Table = {
  caption: 'How sensitive is Model B?',
  head: ['Scenario', 'Mature revenue', 'Mature EBITDA', '5-year value', 'Payback'],
  rows: [
    ['Base: 1.5% capture, ₹1,100', '116.6', '60.1', '75.4', '1.5 years'],
    ['1.5% capture, ₹900', '95.4', '43.0', '36.4', '2.1 years'],
    ['1.0% capture, ₹1,100', '77.7', '28.7', '3.9', '2.8 years'],
    ['1.0% capture, ₹900 (downside)', '63.6', '17.2', '(22.1)', '4.4 years'],
    ['0.75% capture, ₹900 (severe)', '47.7', '4.3', '(51.4)', 'Not within 5 years'],
    ['2.0% capture, ₹1,100', '155.5', '91.6', '147.0', '1.1 years'],
    ['2.0% capture, ₹1,300', '183.7', '114.5', '199.1', '0.9 years'],
    ['Fixed costs 20% higher', '116.6', '53.3', '57.0', '1.8 years'],
    ['Capex 25% higher', '116.6', '60.1', '63.7', '1.8 years'],
  ],
  numeric: [1, 2, 3, 4],
  highlight: [3],
}
export const SENSITIVITY_POINTS: Point[] = [
  { lead: 'Mature-year EBITDA breaks even at about 0.55% capture,', text: 'roughly a third of the base case.' },
  { lead: 'To create value over five years, Model B needs about 1% capture at ₹1,100.' },
  { lead: 'Capture is the key number again.', text: 'That is why the on-site count comes before the lease is signed.' },
]
export const DTPC_INTRO = 'Model C’s 5-year value (₹ lakh) by capture and DTPC revenue share. Model B is ₹75 lakh at 1.5% capture.'
export const DTPC_MATRIX: Table = {
  caption: 'When does the DTPC jetty beat our own site?',
  head: ['DTPC share →', '10%', '15%', '20%', '25%', '30%'],
  rows: [
    ['C at 1.5% capture', '68', '56', '44', '—', '—'],
    ['C at 1.75% capture', '—', '82', '68', '54', '40'],
    ['C at 2.0% capture', '125', '109', '93', '76', '60'],
  ],
  numeric: [1, 2, 3, 4, 5],
}
export const DTPC_MEANS: Point = { lead: 'What this means.', text: 'A DTPC jetty is better than our own site only if it brings clearly more footfall and the share stays reasonable:' }
export const DTPC_MEANS_POINTS: Point[] = [{ text: 'at about 2% capture, a share of up to about 25%;' }, { text: 'at 1.75% capture, up to about 15%.' }]
export const DTPC_CLOSING = 'At the same footfall as our own site, DTPC would have to take almost nothing for C to win. So the bid must come with evidence of footfall at the jetty, such as DTPC’s own counts of terminal visitors.'
export const MARARI = 'About 4,000 paddlers a year at an average of ₹1,400, sold mainly through the beach resorts, plus 15% B2B. That gives revenue of about ₹64 lakh, EBITDA of about ₹35 lakh (55%), capex of about ₹30 lakh and a 5-year value of about ₹44 lakh. All of this depends on the Blueway canals being cleared and on which company owns the Blueway (Section 8).'

// 8. The Coastal Blueway, and terms for DTPC and panchayat deals
export const BLUEWAY_INTRO = 'Bond’s Alappuzha Coastal Blueway proposal, submitted to the MLA A. D. Thomas, covers a connected network of coastal canals, estuaries and pozhis. Phase I runs from Chethy Pozhi to Mararikulam South Pozhi. Under the proposal:'
export const BLUEWAY_TERMS: Point[] = [
  { text: 'the panchayats clean and, where needed, widen the waterways;' },
  { text: 'ASAP’s training partner trains local young people;' },
  { text: 'Bond Water Sports invests ₹2 crore and employs local youth in paddling and swimming training.' },
]
export const BLUEWAY_OVERLAP: Point = { lead: 'The overlap.', text: 'The Blueway and this spoke would both sell paddling to visitors in Alappuzha district. The Blueway would be run by Bond Water Sports; this spoke by Bond Safari Paddle Sports. That creates three problems:' }
export const BLUEWAY_PROBLEMS: Point[] = [
  { lead: 'The companies would compete.', text: 'Two Bond companies would sell the same activity to the same visitors, with no rule on who gets which customer or which waters.' },
  { lead: 'Investors would object.', text: 'Investors in Bond Safari Paddle Sports have been told that this company owns paddling in Bond Group. A ₹2 crore paddling investment in a sister company contradicts that and would come up in due diligence.' },
  { lead: 'The managing director sits on both sides.', text: 'Jackson Peter controls both companies and would set any terms between them.' },
]
export const BLUEWAY_FIX: Point[] = [
  { lead: 'Option 1, preferred.', text: 'Vest the Blueway’s paddle operations and the ₹2 crore investment in Bond Safari Paddle Sports. Bond Water Sports keeps swimming and water-safety training, which fit its scuba and water-sports business. Update the Blueway proposal to the MLA to name the right company before the panchayats act on it.' },
  { lead: 'Option 2.', text: 'If Bond Water Sports must remain the Blueway’s investor for other reasons, sign a written agreement first:', sub: ['Bond Safari Paddle Sports operates all paddling on the Blueway under a licence, or has a right of first refusal;', 'revenue and costs are split on arm’s-length terms;', 'the terms are approved by the investor director.'] },
]
export const BLUEWAY_CLOSING = 'Until this is settled, the Phase 2 Marari satellite should not be presented to investors as part of this company’s plan.'
export const DTPC_TERMS: Table = {
  caption: 'What we need in a DTPC concession',
  head: ['Term', 'Our position', 'Walk away if'],
  rows: [
    ['Bidder', 'Bond Safari Paddle Sports Pvt Ltd, in its own name', 'DTPC requires a different Bond company'],
    ['Revenue share', '20% or less, measured on paddle revenue after GST; courses and shop sales excluded', 'More than 25%, or a high minimum guarantee in year 1'],
    ['Tenure', '5 years or more, with a renewal option; at least 3 years firm', 'Under 3 years'],
    ['Exclusivity', 'Sole paddle-sports operator at the terminal', 'Another paddle operator at the same jetty'],
    ['Separation from motorised craft', 'A buoyed paddle zone, separate launch times and lanes from jet skis and speed boats', 'Shared launch with motorised craft'],
    ['Pricing', 'Freedom to set prices, or a DTPC rate card that allows ₹900 or more for a 2-hour tour', 'A price cap below ₹800'],
    ['Facilities', 'DTPC provides the jetty, toilets, parking and hyacinth clearing', 'All maintenance falls on the operator'],
    ['Data and branding', 'Our booking system; Bond branding alongside DTPC’s', 'Bookings only through a DTPC system with no access to customer data'],
    ['Exit', '90 days’ notice if permits are withdrawn; our equipment stays ours', 'Equipment passes to DTPC'],
  ],
}
export const PANCHAYAT_TERMS: Point[] = [
  { lead: 'A transparent award.', text: 'An open call for operators or a published panchayat resolution, not a private arrangement. The Blueway’s link to the MLA makes this especially important.' },
  { lead: 'Rent.', text: 'A fixed rent of ₹3 lakh a year or less, or 10% of revenue, whichever the panchayat prefers.' },
  { lead: 'Tenure.', text: 'At least 3 years, with a renewal option.' },
  { lead: 'Commitment to local youth.', text: 'Employment and training for local young people, which fits the Blueway aims and is a strength in any panchayat decision.' },
]
export const DTPC_QUESTIONS: Point[] = [
  { text: 'Does DTPC plan to award a paddle-sports concession at the Kainakary–Vattakayal terminal, the houseboat terminal or Finishing Point? On what timeline?' },
  { text: 'What are the expected tender terms: share, minimum guarantee, tenure, price controls?' },
  { text: 'What visitor counts does DTPC have for each terminal?' },
  { text: 'Which motorised operators are already licensed at each terminal, and where do they launch?' },
  { text: 'Who maintains the jetty, and who clears the hyacinth?' },
]

// 9. Permits, environment and safety
export const PERMITS_INTRO = 'The Alappuzha backwaters are part of the Vembanad–Kol wetland, a Ramsar site. Regulators are tightening control of the lake:'
export const PERMITS_TIGHTENING: Point[] = [
  { text: 'about half of Alappuzha’s estimated 800 houseboats were reported to be unlicensed in 2024;' },
  { text: 'the State Wetland Authority ordered a crackdown on illegal houseboats in July 2025;' },
  { text: 'inspections increased after the 2023 Tanur boat tragedy.' },
]
export const PERMITS_CLOSING = 'Paddling is the lowest-impact way to use these waters, and that is our strongest argument with regulators. But we should apply as if every detail will be checked.'
export const PERMITS: Table = {
  caption: 'Permits checklist (to confirm with each authority)',
  head: ['Permit or registration', 'Authority', 'Model B', 'Model C', 'Model D'],
  rows: [
    ['Adventure tourism operator registration', 'KATPS (inspects craft and facilities before opening, as at Alappuzha beach in 2025)', 'Required', 'Required', 'Required'],
    ['Trade licence and site permission', 'Grama panchayat or Alappuzha municipality', 'Required', 'Possibly DTPC’s; confirm', 'Part of the panchayat agreement'],
    ['Craft and rescue-boat registration', 'Kerala Maritime Board / port department', 'Rescue boat; check whether non-motorised craft need it', 'Same', 'Same'],
    ['Waterfront structures (pontoon, kiosk)', 'Wetland Authority; Coastal Zone Management Authority where relevant', 'Required', 'Jetty exists', 'Jetty exists'],
    ['Concession or lease agreement', 'DTPC Alappuzha / grama panchayat / private landowner', 'Private lease', 'DTPC concession', 'Panchayat agreement'],
    ['Insurance: public liability and personal accident', 'Insurer', 'Required', 'Required', 'Required'],
    ['GST registration for the place of business', 'GST', 'Required', 'Required', 'Required'],
  ],
}
export const KATPS_CONFLICT: Point = { lead: 'Conflict to manage.', text: 'Jackson Peter sits on the KATPS Technical Committee. He should recuse himself in writing from this site’s registration and inspection, and the recusal should be recorded with KATPS.' }
export const ENVIRONMENT: Point[] = [
  { lead: 'Paddle only.', text: 'No motorised activity at our sites, except the rescue boat.' },
  { lead: 'Zero waste.', text: 'No single-use plastic on site, and “paddle and pick” litter collection on every tour. Report our monthly litter totals to the panchayat.' },
  { lead: 'Hyacinth plan.', text: 'At least two routes from each base. Fund or organise a local clearing team with the panchayat, possibly through Planet Ocean Foundation as CSR.' },
  { lead: 'Respect for villages.', text: 'Agree routes with villagers and paddy farmers. Keep noise down and photograph people only with consent. Village breakfasts are bought from local households at fair prices.' },
  { lead: 'Local hiring.', text: 'At least 75% of guides from Alappuzha and Kuttanad, trained through the Academy. This also delivers the Blueway’s aims of skills and jobs for young people.' },
]
export const SAFETY: Table = {
  caption: 'Safety standard',
  head: ['Area', 'Standard'],
  rows: [
    ['Guides', 'Paddle UK-qualified, at least Paddlesport Leader or SUP Instructor; first aid and rescue trained'],
    ['Ratio', '1:6 for beginners; 1:8 for experienced guests; 1:4 for children'],
    ['Equipment', 'A PFD worn by every guest at all times; whistles; tow lines; spare paddles'],
    ['Rescue cover', 'A motorised rescue boat on standby for every group'],
    ['Traffic', 'No beginner sessions on the main houseboat routes of Punnamada or Vembanad; use canals or buoyed zones; high-visibility vests; cross open water only in groups'],
    ['Weather and water', 'No sessions in thunderstorms, after dark, or after heavy rain when currents are strong (June–September); daily water and hyacinth check'],
    ['Records', 'Risk assessment for each route; daily log; incident reporting; monthly audit by the hub safety officer'],
  ],
}

// 10. Risks
export const RISK_REGISTER: Table = {
  caption: 'Risks',
  head: ['#', 'Risk', 'Likelihood', 'Impact', 'How we manage it'],
  rows: [
    ['1', 'Demand below plan (capture under 1%)', 'Medium', 'High', 'Two-week count on site before signing; buy 12 craft first and 8 more after the first peak season; kit can move to another Ernakulam spoke'],
    ['2', 'Price pressure from low-cost operators (₹650 tours)', 'High', 'Medium', 'Do not compete on the 2-hour tour alone; lead with the half-day canal tour, SUP and courses; earn the top rating on Google and Tripadvisor'],
    ['3', 'Houseboat operators do not send guests (or want more than 15%)', 'Medium', 'High', 'Sign 20+ houseboat partners before opening; tiered commission; pick-up from the boat; check during the on-site count'],
    ['4', 'Bond Water Sports and Bond Safari Paddle Sports both run paddling (the Blueway)', 'Certain unless resolved', 'High', 'Board decision before launch (Section 8); investor director approves any inter-company terms'],
    ['5', 'DTPC terms are poor or delayed', 'High', 'Medium', 'Set a deadline (end of February 2027); fall back to Model B; never depend on a single tender'],
    ['6', 'Collision with houseboats or motor craft', 'Low', 'Very high', 'No beginners on the main routes; buoyed zones; separate from jet skis; rescue boat; high-visibility vests'],
    ['7', 'Water hyacinth blocks the canals', 'High (seasonal)', 'Medium', 'Two routes from each base; clearing with the panchayat; flexible tour design'],
    ['8', 'Monsoon floods (as in 2018)', 'Medium', 'Medium', 'Planned closure in the worst weeks; kit stored on high ground; insurance; Academy training in the low season'],
    ['9', 'Wetland rules tighten', 'Medium', 'Medium', 'Paddle only; environmental commitments; early meeting with the Wetland Authority'],
    ['10', 'Poor water quality in town canals and some Kuttanad canals', 'High', 'Low–Medium', 'Choose routes by water quality; wash-down facilities; heritage canals only after they are cleaned'],
    ['11', 'KATPS conflict (MD on the Technical Committee)', 'Certain', 'Medium', 'Written recusal recorded with KATPS'],
    ['12', 'Panchayat or MLA links seen as a favour', 'Medium', 'Medium', 'Award only through an open process; publish the terms; local hiring'],
    ['13', 'Hiring and keeping guides', 'Medium', 'Medium', 'Hire locally; Academy training; career pathway; shared guide pool with Kumarakom'],
    ['14', 'Unlicensed competitors and safety incidents elsewhere harm the reputation of all paddling', 'Medium', 'Medium', 'Visible safety standards; KATPS registration displayed; offer training to other operators through the Academy'],
  ],
}
export const RISK_NOTE: Point = { lead: 'The three risks that decide the case are 1, 3 and 4:', text: 'demand, the houseboat channel, and which company owns the Blueway. The first two are tested by the on-site count. The third needs a board decision.' }

// 11. Recommendation and launch plan
export const RECOMMENDATION: Point[] = [
  { lead: 'Open a Punnamada–Kuttanad spoke in FY28 under the Ernakulam hub.', sub: ['Bid for a DTPC jetty concession (Kainakary–Vattakayal or the Punnamada terminals) only on the terms in Section 8.', 'If there is no acceptable offer by 28 February 2027, open our own canal-edge site at Pallathuruthy–Chungam (Model B).'] },
  { lead: 'Make houseboats the main sales channel,', text: 'with resorts, homestays and online platforms alongside.' },
  { lead: 'Plan a Marari satellite for FY29,', text: 'tied to the Coastal Blueway. This depends on the canals being cleared and on the Blueway’s paddling sitting in Bond Safari Paddle Sports.' },
  { lead: 'Do not place kit at resorts.', text: 'Add a panchayat jetty satellite (Muhamma or Thanneermukkom) only after the main spoke meets its first-year targets.' },
  { lead: 'Before spending on kit, settle three things:', sub: ['the on-site demand count;', 'the houseboat partner interviews;', 'a board decision on which company owns the Blueway.'] },
]
export const LAUNCH_PLAN: Table = {
  caption: 'Launch plan',
  head: ['When', 'Step', 'Owner', 'Gate'],
  rows: [
    ['November 2026', 'Board decision on Blueway ownership; meet DTPC Alappuzha; site visits to Pallathuruthy–Chungam and Kainakary', 'MD; board', '—'],
    ['December 2026–January 2027', 'Two-week demand count with 10 houseboat interviews (same team and dates as the Kumarakom count)', 'Ernakulam hub manager', 'Gate 0: capture of 1% or more is credible; houseboat partners are willing'],
    ['By 28 February 2027', 'Sign a DTPC concession or a private lease; apply for KATPS (with MD recusal) and other permits', 'MD; safety officer', 'Gate 1: site and permits secured'],
    ['March 2027', 'Recruit a site lead and 5 local guides; Academy training; sign 20 houseboat partners', 'Hub manager; Academy', '—'],
    ['April–May 2027 (start of FY28)', 'Soft opening with 12 craft; sunrise and half-day tours', 'Site lead', '—'],
    ['June–August 2027', 'Monsoon: limited sessions; guide training; a “paddle the course” event around the Nehru Trophy', 'Site lead; marketing', '—'],
    ['September 2027', 'Full opening with 20 craft and SUP', 'Site lead', '—'],
    ['March 2028', 'Review the first full year; decide on Marari and a panchayat satellite', 'Board', 'Gate 2'],
  ],
}
export const KPIS: Table = {
  caption: 'KPIs and Gate 2 thresholds (FY28)',
  head: ['KPI', 'Target', 'Scale up if', 'Rethink if'],
  rows: [
    ['Paddlers', '5,530 (60% of mature)', '5,500 or more', 'Under 3,700'],
    ['Average spend (including B2B)', '₹1,265', '₹1,200 or more', 'Under ₹1,000'],
    ['EBITDA', '₹22 lakh', '₹20 lakh or more', 'Below zero'],
    ['Bookings from houseboats', '30%', '30% or more', 'Under 15%'],
    ['Share of half-day and longer tours', '20%', '20% or more', 'Under 10%'],
    ['Guest rating (Google, Tripadvisor)', '4.7', '4.6 or more', 'Under 4.3'],
    ['Safety', 'Zero reportable incidents', 'Zero', 'Any serious incident (immediate review)'],
    ['Guides from the local area', '75%', '75% or more', '—'],
  ],
}

// Sources
export const SOURCES: { title: string; url?: string; rest?: string }[] = [
  { title: 'Kerala Tourism Statistics 2025', url: 'https://www.keralatourism.org/tourismstatistics/tourists_statistics_202520260507114657.pdf', rest: ', Kerala Tourism: arrivals by district and destination.' },
  { title: 'Onmanorama: Kerala breaks tourism records in 2025', url: 'https://www.onmanorama.com/news/kerala/2026/02/16/kerala-tourism-2025-record-tourists.html', rest: '.' },
  { title: 'Sreestours: Kayaking in Alleppey', url: 'https://www.sreestours.com/kayaking-in-alleppey.html', rest: ': tours and tariff range.' },
  { title: 'Universal Adventures: Kayaking in Alappuzha', url: 'https://www.universaladventures.in/products/kayaking-in-alappuzha', rest: ': price and location.' },
  { title: 'Holidify: Kayaking in Alleppey', url: 'https://www.holidify.com/places/alleppey/kayaking-in-alleppey-sightseeing-1257450.html', rest: ': price ranges and seasons.' },
  { title: 'Responsible Travel: Kayaking in the Keralan backwaters', url: 'https://www.responsibletravel.com/holiday/4211/kayaking-in-the-keralan-backwaters', rest: ': multi-day product.' },
  { title: 'Onmanorama: Alappuzha to welcome adventure tourism (17 February 2025)', url: 'https://www.onmanorama.com/travel/kerala/2025/02/17/alappuzha-adventure-tourism-kerala-travel.html', rest: ': DTPC beach activities, KATPS inspection, Kainakary Vattakayal terminal.' },
  { title: 'Onmanorama: More houseboats to get registration in Alappuzha (22 January 2024)', url: 'https://www.onmanorama.com/news/kerala/2024/01/22/more-houseboats-to-get-registration-in-alappuzha.html', rest: ': houseboat numbers.' },
  { title: 'The News Minute: Inspection begins on houseboats in Alappuzha', url: 'https://www.thenewsminute.com/kerala/inspection-begins-houseboats-alappuzha-post-kerala-boat-tragedy-177101', rest: '.' },
  { title: 'inkl: Alappuzha Heritage Project in limbo', url: 'https://inkl.com/news/alappuzha-heritage-project-in-limbo', rest: ': Muziris Projects Ltd’s role and status.' },
  { title: 'Alappuzha district administration: 72nd Nehru Trophy Boat Race', url: 'https://alappuzha.nic.in/en/72nd-nehru-trophy-boat-race-in-2026/', rest: '.' },
  { title: 'Bond Safari Paddle Sports financial model (internal); Alappuzha Coastal Blueway proposal (internal).' },
]
export const CLOSING_NOTE = 'Prepared for the Bond Safari Paddle Sports board and investors. The figures are estimates for decision-making, not guarantees. Confirm all permits and terms with the relevant authorities before committing capital.'
