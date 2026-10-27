import type { Metadata } from 'next'
import { ActivitiesExplorer } from '@/components/activities/activities-explorer'
import { ActivityFinalCTA } from '@/components/activities/activity-detail'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const description = 'Kayaking, canoeing, stand-up paddleboarding and more. Find your rhythm on the water with Bond Safari Paddle Sports in Kerala, and see which locations offer each experience.'

export const metadata: Metadata = {
  title: 'Activities | Bond Safari Paddle Sports',
  description,
  alternates: { canonical: '/activities' },
  openGraph: { title: 'Activities | Bond Safari Paddle Sports', description, url: '/activities', type: 'website' },
}

export default function ActivitiesPage() {
  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-x-clip bg-paper text-ink">
        <SiteHeader />
        <ActivitiesExplorer />
        <ActivityFinalCTA bookHref="/locations" />
        <SiteFooter />
      </main>
    </NotifyMeProvider>
  )
}
