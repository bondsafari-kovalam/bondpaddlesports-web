/**
 * Smoke test of the website's API services against a running backend (no browser):
 *   NEXT_PUBLIC_BOND_API_URL=http://127.0.0.1:3999/api/v1 node ../bondpaddlesports-admin/node_modules/tsx/dist/cli.mjs \
 *     --tsconfig tsconfig.json scripts/smoke-api.ts <location-slug> <YYYY-MM-DD>
 * Submits one of every form and one booking request, so point it at a test backend only.
 */
import { submitEnquiry } from '../lib/academy-service'
import { fetchAvailability } from '../lib/booking'
import { submitContactEnquiry } from '../lib/contact'
import { submitGroupEnquiry } from '../lib/enquiry-service'
import { EMPTY_ATTRIBUTION } from '../lib/attribution'
import { submitGroupBooking } from '../lib/group-booking-service'
import { submitShopEnquiry } from '../lib/shop-service'
import { submitEnquiryTo } from '../lib/bond-api'

const [location = 'muziris-kottapuram', date = ''] = process.argv.slice(2)
let failed = 0
const check = (label: string, result: { ok: boolean } & Record<string, unknown>) => {
  if (!result.ok) failed += 1
  console.log(`${result.ok ? 'OK  ' : 'FAIL'} ${label}: ${JSON.stringify(result.ok ? result.data : result)}`)
}

async function main() {
  check('contact', await submitContactEnquiry({ name: 'Smoke Test', email: 'smoke@example.com', phone: '+91 98765 43210', type: 'Existing Booking', location: 'Kovalam — Operating now', bookingReference: 'BRQ-TEST1-TEST2', subject: 'Hello', message: 'Testing the contact form connection.', consent: 'on' }))
  check('group', await submitGroupEnquiry({ name: 'Smoke Test', email: 'smoke@example.com', phone: '9876543210', type: 'Corporate Team', participants: '18', location: 'Poovar (opening soon)', activity: 'Kayaking', time: 'Morning', budget: '₹1,000–₹2,500 per person', requirements: 'Team day', consent: 'on' }))
  check('academy careers', await submitEnquiry('careers', { name: 'Smoke', email: 'smoke@example.com', location: 'No preference', experience: 'Regular paddler', consent: 'on' }))
  check('academy schools', await submitEnquiry('schools', { school: 'Test School', contact: 'Ms Test', email: 'school@example.com', groupSize: '30', interest: 'Single visit', consent: 'on' }))
  check('academy contact', await submitEnquiry('contact', { name: 'Smoke', email: 'smoke@example.com', course: 'Paddle Start', message: 'When are the dates?', consent: 'on' }))
  check('shop bulk order', await submitShopEnquiry('bulk-order', { organisation: 'Acme', name: 'Smoke', email: 'smoke@example.com', interest: 'Waterwear', quantity: '50', consent: 'on' }))
  check('shop made to order', await submitShopEnquiry('made-to-order', { product: 'sup-board', name: 'Smoke', email: 'smoke@example.com', quantity: '2–5', consent: 'on' }))
  check('notify me', await submitEnquiryTo('/enquiries/notify-me', { targetSlug: 'poovar', targetName: 'Poovar', method: 'whatsapp', phone: '+919876543210', consent: true }))
  check('feedback', await submitEnquiryTo('/enquiries/feedback', { message: 'Lovely paddle on the backwaters.', rating: 5, consent: true }))

  const availability = await fetchAvailability(location, date)
  console.log(`${availability.source === 'live' && !availability.unavailable ? 'OK  ' : 'FAIL'} slots: ${availability.sessions.length} live session(s) ${JSON.stringify(availability.sessions)}`)
  if (availability.source !== 'live' || availability.unavailable) failed += 1
  const session = availability.sessions.find((item) => item.activitySlug === 'kayaking')
  check(
    'booking request',
    await submitGroupBooking({
      locationSlug: location,
      date,
      people: 3,
      lead: { name: 'Smoke Test', phone: '+91 98765 43210', email: '' },
      activities: [
        { slug: 'kayaking', people: 3, sessionId: session?.id },
        { slug: 'canoeing', people: 2 },
      ],
      quotedTotal: 0,
      attribution: { ...EMPTY_ATTRIBUTION, utm_source: 'smoke-test' },
    }),
  )
  if (failed) {
    console.log(`${failed} check(s) failed`)
    process.exit(1)
  }
  console.log('All website API checks passed.')
}

main()
