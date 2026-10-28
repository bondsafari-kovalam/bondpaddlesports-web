import type { Metadata } from 'next'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import { DataTable, Note, PageIntro, PortalSection } from '@/components/investor/portal-ui'
import { CAPITAL_TIMELINE, CASH_NOTE, CONFIDENTIAL_LINE, EXITS, EXITS_NOTE, GATE_1, OUTCOMES, OUTCOMES_NOTE, RISKS, RISKS_NOTE, TERMS, TERMS_NOTE, USE_OF_FUNDS, USE_OF_FUNDS_TOTAL } from '@/lib/investor/round-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'The round' }

const outcomeTone = { teal: 'border-t-teal-bright', sand: 'border-t-sand', danger: 'border-t-danger' }
const cr = (n: number) => n.toFixed(2)

export default async function InvestorRound() {
  await requireInvestorSession()
  return (
    <>
      <PageIntro eyebrow="The round" title="₹5.25 Cr at a ₹10 Cr pre-money valuation, for 34.4%">
        <p>Terms, where the money goes, what an investment could become, how you get your money back, and the risks, as set out in the round deck.</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate">{CONFIDENTIAL_LINE}</p>
      </PageIntro>

      <div className="mt-10 space-y-14">
        <PortalSection id="terms" eyebrow="Proposed terms" title="The round and the valuation" source="deck">
          <DataTable caption="Proposed terms of the round" head={['Term', 'Proposal']} rows={TERMS} />
          <Note>{TERMS_NOTE}</Note>
        </PortalSection>

        <PortalSection id="funds" eyebrow="Use of funds" title="Your money builds Phase 1; later money waits for results" source="deck">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <DataTable caption="Where the ₹5.25 Cr goes" head={['Item', '₹ Cr']} numeric={[1]} highlight={[USE_OF_FUNDS.length]} rows={[...USE_OF_FUNDS.map(([item, n]) => [item, cr(n)]), ['Total', cr(USE_OF_FUNDS_TOTAL)]]} />
            </div>
            <div className="rounded-2xl bg-ink p-6 text-white">
              <h3 className="font-display text-lg font-bold">When money comes in</h3>
              <ol className="mt-4 space-y-4 border-l border-white/20 pl-5">{CAPITAL_TIMELINE.map((c) => (
                <li key={c.when + c.text} className="relative">
                  <span className="absolute -left-[25px] top-1.5 size-2.5 rounded-full bg-sand" aria-hidden />
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-pale">{c.when}</p>
                  <p className="mt-0.5 text-sm"><strong className="font-display text-base">{c.amount}</strong> · {c.text}</p>
                </li>
              ))}</ol>
              <p className="mt-6 rounded-xl bg-white/10 p-4 text-sm leading-6 text-white/85">{GATE_1}</p>
            </div>
          </div>
          <Note>{CASH_NOTE}</Note>
        </PortalSection>

        <PortalSection id="outcomes" eyebrow="What your investment could become" title="Every ₹10 lakh invested, valued in FY33" source="deck">
          <ul className="grid gap-4 md:grid-cols-3">{OUTCOMES.map((o) => (
            <li key={o.label} className={`rounded-2xl border border-line border-t-4 bg-paper-bright p-6 ${outcomeTone[o.tone]}`}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate">{o.label}</p>
              <p className="mt-3 font-display text-3xl font-black tracking-tight">{o.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-strong">{o.text}</p>
            </li>
          ))}</ul>
          <Note>{OUTCOMES_NOTE}</Note>
        </PortalSection>

        <PortalSection id="exits" eyebrow="Exit strategies" title="Six ways to get your money back, most likely first" source="deck">
          <DataTable caption="Exit routes for investors" head={['Route', 'When', 'How it works']} rows={EXITS.map(([route, when, how], i) => [`${i + 1}. ${route}`, when, how])} />
          <Note>{EXITS_NOTE}</Note>
        </PortalSection>

        <PortalSection id="risks" eyebrow="Risks, told plainly" title="What could go wrong, and how we protect you" source="deck">
          <ul className="grid gap-3 md:grid-cols-2">{RISKS.map(([risk, protection]) => (
            <li key={risk} className="rounded-2xl border border-line bg-paper-bright p-5">
              <p className="flex gap-2 text-sm font-bold"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-sand-ink" aria-hidden />{risk}</p>
              <p className="mt-2 flex gap-2 text-sm leading-6 text-slate-strong"><ShieldCheck className="mt-1 size-4 shrink-0 text-success" aria-hidden />{protection}</p>
            </li>
          ))}</ul>
          <Note>{RISKS_NOTE}</Note>
        </PortalSection>
      </div>
    </>
  )
}
