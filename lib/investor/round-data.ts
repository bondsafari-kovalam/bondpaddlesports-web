import 'server-only'

/**
 * CONFIDENTIAL. Figures from "Bond Safari Paddle Sports — Friends & Family Round" (October 2026) and the
 * "Paddle UK Qualification Pathway" 2027 guide, transcribed as written. For named recipients only; not an
 * offer to the public. `server-only` keeps this out of browser bundles, but it is still source code:
 * it must never be pushed to a public repository. Change figures here only from an approved deck.
 */

export const ROUND_SOURCE = 'Friends & Family Round deck, October 2026'
export const PATHWAY_SOURCE = 'Paddle UK Qualification Pathway guide, 2027'
export const CONFIDENTIAL_LINE = 'Confidential · for named recipients only · not an offer to the public'

export const HEADLINE = [
  { value: '₹5.25 Cr', label: 'To raise from friends and family' },
  { value: '₹10 Cr', label: 'Proposed pre-money valuation' },
  { value: '18 sites', label: 'Across Kerala by FY31' },
  { value: '₹21.9 Cr', label: 'Planned revenue in FY31' },
]

export const INVITATION = [
  { title: 'What we are building', text: '18 paddle sites, 4 hubs and a 3-campus Paddle Sports Academy across Kerala by FY31. It starts with the Muziris kayak and canoe operation that Bond already holds.' },
  { title: 'What we are asking', text: '₹5.25 Cr from up to 100 friends and family, at least ₹5 lakh each, for 34.4% of a new company: Bond Safari Paddle Sports Pvt Ltd.' },
  { title: 'What you get', text: 'Shares, an elected investor director on the board, a dividend policy from FY31, and yearly exit windows from FY31.' },
]

export const TERMS: [string, string][] = [
  ['Company', 'Bond Safari Paddle Sports Pvt Ltd (new); Muziris operations move in with MPL consent'],
  ['Valuation', '₹10 Cr pre-money, ₹15.25 Cr post; plan-based value ₹8.4–11.8 Cr'],
  ['Your stake', '34.4% for ₹5.25 Cr; Bond Group keeps 65.6% for operations, brand, Academy and team'],
  ['Shares and ticket', 'Equity shares by private placement (section 42); minimum ₹5 lakh, up to 100 investors'],
  ['Second close', '₹1.50 Cr in April 2027 after Gate 1, at 1.5× your price; you may take it up first'],
  ['Your rights', 'Investor-elected director, quarterly reports, first right on new shares, tag-along'],
  ['Protection', 'Investor director’s veto on related-party deals with Bond Group companies'],
  ['Dividends and exits', 'Aim to pay 30–40% of profit after tax from FY31; yearly exit windows from FY31'],
  ['NRI investors', 'Welcome, under FEMA pricing and reporting rules'],
]
export const TERMS_NOTE = 'Indicative terms, subject to legal documents.'

export const USE_OF_FUNDS: [string, number][] = [
  ['Two hubs: Kovalam and Kochi', 2.4],
  ['Kit for four sites, incl. Muziris', 0.92],
  ['Kovalam Academy campus', 0.4],
  ['Shop fixtures and stock systems', 0.06],
  ['First-quarter operating losses', 0.79],
  ['Working capital and cash buffer', 0.68],
]
export const USE_OF_FUNDS_TOTAL = 5.25

/** `date` is the first day of the month, used for ordering and "upcoming" checks. */
export const CAPITAL_TIMELINE = [
  { when: 'Dec 2026', date: '2026-12-01', amount: '₹4.50 Cr', text: 'First call' },
  { when: 'Feb 2027', date: '2027-02-01', amount: '₹0.75 Cr', text: 'Second call' },
  { when: 'Apr 2027', date: '2027-04-01', amount: '₹1.50 Cr', text: 'Second close, only if Gate 1 is met' },
  { when: 'FY28–FY31', date: '2027-04-01', amount: '≈ ₹3.4 Cr', text: 'Bank loan, Phases 2–4' },
]
export const GATE_1 = 'Gate 1, April 2027: 70% of planned paddlers, 15% site margin in two peak months, 150 learners, no serious incidents.'
export const CASH_NOTE = 'Deepest cash need ₹6.2 Cr in Oct 2027; lowest month-end cash ₹54 lakh.'

