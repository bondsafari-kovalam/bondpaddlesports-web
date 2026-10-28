'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import type { HubId, Spoke, SpokeStatus, WaveId } from '@/lib/investor/network-data'

const WAVE_LABELS: Record<WaveId, string> = {
  operating: 'Operating',
  'wave-1': 'Wave 1 · Jan 2027–FY28',
  'wave-2': 'Wave 2 · FY28–FY29',
  'wave-3': 'Wave 3 · FY30–FY31',
  pipeline: 'Pipeline · FY32+',
}

const STATUS_STYLES: Record<SpokeStatus, { label: string; className: string }> = {
  operating: { label: 'Operating (per source)', className: 'bg-success-soft text-success' },
  proposed: { label: 'Proposed', className: 'bg-mist text-teal-strong' },
  conditional: { label: 'Conditional', className: 'bg-sand-soft text-sand-ink' },
  academy: { label: 'Academy use', className: 'bg-teal/10 text-teal-strong' },
  pipeline: { label: 'Unfunded pipeline', className: 'bg-white text-slate-strong ring-1 ring-line' },
}

const notStated = <span className="text-slate">Not stated in the source summary</span>

/** Searchable list of every network destination; each row opens to show its market, competition and dependency. */
export function DestinationTable({ spokes, hubNames }: { spokes: Spoke[]; hubNames: Record<HubId, string> }) {
  const [query, setQuery] = useState('')
  const [hub, setHub] = useState<HubId | 'all'>('all')
  const [sort, setSort] = useState<'score' | 'wave'>('wave')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const waveOrder = Object.keys(WAVE_LABELS)
    return spokes
      .filter((s) => (hub === 'all' || s.hub === hub) && (!q || s.name.toLowerCase().includes(q)))
      .sort((a, b) => sort === 'score' ? (b.score ?? -1) - (a.score ?? -1) : waveOrder.indexOf(a.wave) - waveOrder.indexOf(b.wave) || (b.score ?? -1) - (a.score ?? -1))
  }, [spokes, query, hub, sort])

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search destinations</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search destinations" className={`h-11 w-full rounded-full border border-line bg-paper-bright pl-11 pr-4 text-sm ${focusRing}`} />
        </label>
        <div className="flex gap-2">
          <select value={hub} onChange={(e) => setHub(e.target.value as HubId | 'all')} aria-label="Filter by hub" className={`h-11 rounded-full border border-line bg-paper-bright px-4 text-sm font-semibold ${focusRing}`}>
            <option value="all">All hubs</option>
            {(Object.keys(hubNames) as HubId[]).map((id) => <option key={id} value={id}>{hubNames[id]}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as 'score' | 'wave')} aria-label="Sort by" className={`h-11 rounded-full border border-line bg-paper-bright px-4 text-sm font-semibold ${focusRing}`}>
            <option value="wave">By rollout</option>
            <option value="score">By score</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate" role="status" aria-live="polite">{rows.length} of {spokes.length} destinations</p>

      <div className="mt-2 overflow-hidden rounded-2xl border border-line bg-paper-bright">
        <div className="hidden grid-cols-[1.6fr_1fr_1.1fr_1.3fr_1fr_1.5rem] gap-4 bg-mist px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-strong lg:grid">
          <span>Destination</span><span>Regional hub</span><span>Assessment score</span><span>Proposed phase</span><span>Status</span><span />
        </div>
        <ul className="divide-y divide-line">
          {rows.map((s) => {
            const status = STATUS_STYLES[s.status]
            return (
              <li key={s.name}>
                <details className="group">
                  <summary className={`grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-4 transition hover:bg-mist/50 lg:grid-cols-[1.6fr_1fr_1.1fr_1.3fr_1fr_1.5rem] ${focusRing}`}>
                    <span className="font-display text-base font-bold">{s.name}</span>
                    <ChevronDown className="size-4 text-slate transition group-open:rotate-180 lg:order-last" aria-hidden />
                    <span className="text-sm text-slate-strong"><span className="text-slate lg:hidden">Hub: </span>{s.hub ? hubNames[s.hub] : 'Not assigned'}</span>
                    <span className="col-span-2 flex items-center gap-3 lg:col-span-1">
                      {s.score !== undefined
                        ? <><span className="w-7 font-display text-base font-black tabular-nums">{s.score}</span><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line" aria-hidden><span className="block h-full rounded-full bg-teal" style={{ width: `${s.score}%` }} /></span></>
                        : <span className="text-xs text-slate">Not scored</span>}
                    </span>
                    <span className="text-sm text-slate-strong">{WAVE_LABELS[s.wave]}</span>
                    <span><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${status.className}`}>{status.label}</span></span>
                  </summary>
                  <dl className="grid gap-4 border-t border-line bg-mist/40 px-5 py-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-slate">Market opportunity</dt><dd className="mt-1 leading-6">{s.market ?? notStated}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-slate">Competitive landscape</dt><dd className="mt-1 leading-6">{s.competition ?? notStated}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-slate">Key dependency or approval</dt><dd className="mt-1 leading-6">{s.dependency}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-slate">In the 18-site deck plan</dt><dd className="mt-1 leading-6">{s.inDeckPlan ? 'Yes' : 'No, outside the funded base case'}{s.hubNote && <span className="mt-1 block text-xs text-slate">{s.hubNote}</span>}</dd></div>
                  </dl>
                </details>
              </li>
            )
          })}
        </ul>
        {rows.length === 0 && <p className="px-5 py-10 text-center text-sm text-slate">No destinations match. Try another name or hub.</p>}
      </div>
    </div>
  )
}
