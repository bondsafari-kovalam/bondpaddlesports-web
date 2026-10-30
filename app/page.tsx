import { ArrowRight } from 'lucide-react'
import { HomeBooking } from '@/components/home/home-booking'
import { HomeExperiences } from '@/components/home/home-experiences'
import { HomeHero } from '@/components/home/home-hero'
import { ParallaxImage, Reveal, RevealLines } from '@/components/motion/reveal'
import { ExpandingFilm, ScrollRevealText } from '@/components/motion/scroll-story'
import { FILMS } from '@/lib/media'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const locations = [
  {
    name: 'Muziris–Kottapuram',
    meta: 'Backwaters · North Paravur',
    price: 'From ₹1,200',
    image: '/images/bond/paddling-under-monsoon-skies.jpg',
    status: 'Operating now',
  },
  {
    name: 'Muziris–North Paravur',
    meta: 'Thattukadavu Jetty · Backwaters',
    price: 'From ₹1,200',
    image: 'https://images.unsplash.com/photo-1554200429-bd32416aca62?auto=format&fit=crop&w=1200&q=85',
    status: 'Operating now',
  },
  {
    name: 'Kovalam',
    meta: 'Sea · South Kerala',
    price: 'Kayaking · Canoeing',
    image: '/images/bond/red-kayak-at-the-shoreline-from-above.jpg',
    status: 'Operating now',
  },
]

// A Server Component: only the booking panel, motion wrappers and films hydrate on the client.
const memberships = [
  { name: 'Bond Safari Club', activity: 'Canoeing', image: '/images/bond/afternoon-paddle-by-the-reeds.jpg', text: 'Free membership across the Bond Group.', price: 'Free', note: 'No yearly fee', href: '/membership#club' },
  { name: 'Bond Blue', activity: 'Kayaking', image: '/images/bond/red-kayak-at-the-shoreline-from-above.jpg', text: '15% off, double Pearls and more.', price: 'From ₹999', note: 'per year', href: '/membership#bond-blue', featured: true },
  { name: 'Paddle Season Pass', activity: 'Stand-up paddleboarding', image: '/images/bond/sup-paddling-at-sunset.jpg', text: 'Make paddling part of your season.', price: 'Launching soon', note: 'With live schedules', href: '/membership#season-pass' },
]

// The gold contact chip printed on a bank card.
function CardChip() {
  return (
    <svg viewBox="0 0 44 34" className="h-8 w-11 drop-shadow-sm" aria-hidden>
      <defs><linearGradient id="chip-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3e2b6" /><stop offset=".5" stopColor="#c9a764" /><stop offset="1" stopColor="#e9d29c" /></linearGradient></defs>
      <rect x=".5" y=".5" width="43" height="33" rx="6" fill="url(#chip-gold)" stroke="#a88a4c" />
      <path d="M15 .5v33M29 .5v33M.5 12h14.5M29 12h14.5M.5 22h14.5M29 22h14.5M15 17h14" stroke="#a88a4c" strokeWidth="1" fill="none" />
    </svg>
  )
}

// The contactless "tap" waves.
function Contactless() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 text-white/85" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M8.5 9.5a4 4 0 0 1 0 5M12 7a8 8 0 0 1 0 10M15.5 4.5a12 12 0 0 1 0 15" />
    </svg>
  )
}

