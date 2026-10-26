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

function MoreMenu({ pathname }: { pathname: string }) {
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
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="more-menu" className={`inline-flex items-center gap-1 transition hover:text-[#f5b82e] ${active ? 'text-[#f5b82e]' : 'text-white/80'}`}>
        More <ChevronDown className={`size-3.5 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open && (
        <ul id="more-menu" className="absolute right-0 top-full mt-4 w-64 rounded-2xl border border-white/10 bg-[#06263b] p-2 shadow-xl">
          {moreItems.map(({ label, href }) => (
            <li key={href}><a href={href} onClick={() => setOpen(false)} aria-current={isActive(pathname, href) ? 'page' : undefined} className={`flex min-h-11 items-center rounded-xl px-4 hover:bg-white/10 ${isActive(pathname, href) ? 'text-[#f5b82e]' : 'text-white/85'}`}>{label}</a></li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function SiteHeader({ bookHref = '/#book' }: { bookHref?: string }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 bg-[#06263b]/70 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-5 text-[13px] font-semibold lg:flex xl:gap-7" aria-label="Main">
          {navItems.map(({ label, href }) => (
            <a key={label} href={href} aria-current={isActive(pathname, href) ? 'page' : undefined} className={`transition hover:text-[#f5b82e] ${isActive(pathname, href) ? 'text-[#f5b82e]' : 'text-white/80'}`}>{label}</a>
          ))}
          <MoreMenu pathname={pathname} />
        </nav>
        <div className="flex items-center gap-3">
          <a href={bookHref} className="hidden rounded-full bg-[#f5b82e] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white sm:block">Book now</a>
          <button className="flex size-10 items-center justify-center rounded-full border border-white/20 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      {menuOpen && <div className="border-t border-white/10 bg-[#06263b] px-5 py-5 lg:hidden"><nav className="flex flex-col gap-4 text-sm font-semibold" aria-label="Mobile">{navItems.map(({ label, href }) => <a onClick={() => setMenuOpen(false)} key={label} href={href} aria-current={isActive(pathname, href) ? 'page' : undefined} className={isActive(pathname, href) ? 'text-[#f5b82e]' : undefined}>{label}</a>)}<p className="mt-2 border-t border-white/10 pt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">More</p>{moreItems.map(({ label, href }) => <a onClick={() => setMenuOpen(false)} key={href} href={href} aria-current={isActive(pathname, href) ? 'page' : undefined} className={isActive(pathname, href) ? 'text-[#f5b82e]' : undefined}>{label}</a>)}</nav></div>}
    </header>
  )
}
