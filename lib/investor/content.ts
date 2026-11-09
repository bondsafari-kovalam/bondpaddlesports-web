import 'server-only'
import { CAPITAL_TIMELINE, ROUND_SOURCE } from '@/lib/investor/round-data'

/**
 * Where a block's content comes from, shown as a badge so investors can tell the difference:
 * `deck`: the approved Friends & Family deck; `pathway`: the 2027 Academy price guide;
 * `network`: the Hub-and-Spoke Network plan (28 Oct 2026), preliminary and not yet in the financial model;
 * `pending`: nothing verified to show yet (e.g. actual results before operations start).
 */
export type ContentSource = 'deck' | 'pathway' | 'network' | 'pending'

export type DocumentCategory = 'Investment Round' | 'Strategy & Business Plans' | 'Academy' | 'Legal'
export const DOCUMENT_CATEGORIES: DocumentCategory[] = ['Investment Round', 'Strategy & Business Plans', 'Academy', 'Legal']

export type InvestorDocument = {
  id: string
  title: string
  category: DocumentCategory
  description: string
  published?: string
  period?: string
  version: string
  /** Download: generated from round-data, or a file in private/investor-documents/, served only to a signed-in session.
   *  View only: read on the portal page at `href`; there is no file to download.
   *  On request / Forthcoming: not stored here; real files go in private/, never public/. */
  status: 'Download' | 'View only' | 'On request' | 'Forthcoming'
  href?: string
  /** A PDF in private/investor-documents/, read in the portal at /investor/documents/<id>. */
  readerFile?: string
}

