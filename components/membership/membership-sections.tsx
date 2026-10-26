import type { ReactNode } from 'react'
import { ArrowRight, Calendar, Check, ChevronDown, CircleDollarSign, Compass, CreditCard, Gem, IdCard, Minus, ShieldCheck, Sparkles, UserPlus, Users, Waves } from 'lucide-react'
import { NotifyMeButton } from '@/components/locations/notify-me'
import { Eyebrow, focusRing } from '@/components/locations/primitives'
import { BOND_BLUE_OPTIONS, COMPARISON, PEARL_RULES, PLANS, SEASON_PASS, TIERS, formatRupee, type Plan } from '@/lib/membership'
import { ROUTES } from '@/lib/site'

const gold = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5b82e] px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#06263b] transition hover:bg-white ${focusRing}`
const ghostDark = `inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`

/** Concentric "ripple" rings used as the page's water motif. */
export function Ripples({ className = '', tone = 'cyan' }: { className?: string; tone?: 'cyan' | 'gold' }) {
  const stroke = tone === 'cyan' ? '#00c8e8' : '#f5b82e'
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

export function MembershipHero() {
  return (
    <section className="relative overflow-hidden bg-[#06263b] pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
      <Ripples className="absolute -right-32 -top-20 size-[42rem] opacity-80" />
      <Ripples className="absolute -bottom-56 left-1/4 size-[30rem] opacity-60" tone="gold" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8fe8f4]"><span className="h-px w-10 bg-[#f5b82e]" /> Bond Safari Membership</p>
          <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl">More time on the water.<br /><span className="text-[#f5b82e]">More ways to belong.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Discover a better way to paddle. Join the Bond Safari community, earn rewards, unlock member benefits, and make every adventure count.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#plans" className={gold}>Explore memberships <ArrowRight className="ml-2 size-4" aria-hidden /></a>
            <a href="#pearls" className={ghostDark}>How Pearls work</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Benefit({ children, tone }: { children: ReactNode; tone: 'light' | 'dark' }) {
  return <li className="flex gap-3 text-sm leading-6"><Check className={`mt-0.5 size-4 shrink-0 ${tone === 'dark' ? 'text-[#00c8e8]' : 'text-[#14785a]'}`} aria-hidden /><span>{children}</span></li>
}

export function PlanCards() {
  const [club, blue, pass] = PLANS
  return (
    <section id="plans" className="scroll-mt-6 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="plans-title">
      <Eyebrow>Choose your membership</Eyebrow>
      <h2 id="plans-title" className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Three ways to paddle more.</h2>
      <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        <article id="club" className="flex scroll-mt-6 flex-col rounded-3xl bg-white p-7 ring-1 ring-[#06263b]/10">
          <Users className="size-8 text-[#00a9c3]" strokeWidth={1.4} aria-hidden />
          <h3 className="mt-6 font-display text-2xl font-bold">{club.name}</h3>
          <p className="mt-1 text-sm font-semibold text-[#57717b]">{club.tagline}</p>
          <p className="mt-6 font-display text-5xl font-black">Free</p>
          <p className="mt-4 text-sm leading-6 text-[#3d5862]">{club.description}</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-[#06263b]">{club.benefits.map((b) => <Benefit key={b} tone="light">{b}</Benefit>)}</ul>
          <JoinButton plan="club" variant="outline" className="mt-8 w-full" />
        </article>

        <article id="bond-blue" className="relative flex scroll-mt-6 flex-col overflow-hidden rounded-3xl bg-[#0b3850] p-7 text-white shadow-[0_30px_70px_rgba(6,38,59,.28)] ring-2 ring-[#00c8e8]/50">
          <Ripples className="absolute -right-24 -top-24 size-80" />
          <div className="relative flex items-start justify-between gap-3">
            <Waves className="size-8 text-[#00c8e8]" strokeWidth={1.4} aria-hidden />
            <span className="rounded-full bg-[#00c8e8] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#06263b]">Annual membership</span>
          </div>
          <h3 className="relative mt-6 font-display text-2xl font-bold">{blue.name}</h3>
          <p className="relative mt-1 text-sm font-semibold text-[#8fe8f4]">{blue.tagline}</p>
          <dl className="relative mt-6 space-y-2">
            {BOND_BLUE_OPTIONS.map((option) => (
              <div key={option.id} className={`flex items-baseline justify-between rounded-2xl px-4 py-3 ${option.highlight ? 'bg-white text-[#06263b]' : 'bg-white/[.07]'}`}>
                <dt className="text-sm font-bold">{option.name}</dt>
                <dd><span className="font-display text-2xl font-black">{formatRupee(option.price)}</span><span className={`text-xs ${option.highlight ? 'text-[#57717b]' : 'text-white/60'}`}> /year</span></dd>
              </div>
            ))}
          </dl>
          <ul className="relative mt-6 flex-1 space-y-2.5">{blue.benefits.map((b) => <Benefit key={b} tone="dark">{b}</Benefit>)}</ul>
          <div className="relative mt-8 grid gap-2">
            <JoinButton plan="bond-blue" label="Join Bond Blue" variant="solid" className="w-full" />
            <a href="#compare" className={`inline-flex min-h-11 items-center justify-center text-sm font-bold text-[#8fe8f4] hover:text-white ${focusRing}`}>{blue.cta} <ArrowRight className="ml-1 size-4" aria-hidden /></a>
          </div>
        </article>

        <article id="season-pass" className="relative flex scroll-mt-6 flex-col overflow-hidden rounded-3xl bg-white p-7 ring-2 ring-[#f5b82e]">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#f5b82e]" aria-hidden />
          <Calendar className="size-8 text-[#c95a22]" strokeWidth={1.4} aria-hidden />
          <h3 className="mt-6 font-display text-2xl font-bold">{pass.name}</h3>
          <p className="mt-1 text-sm font-semibold text-[#57717b]">{pass.tagline}</p>
          <p className="mt-6"><span className="font-display text-5xl font-black">{formatRupee(SEASON_PASS.price)}</span><span className="text-sm text-[#57717b]"> /season</span></p>
          <p className="mt-1 text-sm font-bold text-[#c95a22]">Season: {SEASON_PASS.season}</p>
          {SEASON_PASS.earlyBirdEnabled && <p className="mt-3 rounded-xl bg-[#fff1cf] p-3 text-sm font-bold text-[#7a4f00]">Early-bird: {formatRupee(SEASON_PASS.earlyBird.price)} when bought {SEASON_PASS.earlyBird.window}</p>}
          <p className="mt-4 text-sm leading-6 text-[#3d5862]">{pass.description}</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-[#06263b]">{pass.benefits.map((b) => <Benefit key={b} tone="light">{b}</Benefit>)}</ul>
          <JoinButton plan="season-pass" variant="solid" className="mt-8 w-full" />
        </article>
      </div>
      <p className="mt-6 text-xs leading-5 text-[#57717b]">Membership sign-up and payment aren’t live yet. “Join” buttons let you register interest; we’ll tell you when sign-up opens. Benefits are subject to the membership terms.</p>
    </section>
  )
}

const columnNames = PLANS.map((p) => p.name)

function Cell({ value }: { value: string }) {
  if (value === 'Yes') return <span className="inline-flex items-center gap-1.5 font-semibold text-[#14785a]"><Check className="size-4" aria-hidden />Yes</span>
  if (value === 'No' || value === 'Not applicable') return <span className="inline-flex items-center gap-1.5 text-[#57717b]"><Minus className="size-4" aria-hidden />{value}</span>
  return <span>{value}</span>
}

export function ComparisonTable() {
  return (
    <section id="compare" className="scroll-mt-6 bg-white/60 px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="compare-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Compare</Eyebrow>
        <h2 id="compare-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Find your fit.</h2>

        <div className="mt-10 hidden overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/10 md:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Membership benefits compared</caption>
            <thead>
              <tr className="bg-[#06263b] text-white">
                <th scope="col" className="w-1/4 px-6 py-5 font-display text-base">Benefit</th>
                {columnNames.map((name, i) => <th key={name} scope="col" className={`px-6 py-5 font-display text-base ${i === 1 ? 'bg-[#0b3850]' : ''}`}>{name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2ed]">
              {COMPARISON.map((row) => (
                <tr key={row.benefit}>
                  <th scope="row" className="px-6 py-4 font-semibold">{row.benefit}</th>
                  {row.values.map((value, i) => <td key={i} className={`px-6 py-4 ${i === 1 ? 'bg-[#e1f6fa]/40' : ''}`}><Cell value={value} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          {columnNames.map((name, col) => (
            <section key={name} aria-label={name} className={`rounded-3xl p-5 ${col === 1 ? 'bg-[#0b3850] text-white' : 'bg-white ring-1 ring-[#06263b]/10'}`}>
              <h3 className="font-display text-xl font-bold">{name}</h3>
              <dl className={`mt-3 divide-y text-sm ${col === 1 ? 'divide-white/10' : 'divide-[#eef2ed]'}`}>
                {COMPARISON.map((row) => <div key={row.benefit} className="flex justify-between gap-4 py-2.5"><dt className={col === 1 ? 'text-white/70' : 'text-[#57717b]'}>{row.benefit}</dt><dd className="text-right font-semibold">{row.values[col]}</dd></div>)}
              </dl>
            </section>
          ))}
        </div>
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
    <section id="pearls" className="scroll-mt-6 relative overflow-hidden bg-[#06263b] px-5 py-20 text-white lg:px-8 lg:py-28" aria-labelledby="pearls-title">
      <Ripples className="absolute -left-40 top-10 size-[36rem]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="cyan">Bond Safari Pearls</Eyebrow>
            <h2 id="pearls-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Every adventure brings you<br /><span className="text-[#f5b82e]">closer to the next.</span></h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">Earn Pearls on eligible purchases and use them to save on future experiences with participating Bond businesses.</p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-white/[.07] p-6">
            <Gem className="size-10 shrink-0 text-[#f5b82e]" strokeWidth={1.3} aria-hidden />
            <p><span className="block font-display text-3xl font-black">1 Pearl = ₹1</span><span className="text-sm text-white/70">discount when redeemed under the programme rules</span></p>
          </div>
        </div>

        <ol className="mt-14 grid gap-3 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative rounded-3xl bg-white/[.06] p-6">
              <span className="font-display text-sm font-bold text-[#f5b82e]">0{i + 1}</span>
              <Icon className="mt-6 size-8 text-[#00c8e8]" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
              {i < steps.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden size-6 -translate-y-1/2 text-[#f5b82e] md:block" aria-hidden />}
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h3 className="font-display text-lg font-bold">The rules</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">{PEARL_RULES.map((rule) => <li key={rule} className="flex gap-3 text-sm leading-6 text-white/80"><CircleDollarSign className="mt-0.5 size-4 shrink-0 text-[#00c8e8]" aria-hidden />{rule}</li>)}</ul>
          </div>
          <a href="#tiers" className={gold}>Discover your rewards <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

export function TierProgression() {
  return (
    <section id="tiers" className="scroll-mt-6 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="tiers-title">
      <Eyebrow>Club tiers</Eyebrow>
      <h2 id="tiers-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Go deeper with every paddle.</h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-[#3d5862]">Bond Safari Club has four tiers. How you move between them is set by the loyalty programme rules, which will be published here.</p>
      <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier, i) => (
          <li key={tier.name} className="relative overflow-hidden rounded-3xl p-6 text-white" style={{ background: `linear-gradient(160deg, ${['#1aa6bf', '#0b7f95', '#0b3850', '#041a29'][i]}, ${['#0b7f95', '#0b3850', '#06263b', '#020d16'][i]})` }}>
            <svg viewBox="0 0 200 60" className="absolute inset-x-0 bottom-0 w-full opacity-30" aria-hidden><path d={`M0 ${30 - i * 4} Q50 ${15 - i * 3} 100 ${30 - i * 4} T200 ${30 - i * 4} V60 H0Z`} fill="#fff" fillOpacity={0.15 + i * 0.05} /></svg>
            <span className="relative font-display text-sm font-bold text-white/70">Tier {i + 1}</span>
            <h3 className="relative mt-10 font-display text-3xl font-black">{tier.name}</h3>
            <p className="relative mt-2 text-sm text-white/80">{tier.description}</p>
            <p className="relative mt-4 text-xs text-white/60">{tier.threshold ?? 'Criteria set by the programme rules'}</p>
          </li>
        ))}
      </ol>
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
    <section className="bg-[#eef2ed] px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="dashboard-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>Your member account</Eyebrow>
          <h2 id="dashboard-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Everything in one place.</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#3d5862]">Your member ID, Pearls, renewal date, free paddle hour and Season Pass status, in your Bond account. Member accounts will open once sign-up goes live.</p>
        </div>
        <div className="relative">
          <span className="absolute -top-3 left-6 z-10 rounded-full bg-[#f5b82e] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#06263b]">Preview · sample data</span>
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_rgba(6,38,59,.18)] ring-1 ring-[#06263b]/10" aria-label="Sample member dashboard (not real data)">
            <div className="relative overflow-hidden bg-[#0b3850] p-6 text-white">
              <Ripples className="absolute -right-20 -top-24 size-72" />
              <p className="relative text-xs text-white/60">Member</p>
              <p className="relative font-display text-2xl font-bold">Your name</p>
              <span className="relative mt-3 inline-flex rounded-full bg-[#00c8e8] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#06263b]">Bond Blue · Individual</span>
            </div>
            <dl className="grid gap-px bg-[#eef2ed] sm:grid-cols-2">
              {rows.map(([Icon, label, value]) => (
                <div key={label} className="flex gap-3 bg-white p-4 sm:last:col-span-2">
                  <Icon className="mt-0.5 size-5 shrink-0 text-[#00a9c3]" aria-hidden />
                  <div><dt className="text-xs font-bold uppercase tracking-wider text-[#57717b]">{label}</dt><dd className="mt-0.5 text-sm font-semibold">{value}</dd></div>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-2 p-4">
              <a href="#pearls" className={`inline-flex min-h-11 items-center rounded-full bg-[#06263b] px-4 text-sm font-bold text-white ${focusRing}`}>View my Pearls</a>
              <a href="#faq-manage" className={`inline-flex min-h-11 items-center rounded-full border border-[#06263b]/20 px-4 text-sm font-bold ${focusRing}`}>Manage membership</a>
              <a href={ROUTES.locations} className={`inline-flex min-h-11 items-center rounded-full border border-[#06263b]/20 px-4 text-sm font-bold ${focusRing}`}>Book a paddle</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FamilySection() {
  const family = BOND_BLUE_OPTIONS.find((o) => o.id === 'family')!
  return (
    <section id="family" className="scroll-mt-6 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="family-title">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* Replace with approved Bond Safari group-paddling photography when available. */}
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_30%_20%,#104963,#06263b_70%)]" role="img" aria-label="Group paddling photograph coming soon">
          <Ripples className="absolute size-[130%]" />
          <Users className="relative size-16 text-[#00c8e8]" strokeWidth={1} aria-hidden />
          <span className="absolute bottom-4 right-4 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/70">Photography coming soon</span>
        </div>
        <div>
          <Eyebrow>Family & community</Eyebrow>
          <h2 id="family-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Bring your people.<br />Share the adventure.</h2>
          <p className="mt-5 text-base leading-7 text-[#3d5862]">Paddling is better together. Bond Blue Family is an annual membership for your household at {formatRupee(family.price)} a year, with Bond Blue member benefits.</p>
          <p className="mt-3 text-sm text-[#57717b]">{family.coverage ?? 'Who a family membership covers will be confirmed in the membership terms. Ask us if you’d like the details before you join.'}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#bond-blue" className={`inline-flex min-h-12 items-center rounded-full bg-[#06263b] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white ${focusRing}`}>Explore family membership</a>
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
    <section id="join" className="scroll-mt-6 bg-white px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="join-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>How to join</Eyebrow>
        <h2 id="join-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Three steps to the water.</h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rounded-3xl bg-[#f6f3ec] p-6">
              <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-[#06263b] font-display text-sm font-bold text-white">{i + 1}</span><Icon className="size-6 text-[#00a9c3]" aria-hidden /></div>
              <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#57717b]">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <JoinButton plan="club" label="Join Bond Safari Club — free" />
          <p className="text-sm text-[#57717b]">Sign-up isn’t live yet; we’ll let you know when it opens.</p>
        </div>
      </div>
    </section>
  )
}

const contact = <a href={`${ROUTES.contact}?type=Membership`} className="font-bold text-[#0b7f95] underline-offset-2 hover:underline">contact us</a>

const faqs: { id?: string; q: string; a: ReactNode }[] = [
  { q: 'What is Bond Safari Club?', a: 'Our free membership. You get a shared member ID across participating Bond businesses, earn Pearls on eligible purchases and redeem them for discounts.' },
  { q: 'What is the difference between Bond Safari Club and Bond Blue?', a: 'Bond Safari Club is free. Bond Blue is a paid annual membership that adds 15% off eligible activities and purchases, double Pearls on eligible transactions, one free paddle hour per month (subject to availability and booking rules) and a digital membership pass.' },
  { q: 'How much does Bond Blue cost?', a: `Individual ${formatRupee(2499)}/year, Family ${formatRupee(5999)}/year, Digital ${formatRupee(999)}/year.` },
  { q: 'What is the Paddle Season Pass?', a: `A ${formatRupee(SEASON_PASS.price)} pass for unlimited paddling at participating operating sites during the ${SEASON_PASS.season} season, with reservations subject to capacity and fair-use rules.` },
  { q: 'How do Bond Safari Pearls work?', a: 'You earn Pearls on eligible purchases. Each Pearl is worth ₹1 of discount when redeemed under the programme rules. Earning rates, expiry and redemption limits are set by the approved programme rules and may vary by business.' },
  { q: 'Can I redeem Pearls for cash?', a: 'No. Pearls are not cash and cannot be exchanged or transferred for cash.' },
  { q: 'Do I need to reserve a session with my Season Pass?', a: 'Yes. Reserve your seat for each session; with the pass the session shows as ₹0. Reservations are subject to capacity and fair-use rules.' },
  { q: 'Can I use my membership at every Bond Safari location?', a: <>Benefits apply at participating Bond Safari locations. <a href={ROUTES.locations} className="font-bold text-[#0b7f95]">See our locations</a>, or {contact} to check a specific site.</> },
  { id: 'faq-manage', q: 'How do I renew or manage my membership?', a: <>You’ll manage and renew your membership from your Bond account once member accounts are live. Until then, please {contact}.</> },
  { q: 'What happens when my membership expires?', a: <>The membership terms will set out what happens at expiry, including to your Pearls. If you have a question now, please {contact}.</> },
]

export function MembershipFAQ() {
  return (
    <section id="faq" className="scroll-mt-6 mx-auto max-w-4xl px-5 py-20 lg:py-28" aria-labelledby="faq-title">
      <Eyebrow>FAQs</Eyebrow>
      <h2 id="faq-title" className="mt-3 font-display text-4xl font-black sm:text-5xl">Questions, answered.</h2>
      <div className="mt-10 divide-y divide-[#dfe6e5] overflow-hidden rounded-3xl bg-white ring-1 ring-[#06263b]/5">
        {faqs.map(({ id, q, a }) => (
          <details key={q} id={id} className="group scroll-mt-6">
            <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display font-bold hover:bg-[#f8faf8] [&::-webkit-details-marker]:hidden ${focusRing}`}>{q}<ChevronDown className="size-5 shrink-0 text-[#00a9c3] transition group-open:rotate-180" aria-hidden /></summary>
            <div className="px-6 pb-5 text-sm leading-6 text-[#3d5862]">{a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}

export function MembershipFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0b3850] px-5 py-20 text-white lg:px-8 lg:py-24">
      <Ripples className="absolute -right-20 top-1/2 size-[36rem] -translate-y-1/2" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <h2 className="max-w-2xl font-display text-4xl font-black sm:text-5xl">Your next adventure starts with membership.</h2>
          <p className="mt-4 text-base text-white/70">Find your place on the water with Bond Safari.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <JoinButton plan="club" label="Join Bond Safari Club — free" />
          <a href="#plans" className={ghostDark}>Explore paid memberships</a>
        </div>
      </div>
    </section>
  )
}

export function MembershipMobileBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 rounded-2xl border border-white/30 bg-[#06263b]/95 p-2 shadow-xl backdrop-blur-md sm:hidden">
      <a href="#plans" className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#f5b82e] text-xs font-extrabold uppercase text-[#06263b]">Memberships</a>
      <a href={ROUTES.locations} className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 text-xs font-extrabold uppercase text-white">Book now</a>
    </div>
  )
}
