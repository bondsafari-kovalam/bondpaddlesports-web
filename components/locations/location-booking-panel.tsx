import { BookingForm } from '@/components/booking/booking-form'
import { NotifyMeButton } from '@/components/locations/notify-me'
import type { Location } from '@/lib/locations'

export function LocationBookingPanel({ location }: { location: Location }) {
  if (location.status !== 'operating') {
    return (
      <div id="book" className="scroll-mt-6 rounded-3xl bg-ink p-6 text-white shadow-[0_20px_60px_color-mix(in_srgb,var(--color-ink)_16%,transparent)] sm:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sand">Coming soon</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Bookings aren’t open yet</h2>
        <p className="mt-3 text-sm leading-6 text-white/70">{location.name} is planned to open {location.plannedOpening ? `in ${location.plannedOpening}` : 'once dates are confirmed'}. Ask us to let you know the moment sessions go live.</p>
        <NotifyMeButton name={location.name} slug={location.slug} variant="solid" className="mt-6 w-full py-4" />
      </div>
    )
  }
  return <BookingForm title={`Book ${location.name}`} locations={[{ slug: location.slug, name: location.name, pricePerParticipant: location.startingPrice }]} />
}
