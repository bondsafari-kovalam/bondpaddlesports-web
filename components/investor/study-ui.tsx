import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { DataTable, Note } from '@/components/investor/portal-ui'
import { focusRing } from '@/components/locations/primitives'
import type { Point, Table } from '@/lib/investor/feasibility-data'

export const body = 'text-sm leading-6 text-slate-strong'

export const Lead = ({ point }: { point: Point }) => <>{point.lead && <strong className="text-ink">{point.lead}</strong>}{point.lead && point.text && ' '}{point.text}</>

export const Para = ({ point }: { point: Point }) => <p className={`mt-4 first:mt-0 ${body}`}><Lead point={point} /></p>

export const Heading = ({ children }: { children: ReactNode }) => <h3 className="mt-10 font-display text-xl font-bold tracking-tight first:mt-0">{children}</h3>

const SubBullets = ({ items }: { items: string[] }) => <ul className="mt-2 space-y-1.5">{items.map((s) => <li key={s} className="flex gap-2.5"><span className="mt-2.5 size-1 shrink-0 rounded-full bg-slate" aria-hidden />{s}</li>)}</ul>

export function Bullets({ points }: { points: Point[] }) {
  return (
    <ul className={`mt-3 space-y-2 ${body}`}>
      {points.map((p) => <li key={p.lead ?? p.text} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden /><div><Lead point={p} />{p.sub && <SubBullets items={p.sub} />}</div></li>)}
    </ul>
  )
}

export function Numbered({ points }: { points: Point[] }) {
  return (
    <ol className={`mt-3 space-y-2.5 ${body}`}>
      {points.map((p, i) => <li key={p.lead ?? p.text} className="flex gap-3"><span className="w-5 shrink-0 font-bold text-teal-strong">{i + 1}.</span><div><Lead point={p} />{p.sub && <SubBullets items={p.sub} />}</div></li>)}
    </ol>
  )
}

/** The table's caption is its heading in the study, so it's shown here as well as read out by the table. */
export const StudyTable = ({ table }: { table: Table }) => (
  <>
    <Heading>{table.caption}</Heading>
    <div className="mt-4"><DataTable {...table} /></div>
  </>
)

export function SectionLinks({ label, sections }: { label: string; sections: string[][] }) {
  return (
    <nav aria-label={label} className="mt-6 flex flex-wrap gap-2">
      {sections.map(([id, text]) => <a key={id} href={`#${id}`} className="rounded-full border border-line bg-paper-bright px-3.5 py-1.5 text-xs font-semibold text-slate-strong transition hover:border-ink hover:text-ink">{text}</a>)}
    </nav>
  )
}

export const Verdict = ({ text }: { text: string }) => (
  <div className="rounded-2xl border-l-4 border-sand bg-sand-soft p-5">
    <p className="font-display text-lg font-bold">The answer: Go</p>
    <p className="mt-1 text-sm leading-6 text-ink">{text}</p>
  </div>
)

/** The cover page and reading guide of the hub and spoke report series. */
export function StudyCover({ facts, verdict, note, howToRead }: { facts: string[][]; verdict: string; note: string; howToRead: string[] }) {
  return (
    <>
      <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3">
        {facts.map(([label, value]) => <div key={label} className="flex flex-col bg-paper-bright p-4"><dt className="text-xs font-bold uppercase tracking-wider text-slate">{label}</dt><dd className="mt-1 text-sm font-semibold">{value}</dd></div>)}
      </dl>
      <p className="mt-6 max-w-4xl font-display text-lg font-bold leading-7">{verdict}</p>
      <Note>{note}</Note>

      <section aria-labelledby="how-to-read-title" className="mt-8 rounded-2xl border-t-4 border-sand bg-paper-bright p-6">
        <h2 id="how-to-read-title" className="font-display text-lg font-bold">How to read this report</h2>
        <div className="mt-3 space-y-2">{howToRead.map((text) => <p key={text} className={body}>{text}</p>)}</div>
      </section>
    </>
  )
}

export function LinkedSources({ sources }: { sources: { title: string; url?: string }[] }) {
  return (
    <ul className={`space-y-3 ${body}`}>
      {sources.map((s) => (
        <li key={s.title} className="flex gap-2">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
          <div className="min-w-0">
            {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal underline-offset-4 hover:underline">{s.title}</a> : s.title}
            {s.url && <span className="block break-all text-xs text-slate">{s.url}</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export const BackToStudies = ({ className = '' }: { className?: string }) => <a href="/investor/feasibility" className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper-bright px-4 text-sm font-semibold text-ink transition hover:border-ink ${focusRing} ${className}`}><ArrowLeft className="size-4" aria-hidden />Back to feasibility studies</a>
