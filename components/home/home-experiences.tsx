import { ArrowRight } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { AmbientVideo } from '@/components/motion/ambient-video'
import { Reveal, RevealLines } from '@/components/motion/reveal'
import { activities, activityHref } from '@/lib/activities'

const core = activities.filter((activity) => activity.ambientVideo && ['kayaking', 'canoeing', 'stand-up-paddleboarding'].includes(activity.slug))

/** Three full-height film panels; on desktop the hovered one opens wider and reveals its story. */
export function HomeExperiences() {
  return (
    <section id="activities" className="bg-ink py-24 text-white lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 lg:flex-row lg:items-end lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale">Choose your rhythm</p>
          <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl"><RevealLines>Good days are<br /><span className="text-sand">made on the water.</span></RevealLines></h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-white/60">Three ways onto Kerala’s waterways. Each one moves at its own pace.</p>
      </div>

      <Reveal className="mt-14 flex flex-col gap-1 px-1 lg:h-[min(78vh,760px)] lg:min-h-[560px] lg:flex-row">
        {core.map((activity, i) => (
          <a key={activity.slug} href={activityHref(activity)} className={`group relative block aspect-[4/5] overflow-hidden transition-[flex-grow] duration-1000 sm:aspect-video lg:aspect-auto lg:flex-1 lg:hover:flex-[1.8] lg:focus-visible:flex-[1.8] ${focusRing}`}>
            <AmbientVideo film={activity.ambientVideo!} sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0 size-full transition duration-[1600ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-ink)_92%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_25%,transparent)_45%,transparent_70%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <span className="text-xs font-semibold tracking-[0.3em] text-white/60">0{i + 1}</span>
              <h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{activity.slug === 'stand-up-paddleboarding' ? 'Paddleboarding' : activity.name}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/75 transition duration-700 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">{activity.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-semibold transition group-hover:border-sand group-hover:text-sand">Explore {activity.slug === 'stand-up-paddleboarding' ? 'SUP' : activity.name.toLowerCase()} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></span>
            </div>
          </a>
        ))}
      </Reveal>
    </section>
  )
}
