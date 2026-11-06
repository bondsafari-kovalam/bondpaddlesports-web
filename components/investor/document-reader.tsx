'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AlertCircle, ChevronLeft, ChevronRight, Loader2, Maximize, Minimize, Minus, Plus } from 'lucide-react'
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist'
import { ProtectedContent } from '@/components/investor/protected-content'
import { focusRing } from '@/components/locations/primitives'

const MIN_ZOOM = 0.5
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25
/** Reads like a printed report on a wide screen; narrower screens fit the page to their width. */
const MAX_PAGE_WIDTH = 900
const PAGE_GUTTER = 24
/** Stays under the canvas size limit on phones, however far the reader zooms in. */
const MAX_CANVAS_PIXELS = 12_000_000
/** Pages are drawn this far ahead of the reader, and released once further away, to bound memory. */
const RENDER_MARGIN = '1200px 0px'

type PageLink = { url: string; left: number; top: number; width: number; height: number }
type PageInfo = { width: number; height: number; links: PageLink[] }
type Status = 'loading' | 'ready' | 'expired' | 'error'

const toolButton = `flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-mist disabled:opacity-35 disabled:hover:bg-transparent sm:size-11 ${focusRing}`

/**
 * Reads a PDF inside the portal. The file is fetched from its session-checked route and drawn to
 * canvases, so no document URL is embedded in the page and there is no browser PDF toolbar.
 * ProtectedContent adds the watermark and copy deterrents used on the other view-only documents.
 */
export function DocumentReader({ src, title }: { src: string; title: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollShare = useRef(0)
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [pages, setPages] = useState<PageInfo[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [attempt, setAttempt] = useState(0)
  const [current, setCurrent] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [boxWidth, setBoxWidth] = useState(0)
  const [full, setFull] = useState(false)

  useEffect(() => {
    let stale = false
    let release: (() => void) | undefined
    async function load() {
      setStatus('loading')
      try {
        const response = await fetch(src, { cache: 'no-store' })
        if (response.status === 401) return setStatus('expired')
        if (!response.ok) throw new Error(`Document request failed: ${response.status}`)
        // Imported here because pdf.js needs browser globals, and only this page should pay for it.
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString()
        const task = pdfjs.getDocument({ data: await response.arrayBuffer() })
        release = () => { void task.destroy() }
        const loaded = await task.promise
        const info = await Promise.all(Array.from({ length: loaded.numPages }, async (_, index): Promise<PageInfo> => {
          const page = await loaded.getPage(index + 1)
          const viewport = page.getViewport({ scale: 1 })
          const annotations = await page.getAnnotations()
          const links = annotations.filter((item) => item.subtype === 'Link' && /^https?:/.test(item.url ?? '')).map((item) => {
            const [x1, y1] = viewport.convertToViewportPoint(item.rect[0], item.rect[1])
            const [x2, y2] = viewport.convertToViewportPoint(item.rect[2], item.rect[3])
            return {
              url: item.url as string,
              left: Math.min(x1, x2) / viewport.width,
              top: Math.min(y1, y2) / viewport.height,
              width: Math.abs(x2 - x1) / viewport.width,
              height: Math.abs(y2 - y1) / viewport.height,
            }
          })
          return { width: viewport.width, height: viewport.height, links }
        }))
        if (stale) return
        setPdf(loaded)
        setPages(info)
        setStatus('ready')
      } catch {
        if (!stale) setStatus('error')
      }
    }
    void load()
    return () => {
      stale = true
      release?.()
    }
  }, [src, attempt])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const observer = new ResizeObserver(() => setBoxWidth(scroller.clientWidth))
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [])

  const fitWidth = Math.max(Math.min(boxWidth - PAGE_GUTTER, MAX_PAGE_WIDTH), 0)
  const pageWidth = Math.round(fitWidth * zoom)

  // Zooming or resizing changes every page's height; this keeps the reader at the same place in the document.
  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) scroller.scrollTop = scrollShare.current * scroller.scrollHeight
  }, [pageWidth])

  function onScroll() {
    const scroller = scrollerRef.current
    if (!scroller) return
    scrollShare.current = scroller.scrollTop / scroller.scrollHeight
    const line = scroller.scrollTop + scroller.clientHeight / 3
    const index = pageRefs.current.findLastIndex((page) => page && page.offsetTop <= line)
    setCurrent(Math.max(index, 0) + 1)
  }

  const goTo = useCallback((page: number) => {
    const target = pageRefs.current[page - 1]
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scrollerRef.current?.scrollTo({ top: target.offsetTop - PAGE_GUTTER / 2, behavior: reduced ? 'auto' : 'smooth' })
  }, [])

  const changeZoom = (delta: number) => setZoom((value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value + delta)))

  // iPhones have no element fullscreen, so the fixed layout alone fills the screen there.
  async function toggleFull() {
    if (full) {
      if (document.fullscreenElement) await document.exitFullscreen().catch(() => {})
      return setFull(false)
    }
    setFull(true)
    await rootRef.current?.requestFullscreen?.().catch(() => {})
  }

  useEffect(() => {
    if (!full) return
    const leave = () => { if (!document.fullscreenElement) setFull(false) }
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setFull(false) }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('fullscreenchange', leave)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('fullscreenchange', leave)
      document.removeEventListener('keydown', onKey)
    }
  }, [full])

  const total = pages.length
  const ready = status === 'ready'

  return (
    <div ref={rootRef} className={full ? 'fixed inset-0 z-50 bg-mist' : 'overflow-hidden rounded-2xl border border-line'}>
      <ProtectedContent>
        <div role="toolbar" aria-label="Document controls" className="flex h-14 items-center justify-between gap-1 border-b border-line bg-paper-bright px-1.5 sm:px-3">
          <div className="flex items-center gap-0.5">
            <button type="button" onClick={() => goTo(current - 1)} disabled={!ready || current <= 1} aria-label="Previous page" className={toolButton}><ChevronLeft className="size-5" aria-hidden /></button>
            <p className="min-w-14 text-center text-sm font-semibold tabular-nums text-ink sm:min-w-24" aria-live="polite"><span className="sr-only sm:not-sr-only">Page </span>{ready ? `${current} of ${total}` : '–'}</p>
            <button type="button" onClick={() => goTo(current + 1)} disabled={!ready || current >= total} aria-label="Next page" className={toolButton}><ChevronRight className="size-5" aria-hidden /></button>
          </div>
          <div className="flex items-center gap-0.5">
            <button type="button" onClick={() => changeZoom(-ZOOM_STEP)} disabled={!ready || zoom <= MIN_ZOOM} aria-label="Zoom out" className={toolButton}><Minus className="size-5" aria-hidden /></button>
            <button type="button" onClick={() => setZoom(1)} disabled={!ready} aria-label={`Zoom ${Math.round(zoom * 100)}%. Reset to fit width`} className={`min-h-10 min-w-12 rounded-full text-sm font-semibold tabular-nums text-ink transition hover:bg-mist disabled:opacity-35 ${focusRing}`}>{Math.round(zoom * 100)}%</button>
            <button type="button" onClick={() => changeZoom(ZOOM_STEP)} disabled={!ready || zoom >= MAX_ZOOM} aria-label="Zoom in" className={toolButton}><Plus className="size-5" aria-hidden /></button>
            <button type="button" onClick={toggleFull} aria-label={full ? 'Exit full screen' : 'Full screen'} aria-pressed={full} className={toolButton}>{full ? <Minimize className="size-5" aria-hidden /> : <Maximize className="size-5" aria-hidden />}</button>
          </div>
        </div>

        <div ref={scrollerRef} onScroll={onScroll} tabIndex={0} role="region" aria-label={title} className={`relative overflow-auto bg-mist outline-none ${full ? 'h-[calc(100dvh-3.5rem)]' : 'h-[80dvh] min-h-112'}`}>
          {status === 'loading' && <p className="flex h-full items-center justify-center gap-2 text-sm font-semibold text-slate-strong" role="status"><Loader2 className="size-5 animate-spin text-teal motion-reduce:animate-none" aria-hidden />Opening the document</p>}
          {status === 'expired' && <Notice text="Your session has ended. Sign in again to keep reading."><a href="/investor/login" className={`mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}>Sign in</a></Notice>}
          {status === 'error' && <Notice text="The document couldn’t be opened."><button type="button" onClick={() => setAttempt((n) => n + 1)} className={`mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}>Try again</button></Notice>}
          {ready && pdf && pageWidth > 0 && (
            <div className="mx-auto flex w-max min-w-full flex-col items-center gap-3 p-3">
              {pages.map((info, index) => (
                <div key={index} ref={(node) => { pageRefs.current[index] = node }}>
                  <PdfPage pdf={pdf} number={index + 1} total={total} info={info} width={pageWidth} scroller={scrollerRef} />
                </div>
              ))}
            </div>
          )}
        </div>
      </ProtectedContent>
    </div>
  )
}

