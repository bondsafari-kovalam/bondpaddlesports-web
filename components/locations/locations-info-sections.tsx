import { ArrowRight, Compass, LifeBuoy, ShieldCheck } from 'lucide-react'
import { Eyebrow } from '@/components/locations/primitives'
import { ROUTES } from '@/lib/site'
import { RevealLines } from '@/components/motion/reveal'

export function LocationsInfoSections() {
  return (
    <>
      <section className="bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="cyan">Kerala by paddle</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Slow down.<br /><span className="text-[#f5b82e]">See more.</span></RevealLines></h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-white/70">A paddle sets the pace of the day. From backwaters to the coast, each Bond Safari location is a different way to meet Kerala’s water—quietly, at your own rhythm, with a guide alongside.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="rounded-3xl bg-white p-8 ring-1 ring-[#06263b]/5 sm:p-10">
          <ShieldCheck className="size-9 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
          <h2 className="mt-10 font-display text-3xl font-black"><RevealLines>Safety & responsible tourism</RevealLines></h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#57717b]">How we look after guests, communities and the waters we paddle on.</p>
          <a href={ROUTES.safety} className="mt-7 inline-flex items-center text-sm font-bold text-[#0b7f95] hover:text-[#06263b]">Read our safety approach <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-[#0b3850] p-8 text-white sm:p-10">
          <div className="absolute -right-16 -top-16 size-56 rounded-full border-[24px] border-[#00c8e8]/15" aria-hidden />
          <LifeBuoy className="relative size-9 text-[#f5b82e]" strokeWidth={1.4} aria-hidden />
          <p className="relative mt-10 text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fe8f4]">Bond Safari Academy</p>
          <h2 className="relative mt-2 font-display text-3xl font-black"><RevealLines>From first stroke to future guide.</RevealLines></h2>
          <a href={ROUTES.academy} className="relative mt-7 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#06263b]">Explore the Academy <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f0783e] px-5 py-20 text-[#06263b] lg:px-8">
        <div className="absolute -right-20 -top-28 size-96 rounded-full border-[52px] border-white/10" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#06263b]/70">Ready when you are</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-black sm:text-5xl"><RevealLines>Your next paddle<br />starts here.</RevealLines></h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#directory" className="inline-flex items-center rounded-full bg-[#06263b] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-white">Book now <ArrowRight className="ml-2 size-4" aria-hidden /></a>
            <a href={ROUTES.activities} className="inline-flex items-center rounded-full border border-[#06263b]/30 px-6 py-4 text-sm font-bold"><Compass className="mr-2 size-4" aria-hidden /> Explore activities</a>
          </div>
        </div>
      </section>
    </>
  )
}
