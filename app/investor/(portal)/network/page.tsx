import type { Metadata } from 'next'
import { AlertTriangle, ArrowRight, CircleDashed, MapPin } from 'lucide-react'
import { DestinationTable } from '@/components/investor/destination-table'
import { Note, PageIntro, PortalSection } from '@/components/investor/portal-ui'
import {
  CRITERIA, DIFFERENTIATION, FINANCE_POINTS, FINANCE_ROWS, HUB_NAMES, HUBS, MODEL_POINTS, NETWORK_DISCREPANCIES, NETWORK_KPIS, NETWORK_SOURCE_NOTE,
  OPPORTUNITIES, RATIONALE, READINESS_CHECKLIST, RISKS, SPOKES, WAVES,
} from '@/lib/investor/network-data'
import { PROJECTIONS, PROJECTION_YEARS } from '@/lib/investor/round-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Expansion network' }

const SECTIONS = [
  ['strategy', 'Strategy'], ['hubs', 'Hubs'], ['destinations', 'Destinations'], ['roadmap', 'Roadmap'], ['methodology', 'Scoring'],
  ['opportunities', 'Opportunities'], ['financial-plan', 'Financial plan'], ['risks', 'Risks'], ['readiness', 'Readiness'], ['sources', 'Sources'],
]

const LAYERS = [
  { label: 'Operating now', count: '2', text: 'The two Muziris sites, per the source document.', className: 'bg-sand text-ink' },
  { label: 'Initial expansion', count: 'Wave 1', text: 'Trivandrum and Ernakulam priorities, from January 2027.', className: 'bg-teal text-white' },
  { label: 'Later opportunities', count: 'Waves 2–3', text: 'Kozhikode and Kasaragod hubs and further spokes, FY28–FY31.', className: 'bg-ink-soft text-white' },
  { label: 'Unfunded pipeline', count: 'FY32+', text: 'No funding or financial model behind these yet.', className: 'border border-dashed border-white/30 text-white' },
]

const WAVE_DOT: Record<string, string> = { operating: 'bg-sand', 'wave-1': 'bg-teal', 'wave-2': 'bg-teal-strong', 'wave-3': 'bg-ink', pipeline: 'border-2 border-dashed border-slate bg-paper-bright' }

const link = 'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-teal underline-offset-4 hover:underline'

