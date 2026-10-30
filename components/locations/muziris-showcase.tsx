import { TourFilmThumb } from '@/components/media/tour-film'
import { Reveal, RevealLines } from '@/components/motion/reveal'
import { MUZIRIS_FILMS } from '@/lib/muziris-films'

/** The two Muziris boat tour films, side by side on desktop and stacked on phones. */
export function MuzirisShowcase() {
  return (
    <section id="muziris-films" aria-labelledby="muziris-films-title" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="max-w-2xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Watch · Muziris heritage boat tours</p>
        <h2 id="muziris-films-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Discover the<br />Muziris Experience</RevealLines></h2>
        <p className="mt-5 text-base leading-7 text-slate-strong sm:text-lg">Explore our heritage boat tour experiences across the historic Muziris region.</p>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6 lg:gap-8">
        {MUZIRIS_FILMS.map((film, i) => (
          <Reveal as="article" key={film.id} delay={i * 0.1}>
            <TourFilmThumb film={film} sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" className="shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--color-ink)_45%,transparent)]" />
            <div className="mt-5 px-1">
              <p className="text-xs font-bold uppercase tracking-wider text-teal-strong">{film.place} · {film.district} district</p>
              <h3 className="mt-2 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">{film.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate">{film.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
