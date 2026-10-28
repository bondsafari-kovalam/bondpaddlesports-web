'use client'

import { useState } from 'react'
import { ArrowRight, MapPin, MapPinOff } from 'lucide-react'
import { LocationStatusBadge, focusRing } from '@/components/locations/primitives'
import { REGIONS, locationHref, type Location } from '@/lib/locations'
import { RevealGroup } from '@/components/motion/reveal'

const MAPS_EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY

/**
 * Shows a Google Maps embed only when an embed key is configured AND the selected location has
 * client-verified coordinates. Otherwise it renders a clearly labelled placeholder.
 */
export function LocationMap({ locations }: { locations: Location[] }) {
  const [selectedSlug, setSelectedSlug] = useState(locations[0]?.slug)
  const selected = locations.find((location) => location.slug === selectedSlug) ?? locations[0]
  const canEmbed = Boolean(MAPS_EMBED_KEY && selected?.coordinates)

  return (
    <div className="grid overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5 lg:grid-cols-[380px_1fr]">
      <div className="order-2 max-h-[420px] overflow-y-auto border-t border-mist lg:order-1 lg:max-h-[620px] lg:border-r lg:border-t-0">
        <ul>
          {locations.map((location) => (
            <li key={location.slug} className="border-b border-mist last:border-0">
              <button type="button" onClick={() => setSelectedSlug(location.slug)} aria-pressed={location.slug === selected?.slug} className={`flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-paper-bright ${location.slug === selected?.slug ? 'bg-mist' : ''} ${focusRing}`}>
                <MapPin className={`mt-0.5 size-4 shrink-0 ${location.status === 'operating' ? 'text-success' : 'text-slate'}`} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-bold">{location.name}</span>
                  <span className="mt-0.5 block text-xs text-slate">{location.region}</span>
                </span>
                <LocationStatusBadge status={location.status} className="shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-1 lg:order-2">
        {selected?.map ? (
          <iframe
            key={selected.slug}
            title={`Map of ${selected.map.placeName}`}
            src={selected.map.embedUrl}
            className="h-[320px] w-full border-0 lg:h-full lg:min-h-[620px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : canEmbed && selected?.coordinates ? (
          <iframe
            title={`Map of ${selected.name}`}
            src={`https://www.google.com/maps/embed/v1/view?key=${MAPS_EMBED_KEY}&center=${selected.coordinates.lat},${selected.coordinates.lng}&zoom=14`}
            className="h-[320px] w-full lg:h-full lg:min-h-[620px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-full min-h-[320px] flex-col bg-mist p-6 sm:p-8 lg:min-h-[620px]">
            <div className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-strong" role="note">
              <MapPinOff className="mt-0.5 size-5 shrink-0 text-teal-strong" aria-hidden />
              <p><strong className="text-ink">Map placeholder — not an interactive map.</strong> The live map appears once Google Maps is configured and verified meeting-point coordinates are supplied. Locations are grouped by region below.</p>
            </div>
            <RevealGroup className="mt-5 grid flex-1 gap-3 sm:grid-cols-3">{REGIONS.map((region) => {
                const inRegion = locations.filter((location) => location.region === region)
                return (
                  <div key={region} className="rounded-2xl border border-dashed border-ink/15 p-4">
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate">{region}</p>
                    <p className="mt-1 font-display text-2xl font-bold">{inRegion.length}</p>
                    <ul className="mt-2 space-y-1 text-xs text-slate-strong">
                      {inRegion.map((location) => <li key={location.slug} className={location.slug === selected?.slug ? 'font-bold text-ink' : ''}>{location.name}</li>)}
                    </ul>
                  </div>
                )
              })}
            </RevealGroup>
            {selected?.hasDetailPage && (
              <a href={locationHref(selected)} className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white ${focusRing}`}>View {selected.name} <ArrowRight className="size-4" aria-hidden /></a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
