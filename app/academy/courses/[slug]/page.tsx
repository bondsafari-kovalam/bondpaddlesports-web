import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AcademyFinalCTA, AcademyShell } from '@/components/academy/academy-sections'
import { AcademySubnav } from '@/components/academy/academy-nav'
import { CourseCard } from '@/components/academy/course-card'
import { AcademyFAQ, CourseBookingPanel, CourseDetailHero, CourseInformationGrid, CourseKit, CourseOverview, QualificationOutcome, TutorProfiles } from '@/components/academy/course-detail'
import { courseHref, courses, getCourse } from '@/lib/academy'
import { SITE_URL } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourse((await params).slug)
  if (!course) return {}
  const title = `${course.name} | Bond Safari Academy`
  const description = `${course.summary} ${course.name} with Bond Safari Academy in Kerala${course.price ? ` from ₹${course.price.toLocaleString('en-IN')} (2027 rate)` : ''}.`
  return { title, description, alternates: { canonical: courseHref(course) }, openGraph: { title, description, url: courseHref(course), type: 'website' } }
}

export default async function CoursePage({ params }: Props) {
  const course = getCourse((await params).slug)
  if (!course) notFound()
  const related = courses.filter((other) => other.category === course.category && other.slug !== course.slug).slice(0, 3)
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Academy', item: `${SITE_URL}/academy` },
      { '@type': 'ListItem', position: 2, name: 'Courses', item: `${SITE_URL}/academy/courses` },
      { '@type': 'ListItem', position: 3, name: course.name, item: `${SITE_URL}${courseHref(course)}` },
    ],
  }

  return (
    <AcademyShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <CourseDetailHero course={course} />
      <AcademySubnav />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_380px] lg:gap-14 lg:px-8 lg:py-24">
        <div className="min-w-0 space-y-14">
          <CourseOverview course={course} />
          <CourseInformationGrid course={course} />
          <QualificationOutcome course={course} />
          <CourseKit course={course} />
          <TutorProfiles course={course} />
          <AcademyFAQ faqs={course.faqs} policies={{ cancellation: course.cancellationPolicy, transfer: course.transferPolicy }} />
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start" aria-label="Enrolment"><CourseBookingPanel course={course} /></aside>
      </div>
      {related.length > 0 && (
        <section className="bg-[#eef2ed] px-5 py-20 lg:px-8" aria-labelledby="related">
          <div className="mx-auto max-w-7xl">
            <h2 id="related" className="font-display text-3xl font-black">More in this category</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((other) => <CourseCard key={other.slug} course={other} />)}</div>
          </div>
        </section>
      )}
      <AcademyFinalCTA />
    </AcademyShell>
  )
}
