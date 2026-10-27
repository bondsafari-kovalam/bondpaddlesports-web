import type { ReactNode } from 'react'
import { ArrowRight, Briefcase, CalendarCheck, ChevronDown, ClipboardList, Compass, Handshake, Heart, Leaf, Mail, MessageCircle, Phone, School, ShieldCheck, Sparkles, Users, UsersRound, Waves, type LucideIcon } from 'lucide-react'
import { ActivityVisual } from '@/components/activities/activity-card'
import { EnquiryButton, ENQUIRY_ID, GroupEnquiryForm } from '@/components/groups/group-enquiry'
import { Eyebrow, LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { Ripples } from '@/components/membership/membership-sections'
import { activityHref } from '@/lib/activities'
import { BOND_PHOTOS } from '@/lib/gallery'
import { GROUP_ACTIVITIES, GROUP_LOCATIONS, activityOptionsFor, type EnquiryType } from '@/lib/groups'
import { locationHref } from '@/lib/locations'
import { CONTACT, ROUTES } from '@/lib/site'
import { ParallaxImage, Reveal, RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { SectionNav } from '@/components/site/section-nav'
import { HERO_IMAGES } from '@/lib/hero-images'
import { SmartImage } from '@/components/site/smart-image'

const gold = 'inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-7 text-sm font-semibold text-ink transition hover:bg-white'
const ghost = 'inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink'
const dark = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink-soft'
const textLink = 'inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-teal'

/** Replaceable art panel used until approved Bond Safari group photography is supplied. */
export function PhotoPlaceholder({ icon: Icon, label, className = '' }: { icon: LucideIcon; label: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,var(--color-ink-muted),var(--color-ink)_70%)] ${className}`} role="img" aria-label={`${label} (photograph coming soon)`}>
      <Ripples className="absolute size-[130%]" />
      <Icon className="relative size-14 text-teal-bright" strokeWidth={1} aria-hidden />
      <span className="absolute bottom-3 right-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/70">Photography coming soon</span>
    </div>
  )
}

const audiences: { icon: LucideIcon; title: string; short: string; text: string; cta: string; type: EnquiryType }[] = [
  { icon: Briefcase, title: 'Corporate Teams', short: 'Corporate team', text: 'Bring colleagues together through an active outdoor experience that encourages connection, collaboration, and a fresh perspective.', cta: 'Plan a team experience', type: 'Corporate Team' },
  { icon: School, title: 'Schools & Colleges', short: 'School or college', text: 'Introduce students to paddling, outdoor learning, teamwork, and responsible engagement with nature.', cta: 'Plan a student trip', type: 'School or College' },
  { icon: Heart, title: 'Friends & Family', short: 'Friends & family', text: 'Share a memorable day on the water with your favourite people through guided group paddling experiences.', cta: 'Plan a group outing', type: 'Friends or Family' },
  { icon: UsersRound, title: 'Clubs & Communities', short: 'Club or community', text: 'Create opportunities for members to connect, explore, and enjoy the outdoors together.', cta: 'Enquire for your group', type: 'Club or Community' },
  { icon: Sparkles, title: 'Private Group Experiences', short: 'Private group', text: 'Discuss a private group session tailored to your preferred date, location, activity, and group requirements.', cta: 'Request a private session', type: 'Private Group' },
  { icon: Handshake, title: 'Travel & Tourism Partners', short: 'Travel partner', text: 'Discuss potential partnerships for bringing guided paddling experiences to visitors exploring Kerala.', cta: 'Discuss a partnership', type: 'Travel or Tourism Partner' },
]

export function GroupsHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
      <HeroBackdrop src={HERO_IMAGES.groups} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> Groups & Corporate</p>
          <h1 className="font-display text-6xl font-black leading-[.92] tracking-tight sm:text-8xl"><RevealLines>Better together.<br /><span className="text-sand">Out there.</span></RevealLines></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Bring your team, classmates, friends, or community together on the water. Guided paddling experiences planned around your group, your goals, and your adventure.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <EnquiryButton className={gold}>Plan your group experience <ArrowRight className="ml-2 size-4" aria-hidden /></EnquiryButton>
            <a href="#who" className={`${ghost} ${focusRing}`}>Explore group experiences</a>
          </div>
        </div>
        {/* One tap starts the enquiry with the visitor's group type already chosen. */}
        <Reveal delay={0.4} className="mt-12 border-t border-white/15 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Who’s coming?</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {audiences.map(({ icon: Icon, short, type }) => (
              <EnquiryButton key={type} preset={{ type }} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-sand hover:bg-sand hover:text-ink">
                <Icon className="size-4" aria-hidden />{short}
              </EnquiryButton>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const NAV = [
  { id: 'who', label: 'Who it’s for' },
  { id: 'activities', label: 'Activities' },
  { id: 'locations', label: 'Locations' },
  { id: 'how', label: 'How it works' },
  { id: ENQUIRY_ID, label: 'Enquire' },
  { id: 'faq', label: 'FAQs' },
]

export function GroupsNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5 lg:px-8">
        <SectionNav sections={NAV} label="Groups page sections" layoutId="groups-nav-pill" />
        <div className="hidden shrink-0 lg:block"><EnquiryButton className={`${dark} min-h-11`}>Plan your group <ArrowRight className="size-4" aria-hidden /></EnquiryButton></div>
      </div>
    </div>
  )
}

export function AudienceCards() {
  return (
    <section id="who" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="audiences-title">
      <Eyebrow>Who it’s for</Eyebrow>
      <h2 id="audiences-title" className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Every group has its own reason to get on the water.</RevealLines></h2>
      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-3">{audiences.map(({ icon: Icon, title, text, cta, type }, i) => (
          <article key={title} className="group flex flex-col bg-paper-bright p-7 transition-colors hover:bg-white sm:p-8">
            <div className="flex items-center justify-between">
              <Icon className="size-7 text-teal-strong" strokeWidth={1.4} aria-hidden />
              <span className="text-xs font-semibold tracking-[0.3em] text-slate-light">0{i + 1}</span>
            </div>
            <h3 className="mt-10 font-display text-2xl font-bold tracking-tight">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate">{text}</p>
            <EnquiryButton preset={{ type }} className={`mt-6 ${textLink}`}>{cta} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></EnquiryButton>
          </article>
        ))}
      </RevealGroup>
    </section>
  )
}

export function CorporateSection() {
  const themes = ['Team connection and shared experiences', 'Outdoor wellbeing and time in nature', 'Collaborative group activities', 'Informal employee engagement', 'A memorable alternative to conventional team outings']
  return (
    <section className="border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="corporate-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div className="relative">
          <ParallaxImage src={BOND_PHOTOS.muzirisTeam.src} alt={BOND_PHOTOS.muzirisTeam.alt} className="aspect-[3/2] rounded-3xl" strength={4} />
        </div>
        <div>
          <Eyebrow>Corporate experiences</Eyebrow>
          <h2 id="corporate-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Take your team beyond the usual.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-slate-strong">Step away from the everyday routine and experience Kerala’s waterways together. A guided paddling session gives your team time outdoors, a chance to connect with colleagues, and a different kind of shared experience.</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {themes.map((theme) => <li key={theme} className="flex gap-3 py-3 text-sm font-medium"><Waves className="mt-0.5 size-4 shrink-0 text-teal-strong" aria-hidden />{theme}</li>)}
          </ul>
          <p className="mt-6 text-xs leading-5 text-slate">The programme and activity suitability depend on your group’s needs, the location, conditions, guide availability and operational capacity. The team confirms these with you.</p>
          <EnquiryButton preset={{ type: 'Corporate Team' }} className={`mt-8 ${dark}`}>Enquire about corporate bookings <ArrowRight className="size-4" aria-hidden /></EnquiryButton>
        </div>
      </div>
    </section>
  )
}

export function SchoolsSection() {
  const cards = [
    { icon: Leaf, title: 'Outdoor learning', text: 'Encourage exploration and an appreciation of local waterways.' },
    { icon: Compass, title: 'Guided paddling', text: 'Explore suitable kayaking, canoeing or stand-up paddleboarding sessions according to location and availability.' },
    { icon: Users, title: 'Team participation', text: 'Create opportunities for students to share an outdoor experience.' },
    { icon: ShieldCheck, title: 'Safety-led planning', text: 'Discuss participant age, swimming ability, supervision, accessibility and activity suitability before confirming a booking.' },
  ]
  return (
    <section className="bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="schools-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="cyan">Schools, colleges & educational groups</Eyebrow>
            <h2 id="schools-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Learning beyond<br /><span className="text-sand">the classroom.</span></RevealLines></h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-white/70">Give students an opportunity to explore the outdoors, experience paddling, and learn about responsible participation in water-based activities.</p>
        </div>
        <RevealGroup className="mt-14 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">{cards.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-b border-white/15 py-8 sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
              <Icon className="size-7 text-sand" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-8 font-display text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
            </article>
          ))}
        </RevealGroup>
        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-white/65">Age requirements, parent or guardian consent, supervision arrangements and activity-specific safety requirements are confirmed with the school before booking. For a structured programme, see the <a href="/academy/schools" className="font-bold text-teal-pale underline-offset-2 hover:underline">Academy schools programme</a>.</p>
          <EnquiryButton preset={{ type: 'School or College' }} className={gold}>Plan a school or college visit <ArrowRight className="ml-2 size-4" aria-hidden /></EnquiryButton>
        </div>
      </div>
    </section>
  )
}

export function GroupActivities() {
  return (
    <section id="activities" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="activities-title">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Activities for groups</Eyebrow>
          <h2 id="activities-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Choose your way onto the water.</RevealLines></h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate">Availability, session format, age requirements and group suitability depend on the location and are confirmed by the team.</p>
      </div>
      <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">{GROUP_ACTIVITIES.map((activity) => (
          <article key={activity.slug} className="group flex flex-col">
            <a href={activityHref(activity)} tabIndex={-1} aria-hidden className="block overflow-hidden rounded-3xl"><ActivityVisual activity={activity} className="aspect-[4/5]" /></a>
            <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{activity.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate">{activity.summary}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <EnquiryButton preset={{ activity: activity.name }} className={textLink}>Enquire for a group <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></EnquiryButton>
              <a href={activityHref(activity)} className={`text-sm font-semibold text-slate transition hover:text-ink ${focusRing}`}>Details</a>
            </div>
          </article>
        ))}
      </RevealGroup>
    </section>
  )
}

export function GroupLocations() {
  return (
    <section id="locations" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="locations-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Group locations</Eyebrow>
            <h2 id="locations-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Find your group’s next adventure.</RevealLines></h2>
          </div>
          <a href={ROUTES.locations} className={`${textLink} ${focusRing}`}>All locations <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <RevealGroup as="ul">{GROUP_LOCATIONS.map((location) => {
            const operating = location.status === 'operating'
            const confirmed = location.activities.length > 0
            return (
              <li key={location.slug} className="group grid gap-5 border-b border-line py-7 transition-colors hover:bg-paper-bright md:grid-cols-[8rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:px-4">
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
                  {location.image ? <SmartImage src={location.image.src} alt="" fill sizes="8rem" className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="size-full bg-ink-soft" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-2xl font-bold tracking-tight">{location.name}</h3><LocationStatusBadge status={location.status} /></div>
                  <p className="mt-1 text-xs text-slate">{[location.context, ...location.waterTypes].join(' · ')}</p>
                  <p className="mt-2 text-sm text-slate-strong">{confirmed ? `Group activities: ${activityOptionsFor(location.slug).join(', ')}` : 'Group activities confirmed by the team.'}{!operating && <span className="ml-2 font-semibold text-sand-ink">Not yet open for bookings.</span>}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <EnquiryButton preset={{ location: location.slug }} className={`${dark} min-h-11 px-5`}>{operating ? 'Enquire' : 'Enquire for opening'}</EnquiryButton>
                  <a href={locationHref(location)} className={`text-sm font-semibold text-slate transition hover:text-ink ${focusRing}`} aria-label={`View ${location.name}`}>View</a>
                </div>
              </li>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

export function HowItWorks() {
  const steps = [
    { icon: ClipboardList, title: 'Tell us about your group', text: 'Share the group type, estimated participant count, preferred date and location.' },
    { icon: MessageCircle, title: 'Plan the experience', text: 'The Bond Safari team can review your requirements and confirm suitable activities, availability, pricing and applicable safety requirements.' },
    { icon: CalendarCheck, title: 'Confirm your booking', text: 'Once the details are agreed, complete the applicable booking and payment process.' },
  ]
  return (
    <section id="how" className="scroll-mt-16 bg-paper-bright px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="how-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>How group enquiries work</Eyebrow>
        <h2 id="how-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>From first message to the water.</RevealLines></h2>
        <RevealGroup as="ol" className="mt-14 grid border-t border-line md:grid-cols-3">{steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white">{i + 1}</span><Icon className="size-6 text-teal-strong" aria-hidden /></div>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate">{text}</p>
            </li>
          ))}
        </RevealGroup>
        <p className="mt-8 text-sm font-semibold text-slate-strong">Submitting an enquiry doesn’t confirm a booking.</p>
      </div>
    </section>
  )
}

export function EnquirySection() {
  const channels = [
    CONTACT.phone && { icon: Phone, label: 'Call the team', href: `tel:${CONTACT.phone.replace(/\s/g, '')}`, value: CONTACT.phone },
    CONTACT.email && { icon: Mail, label: 'Email the team', href: `mailto:${CONTACT.email}`, value: CONTACT.email },
    CONTACT.whatsapp && { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`, value: CONTACT.whatsapp },
  ].filter(Boolean) as { icon: LucideIcon; label: string; href: string; value: string }[]

  return (
    <section id={ENQUIRY_ID} className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="enquiry-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>Group enquiry</Eyebrow>
          <h2 id="enquiry-title" tabIndex={-1} className="mt-3 font-display text-4xl font-black tracking-tight outline-none sm:text-5xl"><RevealLines>Let’s plan your group experience.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-slate-strong">Tell us a little about your group. Our team can review your requirements and discuss the available options.</p>
          <ul className="mt-8 space-y-2 text-sm text-slate-strong">
            {['No commitment: an enquiry isn’t a booking', 'The team confirms activities, availability and pricing with you', 'Your details are used only to respond to your enquiry'].map((point) => <li key={point} className="flex gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />{point}</li>)}
          </ul>
          <div className="mt-10 border-t border-line pt-6">
            <h3 className="font-display text-lg font-bold">Prefer to talk?</h3>
            {channels.length ? (
              <ul className="mt-4 divide-y divide-line">{channels.map(({ icon: Icon, label, href, value }) => <li key={label}><a href={href} className={`flex min-h-12 items-center gap-3 text-sm font-semibold transition hover:text-teal ${focusRing}`}><Icon className="size-4 text-teal-strong" aria-hidden />{label}<span className="ml-auto font-normal text-slate">{value}</span></a></li>)}</ul>
            ) : (
              <p className="mt-2 text-sm leading-6 text-slate">Direct phone, email and WhatsApp contacts for the groups team will be listed here once confirmed. For now, the enquiry form is the best way to reach us.</p>
            )}
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-10">
          <GroupEnquiryForm />
        </div>
      </div>
    </section>
  )
}

const operatingNames = GROUP_LOCATIONS.filter((l) => l.status === 'operating').map((l) => l.name).join(' and ')
const plannedNames = GROUP_LOCATIONS.filter((l) => l.status !== 'operating').map((l) => l.name).join(' and ')
const confirm = 'The team will confirm this with you during your enquiry.'

const faqs: { q: string; a: ReactNode }[] = [
  { q: 'Can we book a session for a large group?', a: `Yes, send us an enquiry with your estimated group size. Capacity depends on the location, activity, conditions and guide availability. ${confirm}` },
  { q: 'Can Bond Safari help plan a corporate team-building experience?', a: 'Yes. Tell us about your team and what you’d like from the day, and the team will discuss suitable guided paddling options with you.' },
  { q: 'Do you offer school and college group sessions?', a: <>Yes, we welcome enquiries from schools and colleges. Age requirements, consent, supervision and safety requirements are confirmed before booking. See also the <a href="/academy/schools" className="font-bold text-teal">Academy schools programme</a>.</> },
  { q: 'Which locations are available for group bookings?', a: <>{operatingNames} are operating now. {plannedNames} {plannedNames.includes(' and ') ? 'are' : 'is'} planned and not yet open for bookings. <a href={ROUTES.locations} className="font-bold text-teal">See all locations</a>.</> },
  { q: 'Which paddling activities can groups choose from?', a: `Groups can ask about ${GROUP_ACTIVITIES.map((a) => a.name.toLowerCase()).join(', ')}. What runs at each location depends on conditions and availability; ${confirm.toLowerCase()}` },
  { q: 'Do participants need swimming experience?', a: `Swimming requirements depend on the activity and location. ${confirm}` },
  { q: 'What age groups can participate?', a: `Age requirements depend on the activity. ${confirm}` },
  { q: 'Can we request a private group session?', a: 'Yes, you can request one. Choose “Private Group” in the enquiry form with your preferred date, location and activity, and the team will discuss what’s possible.' },
  { q: 'How are group prices and payments confirmed?', a: 'The team confirms pricing with you after reviewing your enquiry. Once details are agreed, you complete the applicable booking and payment process. Submitting an enquiry doesn’t commit you to anything.' },
  { q: 'What happens if weather conditions affect our session?', a: `Sessions depend on safe conditions. How weather changes are handled will be explained when your booking is confirmed. ${confirm}` },
  { q: 'Can we request an alternative date?', a: 'Yes. Add an alternative date in the enquiry form and the team will take it into account.' },
  { q: 'How far in advance should we submit an enquiry?', a: 'The earlier the better, so the team can plan around your preferred date. Lead times depend on group size and the location.' },
]

export function GroupFAQ() {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Eyebrow>FAQs</Eyebrow>
          <h2 id="faq-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Planning questions.</RevealLines></h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate">Still unsure? <EnquiryButton className="font-semibold text-teal underline-offset-4 hover:underline">Send us your question</EnquiryButton> with your enquiry.</p>
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

export function GroupsFinalCTA() {
  return (
    <section className="bg-sand px-5 py-20 text-ink lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">Groups & Corporate</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Bring your people.<br />Make it an adventure.</RevealLines></h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <EnquiryButton className={dark}>Plan your group experience <ArrowRight className="size-4" aria-hidden /></EnquiryButton>
          <a href={ROUTES.locations} className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Explore locations</a>
        </div>
      </div>
    </section>
  )
}

export function GroupsMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-30 flex gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href={`#${ENQUIRY_ID}`} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-sand text-sm font-semibold text-ink">Plan a group</a>
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">Book a paddle</a>
    </div>
  )
}
