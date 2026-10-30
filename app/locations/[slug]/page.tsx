import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LocationBookingPanel } from '@/components/locations/location-booking-panel'
import { LocationCard } from '@/components/locations/location-card'
import {
  LocationActivityList,
  LocationDetailHero,
  LocationGallery,
  LocationGettingThere,
  LocationMobileCTA,
  LocationOverview,
  LocationRelatedExperiences,
  LocationReviews,
  LocationTourFilm,
  LocationVisitorInformation,
} from '@/components/locations/location-detail'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { STATUS_LABELS, getLocation, locationHref, locations, type Location } from '@/lib/locations'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return locations.filter((location) => location.hasDetailPage).map((location) => ({ slug: location.slug }))
}

function metaDescription(location: Location) {
  const status = location.status === 'operating' ? `Operating now${location.operatingSince ? ' since ' + new Date(location.operatingSince).getFullYear() : ''}` : `${STATUS_LABELS[location.status]}: ${location.plannedOpening ?? 'dates to be confirmed'}`
  return `${location.name}, ${location.context} — ${location.waterTypes.join(' & ') || 'paddlesports'} with ${SITE_NAME}. ${status}.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocation((await params).slug)
  if (!location) return {}
  const title = `${location.name} | ${SITE_NAME}`
  const description = metaDescription(location)
  const url = locationHref(location)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: location.image && !location.image.illustrative ? [{ url: location.image.src, alt: location.image.alt }] : undefined,
    },
  }
}

// Only verified facts go into structured data; planned locations get breadcrumbs only.
function structuredData(location: Location) {
  const url = `${SITE_URL}${locationHref(location)}`
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: `${SITE_URL}/locations` },
      { '@type': 'ListItem', position: 3, name: location.name, item: url },
    ],
  }
  if (location.status !== 'operating') return [breadcrumb]
  return [
    breadcrumb,
    {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: `${SITE_NAME} — ${location.name}`,
      url,
      address: { '@type': 'PostalAddress', addressLocality: location.context.split(',')[0], addressRegion: 'Kerala', addressCountry: 'IN' },
    },
  ]
}

export default async function LocationPage({ params }: Props) {
  const location = getLocation((await params).slug)
  if (!location) notFound()

  const others = locations.filter((other) => other.hasDetailPage && other.slug !== location.slug)

  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-hidden bg-paper text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(location)) }} />
        <SiteHeader bookHref={location.status === 'operating' ? '#book' : '/#book'} />
        <LocationDetailHero location={location} />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_400px] lg:gap-14 lg:px-8 lg:py-24">
          <div className="min-w-0 space-y-16">
            <LocationOverview location={location} />
            <LocationTourFilm location={location} />
            <LocationActivityList location={location} />
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start" aria-label="Booking">
            <LocationBookingPanel location={location} />
          </aside>
        </div>

        <div className="mx-auto max-w-7xl space-y-16 px-5 pb-20 lg:px-8 lg:pb-28">
          <LocationVisitorInformation location={location} />
          <LocationGettingThere location={location} />
          <LocationGallery location={location} />
          <LocationReviews location={location} />
          <LocationRelatedExperiences location={location} />
        </div>

        <section className="bg-mist px-5 py-20 lg:px-8" aria-labelledby="more-locations">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Keep exploring</p><h2 id="more-locations" className="mt-3 font-display text-3xl font-black sm:text-4xl"><RevealLines>More places to paddle</RevealLines></h2></div>
              <a href="/locations" className="text-sm font-bold text-teal">All locations →</a>
            </div>
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{others.map((other) => <LocationCard key={other.slug} location={other} />)}</RevealGroup>
          </div>
        </section>

        <SiteFooter />
        <LocationMobileCTA location={location} />
      </main>
    </NotifyMeProvider>
  )
}
