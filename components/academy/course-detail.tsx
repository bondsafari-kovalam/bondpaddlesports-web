import type { ReactNode } from 'react'
import { ArrowRight, Backpack, CalendarDays, ChevronDown, ClipboardCheck, Clock, FileText, GraduationCap, Info, MapPin, ShieldCheck, ShoppingBag, UserRound, Users, Waves, type LucideIcon } from 'lucide-react'
import { CourseAction, CoursePrice, CourseStatusBadge, CourseVisual } from '@/components/academy/course-card'
import { DevNote, Eyebrow, Pending, focusRing } from '@/components/locations/primitives'
import {
  BALANCE_DUE_DAYS_BEFORE,
  CAMPUSES,
  WATER_ENVIRONMENTS,
  categoryName,
  depositEligible,
  formatRupees,
  tutors,
  type Course,
  type Faq,
} from '@/lib/academy'
import { getCourseSessions } from '@/lib/academy-service'
import { IS_DEV } from '@/lib/site'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'

const pendingText = 'Pending confirmation'

export function CourseDetailHero({ course }: { course: Course }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-white lg:pb-20 lg:pt-40">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8">
        <div>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/70">
              <li><a href="/" className="hover:text-sand">Home</a></li><li aria-hidden>›</li>
              <li><a href="/academy" className="hover:text-sand">Academy</a></li><li aria-hidden>›</li>
              <li><a href="/academy/courses" className="hover:text-sand">Courses</a></li><li aria-hidden>›</li>
              <li aria-current="page" className="text-white">{course.name}</li>
            </ol>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-teal-pale">{categoryName(course.category)}</span>
            <CourseStatusBadge status={course.status} />
          </div>
          <h1 className="mt-5 font-display text-5xl font-black leading-[.95] tracking-tight sm:text-6xl"><RevealLines>{course.name}</RevealLines></h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/80 sm:text-lg">{course.summary}</p>
          <p className="mt-6 flex items-baseline gap-3"><CoursePrice course={course} className="text-3xl text-sand" />{course.price ? <span className="text-xs text-white/60">2027 rate · tax inclusion to be confirmed</span> : null}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CourseAction course={course} onDark />
            <a href="/academy#contact" className={`inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`}>Contact the Academy</a>
          </div>
        </div>
        <div className="relative">
          <CourseVisual course={course} className="aspect-[4/3] rounded-3xl" />
          <span className="absolute bottom-3 right-3 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/70">Course photography coming soon</span>
        </div>
      </div>
    </section>
  )
}

export function CourseOverview({ course }: { course: Course }) {
  return (
    <section aria-labelledby="overview-title">
      <Eyebrow>Course overview</Eyebrow>
      <h2 id="overview-title" className="mt-3 font-display text-3xl font-black sm:text-4xl"><RevealLines>What this course covers</RevealLines></h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-strong">{course.description ?? course.summary}</p>
      {!course.description && <div className="mt-6"><DevNote title="Overview">Add the approved description from the Paddle UK qualification documents: what learners cover, who it’s for, outcomes, and what they can do afterwards within the qualification’s actual remit.</DevNote></div>}
    </section>
  )
}

function campusNames(course: Course) {
  return course.campuses?.map((id) => CAMPUSES.find((campus) => campus.id === id)?.name).join(', ')
}