export const PROJECTION_YEARS = ['FY27', 'FY28', 'FY29', 'FY30', 'FY31', 'FY32', 'FY33'] as const
export const PROJECTIONS: { label: string; values: string[]; highlight?: boolean }[] = [
  { label: 'Operating sites', values: ['4', '10', '13', '17', '18', '18', '18'] },
  { label: 'Paddlers (’000)', values: ['3.4', '45.1', '71.4', '93.4', '109.2', '120.8', '129.1'] },
  { label: 'Academy learners', values: ['226', '1,670', '3,580', '5,580', '7,130', '7,558', '8,011'] },
  { label: 'Revenue', values: ['0.91', '8.14', '13.63', '18.48', '21.87', '23.70', '25.21'], highlight: true },
  { label: 'EBITDA', values: ['−0.79', '0.69', '3.03', '4.96', '6.89', '8.06', '9.02'] },
  { label: 'EBITDA margin', values: ['n/m', '9%', '22%', '27%', '31%', '34%', '36%'] },
  { label: 'Profit after tax', values: ['−1.40', '−0.33', '1.53', '2.31', '3.63', '4.62', '5.41'], highlight: true },
  { label: 'Cash at year end', values: ['0.65', '1.48', '2.84', '5.22', '9.76', '13.80', '18.79'] },
]
export const PROJECTIONS_NOTE = 'Base case, ₹ Cr unless stated. FY27 covers January to March 2027, the new company’s first quarter. Cash is shown before any dividends. Constant FY27 prices, excluding GST. The loyalty programme is not included. Projections are estimates, not guarantees.'

export const DRIVERS = [
  { name: 'Experiences', value: '₹13.7 Cr', text: '63% of FY31 revenue. Rentals, guided tours, passes, resort and corporate packages, events.' },
  { name: 'Academy', value: '₹6.5 Cr', text: '30% of FY31 revenue, about 45% of its EBITDA. Paddle UK and ACA courses, guide training, schools.' },
  { name: 'Shop', value: '₹1.7 Cr', text: '8% of FY31 revenue. T-shirts, caps, rash guards, swimwear and paddle equipment.' },
  { name: 'Membership', value: '+₹1.4 Cr', text: 'Upside, not in our numbers. Contribution in FY31 if the loyalty programme works half as well as designed.', upside: true },
]
export const FLYWHEEL = 'A taster on the water becomes a member, a member becomes a learner, every learner needs kit, and the Academy trains the guides who staff new sites.'

export const WHY_NOW = [
  { value: '25.9 million', text: 'Tourist visits to Kerala in 2025, a state record. Domestic visits grew 12.6% in the year.' },
  { value: '4 October 2026', text: 'Muziris kayaking and water taxis relaunched by the Chief Minister. Bond holds the licence to run the kayak and canoe fleet at 12 jetties across the Muziris Project.' },
  { value: 'First', text: 'Operator registered under Kerala’s mandatory adventure-tourism safety rules: Bond Water Sports, for scuba, kayaking, canoeing and parasailing.' },
  { value: 'None', text: 'Internationally accredited paddle schools in Kerala today. The nearest courses, in Rishikesh, give completion certificates only.' },
]
export const WHY_NOW_SOURCES = 'Kerala Tourism Statistics 2025; Kerala Tourism, 4 Oct 2026; Travel Trade Journal'

