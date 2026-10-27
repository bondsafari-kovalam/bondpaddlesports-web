'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Compass, GraduationCap, ImageOff, LayoutGrid, MapPin, Mountain, Users, Waves, X, type LucideIcon } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { Ripples } from '@/components/membership/membership-sections'
import { GALLERY_CATEGORIES, GALLERY_ITEMS, LAYOUT_PREVIEW_ITEMS, type GalleryCategoryId, type GalleryItem } from '@/lib/gallery'
import { locations } from '@/lib/locations'

const icons: Record<GalleryCategoryId, LucideIcon> = { kayaking: Waves, canoeing: Mountain, sup: Compass, locations: MapPin, academy: GraduationCap, groups: Users }
const categoryLabel = (id: GalleryCategoryId) => GALLERY_CATEGORIES.find((c) => c.id === id)?.label ?? id

/**
 * A photo that shows a shimmering skeleton while it loads, then settles in from a soft blur.
 * Served through next/image (responsive AVIF/WebP); its onLoad also fires for cached images.
 * A failed request ends the shimmer and shows the same on-brand fallback as the rest of the site.
 */
function Photo({ item, large }: { item: GalleryItem & { src: string }; large: boolean }) {
  const [state, setState] = useState<'loading' | 'loaded' | 'failed'>('loading')
  const loaded = state !== 'loading'

  return (
    <span className={`relative block size-full overflow-hidden ${large ? 'bg-ink-soft' : 'bg-mist'}`}>
      {!loaded && (
        <span className="absolute inset-0" aria-hidden>
          <span className={`absolute inset-0 motion-safe:animate-[gallery-shimmer_1.6s_ease-in-out_infinite] ${large ? 'bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.08),transparent)]' : 'bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-paper-bright)_85%,transparent),transparent)]'}`} />
        </span>
      )}
      {state === 'failed' ? (
        <span role="img" aria-label={item.alt} className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--color-ink-muted),var(--color-ink)_70%)]"><ImageOff className="size-8 text-teal-bright/60" strokeWidth={1.3} aria-hidden /></span>
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes={large ? '(min-width: 640px) 92vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
          priority={large}
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
          className={`size-full object-cover transition-[opacity,filter,scale] duration-700 motion-reduce:transition-opacity ${loaded ? 'scale-100 opacity-100 blur-0' : 'scale-[1.04] opacity-0 blur-md'}`}
        />
      )}
    </span>
  )
}

function Tile({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  if (item.src) return <Photo item={{ ...item, src: item.src }} large={large} />
  const Icon = icons[item.category]
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,var(--color-ink-muted),var(--color-ink)_70%)]" role="img" aria-label={item.alt}>
      <Ripples className="absolute size-[140%]" />
      <Icon className={`relative text-teal-bright ${large ? 'size-20' : 'size-10'}`} strokeWidth={1} aria-hidden />
    </div>
  )
}

