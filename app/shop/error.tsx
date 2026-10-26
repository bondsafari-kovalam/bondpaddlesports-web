'use client'

export default function ShopError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3ec] px-5 text-center text-[#06263b]">
      <div>
        <h1 className="font-display text-3xl font-black">We couldn’t load the shop</h1>
        <p className="mt-3 text-sm text-[#57717b]">Please try again.</p>
        <button type="button" onClick={reset} className="mt-6 min-h-12 rounded-full bg-[#06263b] px-6 text-sm font-bold text-white">Try again</button>
      </div>
    </main>
  )
}
