import type { Metadata } from 'next'
import {
  BeforeYouPaddle,
  EquipmentGuidance,
  GroupPreparation,
  ResponsibleTourismSection,
  SafetyApproachSection,
  SafetyByActivity,
  SafetyFAQ,
  SafetyHelp,
  SafetyHero,
  SafetyMobileBar,
  SafetyNav,
  WeatherConditions,
} from '@/components/safety/safety-sections'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const description = 'Learn about paddling preparation, participant requirements, changing water conditions, and responsible tourism with Bond Safari Paddle Sports in Kerala.'

export const metadata: Metadata = {
  title: 'Safety & Responsible Tourism | Bond Safari Paddle Sports',
  description,
  alternates: { canonical: '/safety-responsible-tourism' },
  openGraph: { title: 'Safety & Responsible Tourism | Bond Safari Paddle Sports', description, url: '/safety-responsible-tourism', type: 'website' },
}

export default function SafetyPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <SiteHeader />
      <SafetyHero />
      <SafetyNav />
      <SafetyApproachSection />
      <BeforeYouPaddle />
      <EquipmentGuidance />
      <WeatherConditions />
      <ResponsibleTourismSection />
      <GroupPreparation />
      <SafetyByActivity />
      <SafetyFAQ />
      <SafetyHelp />
      <SiteFooter />
      <SafetyMobileBar />
    </main>
  )
}
