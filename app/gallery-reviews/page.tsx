import type { Metadata } from 'next'
import {
  FeaturedExperiences,
  FeedbackSection,
  GalleryFinalCTA,
  GalleryHero,
  GalleryLocations,
  GalleryMobileBar,
  GallerySection,
  ResponsiblePhotography,
  ReviewsSection,
} from '@/components/gallery/gallery-sections'
import { NotifyMeProvider } from '@/components/locations/notify-me'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const description = 'Explore paddling photographs, Kerala waterways, and genuine guest feedback from Bond Safari Paddle Sports.'

export const metadata: Metadata = {
  title: 'Gallery & Reviews | Bond Safari Paddle Sports',
  description,
  alternates: { canonical: '/gallery-reviews' },
  openGraph: { title: 'Gallery & Reviews | Bond Safari Paddle Sports', description, url: '/gallery-reviews', type: 'website' },
}

export default function GalleryReviewsPage() {
  return (
    <NotifyMeProvider>
      <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
        <SiteHeader />
        <GalleryHero />
        <GallerySection />
        <FeaturedExperiences />
        <ReviewsSection />
        <GalleryLocations />
        <ResponsiblePhotography />
        <FeedbackSection />
        <GalleryFinalCTA />
        <SiteFooter />
        <GalleryMobileBar />
      </main>
    </NotifyMeProvider>
  )
}
