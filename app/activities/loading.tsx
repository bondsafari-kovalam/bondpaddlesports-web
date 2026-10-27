import { ActivityCardSkeleton } from '@/components/activities/activity-card'

export default function Loading() {
  return (
    <main className="min-h-screen bg-paper" aria-busy="true" aria-label="Loading activities">
      <div className="h-[520px] animate-pulse bg-ink" />
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: 3 }, (_, i) => <ActivityCardSkeleton key={i} />)}
      </div>
    </main>
  )
}
