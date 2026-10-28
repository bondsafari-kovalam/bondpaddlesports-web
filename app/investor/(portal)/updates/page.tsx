import type { Metadata } from 'next'
import { PageIntro, SourceBadge } from '@/components/investor/portal-ui'
import { UPDATES, upcomingMilestones } from '@/lib/investor/content'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Updates' }

export default async function InvestorUpdates() {
  await requireInvestorSession()
  const milestones = upcomingMilestones()
  return (
    <>
      <PageIntro eyebrow="Investor updates" title="Announcements and progress">
        <p>Company, location and round updates. New announcements will be added here as the round and Phase 1 progress.</p>
      </PageIntro>
      <div className="mt-4"><SourceBadge source="deck" /></div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ol className="max-w-3xl border-l border-line">{UPDATES.map((u) => (
          <li key={u.id} className="relative pb-10 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-teal" aria-hidden />
            <p className="text-xs font-bold uppercase tracking-wider text-teal-strong">{u.kind} · <time dateTime={u.date}>{u.when}</time></p>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight">{u.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-strong">{u.summary}</p>
          </li>
        ))}</ol>

        <aside aria-labelledby="coming-up" className="h-fit rounded-2xl bg-ink p-6 text-white">
          <h2 id="coming-up" className="font-display text-lg font-bold">Coming up</h2>
          <ol className="mt-4 space-y-3">{milestones.map((m) => (
            <li key={m.title}><p className="text-xs font-bold uppercase tracking-wider text-teal-pale">{m.when}</p><p className="text-sm">{m.title}</p></li>
          ))}</ol>
          <p className="mt-5 text-xs leading-5 text-white/60">The second close happens only if Gate 1 is met.</p>
        </aside>
      </div>
    </>
  )
}
