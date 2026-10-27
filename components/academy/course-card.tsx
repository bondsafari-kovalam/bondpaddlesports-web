import { ArrowRight, Compass, GraduationCap, LifeBuoy, Medal, School, Sparkles, Users, type LucideIcon } from 'lucide-react'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { focusRing } from '@/components/locations/primitives'
import { cn } from '@/lib/utils'
import { COURSE_STATUS_LABELS, categoryName, courseHref, formatRupees, type Course, type CourseStatus, type QualificationLevel } from '@/lib/academy'
import { SmartImage } from '@/components/site/smart-image'

const statusStyles: Record<CourseStatus, string> = {
  'enrolment-open': 'bg-success-soft text-success',
  'dates-coming-soon': 'bg-sand-soft text-sand-ink',
  'launching-2027': 'bg-mist text-teal-strong',
  'fully-booked': 'bg-danger-soft text-danger',
  enquiry: 'bg-white text-slate-strong ring-1 ring-line',
}

export function CourseStatusBadge({ status, className = '' }: { status: CourseStatus; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${statusStyles[status]} ${className}`}>{COURSE_STATUS_LABELS[status]}</span>
}

export const LEVEL_ICONS: Record<QualificationLevel, LucideIcon> = {
  'Personal award': Compass,
  Safety: LifeBuoy,
  Preparation: Sparkles,
  Instructor: GraduationCap,
  Leader: Users,
  Coach: Medal,
  Programme: School,
}

const categoryVisuals: Record<Course['category'], { src: string; alt: string }> = {
  'start-paddling': {
    src: 'https://images.unsplash.com/photo-1647036003499-94eebb3388c7?auto=format&fit=crop&w=1400&q=85',
    alt: 'Illustrative canoe paddle on a lake at sunrise',
  },
  'become-an-instructor': {
    src: 'https://images.unsplash.com/photo-1668866451605-b067bd3c9569?auto=format&fit=crop&w=1400&q=85',
    alt: 'Illustrative group paddling together on a river',
  },
  'lead-and-coach': {
    src: 'https://images.unsplash.com/photo-1767471716671-60052b672451?auto=format&fit=crop&w=1400&q=85',
    alt: 'Illustrative paddler navigating white-water rapids',
  },
  programmes: {
    src: 'https://images.unsplash.com/photo-1543411789-1a67a2ac05c6?auto=format&fit=crop&w=1400&q=85',
    alt: 'Illustrative group canoe trip on a river',
  },
}

/** Category illustrations until approved Bond Safari Academy photography is supplied. */
export function CourseVisual({ course, className = '' }: { course: Course; className?: string }) {
  const visual = categoryVisuals[course.category]
  return (
    <div className={`group relative overflow-hidden bg-ink ${className}`} role="img" aria-label={visual.alt}>
      <SmartImage src={visual.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
      <span className="absolute bottom-3 right-3 rounded-full bg-ink/75 px-3 py-1.5 text-[10px] font-semibold text-white/90 backdrop-blur">Illustrative image</span>
    </div>
  )
}

export function CoursePrice({ course, className = '' }: { course: Course; className?: string }) {
  if (!course.price) return <span className={cn('text-xs font-semibold text-slate', className, 'text-xs')}>Price on enquiry</span>
  return <span className={cn('font-bold text-teal-strong', className)}>{formatRupees(course.price)}</span>
}

/** Primary course action, driven only by the course's real status. */
export function CourseAction({ course, compact = false, onDark = false }: { course: Course; compact?: boolean; onDark?: boolean }) {
  const size = compact ? 'min-h-11 px-4 text-xs' : 'min-h-12 px-6 text-sm'
  if (course.status === 'enrolment-open') {
    return <a href={`/academy/enrolment/${course.slug}`} className={`inline-flex items-center rounded-full bg-sand font-semibold text-ink transition hover:bg-ink hover:text-white ${size} ${focusRing}`}>Enrol now</a>
  }
  if (course.status === 'enquiry' || course.enquiryHref) {
    if (onDark) return <a href={course.enquiryHref ?? '/academy#contact'} className={`inline-flex items-center rounded-full bg-sand font-semibold text-ink transition hover:bg-white ${size} ${focusRing}`}>Enquire</a>
    return <a href={course.enquiryHref ?? '/academy#contact'} className={`inline-flex items-center rounded-full border border-ink/20 font-semibold text-ink transition hover:bg-ink hover:text-white ${size} ${focusRing}`}>Enquire</a>
  }
  return <NotifyMeButton name={course.name} slug={`course-${course.slug}`} event="opens for enrolment" title="Register interest" label="Register interest" variant={onDark ? 'solid' : 'outline'} className={compact ? 'min-h-11' : 'min-h-12 px-6'} />
}

export function CourseCard({ course }: { course: Course }) {
  const href = courseHref(course)
  return (
    <article className="group flex flex-col">
      <a href={href} tabIndex={-1} aria-hidden className="relative block overflow-hidden rounded-3xl">
        <CourseVisual course={course} className="aspect-[16/11]" />
        <CourseStatusBadge status={course.status} className="absolute left-4 top-4" />
      </a>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-strong">{categoryName(course.category)} · {course.level}</p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight"><a href={href} className={`rounded transition hover:text-teal ${focusRing}`}>{course.name}</a></h3>
        <p className="mt-2 text-sm leading-6 text-slate-strong">{course.summary}</p>
        {(course.duration || course.campuses?.length) && (
          <p className="mt-3 text-xs text-slate">{[course.duration, course.campuses?.join(', ')].filter(Boolean).join(' · ')}</p>
        )}
        <div className="mt-auto pt-6">
          <div className="flex items-baseline justify-between gap-3 border-t border-line pt-4">
            <CoursePrice course={course} className="text-lg text-ink" />
            {course.price ? <span className="text-[11px] text-slate">2027 rate</span> : null}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <a href={href} className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-teal ${focusRing}`} aria-label={`View details for ${course.name}`}>View details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <CourseAction course={course} compact />
          </div>
        </div>
      </div>
    </article>
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5" aria-hidden>
      <div className="aspect-[16/9] animate-pulse bg-line" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-mist" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-line" />
        <div className="h-4 w-full animate-pulse rounded bg-mist" />
        <div className="mt-6 h-10 animate-pulse rounded-full bg-mist" />
      </div>
    </div>
  )
}
