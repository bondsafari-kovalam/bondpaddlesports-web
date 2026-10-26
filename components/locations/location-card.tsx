import { ArrowRight, CalendarClock, Waves } from 'lucide-react'
import { IllustrativeLabel, LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { ACTIVITY_LABELS, formatDate, formatPrice, locationHref, type Location } from '@/lib/locations'

export function LocationImageFallback({ label = 'Approved photography coming soon' }: { label?: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,#104963,#06263b_70%)] text-white/60">
      <Waves className="size-10 text-[#00c8e8]/70" strokeWidth={1.3} aria-hidden />
      <span className="text-xs font-semibold">{label}</span>
    </div>
  )
}

export function LocationCard({ location }: { location: Location }) {
  const href = locationHref(location)
  const isOperating = location.status === 'operating'

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#06263b]/5 transition hover:shadow-[0_20px_50px_rgba(6,38,59,.12)]">
      <a href={href} className={`relative block aspect-[4/3] overflow-hidden ${focusRing}`} tabIndex={-1} aria-hidden>
        {location.image ? <img src={location.image.src} alt="" loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-105" /> : <LocationImageFallback />}
        <LocationStatusBadge status={location.status} className="absolute left-4 top-4" />
        {location.image?.illustrative && <IllustrativeLabel className="absolute bottom-3 right-3" />}
      </a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold"><a href={href} className={`rounded hover:text-[#0b7f95] ${focusRing}`}>{location.name}</a></h3>
        <p className="mt-1 text-sm text-[#57717b]">{[location.context, ...location.waterTypes].join(' · ')}</p>
        {location.summary && <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#3d5862]">{location.summary}</p>}
        {location.activities.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Activities">
            {location.activities.map((activity) => <li key={activity.id} className="rounded-full bg-[#eef2ed] px-2.5 py-1 text-xs font-semibold text-[#06263b]">{ACTIVITY_LABELS[activity.id]}</li>)}
          </ul>
        )}
        <div className="mt-auto pt-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-[#c95a22]">
            {isOperating && location.operatingSince && <span className="text-xs font-semibold text-[#57717b]">Since {formatDate(location.operatingSince)}</span>}
            {!isOperating && location.plannedOpening && <><CalendarClock className="size-4" aria-hidden />{location.plannedOpening}</>}
            {isOperating && location.startingPrice && <span className="ml-auto">From {formatPrice(location.startingPrice)}</span>}
          </p>
          <div className="flex items-center justify-between gap-3 border-t border-[#eef2ed] pt-4">
            <a href={href} className={`inline-flex items-center gap-1 rounded text-sm font-bold text-[#06263b] hover:text-[#0b7f95] ${focusRing}`} aria-label={`View ${location.name}`}>View location <ArrowRight className="size-4" aria-hidden /></a>
            {isOperating
              ? <a href={`${href}#book`} className={`rounded-full bg-[#f5b82e] px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.1em] text-[#06263b] transition hover:bg-[#06263b] hover:text-white ${focusRing}`} aria-label={`Book ${location.name}`}>Book now</a>
              : <NotifyMeButton name={location.name} slug={location.slug} />}
          </div>
        </div>
      </div>
    </article>
  )
}

export function LocationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5" aria-hidden>
      <div className="aspect-[4/3] animate-pulse bg-[#e4ebe8]" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-2/3 animate-pulse rounded bg-[#e4ebe8]" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-[#eef2ed]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#eef2ed]" />
        <div className="mt-6 h-10 animate-pulse rounded-full bg-[#eef2ed]" />
      </div>
    </div>
  )
}
