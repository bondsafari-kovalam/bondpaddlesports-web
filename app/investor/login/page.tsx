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

function PhotoBackdrop({ sizes }: { sizes: string }) {
  return (
    <>
      <Image src="/images/bond/three-kayaks-on-the-backwater.jpg" alt="" fill priority sizes={sizes} quality={60} className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--color-ink)_78%,transparent)_0%,color-mix(in_oklab,var(--color-ink)_88%,transparent)_55%,var(--color-ink-deep)_100%)]" />
    </>
  )
}

export default async function InvestorLoginPage() {
  if (await getInvestorSession()) redirect('/investor/dashboard')
  const config = getInvestorConfig()
  const isDev = process.env.NODE_ENV !== 'production'

  return (
    <main className="grid min-h-screen bg-paper lg:grid-cols-[1.1fr_1fr]">
      {/* Desktop brand panel: photo, one message, nothing else */}
      <section aria-label="About the investor portal" className="relative hidden overflow-hidden text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        <PhotoBackdrop sizes="55vw" />
        <div className="relative"><BrandMark className="h-16" /></div>
        <div className="relative max-w-md">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-teal-pale">Bond Safari Paddle Sports</p>
          <p className="mt-4 font-display text-4xl font-black leading-tight tracking-tight xl:text-5xl">Building Kerala’s <span className="text-sand">paddle‑sports network.</span></p>
          <p className="mt-4 text-base leading-7 text-white/70">Follow the round, the plan and our progress, in one private place.</p>
          <p className="mt-12 flex items-center gap-2 text-xs text-white/50"><ShieldCheck className="size-4 text-teal-pale" aria-hidden />Confidential · for named recipients only · not an offer to the public</p>
        </div>
      </section>

      {/* Form column */}
      <section className="flex flex-col">
        {/* Mobile and tablet header */}
        <div className="relative overflow-hidden px-5 pb-14 pt-6 text-white sm:px-10 lg:hidden">
          <PhotoBackdrop sizes="100vw" />
          <div className="relative flex items-center justify-between gap-4">
            <BrandMark className="h-12" />
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/85 backdrop-blur-sm">Confidential</span>
          </div>
          <p className="relative mt-6 max-w-xs font-display text-2xl font-black leading-tight tracking-tight">Building Kerala’s <span className="text-sand">paddle‑sports network.</span></p>
        </div>

        <div className="relative -mt-8 flex flex-1 flex-col rounded-t-3xl bg-paper px-5 pb-10 pt-6 sm:px-10 lg:mt-0 lg:rounded-none lg:px-16 lg:py-10">
          <a href="/" className={`inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full text-sm font-semibold text-slate transition hover:text-ink ${focusRing} lg:self-end`}><ArrowLeft className="size-4" aria-hidden />Back to the website</a>

          <div className="mx-auto w-full max-w-[26rem] pt-4 lg:my-auto lg:py-8">
            <div className="rounded-3xl border border-line bg-paper-bright p-7 shadow-[0_24px_60px_-36px_rgb(16_36_31/0.35)] sm:p-9">
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-strong"><Lock className="size-3.5" aria-hidden />Secure sign-in</p>
              <h1 className="mt-3 font-display text-3xl font-black tracking-tight">Investor Portal</h1>
              <p className="mt-2 text-sm leading-6 text-slate">Secure access to investor information and company updates.</p>

              {!config.ok && (
                <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-danger/30 bg-danger-soft p-4 text-sm text-danger">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {isDev ? (
                    <div><p className="font-bold">Portal not configured (development only message)</p><ul className="mt-1 list-disc pl-4">{config.problems.map((problem) => <li key={problem}>{problem}</li>)}</ul><p className="mt-1">Add these to <code>.env.local</code>, or in Vercel project settings, and restart.</p></div>
                  ) : <p>Investor sign-in is not available right now. Please try again later.</p>}
                </div>
              )}

              <div className="mt-8"><LoginForm disabled={!config.ok} /></div>
            </div>

            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-light">
              <ShieldCheck className="size-3.5 text-teal" aria-hidden />
              {SAFEGUARDS.map((s, i) => <span key={s}>{i > 0 && <span aria-hidden className="mr-2">·</span>}{s}</span>)}
            </p>
            <p className="mt-3 text-center text-xs leading-5 text-slate">Need access? Contact your Bond Paddle Sports representative.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
