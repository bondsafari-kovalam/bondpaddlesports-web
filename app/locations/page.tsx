import type { Metadata } from 'next'
import { LocationsExplorer } from '@/components/locations/locations-explorer'
import { LocationsInfoSections } from '@/components/locations/locations-info-sections'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const description = 'Find your place on the water. Explore Bond Safari Paddle Sports locations across Kerala — backwaters operating now, coastal openings planned and the destinations ahead.'

export const metadata: Metadata = {
  title: 'Locations | Bond Safari Paddle Sports',
  description,
  alternates: { canonical: '/locations' },
  openGraph: { title: 'Locations | Bond Safari Paddle Sports', description, url: '/locations', type: 'website' },
}

export default function LocationsPage() {
  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-x-clip bg-paper text-ink">
        <SiteHeader />
        <LocationsExplorer />
        <LocationsInfoSections />
        <SiteFooter />
      </main>
    </NotifyMeProvider>
  )
}
