/**
 * Bond Safari Shop catalogue.
 *
 * The client brief supplies categories, product types and *category-level* proposed price ranges
 * only. Individual prices, variants, SKUs, specifications, certifications and stock have not been
 * supplied, so every product's real `price` is undefined ("Price to be confirmed").
 *
 * `demo` holds clearly labelled example prices/options/stock used ONLY when a visitor switches on
 * the demo shop, so the cart and checkout journey can be previewed. Demo values are never shown
 * as real and never reach structured data.
 */

export type ShopCategoryId = 'apparel' | 'waterwear' | 'paddling-equipment' | 'academy-starter-kits' | 'boards-and-kayaks'
export type SalesMethod = 'standard' | 'bundled-with-course' | 'made-to-order'

export type ShopCategory = {
  id: ShopCategoryId
  name: string
  summary: string
  types: string[]
  /** Proposed range from the client brief: category level only, never an item price. */
  proposedRange: string
  salesMethod: SalesMethod
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  { id: 'apparel', name: 'Apparel', summary: 'Bond Safari T-shirts and caps.', types: ['T-shirts', 'Caps'], proposedRange: '₹399–899', salesMethod: 'standard' },
  { id: 'waterwear', name: 'Waterwear', summary: 'Rash guards and swimwear for time on the water.', types: ['Rash guards', 'Swimwear'], proposedRange: '₹1,299–2,999', salesMethod: 'standard' },
  { id: 'paddling-equipment', name: 'Paddling Equipment', summary: 'Paddles, buoyancy aids, dry bags and helmets.', types: ['Paddles', 'Buoyancy aids', 'Dry bags', 'Helmets'], proposedRange: '₹1,500–15,000', salesMethod: 'standard' },
  { id: 'academy-starter-kits', name: 'Academy Starter Kits', summary: 'Course-related kit bundles for Academy learners.', types: ['Starter kits'], proposedRange: 'Bundled with eligible courses', salesMethod: 'bundled-with-course' },
  { id: 'boards-and-kayaks', name: 'SUP Boards and Kayaks', summary: 'Made-to-order boards and kayaks, by enquiry.', types: ['SUP boards', 'Kayaks'], proposedRange: 'Made to order / enquiry', salesMethod: 'made-to-order' },
]

export type ProductImage = { src: string; alt: string; variantKey?: string; illustrative?: boolean }

export type Variant = {
  /** e.g. { size: 'M', colour: 'Navy' } */
  options: Record<string, string>
  sku?: string
  price?: number
  /** Stock is only known from the inventory service; demo stock is labelled. */
  inStock?: boolean
}

export type Product = {
  slug: string
  name: string
  category: ShopCategoryId
  type: string
  description?: string
  features?: string[]
  specifications?: Record<string, string>
  materials?: string
  care?: string
  /** Verified standard for certified buoyancy aids; never show "certified" without it. */
  certificationStandard?: string
  sku?: string
  price?: number
  /** Option names in display order, e.g. ['size', 'colour']; values come from variants. */
  optionNames: string[]
  variants: Variant[]
  images: ProductImage[]
  sizeGuide?: { headers: string[]; rows: string[][] }
  hasSizeGuide: boolean
  /** Brief: swimwear and rash guards must not be returned once worn. */
  hygieneRestricted: boolean
  bookingAddOnEligible: boolean
  clickAndCollectEligible: boolean
  deliveryEligible: boolean
  memberDiscountEligible?: boolean
  featured?: boolean
  addedOn?: string
  compatibleCourses?: string[]
  kitContents?: string[]
  related: string[]
  demo?: { price: number; optionValues: Record<string, string[]>; outOfStock?: string[] }
}

const SIZES = ['S', 'M', 'L', 'XL']

type Seed = Pick<Product, 'slug' | 'name' | 'category' | 'type' | 'related'> & Partial<Product>

const product = (seed: Seed): Product => ({
  optionNames: [],
  variants: [],
  images: [],
  hasSizeGuide: false,
  hygieneRestricted: false,
  bookingAddOnEligible: false,
  clickAndCollectEligible: false,
  deliveryEligible: true,
  ...seed,
})

