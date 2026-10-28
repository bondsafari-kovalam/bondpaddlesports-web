import type { Metadata } from 'next'

// The portal is private: never indexed, never cached as a public page.
export const metadata: Metadata = {
  title: { default: 'Investor Portal | Bond Paddle Sports', template: '%s | Bond Paddle Sports Investor Portal' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen overflow-x-clip bg-paper text-ink">{children}</div>
}
