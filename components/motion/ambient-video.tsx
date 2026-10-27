'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

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
