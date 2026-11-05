import type { Metadata } from 'next'
import { ArrowRight, MapPin } from 'lucide-react'
import { PageIntro } from '@/components/investor/portal-ui'
import { FEASIBILITY_HUBS, FEASIBILITY_STUDIES, type StudyStage } from '@/lib/investor/feasibility-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Feasibility studies' }

const stageStyle: Record<StudyStage, string> = {
  Hub: 'bg-ink text-white',
  Live: 'bg-success-soft text-success',
  'Wave 1': 'bg-teal/10 text-teal-strong',
  'Wave 2': 'bg-mist text-slate-strong',
  Deferred: 'bg-sand-soft text-sand-ink',
}

export default async function InvestorFeasibility() {
  await requireInvestorSession()
  return (
    <>
      <PageIntro eyebrow="Feasibility studies" title="Location feasibility studies">
        <p>Site-by-site studies of demand, competition, operating models and financials. They are view only: they can be read here while signed in, and cannot be downloaded, copied or printed.</p>
      </PageIntro>

      <div className="mt-10 space-y-12">
        {FEASIBILITY_HUBS.map((hub) => (
          <section key={hub.name} aria-labelledby={hub.name.replace(' ', '-')}>
            <h2 id={hub.name.replace(' ', '-')} className="font-display text-2xl font-black tracking-tight">{hub.name}</h2>
            <p className="mt-1 text-sm text-slate">{hub.area}</p>
            <ul className="mt-5 grid gap-5 lg:grid-cols-2">
              {FEASIBILITY_STUDIES.filter((s) => s.hub === hub.name).map((s) => (
                <li key={s.id} className="flex flex-col rounded-2xl border border-line bg-paper-bright p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong"><MapPin className="size-4 shrink-0" aria-hidden />{s.location}</p>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${stageStyle[s.stage]}`}>{s.stage}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-strong">{s.verdict}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {s.stats.map(([value, label]) => <div key={label} className="flex flex-col"><dt className="text-xs text-slate">{label}</dt><dd className="order-first font-display text-xl font-black tracking-tight">{value}</dd></div>)}
                  </dl>
                  <p className="mt-4 text-xs leading-5 text-slate">Bond estimates for decision-making, not guarantees.</p>
                  <a href={`/investor/feasibility/${s.id}`} className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-teal underline-offset-4 hover:underline">Read the study <ArrowRight className="size-4" aria-hidden /></a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
