/** @type {import('next').NextConfig} */

// Public media isn't content-hashed, so it is cached for a week with background revalidation rather
// than marked immutable; a replaced file with the same name reaches visitors within a week at most.
const mediaCache = 'public, max-age=604800, stale-while-revalidate=86400'

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Responsive AVIF/WebP via next/image. Unsplash stand-ins are optimised too until Bond photography replaces them.
    formats: ['image/avif', 'image/webp'],
    // 60 for film posters under the ink wash, 75 (the default) for everything else.
    qualities: [60, 75],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 2048],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      // The investor portal is private: keep it out of search results and shared caches.
      { source: '/investor/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }, { key: 'Cache-Control', value: 'private, no-store' }] },
      { source: '/video/:path*', headers: [{ key: 'Cache-Control', value: mediaCache }] },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: mediaCache }] },
      { source: '/logo-288.:ext', headers: [{ key: 'Cache-Control', value: mediaCache }] },
    ]
  },
}

export default nextConfig
