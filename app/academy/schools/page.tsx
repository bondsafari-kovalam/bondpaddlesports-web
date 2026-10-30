import type { Metadata } from 'next'
import { ArrowRight, CalendarRange, School, ShieldCheck, Target, Users } from 'lucide-react'
import { SchoolEnquiryForm } from '@/components/academy/academy-forms'
import { AcademyHero, AcademyShell, CampusCards, SectionHeading, goldButton } from '@/components/academy/academy-sections'
import { DevNote, Pending } from '@/components/locations/primitives'
import { RevealGroup } from '@/components/motion/reveal'
import { HERO_IMAGES } from '@/lib/hero-images'

const description = 'Structured paddling programmes for schools and colleges in Kerala with Bond Safari Academy, including the Schools Paddle Year.'

export const metadata: Metadata = {
  title: 'Schools & colleges | Bond Safari Academy',
  description,
  alternates: { canonical: '/academy/schools' },
  openGraph: { title: 'Schools & colleges | Bond Safari Academy', description, url: '/academy/schools', type: 'website' },
}

const blocks = [
  { icon: CalendarRange, title: 'Schools Paddle Year', text: 'A structured paddling programme for schools and colleges. Term plan and pricing on enquiry.' },
  { icon: Target, title: 'Learning objectives', text: undefined },
  { icon: Users, title: 'Group format & options', text: undefined },
  { icon: ShieldCheck, title: 'Safety & safeguarding', text: undefined },
]

export default function SchoolsPage() {
  return (
    <AcademyShell>
      <AcademyHero
        image={HERO_IMAGES.academySchools}
        soft
        eyebrow="Schools & colleges"
        title={<>Take learning<br /><span className="text-sand">onto the water.</span></>}
        description="Structured paddling experiences for schools, colleges and organised groups, planned around your learners."
        actions={<a href="#enquiry" className={goldButton}>Make a school enquiry <ArrowRight className="ml-2 size-4" aria-hidden /></a>}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Academy', href: '/academy' }, { label: 'Schools' }]}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="programme">
        <SectionHeading id="programme" eyebrow="The programme" title="Built for schools." />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{blocks.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
              <Icon className="size-8 text-teal" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate">{text ?? <Pending>Approved content from the Academy to be added.</Pending>}</p>
            </article>
          ))}
        </RevealGroup>
        <div className="mt-6"><DevNote title="Schools">Add the approved sample term plan, learning objectives and the client’s safety and safeguarding information. Don’t publish prices, safeguarding claims or outcomes until supplied.</DevNote></div>
      </section>

      <section className="bg-mist px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="where">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="where" eyebrow="Where" title={<span className="flex items-center gap-3"><School className="size-9 text-teal" aria-hidden />Planned campuses</span>} intro="Muziris–Kochi is planned with a schools focus from 2028." />
          <div className="mt-10"><CampusCards /></div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-6 bg-white px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="enquiry-title">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="enquiry-title" eyebrow="School enquiry" title="Plan your programme." intro="Tell us about your group and we’ll come back with options." />
          <SchoolEnquiryForm />
        </div>
      </section>
    </AcademyShell>
  )
}
