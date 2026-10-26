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
    <nav aria-label="Academy" className="border-b border-[#06263b]/10 bg-white">
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 lg:px-6 [scrollbar-width:none]">
        {items.map((item) => {
          const active = item.href === '/academy' ? pathname === '/academy' : pathname.startsWith(item.href)
          return (
            <li key={item.href} className="shrink-0">
              <a href={item.href} aria-current={active ? 'page' : undefined} className={`flex min-h-12 items-center border-b-2 px-3 text-sm font-bold transition ${active ? 'border-[#f5b82e] text-[#06263b]' : 'border-transparent text-[#57717b] hover:text-[#06263b]'} focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#00a9c3]`}>{item.label}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
