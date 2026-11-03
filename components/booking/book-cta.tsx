import { ArrowRight, CalendarDays } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { formatPrice } from '@/lib/locations'
import { ROUTES } from '@/lib/site'

/** Sidebar card on activity and location pages; the booking itself happens at /book. */
export function BookCta({ title, fromPrice }: { title: string; fromPrice?: number }) {
  return (
    <div id="book" className="scroll-mt-6 rounded-3xl bg-white p-6 shadow-[0_20px_60px_color-mix(in_srgb,var(--color-ink)_16%,transparent)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Plan your paddle</p>
          <h2 className="mt-2 font-display text-2xl font-bold">{title}</h2>
        </div>
        <CalendarDays className="size-7 shrink-0 text-teal" aria-hidden />
      </div>
      <p className="mt-4 font-display text-xl font-bold">{fromPrice ? <>From {formatPrice(fromPrice)}<span className="font-sans text-sm font-semibold text-slate"> /person</span></> : <span className="text-base text-slate-strong">Price on request</span>}</p>
      <p className="mt-2 text-sm leading-6 text-slate-strong">Pick a date, add activities for your group and choose your times.</p>
      <a href={ROUTES.book} className={`mt-5 flex min-h-12 w-full items-center justify-center rounded-2xl bg-ink px-5 py-4 text-sm font-extrabold uppercase tracking-widest text-white transition hover:bg-ink-soft ${focusRing}`}>
        Book now <ArrowRight className="ml-2 size-4" aria-hidden />
      </a>
    </div>
  )
}
