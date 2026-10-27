'use client'

import { useEffect, useState } from 'react'
import { Award, Bell, CalendarDays, FileText, Loader2, LogIn, MapPin, Upload, Wallet } from 'lucide-react'
import { DemoBanner, primaryButton } from '@/components/academy/form-kit'
import { EnrolmentStatusBadge } from '@/components/academy/enrolment'
import { focusRing } from '@/components/locations/primitives'
import { CAMPUSES, courseHref, formatRupees, getCourse } from '@/lib/academy'
import { ENROLMENT_STATUS, getLearnerEnrolments, type Enrolment } from '@/lib/academy-service'

// Illustrative record for the demo preview only; never shown as a real learner's data.
const DEMO_ENROLMENTS: Enrolment[] = [
  {
    reference: 'DEMO-0001',
    courseSlug: 'sup-instructor',
    session: { id: 'demo', courseSlug: 'sup-instructor', startDate: '', campus: 'kovalam' },
    status: 'awaiting-document-review',
    amountPaid: 0,
    balanceDue: 42500,
    documents: [{ kind: 'photo-id', fileName: 'photo-id.pdf', status: 'uploaded' }],
    requiredDocuments: ['certificate', 'logbook'],
  },
]

function Card({ icon: Icon, title, children }: { icon: typeof Award; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-paper-bright p-4">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate"><Icon className="size-4 text-teal" aria-hidden />{title}</p>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  )
}

function EnrolmentCard({ enrolment }: { enrolment: Enrolment }) {
  const course = getCourse(enrolment.courseSlug)!
  const campus = CAMPUSES.find((item) => item.id === enrolment.session?.campus)
  const missing = enrolment.requiredDocuments.filter((kind) => !enrolment.documents.some((doc) => doc.kind === kind))
  return (
    <article className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate">Ref {enrolment.reference}</p>
          <h3 className="mt-1 font-display text-2xl font-bold"><a href={courseHref(course)} className="hover:text-teal">{course.name}</a></h3>
        </div>
        <EnrolmentStatusBadge status={enrolment.status} />
      </div>
      <p className="mt-3 text-sm text-slate-strong">{ENROLMENT_STATUS[enrolment.status].guidance}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card icon={CalendarDays} title="Date">{enrolment.session?.startDate ? new Date(enrolment.session.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Demo date'}</Card>
        <Card icon={MapPin} title="Location">{campus?.name ?? '—'}</Card>
        <Card icon={Wallet} title="Payment">{formatRupees(enrolment.amountPaid)} paid{enrolment.balanceDue > 0 && <> · <strong>{formatRupees(enrolment.balanceDue)} due</strong></>}</Card>
        <Card icon={FileText} title="Documents">{enrolment.documents.map((doc) => <span key={doc.kind} className="block">{doc.fileName} · {doc.status}</span>)}</Card>
        <Card icon={Upload} title="Still needed">{missing.length ? missing.join(', ') : 'Nothing outstanding'}</Card>
        <Card icon={Award} title="Certificate">{enrolment.certificateNumber ?? 'Issued after successful completion'}</Card>
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-slate"><Bell className="size-4" aria-hidden />Joining instructions: {enrolment.joiningInstructions ?? 'sent once approved'}</p>
    </article>
  )
}

/**
 * Reads enrolments for the signed-in Bond customer. There is no account system in this project yet,
 * so the service reports "not connected" and the page shows the signed-out state.
 */
export function LearnerDashboard() {
  const [state, setState] = useState<'loading' | 'signed-out' | 'ready'>('loading')
  const [enrolments, setEnrolments] = useState<Enrolment[]>([])
  const [demo, setDemo] = useState(false)

  useEffect(() => {
    getLearnerEnrolments().then((result) => {
      if (result.ok) {
        setEnrolments(result.data)
        setState('ready')
      } else setState('signed-out')
    })
  }, [])

  if (state === 'loading') return <div className="flex min-h-64 items-center justify-center" aria-busy="true"><Loader2 className="size-8 animate-spin text-teal" aria-label="Loading your courses" /></div>

  if (state === 'signed-out' && !demo) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-[0_20px_60px_color-mix(in_srgb,var(--color-ink)_10%,transparent)]">
        <LogIn className="mx-auto size-10 text-teal" strokeWidth={1.4} aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold">Sign in to see your courses</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate">Your Academy enrolments, documents, payments and certificates live in your Bond account. Sign-in will be available once Bond accounts are connected to this site.</p>
        <button type="button" disabled className={`mt-6 ${primaryButton}`}>Sign in (coming soon)</button>
        <div className="mt-8 border-t border-mist pt-6">
          <button type="button" onClick={() => setDemo(true)} className={`inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 text-sm font-bold ${focusRing}`}>Preview the dashboard (demo)</button>
        </div>
      </div>
    )
  }

  const list = demo ? DEMO_ENROLMENTS : enrolments
  return (
    <div className="space-y-6">
      {demo && <DemoBanner><strong>Demo preview.</strong> This is sample data showing how the dashboard will look. It is not a real learner or enrolment.</DemoBanner>}
      <section aria-labelledby="upcoming"><h2 id="upcoming" className="font-display text-2xl font-bold">Upcoming courses</h2><div className="mt-4 space-y-4">{list.length ? list.map((enrolment) => <EnrolmentCard key={enrolment.reference} enrolment={enrolment} />) : <p className="text-sm text-slate">No upcoming courses. <a href="/academy/courses" className="font-bold text-teal">Browse courses</a></p>}</div></section>
      <section aria-labelledby="past"><h2 id="past" className="font-display text-2xl font-bold">Past courses & certificates</h2><p className="mt-3 text-sm text-slate">Completed courses and issued certificates will appear here.</p></section>
    </div>
  )
}
