'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Compass, GraduationCap, ImageOff, LayoutGrid, MapPin, Mountain, Users, Waves, X, type LucideIcon } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { Ripples } from '@/components/membership/membership-sections'
import { GALLERY_CATEGORIES, GALLERY_ITEMS, LAYOUT_PREVIEW_ITEMS, type GalleryCategoryId, type GalleryItem } from '@/lib/gallery'
import { locations } from '@/lib/locations'

const icons: Record<GalleryCategoryId, LucideIcon> = { kayaking: Waves, canoeing: Mountain, sup: Compass, locations: MapPin, academy: GraduationCap, groups: Users }
const categoryLabel = (id: GalleryCategoryId) => GALLERY_CATEGORIES.find((c) => c.id === id)?.label ?? id

function Tile({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  if (item.src) return <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading={large ? 'eager' : 'lazy'} decoding="async" className="size-full object-cover" />
  const Icon = icons[item.category]
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#104963,#06263b_70%)]" role="img" aria-label={item.alt}>
      <Ripples className="absolute size-[140%]" />
      <Icon className={`relative text-[#00c8e8] ${large ? 'size-20' : 'size-10'}`} strokeWidth={1} aria-hidden />
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
      className="m-auto h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-[#020d16]/90 sm:h-auto sm:max-h-[92vh] sm:w-[min(92vw,1100px)]"
    >
      <div className="flex h-full flex-col justify-center gap-4 p-4 sm:p-0">
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-semibold" aria-live="polite">{index + 1} / {items.length}</p>
          <button type="button" onClick={() => ref.current?.close()} className={`flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 ${focusRing}`} aria-label="Close gallery" autoFocus><X className="size-5" /></button>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-[#06263b]" style={{ aspectRatio: `${item.width} / ${item.height}`, maxHeight: '70vh', marginInline: 'auto', width: '100%', maxWidth: `calc(70vh * ${item.width / item.height})` }}>
          <Tile item={item} large />
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
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-[#06263b]/15 bg-white px-6 py-16 text-center">
        <ImageOff className="size-10 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-bold">Our photographs are on their way</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#57717b]">Approved photos from Bond Safari sessions and locations will appear here. We only publish guest photos with permission.</p>
        <button type="button" onClick={() => setPreview(true)} className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#06263b]/20 px-5 text-sm font-bold ${focusRing}`}><LayoutGrid className="size-4" aria-hidden />Preview the gallery layout</button>
      </div>
    )
  }

  return (
    <div>
      {preview && !GALLERY_ITEMS.length && (
        <p className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fff1cf] px-4 py-3 text-xs font-semibold text-[#7a4f00]" role="status">
          Layout preview: these tiles show how the gallery will look. They are not photographs.
          <button type="button" onClick={() => { setPreview(false); setFilter('all') }} className={`min-h-9 rounded-full bg-[#06263b] px-3 text-white ${focusRing}`}>Hide preview</button>
        </p>
      )}

      <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap" role="group" aria-label="Filter photos">
          {[{ id: 'all' as const, label: 'All photos' }, ...categories].map((c) => (
            <button key={c.id} type="button" onClick={() => setFilter(c.id)} aria-pressed={filter === c.id} className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-bold transition ${filter === c.id ? 'bg-[#06263b] text-white' : 'bg-white text-[#3d5862] ring-1 ring-[#06263b]/10 hover:ring-[#06263b]'} ${focusRing}`}>{c.label}</button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-[#57717b]" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? 'image' : 'images'}</p>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-3xl bg-white p-8 text-center text-sm text-[#57717b]">No images in this category yet.</p>
      ) : (
        <ul className="mt-6 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {shown.map((item, i) => (
            <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={(e) => { triggerRef.current = e.currentTarget; setOpen(i) }}
                className={`group relative block w-full overflow-hidden rounded-3xl text-left ${focusRing}`}
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
                aria-label={`Open image: ${item.caption}`}
              >
                <span className="block size-full transition duration-500 group-hover:scale-[1.03]"><Tile item={item} /></span>
                <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(6,38,59,.9),transparent)] p-4 pt-10 text-white">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#8fe8f4]">{categoryLabel(item.category)}</span>
                  <span className="mt-1 block font-display text-sm font-bold leading-snug sm:text-base">{item.caption}</span>
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
