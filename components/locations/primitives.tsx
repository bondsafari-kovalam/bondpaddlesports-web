import type { ReactNode } from 'react'
import { Clock3, Code2 } from 'lucide-react'
import { IS_DEV } from '@/lib/site'
import { STATUS_LABELS, type LocationStatus } from '@/lib/locations'

const badgeStyles: Record<LocationStatus, string> = {
  operating: 'bg-[#d9f7ed] text-[#14785a]',
  'opening-soon': 'bg-[#fff1cf] text-[#7a4f00]',
  'coming-soon': 'bg-white/90 text-[#57717b] ring-1 ring-[#dfe6e5]',
}

export function LocationStatusBadge({ status, className = '' }: { status: LocationStatus; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${badgeStyles[status]} ${className}`}>
      {status === 'operating' && <span className="size-1.5 rounded-full bg-[#14785a]" aria-hidden />}
      {STATUS_LABELS[status]}
    </span>
  )
}

export function Eyebrow({ children, tone = 'orange' }: { children: ReactNode; tone?: 'orange' | 'cyan' }) {
  return <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${tone === 'orange' ? 'text-[#c95a22]' : 'text-[#8fe8f4]'}`}>{children}</p>
}

export function IllustrativeLabel({ className = '' }: { className?: string }) {
  return <span className={`rounded-full bg-[#06263b]/70 px-2.5 py-1 text-[10px] font-semibold text-white/85 backdrop-blur ${className}`}>Illustrative image</span>
}

/** Shown to guests where approved client wording has not been supplied yet. */
export function Pending({ children = 'Awaiting approved client information.' }: { children?: ReactNode }) {
  return <span className="inline-flex items-start gap-1.5 text-sm italic text-[#57717b]"><Clock3 className="mt-0.5 size-3.5 shrink-0" aria-hidden />{children}</span>
}

/** Rendered in development only: flags content that needs real data before launch. */
export function DevNote({ title, children }: { title: string; children: ReactNode }) {
  if (!IS_DEV) return null
  return (
    <div className="rounded-2xl border border-dashed border-[#c95a22]/50 bg-[#fff7f1] p-5 text-sm text-[#7a3a12]">
      <p className="flex items-center gap-2 font-bold"><Code2 className="size-4" aria-hidden /> Development note · {title}</p>
      <div className="mt-2 leading-6">{children}</div>
    </div>
  )
}

export const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a9c3]'
