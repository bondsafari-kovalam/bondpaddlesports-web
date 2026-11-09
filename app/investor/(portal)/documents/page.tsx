import type { Metadata } from 'next'
import { BookOpen, Clock, Download, FileText, Mail } from 'lucide-react'
import { PageIntro } from '@/components/investor/portal-ui'
import { focusRing } from '@/components/locations/primitives'
import { DOCUMENTS, DOCUMENT_CATEGORIES } from '@/lib/investor/content'
import { INVESTOR_CONTACT } from '@/lib/investor/round-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Documents' }

const statusStyle = { Download: 'bg-success-soft text-success', 'View only': 'bg-teal/10 text-teal-strong', 'On request': 'bg-sand-soft text-sand-ink', Forthcoming: 'bg-mist text-slate-strong' }
const monthYear = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })

export default async function InvestorDocuments() {
  await requireInvestorSession()
  return (
    <>
      <PageIntro eyebrow="Document library" title="Investor documents">
        <p>The round deck, summaries generated from it, the hub-and-spoke network plan and the 2027 Academy pathway guide can be downloaded here, and are only served to a signed-in session. The key terms, feasibility studies and the marketing plan are read online only. The financial model is shared on request.</p>
      </PageIntro>

      <div className="mt-10 space-y-10">
        {DOCUMENT_CATEGORIES.map((category) => {
          const docs = DOCUMENTS.filter((d) => d.category === category)
          if (!docs.length) return null
          const headingId = `cat-${category.replace(/\W+/g, '-').toLowerCase()}`
          return (
            <section key={category} aria-labelledby={headingId}>
              <h2 id={headingId} className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">{category}</h2>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">{docs.map((doc) => (
                <li key={doc.id} className={`relative flex flex-col rounded-2xl border border-line bg-paper-bright p-5 ${doc.status === 'View only' ? 'transition hover:border-ink' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="flex gap-2 font-display text-lg font-bold tracking-tight"><FileText className="mt-1 size-4 shrink-0 text-teal" aria-hidden />{doc.title}</p>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${statusStyle[doc.status]}`}>{doc.status === 'Download' ? 'Available' : doc.status}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-strong">{doc.description}</p>
                  <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div><dt className="text-slate">Published</dt><dd className="font-semibold">{doc.published ? monthYear(doc.published) : '—'}</dd></div>
                    <div><dt className="text-slate">Period</dt><dd className="font-semibold">{doc.period ?? '—'}</dd></div>
                    <div><dt className="text-slate">Version</dt><dd className="font-semibold">{doc.version}</dd></div>
                  </dl>
                  <div className="mt-auto pt-5">
                    {doc.status === 'Download' && <a href={`/investor/documents/${doc.id}/download`} className={`inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}><Download className="size-4" aria-hidden />Download</a>}
                    {doc.status === 'View only' && <a href={doc.href} className={`inline-flex min-h-10 after:absolute after:inset-0 after:rounded-2xl items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}><BookOpen className="size-4" aria-hidden />Read online</a>}
                    {doc.status === 'On request' && <a href={`mailto:${INVESTOR_CONTACT.email}?subject=${encodeURIComponent(`Request: ${doc.title}`)}`} className={`inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-teal hover:underline ${focusRing}`}><Mail className="size-4" aria-hidden />Request from the Bond team</a>}
                    {doc.status === 'Forthcoming' && <p className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-slate"><Clock className="size-4" aria-hidden />Shared when the legal documents are ready</p>}
                  </div>
                </li>
              ))}</ul>
            </section>
          )
        })}
      </div>
    </>
  )
}