export const DOCUMENTS: InvestorDocument[] = [
  { id: 'key-terms', title: 'Key terms and use of funds', category: 'Investment Round', description: 'Terms, ownership, where the ₹5.25 Cr goes, capital calls, Gate 1, rights, valuation, related parties and risks, on financial model V03. Read online only (21 pages).', published: '2026-11-09', version: '2.0', status: 'View only', href: '/investor/documents/key-terms', readerFile: 'key-terms-and-use-of-funds.pdf' },
  { id: 'marketing-strategy', title: 'Marketing Strategy and Plan', category: 'Strategy & Business Plans', description: 'Audiences, positioning, channels, the launch playbook, budget, measurement and the first 90 days, aligned to financial model V03. Read online only (29 pages).', published: '2026-11-05', version: '1.0', status: 'View only', href: '/investor/documents/marketing-strategy', readerFile: 'marketing-strategy-and-plan.pdf' },
  { id: 'projections', title: 'Base-case projections, FY27–FY33', category: 'Strategy & Business Plans', description: 'Sites, paddlers, learners, revenue, EBITDA, profit and cash by year, as a spreadsheet (CSV).', published: '2026-10-01', period: 'FY27–FY33', version: '1.0', status: 'Download' },
  { id: 'round-deck', title: 'Friends & Family Round deck', category: 'Investment Round', description: 'The full presentation for named recipients (PDF, 21 pages).', published: '2026-10-01', version: '1.0', status: 'Download' },
  { id: 'financial-model', title: 'Bond Safari financial model', category: 'Strategy & Business Plans', description: 'Base case and capacity scenarios behind the projections.', period: 'FY27–FY33', version: '—', status: 'On request' },
  { id: 'network-plan', title: 'Hub-and-Spoke Network plan', category: 'Strategy & Business Plans', description: 'Four regional hubs, 31 potential spokes ranked within each hub, and the proposed rollout waves (PDF, 17 pages).', published: '2026-10-28', version: '1.0', status: 'Download' },
  { id: 'trivandrum-hub-feasibility', title: 'Trivandrum hub feasibility study', category: 'Strategy & Business Plans', description: 'Hub base, the eight spokes it serves, hub economics, the Academy campus, risks and the launch plan. Read online only.', published: '2026-11-04', version: '1.0', status: 'View only', href: '/investor/feasibility/trivandrum-hub' },
  { id: 'kovalam-feasibility', title: 'Kovalam feasibility study', category: 'Strategy & Business Plans', description: 'Demand, customers, competition, locations, operating models, financials, related-party terms, permits and the launch plan for Kovalam. Read online only.', published: '2026-11-04', version: '1.0', status: 'View only', href: '/investor/feasibility/kovalam' },
  { id: 'ernakulam-hub-feasibility', title: 'Ernakulam hub feasibility study', category: 'Strategy & Business Plans', description: 'Hub base, the nine destinations it serves, hub economics, the Academy campus, risks and the launch plan. Read online only.', published: '2026-11-05', version: '1.0', status: 'View only', href: '/investor/feasibility/ernakulam-hub' },
  { id: 'muziris-kottapuram-feasibility', title: 'Muziris–Kottapuram feasibility study', category: 'Strategy & Business Plans', description: 'Operating review of the live Kottapuram site: demand, customers, pricing, operating models, financials, the Muziris concession, permits and the plan ahead. Read online only.', published: '2026-11-05', version: '1.0', status: 'View only', href: '/investor/feasibility/muziris-kottapuram' },
  { id: 'kumbalangi-feasibility', title: 'Kumbalangi feasibility study', category: 'Strategy & Business Plans', description: 'Demand, customers, competition, locations, operating models, financials, the community partnership, night protocol and launch plan for Kumbalangi. Read online only.', published: '2026-11-05', version: '1.0', status: 'View only', href: '/investor/feasibility/kumbalangi' },
  { id: 'alappuzha-feasibility', title: 'Alappuzha feasibility study', category: 'Strategy & Business Plans', description: 'Demand, customers, competition, ten locations, four operating models, financials, permits and the launch plan for Alappuzha. Read online only.', published: '2026-11-04', version: '1.0', status: 'View only', href: '/investor/feasibility/alappuzha' },
  { id: 'marari-coastal-blueway-feasibility', title: 'Marari Coastal Blueway feasibility study', category: 'Strategy & Business Plans', description: 'Demand, customers, competition, locations, operating models, financials, the Blueway’s company and terms, permits and the launch plan. Read online only.', published: '2026-11-05', version: '1.0', status: 'View only', href: '/investor/feasibility/marari-coastal-blueway' },
  { id: 'kumarakom-feasibility', title: 'Kumarakom feasibility study', category: 'Strategy & Business Plans', description: 'Demand, competition, three operating models, financials, permits and the launch plan for Kumarakom. Read online only.', published: '2026-11-04', version: '1.0', status: 'View only', href: '/investor/feasibility/kumarakom' },
  { id: 'pathway-guide', title: 'Paddle UK Qualification Pathway 2027', category: 'Academy', description: 'Academy course ladder, prices and group programmes for 2027 (PDF, 15 slides).', published: '2026-11-03', period: '2027', version: '1.0', status: 'Download' },
  { id: 'offer-letter', title: 'Offer letter (PAS-4)', category: 'Legal', description: 'Private placement offer letter with the full risk factors.', version: '—', status: 'Forthcoming' },
  { id: 'shareholders-agreement', title: 'Shareholders’ agreement', category: 'Legal', description: 'Includes the dividend policy and yearly exit windows (routes 1 and 2).', version: '—', status: 'Forthcoming' },
]

export type InvestorUpdate = { id: string; kind: 'Company update' | 'Location development' | 'Investment round' | 'Expansion'; title: string; date: string; when: string; summary: string }

