import type { Metadata } from 'next'
import { ArrowRight, ChevronDown, Waves } from 'lucide-react'
import { AcademyFinalCTA, AcademyHero, AcademyShell, PartnerNote, QualificationPathway, SectionHeading, goldButton } from '@/components/academy/academy-sections'
import { Pending, focusRing } from '@/components/locations/primitives'
import { QUALIFICATION_LEVELS, WATER_ENVIRONMENTS, courseHref, courses, type QualificationLevelInfo } from '@/lib/academy'

const description = 'The Bond Safari Academy qualification pathway: Try, Learn, Qualify, Lead, Coach, Tutor. Personal Awards, Instructor, Leader, Coach and Tutor levels explained.'

export const metadata: Metadata = {
  title: 'Qualification pathway | Bond Safari Academy',
  description,
  alternates: { canonical: '/academy/qualification-pathway' },
  openGraph: { title: 'Qualification pathway | Bond Safari Academy', description, url: '/academy/qualification-pathway', type: 'website' },
}

const pending = <Pending>From the Paddle UK Qualification Pathway, pending.</Pending>

function QualificationStageCard({ info }: { info: QualificationLevelInfo }) {
  const related = info.level ? courses.filter((course) => course.level === info.level) : []
  const rows: [string, string | undefined][] = [
    ['Intended learner', info.intendedLearner],
    ['Entry requirements', info.entryRequirements],
    ['Learning outcomes', info.learningOutcomes],
    ['Assessment & progression', info.progression],
    ['Scope of practice', info.scope],
    ['Water environments', info.environments?.map((id) => WATER_ENVIRONMENTS.find((env) => env.id === id)?.name).join(', ')],
  ]
  return (
    <details id={info.id} className="group scroll-mt-6 rounded-3xl bg-white ring-1 ring-[#06263b]/5 open:shadow-[0_20px_50px_rgba(6,38,59,.10)]">
      <summary className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 [&::-webkit-details-marker]:hidden ${focusRing}`}>
        <span>
          <span className="block font-display text-2xl font-bold">{info.name}</span>
          <span className="mt-1 block text-sm text-[#57717b]">{related.length ? related.map((course) => course.name).join(' · ') : 'No Academy courses listed yet'}</span>
        </span>
        <ChevronDown className="size-6 shrink-0 text-[#00a9c3] transition group-open:rotate-180" aria-hidden />
      </summary>
      <div className="border-t border-[#eef2ed] px-6 pb-6 pt-5">
        <dl className="grid gap-5 sm:grid-cols-2">
          {rows.map(([label, value]) => <div key={label}><dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">{label}</dt><dd className="mt-1 text-sm leading-6">{value ?? pending}</dd></div>)}
        </dl>
        {related.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 border-t border-[#eef2ed] pt-5">
            {related.map((course) => <a key={course.slug} href={courseHref(course)} className={`inline-flex min-h-11 items-center rounded-full bg-[#eef2ed] px-4 text-sm font-semibold hover:bg-[#06263b] hover:text-white ${focusRing}`}>{course.name}</a>)}
          </div>
        )}
      </div>
    </details>
  )
}

export default function PathwayPage() {
  return (
    <AcademyShell>
      <AcademyHero
        eyebrow="Qualification pathway"
        title={<>One journey.<br /><span className="text-[#f5b82e]">Many possibilities.</span></>}
        description="Discover how paddlesport learning can progress from personal skills to instruction, leadership, coaching and tutoring."
        actions={<a href="/academy/courses" className={goldButton}>Explore courses <ArrowRight className="ml-2 size-4" aria-hidden /></a>}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Academy', href: '/academy' }, { label: 'Qualification pathway' }]}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="stages">
        <SectionHeading id="stages" eyebrow="Six stages" title="Try → Learn → Qualify → Lead → Coach → Tutor" intro="Each stage links to the courses that belong to it. Specific prerequisites between individual qualifications follow the Paddle UK pathway and are shown on each course once confirmed." />
        <div className="mt-12"><QualificationPathway tone="light" /></div>
      </section>

      <section className="bg-white/60 px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="levels">
        <div className="mx-auto max-w-5xl">
          <SectionHeading id="levels" eyebrow="Qualification levels" title="What each level means." />
          <div className="mt-10 space-y-4">{QUALIFICATION_LEVELS.map((info) => <QualificationStageCard key={info.id} info={info} />)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="compare">
        <SectionHeading id="compare" eyebrow="Instructor vs Leader" title="Different roles. Different remits." intro="Instructor and leader qualifications carry different responsibilities and permitted operating environments. Holding one does not automatically grant the remit of the other." />
        <div className="mt-10 overflow-x-auto rounded-3xl bg-white ring-1 ring-[#06263b]/5">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">Instructor and Leader qualifications compared</caption>
            <thead className="bg-[#06263b] text-white"><tr><th scope="col" className="px-5 py-4 font-display">Aspect</th><th scope="col" className="px-5 py-4 font-display">Instructor</th><th scope="col" className="px-5 py-4 font-display">Leader</th></tr></thead>
            <tbody className="divide-y divide-[#eef2ed]">
              {['Primary responsibility', 'Permitted water environments', 'Typical group role', 'Entry requirements'].map((aspect) => (
                <tr key={aspect}><th scope="row" className="px-5 py-4 font-semibold">{aspect}</th><td className="px-5 py-4">{pending}</td><td className="px-5 py-4">{pending}</td></tr>
              ))}
              <tr><th scope="row" className="px-5 py-4 font-semibold">Academy courses</th><td className="px-5 py-4">{courses.filter((c) => c.level === 'Instructor').map((c) => c.name).join(', ')}</td><td className="px-5 py-4">{courses.filter((c) => c.level === 'Leader').map((c) => c.name).join(', ')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-24" aria-labelledby="environments">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="environments" tone="dark" eyebrow="Water environments" title="Where each qualification applies." intro="Qualifications are tied to specific water environments. Each course lists only the environments its qualification actually covers." />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WATER_ENVIRONMENTS.map((env, index) => (
              <li key={env.id} className="rounded-3xl bg-white/[.06] p-6">
                <Waves className="size-7 text-[#00c8e8]" strokeWidth={1.2 + index * 0.4} aria-hidden />
                <h3 className="mt-6 font-display text-2xl font-bold">{env.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{env.definition ?? <span className="italic">Definition from the Paddle UK pathway document, pending.</span>}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-20 lg:px-8">
        <PartnerNote />
        <a href="/academy/courses" className={goldButton}>Explore all courses <ArrowRight className="ml-2 size-4" aria-hidden /></a>
      </section>
      <AcademyFinalCTA />
    </AcademyShell>
  )
}
