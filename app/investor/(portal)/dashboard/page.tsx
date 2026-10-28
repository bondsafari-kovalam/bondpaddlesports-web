import type { Metadata } from 'next'
import { ArrowRight, CalendarDays, FileText, Mail, Megaphone, Phone } from 'lucide-react'
import { PageIntro, PortalCard, SourceBadge, StatGrid } from '@/components/investor/portal-ui'
import { DOCUMENTS, UPDATES, upcomingMilestones } from '@/lib/investor/content'
import { CONFIDENTIAL_LINE, HEADLINE, INVESTOR_CONTACT, INVITATION, PROJECTIONS, PROJECTION_YEARS } from '@/lib/investor/round-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Dashboard' }

const link = 'inline-flex items-center gap-1.5 text-sm font-semibold text-teal underline-offset-4 hover:underline'

export default async function InvestorDashboard() {
  const session = await requireInvestorSession()
  const signedIn = new Date(session.iat * 1000).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })
  const milestones = upcomingMilestones()
  const fy31 = PROJECTION_YEARS.indexOf('FY31')
  const row = (label: string) => PROJECTIONS.find((p) => p.label === label)?.values[fy31]

  return (
    <>
      <PageIntro eyebrow="Dashboard" title="Welcome to Bond Paddle Sports Investor Portal">
        <p>Kerala’s certified paddle-sports network: experiences on the water, an accredited Academy, a membership club and a shop. Everything here comes from the Friends &amp; Family round deck.</p>
        <p className="mt-2 text-sm text-slate">Signed in as administrator · Session started {signedIn} IST</p>
      </PageIntro>

      <section aria-labelledby="round-title" className="mt-10 rounded-3xl bg-ink p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Friends &amp; Family round · October 2026</p>
            <h2 id="round-title" className="mt-2 font-display text-2xl font-black tracking-tight sm:text-3xl">Bond Safari Paddle Sports Pvt Ltd</h2>
          </div>
          <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70">{CONFIDENTIAL_LINE}</span>
        </div>
        <div className="mt-6"><StatGrid stats={HEADLINE} tone="dark" /></div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <a href="/investor/round" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-sand underline-offset-4 hover:underline">Round terms, use of funds and exits <ArrowRight className="size-4" aria-hidden /></a>
          <a href="/investor/business-plan" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-sand underline-offset-4 hover:underline">Business plan and projections <ArrowRight className="size-4" aria-hidden /></a>
        </div>
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {INVITATION.map((item) => (
          <section key={item.title} aria-label={item.title} className="rounded-2xl border border-line bg-paper-bright p-6">
            <h2 className="font-display text-lg font-bold tracking-tight">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-strong">{item.text}</p>
          </section>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <PortalCard title="Upcoming milestones" source="deck">
          {milestones.length
            ? <ol className="space-y-3">{milestones.map((m) => (
                <li key={m.title} className="flex gap-3"><CalendarDays className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden /><div><p className="text-sm font-semibold">{m.title}</p><p className="text-xs text-slate">{m.when}</p></div></li>
              ))}</ol>
            : <p className="text-sm text-slate">No upcoming milestones from the round deck.</p>}
          <p className="mt-4 text-xs leading-5 text-slate">The ₹1.50 Cr second close happens only if Gate 1 is met.</p>
        </PortalCard>

        <PortalCard title="FY31 base case at a glance" source="deck">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {[['Revenue', `₹${row('Revenue')} Cr`], ['EBITDA', `₹${row('EBITDA')} Cr`], ['Profit after tax', `₹${row('Profit after tax')} Cr`], ['Operating sites', row('Operating sites')]].map(([label, value]) => (
              <div key={label}><dt className="text-xs font-bold uppercase tracking-wider text-slate">{label}</dt><dd className="mt-1 font-display text-2xl font-black tracking-tight">{value}</dd></div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-5 text-slate">Projections are estimates, not guarantees.</p>
          <a href="/investor/business-plan#projections" className={`${link} mt-3`}>Full projections, FY27–FY33 <ArrowRight className="size-4" aria-hidden /></a>
        </PortalCard>

        <PortalCard title="Latest updates" source="deck">
          <ul className="divide-y divide-line">{UPDATES.slice(0, 3).map((u) => (
            <li key={u.id} className="flex gap-3 py-3 first:pt-0"><Megaphone className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden /><div><p className="text-sm font-semibold">{u.title}</p><p className="text-xs text-slate">{u.kind} · {u.when}</p></div></li>
          ))}</ul>
          <a href="/investor/updates" className={`${link} mt-4`}>All updates <ArrowRight className="size-4" aria-hidden /></a>
        </PortalCard>

        <PortalCard title="Documents">
          <ul className="divide-y divide-line">{DOCUMENTS.slice(0, 4).map((d) => (
            <li key={d.id} className="flex gap-3 py-3 first:pt-0"><FileText className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden /><div><p className="text-sm font-semibold">{d.title}</p><p className="text-xs text-slate">{d.category} · {d.status}</p></div></li>
          ))}</ul>
          <a href="/investor/documents" className={`${link} mt-4`}>Document library ({DOCUMENTS.length}) <ArrowRight className="size-4" aria-hidden /></a>
        </PortalCard>

        <PortalCard title="Company performance" source="pending">
          <p className="text-sm leading-6 text-slate-strong">The new company starts operating in January 2027. Actual results will be reported here from then. Quarterly reports are one of your investor rights.</p>
          <p className="mt-4 text-xs leading-5 text-slate">The figures above and in the business plan are base-case projections, not results.</p>
        </PortalCard>

        <PortalCard title="Investor contact">
          <p className="font-display text-lg font-bold">{INVESTOR_CONTACT.name}</p>
          <p className="text-sm text-slate">{INVESTOR_CONTACT.role}</p>
          <ul className="mt-4 space-y-2 text-sm font-semibold">
            <li><a href={`tel:${INVESTOR_CONTACT.phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center gap-2 text-teal hover:underline"><Phone className="size-4" aria-hidden />{INVESTOR_CONTACT.phone}</a></li>
            <li><a href={`mailto:${INVESTOR_CONTACT.email}`} className="inline-flex min-h-11 items-center gap-2 text-teal hover:underline"><Mail className="size-4" aria-hidden />{INVESTOR_CONTACT.email}</a></li>
          </ul>
        </PortalCard>
      </div>

      <p className="mt-8 flex flex-wrap items-center gap-2 text-xs text-slate"><SourceBadge source="deck" />Figures from the round deck are indicative and subject to legal documents.</p>
    </>
  )
}
