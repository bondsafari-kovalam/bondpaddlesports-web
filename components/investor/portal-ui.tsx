import type { ReactNode } from 'react'
import { BookOpen, Clock, Lock, Network } from 'lucide-react'
import type { ContentSource } from '@/lib/investor/content'

const badge = 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider'

/** Every block says where its content comes from, so plan figures can't pass for actual results. */
export function SourceBadge({ source }: { source: ContentSource }) {
  if (source === 'deck') return <span className={`${badge} bg-teal/10 text-teal-strong`}><Lock className="size-3" aria-hidden />Round deck · Oct 2026</span>
  if (source === 'network') return <span className={`${badge} bg-sand-soft text-sand-ink`}><Network className="size-3" aria-hidden />Network plan · prelim · 28 Oct 2026</span>
  if (source === 'pathway') return <span className={`${badge} bg-teal/10 text-teal-strong`}><BookOpen className="size-3" aria-hidden />Pathway guide · 2027</span>
  return <span className={`${badge} bg-mist text-slate-strong`}><Clock className="size-3" aria-hidden />Awaiting actuals</span>
}

export function PortalCard({ title, source, children, className = '' }: { title: string; source?: ContentSource; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-paper-bright p-6 ${className}`} aria-label={title}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
        {source && <SourceBadge source={source} />}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

/** A full-width page section with an eyebrow, heading and optional source badge. */
export function PortalSection({ id, eyebrow, title, source, children }: { id: string; eyebrow: string; title: string; source?: ContentSource; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6 border-t border-line pt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-2 font-display text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
        </div>
        {source && <SourceBadge source={source} />}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">{eyebrow}</p>
      <h1 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
      {children && <div className="mt-3 text-base leading-7 text-slate-strong">{children}</div>}
    </div>
  )
}

export function StatGrid({ stats, tone = 'light' }: { stats: { value: string; label: string }[]; tone?: 'light' | 'dark' }) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl lg:grid-cols-4 ${tone === 'dark' ? 'bg-white/15' : 'bg-line'}`}>
      {stats.map((s) => (
        <div key={s.label} className={`flex flex-col-reverse p-5 ${tone === 'dark' ? 'bg-ink' : 'bg-paper-bright'}`}>
          <dt className={`mt-1 text-xs leading-5 ${tone === 'dark' ? 'text-white/65' : 'text-slate'}`}>{s.label}</dt>
          <dd className={`font-display text-2xl font-black tracking-tight sm:text-3xl ${tone === 'dark' ? 'text-sand' : 'text-ink'}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Scrolls sideways inside its own box on small screens, so wide financial tables never push the page.
 * `numeric` columns are right-aligned with tabular figures.
 */
export function DataTable({ caption, head, rows, numeric = [], highlight = [] }: { caption: string; head: string[]; rows: string[][]; numeric?: number[]; highlight?: number[] }) {
  const align = (i: number) => (numeric.includes(i) ? 'text-right tabular-nums' : 'text-left')
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-paper-bright" role="region" aria-label={caption} tabIndex={0}>
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-mist text-xs uppercase tracking-wider text-slate-strong">
          <tr>{head.map((h, i) => <th key={h} scope="col" className={`whitespace-nowrap px-4 py-3 font-bold ${align(i)}`}>{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, r) => (
            <tr key={row[0]} className={highlight.includes(r) ? 'bg-sand-soft/60 font-semibold' : undefined}>
              {row.map((cell, i) => i === 0
                ? <th key={i} scope="row" className="px-4 py-3 text-left font-semibold">{cell}</th>
                : <td key={i} className={`px-4 py-3 ${align(i)}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Note = ({ children }: { children: ReactNode }) => <p className="mt-3 text-xs leading-5 text-slate">{children}</p>

export const formatDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
