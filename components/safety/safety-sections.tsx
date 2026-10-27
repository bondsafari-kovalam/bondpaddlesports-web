import type { ReactNode } from 'react'
import {
  AlertCircle, ArrowRight, Backpack, Bird, CalendarClock, ChevronDown, ClipboardCheck, Clock, CloudSun, Compass, FileText,
  Hand, Heart, Home, Leaf, LifeBuoy, ListChecks, Mail, MapPin, MessageCircle, Mountain, Phone, Recycle, Shirt, ShieldCheck, Sparkles, Users, Waves,
  type LucideIcon,
} from 'lucide-react'
import { ComingSoonLink } from '@/components/about/about-sections'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { Ripples } from '@/components/membership/membership-sections'
import { activities, activityHref } from '@/lib/activities'
import { CONTACT, ROUTES } from '@/lib/site'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { HERO_IMAGES } from '@/lib/hero-images'

const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`
const ghost = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`
const dark = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#0b3850] ${focusRing}`
const textLink = `inline-flex min-h-11 items-center text-sm font-bold text-[#0b7f95] hover:text-[#06263b] ${focusRing}`

export function SafetyHero() {
  return (
    <section className="relative overflow-hidden bg-[#06263b] pb-20 pt-36 text-white lg:pb-32 lg:pt-48">
      <HeroBackdrop src={HERO_IMAGES.safety} aboveWave />
      <Ripples className="absolute -right-40 -top-24 size-[46rem] opacity-80" />
      <Ripples className="absolute -bottom-64 left-0 size-[34rem] opacity-40" tone="gold" />
      <svg viewBox="0 0 1440 120" className="absolute inset-x-0 bottom-0 w-full text-[#f6f3ec]" preserveAspectRatio="none" aria-hidden><path d="M0 80 C 240 40 480 120 720 80 S 1200 40 1440 80 V120 H0Z" fill="currentColor" /></svg>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> Safety & Responsible Tourism</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl"><RevealLines>Adventure is better<br /><span className="text-[#f5b82e]">when we care.</span></RevealLines></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Enjoy Kerala’s waterways with thoughtful preparation, responsible paddling, and respect for the places and people that make every experience special.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#before-you-paddle" className={gold}>Before you paddle <ArrowRight className="ml-2 size-4" aria-hidden /></a>
            <a href="#responsible-tourism" className={ghost}>Our responsible tourism approach</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SafetyApproachSection() {
  const principles: [LucideIcon, string, string][] = [
    [ListChecks, 'Choose the right activity', 'Activity suitability depends on the location, conditions, participant requirements, and the experience offered.'],
    [ClipboardCheck, 'Prepare before you go', 'Understand the session details, participation requirements, and any information shared before your visit.'],
    [Users, 'Follow the team’s guidance', 'Pay attention to the instructions and safety guidance provided for the specific activity.'],
    [CloudSun, 'Respect changing conditions', 'Weather, water conditions, and operational decisions can affect whether a session can proceed.'],
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="approach-title">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Eyebrow>Our approach to safety</Eyebrow>
          <h2 id="approach-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Enjoy the adventure. Respect the conditions.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-[#3d5862]">Every paddling experience depends on the activity, location, water conditions, and the people taking part. We encourage every participant to understand the requirements of their chosen activity, follow the guidance provided by the team, and communicate any concerns before getting on the water.</p>
          <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">{principles.map(([Icon, title, text]) => (
              <li key={title} className="rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
                <span className="flex size-11 items-center justify-center rounded-full bg-[#e1f6fa]"><Icon className="size-5 text-[#0b7f95]" aria-hidden /></span>
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#57717b]">{text}</p>
              </li>
            ))}
          </RevealGroup>
        </div>
        <img src={HERO_IMAGES.academy} alt="Paddlers wearing helmets and buoyancy aids prepare for a session" className="aspect-[4/5] w-full rounded-3xl object-cover" />
      </div>
    </section>
  )
}

