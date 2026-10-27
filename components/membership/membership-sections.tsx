import type { ReactNode } from 'react'
import { ArrowRight, Calendar, Check, ChevronDown, CircleDollarSign, Compass, CreditCard, Gem, IdCard, Minus, ShieldCheck, Sparkles, UserPlus, Users, Waves } from 'lucide-react'
import { BondBluePicker } from '@/components/membership/bond-blue-picker'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { BOND_PHOTOS } from '@/lib/gallery'
import { BOND_BLUE_OPTIONS, COMPARISON, PEARL_RULES, PLANS, SEASON_PASS, TIERS, formatRupee, type Plan } from '@/lib/membership'
import { ROUTES } from '@/lib/site'
import { ParallaxImage, Reveal, RevealGroup, RevealLines } from '@/components/motion/reveal'
import { HeroBackdrop } from '@/components/site/hero-backdrop'
import { SectionNav } from '@/components/site/section-nav'
import { HERO_IMAGES } from '@/lib/hero-images'

const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-7 text-sm font-semibold text-ink transition hover:bg-white ${focusRing}`
const ghostDark = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink ${focusRing}`

/** Concentric "ripple" rings used as the page's water motif. */
export function Ripples({ className = '', tone = 'cyan' }: { className?: string; tone?: 'cyan' | 'gold' }) {
  const stroke = tone === 'cyan' ? 'var(--color-teal-bright)' : 'var(--color-sand)'
  return (
    <svg viewBox="0 0 400 400" className={`pointer-events-none ${className}`} aria-hidden>
      {[60, 110, 160, 210].map((r, i) => <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={stroke} strokeOpacity={0.22 - i * 0.045} strokeWidth={i === 0 ? 2 : 1.5} />)}
    </svg>
  )
}

/** "Join" actions register interest until sign-up and payment are connected; nothing is activated. */
function JoinButton({ plan, variant = 'solid', label, className = '' }: { plan: Plan['id']; variant?: 'solid' | 'outline' | 'onDark'; label?: string; className?: string }) {
  const names = { club: 'Bond Safari Club', 'bond-blue': 'Bond Blue', 'season-pass': 'the Paddle Season Pass' }
  const titles = { club: 'Join Bond Safari Club', 'bond-blue': 'Join Bond Blue', 'season-pass': 'Paddle Season Pass' }
  return <NotifyMeButton name={names[plan]} slug={`membership-${plan}`} event="opens for sign-up" title={titles[plan]} label={label ?? PLANS.find((p) => p.id === plan)!.cta} variant={variant} className={`min-h-12 ${className}`} />
}

const lowestBlue = Math.min(...BOND_BLUE_OPTIONS.map((option) => option.price))

