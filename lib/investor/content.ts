import 'server-only'
import { CAPITAL_TIMELINE, ROUND_SOURCE } from '@/lib/investor/round-data'

/**
 * Where a block's content comes from, shown as a badge so investors can tell the difference:
 * `deck`: the approved Friends & Family deck; `pathway`: the 2027 Academy price guide;
 * `pending`: nothing verified to show yet (e.g. actual results before operations start).
 */
export type ContentSource = 'deck' | 'pathway' | 'pending'

export type DocumentCategory = 'Investment Round' | 'Business Plan' | 'Academy' | 'Legal'
export const DOCUMENT_CATEGORIES: DocumentCategory[] = ['Investment Round', 'Business Plan', 'Academy', 'Legal']

export type InvestorDocument = {
  id: string
  title: string
  category: DocumentCategory
  description: string
  published?: string
  period?: string
  version: string
  /** Generated: built on the server from round-data and served to a signed-in session.
   *  On request / Forthcoming: not stored here; real files need private storage, never public/. */
  status: 'Download' | 'On request' | 'Forthcoming'
}

export const DOCUMENTS: InvestorDocument[] = [
  { id: 'key-terms', title: 'Key terms and use of funds', category: 'Investment Round', description: 'Round terms, use of the ₹5.25 Cr, capital calls and Gate 1, generated from the round deck.', published: '2026-10-01', version: '1.0', status: 'Download' },
  { id: 'projections', title: 'Base-case projections, FY27–FY33', category: 'Business Plan', description: 'Sites, paddlers, learners, revenue, EBITDA, profit and cash by year, as a spreadsheet (CSV).', published: '2026-10-01', period: 'FY27–FY33', version: '1.0', status: 'Download' },
  { id: 'round-deck', title: 'Friends & Family Round deck', category: 'Investment Round', description: 'The full presentation (19 slides). Shared by the Bond team with named recipients.', published: '2026-10-01', version: '1.0', status: 'On request' },
  { id: 'financial-model', title: 'Bond Safari financial model', category: 'Business Plan', description: 'Base case and capacity scenarios behind the projections.', period: 'FY27–FY33', version: '—', status: 'On request' },
  { id: 'pathway-guide', title: 'Paddle UK Qualification Pathway 2027', category: 'Academy', description: 'Academy course ladder, prices and group programmes for 2027.', period: '2027', version: '1.0', status: 'On request' },
  { id: 'offer-letter', title: 'Offer letter (PAS-4)', category: 'Legal', description: 'Private placement offer letter with the full risk factors.', version: '—', status: 'Forthcoming' },
  { id: 'shareholders-agreement', title: 'Shareholders’ agreement', category: 'Legal', description: 'Includes the dividend policy and yearly exit windows (routes 1 and 2).', version: '—', status: 'Forthcoming' },
]

export type InvestorUpdate = { id: string; kind: 'Company update' | 'Location development' | 'Investment round' | 'Expansion'; title: string; date: string; when: string; summary: string }

/** Only events stated in the round deck; newest first. */
export const UPDATES: InvestorUpdate[] = ([
  { id: 'portal', kind: 'Company update', title: 'Investor portal opened for the Friends & Family round', date: '2026-10-28', when: '28 Oct 2026', summary: 'Round terms, the business plan and projections are now available here for named recipients.' },
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