export function BeforeYouPaddle() {
  const checks: [LucideIcon, string][] = [
    [FileText, 'Read the activity description and participation requirements.'],
    [MapPin, 'Check your booking confirmation and meeting-point instructions.'],
    [Clock, 'Arrive at the time communicated for your session.'],
    [Users, 'Follow the team’s instructions before and during the activity.'],
    [Shirt, 'Wear clothing appropriate for the activity and conditions.'],
    [LifeBuoy, 'Use the equipment provided or approved for your session.'],
    [Heart, 'Tell the team about relevant participation or accessibility requirements before the session.'],
    [ShieldCheck, 'Follow any activity-specific swimming, age, health or fitness requirements.'],
    [MessageCircle, 'Ask questions if you are unsure about an instruction or requirement.'],
  ]
  return (
    <section id="before-you-paddle" className="scroll-mt-6 bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-28" aria-labelledby="checklist-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow tone="cyan">Before you paddle</Eyebrow>
        <h2 id="checklist-title" className="mt-3 max-w-3xl font-display text-4xl font-black sm:text-5xl"><RevealLines>A few things to check <span className="text-[#f5b82e]">before you head out.</span></RevealLines></h2>
        <RevealGroup as="ul" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{checks.map(([Icon, text]) => (
            <li key={text} className="flex gap-4 rounded-3xl bg-white/[.06] p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#00c8e8]/15"><Icon className="size-5 text-[#00c8e8]" aria-hidden /></span>
              <span className="pt-2 text-sm leading-6 text-white/85">{text}</span>
            </li>
          ))}
        </RevealGroup>
        <p className="mt-8 flex gap-3 rounded-2xl bg-[#f5b82e] p-5 text-sm font-semibold text-[#06263b]"><AlertCircle className="size-5 shrink-0" aria-hidden />Requirements vary by activity and location. Review the information provided for your specific session before arriving.</p>
      </div>
    </section>
  )
}

export function EquipmentGuidance() {
  const cards: [LucideIcon, string, string][] = [
    [Backpack, 'Activity-appropriate equipment', 'Understand which equipment is provided and what you may need to bring.'],
    [FileText, 'Clear session guidance', 'Review the information provided about meeting points, session format, and participation requirements.'],
    [Hand, 'Speak up before starting', 'Raise questions or concerns with the team before your activity begins.'],
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="equipment-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <img src={HERO_IMAGES.safety} alt="Kayak and life jackets ready beside the water" className="aspect-[4/3] w-full rounded-3xl object-cover lg:aspect-[4/5]" />
        <div>
          <Eyebrow>Equipment & guidance</Eyebrow>
          <h2 id="equipment-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>The right preparation makes a difference.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-[#3d5862]">Different paddling activities and locations have different equipment and preparation needs. Follow the instructions provided for your session and ask the team if you are unsure what to bring.</p>
          <ul className="mt-8 space-y-3">
            {cards.map(([Icon, title, text]) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-[#06263b]/5">
                <Icon className="mt-0.5 size-6 shrink-0 text-[#00a9c3]" aria-hidden />
                <span><span className="block font-display text-lg font-bold">{title}</span><span className="text-sm text-[#57717b]">{text}</span></span>
              </li>
            ))}
          </ul>
          <a href={ROUTES.activities} className={`mt-8 ${dark}`}>Explore activities</a>
        </div>
      </div>
    </section>
  )
}

export function WeatherConditions() {
  const items: [LucideIcon, string][] = [[CloudSun, 'Weather conditions'], [Waves, 'Water and local environmental conditions'], [Users, 'Activity and participant suitability'], [CalendarClock, 'Operational decisions and session updates']]
  return (
    <section id="conditions" className="scroll-mt-6 bg-[#eef2ed] px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="conditions-title">
      <div className="mx-auto max-w-7xl">
        <img src={HERO_IMAGES.about} alt="Calm Kerala backwaters framed by coconut palms" className="aspect-[16/7] w-full rounded-3xl object-cover" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Weather & water conditions</Eyebrow>
            <h2 id="conditions-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Nature sets the conditions.</RevealLines></h2>
            <p className="mt-5 text-base leading-7 text-[#3d5862]">Water-based activities depend on environmental and operational conditions. Weather, water levels, currents, visibility, and other local factors may affect whether an activity can safely proceed.</p>
            <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-2">{items.map(([Icon, text]) => <li key={text} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-semibold"><Icon className="size-5 shrink-0 text-[#00a9c3]" aria-hidden />{text}</li>)}
            </RevealGroup>
          </div>
          <aside className="h-fit rounded-3xl bg-[#0b3850] p-7 text-white" aria-labelledby="session-change">
            <AlertCircle className="size-8 text-[#f5b82e]" strokeWidth={1.4} aria-hidden />
            <h3 id="session-change" className="mt-5 font-display text-2xl font-bold">Your session may need to change.</h3>
            <p className="mt-3 text-sm leading-6 text-white/75">Where conditions or operational requirements affect a session, follow the instructions and updates communicated by Bond Safari. Any rescheduling, cancellation, or refund will be handled according to the applicable booking policy, which will be confirmed through your official booking information.</p>
            <div className="mt-6"><ComingSoonLink tone="dark">Booking & cancellation policy</ComingSoonLink></div>
          </aside>
        </div>
      </div>
    </section>
  )
}

