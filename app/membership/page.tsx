import type { Metadata } from 'next'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import {
  ComparisonTable,
  DashboardPreview,
  FamilySection,
  HowToJoin,
  MembershipFAQ,
  MembershipFinalCTA,
  MembershipHero,
  MembershipMobileBar,
  PearlsSection,
  PlanCards,
  TierProgression,
} from '@/components/membership/membership-sections'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const description = 'Bond Safari membership: free Bond Safari Club, Bond Blue from ₹999 a year and the Paddle Season Pass. Earn Pearls and unlock member benefits.'

export const metadata: Metadata = {
  title: 'Membership | Bond Safari Paddle Sports',
  description,
  alternates: { canonical: '/membership' },
  openGraph: { title: 'Bond Safari Membership', description, url: '/membership', type: 'website' },
}

export default function MembershipPage() {
  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
        <SiteHeader />
        <MembershipHero />
        <PlanCards />
        <ComparisonTable />
        <PearlsSection />
        <TierProgression />
        <DashboardPreview />
        <FamilySection />
        <HowToJoin />
        <MembershipFAQ />
        <MembershipFinalCTA />
        <SiteFooter />
        <MembershipMobileBar />
      </main>
    </NotifyMeProvider>
  )
}
