import type { ReactNode } from 'react'
import { ArrowRight, Backpack, CalendarClock, ChevronRight, CloudRain, Compass, FileText, MapPin, MessageSquareQuote, ShieldCheck, Sparkles } from 'lucide-react'
import { LocationImageFallback } from '@/components/locations/location-card'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { DevNote, Eyebrow, IllustrativeLabel, LocationStatusBadge, Pending, focusRing } from '@/components/locations/primitives'
import { ACTIVITY_LABELS, formatDate, formatPrice, type Location, type VisitorInfo } from '@/lib/locations'
import { IS_DEV, ROUTES } from '@/lib/site'

export function LocationDetailHero({ location }: { location: Location }) {
  const isOperating = location.status === 'operating'
  return (
    <section className="relative flex min-h-[600px] items-end bg-[#06263b] pb-16 pt-36 text-white lg:min-h-[660px] lg:pb-20">
      {location.image ? <img src={location.image.src} alt={location.image.alt} className="absolute inset-0 size-full object-cover" /> : <div className="absolute inset-0"><LocationImageFallback label="" /></div>}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,38,59,.92)_0%,rgba(6,38,59,.6)_50%,rgba(6,38,59,.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,38,59,.95),transparent_60%)]" />
      {location.image?.illustrative && <IllustrativeLabel className="absolute bottom-4 right-4 z-10" />}
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/70">
            <li><a href={ROUTES.home} className="hover:text-[#f5b82e]">Home</a></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li><a href={ROUTES.locations} className="hover:text-[#f5b82e]">Locations</a></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="text-white">{location.name}</li>
          </ol>
        </nav>
        <div className="max-w-2xl">
          <LocationStatusBadge status={location.status} />
          <h1 className="mt-5 font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl">{location.name}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-[#8fe8f4]">
            <span className="flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />{location.context}</span>
            {location.waterTypes.length > 0 && <span>{location.waterTypes.join(' · ')}</span>}
          </p>
          {location.summary && <p className="mt-5 max-w-lg text-base leading-7 text-white/80 sm:text-lg">{location.summary}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {isOperating
              ? <a href="#book" className={`rounded-full bg-[#f5b82e] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`}>Book now <ArrowRight className="ml-2 inline size-4" aria-hidden /></a>
              : <NotifyMeButton name={location.name} slug={location.slug} variant="solid" className="px-6 py-4 text-sm" />}
            <a href="#activities" className={`rounded-full border border-white/40 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`}>Explore activities</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LocationOverview({ location }: { location: Location }) {
  const facts: [string, ReactNode][] = [
    ['Status', <LocationStatusBadge key="s" status={location.status} />],
    location.operatingSince ? ['Operating since', formatDate(location.operatingSince)] : ['Planned opening', location.plannedOpening ?? 'To be confirmed'],
    ['Region', location.region],
    ['Water type', location.waterTypes.length ? location.waterTypes.join(', ') : <Pending key="w">To be confirmed</Pending>],
    ...(location.meetingPoint ? [['Meeting area', location.meetingPoint] as [string, ReactNode]] : []),
    ...(location.status === 'operating' && location.startingPrice ? [['Starting from', formatPrice(location.startingPrice)] as [string, ReactNode]] : []),
  ]
  return (
    <section aria-labelledby="overview-title">
      <Eyebrow>About this location</Eyebrow>
      <h2 id="overview-title" className="mt-3 font-display text-3xl font-black sm:text-4xl">{location.status === 'operating' ? 'Your paddle starts here.' : 'Something new on the water.'}</h2>
      {location.summary && <p className="mt-4 max-w-2xl text-base leading-7 text-[#3d5862]">{location.summary}</p>}
      <dl className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-[#dfe6e5] sm:grid-cols-2">
        {facts.map(([label, value]) => (
          <div key={label} className="bg-white p-5 sm:last:odd:col-span-2">
            <dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">{label}</dt>
            <dd className="mt-2 font-display text-lg font-bold">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6"><DevNote title="Overview">Add the client-approved location description (experience, landscape, heritage) from the project documents. Do not add claims about wildlife, routes or attractions until supplied.</DevNote></div>
    </section>
  )
}

export function LocationActivityList({ location }: { location: Location }) {
  return (
    <section id="activities" aria-labelledby="activities-title" className="scroll-mt-6">
      <Eyebrow>Activities available here</Eyebrow>
      <h2 id="activities-title" className="mt-3 font-display text-3xl font-black">Choose your rhythm</h2>
      {location.activities.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {location.activities.map((activity) => (
            <article key={activity.id} className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
              <div className="aspect-[16/9]">{activity.image ? <img src={activity.image.src} alt={activity.image.alt} loading="lazy" className="size-full object-cover" /> : <LocationImageFallback label="" />}</div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{ACTIVITY_LABELS[activity.id]}</h3>
                {activity.description && <p className="mt-2 text-sm leading-6 text-[#57717b]">{activity.description}</p>}
                <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#3d5862]">
                  {activity.duration && <div><dt className="inline font-bold">Duration </dt><dd className="inline">{activity.duration}</dd></div>}
                  {activity.skillLevel && <div><dt className="inline font-bold">Level </dt><dd className="inline">{activity.skillLevel}</dd></div>}
                  {activity.startingPrice && <div><dt className="inline font-bold">From </dt><dd className="inline">{formatPrice(activity.startingPrice)}</dd></div>}
                </dl>
                {location.status === 'operating' && <a href="#book" className="mt-5 inline-flex items-center text-sm font-bold text-[#0b7f95]">Book this activity <ArrowRight className="ml-1 size-4" aria-hidden /></a>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
            <Compass className="size-7 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
            <p className="mt-4 text-sm leading-6 text-[#3d5862]">The confirmed activity line-up for {location.name} will be published here soon.{location.status === 'operating' && ' Use the booking panel to see what’s on.'}</p>
            <a href={ROUTES.activities} className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-[#0b7f95] hover:text-[#06263b]">Browse all activities <ArrowRight className="ml-1 size-4" aria-hidden /></a>
          </div>
          <DevNote title="Activities">No activities are configured for this location in <code>lib/locations.ts</code>. Add each confirmed activity with its duration, skill level and price; nothing is assumed.</DevNote>
        </div>
      )}
    </section>
  )
}

type InfoGroup = { title: string; icon: typeof Backpack; items: [string, keyof VisitorInfo][]; extra?: ReactNode }

export function LocationVisitorInformation({ location }: { location: Location }) {
  const info = location.visitorInfo
  const groups: InfoGroup[] = [
    { title: 'Before you arrive', icon: Backpack, items: [['Age requirements', 'ageRequirement'], ['Swimming', 'swimmingRequirement'], ['Fitness', 'fitnessRequirement'], ['Health & participation', 'healthRequirements'], ['What to bring', 'whatToBring'], ['What’s included', 'included']] },
    { title: 'Facilities & meeting point', icon: MapPin, items: [['Meeting point', 'meetingPointAddress'], ['Directions', 'directions'], ['Facilities', 'facilities'], ['Location contact', 'contact']], extra: <p className="text-xs text-[#57717b]">Map: shown once verified meeting-point coordinates are supplied.</p> },
    { title: 'Safety', icon: ShieldCheck, items: [['Guides', 'guides'], ['Equipment & buoyancy aids', 'equipment'], ['Safety requirements', 'safetyRequirements'], ['Weather & session closures', 'weatherClosures']], extra: <a href={ROUTES.safety} className="inline-flex items-center text-sm font-bold text-[#0b7f95]">Safety & Responsible Tourism <ArrowRight className="ml-1 size-4" aria-hidden /></a> },
    { title: 'Seasonal information', icon: CloudRain, items: [['Monsoon, weather & seasonal operations', 'seasonal']] },
    { title: 'Booking policies', icon: FileText, items: [['Cancellation & refunds', 'cancellationPolicy'], ['Weather cancellations', 'weatherCancellation'], ['Rescheduling', 'rescheduling']] },
  ]

  return (
    <section aria-labelledby="visitor-info-title">
      <Eyebrow>Plan your visit</Eyebrow>
      <h2 id="visitor-info-title" className="mt-3 font-display text-3xl font-black sm:text-4xl">Good to know</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ title, icon: Icon, items, extra }) => (
          <div key={title} id={title === 'Booking policies' ? 'booking-policies' : undefined} className="scroll-mt-6 rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-bold"><Icon className="size-5 text-[#00a9c3]" aria-hidden />{title}</h3>
            <dl className="mt-4 space-y-3.5">
              {items.map(([label, key]) => (
                <div key={key}>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">{label}</dt>
                  <dd className="mt-1 text-sm leading-6 text-[#06263b]">{info[key] ?? <Pending>Awaiting approved client wording.</Pending>}</dd>
                </div>
              ))}
            </dl>
            {extra && <div className="mt-4 border-t border-[#eef2ed] pt-4">{extra}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export function LocationGallery({ location }: { location: Location }) {
  const media = location.gallery ?? []
  if (media.length === 0 && !IS_DEV) return null
  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="font-display text-2xl font-bold">Gallery</h2>
      {media.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {media.map((image) => <img key={image.src} src={image.src} alt={image.alt} loading="lazy" decoding="async" className="aspect-square w-full rounded-2xl object-cover" />)}
        </div>
      ) : (
        <div className="mt-4">
          <DevNote title="Gallery">No approved photos or videos are configured for {location.name}. Add them to <code>gallery</code>; guest images need recorded written permission, and identifiable children need parent or guardian consent. This section is hidden in production until media exists.</DevNote>
        </div>
      )}
    </section>
  )
}

export function LocationReviews({ location }: { location: Location }) {
  if (location.status !== 'operating') return null
  return (
    <section aria-labelledby="reviews-title" className="rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5 sm:p-8">
      <MessageSquareQuote className="size-7 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
      <h2 id="reviews-title" className="mt-4 font-display text-2xl font-bold">Guest reviews</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-[#57717b]">No reviews yet. Only guests with a verified booking at {location.name} will be able to leave a review here.</p>
    </section>
  )
}

export function LocationRelatedExperiences({ location }: { location: Location }) {
  const related = location.relatedExperiences ?? []
  const approved = related.filter((experience) => experience.approved)
  const pending = related.filter((experience) => !experience.approved)
  if (related.length === 0) return null

  return (
    <section aria-labelledby="related-title">
      {approved.length > 0 && (
        <>
          <Eyebrow>Make a day of it</Eyebrow>
          <h2 id="related-title" className="mt-3 font-display text-3xl font-black">More with Bond Safari</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {approved.map((experience) => (
              <div key={experience.name} className="rounded-3xl bg-[#0b3850] p-6 text-white">
                <Sparkles className="size-6 text-[#f5b82e]" aria-hidden />
                <h3 className="mt-6 font-display text-xl font-bold">{experience.name}</h3>
                <p className="mt-2 text-sm text-white/70">{experience.description}</p>
                <p className="mt-3 text-xs text-white/60">Separate eligibility and safety requirements apply.</p>
              </div>
            ))}
          </div>
        </>
      )}
      {pending.length > 0 && (
        <div className={approved.length ? 'mt-4' : ''}>
          <DevNote title="Cross-sell">{pending.map((experience) => experience.name).join(' and ')} from Bond Safari Kovalam can be shown here once approved and connected to live availability (set <code>approved: true</code>). Each activity’s own eligibility and safety checks must run before payment.</DevNote>
        </div>
      )}
    </section>
  )
}

export function LocationMobileCTA({ location }: { location: Location }) {
  const isOperating = location.status === 'operating'
  return (
    <div className="fixed inset-x-4 bottom-4 z-20 flex items-center gap-3 rounded-2xl border border-white/30 bg-[#06263b]/95 p-2 pl-4 text-white shadow-xl backdrop-blur-md lg:hidden">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{location.name}</p>
        <p className="flex items-center gap-1 text-xs text-white/70">
          {isOperating
            ? location.startingPrice ? `From ${formatPrice(location.startingPrice)}` : 'Operating now'
            : <><CalendarClock className="size-3" aria-hidden />{location.plannedOpening?.split(',')[0] ?? 'Coming soon'}</>}
        </p>
      </div>
      {isOperating
        ? <a href="#book" className={`rounded-xl bg-[#f5b82e] px-5 py-3 text-xs font-extrabold uppercase text-[#06263b] ${focusRing}`}>Book now</a>
        : <NotifyMeButton name={location.name} slug={location.slug} variant="solid" className="rounded-xl px-4" />}
    </div>
  )
}