export const products: Product[] = [
  product({ slug: 'bond-safari-t-shirt', name: 'Bond Safari T-shirt', category: 'apparel', type: 'T-shirts', hasSizeGuide: true, featured: true, related: ['bond-safari-cap', 'rash-guard'], demo: { price: 599, optionValues: { size: SIZES, colour: ['Navy', 'White'] }, outOfStock: ['XL|White'] } }),
  product({ slug: 'bond-safari-cap', name: 'Bond Safari Cap', category: 'apparel', type: 'Caps', images: [{ src: 'https://images.unsplash.com/photo-1675285456811-aae306c3cf9f?auto=format&fit=crop&w=1400&q=85', alt: 'Plain baseball cap on a table; Bond Safari branding is not shown', illustrative: true }], featured: true, related: ['bond-safari-t-shirt'], demo: { price: 449, optionValues: { colour: ['Navy', 'Sand'] } } }),
  product({ slug: 'rash-guard', name: 'Rash Guard', category: 'waterwear', type: 'Rash guards', hasSizeGuide: true, hygieneRestricted: true, bookingAddOnEligible: true, clickAndCollectEligible: true, featured: true, related: ['dry-bag', 'swimwear'], demo: { price: 1799, optionValues: { size: SIZES, colour: ['Navy', 'Cyan'] }, outOfStock: ['S|Cyan'] } }),
  product({ slug: 'swimwear', name: 'Swimwear', category: 'waterwear', type: 'Swimwear', images: [{ src: '/images/bond/floating-on-a-sup-in-clear-water.jpg', alt: 'Woman in a navy swimsuit lying on a paddleboard over clear turquoise water' }], hasSizeGuide: true, hygieneRestricted: true, related: ['rash-guard'], demo: { price: 1499, optionValues: { size: SIZES } } }),
  product({ slug: 'paddle', name: 'Paddle', category: 'paddling-equipment', type: 'Paddles', images: [{ src: '/images/bond/paddler-beside-a-sup-board.jpg', alt: 'A carbon paddle resting across a stand-up paddleboard, held by a paddler in the sea' }], related: ['buoyancy-aid', 'dry-bag'], demo: { price: 4500, optionValues: {} } }),
  product({ slug: 'buoyancy-aid', name: 'Buoyancy Aid', category: 'paddling-equipment', type: 'Buoyancy aids', images: [{ src: 'https://images.unsplash.com/photo-1722029270960-32c1e1575b89?auto=format&fit=crop&w=1400&q=85', alt: 'Orange buoyancy aid hanging on a chair by the sea', illustrative: true }], featured: true, related: ['helmet', 'paddle'], demo: { price: 3500, optionValues: { size: ['S/M', 'L/XL'] } } }),
  product({ slug: 'dry-bag', name: 'Dry Bag', category: 'paddling-equipment', type: 'Dry bags', bookingAddOnEligible: true, clickAndCollectEligible: true, featured: true, related: ['rash-guard', 'paddle'], demo: { price: 1500, optionValues: {} } }),
  product({ slug: 'helmet', name: 'Helmet', category: 'paddling-equipment', type: 'Helmets', related: ['buoyancy-aid'], demo: { price: 3000, optionValues: { size: ['S/M', 'L/XL'] } } }),
  product({ slug: 'academy-starter-kit', name: 'Academy Starter Kit', category: 'academy-starter-kits', type: 'Starter kits', deliveryEligible: false, related: ['buoyancy-aid', 'rash-guard'] }),
  product({ slug: 'sup-board', name: 'SUP Board', category: 'boards-and-kayaks', type: 'SUP boards', images: [{ src: '/images/bond/mkel-sup-board-top-and-side.jpg', alt: 'MKEL carbon stand-up paddleboard shown from above and from the side, with orange pinstripes and a fin' }, { src: '/images/bond/mkel-board-range-studio.jpg', alt: 'Two MKEL boards standing against white blocks in a studio' }, { src: '/images/bond/sup-board-on-the-beach-at-sunset.jpg', alt: 'An MKEL stand-up paddleboard on wet sand at sunset' }], deliveryEligible: false, related: ['paddle', 'buoyancy-aid'] }),
  product({ slug: 'kayak', name: 'Kayak', category: 'boards-and-kayaks', type: 'Kayaks', images: [{ src: '/images/bond/mkel-kayak-range-studio.jpg', alt: 'MKEL touring and expedition kayaks in red, yellow and blue with paddles' }, { src: '/images/bond/two-touring-kayaks-from-above.jpg', alt: 'Yellow and red MKEL 335 Touring kayaks on the sand, seen from above' }], deliveryEligible: false, related: ['paddle', 'helmet'] }),
]

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug)
}

export function getCategory(id: string) {
  return SHOP_CATEGORIES.find((category) => category.id === id)
}

export const productHref = (item: Product) => `/shop/${item.slug}`
export const categoryHref = (id: ShopCategoryId) => `/shop/collections/${id}`
export const salesMethod = (item: Product) => getCategory(item.category)!.salesMethod

export function formatINR(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

/** Variants to show: real variants, or labelled demo variants when the demo shop is on. */
export function variantsFor(item: Product, demo: boolean): { optionNames: string[]; variants: Variant[] } {
  if (item.variants.length || !demo || !item.demo) return { optionNames: item.optionNames, variants: item.variants }
  const names = Object.keys(item.demo.optionValues)
  const combos = names.reduce<Record<string, string>[]>((acc, name) => acc.flatMap((combo) => item.demo!.optionValues[name].map((value) => ({ ...combo, [name]: value }))), [{}])
  return {
    optionNames: names,
    variants: combos.map((options) => ({ options, price: item.demo!.price, inStock: !item.demo!.outOfStock?.includes(names.map((n) => options[n]).join('|')) })),
  }
}

export function priceFor(item: Product, demo: boolean, variant?: Variant) {
  return variant?.price ?? item.price ?? (demo ? item.demo?.price : undefined)
}

export function isPurchasable(item: Product, demo: boolean) {
  return salesMethod(item) === 'standard' && priceFor(item, demo) !== undefined
}

// Fulfilment & membership ------------------------------------------------------------------------

/** Click-and-collect points must be configured per site/hub; none are yet. */
export const COLLECTION_POINTS: { id: string; name: string; locationSlug?: string }[] = []

export const MEMBER_DISCOUNTS = {
  bondBlue: { label: 'Bond Blue', percent: 15, rule: 'Bond Blue members receive 15% off eligible shop items.' },
  academyLearner: { label: 'Academy learner', percent: 10, rule: 'Academy learners receive 10% off eligible kit purchases for 30 days after their course.' },
  stacking: 'Only one discount applies per order.',
}

export const HYGIENE_POLICY = 'Swimwear and rash guards cannot be returned once worn.'

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

/** Demonstration charges used only in the demo shop so the checkout can show a complete total. */
export const DEMO_CHARGES = { shipping: 150, gstRate: 0.18 }
