import { ArrowRight, Camera, ExternalLink, GraduationCap, Heart, MessageSquareQuote, ShieldCheck, Star, Users, Waves, type LucideIcon } from 'lucide-react'
import { FeedbackForm } from '@/components/gallery/feedback-form'
import { Gallery } from '@/components/gallery/gallery'
import { PhotoPlaceholder } from '@/components/groups/groups-sections'
import { LocationCard } from '@/components/locations/location-card'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { Ripples } from '@/components/membership/membership-sections'
import { REVIEWS, REVIEW_SOURCE } from '@/lib/gallery'
import { locations } from '@/lib/locations'
import { CONTACT, ROUTES } from '@/lib/site'

const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`
const ghost = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`
const dark = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#0b3850] ${focusRing}`

export function GalleryHero() {
  return (
    <section className="relative overflow-hidden bg-[#06263b] pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
      <Ripples className="absolute -right-40 -top-24 size-[46rem] opacity-80" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> Gallery & Reviews</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl">Life looks different<br /><span className="text-[#f5b82e]">from the water.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Explore the moments, places, and paddling experiences that make every adventure memorable.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#gallery" className={gold}>Explore the gallery <ArrowRight className="ml-2 size-4" aria-hidden /></a>
            <a href="#reviews" className={ghost}>Read guest reviews</a>
          </div>
        </div>
        {/* Editorial collage; swap the tiles for approved photographs when available. */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3" aria-hidden>
          <PhotoPlaceholder icon={Waves} label="Paddling on Kerala's waterways" className="col-span-2 row-span-2 aspect-square rounded-3xl" />
          <PhotoPlaceholder icon={Users} label="Paddling together" className="rounded-3xl" />
          <PhotoPlaceholder icon={Camera} label="Moments on the water" className="rounded-3xl" />
        </div>
      </div>
    </section>
  )
}

export function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="gallery-title">
      <Eyebrow>Gallery</Eyebrow>
      <h2 id="gallery-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Explore our world.</h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-[#3d5862]">A closer look at paddling, places, and life on Kerala’s waterways.</p>
      <div className="mt-10"><Gallery /></div>
    </section>
  )
}

