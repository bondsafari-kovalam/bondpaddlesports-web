import { ArrowRight, Compass, GraduationCap, Handshake, Heart, HeartPulse, Home, Leaf, LifeBuoy, ListChecks, Mountain, ShieldCheck, Users, Waves, type LucideIcon } from 'lucide-react'
import { ActivityCategoryCard } from '@/components/activities/activity-card'
import { QualificationPathway } from '@/components/academy/academy-sections'
import { LocationTile } from '@/components/locations/location-card'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { activities } from '@/lib/activities'
import { PARTNER_STATEMENT } from '@/lib/academy'
import { BOND_PHOTOS } from '@/lib/gallery'
import { locations } from '@/lib/locations'
import { BOND_BLUE_OPTIONS, SEASON_PASS, formatRupee } from '@/lib/membership'
import { ROUTES } from '@/lib/site'
import { ParallaxImage, RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { SectionNav } from '@/components/site/section-nav'
import { HERO_IMAGES } from '@/lib/hero-images'

const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-7 text-sm font-semibold text-ink transition hover:bg-white ${focusRing}`
const ghost = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink ${focusRing}`
const dark = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`
const textLink = `inline-flex min-h-11 w-fit items-center gap-1.5 border-b border-ink/25 text-sm font-semibold text-ink transition hover:border-ink ${focusRing}`

/** Shown where a destination page (Safety, Gallery) isn't built yet, instead of a broken link. */
export function ComingSoonLink({ children, tone = 'light' }: { children: string; tone?: 'light' | 'dark' }) {
  return <p className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold ${tone === 'dark' ? 'border-white/20 text-white/60' : 'border-ink/15 text-slate'}`}>{children} — coming soon</p>
}

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white lg:pb-28 lg:pt-48">
      <HeroBackdrop src={HERO_IMAGES.about} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> About Bond Safari</p>
          <h1 className="font-display text-6xl font-black leading-[.92] tracking-tight sm:text-8xl"><RevealLines>Kerala,<br /><span className="text-sand">from the water.</span></RevealLines></h1>
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

const NAV = [
  { id: 'story', label: 'Our story' },
  { id: 'purpose', label: 'Purpose' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'locations', label: 'Locations' },
  { id: 'academy', label: 'Academy' },
  { id: 'approach', label: 'Our approach' },
  { id: 'team', label: 'Team' },
  { id: 'community', label: 'Membership' },
]

export function AboutNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5 lg:px-8">
        <SectionNav sections={NAV} label="About page sections" layoutId="about-nav-pill" />
        <div className="hidden shrink-0 lg:block"><a href={ROUTES.book} className={`${dark} min-h-11`}>Book a paddle <ArrowRight className="size-4" aria-hidden /></a></div>
      </div>
    </div>
  )
}

