'use client'

import { usePathname } from 'next/navigation'
import { focusRing } from '@/components/locations/primitives'

const LINKS = [
  { href: '/investor/dashboard', label: 'Dashboard' },
  { href: '/investor/round', label: 'The round' },
  { href: '/investor/business-plan', label: 'Business plan' },
  { href: '/investor/network', label: 'Expansion network' },
  { href: '/investor/documents', label: 'Documents' },
  { href: '/investor/updates', label: 'Updates' },
]

export function PortalNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Investor portal" className="-mx-1 flex gap-1 overflow-x-auto">
      {LINKS.map(({ href, label }) => {
        const active = pathname === href
        return <a key={href} href={href} aria-current={active ? 'page' : undefined} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'bg-white text-ink' : 'text-white/70 hover:text-white'} ${focusRing}`}>{label}</a>
      })}
    </nav>
  )
}
