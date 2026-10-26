import { ShieldCheck } from 'lucide-react'
import { BrandMark } from '@/components/site/brand-mark'
import { ROUTES } from '@/lib/site'

const linkHrefs: Record<string, string> = {
  Locations: ROUTES.locations,
  Activities: ROUTES.activities,
  Academy: '/academy',
  Membership: '/membership',
  Shop: '/shop',
  'About Bond': '/about',
  Contact: ROUTES.contact,
  Safety: ROUTES.safety,
}

const columns = [
  ['Explore', 'Locations', 'Activities', 'Academy', 'Shop'],
  ['Plan your visit', 'Safety', 'FAQs', 'Contact', 'Booking terms'],
  ['Bond Group', 'Membership', 'About Bond', 'Investor login', 'Privacy'],
]

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#06263b] px-5 pb-24 pt-16 text-white lg:px-8 lg:pb-12"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]"><div><BrandMark className="h-28" /><p className="mt-6 max-w-xs text-sm leading-6 text-white/55">Adventure, healthy living and responsible tourism—through Kerala’s waters.</p></div>{columns.map(([heading, ...links]) => <div key={heading}><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fe8f4]">{heading}</h3><div className="mt-5 flex flex-col gap-3 text-sm text-white/65">{links.map((link) => <a key={link} href={linkHrefs[link] ?? '#'} className="transition hover:text-[#f5b82e]">{link}</a>)}</div></div>)}</div><div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row"><span>© 2026 Bond Safari Paddle Sports. Demo website preview.</span><span className="flex items-center gap-2"><ShieldCheck className="size-4" /> Safety first, always.</span></div></footer>
  )
}
