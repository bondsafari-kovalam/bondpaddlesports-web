import { ArrowUp, Lock, ShieldCheck } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { BrandMark } from '@/components/site/brand-mark'
import { SocialLinks } from '@/components/site/social-links'
import { ROUTES } from '@/lib/site'

// Items without an href have no page yet; they show as plain text rather than a dead link.
// `highlight` renders the link as a sand pill so it stands out from the plain links.
const columns: { heading: string; links: { label: string; href?: string; highlight?: boolean }[] }[] = [
  { heading: 'Explore', links: [{ label: 'Locations', href: ROUTES.locations }, { label: 'Activities', href: ROUTES.activities }, { label: 'Academy', href: ROUTES.academy }, { label: 'Groups & Corporate', href: ROUTES.groups }, { label: 'Shop', href: '/shop' }] },
  { heading: 'Plan your visit', links: [{ label: 'Safety', href: ROUTES.safety }, { label: 'Contact', href: ROUTES.contact }, { label: 'Gallery & Reviews', href: ROUTES.gallery }, { label: 'FAQs' }, { label: 'Booking terms' }] },
  { heading: 'Bond Group', links: [{ label: 'Membership', href: ROUTES.membership }, { label: 'About Bond', href: '/about' }, { label: 'Investor Login', href: '/investor/login', highlight: true }, { label: 'Privacy' }] },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-ink px-5 pb-28 pt-20 text-white lg:px-8 lg:pb-10">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
        <div>
          <BrandMark className="h-24" />
          <p className="mt-6 max-w-xs text-sm leading-6 text-white/60">Adventure, healthy living and responsible tourism, through Kerala’s waters.</p>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-teal-pale">Follow the journey</p>
          <SocialLinks className="mt-4" />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {columns.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-pale">{heading}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {links.map(({ label, href, highlight }) => (
                  <li key={label}>
                    {href && highlight
                      ? <a href={href} className={`-ml-0.5 inline-flex items-center gap-1.5 rounded-full border border-sand/60 bg-sand/10 px-3 py-1.5 font-semibold text-sand transition hover:border-sand hover:bg-sand hover:text-ink ${focusRing}`}><Lock className="size-3.5" aria-hidden />{label}</a>
                      : href
                      ? <a href={href} className={`text-white/70 transition hover:text-sand ${focusRing}`}>{label}</a>
                      : <span className="text-white/35">{label} <span className="text-[10px] uppercase tracking-wider">· soon</span></span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Bond Safari Paddle Sports.</span>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><ShieldCheck className="size-4" aria-hidden />Safety first, always.</span>
          <a href="#top" className={`inline-flex items-center gap-1.5 font-semibold text-white/70 transition hover:text-sand ${focusRing}`}>Back to top <ArrowUp className="size-3.5" aria-hidden /></a>
        </div>
      </div>
    </footer>
  )
}
