import { Lock, LogOut } from 'lucide-react'
import { PortalNav } from '@/components/investor/portal-nav'
import { focusRing } from '@/components/locations/primitives'
import { BrandMark } from '@/components/site/brand-mark'
import { CONFIDENTIAL_LINE } from '@/lib/investor/round-data'
import { requireInvestorSession } from '@/lib/investor/session'
import { logout } from '../actions'

/**
 * Shell for signed-in pages. The check here only gates the shell: layouts don't re-run on every
 * navigation, so each page and route handler verifies the session itself as well.
 */
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  await requireInvestorSession()
  return (
    <>
      <p className="flex items-center justify-center gap-2 bg-sand px-5 py-2 text-center text-xs font-bold text-ink"><Lock className="size-3.5 shrink-0" aria-hidden />{CONFIDENTIAL_LINE}. Projections are estimates, not guarantees.</p>
      <header className="bg-ink px-5 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
          <div className="flex items-center gap-4"><BrandMark className="h-12" /><span className="hidden text-xs font-extrabold uppercase tracking-[0.2em] text-teal-pale sm:block">Investor Portal</span></div>
          <form action={logout}>
            <button type="submit" className={`inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 px-4 text-sm font-semibold text-white transition hover:bg-white hover:text-ink ${focusRing}`}><LogOut className="size-4" aria-hidden />Sign out</button>
          </form>
          <div className="w-full"><PortalNav /></div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">{children}</main>
      <footer className="border-t border-line px-5 py-8 text-center text-xs text-slate lg:px-8">Indicative terms, subject to legal documents. Full risk factors will be set out in the offer letter (PAS-4).</footer>
    </>
  )
}
