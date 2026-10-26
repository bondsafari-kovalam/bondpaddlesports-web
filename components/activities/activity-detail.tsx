import type { ReactNode } from 'react'
import {
  ArrowRight,
  Backpack,
  CalendarClock,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  HeartPulse,
  LifeBuoy,
  MapPin,
  MessageSquareQuote,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Waves,
  type LucideIcon,
} from 'lucide-react'
import { BookingForm } from '@/components/booking/booking-form'
import { ActivityCard, ActivityVisual } from '@/components/activities/activity-card'
import { LocationImageFallback } from '@/components/locations/location-card'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { DevNote, Eyebrow, IllustrativeLabel, LocationStatusBadge, Pending, focusRing } from '@/components/locations/primitives'
import {
  activityStatus,
  formatDuration,
  getActivity,
  offeringsFor,
  waterTypesFor,
  type Activity,
  type NextStep,
  type ResolvedOffering,
} from '@/lib/activities'
import { formatPrice, locationHref } from '@/lib/locations'
import { IS_DEV, ROUTES } from '@/lib/site'

/** Missing values: hidden for guests, flagged in development so the team can fill them in. */
function valueOrPending(value: ReactNode | undefined) {
  if (value) return value
  return IS_DEV ? <Pending>Details to be confirmed</Pending> : null
}

function bookableOfferings(activity: Activity) {
  return offeringsFor(activity).filter((offering) => offering.source !== 'planned' && offering.location.status === 'operating')
}

export function ActivityDetailHero({ activity }: { activity: Activity }) {
  const canPreviewBooking = bookableOfferings(activity).length > 0
  return (
    <section className="relative overflow-hidden bg-[#06263b] pb-16 pt-32 text-white lg:pb-24 lg:pt-40">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <div>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/70">
              <li><a href={ROUTES.home} className="hover:text-[#f5b82e]">Home</a></li>
              <li aria-hidden><ChevronRight className="size-3.5" /></li>
              <li><a href={ROUTES.activities} className="hover:text-[#f5b82e]">Activities</a></li>
              <li aria-hidden><ChevronRight className="size-3.5" /></li>
              <li aria-current="page" className="text-white">{activity.name}</li>
            </ol>
          </nav>
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8fe8f4]">{activity.category}</span>
          <h1 className="mt-5 font-display text-5xl font-black leading-[.95] tracking-tight sm:text-6xl lg:text-7xl">{activity.name}</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/80 sm:text-lg">{activity.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book" className={`inline-flex min-h-12 items-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`}>{canPreviewBooking ? 'Book this experience' : 'Check availability'} <ArrowRight className="ml-2 size-4" aria-hidden /></a>
            <a href="#locations" className={`inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`}>Explore locations</a>
          </div>
        </div>
        <ActivityVisual activity={activity} className="aspect-[4/3] rounded-3xl lg:aspect-[5/4]" />
      </div>
    </section>
  )
}

export function ActivityOverview({ activity }: { activity: Activity }) {
  return (
    <section aria-labelledby="overview-title">
      <Eyebrow>The experience</Eyebrow>
      <h2 id="overview-title" className="mt-3 font-display text-3xl font-black sm:text-4xl">What to expect</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#3d5862]">{activity.description ?? activity.summary}</p>
      {!activity.description && <div className="mt-6"><DevNote title="Overview">Add the approved full description: what the session involves, who it suits, whether it is beginner-friendly and what makes it distinctive. Avoid promises about wildlife, scenery or routes unless confirmed.</DevNote></div>}
    </section>
  )
}

