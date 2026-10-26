import type { Metadata } from 'next'
import {
  BeforeYouPaddle,
  EquipmentGuidance,
  GroupPreparation,
  LocalCulture,
  PolicyLinks,
  ResponsibleTourismSection,
  SafetyApproachSection,
  SafetyByActivity,
  SafetyFAQ,
  SafetyFinalCTA,
  SafetyHelp,
  SafetyHero,
  SafetyMobileBar,
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
    <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
      <SiteHeader />
      <SafetyHero />
      <SafetyApproachSection />
      <BeforeYouPaddle />
      <EquipmentGuidance />
      <WeatherConditions />
      <ResponsibleTourismSection />
      <LocalCulture />
      <GroupPreparation />
      <SafetyByActivity />
      <SafetyFAQ />
      <PolicyLinks />
      <SafetyHelp />
      <SafetyFinalCTA />
      <SiteFooter />
      <SafetyMobileBar />
    </main>
  )
}
