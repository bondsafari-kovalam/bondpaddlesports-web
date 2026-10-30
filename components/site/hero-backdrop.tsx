import { IllustrativeLabel } from '@/components/locations/primitives'
import { HeroImage } from '@/components/motion/reveal'
import { isBondPhoto } from '@/lib/hero-images'

/**
 * Full-bleed hero photo under an ink wash that keeps the hero copy readable.
 * `soft` lightens the wash so more of the photo shows, keeping it dark enough behind the copy on the left.
 * Heroes ending in the wave divider pass `aboveWave` so the label clears it (the wave is 1/12 of the width tall).
 */
export function HeroBackdrop({ src, aboveWave = false, soft = false }: { src: string; aboveWave?: boolean; soft?: boolean }) {
  return (
    <>
      <HeroImage src={src} alt="" />
      {soft ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_88%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_62%,transparent)_50%,color-mix(in_srgb,var(--color-ink)_30%,transparent)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_90%,transparent),transparent_50%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_94%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_72%,transparent)_55%,color-mix(in_srgb,var(--color-ink)_45%,transparent)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_95%,transparent),transparent_60%)]" />
        </>
      )}
      {!isBondPhoto(src) && <IllustrativeLabel className={`absolute right-4 z-10 ${aboveWave ? 'bottom-[calc(8.4vw+0.75rem)]' : 'bottom-4'}`} />}
    </>
  )
}
