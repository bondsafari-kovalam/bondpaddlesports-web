import { ArrowRight, Compass, Droplets, Mountain, Route, Sunrise, Sunset, UsersRound, Waves, type LucideIcon } from 'lucide-react'
import { IllustrativeLabel, focusRing } from '@/components/locations/primitives'
import { AmbientVideo } from '@/components/motion/ambient-video'
import {
  ACTIVITY_STATUS_LABELS,
  activityHref,
  activityStatus,
  formatDuration,
  offeringsFor,
  startingPriceFor,
  waterTypesFor,
  type Activity,
  type ActivityStatus,
} from '@/lib/activities'
import { formatPrice } from '@/lib/locations'

export const ACTIVITY_ICONS: Record<string, LucideIcon> = {
  kayaking: Waves,
  canoeing: Mountain,
  'stand-up-paddleboarding': Compass,
  'guided-trails': Route,
  'sunrise-paddles': Sunrise,
  'sunset-paddles': Sunset,
  'private-sessions': UsersRound,
  'white-water': Droplets,
}

const statusStyles: Record<ActivityStatus, string> = {
  available: 'bg-success-soft text-success',
  'opening-soon': 'bg-sand-soft text-sand-ink',
  'coming-soon': 'bg-white/90 text-slate ring-1 ring-line',
  'no-sessions': 'bg-white/90 text-slate-strong ring-1 ring-line',
}

export function ActivityStatusBadge({ status, className = '' }: { status: ActivityStatus; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${statusStyles[status]} ${className}`}>{ACTIVITY_STATUS_LABELS[status]}</span>
}

/** Approved media when supplied; otherwise a branded, clearly replaceable placeholder. */
export function ActivityVisual({ activity, className = '', showLabel = true }: { activity: Activity; className?: string; showLabel?: boolean }) {
  const Icon = ACTIVITY_ICONS[activity.slug] ?? Waves
  if (activity.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {activity.ambientVideo
          ? <AmbientVideo src={activity.ambientVideo.src} poster={activity.ambientVideo.poster} focus={activity.ambientVideo.focus} className="size-full transition duration-1000 group-hover:scale-105" />
          : <img src={activity.image.src} alt={activity.image.alt} loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-105" />}
        {activity.image.illustrative && <IllustrativeLabel className="absolute bottom-3 right-3" />}
      </div>
    )
  }
  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,var(--color-ink-muted),var(--color-ink)_70%)] text-white/60 ${className}`}>
      <div className="absolute -right-12 -top-12 size-48 rounded-full border-[18px] border-teal-bright/10" aria-hidden />
      <div className="absolute -bottom-20 -left-10 size-56 rounded-full border-[22px] border-sand/10" aria-hidden />
      <Icon className="relative size-12 text-teal-bright transition duration-500 group-hover:scale-110" strokeWidth={1.2} aria-hidden />
      {showLabel && <span className="relative mt-3 text-xs font-semibold">Approved photography coming soon</span>}
    </div>
  )
}

function locationSummary(activity: Activity) {
  const resolved = offeringsFor(activity)
  if (resolved.length === 0) return 'Locations to be confirmed'
  const names = resolved.map((offering) => offering.location.name).join(', ')
  return resolved.every((offering) => offering.source === 'demo') ? `${names} (preview)` : names
}

/** Large, equal-weight card for the three core paddling activities. */
export function ActivityCategoryCard({ activity }: { activity: Activity }) {
  const href = activityHref(activity)
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-ink-soft text-white">
      <a href={href} tabIndex={-1} aria-hidden className="block"><ActivityVisual activity={activity} showLabel={false} className="aspect-[16/9] sm:aspect-[4/5]" /></a>
      {!activity.image && <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/70">Photography coming soon</span>}
      <div className="p-6 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_98%,transparent)_35%,transparent)] sm:pt-20">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">{activity.category}</p>
        <h3 className="mt-2 font-display text-3xl font-black"><a href={href} className={`rounded ${focusRing}`}>{activity.name}</a></h3>
        <p className="mt-2 text-sm leading-6 text-white/75">{activity.summary}</p>
        <a href={href} className={`mt-5 inline-flex min-h-11 items-center rounded-full bg-sand px-5 text-sm font-extrabold text-ink transition hover:bg-white ${focusRing}`} aria-label={`Explore ${activity.name}`}>Explore {activity.slug === 'stand-up-paddleboarding' ? 'SUP' : activity.name} <ArrowRight className="ml-2 size-4" aria-hidden /></a>
      </div>
    </article>
  )
}

export function ActivityCard({ activity }: { activity: Activity }) {
  const href = activityHref(activity)
  const status = activityStatus(activity)
  const water = waterTypesFor(activity)
  const price = startingPriceFor(activity)
  const facts = [
    ['Locations', locationSummary(activity)],
    water.length > 0 && ['Water', water.join(', ')],
    activity.skillLevel && ['Level', activity.skillLevel],
    activity.durationMinutes && ['Duration', formatDuration(activity.durationMinutes)],
  ].filter(Boolean) as [string, string][]

  return (
    <article className="group flex flex-col">
      <a href={href} tabIndex={-1} aria-hidden className="relative block overflow-hidden rounded-3xl">
        <ActivityVisual activity={activity} className="aspect-[16/11]" showLabel={false} />
        <ActivityStatusBadge status={status} className="absolute left-4 top-4" />
      </a>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-strong">{activity.category}</p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight"><a href={href} className={`rounded transition hover:text-teal ${focusRing}`}>{activity.name}</a></h3>
        <p className="mt-2 text-sm leading-6 text-slate-strong">{activity.summary}</p>
        <dl className="mb-6 mt-5 divide-y divide-line border-y border-line text-xs">
          {facts.map(([label, value]) => <div key={label} className="flex gap-3 py-2"><dt className="w-20 shrink-0 text-slate">{label}</dt><dd className="font-medium text-ink">{value}</dd></div>)}
        </dl>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-ink">{price ? `From ${formatPrice(price)}` : <span className="text-xs font-medium text-slate">Price to be confirmed</span>}</span>
          <a href={href} className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-teal ${focusRing}`} aria-label={`View details for ${activity.name}`}>View details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </div>
      </div>
    </article>
  )
}

export function ActivityCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5" aria-hidden>
      <div className="aspect-[16/10] animate-pulse bg-line" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-mist" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-line" />
        <div className="h-4 w-full animate-pulse rounded bg-mist" />
        <div className="mt-6 h-10 animate-pulse rounded-full bg-mist" />
      </div>
    </div>
  )
}
