import type { ReactNode } from 'react'
import { ArrowRight, BadgePercent, CalendarCheck, ChevronDown, CircleHelp, GraduationCap, Mail, MapPin, MessageCircle, MessageSquare, Navigation, Phone, ShieldCheck, Users, type LucideIcon } from 'lucide-react'
import { ComingSoonLink } from '@/components/about/about-sections'
import { ContactForm, EnquiryTypeLink, FORM_ID } from '@/components/contact/contact-form'
import { LocationMap } from '@/components/locations/location-map'
import { LocationImageFallback } from '@/components/locations/location-card'
import { Eyebrow, IllustrativeLabel, LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { Ripples } from '@/components/membership/membership-sections'
import { contactChannels, whatsappHref, type ContactEnquiryType } from '@/lib/contact'
import { locationHref, locations } from '@/lib/locations'
import { ROUTES } from '@/lib/site'
import { cn } from '@/lib/utils'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { HERO_IMAGES } from '@/lib/hero-images'

const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`
const ghost = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`
const dark = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#0b3850] ${focusRing}`
const textLink = 'inline-flex min-h-11 items-center text-sm font-bold text-[#0b7f95] hover:text-[#06263b]'

const contactLocations = locations.filter((l) => l.hasDetailPage)

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#06263b] pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
      <HeroBackdrop src={HERO_IMAGES.contact} aboveWave />
      <Ripples className="absolute -right-40 -top-24 size-[44rem] opacity-80" />
      <svg viewBox="0 0 1440 120" className="absolute inset-x-0 bottom-0 w-full text-[#f6f3ec]" preserveAspectRatio="none" aria-hidden><path d="M0 80 C 240 40 480 120 720 80 S 1200 40 1440 80 V120 H0Z" fill="currentColor" /></svg>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> Get in touch</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl"><RevealLines>Let’s get you<br /><span className="text-[#f5b82e]">on the water.</span></RevealLines></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Have a question about a paddling experience, a location, an Academy course, or a group booking? We’re here to help you plan your next adventure with Bond Safari.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={`#${FORM_ID}`} className={gold}>Send an enquiry <ArrowRight className="ml-2 size-4" aria-hidden /></a>
            <a href={ROUTES.locations} className={ghost}>Explore locations</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContactOptions() {
  const options: { icon: LucideIcon; title: string; text: string; cta: string; type?: ContactEnquiryType; href?: string }[] = [
    { icon: MessageSquare, title: 'General enquiries', text: 'For general questions about Bond Safari, our activities, and available experiences.', cta: 'Contact our team', type: 'General Enquiry' },
    { icon: CalendarCheck, title: 'Booking support', text: 'Need help understanding your booking, session details, or available options?', cta: 'Booking help', type: 'Existing Booking' },
    { icon: GraduationCap, title: 'Academy enquiries', text: 'Questions about courses, training opportunities, or the Bond Safari Academy?', cta: 'Academy enquiries', type: 'Academy / Courses' },
    { icon: Users, title: 'Groups & corporate', text: 'Planning a team experience, school visit, group outing, or partnership?', cta: 'Group enquiry', href: `${ROUTES.groups}#enquiry` },
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="options-title">
      <h2 id="options-title" className="sr-only">Contact options</h2>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{options.map(({ icon: Icon, title, text, cta, type, href }, i) => (
          <article key={title} className={`flex flex-col rounded-3xl p-6 ${i === 3 ? 'bg-[#0b3850] text-white' : 'bg-white ring-1 ring-[#06263b]/5'}`}>
            <Icon className={`size-8 ${i === 3 ? 'text-[#f5b82e]' : 'text-[#00a9c3]'}`} strokeWidth={1.4} aria-hidden />
            <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
            <p className={`mt-2 flex-1 text-sm leading-6 ${i === 3 ? 'text-white/70' : 'text-[#57717b]'}`}>{text}</p>
            {type
              ? <EnquiryTypeLink type={type} className={`mt-5 ${textLink}`}>{cta} <ArrowRight className="ml-1 size-4" aria-hidden /></EnquiryTypeLink>
              : <a href={href} className={cn('mt-5', textLink, 'text-[#f5b82e] hover:text-white', focusRing)}>{cta} <ArrowRight className="ml-1 size-4" aria-hidden /></a>}
          </article>
        ))}
      </RevealGroup>
    </section>
  )
}

const channelIcons = { email: Mail, phone: Phone, whatsapp: MessageCircle }

export function ContactFormSection() {
  const channels = contactChannels()
  const whatsapp = whatsappHref()
  return (
    <section id={FORM_ID} className="scroll-mt-6 bg-white px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="form-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Eyebrow>Send an enquiry</Eyebrow>
          <h2 id="form-title" tabIndex={-1} className="mt-3 font-display text-4xl font-black outline-none sm:text-5xl"><RevealLines>How can we help?</RevealLines></h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#3d5862]">Send us your question and the relevant details. We’ll review your enquiry and respond using the contact information you provide.</p>
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,38,59,.12)] ring-1 ring-[#06263b]/5 sm:p-8"><ContactForm /></div>
        </div>

        <aside className="space-y-4 lg:pt-28" aria-labelledby="help-panel-title">
          <div className="relative overflow-hidden rounded-3xl bg-[#06263b] p-7 text-white">
            <Ripples className="absolute -right-24 -top-24 size-80" />
            <h3 id="help-panel-title" className="relative font-display text-2xl font-bold">We’re here to help.</h3>
            <p className="relative mt-2 text-sm leading-6 text-white/70">For general questions, the enquiry form is the quickest way to reach the team. Choose the enquiry type so it gets to the right people.</p>
            {channels.length > 0 ? (
              <ul className="relative mt-6 space-y-2">
                {channels.map(({ kind, label, value, href }) => {
                  const Icon = channelIcons[kind]
                  return <li key={kind}><a href={href} {...(kind === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`flex min-h-12 items-center gap-3 rounded-2xl bg-white/[.07] px-4 text-sm hover:bg-white/10 ${focusRing}`}><Icon className="size-4 text-[#00c8e8]" aria-hidden /><span className="font-bold">{label}</span><span className="ml-auto text-white/70">{value}</span></a></li>
                })}
              </ul>
            ) : (
              <p className="relative mt-6 rounded-2xl bg-white/[.07] p-4 text-sm leading-6 text-white/70">Phone, email and WhatsApp details will be listed here once they’re confirmed.</p>
            )}
          </div>

          {whatsapp && (
            <div className="rounded-3xl bg-[#d9f7ed] p-7">
              <MessageCircle className="size-8 text-[#14785a]" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-4 font-display text-xl font-bold">Prefer a quick conversation?</h3>
              <p className="mt-2 text-sm leading-6 text-[#3d5862]">Contact our team through WhatsApp for general questions and guidance about your experience.</p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex min-h-12 items-center rounded-full bg-[#14785a] px-6 text-sm font-bold text-white ${focusRing}`}>Chat on WhatsApp</a>
            </div>
          )}

          <div className="rounded-3xl bg-[#f6f3ec] p-6 text-sm leading-6 text-[#3d5862]">
            <p className="font-bold text-[#06263b]">About an existing booking?</p>
            <p className="mt-1">Choose “Existing Booking” and add your booking reference so we can find it.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export function ContactLocations() {
  return (
    <section className="bg-[#eef2ed] px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="locations-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Locations</Eyebrow>
        <h2 id="locations-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Find your way to the water.</RevealLines></h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#3d5862]">Explore our operating locations and check the relevant meeting-point information before your visit.</p>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{contactLocations.map((location) => {
            const meeting = location.visitorInfo.meetingPointAddress ?? location.meetingPoint
            const directions = location.coordinates ? `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}` : undefined
            return (
              <article key={location.slug} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
                <div className="relative aspect-[4/3]">
                  {location.image ? <img src={location.image.src} alt={location.image.alt} loading="lazy" decoding="async" className="size-full object-cover" /> : <LocationImageFallback />}
                  <LocationStatusBadge status={location.status} className="absolute left-3 top-3" />
                  {location.image?.illustrative && <IllustrativeLabel className="absolute bottom-3 right-3" />}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-bold">{location.name}</h3>
                  <p className="mt-2 flex gap-1.5 text-sm text-[#3d5862]"><MapPin className="mt-0.5 size-4 shrink-0 text-[#00a9c3]" aria-hidden />{meeting ? `Meeting point: ${meeting}` : location.status === 'operating' ? 'Meeting point shared with your booking.' : location.context}</p>
                  {location.status !== 'operating' && <p className="mt-2 text-xs font-semibold text-[#7a4f00]">Not yet open for bookings.</p>}
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                    <a href={locationHref(location)} className={`${textLink} ${focusRing}`}>View location <ArrowRight className="ml-1 size-4" aria-hidden /></a>
                    {directions && <a href={directions} target="_blank" rel="noopener noreferrer" className={`${textLink} ${focusRing}`}><Navigation className="mr-1 size-4" aria-hidden />Directions</a>}
                  </div>
                </div>
              </article>
            )
          })}
        </RevealGroup>
        <div className="mt-10">
          <h3 className="sr-only">Map</h3>
          <LocationMap locations={contactLocations} />
        </div>
      </div>
    </section>
  )
}

export function QuickHelp() {
  const items: { icon: LucideIcon; title: string; text: string; cta: string; href?: string }[] = [
    { icon: CalendarCheck, title: 'Booking information', text: 'Find out how to plan your paddling experience.', cta: 'Booking information', href: ROUTES.book },
    { icon: ShieldCheck, title: 'Safety & Responsible Tourism', text: 'Review preparation guidance and participant requirements.', cta: 'Read safety guidelines', href: ROUTES.safety },
    { icon: CircleHelp, title: 'Frequently asked questions', text: 'Find answers to common questions about activities, bookings, and policies.', cta: 'Browse FAQs' },
    { icon: BadgePercent, title: 'Membership', text: 'Explore Bond Safari membership options and benefits.', cta: 'Explore membership', href: ROUTES.membership },
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="quick-title">
      <Eyebrow>Quick help</Eyebrow>
      <h2 id="quick-title" className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Looking for something specific?</RevealLines></h2>
      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(({ icon: Icon, title, text, cta, href }) => (
          <article key={title} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5">
            <Icon className="size-7 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
            <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#57717b]">{text}</p>
            {href ? <a href={href} className={`mt-5 ${textLink} ${focusRing}`}>{cta} <ArrowRight className="ml-1 size-4" aria-hidden /></a> : <div className="mt-5"><ComingSoonLink>{cta}</ComingSoonLink></div>}
          </article>
        ))}
      </RevealGroup>
    </section>
  )
}

export function GroupAndAcademyBanners() {
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 lg:grid-cols-[1.4fr_1fr] lg:px-8 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-[#f0783e] p-8 text-[#06263b] sm:p-10">
        <div className="absolute -right-20 -top-28 size-80 rounded-full border-[44px] border-white/10" aria-hidden />
        <Users className="relative size-9" strokeWidth={1.4} aria-hidden />
        <h2 className="relative mt-6 font-display text-3xl font-black sm:text-4xl"><RevealLines>Planning an experience for your group?</RevealLines></h2>
        <p className="relative mt-3 max-w-lg text-sm leading-6 text-[#06263b]/80">Whether you’re organising a corporate outing, a school visit, or a day out with friends, tell us about your plans and explore the available options. An enquiry doesn’t confirm a booking.</p>
        <a href={ROUTES.groups} className={`relative mt-7 ${dark}`}>Plan a group experience</a>
      </div>
      <div className="rounded-3xl bg-[#0b3850] p-8 text-white sm:p-10">
        <GraduationCap className="size-9 text-[#f5b82e]" strokeWidth={1.4} aria-hidden />
        <h2 className="mt-6 font-display text-3xl font-black"><RevealLines>Interested in learning to paddle?</RevealLines></h2>
        <p className="mt-3 text-sm leading-6 text-white/70">Explore the Bond Safari Academy and get in touch with questions about courses, training opportunities, and upcoming programmes.</p>
        <a href={ROUTES.academy} className={`mt-7 ${gold}`}>Explore the Academy</a>
      </div>
    </section>
  )
}

const faqs: { q: string; a: ReactNode }[] = [
  { q: 'How do I book a paddling session?', a: <>Choose a location and activity, then pick a session from the booking panel on the <a href={ROUTES.locations} className="font-bold text-[#0b7f95]">location page</a>. Live availability and online payment will appear there once the booking system is connected.</> },
  { q: 'Where can I find the meeting point?', a: <>Each <a href={ROUTES.locations} className="font-bold text-[#0b7f95]">location page</a> lists its meeting point where confirmed. For example, Muziris–North Paravur meets at Thattukadavu Jetty. Your booking confirmation includes the details for your session.</> },
  { q: 'What happens if weather conditions affect my session?', a: <>Conditions can affect whether a session goes ahead. Follow the updates from Bond Safari; any rescheduling, cancellation or refund follows the applicable booking policy. See <a href={ROUTES.safety} className="font-bold text-[#0b7f95]">Safety & Responsible Tourism</a>.</> },
  { q: 'How can I contact the team about an existing booking?', a: 'Use the form above, choose “Existing Booking” and include your booking reference.' },
]

export function ContactFAQ() {
  return (
    <section className="mx-auto max-w-4xl px-5 pb-20 lg:pb-28" aria-labelledby="faq-title">
      <Eyebrow>FAQs</Eyebrow>
      <h2 id="faq-title" className="mt-3 font-display text-4xl font-black"><RevealLines>Quick answers.</RevealLines></h2>
      <div className="mt-8 divide-y divide-[#dfe6e5] overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group">
            <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display font-bold hover:bg-[#f8faf8] [&::-webkit-details-marker]:hidden ${focusRing}`}>{q}<ChevronDown className="size-5 shrink-0 text-[#00a9c3] transition group-open:rotate-180" aria-hidden /></summary>
            <div className="px-6 pb-5 text-sm leading-6 text-[#3d5862]">{a}</div>
          </details>
        ))}
      </div>
      <div className="mt-6"><ComingSoonLink>All FAQs</ComingSoonLink></div>
    </section>
  )
}

export function ContactFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0b3850] px-5 py-20 text-white lg:px-8 lg:py-28">
      <Ripples className="absolute -right-24 top-1/2 size-[40rem] -translate-y-1/2" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <h2 className="max-w-2xl font-display text-4xl font-black sm:text-6xl"><RevealLines>Your next adventure is <span className="text-[#f5b82e]">closer than you think.</span></RevealLines></h2>
          <p className="mt-4 max-w-xl text-base text-white/70">Explore Kerala from the water with Bond Safari Paddle Sports.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={ROUTES.activities} className={gold}>Explore activities <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <a href={ROUTES.locations} className={ghost}>Find a location</a>
        </div>
      </div>
    </section>
  )
}

export function ContactMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 rounded-2xl border border-white/30 bg-[#06263b]/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href={`#${FORM_ID}`} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#f5b82e] text-xs font-extrabold uppercase text-[#06263b]">Send enquiry</a>
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-xs font-extrabold uppercase text-white">Book now</a>
    </div>
  )
}
