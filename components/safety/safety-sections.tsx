import type { ReactNode } from 'react'
import {
  AlertCircle, ArrowRight, Backpack, Bird, CalendarClock, ChevronDown, CircleHelp, ClipboardCheck, CloudSun, FileText,
  Hand, Home, Leaf, ListChecks, Mail, MessageCircle, Phone, Recycle, Users, Waves,
  type LucideIcon,
} from 'lucide-react'
import { ActivityVisual } from '@/components/activities/activity-card'
import { ComingSoonLink } from '@/components/about/about-sections'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { PaddleChecklist } from '@/components/safety/paddle-checklist'
import { activities, activityHref } from '@/lib/activities'
import { BOND_PHOTOS } from '@/lib/gallery'
import { CONTACT, ROUTES } from '@/lib/site'
import { ParallaxImage, Reveal, RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { SectionNav } from '@/components/site/section-nav'
import { HERO_IMAGES } from '@/lib/hero-images'

const dark = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`
const textLink = `inline-flex min-h-11 w-fit items-center gap-1.5 border-b border-ink/25 text-sm font-semibold text-ink transition hover:border-ink ${focusRing}`

export function SafetyHero() {
  const shortcuts: { icon: LucideIcon; label: string; href: string }[] = [
    { icon: ListChecks, label: 'Prepare for my session', href: '#before-you-paddle' },
    { icon: CloudSun, label: 'Check conditions', href: '#conditions' },
    { icon: Leaf, label: 'Paddle responsibly', href: '#responsible-tourism' },
    { icon: CircleHelp, label: 'Read the FAQs', href: '#faq' },
  ]
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
      <HeroBackdrop src={HERO_IMAGES.safety} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> Safety & Responsible Tourism</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl"><RevealLines>Adventure is better<br /><span className="text-sand">when we care.</span></RevealLines></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Enjoy Kerala’s waterways with thoughtful preparation, responsible paddling, and respect for the places and people that make every experience special.</p>
        </div>
        <Reveal delay={0.4} className="mt-12 border-t border-white/15 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">I want to…</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {shortcuts.map(({ icon: Icon, label, href }) => (
              <li key={href}>
                <a href={href} className={`group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/5 px-4 text-sm font-semibold backdrop-blur-sm transition hover:border-sand hover:bg-sand hover:text-ink ${focusRing}`}>
                  <span className="flex items-center gap-3"><Icon className="size-5 shrink-0" aria-hidden />{label}</span>
                  <ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

const NAV = [
  { id: 'approach', label: 'Approach' },
  { id: 'before-you-paddle', label: 'Checklist' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'conditions', label: 'Conditions' },
  { id: 'responsible-tourism', label: 'Responsible tourism' },
  { id: 'groups', label: 'Groups' },
  { id: 'faq', label: 'FAQs' },
]

export function SafetyNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-2.5 lg:px-8">
        <SectionNav sections={NAV} label="Safety page sections" layoutId="safety-nav-pill" />
      </div>
    </div>
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
    <section id="approach" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="approach-title">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Eyebrow>Our approach to safety</Eyebrow>
          <h2 id="approach-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Enjoy the adventure. Respect the conditions.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-slate-strong">Every paddling experience depends on the activity, location, water conditions, and the people taking part. We encourage every participant to understand the requirements of their chosen activity, follow the guidance provided by the team, and communicate any concerns before getting on the water.</p>
          <RevealGroup as="ul" className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2">{principles.map(([Icon, title, text], i) => (
              <li key={title} className="bg-paper-bright p-6">
                <div className="flex items-center justify-between"><Icon className="size-6 text-teal-strong" strokeWidth={1.5} aria-hidden /><span className="text-xs font-semibold tracking-[0.3em] text-slate-light">0{i + 1}</span></div>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate">{text}</p>
              </li>
            ))}
          </RevealGroup>
        </div>
        <div className="relative">
          <ParallaxImage src={BOND_PHOTOS.guidesCarryingKayak.src} alt={BOND_PHOTOS.guidesCarryingKayak.alt} className="aspect-[5/4] rounded-3xl" strength={4} />
        </div>
      </div>
    </section>
  )
}

export function BeforeYouPaddle() {
  return (
    <section id="before-you-paddle" className="scroll-mt-16 bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="checklist-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="cyan">Before you paddle</Eyebrow>
            <h2 id="checklist-title" className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>A few things to check<br /><span className="text-sand">before you head out.</span></RevealLines></h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/70">Tick each one off as you go. Requirements vary by activity and location, so review the information for your specific session before arriving.</p>
        </div>
        <div className="mt-12"><PaddleChecklist /></div>
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
    <section id="equipment" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="equipment-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
        <div className="relative">
          <ParallaxImage src={BOND_PHOTOS.paddlesAndBuoyancyAid.src} alt={BOND_PHOTOS.paddlesAndBuoyancyAid.alt} className="aspect-[4/3] rounded-3xl lg:aspect-[4/5]" strength={6} />
        </div>
        <div>
          <Eyebrow>Equipment & guidance</Eyebrow>
          <h2 id="equipment-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>The right preparation makes a difference.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-slate-strong">Different paddling activities and locations have different equipment and preparation needs. Follow the instructions provided for your session and ask the team if you are unsure what to bring.</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {cards.map(([Icon, title, text]) => (
              <li key={title} className="flex gap-4 py-5">
                <Icon className="mt-0.5 size-6 shrink-0 text-teal-strong" strokeWidth={1.5} aria-hidden />
                <span><span className="block font-display text-lg font-bold tracking-tight">{title}</span><span className="text-sm text-slate">{text}</span></span>
              </li>
            ))}
          </ul>
          <a href={ROUTES.activities} className={`mt-8 ${dark}`}>Explore activities <ArrowRight className="size-4" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

export function WeatherConditions() {
  const items: [LucideIcon, string][] = [[CloudSun, 'Weather conditions'], [Waves, 'Water and local environmental conditions'], [Users, 'Activity and participant suitability'], [CalendarClock, 'Operational decisions and session updates']]
  return (
    <section id="conditions" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="conditions-title">
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <ParallaxImage src={BOND_PHOTOS.threeKayaksOnBackwater.src} alt={BOND_PHOTOS.threeKayaksOnBackwater.alt} className="aspect-[16/9] rounded-3xl sm:aspect-[16/7]" strength={6} />
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Weather & water conditions</Eyebrow>
            <h2 id="conditions-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Nature sets the conditions.</RevealLines></h2>
            <p className="mt-5 text-base leading-7 text-slate-strong">Water-based activities depend on environmental and operational conditions. Weather, water levels, currents, visibility, and other local factors may affect whether an activity can safely proceed.</p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-slate">What decides if a session goes ahead</p>
            <RevealGroup as="ul" className="mt-3 divide-y divide-line border-y border-line">{items.map(([Icon, text]) => <li key={text} className="flex items-center gap-3 py-4 text-sm font-semibold"><Icon className="size-5 shrink-0 text-teal-strong" aria-hidden />{text}</li>)}
            </RevealGroup>
          </div>
          <aside className="h-fit rounded-3xl bg-ink p-8 text-white lg:mt-20" aria-labelledby="session-change">
            <AlertCircle className="size-8 text-sand" strokeWidth={1.4} aria-hidden />
            <h3 id="session-change" className="mt-5 font-display text-2xl font-bold tracking-tight">Your session may need to change.</h3>
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

/** Responsible tourism, including the local culture and community guidance that used to be its own section. */
export function ResponsibleTourismSection() {
  return (
    <section id="responsible-tourism" className="scroll-mt-16 bg-paper-bright px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="tourism-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Responsible tourism</Eyebrow>
            <h2 id="tourism-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Explore with respect. Leave a lighter footprint.</RevealLines></h2>
          </div>
          <p className="text-base leading-7 text-slate-strong">Kerala’s waterways connect natural landscapes, local communities, and everyday life. Responsible tourism means enjoying these places thoughtfully, approaching each destination with curiosity and care, and respecting the environment and people who share them.</p>
        </div>
        <RevealGroup className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">{tourismPrinciples.map(({ icon: Icon, title, points }) => (
            <article key={title} className="border-b border-line py-8 sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
              <Icon className="size-7 text-success" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-strong">{points.map((point) => <li key={point} className="flex gap-2"><Leaf className="mt-1.5 size-3 shrink-0 text-success" aria-hidden />{point}</li>)}</ul>
            </article>
          ))}
        </RevealGroup>
        <a href={ROUTES.locations} className={`mt-10 ${textLink}`}>Explore our locations <ArrowRight className="size-4" aria-hidden /></a>
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
    <section id="groups" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="groups-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-24">
          <Eyebrow>Groups & families</Eyebrow>
          <h2 id="groups-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Good experiences begin with good preparation.</RevealLines></h2>
          <p className="mt-4 text-sm leading-6 text-slate">Not every activity suits every participant, and arrangements vary by location. The team will discuss what’s possible for your group.</p>
          <a href={ROUTES.groups} className={`mt-8 ${dark}`}>Plan a group experience <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <RevealGroup as="ol" className="divide-y divide-line border-y border-line">{points.map((point, i) => (
            <li key={point} className="flex gap-5 py-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white">{i + 1}</span>
              <p className="pt-1.5 text-base leading-7">{point}</p>
            </li>
          ))}
        </RevealGroup>
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
  { q: 'How can I find the requirements for my chosen activity?', a: <>Each activity page has a safety and preparation section, and location pages list visitor information. <a href={ROUTES.activities} className="font-bold text-teal">Browse activities</a> or <a href={ROUTES.locations} className="font-bold text-teal">locations</a>.</> },
]

export function SafetyFAQ() {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Eyebrow>Safety FAQs</Eyebrow>
          <h2 id="faq-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Questions people ask.</RevealLines></h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate">Still unsure about a requirement? <a href={ROUTES.contact} className="font-semibold text-teal underline-offset-4 hover:underline">Contact the team</a> before you book.</p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-bold transition hover:text-teal [&::-webkit-details-marker]:hidden ${focusRing}`}>{q}<span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition group-open:rotate-180 group-open:border-ink group-open:bg-ink group-open:text-white"><ChevronDown className="size-4" aria-hidden /></span></summary>
              <div className="pb-6 pr-12 text-sm leading-6 text-slate-strong">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

