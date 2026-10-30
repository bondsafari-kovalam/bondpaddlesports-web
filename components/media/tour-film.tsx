'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Clock, Loader2, MapPin, Play, RotateCcw, X } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { SmartImage } from '@/components/site/smart-image'
import type { TourFilm } from '@/lib/muziris-films'

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

/** Data saver or a 2G/3G connection starts on the lighter encode. */
function prefersLowData() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  return !!connection && (connection.saveData === true || ['slow-2g', '2g', '3g'].includes(connection.effectiveType ?? ''))
}

/**
 * The player: a native modal dialog (focus trap, Esc to close) around the browser's own video
 * controls, so play/pause, volume, seeking and fullscreen work by keyboard and touch everywhere.
 * Nothing is fetched until it opens. If the 720p encode fails it falls back to 480p once, then
 * shows a retry.
 */
function TourFilmPlayer({ film, locationLink, onClose }: { film: TourFilm; locationLink: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [src, setSrc] = useState(() => (prefersLowData() ? film.lowSrc : film.src))
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    ref.current?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  const onError = () => {
    if (src !== film.lowSrc) { setSrc(film.lowSrc); setState('loading') } else setState('error')
  }
  const retry = () => { setSrc(film.src); setAttempt((n) => n + 1); setState('loading') }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) ref.current?.close() }}
      aria-labelledby={`${film.id}-title`}
      className="m-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-ink-deep/90 backdrop:backdrop-blur-sm lg:h-fit lg:w-fit"
    >
      <div className="flex h-full flex-col justify-center gap-4 p-4 lg:flex-row lg:items-end lg:gap-8 lg:p-0">
        <div className="mx-auto flex w-[min(100%,calc(74dvh*9/16))] items-center justify-between lg:hidden">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Muziris · {film.district}</p>
          <CloseButton onClick={() => ref.current?.close()} />
        </div>

        <div className="relative mx-auto aspect-9/16 w-[min(100%,calc(74dvh*9/16))] shrink-0 overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10 lg:w-[min(calc(86vh*9/16),484px)] lg:rounded-3xl">
          {state === 'error' ? (
            <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_30%_20%,var(--color-ink-muted),var(--color-ink)_70%)] p-8 text-center">
              <p className="font-display text-lg font-bold">This video couldn’t load.</p>
              <p className="text-sm text-white/70">Check your connection and try again.</p>
              <button type="button" onClick={retry} className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-sand px-5 text-sm font-semibold text-ink transition hover:bg-white ${focusRing}`}><RotateCcw className="size-4" aria-hidden />Try again</button>
            </div>
          ) : (
            <video
              key={`${src}#${attempt}`}
              src={src}
              poster={film.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              aria-label={film.title}
              onCanPlay={() => setState('ready')}
              onPlaying={() => setState('ready')}
              onWaiting={() => setState('loading')}
              onError={onError}
              className="size-full object-cover"
            />
          )}
          {state === 'loading' && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <span className="flex size-16 items-center justify-center rounded-full bg-ink/60 backdrop-blur"><Loader2 className="size-7 animate-spin text-white" /></span>
            </span>
          )}
          <span className="sr-only" aria-live="polite">{state === 'loading' ? 'Loading video' : ''}</span>
        </div>

        <div className="mx-auto w-[min(100%,calc(74dvh*9/16))] lg:mx-0 lg:w-80 lg:pb-2">
          <div className="hidden justify-end lg:flex"><CloseButton onClick={() => ref.current?.close()} /></div>
          <p className="hidden text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale lg:mt-10 lg:block">Muziris · {film.district}</p>
          <h2 id={`${film.id}-title`} className="font-display text-xl font-black leading-tight tracking-tight lg:mt-3 lg:text-2xl">{film.title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/70 lg:mt-4">{film.description}</p>
          {locationLink && (
            <a href={`/locations/${film.locationSlug}`} className={`mt-4 inline-flex min-h-11 items-center gap-2 border-b border-white/30 text-sm font-semibold transition hover:border-sand hover:text-sand lg:mt-6 ${focusRing}`}>Visit {film.place} <ArrowRight className="size-4" aria-hidden /></a>
          )}
        </div>
      </div>
    </dialog>
  )
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} autoFocus className={`flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 ${focusRing}`} aria-label="Close video"><X className="size-5" /></button>
}

/**
 * A 16:9 thumbnail (a frame from the film) that opens the player. Only the thumbnail loads with
 * the page; the film itself is requested when someone presses play.
 */
export function TourFilmThumb({ film, sizes, locationLink = true, className = '' }: { film: TourFilm; sizes: string; locationLink?: boolean; className?: string }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Play video: ${film.title} (${film.duration})`}
        className={`group/film relative block aspect-video w-full overflow-hidden rounded-3xl bg-ink text-left text-white ${focusRing} ${className}`}
      >
        <SmartImage src={film.thumb} alt="" fill sizes={sizes} className="object-cover transition duration-1000 ease-out group-hover/film:scale-105 motion-reduce:transition-none" />
        <span className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_75%,transparent),transparent_50%)] transition-opacity duration-500 group-hover/film:opacity-80" aria-hidden />
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <span className="flex size-16 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/50 backdrop-blur-md transition duration-500 group-hover/film:scale-110 group-hover/film:bg-sand group-hover/film:ring-sand group-focus-visible/film:bg-sand sm:size-20">
            <Play className="ml-1 size-6 fill-white text-white transition-colors duration-500 group-hover/film:fill-ink group-hover/film:text-ink group-focus-visible/film:fill-ink group-focus-visible/film:text-ink sm:size-7" />
          </span>
        </span>
        <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 text-xs font-semibold sm:inset-x-5 sm:bottom-5" aria-hidden>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/55 px-3 py-1.5 backdrop-blur"><MapPin className="size-3.5" />{film.place} · {film.district}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/55 px-3 py-1.5 backdrop-blur"><Clock className="size-3.5" />{film.duration}</span>
        </span>
      </button>
      {open && <TourFilmPlayer film={film} locationLink={locationLink} onClose={() => { setOpen(false); triggerRef.current?.focus() }} />}
    </>
  )
}