function Notice({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center" role="alert">
      <AlertCircle className="size-7 text-teal" aria-hidden />
      <p className="mt-3 text-sm font-semibold text-ink">{text}</p>
      {children}
    </div>
  )
}

function PdfPage({ pdf, number, total, info, width, scroller }: { pdf: PDFDocumentProxy; number: number; total: number; info: PageInfo; width: number; scroller: React.RefObject<HTMLDivElement | null> }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [near, setNear] = useState(false)
  const height = Math.round(width * (info.height / info.width))

  useEffect(() => {
    if (!boxRef.current) return
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { root: scroller.current, rootMargin: RENDER_MARGIN })
    observer.observe(boxRef.current)
    return () => observer.disconnect()
  }, [scroller])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!near) {
      canvas.width = 0
      canvas.height = 0
      return
    }
    let stale = false
    let task: RenderTask | undefined
    async function draw() {
      const page = await pdf.getPage(number)
      if (stale || !canvas) return
      const density = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_CANVAS_PIXELS / (width * height)))
      const viewport = page.getViewport({ scale: (width / info.width) * density })
      // Drawn off-screen first, so zooming swaps a finished page in instead of flashing blank.
      const buffer = document.createElement('canvas')
      buffer.width = Math.floor(viewport.width)
      buffer.height = Math.floor(viewport.height)
      task = page.render({ canvas: buffer, viewport })
      await task.promise
      if (stale) return
      canvas.width = buffer.width
      canvas.height = buffer.height
      canvas.getContext('2d')?.drawImage(buffer, 0, 0)
      canvas.dataset.rendered = 'true'
    }
    draw().catch(() => { /* cancelled by a newer zoom or by leaving the page */ })
    return () => {
      stale = true
      task?.cancel()
    }
  }, [near, pdf, number, width, height, info.width])

  return (
    <div ref={boxRef} className="relative bg-white shadow-[0_2px_12px_color-mix(in_srgb,var(--color-ink)_14%,transparent)]" style={{ width, height }}>
      <canvas ref={canvasRef} role="img" aria-label={`Page ${number} of ${total}`} className="block size-full" />
      {info.links.map((link) => (
        <a key={`${link.url}-${link.top}`} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Open source link: ${link.url}`} className="absolute z-20" style={{ left: `${link.left * 100}%`, top: `${link.top * 100}%`, width: `${link.width * 100}%`, height: `${link.height * 100}%` }} />
      ))}
    </div>
  )
}
