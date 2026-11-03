'use client'

import { Minus, Plus } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'

// showPicker throws when the input isn't focusable or the browser blocks it; the field still accepts typing then.
export function openPicker(input: HTMLInputElement | null) {
  try { input?.showPicker() } catch {}
}

/** The − value + buttons; `label` names what is counted, for screen readers. */
export function Stepper({ label, value, onChange, min = 0, max, large }: { label: string; value: number; onChange: (value: number) => void; min?: number; max: number; large?: boolean }) {
  const button = `flex ${large ? 'size-12' : 'size-11'} items-center justify-center rounded-full border border-line bg-white transition hover:border-ink disabled:opacity-40 disabled:hover:border-line ${focusRing}`
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className={button} aria-label={`Fewer ${label.toLowerCase()}`}><Minus className="size-3.5" /></button>
      <span className={`${large ? 'w-8 font-display text-2xl' : 'w-6 text-sm'} text-center font-bold text-ink`} aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className={button} aria-label={`More ${label.toLowerCase()}`}><Plus className="size-3.5" /></button>
    </div>
  )
}
