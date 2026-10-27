'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { IllustrativeLabel } from '@/components/locations/primitives'
import { EXPO } from '@/components/motion/reveal'
import { SmartImage } from '@/components/site/smart-image'
import type { Film } from '@/lib/media'

type Connection = { saveData?: boolean; effectiveType?: string }

/**
 * Whether this visit should get moving video at all. Several independent signals, because
 * navigator.connection is missing in some browsers: reduced-motion and reduced-data preferences,
 * the Save-Data flag, and very slow connections all keep the still poster instead.
 */
function shouldSkipFilm() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return true
  const connection = (navigator as Navigator & { connection?: Connection }).connection
  return Boolean(connection?.saveData || (connection?.effectiveType && ['slow-2g', '2g'].includes(connection.effectiveType)))
}

/**
 * On phones, waits for the visitor's first scroll, tap or key press before any film is fetched: the
 * poster is the complete first impression, data isn't spent on a film nobody stays to watch, and the
 * film can't become a later, larger LCP candidate. Larger screens run `start` straight away.
 */
function afterFirstInteractionOnPhones(start: () => (() => void) | void) {
  if (!window.matchMedia('(max-width: 767px)').matches) return start()
  let stop: (() => void) | void
  const events = ['scroll', 'pointerdown', 'touchstart', 'keydown'] as const
  const go = () => { events.forEach((e) => window.removeEventListener(e, go)); stop = start() }
  events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }))
  return () => { events.forEach((e) => window.removeEventListener(e, go)); stop?.() }
}

/** Resolves once the page has loaded and the main thread is idle, so a hero film never competes with LCP. */
function afterLoadAndIdle(run: () => void) {
  let cancelled = false
  const idle = () => {
    const go = () => { if (!cancelled) run() }
    if ('requestIdleCallback' in window) window.requestIdleCallback(go, { timeout: 2500 })
    else setTimeout(go, 300)
  }
  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
  return () => { cancelled = true; window.removeEventListener('load', idle) }
}

/**
 * Muted, decorative background loop over an optimised poster image. The poster paints first (and is
 * the LCP element for heroes); the film is only fetched when it can be seen (or, for `eager` heroes,
 * after page load), and on phones only after the first interaction, in the portrait encode. It plays
 * only while visible and fades in once it is actually playing. Reduced motion, Save-Data, very slow
 * connections and playback errors all leave the poster in place.
 */
export function AmbientVideo({ film, className = '', eager = false, sizes = '100vw' }: { film: Film; className?: string; eager?: boolean; sizes?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [src, setSrc] = useState<string>()
  const [playing, setPlaying] = useState(false)

  // Decide when (and whether) to attach the film.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || reduce || shouldSkipFilm()) return
    const pick = () => (window.matchMedia('(max-width: 767px)').matches ? film.mobileSrc : film.src)
    return afterFirstInteractionOnPhones(() => {
      if (eager) return afterLoadAndIdle(() => setSrc(pick()))
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { setSrc(pick()); observer.disconnect() }
      }, { rootMargin: '200px 0px' })
      observer.observe(wrap)
      return () => observer.disconnect()
    })
  }, [eager, reduce, film.src, film.mobileSrc])

  // Once attached, play only while on screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { rootMargin: '100px 0px' })
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  // Framing comes from CSS variables + a media query, so the right crop is there on first paint.
  const focusVars = { '--focus': film.focus ?? '50% 50%', '--mobile-focus': film.mobileFocus ?? film.focus ?? '50% 50%' } as CSSProperties
  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`} style={focusVars}>
      <div className="relative size-full">
        {/* Posters always sit under an ink wash, so a lighter encode is indistinguishable and paints sooner. */}
        <SmartImage src={film.poster} alt="" fill priority={eager} quality={60} sizes={sizes} className="object-cover [object-position:var(--mobile-focus)] md:[object-position:var(--focus)]" />
        {src && (
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            onPlaying={() => setPlaying(true)}
            onError={() => setSrc(undefined)}
            // Phones get the portrait encode, already cropped around the subject, so it sits centred.
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 md:[object-position:var(--focus)] ${playing ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>
    </div>
  )
}

/** Full-bleed hero film: settles from a slow zoom on load under an ink wash that keeps hero copy readable. */
export function HeroFilm({ film }: { film: Film }) {
  return (
    <>
      <div className="absolute inset-0 bg-ink">
        <motion.div className="size-full" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EXPO }}>
          <AmbientVideo film={film} className="size-full" eager />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_80%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_32%,transparent)_60%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_94%,transparent),transparent_55%)]" />
      <IllustrativeLabel className="absolute right-4 top-24 z-10" />
    </>
  )
}
