import { ArrowRight, Camera, ExternalLink, GraduationCap, Heart, MessageSquareQuote, ShieldCheck, Star, Users, Waves, type LucideIcon } from 'lucide-react'
import { FeedbackForm } from '@/components/gallery/feedback-form'
import { Gallery } from '@/components/gallery/gallery'
import { LocationTile } from '@/components/locations/location-card'
import { Eyebrow, IllustrativeLabel, focusRing } from '@/components/locations/primitives'
import { REVIEWS, REVIEW_SOURCE } from '@/lib/gallery'
import { locations } from '@/lib/locations'
import { CONTACT, ROUTES } from '@/lib/site'
import { Reveal, RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { SectionNav } from '@/components/site/section-nav'
import { HERO_IMAGES, isBondPhoto } from '@/lib/hero-images'

const gold = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sand px-7 text-sm font-semibold text-ink transition hover:bg-white ${focusRing}`
const ghost = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink ${focusRing}`
const dark = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`
const textLink = `inline-flex min-h-11 w-fit items-center gap-1.5 border-b border-ink/25 text-sm font-semibold text-ink transition hover:border-ink ${focusRing}`

export function GalleryHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
      <HeroBackdrop src={HERO_IMAGES.gallery} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> Gallery & Reviews</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl"><RevealLines>Life looks different<br /><span className="text-sand">from the water.</span></RevealLines></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Explore the moments, places, and paddling experiences that make every adventure memorable, and share your own.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#gallery" className={gold}>Explore the gallery <ArrowRight className="size-4" aria-hidden /></a>
            <a href="#feedback" className={ghost}>Share your experience</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const NAV = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'feedback', label: 'Share feedback' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'where', label: 'Locations' },
]

export function GalleryNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-2.5 lg:px-8">
        <SectionNav sections={NAV} label="Gallery page sections" layoutId="gallery-nav-pill" />
      </div>
    </div>
  )
}

export function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="gallery-title">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Gallery</Eyebrow>
          <h2 id="gallery-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Explore our world.</RevealLines></h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate">A closer look at paddling, places, and life on Kerala’s waterways. Tap any photo to view it full screen.</p>
      </div>
      <div className="mt-12"><Gallery /></div>
    </section>
  )
}

export function ReviewsSection() {
  const hasSummary = REVIEW_SOURCE && (REVIEW_SOURCE.averageRating !== undefined || REVIEW_SOURCE.totalReviews !== undefined)
  return (
    <section id="reviews" className="scroll-mt-16 bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="cyan">Guest experiences</Eyebrow>
            <h2 id="reviews-title" className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>The memories matter.<br /><span className="text-sand">The voices matter too.</span></RevealLines></h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/70">Feedback shared by guests about their experiences with Bond Safari. We only show genuine reviews from real guests.</p>
        </div>

        {/* The summary shows only figures supplied by a verified review platform, never computed from a subset. */}
        {hasSummary && REVIEW_SOURCE && (
          <div className="mt-12 flex flex-wrap items-center gap-6 border-y border-white/15 py-6">
            {REVIEW_SOURCE.averageRating !== undefined && <p className="flex items-center gap-2 font-display text-5xl font-black"><Star className="size-9 fill-sand text-sand" aria-hidden />{REVIEW_SOURCE.averageRating.toFixed(1)}</p>}
            {REVIEW_SOURCE.totalReviews !== undefined && <p className="text-sm text-white/70">{REVIEW_SOURCE.totalReviews} reviews on {REVIEW_SOURCE.name}</p>}
            <a href={REVIEW_SOURCE.url} target="_blank" rel="noopener noreferrer" className={`ml-auto inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-teal-pale transition hover:text-white ${focusRing}`}>View on {REVIEW_SOURCE.name} <ExternalLink className="size-4" aria-hidden /></a>
          </div>
        )}

        {REVIEWS.length ? (
          <RevealGroup as="ul" className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-2 lg:grid-cols-3">{REVIEWS.map((review) => (
              <li key={review.displayName + review.text.slice(0, 20)} className="flex flex-col bg-ink p-7">
                {review.rating !== undefined && <p className="flex gap-0.5" aria-label={`${review.rating} out of 5`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`size-4 ${i < review.rating! ? 'fill-sand text-sand' : 'text-white/20'}`} aria-hidden />)}</p>}
                <blockquote className="mt-5 flex-1 font-display text-lg leading-7">“{review.text}”</blockquote>
                <p className="mt-6 font-semibold">{review.displayName}</p>
                <p className="text-xs text-white/60">{[review.activity, review.date, review.source?.name].filter(Boolean).join(' · ')}</p>
              </li>
            ))}
          </RevealGroup>
        ) : (
          <Reveal className="mt-12 grid gap-8 border-t border-white/15 pt-10 md:grid-cols-[auto_1fr_auto] md:items-center">
            <MessageSquareQuote className="size-10 text-sand" strokeWidth={1.3} aria-hidden />
            <div>
              <p className="font-display text-2xl font-bold tracking-tight">Guest reviews will appear here.</p>
              <p className="mt-1 text-sm text-white/65">Paddled with us already? Your words could be the first.</p>
            </div>
            <a href="#feedback" className={gold}>Share your feedback <ArrowRight className="size-4" aria-hidden /></a>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export function FeedbackSection() {
  const contact = CONTACT.email ? `mailto:${CONTACT.email}` : CONTACT.phone ? `tel:${CONTACT.phone.replace(/\s/g, '')}` : undefined
  const principles = [
    'Use approved images and respect guest privacy.',
    'Get permission before publishing identifiable guest photographs.',
    'Get parent or guardian consent before publishing identifiable images of children.',
    'Respect local communities and sensitive locations.',
    'Use authentic captions that accurately describe the photograph.',
  ]
  return (
    <section id="feedback" className="scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="feedback-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Heart className="size-8 text-teal-strong" strokeWidth={1.4} aria-hidden />
          <h2 id="feedback-title" className="mt-5 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Paddled with us? Tell us about it.</RevealLines></h2>
          <p className="mt-4 text-base leading-7 text-slate-strong">We value feedback that helps us understand what guests enjoyed and where we can improve.</p>
          {/* How shared photos and stories are handled, shown where people decide to share them. */}
          <div className="mt-10 border-t border-line pt-6">
            <p className="flex items-center gap-2 font-display text-lg font-bold"><ShieldCheck className="size-5 text-success" aria-hidden />Respectful storytelling</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate">{principles.map((p) => <li key={p} className="flex gap-2"><span className="mt-2.5 size-1 shrink-0 rounded-full bg-slate-light" aria-hidden />{p}</li>)}</ul>
          </div>
          <a href={contact ?? ROUTES.contact} className={`mt-8 ${textLink}`}>Or contact our team directly <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-10"><FeedbackForm /></div>
      </div>
    </section>
  )
}

export function FeaturedExperiences() {
  const cards: { icon: LucideIcon; image: string; title: string; text: string; cta: string; href: string }[] = [
    { icon: Waves, image: HERO_IMAGES.activities, title: 'Explore Kerala’s waters', text: 'Guided paddling on the Muziris backwaters and the Kovalam coast, with more of Kerala’s waterways planned.', cta: 'Explore locations', href: ROUTES.locations },
    { icon: GraduationCap, image: HERO_IMAGES.academy, title: 'Learn on the water', text: 'From a first paddle to developing your skills with the Bond Safari Academy.', cta: 'Explore the Academy', href: ROUTES.academy },
    { icon: Users, image: HERO_IMAGES.groups, title: 'Bring everyone together', text: 'Paddling for teams, schools, friends, families and community groups.', cta: 'Explore group experiences', href: ROUTES.groups },
  ]
  return (
    <section id="experiences" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="featured-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Featured experiences</Eyebrow>
        <h2 id="featured-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Every paddle has a story.</RevealLines></h2>
        <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">{cards.map(({ icon: Icon, image, title, text, cta, href }) => (
            <article key={title} className="group flex flex-col">
              <a href={href} tabIndex={-1} aria-hidden className="relative block overflow-hidden rounded-3xl">
                <img src={image} alt="" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover transition duration-1000 group-hover:scale-105" />
                {!isBondPhoto(image) && <IllustrativeLabel className="absolute bottom-4 right-4" />}
              </a>
              <Icon className="mt-6 size-6 text-teal-strong" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate">{text}</p>
              <a href={href} className={`mt-5 ${textLink}`}>{cta} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export function GalleryLocations() {
  const shown = locations.filter((location) => location.hasDetailPage)
  return (
    <section id="where" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="where-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><Eyebrow>Locations</Eyebrow><h2 id="where-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>See where the adventure takes you.</RevealLines></h2></div>
          <a href={ROUTES.locations} className={textLink}>All locations <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <RevealGroup className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">{shown.map((location) => <LocationTile key={location.slug} location={location} className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto" />)}</RevealGroup>
      </div>
    </section>
  )
}

export function GalleryFinalCTA() {
  return (
    <section className="bg-sand px-5 py-20 text-ink lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60"><Camera className="size-4" aria-hidden />Your story next</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Ready to make<br />your own memories?</RevealLines></h2>
          <p className="mt-4 max-w-xl text-base text-ink/70">Find a place to paddle, choose your experience, and discover Kerala from the water.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={ROUTES.book} className={dark}>Book your adventure <ArrowRight className="size-4" aria-hidden /></a>
          <a href={ROUTES.locations} className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Explore locations</a>
        </div>
      </div>
    </section>
  )
}

export function GalleryMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-30 flex gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href={ROUTES.book} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-sand text-sm font-semibold text-ink">Book a paddle</a>
      <a href="#feedback" className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">Share feedback</a>
    </div>
  )
}