const tourismPrinciples: { icon: LucideIcon; title: string; points: string[] }[] = [
  { icon: Recycle, title: 'Protect the environment', points: ['Avoid littering.', 'Use designated disposal facilities where available.', 'Avoid unnecessary disturbance to the surrounding environment.', 'Follow local guidance about sensitive areas.'] },
  { icon: Bird, title: 'Respect wildlife', points: ['Observe wildlife from a respectful distance.', 'Avoid chasing, touching, or disturbing animals.', 'Follow local instructions around wildlife and sensitive habitats.'] },
  { icon: Home, title: 'Respect local communities', points: ['Be considerate of local residents, livelihoods, and other water users.', 'Respect local customs and community guidance.', 'Avoid unnecessary noise or disruptive behaviour.'] },
  { icon: Waves, title: 'Use waterways responsibly', points: ['Follow the instructions given for the activity and location.', 'Respect other people using the waterways.', 'Follow designated access and meeting-point instructions where provided.'] },
]

export function ResponsibleTourismSection() {
  return (
    <section id="responsible-tourism" className="scroll-mt-6 relative overflow-hidden bg-[#eaf1e6] px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="tourism-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Responsible tourism</Eyebrow>
            <h2 id="tourism-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Explore with respect. Leave a lighter footprint.</RevealLines></h2>
          </div>
          <p className="text-base leading-7 text-[#3d5862]">Kerala’s waterways connect natural landscapes, local communities, and everyday life. Responsible tourism means enjoying these places thoughtfully and respecting the environment and people who share them.</p>
        </div>
        <img src={HERO_IMAGES.activities} alt="Kerala backwaters and palm-lined waterways" className="mt-12 aspect-[16/6] w-full rounded-3xl object-cover" />
        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tourismPrinciples.map(({ icon: Icon, title, points }) => (
            <article key={title} className="rounded-3xl bg-white p-6 ring-1 ring-[#14785a]/10">
              <Icon className="size-8 text-[#14785a]" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#3d5862]">{points.map((point) => <li key={point} className="flex gap-2"><Leaf className="mt-1.5 size-3 shrink-0 text-[#14785a]" aria-hidden />{point}</li>)}</ul>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export function LocalCulture() {
  const highlights: [LucideIcon, string][] = [[Home, 'Respect local customs and shared spaces.'], [Users, 'Be considerate of residents and other water users.'], [Mountain, 'Appreciate the local landscape without disturbing it.']]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="culture-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>Local culture & community</Eyebrow>
          <h2 id="culture-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Every place has a story.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-[#3d5862]">Exploring Kerala’s waterways is also an opportunity to appreciate the places and communities connected to them. Travel thoughtfully, respect local people, and approach each destination with curiosity and care.</p>
          <a href={ROUTES.locations} className={`mt-8 ${dark}`}>Explore our locations</a>
        </div>
        <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-3">{highlights.map(([Icon, text], i) => (
            <li key={text} className={`flex flex-col rounded-3xl p-6 ${i === 1 ? 'bg-[#0b3850] text-white sm:translate-y-6' : 'bg-white ring-1 ring-[#06263b]/5'}`}>
              <Icon className={`size-8 ${i === 1 ? 'text-[#f5b82e]' : 'text-[#00a9c3]'}`} strokeWidth={1.4} aria-hidden />
              <p className="mt-10 font-display text-lg font-bold leading-snug">{text}</p>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export function GroupPreparation() {
  const points = [
    'Group organisers should communicate the approximate participant count and relevant requirements accurately.',
    'Schools and youth groups should confirm supervision and parental or guardian consent requirements.',
    'Participants should follow activity-specific age and participation requirements.',
    'Accessibility or other practical needs should be communicated before the visit so the team can discuss suitable arrangements.',
    'Participants should follow the instructions provided for their session.',
  ]
  return (
    <section className="bg-white px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="groups-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <Eyebrow>Groups & families</Eyebrow>
          <h2 id="groups-title" className="mt-3 font-display text-4xl font-black"><RevealLines>Good experiences begin with good preparation.</RevealLines></h2>
          <p className="mt-4 text-sm leading-6 text-[#57717b]">Not every activity suits every participant, and arrangements vary by location. The team will discuss what’s possible for your group.</p>
          <a href={ROUTES.groups} className={`mt-8 ${dark}`}>Plan a group experience</a>
        </div>
        <ol className="space-y-3">
          {points.map((point, i) => (
            <li key={point} className="flex gap-4 rounded-2xl bg-[#f6f3ec] p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#06263b] font-display text-sm font-bold text-white">{i + 1}</span>
              <p className="pt-1.5 text-sm leading-6">{point}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const confirm = 'Requirements depend on the activity and location. Check the information for your session or ask the Bond Safari team before you book.'

const faqs: { q: string; a: ReactNode }[] = [
  { q: 'Do I need swimming experience to participate?', a: `Swimming requirements depend on the activity and location. ${confirm}` },
  { q: 'What should I wear for a paddling session?', a: 'Wear clothing appropriate for the activity and the conditions on the day. Any specific guidance for your session will be shared with your booking information.' },
  { q: 'Is equipment provided?', a: 'Which equipment is provided depends on the activity and session. Use the equipment provided or approved for your session, and check your session information for what to bring.' },
  { q: 'What happens if the weather changes?', a: 'Weather and water conditions can affect whether a session goes ahead. Follow the updates communicated by Bond Safari; any rescheduling, cancellation or refund is handled according to the applicable booking policy.' },
  { q: 'Can children participate?', a: `Age requirements depend on the activity. Children must meet the activity-specific requirements, and school and youth groups confirm supervision and parent or guardian consent. ${confirm}` },
  { q: 'Do I need to arrive before my scheduled session?', a: 'Arrive at the time communicated for your session in your booking information.' },
  { q: 'What if I have an accessibility requirement?', a: 'Let the team know before your visit so they can discuss suitable arrangements. Arrangements vary by activity and location.' },
  { q: 'Can I participate if I have a health or fitness concern?', a: 'Please raise it with the team before booking. Activity-specific health and fitness requirements apply and will be confirmed for your session.' },
  { q: 'What happens if Bond Safari needs to cancel a session?', a: 'You’ll be told through the contact details on your booking. Rescheduling, cancellation and refunds follow the applicable booking policy.' },
  { q: 'How can I find the requirements for my chosen activity?', a: <>Each activity page has a safety and preparation section, and location pages list visitor information. <a href={ROUTES.activities} className="font-bold text-[#0b7f95]">Browse activities</a> or <a href={ROUTES.locations} className="font-bold text-[#0b7f95]">locations</a>.</> },
]

export function SafetyFAQ() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20 lg:py-28" aria-labelledby="faq-title">
      <Eyebrow>Safety FAQs</Eyebrow>
      <h2 id="faq-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Questions people ask.</RevealLines></h2>
      <div className="mt-10 divide-y divide-[#dfe6e5] overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group">
            <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display font-bold hover:bg-[#f8faf8] [&::-webkit-details-marker]:hidden ${focusRing}`}>{q}<ChevronDown className="size-5 shrink-0 text-[#00a9c3] transition group-open:rotate-180" aria-hidden /></summary>
            <div className="px-6 pb-5 text-sm leading-6 text-[#3d5862]">{a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}

const activityCopy: Record<string, string> = {
  kayaking: 'Review the requirements and session information for your chosen kayaking experience.',
  canoeing: 'Check the details relevant to your canoeing session and location.',
  'stand-up-paddleboarding': 'Understand the participation requirements and preparation information for your SUP session.',
}
const activityIcons: Record<string, LucideIcon> = { kayaking: Waves, canoeing: Mountain, 'stand-up-paddleboarding': Compass }

export function SafetyByActivity() {
  const core = activities.filter((activity) => activityCopy[activity.slug])
  return (
    <section className="bg-white/60 px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="by-activity-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Safety information by activity</Eyebrow>
        <h2 id="by-activity-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Know your activity.</RevealLines></h2>
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">{core.map((activity) => {
            const Icon = activityIcons[activity.slug]
            return (
              <article key={activity.slug} className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-[#06263b]/5">
                <Icon className="size-9 text-[#00a9c3]" strokeWidth={1.3} aria-hidden />
                <h3 className="mt-8 font-display text-2xl font-bold">{activity.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#57717b]">{activityCopy[activity.slug]}</p>
                <a href={`${activityHref(activity)}#safety`} className={`mt-6 ${textLink}`}>{activity.name} safety & preparation <ArrowRight className="ml-1 size-4" aria-hidden /></a>
              </article>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

export function PolicyLinks() {
  const policies = ['Booking terms & conditions', 'Cancellation & refund policy', 'Participant declaration / waiver', 'Privacy policy']
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8" aria-labelledby="policies-title">
      <h2 id="policies-title" className="font-display text-2xl font-bold">Frequently needed policies</h2>
      <p className="mt-2 text-sm text-[#57717b]">These policies are awaiting approval and will be linked here once published.</p>
      <RevealGroup as="ul" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{policies.map((policy) => (
          <li key={policy} className="flex min-h-16 items-center gap-3 rounded-2xl border border-dashed border-[#06263b]/15 bg-white px-5 text-sm">
            <FileText className="size-5 shrink-0 text-[#57717b]" aria-hidden />
            <span><span className="block font-semibold">{policy}</span><span className="text-xs text-[#57717b]">Coming soon</span></span>
          </li>
        ))}
      </RevealGroup>
    </section>
  )
}

export function SafetyHelp() {
  const channels = [
    CONTACT.phone && { icon: Phone, label: 'Call us', href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    CONTACT.email && { icon: Mail, label: 'Email us', href: `mailto:${CONTACT.email}` },
    CONTACT.whatsapp && { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}` },
  ].filter(Boolean) as { icon: LucideIcon; label: string; href: string }[]
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28" aria-labelledby="help-title">
      <div className="flex flex-col justify-between gap-8 rounded-3xl bg-white p-8 ring-1 ring-[#06263b]/5 sm:p-12 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <Sparkles className="size-8 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
          <h2 id="help-title" className="mt-5 font-display text-3xl font-black sm:text-4xl"><RevealLines>Questions before you paddle?</RevealLines></h2>
          <p className="mt-3 text-base leading-7 text-[#3d5862]">Not sure which activity is right for you, or need to confirm a participation requirement? Contact the Bond Safari team before making your plans.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {channels.length
            ? channels.map(({ icon: Icon, label, href }) => <a key={label} href={href} className={dark}><Icon className="mr-2 size-4" aria-hidden />{label}</a>)
            : <a href={ROUTES.contact} className={dark}>Contact our team</a>}
          <a href={ROUTES.activities} className={`inline-flex min-h-12 items-center rounded-full border border-[#06263b]/20 px-6 text-sm font-bold ${focusRing}`}>Explore activities</a>
        </div>
      </div>
    </section>
  )
}

export function SafetyFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0b3850] px-5 py-20 text-white lg:px-8 lg:py-28">
      <Ripples className="absolute -right-24 top-1/2 size-[40rem] -translate-y-1/2" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <h2 className="max-w-2xl font-display text-4xl font-black sm:text-6xl"><RevealLines>Discover the water. <span className="text-[#f5b82e]">Care for the place.</span></RevealLines></h2>
          <p className="mt-4 max-w-xl text-base text-white/70">Find your next paddling experience and explore Kerala thoughtfully with Bond Safari.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={ROUTES.locations} className={gold}>Explore locations <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <a href={ROUTES.book} className={ghost}>Book your adventure</a>
        </div>
      </div>
    </section>
  )
}

export function SafetyMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 rounded-2xl border border-white/30 bg-[#06263b]/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#f5b82e] text-xs font-extrabold uppercase text-[#06263b]">Book now</a>
      <a href="#before-you-paddle" className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-xs font-extrabold uppercase text-white">Checklist</a>
    </div>
  )
}
