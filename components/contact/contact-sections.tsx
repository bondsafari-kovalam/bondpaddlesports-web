import type { ReactNode } from 'react'
import { ArrowRight, BadgePercent, CalendarCheck, CalendarPlus, ChevronDown, CircleHelp, GraduationCap, Mail, MapPin, MessageCircle, MessageSquare, Navigation, Phone, ShieldCheck, Users, type LucideIcon } from 'lucide-react'
import { ComingSoonLink } from '@/components/about/about-sections'
import { ContactForm, EnquiryTypeLink, FORM_ID } from '@/components/contact/contact-form'
import { LocationMap } from '@/components/locations/location-map'
import { Eyebrow, LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { contactChannels, whatsappHref, type ContactEnquiryType } from '@/lib/contact'
import { locationHref, locations } from '@/lib/locations'
import { ROUTES } from '@/lib/site'
import { Reveal, RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { HERO_IMAGES } from '@/lib/hero-images'
import { SmartImage } from '@/components/site/smart-image'

const gold = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sand px-7 text-sm font-semibold text-ink transition hover:bg-white ${focusRing}`
const dark = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`
const textLink = `inline-flex min-h-11 w-fit items-center gap-1.5 border-b border-ink/25 text-sm font-semibold text-ink transition hover:border-ink ${focusRing}`

const contactLocations = locations.filter((l) => l.hasDetailPage)
const channelIcons = { email: Mail, phone: Phone, whatsapp: MessageCircle }

/** Topics people most often contact us about. Each preselects the form's enquiry type; groups have their own form. */
const topics: { icon: LucideIcon; label: string; text: string; type?: ContactEnquiryType; href?: string }[] = [
  { icon: MessageSquare, label: 'General question', text: 'About Bond Safari and our experiences', type: 'General Enquiry' },
  { icon: CalendarCheck, label: 'Existing booking', text: 'Help with a booking you’ve made', type: 'Existing Booking' },
  { icon: CalendarPlus, label: 'New booking', text: 'Plan a session or check options', type: 'New Booking' },
  { icon: GraduationCap, label: 'Academy & courses', text: 'Courses and training', type: 'Academy / Courses' },
  { icon: Users, label: 'Groups & corporate', text: 'Teams, schools and private groups', href: `${ROUTES.groups}#enquiry` },
  { icon: BadgePercent, label: 'Membership', text: 'Plans, Pearls and benefits', type: 'Membership' },
]

const topicClass = `group flex h-full items-start gap-4 rounded-2xl border border-white/20 bg-white/5 p-4 text-left backdrop-blur-sm transition hover:border-sand hover:bg-sand hover:text-ink`

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
      <HeroBackdrop src={HERO_IMAGES.contact} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> Get in touch</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl"><RevealLines>Let’s get you<br /><span className="text-sand">on the water.</span></RevealLines></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Have a question about a paddling experience, a location, an Academy course, or a group booking? Pick a topic and we’ll take you straight to the right form.</p>
        </div>
        <Reveal delay={0.4} className="mt-12 border-t border-white/15 pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">What do you need help with?</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ icon: Icon, label, text, type, href }) => {
              const body = <><Icon className="mt-0.5 size-5 shrink-0" aria-hidden /><span className="flex-1"><span className="block text-sm font-semibold">{label}</span><span className="mt-0.5 block text-xs opacity-70">{text}</span></span><ArrowRight className="mt-0.5 size-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden /></>
              return <li key={label}>{type ? <EnquiryTypeLink type={type} className={topicClass}>{body}</EnquiryTypeLink> : <a href={href} className={`${topicClass} ${focusRing}`}>{body}</a>}</li>
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function ContactFormSection() {
  const channels = contactChannels()
  const whatsapp = whatsappHref()
  return (
    <section id={FORM_ID} className="scroll-mt-6 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="form-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>Send an enquiry</Eyebrow>
          <h2 id="form-title" tabIndex={-1} className="mt-3 font-display text-4xl font-black tracking-tight outline-none sm:text-5xl"><RevealLines>How can we help?</RevealLines></h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-strong">Send us your question and the relevant details. We’ll review your enquiry and respond using the contact information you provide.</p>
          <div className="mt-10 rounded-3xl border border-line bg-white p-6 sm:p-10"><ContactForm /></div>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start lg:pt-28" aria-labelledby="help-panel-title">
          <div className="rounded-3xl bg-ink p-8 text-white">
            <h3 id="help-panel-title" className="font-display text-2xl font-bold tracking-tight">We’re here to help.</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">The enquiry form is the quickest way to reach the team. Choose the enquiry type so it gets to the right people.</p>
            {channels.length > 0 ? (
              <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {channels.map(({ kind, label, value, href }) => {
                  const Icon = channelIcons[kind]
                  return <li key={kind}><a href={href} {...(kind === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`flex min-h-14 items-center gap-3 text-sm transition hover:text-sand ${focusRing}`}><Icon className="size-4 text-sand" aria-hidden /><span className="font-semibold">{label}</span><span className="ml-auto text-white/70">{value}</span></a></li>
                })}
              </ul>
            ) : (
              <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-white/65">Phone, email and WhatsApp details will be listed here once they’re confirmed.</p>
            )}
            {whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-success px-6 text-sm font-semibold text-white transition hover:brightness-110 ${focusRing}`}><MessageCircle className="size-4" aria-hidden />Chat on WhatsApp</a>}
          </div>

          <div className="border-l-2 border-sand pl-5 text-sm leading-6 text-slate-strong">
            <p className="font-semibold text-ink">About an existing booking?</p>
            <p className="mt-1">Choose “Existing Booking” and add your booking reference so we can find it.</p>
          </div>
          <div className="border-l-2 border-line pl-5 text-sm leading-6 text-slate-strong">
            <p className="flex items-center gap-2 font-semibold text-ink"><ShieldCheck className="size-4 text-success" aria-hidden />Your details stay private</p>
            <p className="mt-1">We use them only to respond to your enquiry. Please don’t include payment or health details in your message.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export function ContactLocations() {
  return (
    <section className="border-t border-line bg-paper-bright px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="locations-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Locations</Eyebrow>
            <h2 id="locations-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Find your way to the water.</RevealLines></h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate">Check the meeting-point information before your visit. Your booking confirmation includes the details for your session.</p>
        </div>
        <RevealGroup as="ul">{contactLocations.map((location) => {
            const meeting = location.visitorInfo.meetingPointAddress ?? location.meetingPoint
            const directions = location.coordinates ? `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}` : undefined
            return (
              <li key={location.slug} className="group grid gap-4 border-b border-line py-6 transition-colors hover:bg-white md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:px-4">
                <div className="relative hidden aspect-square overflow-hidden rounded-2xl md:block">{location.image ? <SmartImage src={location.image.src} alt="" fill sizes="6rem" className="object-cover" /> : <div className="size-full bg-ink-soft" />}</div>
                <div>
                  <div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-2xl font-bold tracking-tight">{location.name}</h3><LocationStatusBadge status={location.status} /></div>
                  <p className="mt-2 flex gap-1.5 text-sm text-slate-strong"><MapPin className="mt-0.5 size-4 shrink-0 text-teal-strong" aria-hidden />{meeting ? `Meeting point: ${meeting}` : location.status === 'operating' ? 'Meeting point shared with your booking.' : `${location.context} · not yet open for bookings`}</p>
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  {directions && <a href={directions} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-teal ${focusRing}`}><Navigation className="size-4" aria-hidden />Directions</a>}
                  <a href={locationHref(location)} className={textLink}>View location <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
                </div>
              </li>
            )
          })}
        </RevealGroup>
        <div className="mt-12">
          <h3 className="sr-only">Map</h3>
          <LocationMap locations={contactLocations} />
        </div>
      </div>
    </section>
  )
}

