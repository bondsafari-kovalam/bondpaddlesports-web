'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Compass,
  Dumbbell,
  Leaf,
  Mountain,
  Sparkles,
  Star,
  Waves,
} from 'lucide-react'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

const locations = [
  {
    name: 'Muziris–Kottapuram',
    meta: 'Backwaters · North Paravur',
    price: 'From ₹1,200',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',
    status: 'Operating now',
  },
  {
    name: 'Muziris–North Paravur',
    meta: 'Thattukadavu Jetty · Backwaters',
    price: 'From ₹1,200',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    status: 'Operating now',
  },
  {
    name: 'Kovalam',
    meta: 'Sea · South Kerala',
    price: 'Opening January 2027',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=85',
    status: 'Coming soon',
  },
]

const experiences = [
  { icon: Waves, slug: 'kayaking', title: 'Kayaking', text: 'Glide through quiet waters, hidden channels and living landscapes.' },
  { icon: Mountain, slug: 'canoeing', title: 'Canoeing', text: 'Find your rhythm on the water with a craft built for shared adventure.' },
  { icon: Compass, slug: 'stand-up-paddleboarding', title: 'Stand-up paddleboarding', text: 'A fresh perspective, a full-body workout and a slower way to explore.' },
]

export default function Page() {
  const [selectedActivity, setSelectedActivity] = useState('Any activity')
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f3ec] text-[#06263b]">
      <SiteHeader bookHref="#book" />

      <section className="relative flex min-h-[700px] items-end bg-[#06263b] pb-16 pt-40 text-white lg:min-h-[780px] lg:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,38,59,.88)_0%,rgba(6,38,59,.55)_45%,rgba(6,38,59,.12)_100%)]" />
        <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2200&q=90" alt="Paddler exploring calm tropical water" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,38,59,.88),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> Kerala, from the water</p>
            <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl lg:text-[92px]">Find your<br /><span className="text-[#f5b82e]">wild water.</span></h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg">Guided paddles, peaceful backwaters and a new way to experience Kerala—one stroke at a time.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#book" className="rounded-full bg-[#f5b82e] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white">Book an experience <ArrowRight className="ml-2 inline size-4" /></a><a href="#locations" className="rounded-full border border-white/40 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10">Explore locations</a></div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-xs text-white/60 lg:flex"><span className="h-px w-12 bg-white/40" /> Scroll to explore</div>
      </section>

      <section id="book" className="relative z-10 mx-auto -mt-8 max-w-6xl px-5 lg:-mt-14">
        <div className="rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(6,38,59,.16)] sm:p-7">
          <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f0783e]">Plan your paddle</p><h2 className="mt-2 font-display text-2xl font-bold">Where will you go?</h2></div><CalendarDays className="size-7 text-[#00a9c3]" /></div>
          <div className="grid gap-3 md:grid-cols-4">
            <label className="rounded-2xl border border-[#dfe6e5] bg-[#f8faf8] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#57717b]">Location<select className="mt-2 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-[#06263b] outline-none"><option>Muziris–Kottapuram</option><option>Muziris–North Paravur</option><option>Kovalam — coming soon</option></select></label>
            <label className="rounded-2xl border border-[#dfe6e5] bg-[#f8faf8] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#57717b]">Activity<select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)} className="mt-2 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-[#06263b] outline-none"><option>Any activity</option><option>Kayaking</option><option>Canoeing</option><option>Stand-up paddleboarding</option></select></label>
            <label className="rounded-2xl border border-[#dfe6e5] bg-[#f8faf8] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#57717b]">Date<input type="date" className="mt-2 block w-full bg-transparent text-sm font-semibold normal-case tracking-normal text-[#06263b] outline-none" /></label>
            <button onClick={() => setSubmitted(true)} className="rounded-2xl bg-[#06263b] px-5 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#0b3850]">{submitted ? 'Request received' : 'Find sessions'} <ArrowRight className="ml-2 inline size-4" /></button>
          </div>
          <p className="mt-4 text-xs text-[#71848b]">Live availability and payment will appear here once the booking engine is connected. This preview uses demonstration data.</p>
        </div>
      </section>

      <section id="locations" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f0783e]">Go somewhere good</p><h2 className="mt-3 max-w-xl font-display text-4xl font-black tracking-tight sm:text-5xl">Water has a way<br />of changing everything.</h2></div><a href="#locations" className="text-sm font-bold text-[#0b91aa]">View all locations <ArrowRight className="ml-1 inline size-4" /></a></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{locations.map((location) => <article key={location.name} className="group overflow-hidden rounded-3xl bg-white shadow-sm"><div className="relative h-72 overflow-hidden"><img src={location.image} alt="Scenic water landscape" className="size-full object-cover transition duration-700 group-hover:scale-105" /><span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${location.status === 'Operating now' ? 'bg-[#d9f7ed] text-[#14785a]' : 'bg-white/90 text-[#57717b]'}`}>{location.status}</span></div><div className="p-5"><h3 className="font-display text-xl font-bold">{location.name}</h3><p className="mt-1 text-sm text-[#71848b]">{location.meta}</p><div className="mt-6 flex items-center justify-between"><span className="text-sm font-bold text-[#f0783e]">{location.price}</span><button className="flex items-center gap-1 text-sm font-bold text-[#06263b]">{location.status === 'Operating now' ? 'Book now' : 'Notify me'} <ArrowRight className="size-4" /></button></div></div></article>)}</div>
      </section>

      <section id="activities" className="bg-[#06263b] px-5 py-24 text-white lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fe8f4]">Choose your rhythm</p><h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">Good days are<br /><span className="text-[#f5b82e]">made on the water.</span></h2></div><div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/15 md:grid-cols-3">{experiences.map(({ icon: Icon, slug, title, text }) => <article key={title} className="bg-[#0b3850] p-8 transition hover:bg-[#104963]"><Icon className="size-9 text-[#00c8e8]" strokeWidth={1.4} /><h3 className="mt-16 font-display text-2xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{text}</p><a href={`/activities/${slug}`} className="mt-7 inline-flex items-center text-sm font-bold text-[#f5b82e]">Explore {title} <ArrowRight className="ml-2 size-4" /></a></article>)}</div></div></section>

      <section id="academy" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-32"><div className="relative overflow-hidden rounded-3xl bg-[#0b3850] p-8 text-white sm:p-12"><div className="absolute -right-16 -top-16 size-56 rounded-full border-[24px] border-[#00c8e8]/15" /><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fe8f4]">Bond Safari Academy</p><h2 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl">From first<br />stroke to<br /><span className="text-[#f5b82e]">future guide.</span></h2><p className="mt-6 max-w-sm text-sm leading-6 text-white/70">Build confidence, learn safely and discover a pathway into paddlesport leadership.</p><a href="/academy" className="mt-8 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#06263b]">Explore the Academy <ArrowRight className="ml-2 size-4" /></a></div><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f0783e]">Learn with purpose</p><h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Try. Learn.<br />Qualify. Lead.</h2><p className="mt-6 max-w-lg text-base leading-7 text-[#57717b]">A clear qualification pathway for curious beginners, aspiring guides and professional paddlesport learners.</p><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">{['Try', 'Learn', 'Qualify', 'Lead', 'Coach', 'Tutor'].map((step, i) => <div key={step} className="rounded-2xl border border-[#dfe6e5] bg-white p-4"><span className="text-xs font-bold text-[#00a9c3]">0{i + 1}</span><p className="mt-6 font-display text-lg font-bold">{step}</p></div>)}</div><p className="mt-6 text-xs text-[#71848b]">Paddle UK courses from 2027, subject to approval.</p></div></section>

      <section id="membership" className="bg-[#eef2ed] px-5 py-24 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f0783e]">Stay in the flow</p><h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">More water.<br />More reasons to return.</h2></div><a href="/membership" className="text-sm font-bold text-[#0b91aa]">Compare membership <ArrowRight className="ml-1 inline size-4" /></a></div><div className="mt-12 grid gap-4 lg:grid-cols-3"><div className="rounded-3xl bg-[#06263b] p-7 text-white"><Sparkles className="size-7 text-[#f5b82e]" /><h3 className="mt-12 font-display text-2xl font-bold">Bond Safari Club</h3><p className="mt-2 text-sm text-white/65">Free membership across the Bond Group.</p><p className="mt-8 text-3xl font-black">Free</p></div><div className="rounded-3xl bg-[#f5b82e] p-7 text-[#06263b]"><Star className="size-7" /><h3 className="mt-12 font-display text-2xl font-bold">Bond Blue</h3><p className="mt-2 text-sm text-[#06263b]/65">15% off, double Pearls and more.</p><p className="mt-8 text-3xl font-black">From ₹999 <span className="text-sm font-semibold">/ year</span></p></div><div className="rounded-3xl bg-white p-7"><Waves className="size-7 text-[#00a9c3]" /><h3 className="mt-12 font-display text-2xl font-bold">Paddle Season Pass</h3><p className="mt-2 text-sm text-[#57717b]">Make paddling part of your season.</p><p className="mt-8 text-sm font-bold text-[#0b91aa]">Launching with live schedules <ArrowRight className="ml-1 inline size-4" /></p></div></div></div></section>

      <section id="groups-corporate" className="relative overflow-hidden bg-[#f0783e] px-5 py-20 text-[#06263b] lg:px-8"><div className="absolute -right-20 -top-28 size-96 rounded-full border-[52px] border-white/10" /><div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#06263b]/60">For groups, schools & teams</p><h2 className="mt-3 max-w-2xl font-display text-4xl font-black sm:text-5xl">Take the whole team<br />somewhere different.</h2></div><a href="/groups-corporate" className="inline-flex w-fit items-center rounded-full bg-[#06263b] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.1em] text-white">Start an enquiry <ArrowRight className="ml-2 size-4" /></a></div></section>

      <SiteFooter />
      <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 rounded-2xl border border-white/30 bg-[#06263b]/95 p-2 shadow-xl backdrop-blur-md sm:hidden"><a href="#book" className="flex flex-1 items-center justify-center rounded-xl bg-[#f5b82e] py-3 text-xs font-extrabold uppercase text-[#06263b]">Book now</a><a href="#locations" className="flex flex-1 items-center justify-center rounded-xl bg-white/10 py-3 text-xs font-extrabold uppercase text-white">Locations</a><a href="#contact" className="flex flex-1 items-center justify-center rounded-xl bg-white/10 py-3 text-xs font-extrabold uppercase text-white">WhatsApp</a></div>
    </main>
  )
}
