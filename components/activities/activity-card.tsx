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
  available: 'bg-[#d9f7ed] text-[#14785a]',
  'opening-soon': 'bg-[#fff1cf] text-[#7a4f00]',
  'coming-soon': 'bg-white/90 text-[#57717b] ring-1 ring-[#dfe6e5]',
  'no-sessions': 'bg-white/90 text-[#3d5862] ring-1 ring-[#dfe6e5]',
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
    <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#104963,#06263b_70%)] text-white/60 ${className}`}>
      <div className="absolute -right-12 -top-12 size-48 rounded-full border-[18px] border-[#00c8e8]/10" aria-hidden />
      <div className="absolute -bottom-20 -left-10 size-56 rounded-full border-[22px] border-[#f5b82e]/10" aria-hidden />
      <Icon className="relative size-12 text-[#00c8e8] transition duration-500 group-hover:scale-110" strokeWidth={1.2} aria-hidden />
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
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#0b3850] text-white">
      <a href={href} tabIndex={-1} aria-hidden className="block"><ActivityVisual activity={activity} showLabel={false} className="aspect-[16/9] sm:aspect-[4/5]" /></a>
      {!activity.image && <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/70">Photography coming soon</span>}
      <div className="p-6 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-[linear-gradient(0deg,rgba(6,38,59,.98)_35%,transparent)] sm:pt-20">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fe8f4]">{activity.category}</p>
        <h3 className="mt-2 font-display text-3xl font-black"><a href={href} className={`rounded ${focusRing}`}>{activity.name}</a></h3>
        <p className="mt-2 text-sm leading-6 text-white/75">{activity.summary}</p>
        <a href={href} className={`mt-5 inline-flex min-h-11 items-center rounded-full bg-[#f5b82e] px-5 text-sm font-extrabold text-[#06263b] transition hover:bg-white ${focusRing}`} aria-label={`Explore ${activity.name}`}>Explore {activity.slug === 'stand-up-paddleboarding' ? 'SUP' : activity.name} <ArrowRight className="ml-2 size-4" aria-hidden /></a>
      </div>
    </article>
  )
}

export function ActivityCard({ activity }: { activity: Activity }) {
  const href = activityHref(activity)
  const status = activityStatus(activity)
  const water = waterTypesFor(activity)
  const price = startingPriceFor(activity)
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#06263b]/5 transition hover:shadow-[0_20px_50px_rgba(6,38,59,.12)]">
      <a href={href} tabIndex={-1} aria-hidden className="relative block">
        <ActivityVisual activity={activity} className="aspect-[16/10]" showLabel={false} />
        <ActivityStatusBadge status={status} className="absolute left-4 top-4" />
      </a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0b7f95]">{activity.category}</p>
        <h3 className="mt-1.5 font-display text-xl font-bold"><a href={href} className={`rounded hover:text-[#0b7f95] ${focusRing}`}>{activity.name}</a></h3>
        <p className="mt-2 text-sm leading-6 text-[#3d5862]">{activity.summary}</p>
        <dl className="mb-6 mt-4 space-y-1.5 text-xs text-[#3d5862]">
          <div className="flex gap-2"><dt className="w-20 shrink-0 font-bold text-[#57717b]">Locations</dt><dd>{locationSummary(activity)}</dd></div>
          {water.length > 0 && <div className="flex gap-2"><dt className="w-20 shrink-0 font-bold text-[#57717b]">Water</dt><dd>{water.join(', ')}</dd></div>}
          {activity.skillLevel && <div className="flex gap-2"><dt className="w-20 shrink-0 font-bold text-[#57717b]">Level</dt><dd>{activity.skillLevel}</dd></div>}
          {activity.durationMinutes && <div className="flex gap-2"><dt className="w-20 shrink-0 font-bold text-[#57717b]">Duration</dt><dd>{formatDuration(activity.durationMinutes)}</dd></div>}
        </dl>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#eef2ed] pt-4">
          <span className="text-sm font-bold text-[#c95a22]">{price ? `From ${formatPrice(price)}` : <span className="text-xs font-semibold text-[#57717b]">Price to be confirmed</span>}</span>
          <a href={href} className={`inline-flex min-h-11 items-center gap-1 rounded text-sm font-bold text-[#06263b] hover:text-[#0b7f95] ${focusRing}`} aria-label={`View details for ${activity.name}`}>View details <ArrowRight className="size-4" aria-hidden /></a>
        </div>
      </div>
    </article>
  )
}

export function ActivityCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5" aria-hidden>
      <div className="aspect-[16/10] animate-pulse bg-[#e4ebe8]" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#eef2ed]" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-[#e4ebe8]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#eef2ed]" />
        <div className="mt-6 h-10 animate-pulse rounded-full bg-[#eef2ed]" />
      </div>
    </div>
  )
}
