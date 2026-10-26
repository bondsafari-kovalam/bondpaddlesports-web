import type { Metadata } from 'next'
import { ArrowRight, Briefcase, Compass, MapPin } from 'lucide-react'
import { CareerInterestForm } from '@/components/academy/academy-forms'
import { AcademyHero, AcademyShell, CampusCards, PartnerNote, QualificationPathway, SectionHeading, goldButton } from '@/components/academy/academy-sections'
import { Pending } from '@/components/locations/primitives'
import { formatRupees, getCourse } from '@/lib/academy'

const description = 'Careers on the water with Bond Safari Academy: the Bond Paddle Guide Programme, professional paddlesport pathways and planned training campuses in Kerala.'

export const metadata: Metadata = {
  title: 'Careers & Bond Paddle Guide Programme | Bond Safari Academy',
  description,
  alternates: { canonical: '/academy/careers' },
  openGraph: { title: 'Careers | Bond Safari Academy', description, url: '/academy/careers', type: 'website' },
}

export default function CareersPage() {
  const programme = getCourse('bond-paddle-guide-programme')!
  const details: [string, string | undefined][] = [
    ['Who it’s for', programme.description],
    ['Programme structure', programme.format],
    ['Skills & learning outcomes', undefined],
    ['Training locations', undefined],
    ['Entry requirements', programme.entryRequirements],
    ['Schedule', programme.duration],
    ['Placement opportunities', undefined],
  ]
  return (
    <AcademyShell>
      <AcademyHero
        eyebrow="Careers"
        title={<>Make the water<br /><span className="text-[#f5b82e]">your workplace.</span></>}
        description="Explore professional paddlesport development with the Bond Safari Academy, from instructor and leader training to the Bond Paddle Guide Programme."
        actions={<a href="#interest" className={goldButton}>Register your interest <ArrowRight className="ml-2 size-4" aria-hidden /></a>}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Academy', href: '/academy' }, { label: 'Careers' }]}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-24" aria-labelledby="programme">
        <div>
          <SectionHeading id="programme" eyebrow="Bond Paddle Guide Programme" title="Train to guide on the water." intro="Bond’s professional guide-training programme. The details below will be published from the approved programme document." />
          <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-[#dfe6e5] sm:grid-cols-2">
            {details.map(([label, value]) => <div key={label} className="bg-white p-5 sm:last:odd:col-span-2"><dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">{label}</dt><dd className="mt-1 text-sm">{value ?? <Pending>Pending confirmation</Pending>}</dd></div>)}
          </dl>
          <p className="mt-4 text-xs leading-5 text-[#57717b]">Completing the programme does not guarantee employment. Placement with Bond sites or partners will only be described here once confirmed.</p>
        </div>
        <aside className="space-y-4 lg:pt-24">
          <div className="rounded-3xl bg-[#06263b] p-7 text-white">
            <Briefcase className="size-8 text-[#f5b82e]" strokeWidth={1.4} aria-hidden />
            <p className="mt-6 text-xs text-white/60">Programme fee (2027 rate)</p>
            <p className="mt-1 font-display text-4xl font-bold text-[#f5b82e]">{formatRupees(programme.price!)}</p>
            <p className="mt-2 text-xs text-white/60">Tax inclusion to be confirmed. A deposit option applies to courses over ₹25,000 once the amount is configured.</p>
            <a href="/academy/courses/bond-paddle-guide-programme" className="mt-6 inline-flex min-h-11 items-center text-sm font-bold text-[#8fe8f4]">Programme details <ArrowRight className="ml-1 size-4" aria-hidden /></a>
          </div>
          <PartnerNote />
        </aside>
      </section>

      <section className="bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-24" aria-labelledby="career-path">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="career-path" tone="dark" eyebrow="Professional development" title={<>A pathway, <span className="text-[#f5b82e]">not a single course.</span></>} intro="Professional roles build through instructor, leader and coach qualifications, each with its own requirements and remit." />
          <div className="mt-12"><QualificationPathway /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="campuses">
        <SectionHeading id="campuses" eyebrow="Training campuses" title={<span className="flex items-center gap-3"><MapPin className="size-9 text-[#00a9c3]" aria-hidden />Planned campuses</span>} />
        <div className="mt-10"><CampusCards /></div>
      </section>

      <section id="interest" className="scroll-mt-6 bg-white px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="interest-title">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading id="interest-title" eyebrow="Expression of interest" title="Tell us about you." intro="Share your experience and we’ll be in touch as programme details are confirmed." />
            <p className="mt-6 flex gap-2 text-sm text-[#57717b]"><Compass className="size-5 shrink-0 text-[#00a9c3]" aria-hidden />New to paddling? Start with <a href="/academy/courses?category=start-paddling" className="font-bold text-[#0b7f95]">Start Paddling courses</a>.</p>
          </div>
          <CareerInterestForm />
        </div>
      </section>
    </AcademyShell>
  )
}
