'use client'

import { useState } from 'react'
import { Check, Clock, FileText, Heart, LifeBuoy, MapPin, MessageCircle, RotateCcw, ShieldCheck, Shirt, Users, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { focusRing } from '@/components/locations/primitives'
import { EXPO } from '@/components/motion/reveal'

const CHECKS: [LucideIcon, string][] = [
  [FileText, 'Read the activity description and participation requirements.'],
  [MapPin, 'Check your booking confirmation and meeting-point instructions.'],
  [Clock, 'Arrive at the time communicated for your session.'],
  [Users, 'Follow the team’s instructions before and during the activity.'],
  [Shirt, 'Wear clothing appropriate for the activity and conditions.'],
  [LifeBuoy, 'Use the equipment provided or approved for your session.'],
  [Heart, 'Tell the team about relevant participation or accessibility requirements before the session.'],
  [ShieldCheck, 'Follow any activity-specific swimming, age, health or fitness requirements.'],
  [MessageCircle, 'Ask questions if you are unsure about an instruction or requirement.'],
]

/** Tick-off version of the pre-paddle checklist. Kept in memory only; it's a personal aid, not a record. */
export function PaddleChecklist() {
  const [done, setDone] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setDone((current) => { const next = new Set(current); if (next.has(i)) next.delete(i); else next.add(i); return next })
  const complete = done.size === CHECKS.length

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold text-white/80" aria-live="polite">{complete ? 'All set. Enjoy your paddle!' : `${done.size} of ${CHECKS.length} ready`}</p>
        {done.size > 0 && <button type="button" onClick={() => setDone(new Set())} className={`inline-flex items-center gap-1.5 text-sm font-semibold text-teal-pale transition hover:text-white ${focusRing}`}><RotateCcw className="size-4" aria-hidden />Reset</button>}
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
        <motion.div className="h-full origin-left rounded-full bg-sand" animate={{ scaleX: done.size / CHECKS.length }} transition={{ duration: 0.6, ease: EXPO }} initial={false} />
      </div>
      <ul className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {CHECKS.map(([Icon, text], i) => {
          const checked = done.has(i)
          return (
            <li key={text} className="bg-ink">
              <button type="button" role="checkbox" aria-checked={checked} onClick={() => toggle(i)} className={`flex h-full w-full gap-4 p-6 text-left transition-colors ${checked ? 'bg-white/[.06]' : 'hover:bg-white/[.04]'} ${focusRing}`}>
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition ${checked ? 'border-sand bg-sand text-ink' : 'border-white/30 text-transparent'}`}><Check className="size-4" strokeWidth={3} aria-hidden /></span>
                <span>
                  <Icon className={`size-5 transition ${checked ? 'text-sand' : 'text-teal-pale'}`} aria-hidden />
                  <span className={`mt-3 block text-sm leading-6 transition ${checked ? 'text-white/55 line-through decoration-white/30' : 'text-white/85'}`}>{text}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