export const MARKET = [
  { label: 'Total market · India adventure tourism (2025)', value: '≈ ₹1.7 lakh Cr (US$19.7 bn)' },
  { label: 'All tourist spending in Kerala (2025)', value: '₹50,702 Cr' },
  { label: 'Serviceable market · paid paddle experiences in Kerala', value: '₹35–70 Cr a year' },
  { label: 'Our FY31 target, all four drivers', value: '₹21.9 Cr' },
]
export const MARKET_NOTE = 'Paddle experiences: 1.5–3% of 25.9 million visits paying about ₹900 each. FY31 experience revenue of ₹11.3 Cr would be 16–32% of that market. The rest of the target is Academy courses (₹6.5 Cr), resort, corporate and events sales (₹2.4 Cr) and the shop (₹1.7 Cr).'
export const MARKET_SOURCES = 'IMARC (India adventure tourism, at ~₹86/US$); Kerala Tourism Statistics 2025; Bond estimates'

export const PRICE_GAP = {
  low: { value: '₹300 a boat', label: 'District Tourism pedal boats' },
  bond: { value: '₹500–2,500', label: 'Bond Safari: rentals, guided tours, sunrise paddles, white-water' },
  high: { value: '₹5,500 a person', label: 'Luxury-resort sunrise kayak' },
  points: [
    { title: 'Safety you can check', text: 'Kerala now requires adventure operators to register. After the 2026 Ranipuram accident, people check before they book.' },
    { title: 'Training that counts', text: 'Rishikesh 4-day courses cost ₹17,500–18,500 for a completion certificate. We offer Paddle UK and ACA awards.' },
    { title: 'Where people already are', text: 'Our sites sit next to Kochi, Kovalam, Varkala, Kumarakom and Alappuzha, where most visitors go.' },
  ],
  sources: 'DTPC Wayanad; CGH Earth; Bikat Adventures; Team 4 Adventure; KATPS',
}

export const PHASES = [
  { name: 'Phase 1 · from Jan 2027', sites: ['Muziris – Paravur (live)', 'Muziris – Kottapuram (live)', 'Kovalam', 'Poovar'] },
  { name: 'Phase 2 · FY28', sites: ['Kochi – Kumbalangi', 'Kumarakom', 'Alappuzha', 'Cherai', 'Varkala – Kappil', 'Kollam – Munroe'] },
  { name: 'Phase 3 · FY29', sites: ['Kozhikode – Kadalundi', 'Kodenchery white-water', 'Pookode Lake'] },
  { name: 'Phase 4 · FY30–31', sites: ['Valiyaparamba', 'Parassinikkadavu', 'Irringal', 'Bekal', 'Vellayani'] },
]
export const HUBS = 'Hubs: Kovalam, Kochi, Kozhikode, Payyanur. Each hub holds the workshop, spare fleet and senior guides.'

export const SITE_ECONOMICS: [string, string, string, string, string][] = [
  ['Kumarakom, owned', '₹1.91 Cr', '₹1.27 Cr', '67%', '~3 months'],
  ['Kovalam, owned', '₹1.44 Cr', '₹0.89 Cr', '62%', '~4 months'],
  ['Pookode Lake, District Tourism concession', '₹0.33 Cr', '₹0.12 Cr', '36%', '~14 months'],
  ['Muziris (each site), concession', '₹0.47 Cr', '₹0.12 Cr', '25%', '~15 months'],
  ['Cherai, owned (small site)', '₹0.18 Cr', '₹0.06 Cr', '31%', '~5.6 years'],
]
export const SITE_POINTS = [
  { title: 'Owned sites carry the profit', text: 'Kit costs ₹32 lakh a site. Four sites (Kumarakom, Kovalam, Kochi, Alappuzha) earn about half of all experience revenue.' },
  { title: 'Concessions keep risk small', text: 'Government owns the water and boats; we add ₹14 lakh of kit and share revenue. Small sites are run only this way.' },
]
export const SITE_NOTE = 'At steady state, before hub and head-office costs; excludes the shop. Revenue share assumed at 20% until Muziris terms are final.'

