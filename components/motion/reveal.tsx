'use client'

import { Children, isValidElement, useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { SmartImage } from '@/components/site/smart-image'

// Expo-out: fast start, long soft settle. Mirrors --ease-expo in globals.css.
export const EXPO = [0.19, 1, 0.22, 1] as const

const inView = { once: true, margin: '0px 0px -12% 0px' } as const

const tags = { div: motion.div, article: motion.article, p: motion.p }

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ as = 'div', children, className, delay = 0 }: { as?: keyof typeof tags; children: ReactNode; className?: string; delay?: number }) {
  const Tag = tags[as]
  return (
    <Tag className={className} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 1.2, ease: EXPO, delay }}>
      {children}
    </Tag>
  )
}

/** Slides each line of a heading up from behind a mask. Lines are split on plain `<br />` (a styled, responsive `<br>` stays inline). Place inside the heading element. */
export function RevealLines({ children, delay = 0, stagger = 0.1 }: { children: ReactNode; delay?: number; stagger?: number }) {
  const lines: ReactNode[][] = [[]]
  Children.toArray(children).forEach((child) => {
    if (isValidElement<{ className?: string }>(child) && child.type === 'br' && !child.props.className) lines.push([])
    else lines[lines.length - 1].push(child)
  })

  return (
    <>
      {lines.map((line, i) => (
        // The mask is what gets observed: the text starts fully below it, so observing the text itself
        // would never register as visible once a line wraps (110% of a tall line clears the mask).
        <motion.span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]" initial="hidden" whileInView="shown" viewport={inView}>
          <motion.span className="block" variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }} transition={{ duration: 1.3, ease: EXPO, delay: delay + i * stagger }}>
            {line}
          </motion.span>
        </motion.span>
      ))}
    </>
  )
}

const groupTags = { div: 'div', ul: 'ul', ol: 'ol' } as const

/**
 * Drop-in replacement for a grid or list wrapper: each direct child fades up as it scrolls into view,
 * staggered with whichever siblings arrive at the same time. Children added later (filters) are picked up too.
 * The animation itself lives in globals.css under [data-reveal-group].
 */
export function RevealGroup<T extends keyof typeof groupTags = 'div'>({ as, ...props }: { as?: T } & ComponentPropsWithoutRef<T>) {
  const ref = useRef<HTMLElement>(null)
  const Tag = (as ?? 'div') as 'div'

  useEffect(() => {
    const group = ref.current
    if (!group) return
    const io = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry, i) => {
        const el = entry.target as HTMLElement
        el.style.setProperty('--reveal-delay', `${i * 80}ms`)
        el.dataset.shown = ''
        io.unobserve(el)
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    const watch = () => { for (const child of group.children) if (!(child as HTMLElement).hasAttribute('data-shown')) io.observe(child) }
    const mo = new MutationObserver(watch)
    watch()
    mo.observe(group, { childList: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])

  return <Tag ref={ref as React.Ref<HTMLDivElement>} data-reveal-group="" {...(props as ComponentPropsWithoutRef<'div'>)} />
}

/** Image that rises into view like a water line, then drifts with scroll. */
/**
 * Image that rises into view like a water line, then drifts with scroll. Responsive and lazy via
 * next/image; `sizes` should describe the rendered width so phones don't download desktop files.
 */
export function ParallaxImage({ src, alt, className = '', imgClassName = '', strength = 10, sizes = '(min-width: 1024px) 50vw, 100vw' }: { src: string; alt: string; className?: string; imgClassName?: string; strength?: number; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <motion.div ref={ref} className={`relative overflow-hidden bg-mist ${className}`} initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }} whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }} viewport={inView} transition={{ duration: 1.4, ease: EXPO }}>
      <motion.div className="relative size-full" style={reduce ? undefined : { y, scale: 1 + (2 * strength) / 100 }}>
        <SmartImage src={src} alt={alt} fill sizes={sizes} className={`object-cover ${imgClassName}`} />
      </motion.div>
    </motion.div>
  )
}

/**
 * Full-bleed page hero image: settles from a slow zoom on load, then drifts as the page scrolls.
 * It is the page's LCP element, so it is fetched with high priority. Parent needs overflow-hidden.
 */
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], ['0%', '20%'])

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <motion.div className="relative size-full" style={reduce ? undefined : { y }} initial={reduce ? false : { scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EXPO }}>
        <SmartImage src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
    </div>
  )
}

/** A number that counts up from zero the first time it scrolls into view. Screen readers get the final value. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, inView)
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!seen) return
    if (reduce) { setShown(value); return }
    const controls = animate(0, value, { duration: 1.8, ease: EXPO, onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [seen, reduce, value])

  return <span ref={ref} className={className}><span aria-hidden>{shown}</span><span className="sr-only">{value}</span></span>
}
