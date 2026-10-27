'use client'

import { usePathname } from 'next/navigation'

const items = [
  { label: 'Overview', href: '/academy' },
  { label: 'Courses', href: '/academy/courses' },
  { label: 'Pathway', href: '/academy/qualification-pathway' },
  { label: 'Calendar', href: '/academy/calendar' },
  { label: 'Careers', href: '/academy/careers' },
  { label: 'Schools', href: '/academy/schools' },
  { label: 'Certificate check', href: '/academy/certificate-check' },
]

export function AcademySubnav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Academy" className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-xl">
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 lg:px-6 [scrollbar-width:none]">
        {items.map((item) => {
          const active = item.href === '/academy' ? pathname === '/academy' : pathname.startsWith(item.href)
          return (
            <li key={item.href} className="shrink-0">
              <a href={item.href} aria-current={active ? 'page' : undefined} className={`flex min-h-14 items-center border-b-2 px-3 text-sm font-semibold transition ${active ? 'border-ink text-ink' : 'border-transparent text-slate hover:text-ink'} focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal`}>{item.label}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
