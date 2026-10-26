import type { Metadata } from 'next'
import { AcademyShell } from '@/components/academy/academy-sections'
import { LearnerDashboard } from '@/components/academy/learner-dashboard'
import { RevealLines } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'My courses | Bond Safari Paddle Sports',
  robots: { index: false, follow: false },
}

export default function AccountCoursesPage() {
  return (
    <AcademyShell>
      <section className="bg-[#06263b] pb-12 pt-32 text-white lg:pt-36">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fe8f4]">My account</p>
          <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl"><RevealLines>My courses</RevealLines></h1>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-12 lg:py-16"><LearnerDashboard /></section>
    </AcademyShell>
  )
}
