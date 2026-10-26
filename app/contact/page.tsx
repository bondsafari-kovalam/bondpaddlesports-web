import type { Metadata } from 'next'
import { ContactFormProvider } from '@/components/contact/contact-form'
import {
  ContactFAQ,
  ContactFinalCTA,
  ContactFormSection,
  ContactHero,
  ContactLocations,
  ContactMobileBar,
  ContactOptions,
  GroupAndAcademyBanners,
  QuickHelp,
} from '@/components/contact/contact-sections'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const description = 'Contact Bond Safari Paddle Sports for paddling experiences, location information, Academy courses, memberships, and group enquiries in Kerala.'

export const metadata: Metadata = {
  title: 'Contact Bond Safari Paddle Sports | Kerala',
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Bond Safari Paddle Sports', description, url: '/contact', type: 'website' },
}

export default function ContactPage() {
  return (
    <ContactFormProvider>
      <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
        <SiteHeader />
        <ContactHero />
        <ContactOptions />
        <ContactFormSection />
        <ContactLocations />
        <QuickHelp />
        <GroupAndAcademyBanners />
        <ContactFAQ />
        <ContactFinalCTA />
        <SiteFooter />
        <ContactMobileBar />
      </main>
    </ContactFormProvider>
  )
}
