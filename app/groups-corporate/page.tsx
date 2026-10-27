import type { Metadata } from 'next'
import { GroupEnquiryProvider } from '@/components/groups/group-enquiry'
import {
  AudienceCards,
  CorporateSection,
  EnquirySection,
  GroupActivities,
  GroupFAQ,
  GroupLocations,
  GroupsFinalCTA,
  GroupsHero,
  GroupsMobileBar,
  GroupsNav,
  HowItWorks,
  SchoolsSection,
} from '@/components/groups/groups-sections'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const description = 'Group and corporate paddling in Kerala with Bond Safari: team outings, school and college trips, friends, clubs and private groups. Send a group enquiry.'

export const metadata: Metadata = {
  title: 'Groups & Corporate | Bond Safari Paddle Sports',
  description,
  alternates: { canonical: '/groups-corporate' },
  openGraph: { title: 'Groups & Corporate | Bond Safari Paddle Sports', description, url: '/groups-corporate', type: 'website' },
}

export default function GroupsCorporatePage() {
  return (
    <GroupEnquiryProvider>
      <main className="min-h-screen overflow-x-clip bg-paper text-ink">
        <SiteHeader />
        <GroupsHero />
        <GroupsNav />
        <AudienceCards />
        <CorporateSection />
        <SchoolsSection />
        <GroupActivities />
        <GroupLocations />
        <HowItWorks />
        <EnquirySection />
        <GroupFAQ />
        <GroupsFinalCTA />
        <SiteFooter />
        <GroupsMobileBar />
      </main>
    </GroupEnquiryProvider>
  )
}
