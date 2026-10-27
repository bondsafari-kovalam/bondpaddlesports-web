import { ArrowRight, Compass, LifeBuoy, ShieldCheck } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { Reveal, RevealLines } from '@/components/motion/reveal'
import { ScrollRevealText } from '@/components/motion/scroll-story'
import { ROUTES } from '@/lib/site'

export function LocationsInfoSections() {
  return (
    <>
      <section className="border-t border-line px-5 py-28 lg:px-8 lg:py-40" aria-label="Kerala by paddle">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong">Kerala by paddle</p>
          <ScrollRevealText className="font-display text-3xl font-semibold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl" text="A paddle sets the pace of the day. Each Bond Safari location is a different way to meet Kerala’s water: quietly, at your own rhythm, with a guide alongside." />
        </div>
      </section>

      <div className="px-5 pb-24 lg:px-8 lg:pb-32">
        <section className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl bg-line lg:grid-cols-2">
          <Reveal className="group bg-paper-bright p-8 sm:p-12">
            <ShieldCheck className="size-8 text-teal" strokeWidth={1.4} aria-hidden />
            <h2 className="mt-12 font-display text-3xl font-black tracking-tight">Safety & responsible tourism</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate">How we look after guests, communities and the waters we paddle on.</p>
            <a href={ROUTES.safety} className={`mt-8 inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Read our safety approach <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
          </Reveal>
          <Reveal delay={0.1} className="group bg-ink p-8 text-white sm:p-12">
            <LifeBuoy className="size-8 text-sand" strokeWidth={1.4} aria-hidden />
            <p className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Bond Safari Academy</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight">From first stroke to future guide.</h2>
            <a href={ROUTES.academy} className={`mt-8 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-semibold transition hover:border-sand hover:text-sand ${focusRing}`}>Explore the Academy <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
          </Reveal>
        </section>
      </div>

      <section className="bg-sand px-5 py-20 text-ink lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">Ready when you are</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Your next paddle<br />starts here.</RevealLines></h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#paddling-now" className={`inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}>Book a session <ArrowRight className="size-4" aria-hidden /></a>
            <a href={ROUTES.activities} className={`inline-flex items-center gap-2 rounded-full border border-ink/30 px-7 py-4 text-sm font-semibold transition hover:border-ink ${focusRing}`}><Compass className="size-4" aria-hidden /> Explore activities</a>
          </div>
        </div>
      </section>
    </>
  )
}
