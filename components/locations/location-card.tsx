import { ArrowRight, CalendarClock, Waves } from 'lucide-react'
import { IllustrativeLabel, LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { ACTIVITY_LABELS, formatDate, formatPrice, locationHref, type Location } from '@/lib/locations'

export function LocationImageFallback({ label = 'Approved photography coming soon' }: { label?: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,var(--color-ink-muted),var(--color-ink)_70%)] text-white/60">
      <Waves className="size-10 text-teal-bright/70" strokeWidth={1.3} aria-hidden />
      <span className="text-xs font-semibold">{label}</span>
    </div>
  )
}

/** Tall image tile with the name over the photo; the compact way to list locations on content pages. */
export function LocationTile({ location, className = '' }: { location: Location; className?: string }) {
  return (
    <a href={locationHref(location)} className={`group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-ink text-white ${focusRing} ${className}`}>
      {location.image && <img src={location.image.src} alt="" loading="lazy" decoding="async" className="size-full object-cover transition duration-1000 group-hover:scale-105" />}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_90%,transparent)_0%,transparent_60%)]" />
      <LocationStatusBadge status={location.status} className="absolute left-4 top-4" />
      {location.image?.illustrative && <IllustrativeLabel className="absolute right-4 top-4" />}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">{location.name}</h3>
          <p className="mt-1 text-xs text-white/70">{[location.context, ...location.waterTypes].join(' · ')}</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition group-hover:bg-sand"><ArrowRight className="size-4" aria-hidden /></span>
      </div>
    </a>
  )
}

export function LocationCard({ location }: { location: Location }) {
  const href = locationHref(location)
  const isOperating = location.status === 'operating'

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--color-ink)_12%,transparent)]">
      <a href={href} className={`relative block aspect-[4/3] overflow-hidden ${focusRing}`} tabIndex={-1} aria-hidden>
        {location.image ? <img src={location.image.src} alt="" loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-105" /> : <LocationImageFallback />}
        <LocationStatusBadge status={location.status} className="absolute left-4 top-4" />
        {location.image?.illustrative && <IllustrativeLabel className="absolute bottom-3 right-3" />}
      </a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold"><a href={href} className={`rounded hover:text-teal ${focusRing}`}>{location.name}</a></h3>
        <p className="mt-1 text-sm text-slate">{[location.context, ...location.waterTypes].join(' · ')}</p>
        {location.summary && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-strong">{location.summary}</p>}
        {location.activities.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Activities">
            {location.activities.map((activity) => <li key={activity.id} className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink">{ACTIVITY_LABELS[activity.id]}</li>)}
          </ul>
        )}
        <div className="mt-auto pt-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-teal-strong">
            {isOperating && location.operatingSince && <span className="text-xs font-semibold text-slate">Since {formatDate(location.operatingSince)}</span>}
            {!isOperating && location.plannedOpening && <><CalendarClock className="size-4" aria-hidden />{location.plannedOpening}</>}
            {isOperating && location.startingPrice && <span className="ml-auto">From {formatPrice(location.startingPrice)}</span>}
          </p>
          <div className="flex items-center justify-between gap-3 border-t border-mist pt-4">
            <a href={href} className={`inline-flex items-center gap-1 rounded text-sm font-bold text-ink hover:text-teal ${focusRing}`} aria-label={`View ${location.name}`}>View location <ArrowRight className="size-4" aria-hidden /></a>
            {isOperating
              ? <a href={`${href}#book`} className={`rounded-full bg-sand px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.1em] text-ink transition hover:bg-ink hover:text-white ${focusRing}`} aria-label={`Book ${location.name}`}>Book now</a>
              : <NotifyMeButton name={location.name} slug={location.slug} />}
          </div>
        </div>
      </div>
    </article>
  )
}

export function LocationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5" aria-hidden>
      <div className="aspect-[4/3] animate-pulse bg-line" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-2/3 animate-pulse rounded bg-line" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-mist" />
        <div className="h-4 w-full animate-pulse rounded bg-mist" />
        <div className="mt-6 h-10 animate-pulse rounded-full bg-mist" />
      </div>
    </div>
  )
}
