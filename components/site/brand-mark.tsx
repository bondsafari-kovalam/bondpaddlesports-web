/**
 * Site logo. Served from a 288px-tall export (3x the largest displayed height) instead of the
 * 1.2 MB original at /logo.png; WebP with a PNG fallback, and intrinsic dimensions so no layout shift.
 */
export function BrandMark({ className = 'h-14 sm:h-16' }: { className?: string }) {
  return (
    <a href="/" className="flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand" aria-label="Bond Safari Paddle Sports home">
      <picture>
        <source srcSet="/logo-288.webp" type="image/webp" />
        <img src="/logo-288.png" alt="Bond Safari Paddle Sports" width={299} height={288} decoding="async" className={`${className} w-auto`} />
      </picture>
    </a>
  )
}
