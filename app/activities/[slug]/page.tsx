import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ActivityBookingPanel,
  ActivityCrossSell,
  ActivityDetailHero,
  ActivityExperience,
  ActivityFAQ,
  ActivityFinalCTA,
  ActivityGallery,
  ActivityInclusions,
  ActivityInformationGrid,
  ActivityLocationList,
  ActivityMobileCTA,
  ActivityNextSteps,
  ActivityOverview,
  ActivityReviews,
  ActivitySafetySection,
  RelatedActivities,
} from '@/components/activities/activity-detail'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { activities, activityHref, getActivity, type Activity } from '@/lib/activities'
import { SITE_NAME, SITE_URL } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return activities.map((activity) => ({ slug: activity.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = getActivity((await params).slug)
  if (!activity) return {}
  const title = activity.seo?.title ?? `${activity.name} in Kerala | ${SITE_NAME}`
  const description = activity.seo?.description ?? `${activity.summary} ${activity.name} with ${SITE_NAME}: see where it runs, what to expect and how to book.`
  const url = activityHref(activity)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: activity.image && !activity.image.illustrative ? [{ url: activity.image.src, alt: activity.image.alt }] : undefined,
    },
  }
}

// Breadcrumbs only: no verified price, duration or availability exists yet for richer schema.
function breadcrumbs(activity: Activity) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Activities', item: `${SITE_URL}/activities` },
      { '@type': 'ListItem', position: 3, name: activity.name, item: `${SITE_URL}${activityHref(activity)}` },
    ],
  }
}

export default async function ActivityPage({ params }: Props) {
  const activity = getActivity((await params).slug)
  if (!activity) notFound()

  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs(activity)) }} />
        <SiteHeader bookHref="#book" />
        <ActivityDetailHero activity={activity} />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_400px] lg:gap-14 lg:px-8 lg:py-24">
          <div className="min-w-0 space-y-16">
            <ActivityOverview activity={activity} />
            <ActivityInformationGrid activity={activity} />
            <ActivityExperience activity={activity} />
            <ActivityInclusions activity={activity} />
            <ActivitySafetySection activity={activity} />
            <ActivityLocationList activity={activity} />
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start" aria-label="Booking">
            <ActivityBookingPanel activity={activity} />
          </aside>
        </div>

        <div className="mx-auto max-w-7xl space-y-16 px-5 pb-20 lg:px-8 lg:pb-28">
          <ActivityCrossSell activity={activity} />
          <ActivityNextSteps activity={activity} />
          <ActivityGallery activity={activity} />
          <ActivityReviews activity={activity} />
          <ActivityFAQ activity={activity} />
          <RelatedActivities activity={activity} />
        </div>

        <ActivityFinalCTA />
        <SiteFooter />
        <ActivityMobileCTA activity={activity} />
      </main>
    </NotifyMeProvider>
  )
}