/** Only events stated in the round deck; newest first. */
export const UPDATES: InvestorUpdate[] = ([
  { id: 'key-terms', kind: 'Company update', title: 'Key terms and use of funds updated', date: '2026-11-09', when: '9 Nov 2026', summary: 'The investor portal edition sets out the terms, use of funds, capital calls, Gate 1, rights and risks on financial model V03. Read it under Documents.' },
  { id: 'marketing-strategy', kind: 'Company update', title: 'Marketing strategy and plan added', date: '2026-11-06', when: '6 Nov 2026', summary: 'The plan covers audiences, channels, budget and the first 90 days, aligned to financial model V03. Read it under Documents.' },
  { id: 'marari-coastal-blueway-feasibility', kind: 'Location development', title: 'Marari Coastal Blueway feasibility study added', date: '2026-11-05', when: '5 Nov 2026', summary: 'The study recommends deferring Marari to FY29, and opening only once the canals are cleared and the operating company is settled. Read it under Feasibility studies.' },
  { id: 'ernakulam-hub-feasibility', kind: 'Location development', title: 'Ernakulam hub feasibility study added', date: '2026-11-05', when: '5 Nov 2026', summary: 'The study recommends basing the hub on the Goshree corridor at Mulavukad or south Vypin, with the Muziris–Kochi Academy campus in FY28. Read it under Feasibility studies.' },
  { id: 'kumbalangi-feasibility', kind: 'Location development', title: 'Kumbalangi feasibility study added', date: '2026-11-05', when: '5 Nov 2026', summary: 'The study recommends a community-partnered spoke from a shared jetty near Kallanchery. Read it under Feasibility studies.' },
  { id: 'muziris-kottapuram-feasibility', kind: 'Location development', title: 'Muziris–Kottapuram feasibility study added', date: '2026-11-05', when: '5 Nov 2026', summary: 'The operating review recommends keeping the site running, adding SUP, heritage trails and schools, and moving the concession into Bond Safari Paddle Sports. Read it under Feasibility studies.' },
  { id: 'kovalam-feasibility', kind: 'Location development', title: 'Kovalam feasibility study added', date: '2026-11-04', when: '4 Nov 2026', summary: 'The study recommends opening Kovalam in January 2027 as the Trivandrum hub’s home spoke, run from the Bond campus. Read it under Feasibility studies.' },
  { id: 'alappuzha-feasibility', kind: 'Location development', title: 'Alappuzha feasibility study added', date: '2026-11-04', when: '4 Nov 2026', summary: 'The study recommends opening Alappuzha as a two-site cluster, starting with a Punnamada–Kuttanad spoke in FY28. Read it under Feasibility studies.' },
  { id: 'trivandrum-hub-feasibility', kind: 'Location development', title: 'Trivandrum hub feasibility study added', date: '2026-11-04', when: '4 Nov 2026', summary: 'The study recommends opening the Trivandrum hub at the Bond Kovalam campus in January 2027. Read it under Feasibility studies.' },
  { id: 'kumarakom-feasibility', kind: 'Location development', title: 'Kumarakom feasibility study added', date: '2026-11-04', when: '4 Nov 2026', summary: 'The study recommends opening Kumarakom as a standalone spoke. Read it under Feasibility studies.' },
  { id: 'portal', kind: 'Company update', title: 'Investor portal opened for the Friends & Family round', date: '2026-10-28', when: '28 Oct 2026', summary: 'Round terms, the business plan and projections are now available here for named recipients.' },
  { id: 'network-plan', kind: 'Expansion', title: 'Hub-and-spoke network plan added', date: '2026-10-28', when: '28 Oct 2026', summary: 'Four regional hubs and 31 potential spokes. The investor plan still covers 18 sites; the rest is an unfunded pipeline.' },
  { id: 'round-open', kind: 'Investment round', title: 'Friends & Family round opened', date: '2026-10-01', when: 'Oct 2026', summary: '₹5.25 Cr from up to 100 friends and family, at least ₹5 lakh each, for 34.4% of Bond Safari Paddle Sports Pvt Ltd at a ₹10 Cr pre-money valuation.' },
  { id: 'muziris-relaunch', kind: 'Location development', title: 'Muziris kayaking and water taxis relaunched', date: '2026-10-04', when: '4 Oct 2026', summary: 'Relaunched by the Chief Minister. Bond holds the licence to run the kayak and canoe fleet at 12 jetties across the Muziris Project. Muziris – Paravur and Muziris – Kottapuram are live.' },
  { id: 'phase-1', kind: 'Expansion', title: 'Phase 1 planned from January 2027', date: '2026-09-30', when: 'Oct 2026', summary: 'Muziris – Paravur, Muziris – Kottapuram, Kovalam and Poovar, with hubs at Kovalam and Kochi and the Kovalam Academy campus.' },
] satisfies InvestorUpdate[]).sort((a, b) => b.date.localeCompare(a.date))

/** Dated round milestones from the deck, shown as upcoming until their month has passed. */
export function upcomingMilestones(now = new Date()) {
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)
  return [
    ...CAPITAL_TIMELINE.filter((c) => c.when !== 'FY28–FY31').map((c) => ({ when: c.when, date: c.date, title: `${c.text}: ${c.amount}` })),
    { when: 'Jan 2027', date: '2027-01-01', title: 'Phase 1 operations begin' },
    { when: 'Apr 2027', date: '2027-04-01', title: 'Gate 1 review' },
  ].filter((m) => m.date >= thisMonth).sort((a, b) => a.date.localeCompare(b.date))
}

export const findDocument = (id: string) => DOCUMENTS.find((d) => d.id === id)
export { ROUND_SOURCE }
