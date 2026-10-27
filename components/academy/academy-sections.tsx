import type { ReactNode } from 'react'
import { ArrowRight, BookOpen, CalendarX, ChevronRight, GraduationCap, Handshake, MapPin, School, Sparkles, Users, type LucideIcon } from 'lucide-react'
import { AcademySubnav } from '@/components/academy/academy-nav'
import { CourseCard, CourseVisual } from '@/components/academy/course-card'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { HeroFilm } from '@/components/motion/ambient-video'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { CAMPUSES, COURSE_CATEGORIES, PARTNER_STATEMENT, courses, formatRupees, getCourse, type CourseCategoryId } from '@/lib/academy'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'
import type { Film } from '@/lib/media'

export const goldButton = `inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-7 text-sm font-semibold text-ink transition hover:bg-white ${focusRing}`
export const ghostButton = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink ${focusRing}`
export const linkArrow = 'inline-flex min-h-11 items-center border-b border-ink/25 text-sm font-semibold text-ink transition hover:border-ink'

/** Page shell shared by every Academy route: header, Academy sub-navigation, footer. */
export function AcademyShell({ children }: { children: ReactNode }) {
  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-x-clip bg-paper text-ink">
        <SiteHeader bookHref="/academy/courses" />
        {children}
        <SiteFooter />
      </main>
    </NotifyMeProvider>
  )
}

export function AcademyHero({ eyebrow, title, description, actions, breadcrumb, image, video, children }: {
  eyebrow: string
  title: ReactNode
  description: string
  actions?: ReactNode
  breadcrumb?: { label: string; href?: string }[]
  /** Optional background photo; treated as illustrative until approved Bond photography is supplied. */
  image?: string
  /** Optional full-height film hero, used by the Academy overview. Takes precedence over `image`. */
  video?: Film
  children?: ReactNode
}) {
  return (
    <>
      <section className={`relative overflow-hidden bg-ink text-white ${video ? 'flex min-h-[88svh] items-end pb-16 pt-40 lg:pb-20' : 'pb-14 pt-32 lg:pb-20 lg:pt-40'}`}>
        {video ? <HeroFilm film={video} /> : image && <HeroBackdrop src={image} />}
        {!video && !image && <div className="absolute -right-24 top-20 size-120 rounded-full border-52 border-teal-bright/6" aria-hidden />}
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/70">
                {breadcrumb.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                    {crumb.href ? <a href={crumb.href} className="hover:text-sand">{crumb.label}</a> : <span aria-current="page" className="text-white">{crumb.label}</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className={video ? 'max-w-5xl' : 'max-w-3xl'}>
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> {eyebrow}</p>
            <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-6xl lg:text-7xl"><RevealLines delay={0.2}>{title}</RevealLines></h1>
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
        {intro && <div className={`mt-4 text-base leading-7 ${tone === 'dark' ? 'text-white/70' : 'text-slate-strong'}`}>{intro}</div>}
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
    <RevealGroup className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">{audiences.map(({ icon: Icon, title, text, cta, href }, i) => (
        <article key={title} className="group flex flex-col border-b border-line py-8 sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
          <div className="flex items-center justify-between">
            <Icon className="size-7 text-teal-strong" strokeWidth={1.4} aria-hidden />
            <span className="text-xs font-semibold tracking-[0.3em] text-slate-light">0{i + 1}</span>
          </div>
          <h3 className="mt-10 font-display text-2xl font-bold tracking-tight">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-slate">{text}</p>
          <a href={href} className={`mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-teal ${focusRing}`}>{cta} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
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
    <article className="group flex flex-col">
      <a href={`/academy/courses?category=${id}`} tabIndex={-1} aria-hidden className="block overflow-hidden rounded-3xl"><CourseVisual course={inCategory[0]} className="aspect-[16/9]" /></a>
      <div className="flex flex-1 flex-col pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-3xl font-black tracking-tight">{category.name}</h3>
          {prices.length > 0 && <p className="shrink-0 text-xs text-slate">From <span className="font-semibold text-ink">{formatRupees(Math.min(...prices))}</span></p>}
        </div>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate">{category.summary}</p>
        <ul className="mt-6 flex-1 divide-y divide-line border-y border-line text-sm">
          {inCategory.map((course) => (
            <li key={course.slug}>
              <a href={`/academy/courses/${course.slug}`} className={`flex items-baseline justify-between gap-3 py-3 transition hover:text-teal ${focusRing}`}>
                <span className="font-medium">{course.name}</span>
                <span className="shrink-0 text-xs text-slate">{course.price ? formatRupees(course.price) : 'On enquiry'}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={`/academy/courses?category=${id}`} className={`mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-teal ${focusRing}`}>View {category.name.toLowerCase()} courses <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
      </div>
    </article>
  )
}

export { QualificationPathway } from '@/components/academy/pathway-timeline'

export function CampusCards() {
  return (
    <RevealGroup as="ol" className="border-t border-line">{CAMPUSES.map((campus, i) => (
        <li key={campus.id} className="grid gap-4 border-b border-line py-7 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-8">
          <span className="text-xs font-semibold tracking-[0.3em] text-slate-light">0{i + 1}</span>
          <div>
            <h3 className="font-display text-3xl font-black tracking-tight">{campus.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate"><MapPin className="size-3.5" aria-hidden />Planned campus</p>
          </div>
          <ul className="flex flex-wrap gap-2">{campus.focus.map((focus) => <li key={focus} className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium">{focus}</li>)}</ul>
          <span className="w-fit rounded-full bg-sand-soft px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-sand-ink">{campus.planned}</span>
        </li>
      ))}
    </RevealGroup>
  )
}

export function GuideProgrammeFeature({ ctaHref = '/academy/careers' }: { ctaHref?: string }) {
  const programme = getCourse('bond-paddle-guide-programme')!
  return (
    <div className="overflow-hidden rounded-3xl bg-ink text-white">
      <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:p-16">
        <div>
          <Eyebrow tone="cyan">Careers on the water</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Bond Paddle<br /><span className="text-sand">Guide Programme</span></RevealLines></h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/70">Bond’s professional guide-training programme for people who want to build a future on the water. Programme structure, schedule, entry requirements and training locations will be published once confirmed.</p>
          <a href={ctaHref} className={`mt-8 ${goldButton}`}>Explore the guide programme <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
        <dl className="divide-y divide-white/10 border-y border-white/10">
          <div className="py-5"><dt className="text-xs text-white/60">Programme fee (2027 rate)</dt><dd className="mt-1 font-display text-5xl font-bold text-sand">{formatRupees(programme.price!)}</dd></div>
          <div className="py-5"><dt className="text-xs text-white/60">Status</dt><dd className="mt-1 font-semibold">Dates coming soon</dd></div>
        </dl>
      </div>
    </div>
  )
}

export function PartnerNote() {
  return (
    <div className="flex items-center gap-4 border-y border-line py-6">
      <Handshake className="size-7 shrink-0 text-teal-strong" strokeWidth={1.4} aria-hidden />
      <p className="font-display text-lg font-bold">{PARTNER_STATEMENT}</p>
    </div>
  )
}

export function FeaturedCourses() {
  return <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{courses.filter((course) => course.featured).map((course) => <CourseCard key={course.slug} course={course} />)}</RevealGroup>
}

export function NoDatesState({ courseName }: { courseName?: string }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-ink/15 bg-white px-6 py-14 text-center">
      <CalendarX className="size-10 text-teal" strokeWidth={1.4} aria-hidden />
      <h3 className="mt-4 font-display text-2xl font-bold">Upcoming course dates will be announced soon</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate">{courseName ? `No dates are scheduled for ${courseName} yet.` : 'No Academy course dates have been published yet.'} Register your interest and we’ll let you know when enrolment opens.</p>
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
      <div className="space-y-4 text-base leading-7 text-slate-strong">
        <p className="flex gap-3"><BookOpen className="mt-1 size-5 shrink-0 text-teal" aria-hidden />Courses are built around time on the water, with each stage of the pathway setting out what you’ll learn and what you’ll be able to do next.</p>
        <p className="text-sm text-slate">Learner stories will appear here once we have approved accounts from Academy learners, shared with their permission.</p>
      </div>
    </div>
  )
}

export function AcademyFinalCTA() {
  return (
    <section className="bg-sand px-5 py-20 text-ink lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">Bond Safari Academy</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Ready to take<br />your next step?</RevealLines></h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/academy/courses" className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}>Explore courses <ArrowRight className="size-4" aria-hidden /></a>
          <a href="/academy/qualification-pathway" className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Find your pathway</a>
          <a href="/academy#contact" className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Contact the Academy</a>
        </div>
      </div>
    </section>
  )
}