const faqs: { q: string; a: ReactNode }[] = [
  { q: 'How do I book a paddling session?', a: <>Choose a location and activity, then pick a session from the booking panel on the <a href={ROUTES.locations} className="font-bold text-teal">location page</a>. Live availability and online payment will appear there once the booking system is connected.</> },
  { q: 'Where can I find the meeting point?', a: <>Each <a href={ROUTES.locations} className="font-bold text-teal">location page</a> lists its meeting point where confirmed. For example, Muziris–North Paravur meets at Thattukadavu Jetty. Your booking confirmation includes the details for your session.</> },
  { q: 'What happens if weather conditions affect my session?', a: <>Conditions can affect whether a session goes ahead. Follow the updates from Bond Safari; any rescheduling, cancellation or refund follows the applicable booking policy. See <a href={ROUTES.safety} className="font-bold text-teal">Safety & Responsible Tourism</a>.</> },
  { q: 'How can I contact the team about an existing booking?', a: 'Use the form above, choose “Existing Booking” and include your booking reference.' },
]

/** Quick links and the short FAQ together: the two ways people answer their own question without writing in. */
export function QuickHelp() {
  const links: { icon: LucideIcon; title: string; cta: string; href?: string }[] = [
    { icon: CalendarCheck, title: 'Booking information', cta: 'How to plan your paddle', href: ROUTES.book },
    { icon: ShieldCheck, title: 'Safety & Responsible Tourism', cta: 'Preparation and requirements', href: ROUTES.safety },
    { icon: BadgePercent, title: 'Membership', cta: 'Plans and benefits', href: ROUTES.membership },
    { icon: CircleHelp, title: 'All FAQs', cta: 'Browse FAQs' },
  ]
  return (
    <section className="border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <Eyebrow>Quick help</Eyebrow>
          <h2 id="faq-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Quick answers.</RevealLines></h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {links.map(({ icon: Icon, title, cta, href }) => (
              <li key={title}>
                {href ? (
                  <a href={href} className={`group flex min-h-16 items-center gap-4 transition hover:text-teal ${focusRing}`}>
                    <Icon className="size-5 shrink-0 text-teal-strong" aria-hidden />
                    <span className="flex-1"><span className="block text-sm font-semibold">{title}</span><span className="text-xs text-slate">{cta}</span></span>
                    <ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden />
                  </a>
                ) : (
                  <div className="flex min-h-16 items-center gap-4 py-3"><Icon className="size-5 shrink-0 text-slate-light" aria-hidden /><span className="flex-1 text-sm font-semibold text-slate">{title}</span><ComingSoonLink>{cta}</ComingSoonLink></div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="divide-y divide-line border-y border-line lg:mt-16">
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

export function GroupAndAcademyBanners() {
  return (
    <section className="px-5 pb-24 lg:px-8 lg:pb-32">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl bg-line lg:grid-cols-2">
        <div className="bg-ink p-8 text-white sm:p-12">
          <Users className="size-8 text-sand" strokeWidth={1.4} aria-hidden />
          <h2 className="mt-8 font-display text-3xl font-black tracking-tight sm:text-4xl"><RevealLines>Planning for a group?</RevealLines></h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/70">Corporate outings, school visits or a day out with friends: tell us about your plans and explore the options. An enquiry doesn’t confirm a booking.</p>
          <a href={ROUTES.groups} className={`mt-8 ${gold}`}>Plan a group experience <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <div className="bg-paper-bright p-8 sm:p-12">
          <GraduationCap className="size-8 text-teal-strong" strokeWidth={1.4} aria-hidden />
          <h2 className="mt-8 font-display text-3xl font-black tracking-tight sm:text-4xl"><RevealLines>Want to learn to paddle?</RevealLines></h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-strong">Explore the Bond Safari Academy and get in touch with questions about courses, training opportunities, and upcoming programmes.</p>
          <a href={ROUTES.academy} className={`mt-8 ${dark}`}>Explore the Academy <ArrowRight className="size-4" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

export function ContactFinalCTA() {
  return (
    <section className="bg-sand px-5 py-20 text-ink lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">Ready when you are</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Your next adventure is<br />closer than you think.</RevealLines></h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={ROUTES.activities} className={dark}>Explore activities <ArrowRight className="size-4" aria-hidden /></a>
          <a href={ROUTES.locations} className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Find a location</a>
        </div>
      </div>
    </section>
  )
}

export function ContactMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-30 flex gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href={`#${FORM_ID}`} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-sand text-sm font-semibold text-ink">Send enquiry</a>
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">Book a paddle</a>
    </div>
  )
}