const activityCopy: Record<string, string> = {
  kayaking: 'Review the requirements and session information for your chosen kayaking experience.',
  canoeing: 'Check the details relevant to your canoeing session and location.',
  'stand-up-paddleboarding': 'Understand the participation requirements and preparation information for your SUP session.',
}

export function SafetyByActivity() {
  const core = activities.filter((activity) => activityCopy[activity.slug])
  return (
    <section className="border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="by-activity-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Safety information by activity</Eyebrow>
        <h2 id="by-activity-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Know your activity.</RevealLines></h2>
        <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">{core.map((activity) => (
            <article key={activity.slug} className="group flex flex-col">
              <a href={`${activityHref(activity)}#safety`} tabIndex={-1} aria-hidden className="block overflow-hidden rounded-3xl"><ActivityVisual activity={activity} className="aspect-[16/11]" /></a>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{activity.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate">{activityCopy[activity.slug]}</p>
              <a href={`${activityHref(activity)}#safety`} className={`mt-5 ${textLink}`}>Safety & preparation <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/** Contact routes plus the policies visitors look for; the policies are listed honestly as not yet published. */
export function SafetyHelp() {
  const channels = [
    CONTACT.phone && { icon: Phone, label: 'Call us', href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    CONTACT.email && { icon: Mail, label: 'Email us', href: `mailto:${CONTACT.email}` },
    CONTACT.whatsapp && { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}` },
  ].filter(Boolean) as { icon: LucideIcon; label: string; href: string }[]
  const policies = ['Booking terms & conditions', 'Cancellation & refund policy', 'Participant declaration / waiver', 'Privacy policy']
  return (
    <section className="bg-sand px-5 py-20 text-ink lg:px-8 lg:py-24" aria-labelledby="help-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">Discover the water. Care for the place.</p>
            <h2 id="help-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Questions before<br />you paddle?</RevealLines></h2>
            <p className="mt-4 text-base leading-7 text-ink/75">Not sure which activity is right for you, or need to confirm a participation requirement? Contact the Bond Safari team before making your plans.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {channels.length
              ? channels.map(({ icon: Icon, label, href }) => <a key={label} href={href} className={dark}><Icon className="size-4" aria-hidden />{label}</a>)
              : <a href={ROUTES.contact} className={dark}>Contact our team <ArrowRight className="size-4" aria-hidden /></a>}
            <a href={ROUTES.locations} className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Explore locations</a>
          </div>
        </div>
        <div className="mt-12 border-t border-ink/15 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">Policies · awaiting approval, linked here once published</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/75">{policies.map((policy) => <li key={policy} className="flex items-center gap-2"><FileText className="size-4" aria-hidden />{policy}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}

export function SafetyMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-30 flex gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href="#before-you-paddle" className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-sand text-sm font-semibold text-ink">Checklist</a>
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">Book a paddle</a>
    </div>
  )
}
