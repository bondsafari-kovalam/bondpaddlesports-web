import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/account/', '/academy/enrolment/', '/cart', '/checkout'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
