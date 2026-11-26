'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { RevealGroup } from '@/components/motion/reveal'
import { SmartImage } from '@/components/site/smart-image'
import { bondApi } from '@/lib/bond-api'
import type { LocationImage } from '@/lib/locations'
import { IS_DEV } from '@/lib/site'

type ApiImage = { id: string; url: string; altText: string | null; imageRole?: string }

/**
 * A location or activity gallery. Uses the website's own photos when configured; otherwise loads the images from the
 * Bond backend (`path`, e.g. /locations/:slug or /activities/:slug) in the browser. Those URLs are short-lived signed links, so they are fetched
 * fresh on each visit instead of being baked into the build. Hidden in production while there is nothing to show.
 */
export function LiveGallery({ path, name, media, fallback }: { path: string; name: string; media: LocationImage[]; fallback: ReactNode }) {
  const [live, setLive] = useState<LocationImage[]>([])

  useEffect(() => {
    if (media.length) return
    let current = true
    bondApi<{ images?: ApiImage[] }>(path).then((result) => {
      if (!current || !result.ok) return
      setLive((result.data.images ?? []).filter((image) => image.url).map((image) => ({ src: image.url, alt: image.altText ?? `${name} photo` })))
    })
    return () => {
      current = false
    }
  }, [path, name, media.length])

  const images = media.length ? media : live
  if (images.length === 0 && !IS_DEV) return null
  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="font-display text-2xl font-bold">Gallery</h2>
      {images.length > 0 ? (
        <RevealGroup className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">{images.map((image) => <div key={image.src} className="relative aspect-square overflow-hidden rounded-2xl"><SmartImage src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" unoptimized={!media.length} /></div>)}
        </RevealGroup>
      ) : fallback}
    </section>
  )
}
