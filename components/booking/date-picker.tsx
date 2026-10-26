'use client'

import { useEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

type DatePickerProps = {
  value: Date | null
  onChange: (date: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const today = startOfDay(new Date())
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => new Date((value ?? today).getFullYear(), (value ?? today).getMonth(), 1))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const year = view.getFullYear()
  const month = view.getMonth()
  const leading = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ]
  const canGoBack = year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth())

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="block w-full rounded-2xl border border-[#dfe6e5] bg-[#f8faf8] px-4 py-3 text-left transition hover:border-[#00a9c3]"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#57717b]">Date</span>
        <span className="mt-2 flex items-center justify-between text-sm font-semibold text-[#06263b]">
          <span className={value ? '' : 'text-[#8a9ba1]'}>
            {value ? value.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Select a date'}
          </span>
          <CalendarDays className="size-4 text-[#00a9c3]" />
        </span>
      </button>

      {open && (
        <div role="dialog" aria-label="Choose a date" className="absolute left-0 z-30 mt-2 w-72 rounded-2xl border border-[#dfe6e5] bg-white p-4 shadow-[0_20px_60px_rgba(6,38,59,.18)]">
          <div className="mb-3 flex items-center justify-between">
            <button type="button" onClick={() => setView(new Date(year, month - 1, 1))} disabled={!canGoBack} aria-label="Previous month" className="rounded-full p-1.5 text-[#06263b] transition hover:bg-[#f0f5f4] disabled:opacity-30 disabled:hover:bg-transparent">
              <ChevronLeft className="size-4" />
            </button>
            <p className="font-display text-sm font-bold text-[#06263b]">{view.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            <button type="button" onClick={() => setView(new Date(year, month + 1, 1))} aria-label="Next month" className="rounded-full p-1.5 text-[#06263b] transition hover:bg-[#f0f5f4]">
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((d) => (
              <span key={d} className="py-1 text-[11px] font-bold uppercase text-[#71848b]">{d}</span>
            ))}
            {cells.map((date, i) => {
              if (!date) return <span key={`blank-${i}`} />
              const past = date < today
              const selected = value && sameDay(date, value)
              const isToday = sameDay(date, today)
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={past}
                  onClick={() => {
                    onChange(date)
                    setOpen(false)
                  }}
                  className={`aspect-square rounded-full text-sm font-semibold transition ${
                    selected
                      ? 'bg-[#06263b] text-white'
                      : past
                        ? 'cursor-not-allowed text-[#c3cdd0]'
                        : `text-[#06263b] hover:bg-[#e6f7fa] ${isToday ? 'ring-1 ring-[#00a9c3]' : ''}`
                  }`}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
