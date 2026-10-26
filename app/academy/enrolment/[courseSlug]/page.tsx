import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AcademyShell } from '@/components/academy/academy-sections'
import { AcademySubnav } from '@/components/academy/academy-nav'
import { CourseStatusBadge } from '@/components/academy/course-card'
import { CourseEnrolmentStepper } from '@/components/academy/enrolment'
import { categoryName, courseHref, courses, getCourse } from '@/lib/academy'

type Props = { params: Promise<{ courseSlug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return courses.map((course) => ({ courseSlug: course.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourse((await params).courseSlug)
  return { title: course ? `Enrol: ${course.name} | Bond Safari Academy` : 'Enrol | Bond Safari Academy', robots: { index: false, follow: false } }
}

export default async function EnrolmentPage({ params }: Props) {
  const course = getCourse((await params).courseSlug)
  if (!course) notFound()
  return (
    <AcademyShell>
      <section className="bg-[#06263b] pb-10 pt-32 text-white lg:pt-36">
        <div className="mx-auto max-w-4xl px-5">
          <a href={courseHref(course)} className="text-xs font-semibold text-white/70 hover:text-[#f5b82e]">← Back to {course.name}</a>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fe8f4]">Enrolment · {categoryName(course.category)}</p>
          <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">{course.name}</h1>
          <div className="mt-4"><CourseStatusBadge status={course.status} /></div>
        </div>
      </section>
      <AcademySubnav />
      <section className="mx-auto max-w-4xl px-5 py-12 lg:py-16"><CourseEnrolmentStepper course={course} /></section>
    </AcademyShell>
  )
}
