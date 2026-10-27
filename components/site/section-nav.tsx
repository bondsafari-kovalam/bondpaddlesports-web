'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { focusRing } from '@/components/locations/primitives'
import { EXPO } from '@/components/motion/reveal'

/** The last in-page section whose top has passed under the sticky bar. Measured on scroll, so fast scrolling can't skip a section. */
export function useActiveSection(ids: string[], offset = 180) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join()

  useEffect(() => {
    const sections = key.split(',')
    let frame = 0
    const update = () => {
      frame = 0
      let current = sections[0]
      for (const id of sections) if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= offset) current = id
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [key, offset])

  return active
}

/** Sticky in-page navigation whose ink pill slides to the section being read. */
export function SectionNav({ sections, label, layoutId = 'section-nav-pill' }: { sections: { id: string; label: string; count?: number }[]; label: string; layoutId?: string }) {
  const active = useActiveSection(sections.map((section) => section.id))
  return (
    <nav aria-label={label} className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:px-0">
      <ul className="flex gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} aria-current={active === section.id ? 'true' : undefined} className={`relative flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition ${active === section.id ? 'text-white' : 'text-slate-strong hover:text-ink'} ${focusRing}`}>
              {active === section.id && <motion.span layoutId={layoutId} className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.6, ease: EXPO }} />}
              <span className="relative">{section.label}</span>
              {section.count !== undefined && <span className={`relative text-xs ${active === section.id ? 'text-white/60' : 'text-slate-light'}`}>{section.count}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
