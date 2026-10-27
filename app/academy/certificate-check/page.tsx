import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { CertificateCheckForm } from '@/components/academy/academy-forms'
import { AcademyHero, AcademyShell } from '@/components/academy/academy-sections'
import { HERO_IMAGES } from '@/lib/hero-images'

const description = 'Check a certificate issued for a course delivered by Bond Safari Academy.'

export const metadata: Metadata = {
  title: 'Certificate check | Bond Safari Academy',
  description,
  alternates: { canonical: '/academy/certificate-check' },
  openGraph: { title: 'Certificate check | Bond Safari Academy', description, url: '/academy/certificate-check', type: 'website' },
}

export default function CertificateCheckPage() {
  return (
    <AcademyShell>
      <AcademyHero
        image={HERO_IMAGES.academyCertificate}
        eyebrow="Certificate check"
        title={<>Verify an <span className="text-sand">Academy certificate.</span></>}
        description="Employers and partners can confirm a certificate for a course delivered by Bond Safari Academy."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Academy', href: '/academy' }, { label: 'Certificate check' }]}
      />
      <section className="mx-auto max-w-4xl px-5 py-16 lg:py-20">
        <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_color-mix(in_srgb,var(--color-ink)_10%,transparent)] sm:p-8">
          <h2 className="font-display text-2xl font-bold">Check a certificate</h2>
          <p className="mt-2 text-sm text-slate">Enter the certificate number and surname exactly as they appear on the certificate.</p>
          <div className="mt-6"><CertificateCheckForm /></div>
        </div>
        <div className="mt-6 flex gap-3 rounded-2xl bg-mist p-5 text-sm leading-6 text-slate-strong">
          <Lock className="size-5 shrink-0 text-ink" aria-hidden />
          <p><strong className="text-ink">Privacy.</strong> A check only confirms courses Bond Safari Academy delivered and returns the minimum details needed: initial, surname, course and award date. Qualifications held with Paddle UK are recorded by Paddle UK; a link to their records will be added once approved.</p>
        </div>
      </section>
    </AcademyShell>
  )
}
