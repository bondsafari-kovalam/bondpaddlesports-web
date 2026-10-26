import { ArrowRight, Compass, GraduationCap, Heart, HeartPulse, Home, Leaf, LifeBuoy, ListChecks, Mountain, ShieldCheck, Sparkles, Users, Waves, type LucideIcon } from 'lucide-react'
import { ActivityCategoryCard } from '@/components/activities/activity-card'
import { PartnerNote, QualificationPathway } from '@/components/academy/academy-sections'
import { PhotoPlaceholder } from '@/components/groups/groups-sections'
import { LocationCard } from '@/components/locations/location-card'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { Ripples } from '@/components/membership/membership-sections'
import { activities } from '@/lib/activities'
import { locations } from '@/lib/locations'
import { BOND_BLUE_OPTIONS, SEASON_PASS, formatRupee } from '@/lib/membership'
import { ROUTES } from '@/lib/site'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'

const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`
const ghost = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`
const dark = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#0b3850] ${focusRing}`
const textLink = `inline-flex min-h-11 items-center text-sm font-bold text-[#0b7f95] hover:text-[#06263b] ${focusRing}`

/** Approved team members only; leave empty rather than inventing people. */
const TEAM: { name: string; role: string; photo?: string; bio?: string }[] = []

/** Shown where a destination page (Safety, Gallery) isn't built yet, instead of a broken link. */
export function ComingSoonLink({ children, tone = 'light' }: { children: string; tone?: 'light' | 'dark' }) {
  return <p className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold ${tone === 'dark' ? 'border-white/20 text-white/60' : 'border-[#06263b]/15 text-[#57717b]'}`}>{children} — coming soon</p>
}

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#06263b] pb-20 pt-36 text-white lg:pb-32 lg:pt-48">
      <Ripples className="absolute -right-40 -top-24 size-[46rem] opacity-80" />
      <Ripples className="absolute -bottom-64 left-0 size-[34rem] opacity-50" tone="gold" />
      <svg viewBox="0 0 1440 120" className="absolute inset-x-0 bottom-0 w-full text-[#f6f3ec]" preserveAspectRatio="none" aria-hidden><path d="M0 80 C 240 40 480 120 720 80 S 1200 40 1440 80 V120 H0Z" fill="currentColor" /></svg>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> About Bond Safari</p>
          <h1 className="font-display text-6xl font-black leading-[.92] tracking-tight sm:text-8xl"><RevealLines>Kerala,<br /><span className="text-[#f5b82e]">from the water.</span></RevealLines></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Discover a different side of Kerala through paddling, outdoor adventure, and meaningful experiences on the water.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={ROUTES.activities} className={gold}>Explore our experiences <ArrowRight className="ml-2 size-4" aria-hidden /></a>
            <a href={ROUTES.locations} className={ghost}>Find a location</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function OurStory() {
  const highlights: [LucideIcon, string][] = [[Compass, 'Discover the outdoors'], [GraduationCap, 'Learn and grow on the water'], [Users, 'Share experiences together']]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="story-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <PhotoPlaceholder icon={Waves} label="Paddlers on Kerala's backwaters" className="aspect-[4/5] rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]" />
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>A different way to experience Kerala.</RevealLines></h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-[#3d5862]">
            <p>Bond Safari Paddle Sports invites people to experience Kerala through its waterways. From guided paddling experiences to opportunities to learn new skills, our aim is to help more people discover the joy of being on the water.</p>
            <p>Whether you are trying paddling for the first time, exploring with friends and family, or developing your skills through the Academy, Bond Safari brings together outdoor adventure, healthy living, and a connection with nature.</p>
          </div>
          <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-3">{highlights.map(([Icon, text]) => <li key={text} className="rounded-2xl bg-white p-4 text-sm font-bold ring-1 ring-[#06263b]/5"><Icon className="mb-3 size-6 text-[#00a9c3]" aria-hidden />{text}</li>)}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

export function OurPurpose() {
  const values = [
    { icon: Mountain, title: 'Adventure', text: 'Discover new perspectives and explore Kerala’s waterways through paddling experiences.', style: 'bg-white ring-1 ring-[#06263b]/5', accent: 'text-[#00a9c3]', bar: 'bg-[#00c8e8]' },
    { icon: HeartPulse, title: 'Healthy living', text: 'Make time for movement, outdoor activity, and the simple pleasure of being on the water.', style: 'bg-[#fff8e6] ring-1 ring-[#f5b82e]/30', accent: 'text-[#c95a22]', bar: 'bg-[#f5b82e]' },
    { icon: Heart, title: 'Connection', text: 'Share experiences with friends, families, teams, and communities while building a deeper appreciation for nature.', style: 'bg-[#0b3850] text-white', accent: 'text-[#00c8e8]', bar: 'bg-[#00c8e8]' },
  ]
  return (
    <section className="bg-white/60 px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="purpose-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Our purpose</Eyebrow>
        <h2 id="purpose-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Why Bond Safari exists.</RevealLines></h2>
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">{values.map(({ icon: Icon, title, text, style, accent, bar }, i) => (
            <article key={title} className={`relative overflow-hidden rounded-3xl p-7 ${style} ${i === 1 ? 'md:translate-y-6' : ''}`}>
              <div className={`absolute inset-x-0 top-0 h-1 ${bar}`} aria-hidden />
              <Icon className={`size-9 ${accent}`} strokeWidth={1.4} aria-hidden />
              <h3 className="mt-10 font-display text-2xl font-bold">{title}</h3>
              <p className={`mt-3 text-sm leading-6 ${i === 2 ? 'text-white/75' : 'text-[#3d5862]'}`}>{text}</p>
            </article>
          ))}
        </RevealGroup>
        <p className="mt-14 flex items-center gap-2 text-sm font-semibold text-[#3d5862]"><ShieldCheck className="size-5 text-[#14785a]" aria-hidden />Underpinned by safety and respect for nature, on every paddle.</p>
      </div>
    </section>
  )
}

export function OurExperiences() {
  const core = activities.filter((activity) => activity.featured)
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="experiences-title">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div><Eyebrow>Our experiences</Eyebrow><h2 id="experiences-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Find your way onto the water.</RevealLines></h2></div>
        <a href={ROUTES.activities} className={textLink}>All activities <ArrowRight className="ml-1 size-4" aria-hidden /></a>
      </div>
      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">{core.map((activity) => <ActivityCategoryCard key={activity.slug} activity={activity} />)}</RevealGroup>
    </section>
  )
}

export function OurLocations() {
  const shown = locations.filter((location) => location.hasDetailPage)
  return (
    <section className="bg-[#eef2ed] px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="locations-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Discover Kerala</Eyebrow>
            <h2 id="locations-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Every waterway has a story.</RevealLines></h2>
            <p className="mt-4 text-base leading-7 text-[#3d5862]">Explore places where water, landscape, local culture, and outdoor adventure come together.</p>
          </div>
          <a href={ROUTES.locations} className={dark}>Explore all locations</a>
        </div>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{shown.map((location) => <LocationCard key={location.slug} location={location} />)}</RevealGroup>
      </div>
    </section>
  )
}

export function AboutAcademy() {
  return (
    <section className="relative overflow-hidden bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-28" aria-labelledby="academy-title">
      <Ripples className="absolute -left-40 top-0 size-[36rem]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="cyan">Bond Safari Academy</Eyebrow>
            <h2 id="academy-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>From your first paddle<br /><span className="text-[#f5b82e]">to new possibilities.</span></RevealLines></h2>
          </div>
          <p className="text-base leading-7 text-white/70">The Bond Safari Academy supports people who want to discover paddling, develop their skills, and explore opportunities for further learning.</p>
        </div>
        <div className="mt-12"><QualificationPathway /></div>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-white/65">Courses and professional development opportunities depend on course availability, eligibility and the applicable requirements. Professional courses are launching in 2027.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a href={ROUTES.academy} className={gold}>Explore the Academy <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <div className="text-[#06263b]"><PartnerNote /></div>
        </div>
      </div>
    </section>
  )
}

export function SafetyApproach() {
  const principles: [LucideIcon, string][] = [[ListChecks, 'Appropriate activity selection'], [Users, 'Clear participant requirements'], [LifeBuoy, 'Responsible preparation and equipment'], [Waves, 'Respect for water conditions and the environment']]
  return (
    <section id="safety" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="safety-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <Eyebrow>Our approach to safety</Eyebrow>
          <h2 id="safety-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Adventure, with care.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-[#3d5862]">We want every paddling experience to be enjoyable and responsibly planned. Activity suitability, conditions, equipment, and guidance all matter when choosing an experience on the water.</p>
          <a href={ROUTES.safety} className={`mt-8 ${dark}`}>Read our safety guidelines</a>
        </div>
        <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2">{principles.map(([Icon, text], i) => (
            <li key={text} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#e1f6fa]"><Icon className="size-5 text-[#0b7f95]" aria-hidden /></span>
              <span className="mt-6 text-xs font-bold text-[#c95a22]">0{i + 1}</span>
              <span className="mt-1 font-display text-lg font-bold">{text}</span>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export function ResponsibleTourism() {
  const principles: [LucideIcon, string, string][] = [
    [Leaf, 'Respect the environment', 'Behave responsibly and care for the places you explore.'],
    [Home, 'Respect local communities', 'Be considerate of local residents, livelihoods and shared waterways.'],
    [Compass, 'Paddle responsibly', 'Follow location guidance, participant requirements and instructions from the team.'],
  ]
  return (
    <section className="bg-[#eaf1e6] px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="responsible-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Eyebrow>Responsible tourism</Eyebrow>
          <h2 id="responsible-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Enjoy the water. Respect the places that make it special.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-[#3d5862]">Kerala’s waterways are part of a wider natural and cultural landscape. Responsible paddling means approaching these places thoughtfully, respecting local communities, and following guidance appropriate to each location.</p>
          <ul className="mt-8 space-y-3">
            {principles.map(([Icon, title, text]) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white/80 p-5">
                <Icon className="mt-0.5 size-6 shrink-0 text-[#14785a]" aria-hidden />
                <span><span className="block font-display text-lg font-bold">{title}</span><span className="text-sm text-[#3d5862]">{text}</span></span>
              </li>
            ))}
          </ul>
          <a href={`${ROUTES.safety}#responsible-tourism`} className={`mt-8 ${dark}`}>Learn about responsible tourism</a>
        </div>
        <PhotoPlaceholder icon={Leaf} label="Kerala's natural waterways" className="aspect-[4/5] rounded-3xl" />
      </div>
    </section>
  )
}

