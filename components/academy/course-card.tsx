import { ArrowRight, Compass, GraduationCap, LifeBuoy, Medal, School, Sparkles, Users, type LucideIcon } from 'lucide-react'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { focusRing } from '@/components/locations/primitives'
import { cn } from '@/lib/utils'
import { COURSE_STATUS_LABELS, categoryName, courseHref, formatRupees, type Course, type CourseStatus, type QualificationLevel } from '@/lib/academy'

const statusStyles: Record<CourseStatus, string> = {
  'enrolment-open': 'bg-[#d9f7ed] text-[#14785a]',
  'dates-coming-soon': 'bg-[#fff1cf] text-[#7a4f00]',
  'launching-2027': 'bg-[#e1f6fa] text-[#0b5f70]',
  'fully-booked': 'bg-[#fdecea] text-[#b42318]',
  enquiry: 'bg-white text-[#3d5862] ring-1 ring-[#dfe6e5]',
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
    <div className={`group relative overflow-hidden bg-[#06263b] ${className}`} role="img" aria-label={visual.alt}>
      <img src={visual.src} alt="" loading="lazy" decoding="async" className="size-full object-cover transition duration-700 group-hover:scale-105" />
      <span className="absolute bottom-3 right-3 rounded-full bg-[#06263b]/75 px-3 py-1.5 text-[10px] font-semibold text-white/90 backdrop-blur">Illustrative image</span>
    </div>
  )
}

export function CoursePrice({ course, className = '' }: { course: Course; className?: string }) {
  if (!course.price) return <span className={cn('text-xs font-semibold text-[#57717b]', className, 'text-xs')}>Price on enquiry</span>
  return <span className={cn('font-bold text-[#c95a22]', className)}>{formatRupees(course.price)}</span>
}

/** Primary course action, driven only by the course's real status. */
export function CourseAction({ course, compact = false, onDark = false }: { course: Course; compact?: boolean; onDark?: boolean }) {
  const size = compact ? 'min-h-11 px-4 text-xs' : 'min-h-12 px-6 text-sm'
  if (course.status === 'enrolment-open') {
    return <a href={`/academy/enrolment/${course.slug}`} className={`inline-flex items-center rounded-full bg-[#f5b82e] font-extrabold uppercase tracking-[0.1em] text-[#06263b] transition hover:bg-[#06263b] hover:text-white ${size} ${focusRing}`}>Enrol now</a>
  }
  if (course.status === 'enquiry' || course.enquiryHref) {
    if (onDark) return <a href={course.enquiryHref ?? '/academy#contact'} className={`inline-flex items-center rounded-full bg-[#f5b82e] font-extrabold uppercase tracking-[0.1em] text-[#06263b] transition hover:bg-white ${size} ${focusRing}`}>Enquire</a>
    return <a href={course.enquiryHref ?? '/academy#contact'} className={`inline-flex items-center rounded-full border border-[#06263b]/20 font-extrabold uppercase tracking-[0.1em] text-[#06263b] transition hover:bg-[#06263b] hover:text-white ${size} ${focusRing}`}>Enquire</a>
  }
  return <NotifyMeButton name={course.name} slug={`course-${course.slug}`} event="opens for enrolment" title="Register interest" label="Register interest" variant={onDark ? 'solid' : 'outline'} className={compact ? 'min-h-11' : 'min-h-12 px-6'} />
}

export function CourseCard({ course }: { course: Course }) {
  const href = courseHref(course)
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#06263b]/5 transition hover:shadow-[0_20px_50px_rgba(6,38,59,.12)]">
      <a href={href} tabIndex={-1} aria-hidden className="relative block">
        <CourseVisual course={course} className="aspect-[16/9]" />
        <CourseStatusBadge status={course.status} className="absolute left-4 top-4" />
      </a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0b7f95]">{categoryName(course.category)} · {course.level}</p>
        <h3 className="mt-1.5 font-display text-xl font-bold"><a href={href} className={`rounded hover:text-[#0b7f95] ${focusRing}`}>{course.name}</a></h3>
        <p className="mt-2 text-sm leading-6 text-[#3d5862]">{course.summary}</p>
        {(course.duration || course.campuses?.length) && (
          <p className="mt-3 text-xs text-[#57717b]">{[course.duration, course.campuses?.join(', ')].filter(Boolean).join(' · ')}</p>
        )}
        <div className="mt-auto pt-6">
          <div className="flex items-baseline justify-between gap-3 border-t border-[#eef2ed] pt-4">
            <CoursePrice course={course} className="text-lg" />
            {course.price ? <span className="text-[11px] text-[#57717b]">2027 rate</span> : null}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <a href={href} className={`inline-flex min-h-11 items-center gap-1 rounded px-1 text-sm font-bold text-[#06263b] hover:text-[#0b7f95] ${focusRing}`} aria-label={`View details for ${course.name}`}>View details <ArrowRight className="size-4" aria-hidden /></a>
            <CourseAction course={course} compact />
          </div>
        </div>
      </div>
    </article>
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5" aria-hidden>
      <div className="aspect-[16/9] animate-pulse bg-[#e4ebe8]" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#eef2ed]" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-[#e4ebe8]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#eef2ed]" />
        <div className="mt-6 h-10 animate-pulse rounded-full bg-[#eef2ed]" />
      </div>
    </div>
  )
}