export function ActivityInformationGrid({ activity }: { activity: Activity }) {
  const water = waterTypesFor(activity)
  const rows: [LucideIcon, string, ReactNode][] = [
    [Clock, 'Duration', activity.durationMinutes && formatDuration(activity.durationMinutes)],
    [Star, 'Skill level', activity.skillLevel],
    [Users, 'Minimum age', activity.minimumAge],
    [Users, 'Group size', activity.groupSize],
    [Waves, 'Water type', water.length ? water.join(', ') : undefined],
    [CalendarClock, 'Session format', activity.sessionFormat],
    [LifeBuoy, 'Swimming ability', activity.swimmingRequirement],
    [HeartPulse, 'Physical & health', activity.healthRequirement],
  ]
  const visible = rows.map(([icon, label, value]) => [icon, label, valueOrPending(value)] as const).filter(([, , value]) => value)
  return (
    <section aria-labelledby="info-title">
      <h2 id="info-title" className="font-display text-2xl font-bold">At a glance</h2>
      {visible.length ? (
        <dl className="mt-6 grid gap-px overflow-hidden rounded-3xl bg-[#dfe6e5] sm:grid-cols-2">
          {visible.map(([Icon, label, value]) => (
            <div key={label} className="flex gap-4 bg-white p-5 sm:last:odd:col-span-2">
              <Icon className="mt-0.5 size-5 shrink-0 text-[#00a9c3]" aria-hidden />
              <div><dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 text-sm text-[#57717b]">Full session details will be published once confirmed.</p>
      )}
    </section>
  )
}

function BulletBlock({ title, icon: Icon, items, empty }: { title: string; icon: LucideIcon; items?: string[]; empty: string }) {
  if (!items?.length && !IS_DEV) return null
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-bold"><Icon className="size-5 text-[#00a9c3]" aria-hidden />{title}</h3>
      {items?.length ? (
        <ul className="mt-4 space-y-2 text-sm leading-6 text-[#3d5862]">{items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#f5b82e]" aria-hidden />{item}</li>)}</ul>
      ) : (
        <p className="mt-4"><Pending>{empty}</Pending></p>
      )}
    </div>
  )
}

export function ActivityExperience({ activity }: { activity: Activity }) {
  const isEducational = activity.learningOutcomes && activity.learningOutcomes.length > 0
  if (!activity.experienceHighlights?.length && !isEducational && !IS_DEV) return null
  return (
    <section aria-labelledby="experience-title">
      <h2 id="experience-title" className="font-display text-2xl font-bold">{isEducational ? 'What you’ll learn' : 'What you’ll experience'}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <BulletBlock title="Highlights" icon={Sparkles} items={activity.experienceHighlights} empty="Approved experience highlights to be added." />
        {(isEducational || IS_DEV) && <BulletBlock title="Learning outcomes" icon={GraduationCap} items={activity.learningOutcomes} empty="Only for courses with documented outcomes. Recreational sessions are not accredited courses." />}
      </div>
    </section>
  )
}

export function ActivityInclusions({ activity }: { activity: Activity }) {
  if (!activity.inclusions?.length && !activity.whatToBring?.length && !IS_DEV) return null
  return (
    <section aria-labelledby="inclusions-title">
      <h2 id="inclusions-title" className="font-display text-2xl font-bold">Included & what to bring</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <BulletBlock title="What’s included" icon={PackageCheck} items={activity.inclusions} empty="Verified inclusions to be added. Nothing is assumed to be included." />
        <BulletBlock title="What to bring" icon={Backpack} items={activity.whatToBring} empty="Approved packing guidance to be added." />
      </div>
    </section>
  )
}

export function ActivitySafetySection({ activity }: { activity: Activity }) {
  const rows: [string, string | undefined][] = [
    ['Equipment & buoyancy aids', activity.safety?.equipment],
    ['Guides & supervision', activity.safety?.supervision],
    ['Weather & session closures', activity.safety?.weather],
    ['Participant requirements', activity.healthRequirement],
  ]
  return (
    <section id="safety" aria-labelledby="safety-title" className="scroll-mt-6 rounded-3xl bg-[#0b3850] p-6 text-white sm:p-8">
      <ShieldCheck className="size-8 text-[#00c8e8]" strokeWidth={1.4} aria-hidden />
      <h2 id="safety-title" className="mt-4 font-display text-3xl font-black">Safety & preparation</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">Everything you need to know before you get on the water.</p>
      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-bold uppercase tracking-wider text-[#8fe8f4]">{label}</dt>
            <dd className="mt-1 text-sm leading-6 text-white/85">{value ?? <span className="italic text-white/60">Awaiting approved client wording.</span>}</dd>
          </div>
        ))}
      </dl>
      <div id="booking-policies" className="mt-6 flex scroll-mt-6 flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm font-bold">
        <a href={ROUTES.safety} className="inline-flex min-h-11 items-center text-[#f5b82e] hover:text-white">Safety & Responsible Tourism <ArrowRight className="ml-1 size-4" aria-hidden /></a>
        <span className="inline-flex min-h-11 items-center gap-2 text-white/60"><FileText className="size-4" aria-hidden /> Booking terms & digital waiver: awaiting approved wording</span>
      </div>
    </section>
  )
}

function ActivityLocationCard({ offering, activity }: { offering: ResolvedOffering; activity: Activity }) {
  const { location } = offering
  const isOperating = location.status === 'operating' && offering.source !== 'planned'
  const price = offering.source === 'confirmed' ? offering.pricePerParticipant : undefined
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5 sm:flex-row">
      <div className="relative aspect-[16/9] sm:aspect-auto sm:w-48 sm:shrink-0">
        {location.image ? <img src={location.image.src} alt={location.image.alt} loading="lazy" className="absolute inset-0 size-full object-cover" /> : <div className="absolute inset-0"><LocationImageFallback label="" /></div>}
        {location.image?.illustrative && <IllustrativeLabel className="absolute bottom-3 right-3" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <LocationStatusBadge status={location.status} />
          {offering.source === 'demo' && <span className="rounded-full bg-[#fff1cf] px-2.5 py-1 text-[10px] font-extrabold uppercase text-[#7a4f00]">Preview pairing</span>}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold">{location.name}</h3>
        <dl className="mt-2 space-y-1 text-xs text-[#3d5862]">
          {location.waterTypes.length > 0 && <div><dt className="inline font-bold">Water: </dt><dd className="inline">{location.waterTypes.join(', ')}</dd></div>}
          {(offering.meetingPoint ?? location.meetingPoint) && <div><dt className="inline font-bold">Meeting point: </dt><dd className="inline">{offering.meetingPoint ?? location.meetingPoint}</dd></div>}
          {offering.duration && <div><dt className="inline font-bold">Duration: </dt><dd className="inline">{offering.duration}</dd></div>}
          <div><dt className="inline font-bold">Price: </dt><dd className="inline">{price ? `${formatPrice(price)} incl. GST & charges` : 'Price to be confirmed'}</dd></div>
          <div><dt className="inline font-bold">Next sessions: </dt><dd className="inline">{isOperating ? 'Shown once the booking engine is connected' : location.plannedOpening ?? location.phase ?? 'Dates to be confirmed'}</dd></div>
        </dl>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <a href={location.hasDetailPage ? locationHref(location) : ROUTES.locations} className={`inline-flex min-h-11 items-center text-sm font-bold text-[#06263b] hover:text-[#0b7f95] ${focusRing}`}>View location <ArrowRight className="ml-1 size-4" aria-hidden /></a>
          {isOperating
            ? <a href="#book" className={`ml-auto inline-flex min-h-11 items-center rounded-full bg-[#f5b82e] px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-[#06263b] ${focusRing}`} aria-label={`Book ${activity.name} at ${location.name}`}>Book this experience</a>
            : <NotifyMeButton name={location.name} slug={location.slug} className="ml-auto min-h-11" />}
        </div>
      </div>
    </article>
  )
}

export function ActivityLocationList({ activity }: { activity: Activity }) {
  const offerings = offeringsFor(activity)
  return (
    <section id="locations" aria-labelledby="where-title" className="scroll-mt-6">
      <Eyebrow>Available locations</Eyebrow>
      <h2 id="where-title" className="mt-3 font-display text-3xl font-black sm:text-4xl">Where can you experience this?</h2>
      {offerings.some((offering) => offering.source === 'demo') && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#57717b]">Locations marked “preview pairing” are demonstration data until Bond confirms where {activity.name.toLowerCase()} runs.</p>}
      {offerings.length ? (
        <div className="mt-8 grid gap-4">{offerings.map((offering) => <ActivityLocationCard key={offering.locationSlug} offering={offering} activity={activity} />)}</div>
      ) : (
        <div className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
          <MapPin className="size-7 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
          <p className="mt-4 text-sm leading-6 text-[#3d5862]">Locations offering {activity.name.toLowerCase()} will be listed here once confirmed.</p>
          <a href={ROUTES.locations} className={`mt-4 inline-flex min-h-11 items-center text-sm font-bold text-[#0b7f95] ${focusRing}`}>Browse all locations <ArrowRight className="ml-1 size-4" aria-hidden /></a>
        </div>
      )}
    </section>
  )
}

export function ActivityBookingPanel({ activity }: { activity: Activity }) {
  const bookable = bookableOfferings(activity)
  if (bookable.length > 0) {
    return (
      <BookingForm
        title={`Book ${activity.name.toLowerCase()}`}
        fixedActivity={activity.name}
        locations={bookable.map((offering) => ({
          slug: offering.location.slug,
          name: offering.location.name,
          // Demo pairings borrow the location's homepage price so the preview can show totals.
          pricePerParticipant: offering.pricePerParticipant ?? (offering.source === 'demo' ? offering.location.startingPrice : undefined),
        }))}
      />
    )
  }
  const planned = offeringsFor(activity).find((offering) => offering.location.status !== 'operating')
  return (
    <div id="book" className="scroll-mt-6 rounded-3xl bg-[#06263b] p-6 text-white shadow-[0_20px_60px_rgba(6,38,59,.16)] sm:p-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b82e]">{planned ? 'Coming soon' : 'No sessions currently listed'}</p>
      <h2 className="mt-2 font-display text-2xl font-bold">{planned ? `Planned for ${planned.location.name}` : 'Sessions not yet scheduled'}</h2>
      <p className="mt-3 text-sm leading-6 text-white/70">{planned ? `${activity.name} will open with ${planned.location.name}${planned.location.phase ? ` (${planned.location.phase})` : ''}. Dates will be announced once confirmed.` : `We’ll list ${activity.name.toLowerCase()} sessions here as soon as they are confirmed at a location.`}</p>
      {planned
        ? <NotifyMeButton name={planned.location.name} slug={planned.location.slug} variant="solid" className="mt-6 min-h-12 w-full" />
        : <a href={ROUTES.locations} className={`mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-[#f5b82e] text-xs font-extrabold uppercase tracking-[0.12em] text-[#06263b] ${focusRing}`}>Explore locations</a>}
    </div>
  )
}

export function ActivityCrossSell({ activity }: { activity: Activity }) {
  const southern = offeringsFor(activity).some((offering) => ['kovalam', 'poovar'].includes(offering.location.slug))
  return (
    <DevNote title="Cross-sell">
      {southern
        ? 'Kovalam/Poovar guests may see approved Bond Safari Kovalam activities (Discover Scuba Diving, parasailing) around their trip dates once live availability is connected.'
        : 'Muziris guests should only see southern offers if they say they are travelling south, or as a separate “Plan your next trip” suggestion.'}{' '}
      Offers must keep their own eligibility and safety checks, never appear included in the paddle price, and one-tap add-on / split payment stays off until the shared platform supports it.
    </DevNote>
  )
}

export function RelatedActivities({ activity }: { activity: Activity }) {
  const related = activity.related.map(getActivity).filter((item): item is Activity => !!item)
  if (!related.length) return null
  return (
    <section aria-labelledby="related-title">
      <Eyebrow>You might also like</Eyebrow>
      <h2 id="related-title" className="mt-3 font-display text-3xl font-black">Related experiences</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ActivityCard key={item.slug} activity={item} />)}</div>
    </section>
  )
}

const nextStepContent: Record<NextStep, { eyebrow: string; title: string; text: string; href: string; cta: string }> = {
  academy: { eyebrow: 'Bond Safari Academy', title: 'From first stroke to future guide.', text: 'Build confidence, learn safely and discover a pathway into paddlesport leadership.', href: ROUTES.academy, cta: 'Discover Academy courses' },
  membership: { eyebrow: 'Membership', title: 'More water. More reasons to return.', text: 'Free Bond Safari Club membership across the Bond Group, or Bond Blue from ₹999 a year.', href: ROUTES.membership, cta: 'Compare membership' },
  'season-pass': { eyebrow: 'Paddle Season Pass', title: 'Make paddling part of your season.', text: 'Launching with live schedules.', href: ROUTES.seasonPass, cta: 'Explore the Season Pass' },
  'longer-experience': { eyebrow: 'Go further', title: 'Explore a longer paddling experience.', text: 'Take the next step with a guided route on the water.', href: '/activities/guided-trails', cta: 'See guided trails' },
}

export function ActivityNextSteps({ activity }: { activity: Activity }) {
  const steps = activity.nextSteps.filter((step) => !(step === 'longer-experience' && activity.slug === 'guided-trails'))
  if (!steps.length) return null
  return (
    <section aria-labelledby="next-title">
      <h2 id="next-title" className="font-display text-2xl font-bold">Your next step</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => {
          const item = nextStepContent[step]
          const dark = index === 0
          return (
            <div key={step} className={`flex flex-col rounded-3xl p-6 ${dark ? 'bg-[#06263b] text-white' : 'bg-white ring-1 ring-[#06263b]/5'}`}>
              <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? 'text-[#8fe8f4]' : 'text-[#c95a22]'}`}>{item.eyebrow}</p>
              <h3 className="mt-3 font-display text-xl font-bold">{item.title}</h3>
              <p className={`mt-2 flex-1 text-sm leading-6 ${dark ? 'text-white/70' : 'text-[#57717b]'}`}>{item.text}</p>
              <a href={item.href} className={`mt-5 inline-flex min-h-11 items-center text-sm font-bold ${dark ? 'text-[#f5b82e]' : 'text-[#0b7f95]'}`}>{item.cta} <ArrowRight className="ml-1 size-4" aria-hidden /></a>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function ActivityReviews({ activity }: { activity: Activity }) {
  return (
    <section aria-labelledby="reviews-title" className="rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5 sm:p-8">
      <MessageSquareQuote className="size-7 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
      <h2 id="reviews-title" className="mt-4 font-display text-2xl font-bold">Guest reviews</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-[#57717b]">No reviews yet. Only guests with a verified {activity.name.toLowerCase()} booking will be able to leave a review here.</p>
    </section>
  )
}

export function ActivityGallery({ activity }: { activity: Activity }) {
  if (!IS_DEV) return null
  return <DevNote title="Gallery">No approved {activity.name.toLowerCase()} photos or videos yet. Add media with location and activity tags; videos need captions and must not autoplay. Guest images need written permission (and parent/guardian consent for identifiable children). Hidden in production until media exists.</DevNote>
}

export function ActivityFAQ({ activity }: { activity: Activity }) {
  return (
    <section aria-labelledby="faq-title">
      <Eyebrow>Good to know</Eyebrow>
      <h2 id="faq-title" className="mt-3 font-display text-3xl font-black">Frequently asked questions</h2>
      <div className="mt-6 divide-y divide-[#dfe6e5] overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
        {activity.faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display font-bold hover:bg-[#f8faf8] [&::-webkit-details-marker]:hidden ${focusRing}`}>
              {faq.question}
              <ChevronDown className="size-5 shrink-0 text-[#00a9c3] transition group-open:rotate-180" aria-hidden />
            </summary>
            <div className="px-6 pb-5 text-sm leading-6 text-[#3d5862]">{faq.answer ?? <Pending>Answer awaiting approved content.</Pending>}</div>
          </details>
        ))}
      </div>
    </section>
  )
}

