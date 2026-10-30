import type { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { AlertTriangle, ArrowLeft, Lock, ShieldCheck } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { BrandMark } from '@/components/site/brand-mark'
import { getInvestorConfig } from '@/lib/investor/config'
import { getInvestorSession } from '@/lib/investor/session'
import { LoginForm } from './login-form'

export const metadata: Metadata = { title: 'Sign in' }

// This page is public: describe the portal, never show round figures here.
const SAFEGUARDS = ['Encrypted session', 'Signs out after 8 hours', 'Invitation only']

export default async function InvestorLoginPage() {
  if (await getInvestorSession()) redirect('/investor/dashboard')
  const config = getInvestorConfig()
  const isDev = process.env.NODE_ENV !== 'production'

  return (
    // Full-bleed photo with the sign-in card floating over it.
    <main className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-ink text-white">
      <Image src="/images/bond/touring-kayaks-at-the-waters-edge.jpg" alt="" fill priority sizes="100vw" quality={75} className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-ink-deep)_88%,transparent)_0%,color-mix(in_oklab,var(--color-ink)_55%,transparent)_45%,color-mix(in_oklab,var(--color-ink)_35%,transparent)_100%)] max-lg:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-ink)_45%,transparent)_0%,color-mix(in_oklab,var(--color-ink-deep)_88%,transparent)_55%)]" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pt-4 sm:px-8 lg:pt-6">
        <div className="flex items-center gap-3">
          <BrandMark className="h-10 lg:h-11" />
          <span className="hidden text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale sm:block">Investor Portal</span>
        </div>
        <a href="/" className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink ${focusRing}`}><ArrowLeft className="size-4" aria-hidden /><span className="hidden sm:inline">Back to the website</span><span className="sm:hidden">Website</span></a>
      </header>

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-5 px-5 py-5 sm:px-8 lg:grid-cols-[1fr_24rem] lg:gap-16 lg:py-8">
        <section aria-label="About the investor portal" className="max-w-lg">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-teal-pale">Bond Safari Paddle Sports</p>
          <p className="mt-2 font-display text-[1.75rem] font-black leading-[1.1] tracking-tight sm:text-4xl lg:mt-3 lg:text-5xl">Building Kerala’s <span className="text-sand">paddle‑sports network.</span></p>
          <p className="mt-4 hidden max-w-md text-base leading-7 text-white/75 lg:block">Follow the round, the plan and our progress, in one private place.</p>
          <ul className="mt-8 hidden flex-wrap gap-2 lg:flex">
            {SAFEGUARDS.map((s) => <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-sm"><ShieldCheck className="size-3.5 text-teal-pale" aria-hidden />{s}</li>)}
          </ul>
        </section>

        <div className="w-full">
          <div className="rounded-3xl bg-paper-bright/95 p-6 text-ink shadow-[0_40px_80px_-30px_rgb(8_20_15/0.6)] ring-1 ring-white/40 backdrop-blur-xl sm:p-8">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong"><Lock className="size-3.5" aria-hidden />Secure sign-in</p>
            <h1 className="mt-2 font-display text-2xl font-black tracking-tight">Investor Portal</h1>
            <p className="mt-2 text-sm leading-6 text-slate">Secure access to investor information and company updates.</p>

            {!config.ok && (
              <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-danger/30 bg-danger-soft p-4 text-sm text-danger">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                {isDev ? (
                  <div><p className="font-bold">Portal not configured (development only message)</p><ul className="mt-1 list-disc pl-4">{config.problems.map((problem) => <li key={problem}>{problem}</li>)}</ul><p className="mt-1">Add these to <code>.env.local</code>, or in Vercel project settings, and restart.</p></div>
                ) : <p>Investor sign-in is not available right now. Please try again later.</p>}
              </div>
            )}

            <div className="mt-6"><LoginForm disabled={!config.ok} /></div>
            <p className="mt-5 border-t border-line pt-4 text-center text-xs leading-5 text-slate">Need access? Contact your Bond Paddle Sports representative.</p>
          </div>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-semibold text-white/70 lg:hidden">
            <ShieldCheck className="size-3.5 text-teal-pale" aria-hidden />
            {SAFEGUARDS.map((s, i) => <span key={s}>{i > 0 && <span aria-hidden className="mr-2">·</span>}{s}</span>)}
          </p>
        </div>
      </div>

      <footer className="mx-auto w-full max-w-6xl px-5 pb-4 sm:px-8 lg:pb-6">
        <p className="flex items-center justify-center gap-2 text-center text-[11px] text-white/55 lg:justify-start"><ShieldCheck className="size-3.5 shrink-0 text-teal-pale" aria-hidden />Confidential · for named recipients only · not an offer to the public</p>
      </footer>
    </main>
  )
}