export function FeaturedExperiences() {
  const cards: { icon: LucideIcon; title: string; text: string; cta: string; href: string }[] = [
    { icon: Waves, title: 'Explore the backwaters', text: 'Guided paddling at our operating Muziris locations, with more of Kerala’s waterways planned.', cta: 'Explore locations', href: ROUTES.locations },
    { icon: GraduationCap, title: 'Learn on the water', text: 'From a first paddle to developing your skills with the Bond Safari Academy.', cta: 'Explore the Academy', href: ROUTES.academy },
    { icon: Users, title: 'Bring everyone together', text: 'Paddling for teams, schools, friends, families and community groups.', cta: 'Explore group experiences', href: ROUTES.groups },
  ]
  return (
    <section className="bg-white/60 px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="featured-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Featured experiences</Eyebrow>
        <h2 id="featured-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Every paddle has a story.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map(({ icon, title, text, cta, href }) => (
            <article key={title} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
              <PhotoPlaceholder icon={icon} label={title} className="aspect-[4/3]" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#57717b]">{text}</p>
                <a href={href} className={`mt-6 inline-flex min-h-11 items-center text-sm font-bold text-[#0b7f95] hover:text-[#06263b] ${focusRing}`}>{cta} <ArrowRight className="ml-1 size-4" aria-hidden /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative scroll-mt-6 overflow-hidden bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-28" aria-labelledby="reviews-title">
      <Ripples className="absolute -left-40 top-0 size-[36rem]" />
      <div className="relative mx-auto max-w-7xl">
        <Eyebrow tone="cyan">Guest experiences</Eyebrow>
        <h2 id="reviews-title" className="mt-3 max-w-3xl font-display text-4xl font-black sm:text-5xl">The memories matter. <span className="text-[#f5b82e]">The voices matter too.</span></h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/70">Discover feedback shared by guests about their experiences with Bond Safari.</p>

        {/* The summary shows only figures supplied by a verified review platform, never computed from a subset. */}
        {REVIEW_SOURCE && (REVIEW_SOURCE.averageRating !== undefined || REVIEW_SOURCE.totalReviews !== undefined) && (
          <div className="mt-10 flex flex-wrap items-center gap-6 rounded-3xl bg-white/[.07] p-6">
            {REVIEW_SOURCE.averageRating !== undefined && <p className="flex items-center gap-2 font-display text-4xl font-black"><Star className="size-8 fill-[#f5b82e] text-[#f5b82e]" aria-hidden />{REVIEW_SOURCE.averageRating.toFixed(1)}</p>}
            {REVIEW_SOURCE.totalReviews !== undefined && <p className="text-sm text-white/70">{REVIEW_SOURCE.totalReviews} reviews on {REVIEW_SOURCE.name}</p>}
            <a href={REVIEW_SOURCE.url} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex min-h-11 items-center gap-1 text-sm font-bold text-[#8fe8f4]">View on {REVIEW_SOURCE.name} <ExternalLink className="size-4" aria-hidden /></a>
          </div>
        )}

        {REVIEWS.length ? (
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <li key={review.displayName + review.text.slice(0, 20)} className="flex flex-col rounded-3xl bg-white p-6 text-[#06263b]">
                {review.rating !== undefined && <p className="flex gap-0.5" aria-label={`${review.rating} out of 5`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`size-4 ${i < review.rating! ? 'fill-[#f5b82e] text-[#f5b82e]' : 'text-[#dfe6e5]'}`} aria-hidden />)}</p>}
                <blockquote className="mt-4 flex-1 text-sm leading-6">“{review.text}”</blockquote>
                <p className="mt-5 font-bold">{review.displayName}</p>
                <p className="text-xs text-[#57717b]">{[review.activity, review.date, review.source?.name].filter(Boolean).join(' · ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-white/15 bg-white/[.04] p-8 sm:flex-row sm:items-center">
            <MessageSquareQuote className="size-10 shrink-0 text-[#00c8e8]" strokeWidth={1.3} aria-hidden />
            <div>
              <p className="font-display text-xl font-bold">Guest reviews will appear here when available.</p>
              <p className="mt-1 text-sm text-white/65">We only show genuine feedback from real guests, shared with their permission.</p>
            </div>
            <a href="#feedback" className={`sm:ml-auto ${gold}`}>Share your feedback</a>
          </div>
        )}
      </div>
    </section>
  )
}

export function GalleryLocations() {
  const shown = locations.filter((location) => location.hasDetailPage)
  return (
    <section className="bg-[#eef2ed] px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="where-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><Eyebrow>Locations</Eyebrow><h2 id="where-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">See where the adventure takes you.</h2></div>
          <a href={ROUTES.locations} className={dark}>All locations</a>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{shown.map((location) => <LocationCard key={location.slug} location={location} />)}</div>
      </div>
    </section>
  )
}

export function ResponsiblePhotography() {
  const principles = [
    'Use approved images and respect guest privacy.',
    'Get permission before publishing identifiable guest photographs.',
    'Get parent or guardian consent before publishing identifiable images of children.',
    'Respect local communities and sensitive locations.',
    'Use authentic captions that accurately describe the photograph.',
  ]
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="photography-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <Eyebrow>Responsible storytelling</Eyebrow>
          <h2 id="photography-title" className="mt-3 font-display text-3xl font-black sm:text-4xl">Real people. Shared adventures. Respectful storytelling.</h2>
          <p className="mt-4 text-base leading-7 text-[#3d5862]">We believe outdoor experiences should be shared thoughtfully, with respect for the people, communities, and natural environments involved.</p>
        </div>
        <ul className="divide-y divide-[#dfe6e5] rounded-3xl bg-white px-6 ring-1 ring-[#06263b]/5">
          {principles.map((p) => <li key={p} className="flex gap-3 py-4 text-sm leading-6"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#14785a]" aria-hidden />{p}</li>)}
        </ul>
      </div>
    </section>
  )
}

export function FeedbackSection() {
  const contact = CONTACT.email ? `mailto:${CONTACT.email}` : CONTACT.phone ? `tel:${CONTACT.phone.replace(/\s/g, '')}` : undefined
  return (
    <section id="feedback" className="scroll-mt-6 bg-white px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="feedback-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Heart className="size-9 text-[#c95a22]" strokeWidth={1.4} aria-hidden />
          <h2 id="feedback-title" className="mt-5 font-display text-4xl font-black">Paddled with us? Tell us about your experience.</h2>
          <p className="mt-4 text-base leading-7 text-[#3d5862]">We value feedback that helps us understand what guests enjoyed and where we can improve.</p>
          <div className="mt-8"><a href={contact ?? ROUTES.contact} className={dark}>Contact our team</a></div>
        </div>
        <div className="rounded-3xl bg-[#f6f3ec] p-6 sm:p-8"><FeedbackForm /></div>
      </div>
    </section>
  )
}

export function GalleryFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0b3850] px-5 py-20 text-white lg:px-8 lg:py-28">
      <Ripples className="absolute -right-24 top-1/2 size-[40rem] -translate-y-1/2" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <h2 className="max-w-2xl font-display text-4xl font-black sm:text-6xl">Ready to make <span className="text-[#f5b82e]">your own memories?</span></h2>
          <p className="mt-4 max-w-xl text-base text-white/70">Find a place to paddle, choose your experience, and discover Kerala from the water.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={ROUTES.book} className={gold}>Book your adventure <ArrowRight className="ml-2 size-4" aria-hidden /></a>
          <a href={ROUTES.locations} className={ghost}>Explore locations</a>
        </div>
      </div>
    </section>
  )
}

export function GalleryMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 rounded-2xl border border-white/30 bg-[#06263b]/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#f5b82e] text-xs font-extrabold uppercase text-[#06263b]">Book now</a>
      <a href={ROUTES.locations} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-xs font-extrabold uppercase text-white">Locations</a>
    </div>
  )
}