export function OurStory() {
  const highlights: [LucideIcon, string][] = [[Compass, 'Discover the outdoors'], [GraduationCap, 'Learn and grow on the water'], [Users, 'Share experiences together']]
  return (
    <section id="story" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="story-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div className="relative">
          <ParallaxImage src={BOND_PHOTOS.teamWithFleet.src} alt={BOND_PHOTOS.teamWithFleet.alt} className="aspect-[3/2] rounded-3xl" strength={5} />
        </div>
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>A different way to experience Kerala.</RevealLines></h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-slate-strong">
            <p>Bond Safari Paddle Sports invites people to experience Kerala through its waterways. From guided paddling experiences to opportunities to learn new skills, our aim is to help more people discover the joy of being on the water.</p>
            <p>Whether you are trying paddling for the first time, exploring with friends and family, or developing your skills through the Academy, Bond Safari brings together outdoor adventure, healthy living, and a connection with nature.</p>
          </div>
          <RevealGroup as="ul" className="mt-10 grid border-t border-line sm:grid-cols-3">{highlights.map(([Icon, text]) => (
              <li key={text} className="flex items-center gap-3 border-b border-line py-4 text-sm font-semibold sm:flex-col sm:items-start sm:border-b-0 sm:border-r sm:px-5 sm:py-5 sm:first:pl-0 sm:last:border-r-0"><Icon className="size-6 shrink-0 text-teal-strong" strokeWidth={1.5} aria-hidden />{text}</li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

export function OurPurpose() {
  const values = [
    { icon: Mountain, title: 'Adventure', text: 'Discover new perspectives and explore Kerala’s waterways through paddling experiences.' },
    { icon: HeartPulse, title: 'Healthy living', text: 'Make time for movement, outdoor activity, and the simple pleasure of being on the water.' },
    { icon: Heart, title: 'Connection', text: 'Share experiences with friends, families, teams, and communities while building a deeper appreciation for nature.' },
  ]
  return (
    <section id="purpose" className="scroll-mt-16 bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="purpose-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow tone="cyan">Our purpose</Eyebrow>
        <h2 id="purpose-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Why Bond Safari exists.</RevealLines></h2>
        <RevealGroup className="mt-14 grid border-t border-white/15 md:grid-cols-3">{values.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <div className="flex items-center justify-between"><Icon className="size-8 text-sand" strokeWidth={1.4} aria-hidden /><span className="text-xs font-semibold tracking-[0.3em] text-white/50">0{i + 1}</span></div>
              <h3 className="mt-10 font-display text-3xl font-black tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{text}</p>
            </article>
          ))}
        </RevealGroup>
        <p className="mt-12 flex items-center gap-2 text-sm font-semibold text-white/80"><ShieldCheck className="size-5 text-sand" aria-hidden />Underpinned by safety and respect for nature, on every paddle.</p>
      </div>
    </section>
  )
}

export function OurExperiences() {
  const core = activities.filter((activity) => activity.featured)
  return (
    <section id="experiences" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="experiences-title">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div><Eyebrow>Our experiences</Eyebrow><h2 id="experiences-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Find your way onto the water.</RevealLines></h2></div>
        <a href={ROUTES.activities} className={textLink}>All activities <ArrowRight className="size-4" aria-hidden /></a>
      </div>
      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">{core.map((activity) => <ActivityCategoryCard key={activity.slug} activity={activity} />)}</RevealGroup>
    </section>
  )
}

export function OurLocations() {
  const shown = locations.filter((location) => location.hasDetailPage)
  return (
    <section id="locations" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="locations-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Discover Kerala</Eyebrow>
            <h2 id="locations-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Every waterway has a story.</RevealLines></h2>
            <p className="mt-4 text-base leading-7 text-slate-strong">Explore places where water, landscape, local culture, and outdoor adventure come together.</p>
          </div>
          <a href={ROUTES.locations} className={textLink}>Explore all locations <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <RevealGroup className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">{shown.map((location) => <LocationTile key={location.slug} location={location} className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto" />)}
        </RevealGroup>
      </div>
    </section>
  )
}

export function AboutAcademy() {
  return (
    <section id="academy" className="scroll-mt-16 bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="academy-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="cyan">Bond Safari Academy</Eyebrow>
            <h2 id="academy-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>From your first paddle<br /><span className="text-sand">to new possibilities.</span></RevealLines></h2>
          </div>
          <p className="text-base leading-7 text-white/70">The Bond Safari Academy supports people who want to discover paddling, develop their skills, and explore opportunities for further learning.</p>
        </div>
        <div className="mt-16"><QualificationPathway /></div>
        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="flex items-center gap-2 font-display text-lg font-bold"><Handshake className="size-5 text-sand" aria-hidden />{PARTNER_STATEMENT}</p>
            <p className="text-sm leading-6 text-white/65">Courses and professional development opportunities depend on course availability, eligibility and the applicable requirements. Professional courses are launching in 2027.</p>
          </div>
          <a href={ROUTES.academy} className={gold}>Explore the Academy <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

/** Safety and responsible tourism told together: how we prepare, and how we treat the places we paddle. */
export function SafetyApproach() {
  const safety: [LucideIcon, string][] = [[ListChecks, 'Appropriate activity selection'], [Users, 'Clear participant requirements'], [LifeBuoy, 'Responsible preparation and equipment'], [Waves, 'Respect for water conditions and the environment']]
  const responsible: [LucideIcon, string, string][] = [
    [Leaf, 'Respect the environment', 'Behave responsibly and care for the places you explore.'],
    [Home, 'Respect local communities', 'Be considerate of local residents, livelihoods and shared waterways.'],
    [Compass, 'Paddle responsibly', 'Follow location guidance, participant requirements and instructions from the team.'],
  ]
  return (
    <section id="approach" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="safety-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>Our approach</Eyebrow>
          <h2 id="safety-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Adventure, with care.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-slate-strong">We want every paddling experience to be enjoyable and responsibly planned. Activity suitability, conditions, equipment, and guidance all matter when choosing an experience on the water.</p>
          <div className="relative mt-10 hidden lg:block">
            <ParallaxImage src={BOND_PHOTOS.paddlesAndBuoyancyAid.src} alt={BOND_PHOTOS.paddlesAndBuoyancyAid.alt} className="aspect-[4/3] rounded-3xl" strength={5} />
          </div>
        </div>
        <div className="space-y-14">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">Safety on every paddle</h3>
            <RevealGroup as="ul" className="mt-5 divide-y divide-line border-y border-line">{safety.map(([Icon, text], i) => (
                <li key={text} className="flex items-center gap-4 py-4"><span className="w-6 text-xs font-semibold text-slate-light">0{i + 1}</span><Icon className="size-5 shrink-0 text-teal-strong" aria-hidden /><span className="font-semibold">{text}</span></li>
              ))}
            </RevealGroup>
            <a href={ROUTES.safety} className={`mt-6 ${textLink}`}>Read our safety guidelines <ArrowRight className="size-4" aria-hidden /></a>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">Responsible tourism</h3>
            <p className="mt-3 text-sm leading-6 text-slate-strong">Kerala’s waterways are part of a wider natural and cultural landscape. Responsible paddling means approaching these places thoughtfully, respecting local communities, and following guidance appropriate to each location.</p>
            <RevealGroup as="ul" className="mt-5 divide-y divide-line border-y border-line">{responsible.map(([Icon, title, text]) => (
                <li key={title} className="flex gap-4 py-5"><Icon className="mt-0.5 size-5 shrink-0 text-success" aria-hidden /><span><span className="block font-semibold">{title}</span><span className="text-sm text-slate">{text}</span></span></li>
              ))}
            </RevealGroup>
            <a href={`${ROUTES.safety}#responsible-tourism`} className={`mt-6 ${textLink}`}>Learn about responsible tourism <ArrowRight className="size-4" aria-hidden /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutMembership() {
  const items = [
    { name: 'Bond Safari Club', price: 'Free', text: 'Your free membership across participating Bond businesses.', href: `${ROUTES.membership}#club` },
    { name: 'Bond Blue', price: `From ${formatRupee(Math.min(...BOND_BLUE_OPTIONS.map((o) => o.price)))}/year`, text: 'Paid membership with eligible member benefits.', href: `${ROUTES.membership}#bond-blue` },
    { name: 'Paddle Season Pass', price: `${formatRupee(SEASON_PASS.price)}/season`, text: 'Seasonal paddling benefits, subject to the pass terms.', href: `${ROUTES.membership}#season-pass` },
  ]
  return (
    <section id="community" className="scroll-mt-16 border-t border-line bg-paper-bright px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="community-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Membership & community</Eyebrow>
            <h2 id="community-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Be part of the Bond Safari community.</RevealLines></h2>
            <p className="mt-4 text-base leading-7 text-slate-strong">Whether you are joining us for your first paddle or looking for ways to enjoy the water more often, discover the membership options designed around your adventures.</p>
          </div>
          <a href={ROUTES.membership} className={textLink}>Explore membership <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <RevealGroup as="ul" className="mt-12 grid border-t border-line md:grid-cols-3">{items.map((item) => (
            <li key={item.name} className="border-b border-line md:border-b-0 md:border-r md:last:border-r-0 md:first:*:pl-0">
              <a href={item.href} className={`group flex h-full flex-col py-8 md:px-8 ${focusRing}`}>
                <span className="text-sm text-slate">{item.name}</span>
                <span className="mt-2 font-display text-3xl font-black tracking-tight">{item.price}</span>
                <span className="mt-3 flex-1 text-sm leading-6 text-slate-strong">{item.text}</span>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-strong transition group-hover:text-ink">See details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></span>
              </a>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export function AboutFinalCTA() {
  return (
    <section className="bg-sand px-5 py-20 text-ink lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">Ready when you are</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Your Kerala adventure<br />starts here.</RevealLines></h2>
          <p className="mt-4 max-w-xl text-base text-ink/70">Find a location, choose your activity, and discover a different way to experience the water.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={ROUTES.book} className={dark}>Book your adventure <ArrowRight className="size-4" aria-hidden /></a>
          <a href={ROUTES.locations} className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Explore locations</a>
        </div>
      </div>
    </section>
  )
}

export function AboutMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-30 flex gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-sand text-sm font-semibold text-ink">Book a paddle</a>
      <a href={ROUTES.locations} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">Locations</a>
    </div>
  )
}
