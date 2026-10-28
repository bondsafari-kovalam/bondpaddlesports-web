import type { Metadata } from 'next'
import { ArrowRight, MapPin } from 'lucide-react'
import { DataTable, Note, PageIntro, PortalSection, StatGrid } from '@/components/investor/portal-ui'
import {
  ACADEMY, ACADEMY_PRICES, ACADEMY_PRICES_NOTE, CAPACITY, CAPACITY_NOTE, CAPACITY_POINTS, DRIVERS, FLYWHEEL, HUBS, MARKET, MARKET_NOTE, MARKET_SOURCES,
  MEMBERSHIP, MEMBERSHIP_NOTE, MEMBERSHIP_REVENUE, PHASES, PRICE_GAP, PROJECTIONS, PROJECTIONS_NOTE, PROJECTION_YEARS, SHOP, SHOP_NOTE, SHOP_STATS,
  SITE_ECONOMICS, SITE_NOTE, SITE_POINTS, TEAM, WHY_NOW, WHY_NOW_SOURCES,
} from '@/lib/investor/round-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Business plan' }

const SECTIONS = [
  ['why-now', 'Why now'], ['market', 'Market'], ['strategy', 'Strategy'], ['expansion', 'Expansion'], ['site-economics', 'Site economics'],
  ['capacity', 'Capacity'], ['projections', 'Projections'], ['academy', 'Academy'], ['shop', 'Shop'], ['membership', 'Membership'], ['team', 'Team'],
]

