'use client'

import { Children, isValidElement, useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

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
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <motion.span className="block" initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={inView} transition={{ duration: 1.3, ease: EXPO, delay: delay + i * stagger }}>
            {line}
          </motion.span>
        </span>
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
export function ParallaxImage({ src, alt, className = '', imgClassName = '', strength = 10 }: { src: string; alt: string; className?: string; imgClassName?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`} initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }} whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }} viewport={inView} transition={{ duration: 1.4, ease: EXPO }}>
      <motion.div className="size-full" style={reduce ? undefined : { y, scale: 1 + (2 * strength) / 100 }}>
        <img src={src} alt={alt} className={`size-full object-cover ${imgClassName}`} />
      </motion.div>
    </motion.div>
  )
}

/** Full-bleed page hero image: settles from a slow zoom on load, then drifts as the page scrolls. Parent needs overflow-hidden. */
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], ['0%', '20%'])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.img src={src} alt={alt} className="size-full object-cover" style={reduce ? undefined : { y }} initial={reduce ? false : { scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EXPO }} />
    </div>
  )
}
