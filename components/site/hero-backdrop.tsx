import { IllustrativeLabel } from '@/components/locations/primitives'
import { HeroImage } from '@/components/motion/reveal'

/**
 * Full-bleed hero photo under a navy wash that keeps the hero copy readable.
 * Heroes ending in the wave divider pass `aboveWave` so the label clears it (the wave is 1/12 of the width tall).
 */
export function HeroBackdrop({ src, aboveWave = false }: { src: string; aboveWave?: boolean }) {
  return (
    <>
      <HeroImage src={src} alt="" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,38,59,.94)_0%,rgba(6,38,59,.72)_55%,rgba(6,38,59,.45)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,38,59,.95),transparent_60%)]" />
      <IllustrativeLabel className={`absolute right-4 z-10 ${aboveWave ? 'bottom-[calc(8.4vw+0.75rem)]' : 'bottom-4'}`} />
    </>
  )
}
