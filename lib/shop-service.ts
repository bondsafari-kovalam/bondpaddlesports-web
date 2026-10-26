/**
 * Shop service boundary for the shared Bond platform (one customer account, membership/Pearls,
 * booking engine, inventory and shop across Bond websites). Every call reports "not connected"
 * until the backend exists; the UI never fakes stock, discounts, orders or payments.
 *
 * Backend responsibilities when connected:
 * - Inventory: one stock record per product per location (central warehouse, each site kiosk,
 *   online, future hubs); reservations during checkout; decrement on confirmed sale; kiosk sales
 *   sync online; returns/exchanges/transfers update stock; no overselling.
 * - Pricing & tax: server re-prices every cart; GST invoices with HSN codes; company-specific
 *   invoice ownership for cross-company orders.
 * - Discounts: verify Bond Blue (15% eligible items) or Academy learner (10% kit, 30 days) on the
 *   server; one discount per order; never trust a client flag.
 * - Payments: Indian gateway (UPI, cards, netbanking) via hosted checkout; the site never sees card
 *   details; confirmation only after server-side verification (see bond-safari-website
 *   docs/booking-api.md for the shared hold/confirm pattern). No payment splitting until the
 *   common platform supports it.
 * - Booking add-ons: attach items to an active booking with jetty collection when configured.
 * - Admin: products, images, variants, SKUs, prices, stock by location, orders, returns, collection
 *   options, hygiene flags, bulk enquiries, starter kits; role checks enforced on the server.
 */

export const SHOP_BACKEND_CONNECTED = false

export type Result<T> = { ok: true; data: T } | { ok: false; reason: 'not-connected' | 'error'; message: string }
const notConnected = (what: string): Result<never> => ({ ok: false, reason: 'not-connected', message: `${what} is not connected yet.` })

export type StockLocation = 'warehouse' | 'online' | `kiosk:${string}` | `hub:${string}`
export type StockLevel = { sku: string; location: StockLocation; available: number }

export async function getStock(_skus: string[]): Promise<Result<StockLevel[]>> {
  return notConnected('Inventory')
}

export type VerifiedDiscount = { kind: 'bond-blue' | 'academy-learner'; percent: number; eligibleSkus: string[] }

/** Returns at most one verified discount for the signed-in customer. */
export async function verifyMemberDiscount(_skus: string[]): Promise<Result<VerifiedDiscount | null>> {
  return notConnected('Membership verification')
}

export type ActiveBooking = { reference: string; activity: string; location: string; date: string; collectionPoint?: string }

export async function getActiveBooking(): Promise<Result<ActiveBooking | null>> {
  return notConnected('Booking linking')
}

export type OrderStatus = 'confirmed' | 'payment-pending' | 'payment-failed' | 'cancelled' | 'refunded'
export type Order = {
  reference: string
  status: OrderStatus
  items: { name: string; options: Record<string, string>; quantity: number; unitPrice: number }[]
  fulfilment: { method: 'delivery' | 'collect'; detail: string }
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  invoiceUrl?: string
}

export async function createOrder(_payload: Record<string, unknown>): Promise<Result<{ reference: string; paymentUrl: string }>> {
  return notConnected('Checkout and payment')
}

export async function getOrder(_reference: string): Promise<Result<Order>> {
  return notConnected('Order lookup')
}

export async function getOrders(): Promise<Result<Order[]>> {
  return notConnected('Customer accounts')
}

export async function submitShopEnquiry(_kind: 'bulk-order' | 'made-to-order', _payload: Record<string, unknown>): Promise<Result<{ reference: string }>> {
  return notConnected('Enquiry handling')
}
