'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'

/**
 * Smooth wheel scrolling with Lenis. Touch keeps the device's native momentum. Scrollable panels
 * inside the page scroll themselves, and open dialogs (video player, lightbox) are left to the
 * browser so the page behind them stays put. Off for visitors who ask for reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      allowNestedScroll: true,
      prevent: (node) => node.nodeName === 'DIALOG',
      anchors: { offset: -24 },
    })
    return () => lenis.destroy()
  }, [])

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
