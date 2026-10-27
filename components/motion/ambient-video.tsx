'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { IllustrativeLabel } from '@/components/locations/primitives'
import { EXPO } from '@/components/motion/reveal'

/**
 * Muted, decorative background loop. Loads nothing until it nears the viewport (unless `eager`, for
 * above-the-fold heroes), plays only while visible, and stays on its poster frame for visitors who
 * prefer reduced motion.
 */
export function AmbientVideo({ src, poster, focus, className = '', eager = false }: { src: string; poster: string; focus?: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (!video || reduce) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (video.preload !== 'auto') video.preload = 'auto'
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { rootMargin: '200px 0px' })
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduce])

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload={eager ? 'auto' : 'none'} aria-hidden className={`object-cover ${className}`} style={focus ? { objectPosition: focus } : undefined} />
}

/** Full-bleed hero film: settles from a slow zoom on load under an ink wash that keeps hero copy readable. */
export function HeroFilm({ src, poster, focus }: { src: string; poster: string; focus?: string }) {
  return (
    <>
      <div className="absolute inset-0">
        <motion.div className="size-full" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EXPO }}>
          <AmbientVideo src={src} poster={poster} focus={focus} className="size-full" eager />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_80%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_32%,transparent)_60%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_94%,transparent),transparent_55%)]" />
      <IllustrativeLabel className="absolute right-4 top-24 z-10" />
    </>
  )
}
