import type { ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { RevealGroup } from '@/components/motion/reveal'
import { CONTACT, SOCIAL } from '@/lib/site'

// Lucide 1.x no longer ships brand icons, so these follow its 24px, 2px-stroke style to sit with the rest of the UI.
function Glyph({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-[18px]" aria-hidden>{children}</svg>
}

const icons = {
  instagram: <Glyph><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></Glyph>,
  facebook: <Glyph><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Glyph>,
  youtube: <Glyph><path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></Glyph>,
  linkedin: <Glyph><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></Glyph>,
  whatsapp: <MessageCircle className="size-[18px]" strokeWidth={1.8} aria-hidden />,
}

const LABELS = { instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube', linkedin: 'LinkedIn', whatsapp: 'WhatsApp' }

/**
 * Round icon links to Bond's social profiles. Profiles not confirmed yet show as dimmed, non-clickable icons.
 * Icons rise in one after another on first view; on hover, sand fills the circle from below like water,
 * the glyph tilts, and a ring ripples outwards. Movement is skipped for visitors who prefer reduced motion.
 */
export function SocialLinks({ className = '' }: { className?: string }) {
  const profiles: { id: keyof typeof icons; url?: string }[] = [
    { id: 'instagram', url: SOCIAL.instagram },
    { id: 'facebook', url: SOCIAL.facebook },
    { id: 'youtube', url: SOCIAL.youtube },
    { id: 'linkedin', url: SOCIAL.linkedin },
    { id: 'whatsapp', url: CONTACT.whatsapp && `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}` },
  ]
  return (
    <RevealGroup as="ul" className={`flex flex-wrap gap-2 ${className}`} aria-label="Bond Safari on social media">
      {profiles.map(({ id, url }) => (
        <li key={id}>
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Bond Safari on ${LABELS[id]} (opens in a new tab)`} className={`group relative flex size-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition duration-500 hover:border-sand hover:text-ink motion-safe:hover:-translate-y-1 ${focusRing}`}>
              <span className="absolute inset-0 rounded-full border border-sand opacity-0 motion-safe:group-hover:animate-[social-ripple_0.9s_var(--ease-expo)]" aria-hidden />
              <span className="absolute inset-0 overflow-hidden rounded-full" aria-hidden><span className="absolute inset-0 translate-y-full rounded-full bg-sand transition-transform duration-500 group-hover:translate-y-0" /></span>
              <span className="relative transition-transform duration-500 motion-safe:group-hover:-rotate-8 motion-safe:group-hover:scale-110">{icons[id]}</span>
            </a>
          ) : (
            <span title={`${LABELS[id]} coming soon`} className="flex size-11 cursor-default items-center justify-center rounded-full border border-white/10 text-white/30">{icons[id]}<span className="sr-only">{LABELS[id]}: coming soon</span></span>
          )}
        </li>
      ))}
    </RevealGroup>
  )
}
