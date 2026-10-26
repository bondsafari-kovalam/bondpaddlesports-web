import { LocationCardSkeleton } from '@/components/locations/location-card'

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f6f3ec]" aria-busy="true" aria-label="Loading locations">
      <div className="h-[520px] animate-pulse bg-[#06263b]" />
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: 3 }, (_, i) => <LocationCardSkeleton key={i} />)}
      </div>
    </main>
  )
}
