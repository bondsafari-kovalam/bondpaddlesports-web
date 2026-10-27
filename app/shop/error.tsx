'use client'

export default function ShopError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 text-center text-ink">
      <div>
        <h1 className="font-display text-3xl font-black">We couldn’t load the shop</h1>
        <p className="mt-3 text-sm text-slate">Please try again.</p>
        <button type="button" onClick={reset} className="mt-6 min-h-12 rounded-full bg-ink px-6 text-sm font-bold text-white">Try again</button>
      </div>
    </main>
  )
}
