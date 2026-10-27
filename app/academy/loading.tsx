import { CourseCardSkeleton } from '@/components/academy/course-card'

export default function Loading() {
  return (
    <main className="min-h-screen bg-paper" aria-busy="true" aria-label="Loading the Academy">
      <div className="h-[480px] animate-pulse bg-ink" />
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: 3 }, (_, i) => <CourseCardSkeleton key={i} />)}
      </div>
    </main>
  )
}