function MembershipCard({ tier, delay }: { tier: (typeof memberships)[number]; delay: number }) {
  return (
    <Reveal as="article" delay={delay} className="group">
      <a href={tier.href} className={`relative block aspect-[1.586/1] overflow-hidden rounded-[1.25rem] bg-ink text-white shadow-[0_20px_40px_-18px_rgba(16,36,31,.55)] transition duration-500 [transform:perspective(900px)] group-hover:-translate-y-1.5 group-hover:[transform:perspective(900px)_rotateX(4deg)] group-hover:shadow-[0_32px_50px_-20px_rgba(16,36,31,.6)] ${tier.featured ? 'ring-2 ring-sand' : 'ring-1 ring-white/10'}`} aria-label={`${tier.name}: ${tier.price}`}>
        <div className="absolute inset-0"><ParallaxImage src={tier.image} alt="" className="size-full" imgClassName="transition duration-1000 group-hover:scale-105" strength={5} sizes="(min-width: 768px) 33vw, 100vw" /></div>
        <div className="absolute inset-0 bg-gradient-to-br from-ink-deep/70 via-ink/25 to-ink-deep/85" />
        {/* Glossy sheen that sweeps across on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-1000 group-hover:translate-x-full" />

        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-sand">Bond Safari</p>
              <h3 className="mt-1 font-display text-xl font-bold leading-tight">{tier.name}</h3>
            </div>
            <Contactless />
          </div>

          <CardChip />

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">Member</p>
              <p className="truncate text-xs font-semibold uppercase tracking-[0.12em]">{tier.activity}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg font-black leading-none">{tier.price}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/60">{tier.note}</p>
            </div>
          </div>
        </div>
      </a>
      <div className="mt-5 flex items-center justify-between gap-4 px-1">
        <p className="text-sm leading-6 text-slate">{tier.text}</p>
        <a href={tier.href} tabIndex={-1} aria-hidden className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 transition group-hover:border-ink group-hover:bg-ink group-hover:text-white"><ArrowRight className="size-4" /></a>
      </div>
    </Reveal>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <SiteHeader bookHref="#book" />

      <HomeHero />

      <HomeBooking />

      <section className="mx-auto max-w-6xl px-5 py-28 lg:px-8 lg:py-40" aria-label="Our story">
        <p className="mb-8 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Kerala, from the water</p>
        <ScrollRevealText className="font-display text-3xl font-semibold leading-[1.2] tracking-tight text-ink sm:text-5xl lg:text-6xl" text="Long before roads, Kerala moved by water. These backwaters carried spice, stories and everyday life. We help you see them the way they were meant to be seen: slowly, quietly, from the water." />
      </section>

      <section id="locations" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Go somewhere good</p><h2 className="mt-3 max-w-xl font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Water has a way<br />of changing everything.</RevealLines></h2></div><a href="/locations" className="text-sm font-bold text-teal">View all locations <ArrowRight className="ml-1 inline size-4" /></a></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{locations.map((location, i) => <Reveal as="article" key={location.name} delay={i * 0.1} className="group overflow-hidden rounded-3xl bg-white shadow-sm"><div className="relative h-72 overflow-hidden"><ParallaxImage src={location.image} alt="Scenic water landscape" className="size-full" sizes="(min-width: 768px) 33vw, 100vw" imgClassName="transition duration-1000 group-hover:scale-105" /><span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${location.status === 'Operating now' ? 'bg-success-soft text-success' : 'bg-white/90 text-slate'}`}>{location.status}</span></div><div className="p-5"><h3 className="font-display text-xl font-bold">{location.name}</h3><p className="mt-1 text-sm text-slate-light">{location.meta}</p><div className="mt-6 flex items-center justify-between"><span className="text-sm font-bold text-teal-strong">{location.price}</span><button className="flex items-center gap-1 text-sm font-bold text-ink">{location.status === 'Operating now' ? 'Book now' : 'Notify me'} <ArrowRight className="size-4" /></button></div></div></Reveal>)}</div>
      </section>

      <ExpandingFilm film={FILMS.kayaking}>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Muziris heritage waterways</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-black leading-[1] tracking-tight sm:text-6xl lg:text-7xl">Where the spice routes<br /><span className="text-sand">meet still water.</span></h2>
        <a href="/locations" className="mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm font-semibold transition hover:border-sand hover:text-sand">Explore our locations <ArrowRight className="size-4" aria-hidden /></a>
      </ExpandingFilm>

      <HomeExperiences />

      <section id="academy" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-32"><Reveal className="relative overflow-hidden rounded-3xl bg-ink-soft p-8 text-white sm:p-12"><div className="absolute -right-16 -top-16 size-56 rounded-full border-[24px] border-teal-bright/15" /><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Bond Safari Academy</p><h2 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl"><RevealLines delay={0.2}>From first<br />stroke to<br /><span className="text-sand">future guide.</span></RevealLines></h2><p className="mt-6 max-w-sm text-sm leading-6 text-white/70">Build confidence, learn safely and discover a pathway into paddlesport leadership.</p><a href="/academy" className="mt-8 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-bold text-ink">Explore the Academy <ArrowRight className="ml-2 size-4" /></a></Reveal><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Learn with purpose</p><h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Try. Learn.<br />Qualify. Lead.</RevealLines></h2><p className="mt-6 max-w-lg text-base leading-7 text-slate">A clear qualification pathway for curious beginners, aspiring guides and professional paddlesport learners.</p><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">{['Try', 'Learn', 'Qualify', 'Lead', 'Coach', 'Tutor'].map((step, i) => <Reveal key={step} delay={i * 0.06} className="rounded-2xl border border-line bg-white p-4"><span className="text-xs font-bold text-teal">0{i + 1}</span><p className="mt-6 font-display text-lg font-bold">{step}</p></Reveal>)}</div><p className="mt-6 text-xs text-slate-light">Paddle UK courses from 2027, subject to approval.</p></div></section>

      <section id="membership" className="bg-mist px-5 py-24 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Stay in the flow</p><h2 className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>More water.<br />More reasons to return.</RevealLines></h2></div><a href="/membership" className="text-sm font-bold text-teal">Compare membership <ArrowRight className="ml-1 inline size-4" /></a></div><div className="mt-12 grid gap-5 md:grid-cols-3">{memberships.map((tier, i) => <MembershipCard key={tier.name} tier={tier} delay={i * 0.1} />)}</div></div></section>

      <section id="groups-corporate" className="relative overflow-hidden bg-sand px-5 py-20 text-ink lg:px-8"><div className="absolute -right-20 -top-28 size-96 rounded-full border-[52px] border-white/10" /><div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">For groups, schools & teams</p><h2 className="mt-3 max-w-2xl font-display text-4xl font-black sm:text-5xl"><RevealLines>Take the whole team<br />somewhere different.</RevealLines></h2></div><a href="/groups-corporate" className="inline-flex w-fit items-center rounded-full bg-ink px-6 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-white">Start an enquiry <ArrowRight className="ml-2 size-4" /></a></div></section>

      <SiteFooter />
      <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 rounded-2xl border border-white/30 bg-ink/95 p-2 shadow-xl backdrop-blur-md sm:hidden"><a href="#book" className="flex flex-1 items-center justify-center rounded-xl bg-sand py-3 text-xs font-extrabold uppercase text-ink">Book now</a><a href="#locations" className="flex flex-1 items-center justify-center rounded-xl bg-white/10 py-3 text-xs font-extrabold uppercase text-white">Locations</a><a href="#contact" className="flex flex-1 items-center justify-center rounded-xl bg-white/10 py-3 text-xs font-extrabold uppercase text-white">WhatsApp</a></div>
    </main>
  )
}
