import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { PageHero, ShopShell } from '@/components/shop/shop-sections'
import { Pending } from '@/components/locations/primitives'
import { HYGIENE_POLICY, MEMBER_DISCOUNTS } from '@/lib/shop'

export const metadata: Metadata = {
  title: 'Shop help | Bond Safari Shop',
  description: 'Shipping, returns, product care, size guides, order tracking and membership terms for the Bond Safari Shop.',
  alternates: { canonical: '/shop/help' },
}

const sections: { id: string; title: string; body?: ReactNode; complete?: boolean }[] = [
  { id: 'shipping', title: 'Shipping & delivery' },
  { id: 'returns', title: 'Returns & exchanges', body: <p className="flex gap-2 font-semibold text-[#7a4f00]"><AlertTriangle className="size-4 shrink-0" aria-hidden />{HYGIENE_POLICY}</p> },
  { id: 'care', title: 'Product care' },
  { id: 'sizes', title: 'Size guides' },
  { id: 'tracking', title: 'Order tracking' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'membership-terms', title: 'Membership terms', complete: true, body: <ul className="list-disc space-y-1 pl-5"><li>{MEMBER_DISCOUNTS.bondBlue.rule}</li><li>{MEMBER_DISCOUNTS.academyLearner.rule}</li><li>{MEMBER_DISCOUNTS.stacking}</li></ul> },
  { id: 'contact', title: 'Contact & support' },
]

export default function ShopHelpPage() {
  return (
    <ShopShell>
      <PageHero compact eyebrow="Shop help" title="Help & policies" description="Approved policy wording will appear here as it’s supplied. We won’t publish delivery guarantees or refund terms until they’re confirmed." />
      <div className="mx-auto max-w-4xl space-y-4 px-5 py-14">
        {sections.map(({ id, title, body, complete }) => (
          <section key={id} id={id} className="scroll-mt-6 rounded-3xl bg-white p-6 ring-1 ring-[#06263b]/5" aria-labelledby={`${id}-title`}>
            <h2 id={`${id}-title`} className="font-display text-2xl font-bold">{title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[#3d5862]">{body}{!complete && <p><Pending>Approved policy wording to be added.</Pending></p>}</div>
          </section>
        ))}
      </div>
    </ShopShell>
  )
}