export function CourseInformationGrid({ course }: { course: Course }) {
  const sessions = getCourseSessions(course.slug)
  const rows: [LucideIcon, string, ReactNode][] = [
    [ClipboardCheck, 'Course format', course.format],
    [Clock, 'Duration', course.duration],
    [Clock, 'Training hours', course.trainingHours],
    [MapPin, 'Location', campusNames(course)],
    [Waves, 'Water environment', course.waterEnvironments?.map((id) => WATER_ENVIRONMENTS.find((env) => env.id === id)?.name).join(', ')],
    [UserRound, 'Age requirement', course.ageRequirement],
    [GraduationCap, 'Prior awards', course.priorAwards],
    [Clock, 'Logged paddling hours', course.loggedHours],
    [ShieldCheck, 'Entry requirements', course.entryRequirements],
    [FileText, 'Assessment', course.assessment],
    [UserRound, 'Tutors', course.tutorIds?.length ? `${course.tutorIds.length} tutor${course.tutorIds.length > 1 ? 's' : ''}` : undefined],
    [CalendarDays, 'Upcoming sessions', sessions.length ? `${sessions.length} scheduled` : 'Dates coming soon'],
    [Users, 'Price', course.price ? `${formatRupees(course.price)} per learner (2027 rate)` : 'On enquiry'],
    [Info, 'Additional membership fee', course.membershipFee],
  ]
  return (
    <section aria-labelledby="details-title">
      <h2 id="details-title" className="font-display text-2xl font-bold">Course details</h2>
      <dl className="mt-6 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2">
        {rows.map(([Icon, label, value]) => {
          if (!value && !IS_DEV) return null
          return (
            <div key={label} className="flex gap-4 bg-white p-5">
              <Icon className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
              <div><dt className="text-xs font-bold uppercase tracking-wider text-slate">{label}</dt><dd className="mt-1 text-sm font-semibold">{value || <Pending>{pendingText}</Pending>}</dd></div>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

export function QualificationOutcome({ course }: { course: Course }) {
  if (!course.professional || course.level === 'Programme') return null
  return (
    <section aria-labelledby="outcome-title" className="rounded-3xl bg-ink-soft p-6 text-white sm:p-8">
      <GraduationCap className="size-8 text-teal-bright" strokeWidth={1.4} aria-hidden />
      <h2 id="outcome-title" className="mt-4 font-display text-3xl font-black"><RevealLines>Qualification outcome</RevealLines></h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">Instructor and leader qualifications have different remits: one does not grant the permissions of the other. The exact scope, limitations and water environments for {course.name} come from the Paddle UK Qualification Pathway.</p>
      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        <div><dt className="text-xs font-bold uppercase tracking-wider text-teal-pale">Scope after qualifying</dt><dd className="mt-1 text-sm text-white/85">{course.outcomeScope ?? <span className="italic text-white/60">Awaiting the approved qualification remit.</span>}</dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wider text-teal-pale">Water environments</dt><dd className="mt-1 text-sm text-white/85">{course.waterEnvironments?.length ? course.waterEnvironments.map((id) => WATER_ENVIRONMENTS.find((env) => env.id === id)?.name).join(', ') : <span className="italic text-white/60">Course-specific environments to be confirmed.</span>}</dd></div>
      </dl>
      <a href="/academy/qualification-pathway" className="mt-6 inline-flex min-h-11 items-center text-sm font-bold text-sand">How the pathway works <ArrowRight className="ml-1 size-4" aria-hidden /></a>
    </section>
  )
}

export function CourseBookingPanel({ course }: { course: Course }) {
  const sessions = getCourseSessions(course.slug)
  const open = course.status === 'enrolment-open' && sessions.length > 0
  return (
    <div id="enrol" className="scroll-mt-6 rounded-3xl bg-white p-6 shadow-[0_20px_60px_color-mix(in_srgb,var(--color-ink)_16%,transparent)] sm:p-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Enrolment</p>
      <h2 className="mt-2 font-display text-2xl font-bold">{course.name}</h2>
      <div className="mt-4 flex items-baseline justify-between border-b border-mist pb-4">
        <CoursePrice course={course} className="text-2xl" />
        <CourseStatusBadge status={course.status} />
      </div>
      {open ? (
        <ul className="mt-4 space-y-2">
          {sessions.map((session) => (
            <li key={session.id} className="flex items-center justify-between rounded-xl bg-paper-bright p-3 text-sm">
              <span className="font-semibold">{new Date(session.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              {session.remaining !== undefined && <span className="text-xs text-slate">{session.remaining} places left</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-strong">{course.status === 'enquiry' ? 'This programme is arranged on enquiry. Tell us what you need and the Academy will get back to you.' : course.status === 'launching-2027' ? 'This course launches in 2027. Dates and delivery arrangements will be published once confirmed.' : 'Dates for this course haven’t been announced yet.'}</p>
      )}
      {depositEligible(course) && <p className="mt-4 rounded-xl bg-mist p-3 text-xs leading-5 text-slate-strong">Courses over ₹25,000 can be secured with a deposit, with the balance due {BALANCE_DUE_DAYS_BEFORE} days before the course.{course.depositAmount ? ` Deposit: ${formatRupees(course.depositAmount)}.` : ' Deposit amount to be confirmed.'}</p>}
      <div className="mt-5 grid gap-2 [&>*]:w-full [&>*]:justify-center">
        <CourseAction course={course} />
        <a href={`/academy/enrolment/${course.slug}`} className={`inline-flex min-h-11 items-center justify-center rounded-full text-sm font-bold text-teal hover:text-ink ${focusRing}`}>Preview the enrolment journey</a>
      </div>
    </div>
  )
}

function ListOrPending({ items, empty }: { items?: string[]; empty: string }) {
  if (items?.length) return <ul className="mt-4 space-y-2 text-sm text-slate-strong">{items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-sand" aria-hidden />{item}</li>)}</ul>
  return <p className="mt-4"><Pending>{empty}</Pending></p>
}

export function CourseKit({ course }: { course: Course }) {
  return (
    <section aria-labelledby="kit-title">
      <h2 id="kit-title" className="font-display text-2xl font-bold">Equipment & inclusions</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
          <h3 className="flex items-center gap-2.5 font-display text-lg font-bold"><Backpack className="size-5 text-teal" aria-hidden />Kit list</h3>
          <ListOrPending items={course.equipment} empty="Approved kit list to be added. Kit is not assumed to be included in the fee." />
          <p className="mt-5 flex items-center gap-2 border-t border-mist pt-4 text-xs text-slate"><ShoppingBag className="size-4" aria-hidden />Shop links and an Academy starter kit add-on appear once the Shop is connected.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
          <h3 className="flex items-center gap-2.5 font-display text-lg font-bold"><ClipboardCheck className="size-5 text-teal" aria-hidden />Included in the course</h3>
          <ListOrPending items={course.inclusions} empty="Approved inclusions to be added." />
        </div>
      </div>
    </section>
  )
}

export function TutorProfiles({ course }: { course: Course }) {
  const assigned = tutors.filter((tutor) => course.tutorIds?.includes(tutor.id))
  if (!assigned.length) return IS_DEV ? <DevNote title="Tutors">No approved tutor profiles yet. Add real tutors with their verified qualifications and consented bios; never placeholder people.</DevNote> : null
  return (
    <section aria-labelledby="tutors-title">
      <h2 id="tutors-title" className="font-display text-2xl font-bold">Your tutors</h2>
      <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">{assigned.map((tutor) => (
          <article key={tutor.id} className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
            <h3 className="font-display text-lg font-bold">{tutor.name}</h3>
            <p className="text-sm text-slate">{tutor.role}</p>
            <p className="mt-3 text-sm leading-6 text-slate-strong">{tutor.bio}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">{tutor.qualifications.map((q) => <li key={q} className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold">{q}</li>)}</ul>
          </article>
        ))}
      </RevealGroup>
    </section>
  )
}

export function AcademyFAQ({ faqs, policies }: { faqs: Faq[]; policies?: { cancellation?: string; transfer?: string } }) {
  const items: Faq[] = [...faqs]
  if (policies) items.push({ question: 'Cancellation policy', answer: policies.cancellation }, { question: 'Transfer policy', answer: policies.transfer })
  return (
    <section aria-labelledby="faq-title">
      <Eyebrow>FAQs & policies</Eyebrow>
      <h2 id="faq-title" className="mt-3 font-display text-3xl font-black"><RevealLines>Good to know</RevealLines></h2>
      <div className="mt-6 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5">
        {items.map((faq) => (
          <details key={faq.question} className="group">
            <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display font-bold hover:bg-paper-bright [&::-webkit-details-marker]:hidden ${focusRing}`}>{faq.question}<ChevronDown className="size-5 shrink-0 text-teal transition group-open:rotate-180" aria-hidden /></summary>
            <div className="px-6 pb-5 text-sm leading-6 text-slate-strong">{faq.answer ?? <Pending>Answer awaiting approved content.</Pending>}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
