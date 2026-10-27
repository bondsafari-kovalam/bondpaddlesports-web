import type { Metadata } from 'next'
import { AcademyFinalCTA, AcademyHero, AcademyShell } from '@/components/academy/academy-sections'
import { CourseCatalogue } from '@/components/academy/course-catalogue'
import { HERO_IMAGES } from '@/lib/hero-images'

const description = 'Paddlesport courses with Bond Safari Academy in Kerala: Start Paddling, instructor, leader and coach training, the Bond Paddle Guide Programme and more.'

export const metadata: Metadata = {
  title: 'Courses | Bond Safari Academy',
  description,
  alternates: { canonical: '/academy/courses' },
  openGraph: { title: 'Courses | Bond Safari Academy', description, url: '/academy/courses', type: 'website' },
}

export default function CoursesPage() {
  return (
    <AcademyShell>
      <AcademyHero
        image={HERO_IMAGES.academyCourses}
        eyebrow="Course catalogue"
        title={<>Find the course that<br /><span className="text-[#f5b82e]">moves you forward.</span></>}
        description="Explore paddlesport learning, personal skills development and professional pathways through the Bond Safari Academy."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Academy', href: '/academy' }, { label: 'Courses' }]}
      />
      <CourseCatalogue />
      <AcademyFinalCTA />
    </AcademyShell>
  )
}
