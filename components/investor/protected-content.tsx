'use client'

import { useEffect, type ReactNode } from 'react'

const WATERMARK = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='620' height='440'><text x='310' y='220' text-anchor='middle' transform='rotate(-35 310 220)' font-family='sans-serif' font-size='22' font-weight='700' fill='#6b7a80' fill-opacity='0.16'>CONFIDENTIAL by BOND PADDLE SPORTS PVT. LTD.</text></svg>`)}")`

/**
 * View-only wrapper: blocks selecting, copying, dragging, the context menu, the save/print/view-source shortcuts and
 * printing, and stamps a watermark. This deters casual copying only. Anything shown in a browser can still be
 * photographed or read through developer tools, so what really protects the content is the signed-in session.
 */
export function ProtectedContent({ children }: { children: ReactNode }) {
  useEffect(() => {
    const block = (e: Event) => e.preventDefault()
    const blockShortcut = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && /^[acpsux]$/i.test(e.key)) e.preventDefault() }
    const events = ['copy', 'cut', 'contextmenu', 'dragstart']
    events.forEach((name) => document.addEventListener(name, block))
    document.addEventListener('keydown', blockShortcut)
    return () => {
      events.forEach((name) => document.removeEventListener(name, block))
      document.removeEventListener('keydown', blockShortcut)
    }
  }, [])

  return (
    <>
      <div className="relative select-none [-webkit-touch-callout:none] print:hidden">
        {children}
        <div className="pointer-events-none absolute inset-0 z-10" style={{ backgroundImage: WATERMARK }} aria-hidden />
      </div>
      <p className="hidden text-sm print:block">This document can only be read in the investor portal. Printing is disabled.</p>
    </>
  )
}