export function OurPeople() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="people-title">
      <div className="max-w-2xl">
        <Eyebrow>Our people</Eyebrow>
        <h2 id="people-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>People who help bring every paddle to life.</RevealLines></h2>
        <p className="mt-4 text-base leading-7 text-[#3d5862]">Behind every experience are people who help plan, organise, and support activities on the water.</p>
      </div>
      {TEAM.length ? (
        <RevealGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{TEAM.map((member) => (
            <li key={member.name} className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
              {member.photo && <img src={member.photo} alt={`${member.name}, ${member.role}`} loading="lazy" className="aspect-square w-full object-cover" />}
              <div className="p-5"><p className="font-display text-lg font-bold">{member.name}</p><p className="text-sm text-[#57717b]">{member.role}</p>{member.bio && <p className="mt-2 text-sm leading-6">{member.bio}</p>}</div>
            </li>
          ))}
        </RevealGroup>
      ) : (
        <div className="mt-10 flex items-center gap-4 rounded-3xl border border-dashed border-[#06263b]/15 bg-white p-6">
          <Users className="size-8 shrink-0 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
          <p className="text-sm leading-6 text-[#57717b]">Team introductions will appear here soon.</p>
        </div>
      )}
    </section>
  )
}

export function AboutMembership() {
  const items = [
    { name: 'Bond Safari Club', price: 'Free', text: 'Your free membership across participating Bond businesses.' },
    { name: 'Bond Blue', price: `From ${formatRupee(Math.min(...BOND_BLUE_OPTIONS.map((o) => o.price)))}/year`, text: 'Paid membership with eligible member benefits.' },
    { name: 'Paddle Season Pass', price: `${formatRupee(SEASON_PASS.price)}/season`, text: 'Seasonal paddling benefits, subject to the pass terms.' },
  ]
  return (
    <section className="bg-white px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="community-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <Eyebrow>Membership & community</Eyebrow>
          <h2 id="community-title" className="mt-3 font-display text-4xl font-black"><RevealLines>Be part of the Bond Safari community.</RevealLines></h2>
          <p className="mt-4 text-base leading-7 text-[#3d5862]">Whether you are joining us for your first paddle or looking for ways to enjoy the water more often, discover the membership options designed around your adventures.</p>
          <a href={ROUTES.membership} className={`mt-8 ${dark}`}>Explore membership</a>
        </div>
        <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-3">{items.map((item, i) => (
            <li key={item.name} className={`rounded-3xl p-6 ${i === 1 ? 'bg-[#0b3850] text-white' : 'bg-[#f6f3ec]'}`}>
              <Sparkles className={`size-6 ${i === 1 ? 'text-[#00c8e8]' : i === 2 ? 'text-[#c95a22]' : 'text-[#00a9c3]'}`} aria-hidden />
              <p className="mt-6 font-display text-lg font-bold">{item.name}</p>
              <p className={`mt-1 font-bold ${i === 1 ? 'text-[#f5b82e]' : 'text-[#c95a22]'}`}>{item.price}</p>
              <p className={`mt-2 text-sm leading-6 ${i === 1 ? 'text-white/70' : 'text-[#57717b]'}`}>{item.text}</p>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export function AboutGallery() {
  const tiles: { icon: LucideIcon; label: string; className: string }[] = [
    { icon: Waves, label: 'Open water on a Kerala backwater', className: 'col-span-2 row-span-2' },
    { icon: Compass, label: 'Exploring a narrow channel', className: '' },
    { icon: Leaf, label: 'Waterside greenery', className: '' },
    { icon: Users, label: 'Paddling together', className: 'col-span-2' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="gallery-title">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div><Eyebrow>Gallery</Eyebrow><h2 id="gallery-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>A glimpse of life on the water.</RevealLines></h2></div>
        <a href={ROUTES.gallery} className={dark}>View gallery</a>
      </div>
      <RevealGroup className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4">{tiles.map(({ icon, label, className }) => <PhotoPlaceholder key={label} icon={icon} label={label} className={`rounded-3xl transition duration-500 hover:brightness-110 ${className}`} />)}
      </RevealGroup>
    </section>
  )
}

export function AboutFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0b3850] px-5 py-20 text-white lg:px-8 lg:py-28">
      <Ripples className="absolute -right-24 top-1/2 size-[40rem] -translate-y-1/2" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <h2 className="max-w-2xl font-display text-4xl font-black sm:text-6xl"><RevealLines>Your Kerala adventure <span className="text-[#f5b82e]">starts here.</span></RevealLines></h2>
          <p className="mt-4 max-w-xl text-base text-white/70">Find a location, choose your activity, and discover a different way to experience the water.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={ROUTES.book} className={gold}>Book your adventure <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <a href={ROUTES.locations} className={ghost}>Explore locations</a>
        </div>
      </div>
    </section>
  )
}

export function AboutMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 rounded-2xl border border-white/30 bg-[#06263b]/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#f5b82e] text-xs font-extrabold uppercase text-[#06263b]">Book now</a>
      <a href={ROUTES.locations} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-xs font-extrabold uppercase text-white">Locations</a>
    </div>
  )
}
