'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { BrandMark } from '@/components/site/brand-mark'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/locations' },
  { label: 'Activities', href: '/activities' },
  { label: 'Academy', href: '/academy' },
  { label: 'Shop', href: '/shop' },
  { label: 'Membership', href: '/membership' },
  { label: 'Groups & Corporate', href: '/groups-corporate' },
]

// Secondary pages. Add FAQs here once that route exists.
const moreItems = [
  { label: 'About', href: '/about' },
  { label: 'Safety & Responsible Tourism', href: '/safety-responsible-tourism' },
  { label: 'Gallery & Reviews', href: '/gallery-reviews' },
  { label: 'Contact', href: '/contact' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return !href.includes('#') && pathname.startsWith(href)
}

function MoreMenu({ pathname, light }: { pathname: string; light: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = moreItems.some(({ href }) => isActive(pathname, href))

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false) }
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus() } }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div ref={ref} className="relative" onBlur={(event) => { if (!ref.current?.contains(event.relatedTarget as Node)) setOpen(false) }}>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="more-menu" className={`inline-flex items-center gap-1 transition ${light ? 'hover:text-teal' : 'hover:text-sand'} ${active ? (light ? 'text-teal' : 'text-sand') : (light ? 'text-ink/75' : 'text-white/80')}`}>
        More <ChevronDown className={`size-3.5 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open && (
        <ul id="more-menu" className="absolute right-0 top-full mt-4 w-64 rounded-2xl border border-white/10 bg-ink p-2 text-white shadow-xl">
          {moreItems.map(({ label, href }) => (
            <li key={href}><a href={href} onClick={() => setOpen(false)} aria-current={isActive(pathname, href) ? 'page' : undefined} className={`flex min-h-11 items-center rounded-xl px-4 hover:bg-white/10 ${isActive(pathname, href) ? 'text-sand' : 'text-white/85'}`}>{label}</a></li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Canvas normalises any CSS colour (rgb, oklch, oklab, color-mix…) to RGBA bytes.
let colorCanvas: CanvasRenderingContext2D | null = null
function toRgba(color: string) {
  colorCanvas ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  if (!colorCanvas) return null
  colorCanvas.clearRect(0, 0, 1, 1)
  colorCanvas.fillStyle = color
  colorCanvas.fillRect(0, 0, 1, 1)
  return colorCanvas.getImageData(0, 0, 1, 1).data
}

/** True when the first opaque background directly beneath the header is light. */
function isLightBehind(header: HTMLElement) {
  const below = document.elementsFromPoint(window.innerWidth / 2, header.offsetHeight / 2).find((el) => !header.contains(el))
  let el: Element | null = below ?? null
  while (el) {
    const rgba = toRgba(getComputedStyle(el).backgroundColor)
    if (rgba && rgba[3] >= 128) return 0.2126 * rgba[0] + 0.7152 * rgba[1] + 0.0722 * rgba[2] > 150
    el = el.parentElement
  }
  return true
}

function useHeaderScroll(ref: React.RefObject<HTMLElement | null>) {
  const [light, setLight] = useState(false)
  // Tucks away while reading down the page and returns as soon as the visitor scrolls back up.
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let frame = 0
    let lastY = window.scrollY
    const update = () => {
      frame = 0
      const y = window.scrollY
      if (Math.abs(y - lastY) > 6) { setHidden(y > lastY && y > 160); lastY = y }
      if (ref.current) setLight(isLightBehind(ref.current))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [ref])

  return { light, hidden }
}

export function SiteHeader({ bookHref = '/#book' }: { bookHref?: string }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const scroll = useHeaderScroll(ref)
  // The open mobile menu is an ink panel, so keep the bar dark while it shows.
  const light = scroll.light && !menuOpen
  const linkClass = (href: string) => isActive(pathname, href) ? (light ? 'text-teal' : 'text-sand') : (light ? 'text-ink/75 hover:text-teal' : 'text-white/80 hover:text-sand')

  return (
    <header ref={ref} className={`fixed inset-x-0 top-0 z-30 border-b backdrop-blur-md transition-[background-color,color,border-color,translate] duration-700 ${scroll.hidden && !menuOpen ? '-translate-y-full focus-within:translate-y-0' : ''} ${light ? 'border-ink/10 bg-white/80 text-ink' : 'border-white/15 bg-ink/70 text-white'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-5 text-[13px] font-semibold lg:flex xl:gap-7" aria-label="Main">
          {navItems.map(({ label, href }) => (
            <a key={label} href={href} aria-current={isActive(pathname, href) ? 'page' : undefined} className={`transition ${linkClass(href)}`}>{label}</a>
          ))}
          <MoreMenu pathname={pathname} light={light} />
        </nav>
        <div className="flex items-center gap-3">
          <a href={bookHref} className={`hidden rounded-full bg-sand px-5 py-2.5 text-sm font-semibold text-ink transition sm:block ${light ? 'hover:bg-ink hover:text-white' : 'hover:bg-white'}`}>Book now</a>
          <button className={`flex size-10 items-center justify-center rounded-full border lg:hidden ${light ? 'border-ink/20' : 'border-white/20'}`} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      {menuOpen && <div className="border-t border-white/10 bg-ink px-5 py-5 lg:hidden"><nav className="flex flex-col gap-4 text-sm font-semibold" aria-label="Mobile">{navItems.map(({ label, href }) => <a onClick={() => setMenuOpen(false)} key={label} href={href} aria-current={isActive(pathname, href) ? 'page' : undefined} className={isActive(pathname, href) ? 'text-sand' : undefined}>{label}</a>)}<p className="mt-2 border-t border-white/10 pt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">More</p>{moreItems.map(({ label, href }) => <a onClick={() => setMenuOpen(false)} key={href} href={href} aria-current={isActive(pathname, href) ? 'page' : undefined} className={isActive(pathname, href) ? 'text-sand' : undefined}>{label}</a>)}</nav></div>}
    </header>
  )
}