export const CAPACITY: [string, string, string, string, string, string, string][] = [
  ['25%', '46,900', '2,700', '₹9.3 Cr', '−₹1.9 Cr', '−₹4.0 Cr', 'nil'],
  ['33% · cash breakeven', '62,700', '3,600', '₹12.1 Cr', '₹0', '−₹2.0 Cr', 'nil'],
  ['42% · profit breakeven', '79,200', '4,560', '₹15.1 Cr', '₹2.0 Cr', '₹0', '₹10.2 Cr'],
  ['50%', '93,800', '5,400', '₹17.7 Cr', '₹3.8 Cr', '₹1.3 Cr', '₹19.2 Cr'],
  ['75%', '140,700', '8,100', '₹26.1 Cr', '₹9.6 Cr', '₹5.7 Cr', '₹48.0 Cr'],
  ['100%', '187,600', '10,800', '₹34.5 Cr', '₹15.4 Cr', '₹10.0 Cr', '₹76.8 Cr'],
]
export const CAPACITY_POINTS = [
  { title: 'What 100% means', text: '292 craft at 18 sites, 4 sessions a day, 255 days a year, 45% of seats filled; plus 10,800 Academy places.' },
  { title: 'Where the plan sits', text: 'About 58% in FY31 and 69% in FY33. Above breakeven, most extra revenue becomes profit.' },
]
export const CAPACITY_NOTE = 'Full 18-site network on the FY31 cost base, all sites at the same level; tax at 25.17%.'

export const OUTCOMES = [
  { label: 'Base case', value: '₹38.6 lakh', text: '3.9× your money, about 24% a year over six years.', tone: 'teal' as const },
  { label: 'Upside: 30% more paddlers', value: '₹57.4 lakh', text: '5.7× your money, about 32% a year.', tone: 'sand' as const },
  { label: 'If Gate 1 fails', value: 'Loss likely', text: 'Expansion stops. The four sites carry on or are sold. You could lose a large part of your money.', tone: 'danger' as const },
]
export const OUTCOMES_NOTE = 'Every ₹10 lakh invested, valued in FY33: 5× EBITDA (₹45.1 Cr) plus net cash (₹17.6 Cr) = ₹62.7 Cr for the whole company. Your stake is 32.3% after the April 2027 second close, if you do not join it. Dividends from FY31 are paid out of this same value, earlier. Estimates, not promises; before personal tax.'

export const EXITS: [string, string, string][] = [
  ['Dividends', 'From FY31', '30–40% of profit after tax each year; a cash return while you stay invested'],
  ['Yearly exit window', 'From FY31', 'Bond Group or other investors buy your shares at independent fair value'],
  ['Company buy-back', 'FY31 onward', 'Under section 68, up to 25% of capital and reserves a year; tax treatment on advice'],
  ['Strategic sale', 'FY31–FY33', 'To a hospitality group, adventure platform or water-sports operator; tag-along takes you with it'],
  ['Growth investor buys in', 'National expansion', 'A private-equity or growth fund buys out early shareholders in a larger round'],
  ['SME IPO (NSE Emerge)', 'FY32–FY33', 'Needs ₹1 Cr operating profit in 2 of 3 years, met in the plan from FY29; least likely'],
]
export const EXITS_NOTE = 'Unlisted shares are hard to sell. Routes 1 and 2 are written into the shareholders’ agreement so you are not relying on a sale or listing. Companies Act 2013 s.68; NSE Emerge eligibility; subject to tax and legal advice.'

export const RISKS: [string, string][] = [
  ['Demand is lower than planned', 'Gates: later money and sites only follow proven results'],
  ['A safety incident', 'Certified guides, rescue boats, insurance, KATPS registration at every site'],
  ['Monsoon months', 'White-water and training season, early-bird passes, cash buffer'],
  ['Concession terms', 'Muziris revenue share not yet final; capex at concession sites capped near ₹14 lakh'],
  ['MD sits on KATPS Technical Committee', 'Written recusal from any decision touching Bond Safari'],
  ['Dealings with Bond Group companies', 'Arm’s-length agreements; investor director can veto'],
  ['Shares are unlisted', 'Dividends and yearly exit windows'],
]
export const RISKS_NOTE = 'Full risk factors will be set out in the offer letter (PAS-4).'

