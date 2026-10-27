import type { ReactNode } from 'react'
import { ArrowRight, BookOpen, CalendarX, ChevronRight, GraduationCap, Handshake, MapPin, School, Sparkles, Users, type LucideIcon } from 'lucide-react'
import { AcademySubnav } from '@/components/academy/academy-nav'
import { CourseCard, CourseVisual } from '@/components/academy/course-card'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { CAMPUSES, COURSE_CATEGORIES, PARTNER_STATEMENT, PATHWAY_STAGES, courses, formatRupees, getCourse, type CourseCategoryId } from '@/lib/academy'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'

export const goldButton = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`
export const ghostButton = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`
export const linkArrow = 'inline-flex min-h-11 items-center text-sm font-bold text-[#0b7f95] hover:text-[#06263b]'

/** Page shell shared by every Academy route: header, Academy sub-navigation, footer. */
export function AcademyShell({ children }: { children: ReactNode }) {
  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
        <SiteHeader bookHref="/academy/courses" />
        {children}
        <SiteFooter />
      </main>
    </NotifyMeProvider>
  )
}

export function AcademyHero({ eyebrow, title, description, actions, breadcrumb, image, children }: {
  eyebrow: string
  title: ReactNode
  description: string
  actions?: ReactNode
  breadcrumb?: { label: string; href?: string }[]
  /** Optional background photo; treated as illustrative until approved Bond photography is supplied. */
  image?: string
  children?: ReactNode
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#06263b] pb-14 pt-32 text-white lg:pb-20 lg:pt-40">
        {image && <HeroBackdrop src={image} />}
        <div className="absolute -right-24 top-20 size-120 rounded-full border-52 border-[#00c8e8]/6" aria-hidden />
        <div className="absolute -bottom-40 left-1/3 size-80 rounded-full border-40 border-[#f5b82e]/5" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/70">
                {breadcrumb.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                    {crumb.href ? <a href={crumb.href} className="hover:text-[#f5b82e]">{crumb.label}</a> : <span aria-current="page" className="text-white">{crumb.label}</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> {eyebrow}</p>
            <h1 className="font-display text-5xl font-black leading-[.98] tracking-tight sm:text-6xl lg:text-7xl"><RevealLines>{title}</RevealLines></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{description}</p>
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {children}
        </div>
      </section>
      <AcademySubnav />
    </>
  )
}

export function SectionHeading({ eyebrow, title, intro, id, tone = 'light', action }: { eyebrow: string; title: ReactNode; intro?: ReactNode; id: string; tone?: 'light' | 'dark'; action?: ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div className="max-w-2xl">
        <Eyebrow tone={tone === 'dark' ? 'cyan' : 'orange'}>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>{title}</RevealLines></h2>
        {intro && <div className={`mt-4 text-base leading-7 ${tone === 'dark' ? 'text-white/70' : 'text-[#3d5862]'}`}>{intro}</div>}
      </div>
      {action}
    </div>
  )
}

const audiences: { icon: LucideIcon; title: string; text: string; cta: string; href: string }[] = [
  { icon: Sparkles, title: 'Beginners', text: 'Discover paddlesport and develop confidence.', cta: 'Explore beginner courses', href: '/academy/courses?category=start-paddling' },
  { icon: GraduationCap, title: 'Aspiring Instructors', text: 'Explore training options for those interested in teaching paddlesport, subject to the relevant entry requirements.', cta: 'Explore instructor courses', href: '/academy/courses?category=become-an-instructor' },
  { icon: Users, title: 'Leaders and Coaches', text: 'Discover the available progression routes for people seeking greater responsibility on the water.', cta: 'Explore leadership & coaching', href: '/academy/courses?category=lead-and-coach' },
  { icon: School, title: 'Schools and Groups', text: 'Explore structured paddling opportunities for schools, colleges and organised groups.', cta: 'Explore school programmes', href: '/academy/schools' },
]

export function AcademyAudienceCards() {
  return (
    <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{audiences.map(({ icon: Icon, title, text, cta, href }) => (
        <article key={title} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5 transition hover:shadow-[0_20px_50px_rgba(6,38,59,.10)]">
          <Icon className="size-8 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
          <h3 className="mt-8 font-display text-xl font-bold">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-[#57717b]">{text}</p>
          <a href={href} className={`mt-5 ${linkArrow} ${focusRing}`}>{cta} <ArrowRight className="ml-1 size-4" aria-hidden /></a>
        </article>
      ))}
    </RevealGroup>
  )
}

export function CourseCategoryCard({ id }: { id: CourseCategoryId }) {
  const category = COURSE_CATEGORIES.find((item) => item.id === id)!
  const inCategory = courses.filter((course) => course.category === id)
  const prices = inCategory.map((course) => course.price).filter((price): price is number => !!price)
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-[#0b3850] text-white">
      <CourseVisual course={inCategory[0]} className="aspect-16/7" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold">{category.name}</h3>
        <p className="mt-2 text-sm leading-6 text-white/70">{category.summary}</p>
        <ul className="mt-5 flex-1 space-y-2 text-sm">
          {inCategory.map((course) => (
            <li key={course.slug} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2">
              <a href={`/academy/courses/${course.slug}`} className="font-semibold hover:text-[#f5b82e]">{course.name}</a>
              <span className="shrink-0 text-xs text-white/60">{course.price ? formatRupees(course.price) : 'On enquiry'}</span>
            </li>
          ))}
        </ul>
        {prices.length > 0 && <p className="mt-4 text-xs text-white/60">From {formatRupees(Math.min(...prices))} · 2027 rates</p>}
        <a href={`/academy/courses?category=${id}`} className={`mt-5 inline-flex min-h-11 w-fit items-center rounded-full bg-white px-5 text-sm font-bold text-[#06263b] ${focusRing}`}>View courses <ArrowRight className="ml-2 size-4" aria-hidden /></a>
      </div>
    </article>
  )
}

export function QualificationPathway({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark'
  return (
    <RevealGroup as="ol" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{PATHWAY_STAGES.map((stage, index) => (
        <li key={stage.id} className="relative">
          <a href={stage.href} className={`group flex h-full flex-col rounded-3xl p-5 transition ${dark ? 'bg-white/6 hover:bg-white/10' : 'bg-white ring-1 ring-[#06263b]/5 hover:shadow-[0_20px_50px_rgba(6,38,59,.10)]'} ${focusRing}`}>
            <span className={`flex size-10 items-center justify-center rounded-full font-display text-sm font-bold ${index < 2 ? 'bg-[#00c8e8] text-[#06263b]' : index < 5 ? 'bg-[#f5b82e] text-[#06263b]' : 'bg-[#f0783e] text-[#06263b]'}`}>{String(index + 1).padStart(2, '0')}</span>
            <span className="mt-6 font-display text-2xl font-bold">{stage.label}</span>
            <span className={`mt-2 flex-1 text-sm leading-6 ${dark ? 'text-white/65' : 'text-[#57717b]'}`}>{stage.text}</span>
            <span className={`mt-4 text-xs font-bold ${dark ? 'text-[#8fe8f4]' : 'text-[#0b7f95]'}`}>{stage.level ? `${stage.level}s` : 'Pathway details'} <ArrowRight className="inline size-3.5" aria-hidden /></span>
          </a>
          {index < PATHWAY_STAGES.length - 1 && <ChevronRight className={`absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 lg:block ${dark ? 'text-[#f5b82e]' : 'text-[#c95a22]'}`} aria-hidden />}
        </li>
      ))}
    </RevealGroup>
  )
}

export function CampusCards() {
  return (
    <RevealGroup className="grid gap-4 md:grid-cols-3">{CAMPUSES.map((campus) => (
        <article key={campus.id} className="rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
          <span className="inline-flex rounded-full bg-[#fff1cf] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#7a4f00]">{campus.planned}</span>
          <h3 className="mt-5 flex items-center gap-2 font-display text-2xl font-bold"><MapPin className="size-5 text-[#00a9c3]" aria-hidden />{campus.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#57717b]">Planned campus</p>
          <ul className="mt-5 flex flex-wrap gap-2">{campus.focus.map((focus) => <li key={focus} className="rounded-full bg-[#eef2ed] px-3 py-1.5 text-xs font-semibold">{focus}</li>)}</ul>
        </article>
      ))}
    </RevealGroup>
  )
}

export function GuideProgrammeFeature({ ctaHref = '/academy/careers' }: { ctaHref?: string }) {
  const programme = getCourse('bond-paddle-guide-programme')!
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#06263b] p-8 text-white sm:p-12">
      <div className="absolute -right-16 -top-16 size-64 rounded-full border-28 border-[#00c8e8]/15" aria-hidden />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <Eyebrow tone="cyan">Careers on the water</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Bond Paddle Guide Programme</RevealLines></h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/70">Bond’s professional guide-training programme for people who want to build a future on the water. Programme structure, schedule, entry requirements and training locations will be published once confirmed.</p>
          <a href={ctaHref} className={`mt-8 ${goldButton}`}>Explore the guide programme <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
        <dl className="grid gap-3">
          <div className="rounded-2xl bg-white/[.07] p-5"><dt className="text-xs text-white/60">Programme fee (2027 rate)</dt><dd className="mt-1 font-display text-4xl font-bold text-[#f5b82e]">{formatRupees(programme.price!)}</dd></div>
          <div className="rounded-2xl bg-white/[.07] p-5"><dt className="text-xs text-white/60">Status</dt><dd className="mt-1 font-bold">Dates coming soon</dd></div>
        </dl>
      </div>
    </div>
  )
}

export function PartnerNote() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl border border-[#06263b]/10 bg-white p-6 sm:flex-row sm:items-center">
      <Handshake className="size-8 shrink-0 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
      <p className="font-display text-lg font-bold">{PARTNER_STATEMENT}</p>
    </div>
  )
}

export function FeaturedCourses() {
  return <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{courses.filter((course) => course.featured).map((course) => <CourseCard key={course.slug} course={course} />)}</RevealGroup>
}

export function NoDatesState({ courseName }: { courseName?: string }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-[#06263b]/15 bg-white px-6 py-14 text-center">
      <CalendarX className="size-10 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
      <h3 className="mt-4 font-display text-2xl font-bold">Upcoming course dates will be announced soon</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#57717b]">{courseName ? `No dates are scheduled for ${courseName} yet.` : 'No Academy course dates have been published yet.'} Register your interest and we’ll let you know when enrolment opens.</p>
    </div>
  )
}

export function LearningStories() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <div>
        <Eyebrow>Learning with the Academy</Eyebrow>
        <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Learn on the water,<br />not just about it.</RevealLines></h2>
      </div>
      <div className="space-y-4 text-base leading-7 text-[#3d5862]">
        <p className="flex gap-3"><BookOpen className="mt-1 size-5 shrink-0 text-[#00a9c3]" aria-hidden />Courses are built around time on the water, with each stage of the pathway setting out what you’ll learn and what you’ll be able to do next.</p>
        <p className="text-sm text-[#57717b]">Learner stories will appear here once we have approved accounts from Academy learners, shared with their permission.</p>
      </div>
    </div>
  )
}

export function AcademyFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#f0783e] px-5 py-20 text-[#06263b] lg:px-8">
      <div className="absolute -right-20 -top-28 size-96 rounded-full border-52 border-white/10" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <h2 className="max-w-2xl font-display text-4xl font-black sm:text-5xl"><RevealLines>Ready to take<br />your next step?</RevealLines></h2>
        <div className="flex flex-wrap gap-3">
          <a href="/academy/courses" className="inline-flex min-h-12 items-center rounded-full bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-widest text-white">Explore courses <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <a href="/academy/qualification-pathway" className="inline-flex min-h-12 items-center rounded-full border border-[#06263b]/30 px-6 text-sm font-bold">Find your pathway</a>
          <a href="/academy#contact" className="inline-flex min-h-12 items-center rounded-full border border-[#06263b]/30 px-6 text-sm font-bold">Contact the Academy</a>
        </div>
      </div>
    </section>
  )
}
