import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
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
import { RevealGroup } from '@/components/motion/reveal'
import { ScrollRevealText } from '@/components/motion/scroll-story'

const description = 'Bond Safari Academy: paddlesport courses in Kerala from first paddle to instructor, leader and coach pathways, the Bond Paddle Guide Programme and school programmes.'

export const metadata: Metadata = {
  title: 'Bond Safari Academy | Paddlesport courses in Kerala',
  description,
  alternates: { canonical: '/academy' },
  openGraph: { title: 'Bond Safari Academy', description, url: '/academy', type: 'website' },
}

export default function AcademyPage() {
  return (
    <AcademyShell>
      <AcademyHero
        eyebrow="Bond Safari Academy"
        video={{ src: '/video/canoeing-loop.mp4', poster: '/video/canoeing-poster.jpg' }}
        title={<>From your first paddle<br />to your <span className="text-sand">future on the water.</span></>}
        description="Build confidence, develop your paddling skills and explore a pathway from learning the basics to leading experiences on the water."
        actions={<><a href="/academy/courses" className={goldButton}>Explore courses <ArrowRight className="ml-2 size-4" aria-hidden /></a><a href="/academy/qualification-pathway" className={ghostButton}>Discover the pathway</a></>}
      />

      <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-40" aria-labelledby="intro">
        <h2 id="intro" className="mb-8 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Why the Academy</h2>
        <ScrollRevealText className="max-w-5xl font-display text-3xl font-semibold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl" text="Learn on the water, grow with every stroke. Whether it’s your first paddle or your first group to lead, the Academy meets you where you are." />
        <div className="mt-20 lg:mt-28"><h2 className="sr-only">Who is the Academy for?</h2><AcademyAudienceCards /></div>
      </section>

      <section className="border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="categories">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="categories" eyebrow="Course categories" title="Four ways to learn." intro="Prices are the supplied 2027 rates; final payable amounts, including tax, are confirmed at enrolment." action={<a href="/academy/courses" className={linkArrow}>All courses <ArrowRight className="ml-1 size-4" aria-hidden /></a>} />
          <RevealGroup className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">{COURSE_CATEGORIES.map((category) => <CourseCategoryCard key={category.id} id={category.id} />)}</RevealGroup>
        </div>
      </section>

      <section className="bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="pathway">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="pathway" tone="dark" eyebrow="Qualification pathway" title={<>Your journey.<br /><span className="text-sand">Your next qualification.</span></>} intro="Personal Awards, Instructor, Leader, Coach and Tutor: each stage has its own learning outcomes, requirements and permitted scope of activity." />
          <div className="mt-16"><QualificationPathway /></div>
          <a href="/academy/qualification-pathway" className={`mt-16 ${goldButton}`}>Explore the full qualification pathway <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="featured">
        <SectionHeading id="featured" eyebrow="Featured courses" title="Start where you are." action={<a href="/academy/courses" className={linkArrow}>Browse the catalogue <ArrowRight className="ml-1 size-4" aria-hidden /></a>} />
        <div className="mt-12"><FeaturedCourses /></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28" aria-labelledby="upcoming">
        <SectionHeading id="upcoming" eyebrow="Course calendar" title="Upcoming courses" action={<a href="/academy/calendar" className={linkArrow}>View course calendar <ArrowRight className="ml-1 size-4" aria-hidden /></a>} />
        <div className="mt-10">{courseSessions.length === 0 && <NoDatesState />}</div>
      </section>

      <section className="px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="campuses">
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

      <section id="contact" className="scroll-mt-20 border-t border-line bg-paper-bright px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="contact-title">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="contact-title" eyebrow="Contact the Academy" title="Ask us anything." intro="Questions about a course, the pathway or which level is right for you? Send us a message." />
          <AcademyContactForm />
        </div>
      </section>

      <AcademyFinalCTA />
    </AcademyShell>
  )
}
