'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { focusRing } from '@/components/locations/primitives'
import { EXPO } from '@/components/motion/reveal'
import { BOND_BLUE_OPTIONS, formatRupee } from '@/lib/membership'

/** Individual / Family / Digital switch: one clear price at a time instead of three stacked rows. */
export function BondBluePicker() {
  const [selected, setSelected] = useState(BOND_BLUE_OPTIONS.find((option) => option.highlight)?.id ?? BOND_BLUE_OPTIONS[0].id)
  const option = BOND_BLUE_OPTIONS.find((item) => item.id === selected)!

  return (
    <div className="mt-6">
      <div role="radiogroup" aria-label="Bond Blue option" className="grid grid-cols-3 gap-1 rounded-full bg-white/10 p-1">
        {BOND_BLUE_OPTIONS.map((item) => (
          <button key={item.id} type="button" role="radio" aria-checked={selected === item.id} onClick={() => setSelected(item.id)} className={`relative h-9 rounded-full text-xs font-semibold transition ${selected === item.id ? 'text-ink' : 'text-white/75 hover:text-white'} ${focusRing}`}>
            {selected === item.id && <motion.span layoutId="bond-blue-option" className="absolute inset-0 rounded-full bg-white" transition={{ duration: 0.5, ease: EXPO }} />}
            <span className="relative">{item.name}</span>
          </button>
        ))}
      </div>
      <p className="mt-5 flex items-baseline gap-1" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={option.id} className="font-display text-5xl font-black" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: EXPO }}>{formatRupee(option.price)}</motion.span>
        </AnimatePresence>
        <span className="text-sm text-white/60">/year · {option.name}</span>
      </p>
    </div>
  )
}