export function ActivityFinalCTA({ bookHref = '#book' }: { bookHref?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#f0783e] px-5 py-20 text-[#06263b] lg:px-8">
      <div className="absolute -right-20 -top-28 size-96 rounded-full border-[52px] border-white/10" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <h2 className="max-w-2xl font-display text-4xl font-black sm:text-5xl">Your next adventure<br />is waiting.</h2>
        <div className="flex flex-wrap gap-3">
          <a href={bookHref} className="inline-flex min-h-12 items-center rounded-full bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white">Find a session <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <a href={ROUTES.locations} className="inline-flex min-h-12 items-center rounded-full border border-[#06263b]/30 px-6 text-sm font-bold">Explore locations</a>
        </div>
      </div>
    </section>
  )
}

export function ActivityMobileCTA({ activity }: { activity: Activity }) {
  const status = activityStatus(activity)
  return (
    <div className="fixed inset-x-4 bottom-4 z-20 flex items-center gap-3 rounded-2xl border border-white/30 bg-[#06263b]/95 p-2 pl-4 text-white shadow-xl backdrop-blur-md lg:hidden">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{activity.name}</p>
        <p className="truncate text-xs text-white/70">{status === 'available' ? 'Sessions available' : 'Price to be confirmed'}</p>
      </div>
      <a href="#book" className={`inline-flex min-h-11 items-center rounded-xl bg-[#f5b82e] px-5 text-xs font-extrabold uppercase text-[#06263b] ${focusRing}`}>{bookableOfferings(activity).length ? 'Book now' : 'Details'}</a>
    </div>
  )
}

