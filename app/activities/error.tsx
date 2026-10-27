'use client'

import { RotateCcw } from 'lucide-react'

export default function ActivitiesError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 text-ink">
      <div className="max-w-md text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Something went wrong</p>
        <h1 className="mt-3 font-display text-3xl font-black">We couldn’t load activities</h1>
        <p className="mt-3 text-sm leading-6 text-slate">Please try again. If it keeps happening, explore our locations instead.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={reset} className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm font-bold text-white"><RotateCcw className="mr-2 size-4" aria-hidden /> Try again</button>
          <a href="/locations" className="inline-flex min-h-12 items-center rounded-full border border-ink/20 px-6 text-sm font-bold">Locations</a>
        </div>
      </div>
    </main>
  )
}
