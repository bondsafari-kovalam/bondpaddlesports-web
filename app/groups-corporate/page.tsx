import type { Metadata } from 'next'
import { GroupEnquiryProvider } from '@/components/groups/group-enquiry'
import {
  AudienceCards,
  CorporateSection,
  EnquirySection,
  GroupActivities,
  GroupFAQ,
  GroupGallery,
  GroupLocations,
  GroupsFinalCTA,
  GroupsHero,
  GroupsMobileBar,
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
      <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
        <SiteHeader />
        <GroupsHero />
        <AudienceCards />
        <CorporateSection />
        <SchoolsSection />
        <GroupActivities />
        <GroupLocations />
        <HowItWorks />
        <EnquirySection />
        <GroupGallery />
        <GroupFAQ />
        <GroupsFinalCTA />
        <SiteFooter />
        <GroupsMobileBar />
      </main>
    </GroupEnquiryProvider>
  )
}