export function MembershipHero() {
  const glance = [
    { href: '#club', name: 'Bond Safari Club', price: 'Free' },
    { href: '#bond-blue', name: 'Bond Blue', price: `From ${formatRupee(lowestBlue)}/yr` },
    { href: '#season-pass', name: 'Paddle Season Pass', price: `${formatRupee(SEASON_PASS.price)}/season` },
  ]
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
      <HeroBackdrop src={HERO_IMAGES.membership} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-pale"><span className="h-px w-10 bg-sand" /> Bond Safari Membership</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl"><RevealLines>More time on the water.<br /><span className="text-sand">More ways to belong.</span></RevealLines></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Join the Bond Safari community, earn rewards, unlock member benefits and make every adventure count.</p>
        </div>
        <Reveal delay={0.4} className="mt-12 grid border-t border-white/15 sm:grid-cols-3">
          {glance.map(({ href, name, price }) => (
            <a key={href} href={href} className={`group flex items-center justify-between gap-4 border-b border-white/15 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 ${focusRing}`}>
              <span><span className="block text-sm text-white/70">{name}</span><span className="mt-1 block font-display text-2xl font-bold">{price}</span></span>
              <ArrowRight className="size-5 shrink-0 text-sand transition group-hover:translate-x-1" aria-hidden />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

const NAV = [
  { id: 'plans', label: 'Plans' },
  { id: 'compare', label: 'Compare' },
  { id: 'pearls', label: 'Pearls' },
  { id: 'tiers', label: 'Tiers' },
  { id: 'join', label: 'How to join' },
  { id: 'faq', label: 'FAQs' },
]

export function MembershipNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5 lg:px-8">
        <SectionNav sections={NAV} label="Membership sections" layoutId="membership-nav-pill" />
        <div className="hidden shrink-0 lg:block"><JoinButton plan="club" label="Join free" className="min-h-11!" /></div>
      </div>
    </div>
  )
}

function Benefit({ children, tone }: { children: ReactNode; tone: 'light' | 'dark' }) {
  return <li className="flex gap-3 text-sm leading-6"><Check className={`mt-0.5 size-4 shrink-0 ${tone === 'dark' ? 'text-sand' : 'text-success'}`} aria-hidden /><span>{children}</span></li>
}

export function PlanCards() {
  const [club, blue, pass] = PLANS
  return (
    <section id="plans" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="plans-title">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Choose your membership</Eyebrow>
          <h2 id="plans-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Three ways to paddle more.</RevealLines></h2>
        </div>
        <a href="#compare" className="inline-flex w-fit items-center gap-1.5 border-b border-ink/25 pb-1 text-sm font-semibold transition hover:border-ink">Compare every benefit <ArrowRight className="size-4" aria-hidden /></a>
      </div>

      <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        <article id="club" className="flex scroll-mt-20 flex-col rounded-3xl border border-line bg-paper-bright p-7 sm:p-8">
          <Users className="size-7 text-teal-strong" strokeWidth={1.4} aria-hidden />
          <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{club.name}</h3>
          <p className="mt-1 text-sm text-slate">{club.tagline}</p>
          <p className="mt-6 font-display text-5xl font-black">Free</p>
          <p className="mt-4 text-sm leading-6 text-slate-strong">{club.description}</p>
          <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6 text-ink">{club.benefits.map((b) => <Benefit key={b} tone="light">{b}</Benefit>)}</ul>
          <JoinButton plan="club" variant="outline" className="mt-8 w-full" />
        </article>

        <article id="bond-blue" className="flex scroll-mt-20 flex-col rounded-3xl bg-ink p-7 text-white sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <Waves className="size-7 text-sand" strokeWidth={1.4} aria-hidden />
            <span className="rounded-full bg-sand px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-ink">Annual membership</span>
          </div>
          <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{blue.name}</h3>
          <p className="mt-1 text-sm text-white/70">{blue.tagline}</p>
          <BondBluePicker />
          <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">{blue.benefits.map((b) => <Benefit key={b} tone="dark">{b}</Benefit>)}</ul>
          <JoinButton plan="bond-blue" label="Join Bond Blue" variant="solid" className="mt-8 w-full" />
        </article>

        <article id="season-pass" className="flex scroll-mt-20 flex-col rounded-3xl border border-line bg-paper-bright p-7 sm:p-8">
          <Calendar className="size-7 text-teal-strong" strokeWidth={1.4} aria-hidden />
          <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{pass.name}</h3>
          <p className="mt-1 text-sm text-slate">{pass.tagline}</p>
          <p className="mt-6"><span className="font-display text-5xl font-black">{formatRupee(SEASON_PASS.price)}</span><span className="text-sm text-slate"> /season</span></p>
          <p className="mt-1 text-sm font-semibold text-teal-strong">Season: {SEASON_PASS.season}</p>
          {SEASON_PASS.earlyBirdEnabled && <p className="mt-3 rounded-xl bg-sand-soft p-3 text-sm font-bold text-sand-ink">Early-bird: {formatRupee(SEASON_PASS.earlyBird.price)} when bought {SEASON_PASS.earlyBird.window}</p>}
          <p className="mt-4 text-sm leading-6 text-slate-strong">{pass.description}</p>
          <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6 text-ink">{pass.benefits.map((b) => <Benefit key={b} tone="light">{b}</Benefit>)}</ul>
          <JoinButton plan="season-pass" variant="outline" className="mt-8 w-full" />
        </article>
      </RevealGroup>
      <p className="mt-6 text-xs leading-5 text-slate">Membership sign-up and payment aren’t live yet. “Join” buttons let you register interest; we’ll tell you when sign-up opens. Benefits are subject to the membership terms.</p>
    </section>
  )
}

const columnNames = PLANS.map((p) => p.name)

function Cell({ value }: { value: string }) {
  if (value === 'Yes') return <span className="inline-flex items-center gap-1.5 font-semibold text-success"><Check className="size-4" aria-hidden />Yes</span>
  if (value === 'No' || value === 'Not applicable') return <span className="inline-flex items-center gap-1.5 text-slate"><Minus className="size-4" aria-hidden />{value}</span>
  return <span>{value}</span>
}

export function ComparisonTable() {
  return (
    <section id="compare" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="compare-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Compare</Eyebrow>
        <h2 id="compare-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Find your fit.</RevealLines></h2>

        <div className="mt-12 hidden md:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Membership benefits compared</caption>
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="w-1/4 py-4 pr-6 text-xs font-semibold uppercase tracking-wider text-slate">Benefit</th>
                {columnNames.map((name, i) => <th key={name} scope="col" className={`px-6 py-4 font-display text-lg font-bold ${i === 1 ? 'rounded-t-2xl bg-mist' : ''}`}>{name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {COMPARISON.map((row) => (
                <tr key={row.benefit} className="transition-colors hover:bg-paper-bright">
                  <th scope="row" className="py-4 pr-6 font-semibold">{row.benefit}</th>
                  {row.values.map((value, i) => <td key={i} className={`px-6 py-4 ${i === 1 ? 'bg-mist/60' : ''}`}><Cell value={value} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <RevealGroup className="mt-10 grid gap-4 md:hidden">{columnNames.map((name, col) => (
            <section key={name} aria-label={name} className={`rounded-3xl p-5 ${col === 1 ? 'bg-ink text-white' : 'border border-line bg-paper-bright'}`}>
              <h3 className="font-display text-xl font-bold">{name}</h3>
              <dl className={`mt-3 divide-y text-sm ${col === 1 ? 'divide-white/10' : 'divide-line'}`}>
                {COMPARISON.map((row) => <div key={row.benefit} className="flex justify-between gap-4 py-2.5"><dt className={col === 1 ? 'text-white/70' : 'text-slate'}>{row.benefit}</dt><dd className="text-right font-semibold">{row.values[col]}</dd></div>)}
              </dl>
            </section>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export function PearlsSection() {
  const steps = [
    { icon: Compass, title: 'Book an adventure', text: 'Paddle, learn or shop with participating Bond businesses.' },
    { icon: Gem, title: 'Earn Pearls', text: 'Collect Pearls on eligible purchases.' },
    { icon: Sparkles, title: 'Save on your next experience', text: 'Redeem Pearls for eligible discounts.' },
  ]
  return (
    <section id="pearls" className="scroll-mt-16 bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="pearls-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="cyan">Bond Safari Pearls</Eyebrow>
            <h2 id="pearls-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Every adventure brings you<br /><span className="text-sand">closer to the next.</span></RevealLines></h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">Earn Pearls on eligible purchases and use them to save on future experiences with participating Bond businesses.</p>
          </div>
          <div className="border-l-2 border-sand pl-6">
            <p className="font-display text-5xl font-black">1 Pearl = ₹1</p>
            <p className="mt-2 text-sm text-white/70">discount when redeemed under the programme rules</p>
          </div>
        </div>

        <RevealGroup as="ol" className="mt-16 grid border-t border-white/15 md:grid-cols-3">{steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <div className="flex items-center justify-between"><Icon className="size-7 text-sand" strokeWidth={1.3} aria-hidden /><span className="text-xs font-semibold tracking-[0.3em] text-white/50">0{i + 1}</span></div>
              <h3 className="mt-8 font-display text-2xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
            </li>
          ))}
        </RevealGroup>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h3 className="font-display text-lg font-bold">The rules</h3>
            <RevealGroup as="ul" className="mt-4 grid gap-2.5 sm:grid-cols-2">{PEARL_RULES.map((rule) => <li key={rule} className="flex gap-3 text-sm leading-6 text-white/80"><CircleDollarSign className="mt-0.5 size-4 shrink-0 text-teal-pale" aria-hidden />{rule}</li>)}</RevealGroup>
          </div>
          <a href="#tiers" className={gold}>Discover your rewards <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

export function TierProgression() {
  return (
    <section id="tiers" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="tiers-title">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Eyebrow>Club tiers</Eyebrow>
          <h2 id="tiers-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Go deeper with every paddle.</RevealLines></h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate">Bond Safari Club has four tiers. How you move between them is set by the loyalty programme rules, which will be published here.</p>
      </div>
      <RevealGroup as="ol" className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-4">{TIERS.map((tier, i) => (
          <li key={tier.name} className="flex flex-col bg-paper-bright p-7">
            <div className="flex gap-1" aria-hidden>{TIERS.map((_, step) => <span key={step} className={`h-1 flex-1 rounded-full ${step <= i ? 'bg-sand' : 'bg-line'}`} />)}</div>
            <span className="mt-6 text-xs font-semibold tracking-[0.3em] text-slate-light">TIER {i + 1}</span>
            <h3 className="mt-2 font-display text-3xl font-black tracking-tight">{tier.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-strong">{tier.description}</p>
            <p className="mt-6 text-xs text-slate">{tier.threshold ?? 'Criteria set by the programme rules'}</p>
          </li>
        ))}
      </RevealGroup>
    </section>
  )
}

export function DashboardPreview() {
  const rows: [typeof IdCard, string, string][] = [
    [IdCard, 'Member ID', 'BS-0000-0000'],
    [Gem, 'Pearl balance', '— Pearls'],
    [Calendar, 'Renews on', 'DD Month YYYY'],
    [Waves, 'Free paddle hour', 'This month’s credit (Bond Blue)'],
    [ShieldCheck, 'Season Pass', 'Status shown for pass holders'],
  ]
  return (
    <section className="border-t border-line bg-paper-bright px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="dashboard-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>Your member account</Eyebrow>
          <h2 id="dashboard-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Everything in one place.</RevealLines></h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-strong">Your member ID, Pearls, renewal date, free paddle hour and Season Pass status, in your Bond account. Member accounts will open once sign-up goes live.</p>
        </div>
        <Reveal className="relative">
          <span className="absolute -top-3 left-6 z-10 rounded-full bg-sand px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-ink">Preview · sample data</span>
          <div className="overflow-hidden rounded-3xl border border-line bg-white" aria-label="Sample member dashboard (not real data)">
            <div className="bg-ink p-6 text-white">
              <p className="text-xs text-white/60">Member</p>
              <p className="font-display text-2xl font-bold">Your name</p>
              <span className="mt-3 inline-flex rounded-full bg-sand px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-ink">Bond Blue · Individual</span>
            </div>
            <dl className="grid gap-px bg-line sm:grid-cols-2">
              {rows.map(([Icon, label, value]) => (
                <div key={label} className="flex gap-3 bg-white p-4 sm:last:col-span-2">
                  <Icon className="mt-0.5 size-5 shrink-0 text-teal-strong" aria-hidden />
                  <div><dt className="text-xs text-slate">{label}</dt><dd className="mt-0.5 text-sm font-semibold">{value}</dd></div>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-2 border-t border-line p-4">
              <a href="#pearls" className={`inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-semibold text-white ${focusRing}`}>View my Pearls</a>
              <a href="#faq-manage" className={`inline-flex min-h-11 items-center rounded-full border border-ink/20 px-4 text-sm font-semibold ${focusRing}`}>Manage membership</a>
              <a href={ROUTES.locations} className={`inline-flex min-h-11 items-center rounded-full border border-ink/20 px-4 text-sm font-semibold ${focusRing}`}>Book a paddle</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function FamilySection() {
  const family = BOND_BLUE_OPTIONS.find((o) => o.id === 'family')!
  return (
    <section id="family" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="family-title">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="relative">
          <ParallaxImage src={BOND_PHOTOS.sharingATandem.src} alt={BOND_PHOTOS.sharingATandem.alt} className="aspect-[3/2] rounded-3xl" strength={5} />
        </div>
        <div>
          <Eyebrow>Family & community</Eyebrow>
          <h2 id="family-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Bring your people.<br />Share the adventure.</RevealLines></h2>
          <p className="mt-5 text-base leading-7 text-slate-strong">Paddling is better together. Bond Blue Family is an annual membership for your household at {formatRupee(family.price)} a year, with Bond Blue member benefits.</p>
          <p className="mt-3 text-sm text-slate">{family.coverage ?? 'Who a family membership covers will be confirmed in the membership terms. Ask us if you’d like the details before you join.'}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#bond-blue" className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink-soft ${focusRing}`}>Explore family membership <ArrowRight className="size-4" aria-hidden /></a>
            <NotifyMeButton name="Bond Blue Family" slug="membership-family" event="details and sign-up are available" title="Family membership" label="Ask about family" className="min-h-12 px-6" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function HowToJoin() {
  const steps = [
    { icon: Compass, title: 'Choose your membership', text: 'Select the free Club, Bond Blue, or the Paddle Season Pass.' },
    { icon: UserPlus, title: 'Create your account', text: 'Sign up with your Bond account. Account creation opens with membership sign-up.' },
    { icon: CreditCard, title: 'Unlock your benefits', text: 'Get your member ID, Pearls and benefits. Paid memberships are activated only after payment is confirmed.' },
  ]
  return (
    <section id="join" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="join-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>How to join</Eyebrow>
        <h2 id="join-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Three steps to the water.</RevealLines></h2>
        <RevealGroup as="ol" className="mt-12 grid border-t border-line md:grid-cols-3">{steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white">{i + 1}</span><Icon className="size-6 text-teal-strong" aria-hidden /></div>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate">{text}</p>
            </li>
          ))}
        </RevealGroup>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <JoinButton plan="club" label="Join Bond Safari Club — free" />
          <p className="text-sm text-slate">Sign-up isn’t live yet; we’ll let you know when it opens.</p>
        </div>
      </div>
    </section>
  )
}

const contact = <a href={`${ROUTES.contact}?type=Membership`} className="font-bold text-teal underline-offset-2 hover:underline">contact us</a>

const faqs: { id?: string; q: string; a: ReactNode }[] = [
  { q: 'What is Bond Safari Club?', a: 'Our free membership. You get a shared member ID across participating Bond businesses, earn Pearls on eligible purchases and redeem them for discounts.' },
  { q: 'What is the difference between Bond Safari Club and Bond Blue?', a: 'Bond Safari Club is free. Bond Blue is a paid annual membership that adds 15% off eligible activities and purchases, double Pearls on eligible transactions, one free paddle hour per month (subject to availability and booking rules) and a digital membership pass.' },
  { q: 'How much does Bond Blue cost?', a: `Individual ${formatRupee(2499)}/year, Family ${formatRupee(5999)}/year, Digital ${formatRupee(999)}/year.` },
  { q: 'What is the Paddle Season Pass?', a: `A ${formatRupee(SEASON_PASS.price)} pass for unlimited paddling at participating operating sites during the ${SEASON_PASS.season} season, with reservations subject to capacity and fair-use rules.` },
  { q: 'How do Bond Safari Pearls work?', a: 'You earn Pearls on eligible purchases. Each Pearl is worth ₹1 of discount when redeemed under the programme rules. Earning rates, expiry and redemption limits are set by the approved programme rules and may vary by business.' },
  { q: 'Can I redeem Pearls for cash?', a: 'No. Pearls are not cash and cannot be exchanged or transferred for cash.' },
  { q: 'Do I need to reserve a session with my Season Pass?', a: 'Yes. Reserve your seat for each session; with the pass the session shows as ₹0. Reservations are subject to capacity and fair-use rules.' },
  { q: 'Can I use my membership at every Bond Safari location?', a: <>Benefits apply at participating Bond Safari locations. <a href={ROUTES.locations} className="font-bold text-teal">See our locations</a>, or {contact} to check a specific site.</> },
  { id: 'faq-manage', q: 'How do I renew or manage my membership?', a: <>You’ll manage and renew your membership from your Bond account once member accounts are live. Until then, please {contact}.</> },
  { q: 'What happens when my membership expires?', a: <>The membership terms will set out what happens at expiry, including to your Pearls. If you have a question now, please {contact}.</> },
]

export function MembershipFAQ() {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-line px-5 py-24 lg:px-8 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Eyebrow>FAQs</Eyebrow>
          <h2 id="faq-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Questions, answered.</RevealLines></h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate">Can’t find what you need? Please {contact}.</p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map(({ id, q, a }) => (
            <details key={q} id={id} className="group scroll-mt-20">
              <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-bold transition hover:text-teal [&::-webkit-details-marker]:hidden ${focusRing}`}>{q}<span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition group-open:rotate-180 group-open:border-ink group-open:bg-ink group-open:text-white"><ChevronDown className="size-4" aria-hidden /></span></summary>
              <div className="pb-6 pr-12 text-sm leading-6 text-slate-strong">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MembershipFinalCTA() {
  return (
    <section className="bg-sand px-5 py-20 text-ink lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">Bond Safari Membership</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-6xl"><RevealLines>Your next adventure<br />starts with membership.</RevealLines></h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <NotifyMeButton name="Bond Safari Club" slug="membership-club" event="opens for sign-up" title="Join Bond Safari Club" label="Join Bond Safari Club — free" className="min-h-12 px-7" variant="ink" />
          <a href="#plans" className={`inline-flex min-h-12 items-center rounded-full border border-ink/30 px-7 text-sm font-semibold transition hover:border-ink ${focusRing}`}>Explore paid memberships</a>
        </div>
      </div>
    </section>
  )
}

export function MembershipMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-30 flex gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href="#plans" className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-sand text-sm font-semibold text-ink">See plans</a>
      <a href={ROUTES.locations} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">Book a paddle</a>
    </div>
  )
}
