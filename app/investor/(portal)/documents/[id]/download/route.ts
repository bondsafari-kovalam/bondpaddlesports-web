import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { findDocument } from '@/lib/investor/content'
import { CAPITAL_TIMELINE, CASH_NOTE, CONFIDENTIAL_LINE, GATE_1, PROJECTIONS, PROJECTIONS_NOTE, PROJECTION_YEARS, ROUND_SOURCE, TERMS, TERMS_NOTE, USE_OF_FUNDS, USE_OF_FUNDS_TOTAL } from '@/lib/investor/round-data'
import { getInvestorSession } from '@/lib/investor/session'

const privateHeaders = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' }

// Quote every cell; prefix a leading = + @ so spreadsheets never evaluate a cell as a formula.
const csvCell = (v: string) => `"${(/^[=+@]/.test(v) ? `'${v}` : v).replaceAll('"', '""')}"`

type DocumentFile = { body: BodyInit; type: string; filename: string }

/** Real files live in private/investor-documents/ (traced into this route by next.config), never public/. */
const privateFile = (name: string, type: string, filename: string) => async (): Promise<DocumentFile> => ({
  type,
  filename,
  body: new Uint8Array(await readFile(path.join(process.cwd(), 'private', 'investor-documents', name))),
})

/** Built from round-data, or read from private storage, on each request. */
const GENERATORS: Record<string, () => DocumentFile | Promise<DocumentFile>> = {
  'round-deck': privateFile('friends-and-family-round-deck.pdf', 'application/pdf', 'Bond_Safari_Friends_and_Family_Round.pdf'),
  'network-plan': privateFile('hub-and-spoke-network-plan.pdf', 'application/pdf', 'Bond_Paddle_Sports_Hub_and_Spoke_Network.pdf'),
  'pathway-guide': privateFile('paddle-uk-qualification-pathway-2027.pdf', 'application/pdf', 'Paddle_UK_Qualification_Pathway_2027.pdf'),
  'key-terms': () => ({
    type: 'text/plain; charset=utf-8',
    filename: 'bond-safari-key-terms.txt',
    body: [
      'BOND SAFARI PADDLE SPORTS: KEY TERMS AND USE OF FUNDS',
      CONFIDENTIAL_LINE,
      `Source: ${ROUND_SOURCE}`,
      '',
      'PROPOSED TERMS',
      ...TERMS.map(([term, text]) => `${term}: ${text}`),
      TERMS_NOTE,
      '',
      'WHERE THE ₹5.25 CR GOES (₹ Cr)',
      ...USE_OF_FUNDS.map(([item, n]) => `${item}: ${n.toFixed(2)}`),
      `Total: ${USE_OF_FUNDS_TOTAL.toFixed(2)}`,
      '',
      'WHEN MONEY COMES IN',
      ...CAPITAL_TIMELINE.map((c) => `${c.when}: ${c.amount}, ${c.text}`),
      GATE_1,
      CASH_NOTE,
    ].join('\n'),
  }),
  projections: () => ({
    type: 'text/csv; charset=utf-8',
    filename: 'bond-safari-projections-fy27-fy33.csv',
    // BOM so Excel reads ₹ and other UTF-8 characters correctly; minus signs become ASCII so cells stay numeric.
    body: '﻿' + [
      ['₹ Cr unless stated', ...PROJECTION_YEARS],
      ...PROJECTIONS.map((p) => [p.label, ...p.values.map((v) => v.replace('−', '-'))]),
      [],
      [PROJECTIONS_NOTE],
      [`${CONFIDENTIAL_LINE}. Source: ${ROUND_SOURCE}`],
    ].map((row) => row.map(csvCell).join(',')).join('\r\n'),
  }),
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getInvestorSession())) return new Response('Unauthorised', { status: 401, headers: privateHeaders })

  const doc = findDocument((await params).id)
  const generate = doc?.status === 'Download' ? GENERATORS[doc.id] : undefined
  if (!generate) return new Response('Not found', { status: 404, headers: privateHeaders })

  const { body, type, filename } = await generate()
  return new Response(body, { headers: { ...privateHeaders, 'Content-Type': type, 'Content-Disposition': `attachment; filename="${filename}"` } })
}
