// Set NEXT_PUBLIC_SITE_URL to the production domain before launch; it drives canonical URLs, Open Graph and the sitemap.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

export const SITE_NAME = 'Bond Safari Paddle Sports'

export const ROUTES = {
  home: '/',
  locations: '/locations',
  safety: '/safety-responsible-tourism',
  academy: '/academy',
  membership: '/membership',
  seasonPass: '/membership#season-pass',
  activities: '/activities',
  groups: '/groups-corporate',
  gallery: '/gallery-reviews',
  book: '/#book',
  contact: '/contact',
}

export const IS_DEV = process.env.NODE_ENV !== 'production'

/**
 * Official contact channels. Leave undefined until verified by Bond; the UI only renders tel:,
 * mailto: or WhatsApp links for values that are set here.
 */
export const CONTACT: { phone?: string; email?: string; whatsapp?: string } = {
  phone: undefined,
  email: undefined,
  whatsapp: undefined,
}

/**
 * Official Bond Safari social profiles, as full URLs (e.g. 'https://www.instagram.com/<handle>/').
 * Leave undefined until Bond confirms the account; the footer shows those icons as not yet linked.
 */
export const SOCIAL: { instagram?: string; facebook?: string; youtube?: string; linkedin?: string } = {
  instagram: undefined,
  facebook: undefined,
  youtube: undefined,
  linkedin: undefined,
}