function Lightbox({ items, index, onIndex, onClose }: { items: GalleryItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const item = items[index]
  const location = item.locationSlug ? locations.find((l) => l.slug === item.locationSlug) : undefined
  const prev = useCallback(() => onIndex((index - 1 + items.length) % items.length), [index, items.length, onIndex])
  const next = useCallback(() => onIndex((index + 1) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    ref.current?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={(e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next() }}
      aria-label={`Image ${index + 1} of ${items.length}: ${item.caption}`}
      className="m-auto h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink-deep/90 sm:h-auto sm:max-h-[92vh] sm:w-[min(92vw,1100px)]"
    >
      <div className="flex h-full flex-col justify-center gap-4 p-4 sm:p-0">
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-semibold" aria-live="polite">{index + 1} / {items.length}</p>
          <button type="button" onClick={() => ref.current?.close()} className={`flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 ${focusRing}`} aria-label="Close gallery" autoFocus><X className="size-5" /></button>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-ink" style={{ aspectRatio: `${item.width} / ${item.height}`, maxHeight: '70vh', marginInline: 'auto', width: '100%', maxWidth: `calc(70vh * ${item.width / item.height})` }}>
          <Tile key={item.id} item={item} large />
        </div>
        <div className="flex items-start justify-between gap-4 text-white">
          <div>
            <p className="font-display text-lg font-bold">{item.caption}</p>
            <p className="mt-1 text-xs text-white/60">{[categoryLabel(item.category), location?.name, item.dateLabel].filter(Boolean).join(' · ')}{!item.src && ' · Layout preview'}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={prev} className={`flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 ${focusRing}`} aria-label="Previous image"><ChevronLeft className="size-5" /></button>
            <button type="button" onClick={next} className={`flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 ${focusRing}`} aria-label="Next image"><ChevronRight className="size-5" /></button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export function Gallery() {
  const [preview, setPreview] = useState(false)
  const [filter, setFilter] = useState<'all' | GalleryCategoryId>('all')
  const [open, setOpen] = useState<number | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const source = GALLERY_ITEMS.length ? GALLERY_ITEMS : preview ? LAYOUT_PREVIEW_ITEMS : []
  // Only categories with content get a filter tab.
  const categories = GALLERY_CATEGORIES.filter((c) => source.some((item) => item.category === c.id))
  const shown = filter === 'all' ? source : source.filter((item) => item.category === filter)

  const close = () => {
    setOpen(null)
    triggerRef.current?.focus()
  }

  if (!source.length) {
    return (
      <div className="grid gap-8 rounded-3xl border border-line bg-paper-bright p-8 sm:p-12 md:grid-cols-[auto_1fr] md:items-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-mist"><ImageOff className="size-7 text-teal-strong" strokeWidth={1.4} aria-hidden /></span>
        <div>
          <h3 className="font-display text-3xl font-black tracking-tight">Our photographs are on their way.</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate">Approved photos from Bond Safari sessions and locations will appear here. We only publish guest photos with permission.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#feedback" className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}>Share your experience</a>
            <button type="button" onClick={() => setPreview(true)} className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-5 text-sm font-semibold transition hover:border-ink ${focusRing}`}><LayoutGrid className="size-4" aria-hidden />Preview the gallery layout</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {preview && !GALLERY_ITEMS.length && (
        <p className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-sand-soft px-4 py-3 text-xs font-semibold text-sand-ink" role="status">
          Layout preview: these tiles show how the gallery will look. They are not photographs.
          <button type="button" onClick={() => { setPreview(false); setFilter('all') }} className={`min-h-9 rounded-full bg-ink px-3 text-white ${focusRing}`}>Hide preview</button>
        </p>
      )}

      {/* The scroller clips anything drawn outside the pills, so borders sit inside them and the
          vertical padding leaves room for the focus outline. */}
      <div className="-mx-5 -my-1 overflow-x-auto px-5 py-1 [scrollbar-width:none] sm:-mx-1 sm:px-1">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap" role="group" aria-label="Filter photos">
          {[{ id: 'all' as const, label: 'All photos' }, ...categories].map((c) => (
            <button key={c.id} type="button" onClick={() => setFilter(c.id)} aria-pressed={filter === c.id} className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${filter === c.id ? 'border-ink bg-ink text-white' : 'border-line bg-white text-slate-strong hover:border-ink hover:text-ink'} ${focusRing}`}>{c.label}</button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? 'image' : 'images'}</p>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-3xl bg-white p-8 text-center text-sm text-slate">No images in this category yet.</p>
      ) : (
        <ul className="mt-6 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {shown.map((item, i) => (
            // Keyed by filter too, so switching category replays the staggered rise.
            <li key={`${filter}-${item.id}`} className="mb-3 break-inside-avoid motion-safe:animate-[gallery-tile-in_0.8s_var(--ease-expo)_backwards] sm:mb-4" style={{ animationDelay: `${Math.min(i, 11) * 60}ms` }}>
              <button
                type="button"
                onClick={(e) => { triggerRef.current = e.currentTarget; setOpen(i) }}
                className={`group block w-full rounded-2xl text-left sm:rounded-3xl ${focusRing}`}
                aria-label={`Open image: ${item.caption}`}
              >
                <span className="relative block overflow-hidden rounded-2xl sm:rounded-3xl" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
                  <span className="block size-full transition duration-500 group-hover:scale-[1.03]"><Tile item={item} /></span>
                  {/* Overlaid caption only where tiles are large enough to hold it; phones show the photo alone,
                      and the caption appears in the lightbox (and in the button's accessible name). */}
                  <span className="absolute inset-x-0 bottom-0 hidden bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_90%,transparent),transparent)] p-4 pt-10 text-white sm:block">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-teal-pale">{categoryLabel(item.category)}</span>
                    <span className="mt-1 block font-display text-base font-bold leading-snug">{item.caption}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open !== null && shown[open] && <Lightbox items={shown} index={open} onIndex={setOpen} onClose={close} />}
    </div>
  )
}