const Points = ({ items }: { items: { title: string; text: string }[] }) => (
  <ul className={`mt-5 grid gap-4 ${items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>{items.map((p) => (
    <li key={p.title} className="rounded-2xl border border-line bg-paper-bright p-5"><p className="font-display text-base font-bold">{p.title}</p><p className="mt-1.5 text-sm leading-6 text-slate-strong">{p.text}</p></li>
  ))}</ul>
)

export default async function InvestorBusinessPlan() {
  await requireInvestorSession()
  return (
    <>
      <PageIntro eyebrow="Business plan" title="Four revenue drivers, built around one customer">
        <p>The market, the strategy, the expansion plan and the base-case numbers behind the round.</p>
      </PageIntro>

      <nav aria-label="Business plan sections" className="mt-6 flex flex-wrap gap-2">
        {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-line bg-paper-bright px-3.5 py-1.5 text-xs font-semibold text-slate-strong transition hover:border-ink hover:text-ink">{label}</a>)}
      </nav>

      <div className="mt-10 space-y-14">
        <PortalSection id="why-now" eyebrow="Why now" title="Record visitors, a live concession, and almost no certified competition" source="deck">
          <ul className="grid gap-4 sm:grid-cols-2">{WHY_NOW.map((w) => (
            <li key={w.value} className="rounded-2xl border-l-4 border-sand bg-paper-bright p-5"><p className="font-display text-2xl font-black tracking-tight">{w.value}</p><p className="mt-1.5 text-sm leading-6 text-slate-strong">{w.text}</p></li>
          ))}</ul>
          <Note>Sources: {WHY_NOW_SOURCES}.</Note>
        </PortalSection>

        <PortalSection id="market" eyebrow="Market size" title="A ₹35–70 Cr paddle market in Kerala, inside a much larger tourism economy" source="deck">
          <ol className="space-y-2">{MARKET.map((m, i) => (
            <li key={m.label} className={`flex flex-col gap-1 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between ${i === 2 ? 'bg-teal text-white' : i === 3 ? 'bg-ink text-white' : 'bg-mist'}`} style={{ marginInline: `${i * 3}%` }}>
              <span className="text-sm font-semibold">{m.label}</span><span className="font-display text-xl font-black tracking-tight">{m.value}</span>
            </li>
          ))}</ol>
          <Note>{MARKET_NOTE} Sources: {MARKET_SOURCES}.</Note>

          <h3 className="mt-10 font-display text-xl font-bold tracking-tight">The gap we fill: between a ₹300 pedal boat and a ₹5,500 resort paddle, there is almost nothing</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[PRICE_GAP.low, PRICE_GAP.bond, PRICE_GAP.high].map((p, i) => (
              <div key={p.value} className={`rounded-2xl p-4 ${i === 1 ? 'bg-sand text-ink' : 'bg-mist'}`}><p className="font-display text-lg font-black">{p.value}</p><p className="mt-1 text-xs leading-5">{p.label}</p></div>
            ))}
          </div>
          <Points items={PRICE_GAP.points} />
          <Note>Sources: {PRICE_GAP.sources}.</Note>
        </PortalSection>

        <PortalSection id="strategy" eyebrow="Our strategy" title="Four revenue drivers" source="deck">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{DRIVERS.map((d, i) => (
            <li key={d.name} className={`rounded-2xl bg-ink p-5 text-white ${d.upside ? 'border-2 border-dashed border-teal-pale/60' : ''}`}>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">{i + 1} · {d.name}</p>
              <p className="mt-3 font-display text-3xl font-black tracking-tight text-sand">{d.value}</p>
              <p className="mt-2 text-sm leading-6 text-white/75">{d.text}</p>
            </li>
          ))}</ul>
          <p className="mt-5 rounded-2xl bg-sand-soft p-4 text-sm leading-6 text-ink"><strong>The flywheel:</strong> {FLYWHEEL}</p>
          <Note>FY31 base case, total revenue ₹21.9 Cr.</Note>
        </PortalSection>

        <PortalSection id="expansion" eyebrow="Where we will operate" title="18 destinations, 4 hubs, opened in four phases" source="deck">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{PHASES.map((phase, p) => (
            <li key={phase.name} className="rounded-2xl border border-line bg-paper-bright p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-teal-strong">{phase.name}</p>
              <ol className="mt-3 space-y-1.5 text-sm" start={PHASES.slice(0, p).reduce((n, x) => n + x.sites.length, 1)}>{phase.sites.map((site) => <li key={site} className="flex gap-2"><MapPin className="mt-0.5 size-3.5 shrink-0 text-teal" aria-hidden />{site}</li>)}</ol>
            </li>
          ))}</ol>
          <Note>{HUBS}</Note>
        </PortalSection>

        <PortalSection id="site-economics" eyebrow="Site economics" title="A strong site repays its kit in one season" source="deck">
          <DataTable caption="Site economics at steady state" head={['Site type', 'Revenue a year', 'Site EBITDA', 'Margin', 'Repays its kit in']} numeric={[1, 2, 3, 4]} rows={SITE_ECONOMICS} />
          <Points items={SITE_POINTS} />
          <Note>{SITE_NOTE}</Note>
        </PortalSection>

        <PortalSection id="capacity" eyebrow="The business at different levels of capacity" title="We break even at 42% of capacity; the plan reaches 58% by FY31" source="deck">
          <DataTable caption="Results at different capacity levels" head={['Capacity used', 'Paddlers', 'Learners', 'Revenue', 'EBITDA', 'Profit after tax', 'Value at 5× EBITDA']} numeric={[1, 2, 3, 4, 5, 6]} highlight={[1, 2]} rows={CAPACITY} />
          <Points items={CAPACITY_POINTS} />
          <Note>{CAPACITY_NOTE}</Note>
        </PortalSection>

        <PortalSection id="projections" eyebrow="Projections, base case" title="Profitable from FY29, ₹25 Cr of revenue by FY33" source="deck">
          <DataTable caption="Base-case projections FY27 to FY33" head={['₹ Cr unless stated', ...PROJECTION_YEARS]} numeric={[1, 2, 3, 4, 5, 6, 7]} highlight={PROJECTIONS.flatMap((p, i) => (p.highlight ? [i] : []))} rows={PROJECTIONS.map((p) => [p.label, ...p.values])} />
          <Note>{PROJECTIONS_NOTE}</Note>
          <a href="/investor/documents/projections/download" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-teal underline-offset-4 hover:underline">Download as spreadsheet (CSV) <ArrowRight className="size-4" aria-hidden /></a>
        </PortalSection>

        <PortalSection id="academy" eyebrow="Strategy 1 · Bond Safari Paddle Sports Academy" title="Kerala’s first accredited paddle school, and our highest-margin business" source="deck">
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-5">{ACADEMY.ladder.map((l, i) => (
            <li key={l.step} className="bg-paper-bright p-4"><p className="font-display text-base font-bold">{i + 1} · {l.step}</p><p className="mt-1 text-xs leading-5 text-slate-strong">{l.text}</p></li>
          ))}</ol>
          <div className="mt-4"><StatGrid stats={ACADEMY.stats} /></div>
          <Note>{ACADEMY.campuses} {ACADEMY.note}</Note>

          <details className="group mt-8 rounded-2xl border border-line bg-paper-bright">
            <summary className="flex min-h-12 cursor-pointer list-none flex-wrap items-center justify-between gap-2 px-5 py-3 font-display text-base font-bold">
              Academy price list, 2027 <span className="text-xs font-semibold text-teal group-open:hidden">Show prices</span><span className="hidden text-xs font-semibold text-teal group-open:inline">Hide prices</span>
            </summary>
            <div className="space-y-6 border-t border-line p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-teal-strong">Source: Paddle UK Qualification Pathway guide, 2027</p>
              {ACADEMY_PRICES.map((g) => (
                <div key={g.group}>
                  <h3 className="mb-2 text-xs font-extrabold uppercase tracking-[0.15em] text-slate-strong">{g.group}</h3>
                  <DataTable caption={g.group} head={['Course', 'Duration', 'Price']} numeric={[2]} rows={g.rows} />
                </div>
              ))}
              <Note>{ACADEMY_PRICES_NOTE}</Note>
            </div>
          </details>
        </PortalSection>

        <PortalSection id="shop" eyebrow="Strategy 3 · Bond Safari Shop" title="Everyone who paddles needs something to wear and something to paddle with" source="deck">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <DataTable caption="Shop range, proposed prices and gross margin" head={['Range', 'Price (proposed)', 'Gross margin']} numeric={[2]} rows={SHOP} />
            <div className="grid content-start gap-px overflow-hidden rounded-2xl bg-line">{SHOP_STATS.map((s) => (
              <div key={s.label} className="bg-paper-bright p-5"><p className="font-display text-3xl font-black tracking-tight">{s.value}</p><p className="mt-1 text-xs text-slate">{s.label}</p></div>
            ))}</div>
          </div>
          <Note>{SHOP_NOTE}</Note>
        </PortalSection>

        <PortalSection id="membership" eyebrow="Strategy 2 · Bond Safari Membership" title="A loyalty programme that turns one-time tourists into regulars" source="deck">
          <ul className="grid gap-4 md:grid-cols-3">{MEMBERSHIP.map((m) => (
            <li key={m.name} className="rounded-2xl border border-line bg-paper-bright p-5"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-teal-strong">{m.tier}</p><p className="mt-1 font-display text-lg font-bold">{m.name}</p><p className="mt-1.5 text-sm leading-6 text-slate-strong">{m.text}</p></li>
          ))}</ul>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">{MEMBERSHIP_REVENUE.map((m) => (
            <li key={m.title} className="rounded-2xl bg-ink p-5 text-white"><p className="font-display text-xl font-black text-sand">{m.title}</p><p className="mt-1.5 text-sm leading-6 text-white/75">{m.text}</p></li>
          ))}</ul>
          <Note>{MEMBERSHIP_NOTE}</Note>
        </PortalSection>

        <PortalSection id="team" eyebrow="The team" title="Operators who have run water sports for decades" source="deck">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{TEAM.map((t) => (
            <li key={t.name} className="rounded-2xl border border-line bg-paper-bright p-5"><p className="font-display text-lg font-bold">{t.name}</p><p className="mt-1 text-sm text-slate">{t.role}</p></li>
          ))}</ul>
          <a href="/about#team" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-teal underline-offset-4 hover:underline">Full biographies on the website <ArrowRight className="size-4" aria-hidden /></a>
        </PortalSection>
      </div>
    </>
  )
}
