import { CheckCircle2, MapPin } from 'lucide-react'
import { TourFilmThumb } from '@/components/media/tour-film'
import { formatDate, getLocation } from '@/lib/locations'
import { MUZIRIS_FILMS } from '@/lib/muziris-films'

/**
 * The two Muziris launches as a timeline, one film per operating location, in the order the
 * locations began operating. Dates come from the public location data ("operating since"), not
 * from the films, which carry no dates of their own.
 */
export function MilestoneFilms() {
  const milestones = MUZIRIS_FILMS
    .map((film) => ({ film, location: getLocation(film.locationSlug) }))
    .sort((a, b) => (a.location?.operatingSince ?? '').localeCompare(b.location?.operatingSince ?? ''))

  return (
    <section aria-labelledby="muziris-milestones-title" className="mt-6 rounded-3xl border border-line bg-paper-bright p-6 sm:p-8">
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong"><CheckCircle2 className="size-4" aria-hidden />Operations · Muziris</p>
        <h2 id="muziris-milestones-title" className="mt-2 font-display text-2xl font-black tracking-tight sm:text-3xl">Operational Milestones — Muziris Launches</h2>
        <p className="mt-2 text-sm leading-6 text-slate-strong">Explore the launch milestones of Bond Safari’s two Muziris operating locations.</p>
      </div>

      <ol className="relative mt-8 grid gap-8 md:grid-cols-2 md:gap-6">
        <span className="absolute left-3 top-3 hidden h-px w-[calc(50%+0.75rem)] bg-line md:block" aria-hidden />
        {milestones.map(({ film, location }, i) => (
          <li key={film.id} className="relative flex flex-col">
            <div className="flex items-center gap-3">
              <span className="relative z-10 flex size-6 items-center justify-center rounded-full bg-ink text-[10px] font-black text-sand ring-4 ring-paper-bright">{i + 1}</span>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate">Milestone {String(i + 1).padStart(2, '0')}</p>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-sand-soft px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-sand-ink"><MapPin className="size-3" aria-hidden />{film.district}</span>
            </div>
            <article aria-label={`${location?.name ?? film.place}, ${film.district}`} className="mt-4 flex flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-paper">
              <TourFilmThumb film={film} sizes="(min-width: 1280px) 580px, (min-width: 768px) 46vw, 100vw" className="rounded-none!" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-bold tracking-tight">{location?.name ?? film.place}</h3>
                <p className="mt-1 text-sm font-semibold text-teal-strong">{film.title}</p>
                <p className="mb-5 mt-3 text-sm leading-6 text-slate-strong">{film.milestone}</p>
                <dl className="mt-auto grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-line text-sm [&>div]:bg-paper-bright [&>div]:p-3">
                  <div><dt className="text-[10px] font-bold uppercase tracking-wider text-slate">District</dt><dd className="mt-1 font-semibold">{film.district}</dd></div>
                  <div><dt className="text-[10px] font-bold uppercase tracking-wider text-slate">Location</dt><dd className="mt-1 font-semibold">{film.place}</dd></div>
                  <div><dt className="text-[10px] font-bold uppercase tracking-wider text-slate">Operating since</dt><dd className="mt-1 font-semibold">{location?.operatingSince ? formatDate(location.operatingSince) : 'To be confirmed'}</dd></div>
                </dl>
              </div>
            </article>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs leading-5 text-slate">Films supplied by Bond Safari. “Operating since” dates are from Bond’s published location records.</p>
    </section>
  )
}