export default async function InvestorNetwork() {
  await requireInvestorSession()
  const sites = PROJECTIONS.find((p) => p.label === 'Operating sites')?.values ?? []
  const spokesFor = (hub: string) => SPOKES.filter((s) => s.hub === hub)

  return (
    <>
      <PageIntro eyebrow="Expansion network" title="Four hubs, one connected network">
        <p>How Bond plans to grow from two Muziris sites into a regional network across Kerala, in stages, with each step depending on the one before it.</p>
      </PageIntro>

      <nav aria-label="Expansion network sections" className="mt-6 flex flex-wrap gap-2">
        {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-line bg-paper-bright px-3.5 py-1.5 text-xs font-semibold text-slate-strong transition hover:border-ink hover:text-ink">{label}</a>)}
      </nav>

      {/* Executive overview */}
      <section aria-labelledby="overview-title" className="relative mt-10 overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-10">
        <div className="absolute -right-24 -top-24 size-72 rounded-full border-[36px] border-teal-bright/10" aria-hidden />
        <div className="relative">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Executive overview · Network plan, 28 Oct 2026</p>
          <h2 id="overview-title" className="mt-3 max-w-3xl font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">A 31-spoke opportunity, <span className="text-sand">funded 18 sites at a time.</span></h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">Four regional hubs coordinate nearby destinations. The investor plan covers 18 sites. The other 13 are an unfunded pipeline, and the network opens in waves rather than all at once.</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-3 lg:grid-cols-5">
            {NETWORK_KPIS.map((k) => (
              <div key={k.label} className="flex flex-col bg-ink p-5">
                <dt className="mt-1 text-xs font-bold text-white/80">{k.label}</dt>
                <dd className="order-first font-display text-4xl font-black tracking-tight text-sand">{k.value}</dd>
                <dd className="mt-2 text-xs leading-5 text-white/55">{k.text}</dd>
              </div>
            ))}
          </dl>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LAYERS.map((l) => (
              <li key={l.label} className={`rounded-2xl p-5 ${l.className}`}>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-75">{l.label}</p>
                <p className="mt-2 font-display text-2xl font-black tracking-tight">{l.count}</p>
                <p className="mt-1.5 text-xs leading-5 opacity-80">{l.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-xs leading-5 text-white/55">None of the 31 destinations beyond the two Muziris sites is operating or fully approved.</p>
        </div>
      </section>

      <div className="mt-14 space-y-14">
        <PortalSection id="strategy" eyebrow="Our expansion strategy" title="Four hubs, one connected network" source="network">
          <div className="grid gap-4 md:grid-cols-2">
            {MODEL_POINTS.map((m, i) => (
              <div key={m.title} className="flex gap-4 rounded-2xl border border-line bg-paper-bright p-5">
                <span className={`mt-1 flex size-10 shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-ink text-sand' : 'border-2 border-teal text-teal'}`} aria-hidden>{i === 0 ? <span className="size-3 rounded-full bg-sand" /> : <MapPin className="size-4" />}</span>
                <div><p className="font-display text-lg font-bold">{m.title}</p><p className="mt-1 text-sm leading-6 text-slate-strong">{m.text}</p></div>
              </div>
            ))}
          </div>
          <h3 className="mt-10 font-display text-xl font-bold tracking-tight">Why a hub-and-spoke network</h3>
          <ol className="mt-4 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-5">
            {RATIONALE.map((r, i) => (
              <li key={r.title} className="bg-paper-bright p-5"><span className="text-xs font-bold text-teal">0{i + 1}</span><p className="mt-3 font-display text-base font-bold">{r.title}</p><p className="mt-1 text-xs leading-5 text-slate-strong">{r.text}</p></li>
            ))}
          </ol>
          <Note>These are the intended benefits of the model. Cost savings and profitability are not guaranteed.</Note>
        </PortalSection>

        <PortalSection id="hubs" eyebrow="The four regional hubs" title="From Kovalam in the south to Nileshwar in the north" source="network">
          <ol className="grid gap-5 lg:grid-cols-2">
            {HUBS.map((h) => (
              <li key={h.id} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper-bright">
                <div className="bg-ink p-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Hub {h.number}</p>
                      <h3 className="mt-1 font-display text-3xl font-black tracking-tight">{h.name}</h3>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">{spokesFor(h.id).length} spokes</span>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{h.summary}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm"><span className="flex size-6 items-center justify-center rounded-full bg-sand" aria-hidden><span className="size-2 rounded-full bg-ink" /></span><span className="text-white/60">Proposed base:</span> <span className="font-semibold">{h.base}</span></p>
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-teal-strong">Initial priorities</p>
                    <ul className="mt-2 flex flex-wrap gap-2">{h.priority.map((p) => <li key={p} className="rounded-full bg-teal px-3 py-1.5 text-xs font-semibold text-white">{p}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate">Later opportunities</p>
                    <ul className="mt-2 flex flex-wrap gap-2">{h.later.map((p) => <li key={p} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-slate-strong">{p}</li>)}</ul>
                  </div>
                  {h.note && <p className="mt-auto rounded-2xl bg-sand-soft p-4 text-xs leading-5 text-ink">{h.note}</p>}
                </div>
              </li>
            ))}
          </ol>
          <Note>Bases are proposals. No coordinates, travel distances, facilities or site agreements are implied.</Note>
        </PortalSection>

        <PortalSection id="destinations" eyebrow="Destination priorities" title="Every destination, its score and what it depends on" source="network">
          <DestinationTable spokes={SPOKES} hubNames={HUB_NAMES} />
          <div className="mt-5 rounded-2xl border-l-4 border-sand bg-paper-bright p-5 text-sm leading-6 text-slate-strong">
            <p><strong className="text-ink">Scores are preliminary desk assessments,</strong> not independently verified market research or a prediction of success. Every location still needs a site visit, demand validation, a competition check and permission checks before investment is approved.</p>
            <p className="mt-2">Rollout order is not set by score alone: strategic value, Academy use, seasonality and permissions also matter. That is why Kodenchery (60) has a role while higher-scoring sites wait.</p>
          </div>
        </PortalSection>

        <PortalSection id="roadmap" eyebrow="Rollout roadmap" title="Opened in waves, each one earned by the last" source="network">
          <ol className="relative space-y-4 lg:grid lg:grid-cols-5 lg:gap-4 lg:space-y-0">
            <span className="absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-px bg-line lg:left-3 lg:top-[11px] lg:h-px lg:w-[calc(100%-1.5rem)]" aria-hidden />
            {WAVES.map((w) => (
              <li key={w.id} className="relative pl-10 lg:pl-0 lg:pt-10">
                <span className={`absolute left-0 top-0 size-6 rounded-full ring-4 ring-paper ${WAVE_DOT[w.id]}`} aria-hidden />
                <div className={`h-full rounded-2xl p-5 ${w.id === 'pipeline' ? 'border border-dashed border-ink/20' : 'border border-line bg-paper-bright'}`}>
                  <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-teal-strong">{w.when}</p>
                  <p className="mt-1 font-display text-lg font-bold">{w.name}</p>
                  <p className="mt-1 text-xs leading-5 text-slate">{w.text}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">{w.sites.map((s) => <li key={s} className="flex gap-2 leading-5"><MapPin className="mt-0.5 size-3.5 shrink-0 text-teal" aria-hidden />{s}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
          <Note>Only the Muziris sites are operating, as recorded in the source document in October 2026. Every later date is proposed, not confirmed, and depends on funding, permissions, demand and operational readiness.</Note>
        </PortalSection>

        <PortalSection id="methodology" eyebrow="How sites are scored" title="Five weighted criteria, one score out of 100" source="network">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <ul className="space-y-5">
              {CRITERIA.map((c) => (
                <li key={c.name}>
                  <div className="flex items-baseline justify-between gap-3"><p className="font-display text-base font-bold">{c.name}</p><p className="font-display text-xl font-black tabular-nums text-teal-strong">{c.weight}%</p></div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line" aria-hidden><div className="h-full rounded-full bg-teal" style={{ width: `${(c.weight / 30) * 100}%` }} /></div>
                  <p className="mt-2 text-sm leading-6 text-slate-strong">{c.text}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-ink p-6 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">In plain terms</p>
              <p className="mt-3 text-sm leading-6 text-white/80">Half of every score comes from whether people will come and whether the water works. The rest weighs competition, how hard it is to get permission, and how well the site fits its hub.</p>
              <p className="mt-4 text-xs leading-5 text-white/55">Scores are preliminary and must be validated through local research.</p>
            </div>
          </div>
        </PortalSection>

        <PortalSection id="opportunities" eyebrow="Market opportunity" title="Where the openings are, and how Bond could stand out" source="network">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OPPORTUNITIES.map((o) => <li key={o.places} className="rounded-2xl border-l-4 border-teal bg-paper-bright p-5"><p className="font-display text-base font-bold">{o.places}</p><p className="mt-1.5 text-sm leading-6 text-slate-strong">{o.text}</p></li>)}
          </ul>
          <div className="mt-6 rounded-2xl bg-sand-soft p-5">
            <p className="text-sm leading-6 text-ink">Established destinations can have strong demand but also heavy competition. Options for standing out include:</p>
            <ul className="mt-3 flex flex-wrap gap-2">{DIFFERENTIATION.map((d) => <li key={d} className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink">{d}</li>)}</ul>
            <p className="mt-3 text-xs leading-5 text-ink/70">These are strategic options, not services already delivered at these destinations.</p>
          </div>
        </PortalSection>

        <PortalSection id="financial-plan" eyebrow="Financial plan and expansion dependencies" title="The projections cover 18 sites. The wider network is not in the numbers." source="network">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="overflow-hidden rounded-2xl border border-line bg-paper-bright">
              <ul className="divide-y divide-line">
                {FINANCE_ROWS.map((r) => (
                  <li key={r.scope} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div><p className="font-semibold">{r.scope}</p><p className="text-xs text-slate">{r.sites}</p></div>
                    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${r.modelled ? 'bg-success-soft text-success' : 'bg-mist text-slate-strong'}`}>{!r.modelled && <CircleDashed className="size-3.5" aria-hidden />}{r.status}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-paper-bright p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-strong">Operating sites in the base case</p>
              <ol className="mt-4 flex items-end gap-2" aria-label="Operating sites by year, base case">
                {PROJECTION_YEARS.map((y, i) => (
                  <li key={y} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-xs font-bold tabular-nums">{sites[i]}</span>
                    <span className="w-full rounded-t-md bg-teal" style={{ height: `${(Number(sites[i]) / 18) * 96}px` }} aria-hidden />
                    <span className="text-[10px] text-slate">{y}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs leading-5 text-slate">From the round deck. The count stays at 18 after FY31: no further spokes are modelled.</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-strong">{FINANCE_POINTS.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />{p}</li>)}</ul>
          <div className="mt-4 flex flex-wrap gap-x-6">
            <a href="/investor/business-plan#projections" className={link}>Base-case projections <ArrowRight className="size-4" aria-hidden /></a>
            <a href="/investor/round#funds" className={link}>Use of funds <ArrowRight className="size-4" aria-hidden /></a>
          </div>
          <Note>The 18-site projections are unchanged. No revenue, profit or valuation is added for the wider network.</Note>
        </PortalSection>

        <PortalSection id="risks" eyebrow="Expansion risks & due diligence" title="What each new site has to prove first" source="network">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RISKS.map((r) => (
              <li key={r.title} className={`rounded-2xl border bg-paper-bright p-5 ${r.flag ? 'border-sand md:col-span-2 lg:col-span-3' : 'border-line'}`}>
                <p className="font-display text-base font-bold">{r.title}</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-strong">{r.points.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />{p}</li>)}</ul>
                {r.flag && <p className="mt-4 flex gap-2.5 rounded-xl bg-sand-soft p-4 text-sm leading-6 text-ink"><AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />{r.flag}</p>}
              </li>
            ))}
          </ul>
        </PortalSection>

        <PortalSection id="readiness" eyebrow="Site readiness checklist" title="What has to be true before a site opens">
          <div className="overflow-hidden rounded-2xl border border-line bg-paper-bright">
            <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
              {READINESS_CHECKLIST.map((item, i) => (
                <li key={item} className={`flex items-center justify-between gap-3 px-5 py-3.5 text-sm ${i >= 2 ? 'sm:border-t sm:border-line' : ''} ${i % 2 === 0 ? 'sm:border-r sm:border-line' : ''}`}>
                  <span className="flex items-center gap-3"><CircleDashed className="size-4 shrink-0 text-slate" aria-hidden />{item}</span>
                  <span className="shrink-0 rounded-full bg-mist px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-strong">Not verified</span>
                </li>
              ))}
            </ul>
          </div>
          <Note>Items are marked complete only when there is evidence. None has been evidenced in the portal yet.</Note>
        </PortalSection>

        <PortalSection id="sources" eyebrow="Supporting documents and source notes" title="Where this comes from, and what still needs reconciling">
          <p className="text-sm leading-6 text-slate-strong">{NETWORK_SOURCE_NOTE}</p>
          <h3 className="mt-6 font-display text-lg font-bold">Differences from the round deck</h3>
          <p className="mt-1 text-sm text-slate">The deck’s figures stand until these are reconciled by the Bond team.</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-strong">{NETWORK_DISCREPANCIES.map((d) => <li key={d} className="flex gap-2.5"><AlertTriangle className="mt-1 size-3.5 shrink-0 text-sand-ink" aria-hidden />{d}</li>)}</ul>
          <a href="/investor/documents" className={`${link} mt-4`}>Document library <ArrowRight className="size-4" aria-hidden /></a>
        </PortalSection>
      </div>
    </>
  )
}
