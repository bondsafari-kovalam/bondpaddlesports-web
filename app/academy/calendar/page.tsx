import type { Metadata } from 'next'
import { AcademyFinalCTA, AcademyHero, AcademyShell } from '@/components/academy/academy-sections'
import { CourseCalendar } from '@/components/academy/course-calendar'
import { HERO_IMAGES } from '@/lib/hero-images'

const description = 'Bond Safari Academy course calendar: upcoming paddlesport course dates, locations and enrolment status.'

export const metadata: Metadata = {
  title: 'Course calendar | Bond Safari Academy',
  description,
  alternates: { canonical: '/academy/calendar' },
  openGraph: { title: 'Course calendar | Bond Safari Academy', description, url: '/academy/calendar', type: 'website' },
}

export default function CalendarPage() {
  return (
    <AcademyShell>
      <AcademyHero
        image={HERO_IMAGES.academyCalendar}
        soft
        eyebrow="Course calendar"
        title={<>Plan your <span className="text-sand">next course.</span></>}
        description="Browse Academy course dates by month, category and location. Only confirmed dates appear here."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Academy', href: '/academy' }, { label: 'Calendar' }]}
      />
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16"><CourseCalendar /></section>
      <AcademyFinalCTA />
    </AcademyShell>
  )
}
