'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { focusRing } from '@/components/locations/primitives'
import { PATHWAY_STAGES } from '@/lib/academy'

type Stage = (typeof PATHWAY_STAGES)[number]

function PathwayStep({ stage, index, progress, dark }: { stage: Stage; index: number; progress: MotionValue<number>; dark: boolean }) {
  const reached = index / (PATHWAY_STAGES.length - 1)
  // Function form: a step change, not an interpolation, so it never runs on the native ScrollTimeline.
  const lit = useTransform(progress, (p) => (p >= reached - 0.02 ? 1 : 0))

  return (
    <li className="relative pl-16 lg:pl-0">
      <a href={stage.href} className={`group block rounded-2xl ${focusRing}`}>
        <span className={`absolute left-0 top-0 flex size-10 items-center justify-center overflow-hidden rounded-full border font-display text-sm font-bold lg:relative ${dark ? 'border-white/25 bg-ink text-white' : 'border-ink/15 bg-paper text-ink'}`}>
          <motion.span className="absolute inset-0 rounded-full bg-sand transition-opacity duration-500" style={{ opacity: lit }} aria-hidden />
          <span className="relative">{String(index + 1).padStart(2, '0')}</span>
        </span>
        <span className="block font-display text-2xl font-bold tracking-tight lg:mt-6">{stage.label}</span>
        <span className={`mt-2 block text-sm leading-6 ${dark ? 'text-white/65' : 'text-slate'}`}>{stage.text}</span>
        <span className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold transition ${dark ? 'text-teal-pale group-hover:text-sand' : 'text-teal-strong group-hover:text-ink'}`}>{stage.level ? `${stage.level}s` : 'Pathway details'} <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden /></span>
      </a>
    </li>
  )
}

/** Six-stage pathway whose connecting line draws itself as the visitor scrolls, lighting each stage in turn. */
export function QualificationPathway({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark'
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const progress = useTransform(scrollYProgress, (p) => (reduce ? 1 : p))
  const track = dark ? 'bg-white/15' : 'bg-ink/10'

  return (
    <div className="relative">
      <div className={`absolute left-5 right-[calc((100%-7.5rem)/6-1.25rem)] top-5 hidden h-px lg:block ${track}`} aria-hidden><motion.div className="size-full origin-left bg-sand" style={{ scaleX: progress }} /></div>
      <div className={`absolute bottom-0 left-5 top-5 w-px lg:hidden ${track}`} aria-hidden><motion.div className="size-full origin-top bg-sand" style={{ scaleY: progress }} /></div>
      <ol ref={ref} className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
        {PATHWAY_STAGES.map((stage, index) => <PathwayStep key={stage.id} stage={stage} index={index} progress={progress} dark={dark} />)}
      </ol>
    </div>
  )
}
