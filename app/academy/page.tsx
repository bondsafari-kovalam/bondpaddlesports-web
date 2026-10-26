import type { Metadata } from 'next'
import { ArrowRight, Check } from 'lucide-react'
import { AcademyContactForm } from '@/components/academy/academy-forms'
import {
  AcademyAudienceCards,
  AcademyFinalCTA,
  AcademyHero,
  AcademyShell,
  CampusCards,
  CourseCategoryCard,
  FeaturedCourses,
  GuideProgrammeFeature,
  LearningStories,
  NoDatesState,
  PartnerNote,
  QualificationPathway,
  SectionHeading,
  ghostButton,
  goldButton,
  linkArrow,
} from '@/components/academy/academy-sections'
import { COURSE_CATEGORIES, courseSessions } from '@/lib/academy'

const description = 'Bond Safari Academy: paddlesport courses in Kerala from first paddle to instructor, leader and coach pathways, the Bond Paddle Guide Programme and school programmes.'

export const metadata: Metadata = {
  title: 'Bond Safari Academy | Paddlesport courses in Kerala',
  description,
  alternates: { canonical: '/academy' },
  openGraph: { title: 'Bond Safari Academy', description, url: '/academy', type: 'website' },
}

const purposes = [
  'Try paddlesport for the first time',
  'Improve your personal paddling skills',
  'Explore instructor training',
  'Progress towards leadership and coaching',
  'Develop professional guide skills',
  'Join school and group learning programmes',
]

export default function AcademyPage() {
  return (
    <AcademyShell>
      <AcademyHero
        eyebrow="Bond Safari Academy"
        title={<>From your first paddle<br />to your <span className="text-[#f5b82e]">future on the water.</span></>}
        description="Build confidence, develop your paddling skills and explore a pathway from learning the basics to leading experiences on the water."
        actions={<><a href="/academy/courses" className={goldButton}>Explore courses <ArrowRight className="ml-2 size-4" aria-hidden /></a><a href="/academy/qualification-pathway" className={ghostButton}>Discover the pathway</a></>}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="intro">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeading id="intro" eyebrow="Why the Academy" title={<>Learn on the water.<br />Grow with every stroke.</>} />
          <div>
            <p className="text-base leading-7 text-[#3d5862]">The Academy is for anyone who wants to:</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {purposes.map((purpose) => <li key={purpose} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-semibold ring-1 ring-[#06263b]/5"><Check className="size-5 shrink-0 text-[#14785a]" aria-hidden />{purpose}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-16"><h2 className="sr-only">Who is the Academy for?</h2><AcademyAudienceCards /></div>
      </section>

      <section className="bg-white/60 px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="categories">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="categories" eyebrow="Course categories" title="Four ways to learn." intro="Prices are the supplied 2027 rates; final payable amounts, including tax, are confirmed at enrolment." action={<a href="/academy/courses" className={linkArrow}>All courses <ArrowRight className="ml-1 size-4" aria-hidden /></a>} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{COURSE_CATEGORIES.map((category) => <CourseCategoryCard key={category.id} id={category.id} />)}</div>
        </div>
      </section>

      <section className="bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-28" aria-labelledby="pathway">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="pathway" tone="dark" eyebrow="Qualification pathway" title={<>Your journey.<br /><span className="text-[#f5b82e]">Your next qualification.</span></>} intro="Personal Awards, Instructor, Leader, Coach and Tutor: each stage has its own learning outcomes, requirements and permitted scope of activity." />
          <div className="mt-12"><QualificationPathway /></div>
          <a href="/academy/qualification-pathway" className={`mt-10 ${goldButton}`}>Explore the full qualification pathway <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="featured">
        <SectionHeading id="featured" eyebrow="Featured courses" title="Start where you are." action={<a href="/academy/courses" className={linkArrow}>Browse the catalogue <ArrowRight className="ml-1 size-4" aria-hidden /></a>} />
        <div className="mt-12"><FeaturedCourses /></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28" aria-labelledby="upcoming">
        <SectionHeading id="upcoming" eyebrow="Course calendar" title="Upcoming courses" action={<a href="/academy/calendar" className={linkArrow}>View course calendar <ArrowRight className="ml-1 size-4" aria-hidden /></a>} />
        <div className="mt-10">{courseSessions.length === 0 && <NoDatesState />}</div>
      </section>

      <section className="bg-[#eef2ed] px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="campuses">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="campuses" eyebrow="Training campuses" title="Where the Academy is heading." intro="Three planned campuses. None is operating as an Academy campus yet; dates are planned and subject to confirmation." />
          <div className="mt-12"><CampusCards /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-20 lg:px-8 lg:py-28">
        <GuideProgrammeFeature />
        <PartnerNote />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28"><LearningStories /></section>

      <section id="contact" className="scroll-mt-6 bg-white px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="contact-title">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="contact-title" eyebrow="Contact the Academy" title="Ask us anything." intro="Questions about a course, the pathway or which level is right for you? Send us a message." />
          <AcademyContactForm />
        </div>
      </section>

      <AcademyFinalCTA />
    </AcademyShell>
  )
}
