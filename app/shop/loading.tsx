export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f6f3ec]" aria-busy="true" aria-label="Loading the shop">
      <div className="h-[420px] animate-pulse bg-[#06263b]" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 py-16 md:grid-cols-3 lg:px-8 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-white" />)}
      </div>
    </main>
  )
}
