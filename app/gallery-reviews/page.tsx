import type { Metadata } from 'next'
import {
  FeaturedExperiences,
  FeedbackSection,
  GalleryFinalCTA,
  GalleryHero,
  GalleryLocations,
  GalleryMobileBar,
  GalleryNav,
  GallerySection,
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
      <main className="min-h-screen overflow-x-clip bg-paper text-ink">
        <SiteHeader />
        <GalleryHero />
        <GalleryNav />
        <GallerySection />
        <ReviewsSection />
        <FeedbackSection />
        <FeaturedExperiences />
        <GalleryLocations />
        <GalleryFinalCTA />
        <SiteFooter />
        <GalleryMobileBar />
      </main>
    </NotifyMeProvider>
  )
}
