'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { AmbientVideo } from '@/components/motion/ambient-video'
import { EXPO, Reveal, RevealLines } from '@/components/motion/reveal'
import { FILMS } from '@/lib/media'

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0, 0])

  return (
    <section ref={ref} className="relative flex min-h-[700px] items-end overflow-hidden bg-ink pb-16 pt-40 text-white lg:min-h-[780px] lg:pb-24">
      {/* Opens from a framed window to full bleed, then drifts slower than the page. */}
      <motion.div className="absolute inset-0" initial={reduce ? false : { clipPath: 'inset(14% 8% 14% 8% round 40px)' }} animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }} transition={{ duration: 1.8, ease: EXPO, delay: 0.15 }}>
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imageY }}>
          <motion.div className="size-full" initial={reduce ? false : { scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EXPO, delay: 0.15 }}>
            <AmbientVideo film={FILMS.canoeing} className="size-full" eager />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_88%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_55%,transparent)_45%,color-mix(in_srgb,var(--color-ink)_12%,transparent)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_88%,transparent),transparent_55%)]" />
      </motion.div>

      <motion.div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8" style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}>
        <div className="max-w-2xl">
          <Reveal as="p" delay={0.6} className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale">Kerala, from the water</Reveal>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl lg:text-[92px]">
            <RevealLines delay={0.7} stagger={0.12}>Find your<br /><span className="text-sand">wild water.</span></RevealLines>
          </h1>
          <Reveal as="p" delay={1} className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg">Guided paddles, peaceful backwaters and a new way to experience Kerala—one stroke at a time.</Reveal>
          <Reveal delay={1.1} className="mt-9 flex flex-wrap gap-3"><a href="#book" className="rounded-full bg-sand px-7 py-4 text-sm font-semibold text-ink transition hover:bg-white">Book an experience <ArrowRight className="ml-2 inline size-4" /></a><a href="#locations" className="rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink">Explore locations</a></Reveal>
        </div>
      </motion.div>

      <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-xs text-white/60 lg:flex">
        <span className="relative h-px w-12 overflow-hidden bg-white/20"><span className="absolute inset-0 origin-left animate-[scroll-cue_2.4s_var(--ease-expo)_infinite] bg-white/70 motion-reduce:animate-none" /></span> Scroll to explore
      </div>
    </section>
  )
}
