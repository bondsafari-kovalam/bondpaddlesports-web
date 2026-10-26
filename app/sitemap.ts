import type { MetadataRoute } from 'next'
import { courseHref, courses } from '@/lib/academy'
import { SHOP_CATEGORIES, categoryHref, productHref, products } from '@/lib/shop'
import { activities, activityHref } from '@/lib/activities'
import { locationHref, locations } from '@/lib/locations'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/locations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/activities`, changeFrequency: 'weekly', priority: 0.9 },
    ...['', '/courses', '/qualification-pathway', '/calendar', '/careers', '/schools', '/certificate-check'].map((path) => ({ url: `${SITE_URL}/academy${path}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...courses.map((course) => ({ url: `${SITE_URL}${courseHref(course)}`, changeFrequency: 'weekly' as const, priority: 0.7 })),
    { url: `${SITE_URL}/safety-responsible-tourism`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/gallery-reviews`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/groups-corporate`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/membership`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/shop`, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...SHOP_CATEGORIES.map((category) => ({ url: `${SITE_URL}${categoryHref(category.id)}`, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...products.map((item) => ({ url: `${SITE_URL}${productHref(item)}`, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...activities.map((activity) => ({ url: `${SITE_URL}${activityHref(activity)}`, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...locations
      .filter((location) => location.hasDetailPage)
      .map((location) => ({
        url: `${SITE_URL}${locationHref(location)}`,
        changeFrequency: 'weekly' as const,
        priority: location.status === 'operating' ? 0.8 : 0.6,
      })),
  ]
}
