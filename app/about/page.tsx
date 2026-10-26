import type { Metadata } from 'next'
import {
  AboutAcademy,
  AboutFinalCTA,
  AboutGallery,
  AboutHero,
  AboutMembership,
  AboutMobileBar,
  OurExperiences,
  OurLocations,
  OurPeople,
  OurPurpose,
  OurStory,
  ResponsibleTourism,
  SafetyApproach,
} from '@/components/about/about-sections'
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
      <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
        <SiteHeader />
        <AboutHero />
        <OurStory />
        <OurPurpose />
        <OurExperiences />
        <OurLocations />
        <AboutAcademy />
        <SafetyApproach />
        <ResponsibleTourism />
        <OurPeople />
        <AboutMembership />
        <AboutGallery />
        <AboutFinalCTA />
        <SiteFooter />
        <AboutMobileBar />
      </main>
    </NotifyMeProvider>
  )
}
