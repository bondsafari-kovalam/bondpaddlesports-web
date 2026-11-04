import type { Metadata } from 'next'
import { ArrowRight, MapPin } from 'lucide-react'
import { PageIntro } from '@/components/investor/portal-ui'
import { FEASIBILITY_STUDIES } from '@/lib/investor/feasibility-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Feasibility studies' }

export default async function InvestorFeasibility() {
  await requireInvestorSession()
  return (
    <>
      <PageIntro eyebrow="Feasibility studies" title="Location feasibility studies">
        <p>Site-by-site studies of demand, competition, operating models and financials. They are view only: they can be read here while signed in, and cannot be downloaded, copied or printed.</p>
      </PageIntro>

      <ul className="mt-10 grid gap-5 lg:grid-cols-2">
        {FEASIBILITY_STUDIES.map((s) => (
          <li key={s.id} className="flex flex-col rounded-2xl border border-line bg-paper-bright p-6">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong"><MapPin className="size-4" aria-hidden />{s.location} · {s.hub}</p>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight">{s.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-strong">{s.verdict}</p>
            <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {s.stats.map(([value, label]) => <div key={label} className="flex flex-col"><dt className="text-xs text-slate">{label}</dt><dd className="order-first font-display text-xl font-black tracking-tight">{value}</dd></div>)}
            </dl>
            <p className="mt-4 text-xs leading-5 text-slate">Bond estimates for decision-making, not guarantees.</p>
            <a href={`/investor/feasibility/${s.id}`} className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-teal underline-offset-4 hover:underline">Read the study <ArrowRight className="size-4" aria-hidden /></a>
          </li>
        ))}
      </ul>
    </>
  )
}
