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
  MembershipNav,
  PearlsSection,
  PlanCards,
  TierProgression,
} from '@/components/membership/membership-sections'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { formatRupee } from '@/lib/membership'
import { getLiveMembership } from '@/lib/membership-live'

// Live from the Bond backend (GET /membership): regenerated at most once a minute (MEMBERSHIP_REVALIDATE_SECONDS).
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLiveMembership()
  const description = `Bond Safari membership: free Bond Safari Club, Bond Blue from ${formatRupee(Math.min(...data.bondBlueOptions.map((option) => option.price)))} a year and the Paddle Season Pass. Earn Pearls and unlock member benefits.`
  return {
    title: 'Membership | Bond Safari Paddle Sports',
    description,
    alternates: { canonical: '/membership' },
    openGraph: { title: 'Bond Safari Membership', description, url: '/membership', type: 'website' },
  }
}

export default async function MembershipPage() {
  const data = await getLiveMembership()
  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-x-clip bg-paper text-ink">
        <SiteHeader />
        <MembershipHero data={data} />
        <MembershipNav />
        <PlanCards data={data} />
        <ComparisonTable data={data} />
        <PearlsSection data={data} />
        <TierProgression data={data} />
        <DashboardPreview />
        <FamilySection data={data} />
        <HowToJoin />
        <MembershipFAQ data={data} />
        <MembershipFinalCTA />
        <SiteFooter />
        <MembershipMobileBar />
      </main>
    </NotifyMeProvider>
  )
}
