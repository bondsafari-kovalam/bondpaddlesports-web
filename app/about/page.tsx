import type { Metadata } from 'next'
import {
  AboutAcademy,
  AboutFinalCTA,
  AboutHero,
  AboutMembership,
  AboutMobileBar,
  AboutNav,
  OurExperiences,
  OurLocations,
  OurPurpose,
  OurStory,
  SafetyApproach,
} from '@/components/about/about-sections'
import { TeamSection } from '@/components/about/team-section'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const description = 'Discover Bond Safari Paddle Sports, our approach to paddling, outdoor adventure, the Academy, and responsible experiences on Kerala’s waterways.'

export const metadata: Metadata = {
  title: 'About Bond Safari Paddle Sports | Kerala',
  description,
  alternates: { canonical: '/about' },
  openGraph: { title: 'About Bond Safari Paddle Sports', description, url: '/about', type: 'website' },
}

export default function AboutPage() {
  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-x-clip bg-paper text-ink">
        <SiteHeader />
        <AboutHero />
        <AboutNav />
        <OurStory />
        <OurPurpose />
        <OurExperiences />
        <OurLocations />
        <AboutAcademy />
        <SafetyApproach />
        <TeamSection />
        <AboutMembership />
        <AboutFinalCTA />
        <SiteFooter />
        <AboutMobileBar />
      </main>
    </NotifyMeProvider>
  )
}