export const ACADEMY = {
  ladder: [
    { step: 'Try', text: 'Discover Paddling taster, ₹1,500' },
    { step: 'Learn', text: 'Paddle UK one-day awards; kayak, SUP, canoe, white-water courses' },
    { step: 'Qualify', text: 'Safety and rescue, Paddlesport Instructor, ACA SUP Instructor' },
    { step: 'Lead', text: 'Paddle UK leader awards for senior guides' },
    { step: 'Coach', text: 'Coach and provider level: our own faculty by FY30' },
  ],
  stats: [
    { value: '7,130', label: 'Learners a year by FY31' },
    { value: '₹6.5 Cr', label: 'Academy revenue in FY31' },
    { value: '48%', label: 'EBITDA margin (₹3.1 Cr)' },
    { value: '~280', label: 'Guides trained to FY31, for ~150 jobs at our sites' },
  ],
  campuses: 'Three campuses: Kovalam (sea, SUP, instructor awards, 2027), Muziris–Kochi (flat water, canoe, schools, 2028), Kodenchery (white-water in the monsoon, 2029). The monsoon becomes our training season.',
  note: 'Paddle UK and ACA awards subject to centre approval.',
}

/** Course prices from the 2027 pathway guide: ₹, including 18% GST, valid through 31 Dec 2027. */
export const ACADEMY_PRICES: { group: string; rows: [string, string, string][] }[] = [
  { group: 'Start paddling (personal awards)', rows: [
    ['Paddle Start · first time on the water', '1.5 hours', '₹1,200'],
    ['Paddle Safer · safe-paddling basics', '2 hours', '₹1,500'],
    ['SUP Safer · for stand-up paddleboarders', '4 hours', '₹2,500'],
    ['Paddle Discover · progression after Start', '12 hours (3 days)', '₹9,500'],
    ['Paddle Explore · progression after Discover', '12 hours (3 days)', '₹11,000'],
    ['Paddlesport Safety and Rescue', '6 hours (1 day)', '₹7,500'],
  ] },
  { group: 'Professional pathways (bundles)', rows: [
    ['Learn to Paddle · Start, Safer, Discover, Explore (save ₹3,300)', 'Bundle', '₹19,900'],
    ['Instructor Fast-Track · Explore, Safety and Rescue, Instructor (save ₹6,000)', 'Bundle', '₹55,000'],
    ['Leader Pathway · Paddlesport Instructor, Paddlesport Leader (save ₹9,000)', 'Bundle', '₹82,500'],
  ] },
  { group: 'Become an instructor', rows: [
    ['SUP Instructor', 'eLearning + 2 days', '₹42,500'],
    ['Paddlesport Instructor · kayak/canoe', 'eLearning + 2 days', '₹42,500'],
    ['Instructor Preparation Day', '1 day', '₹6,500'],
    ['Re-assessment', 'Up to 1 day', '₹9,000'],
  ] },
  { group: 'Lead and coach (launching 2027)', rows: [
    ['Paddlesport Leader · sheltered water', '3 days', '₹49,000'],
    ['Open Water Canoe Leader · Kerala backwaters', '3 days', '₹54,500'],
    ['Sea Kayak Leader · Kovalam coast', '3 days', '₹64,500'],
    ['Coach · incl. Core Coach Training', '4 days', '₹83,000'],
    ['White Water Safety · Kodenchery', '2 days', '₹28,000'],
  ] },
  { group: 'Commercial and group programmes', rows: [
    ['Bond Paddle Guide Programme · 4-week academy', '4 weeks', '₹1,36,000'],
    ['Operator Staff Package · group of 6 staff', '3 days', '₹2,93,000 / group'],
    ['Schools Paddle Year · min. 20 students', '10 sessions', '₹8,500 / student'],
    ['Corporate team session · min. 10', 'Half day', '₹2,800 / person'],
    ['Family Paddle Start · 2 adults, 2 kids', '1.5 hours', '₹3,600 / family'],
    ['Private coaching', 'Per hour', '₹3,000 (₹2,000 each for two)'],
  ] },
]
export const ACADEMY_PRICES_NOTE = 'Prices include 18% GST and are valid through 31 Dec 2027. Instructor, leader and coach courses require Paddle UK membership (extra). Discounts: 15% for students 16–25 and monsoon bookings; 10% for Bond members, groups of 6+ and uniformed services; 5% when booked 30 days ahead. One offer per booking, not valid on pathways.'

