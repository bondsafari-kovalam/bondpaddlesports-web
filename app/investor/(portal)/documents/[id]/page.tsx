import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, Lock } from 'lucide-react'
import { DocumentReader } from '@/components/investor/document-reader'
import { PageIntro } from '@/components/investor/portal-ui'
import { focusRing } from '@/components/locations/primitives'
import { findDocument } from '@/lib/investor/content'
import { requireInvestorSession } from '@/lib/investor/session'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = findDocument((await params).id)
  return { title: doc?.readerFile ? doc.title : 'Documents' }
}

export default async function InvestorDocumentReader({ params }: Props) {
  await requireInvestorSession()
  const doc = findDocument((await params).id)
  if (!doc?.readerFile) notFound()

  return (
    <>
      <a href="/investor/documents" className={`mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper-bright px-4 text-sm font-semibold text-ink transition hover:border-ink ${focusRing}`}><ArrowLeft className="size-4" aria-hidden />Back to documents</a>
      <PageIntro eyebrow={doc.category} title={doc.title}><p>{doc.description}</p></PageIntro>
      <p className="mt-5 flex w-fit items-center gap-2 rounded-full bg-sand-soft px-3.5 py-1.5 text-xs font-bold text-ink"><Lock className="size-3.5 shrink-0" aria-hidden />View only</p>
      <div className="mt-8"><DocumentReader src={`/investor/documents/${doc.id}/file`} title={doc.title} /></div>
    </>
  )
}
