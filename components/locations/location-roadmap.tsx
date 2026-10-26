import { MapPinned } from 'lucide-react'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { DESTINATION_TARGET, HUBS, PHASES, STATUS_LABELS, type Location } from '@/lib/locations'
import { RevealGroup } from '@/components/motion/reveal'

export function LocationRoadmap({ locations, showSummary = true }: { locations: Location[]; showSummary?: boolean }) {
  const phases = PHASES.map((phase) => ({ phase, items: locations.filter((location) => location.phase === phase) })).filter(({ items }) => items.length > 0)

  return (
    <div className="overflow-hidden rounded-3xl bg-[#06263b] text-white">
      {showSummary && (
        <div className="grid gap-6 border-b border-white/10 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fe8f4]">Planned expansion</p>
            <h3 className="mt-3 font-display text-3xl font-black sm:text-4xl">The water ahead.</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">These destinations are part of our planned roadmap. They are not open yet, and opening dates will be announced once confirmed.</p>
          </div>
          <dl className="flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/[.07] px-5 py-4"><dt className="text-xs text-white/60">Target by {DESTINATION_TARGET.by}</dt><dd className="mt-1 font-display text-2xl font-bold text-[#f5b82e]">{DESTINATION_TARGET.count} destinations</dd></div>
            <div className="rounded-2xl bg-white/[.07] px-5 py-4"><dt className="text-xs text-white/60">Planned hubs</dt><dd className="mt-1 text-sm font-bold">{HUBS.join(' · ')}</dd></div>
          </dl>
        </div>
      )}
      <RevealGroup as="ol" className="grid gap-px bg-white/10 md:grid-cols-3">{phases.map(({ phase, items }) => (
          <li key={phase} className="bg-[#0b3850] p-6 sm:p-7">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f5b82e]"><MapPinned className="size-4" aria-hidden />{phase}</p>
            <ul className="mt-5 divide-y divide-white/10">
              {items.map((location) => (
                <li key={location.slug} className="flex items-center justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <p className="font-display font-bold">{location.name}</p>
                    <p className="mt-0.5 text-xs text-white/60">{location.region}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white/80 sm:inline">{STATUS_LABELS[location.status]}</span>
                    <NotifyMeButton name={location.name} slug={location.slug} variant="onDark" />
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </RevealGroup>
    </div>
  )
}