export const SHOP: [string, string, string][] = [
  ['Bond Safari T-shirts', '₹599–899', '~55%'],
  ['Caps', '₹399–499', '~55%'],
  ['Rash guards', '₹1,299–1,999', '~55%'],
  ['Swimwear', '₹1,499–2,999', '~55%'],
  ['Paddles, life jackets, dry bags, helmets', '₹1,500–15,000', '~22–25%'],
  ['Academy starter kits', 'Bundled with courses', '~45%'],
  ['SUP boards and kayaks', 'To order', '~20%'],
]
export const SHOP_STATS = [{ value: '₹1.7 Cr', label: 'Shop revenue in FY31' }, { value: '45%', label: 'Blended gross margin; ₹0.64 Cr EBITDA' }]
export const SHOP_NOTE = 'Sold at site kiosks, hub stores, online and in course bundles; Bond Blue members get 15% off. Assumes 6% of paddlers buy (about ₹900 each), 35% of learners buy kit (₹3,000), and 80% of instructor and guide trainees buy their own equipment (₹12,000). Prices are proposals, to be set after supplier quotes.'

export const MEMBERSHIP = [
  { tier: 'Free', name: 'Bond Safari Club', text: 'One ID across every Bond business. Earn Pearls (1 Pearl = ₹1) at 3–10% back. Four tiers: Shore, Reef, Ocean, Abyss.' },
  { tier: 'Paid yearly', name: 'Bond Blue', text: '₹2,499 individual, ₹5,999 family, ₹999 Digital anywhere in India. 15% off, double Pearls, a free paddle hour every month.' },
  { tier: 'Prepaid', name: 'Paddle Season Pass', text: '₹7,999 for unlimited paddling October to May, or ₹6,399 early-bird in June to September.' },
]
export const MEMBERSHIP_REVENUE = [
  { title: 'How it drives revenue', text: 'More visits per customer and more cross-selling into courses and kit. Early-bird passes bring about ₹83 lakh into the monsoon months by FY31, when cash is lowest.' },
  { title: '≈ ₹1.4 Cr a year', text: 'Paddle share of the programme’s FY31 contribution if it delivers half its design. Not in our projections until a 2027 pilot proves it.' },
]
export const MEMBERSHIP_NOTE = 'Modelled on Tata NeuPass, Costco, Vail Epic Pass and PADI Club. Bond Membership design, Oct 2026.'

export const TEAM = [
  { name: 'Jackson Peter', role: 'Founder & MD, Bond Group' },
  { name: 'Kishor Kumar', role: 'Co-Founder & Director, Marketing' },
  { name: 'Suraj Khan', role: 'Co-Founder & Director, Sales' },
  { name: 'Shyamkumar Balakrishnan', role: 'Co-Founder & Director, Finance' },
]

export const INVESTOR_CONTACT = { name: 'Jackson Peter', role: 'Managing Director, Bond Group of Companies', phone: '+91 99465 50073', email: 'jp@bondsafarikovalam.com' }
