'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { AmbientVideo } from '@/components/motion/ambient-video'

// Scroll-linked values can run on the browser's native ScrollTimeline, which eases back to the
// starting value outside a partial range. Every mapping below therefore spans the full 0–1 progress.

function Word({ children, progress, range: [from, to] }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const input = [0, from, to, 1].filter((v, i, all) => i === 0 || v > all[i - 1])
  const opacity = useTransform(progress, input, input.map((v) => (v <= from ? 0.18 : 1)))
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

/** A large statement whose words light up one by one as it scrolls through the viewport. */
export function ScrollRevealText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  if (reduce) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{word}</Word>)}
    </p>
  )
}

/**
 * Pinned film section: the video opens from a framed window to full bleed as the visitor scrolls,
 * then the overlay copy settles in. Falls back to a plain full-bleed panel for reduced motion.
 */
export function ExpandingFilm({ src, poster, focus, children }: { src: string; poster: string; focus?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const clipPath = useTransform(scrollYProgress, [0, 0.55, 1], ['inset(18% 22% 18% 22% round 28px)', 'inset(0% 0% 0% 0% round 0px)', 'inset(0% 0% 0% 0% round 0px)'])
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [1.25, 1, 1])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55, 0.75, 1], [0, 0, 1, 1])
  const copyY = useTransform(scrollYProgress, [0, 0.55, 0.75, 1], [40, 40, 0, 0])

  return (
    <section ref={ref} className={`relative bg-ink ${reduce ? '' : 'h-[220vh]'}`}>
      <div className={`${reduce ? 'relative h-[80vh]' : 'sticky top-0 h-svh'} overflow-hidden`}>
        <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath }}>
          <motion.div className="size-full" style={reduce ? undefined : { scale }}>
            <AmbientVideo src={src} poster={poster} focus={focus} className="size-full" />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_85%,transparent),transparent_55%)]" />
        </motion.div>
        <motion.div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-16 text-white lg:px-8 lg:pb-24" style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
