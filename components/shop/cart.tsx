'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { FlaskConical, X } from 'lucide-react'
import { focusRing } from '@/components/locations/primitives'
import { getProduct, priceFor, variantsFor, type Product } from '@/lib/shop'

export type CartItem = { slug: string; options: Record<string, string>; quantity: number }
export type CartLine = CartItem & { product: Product; unitPrice?: number; available: boolean; key: string }

type CartContextValue = {
  items: CartItem[]
  lines: CartLine[]
  count: number
  subtotal: number
  hydrated: boolean
  demo: boolean
  setDemo: (demo: boolean) => void
  add: (item: CartItem) => void
  update: (key: string, quantity: number) => void
  remove: (key: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const CART_KEY = 'bond-shop-cart'
const DEMO_KEY = 'bond-shop-demo'
export const MAX_QUANTITY = 10

export const lineKey = (item: Pick<CartItem, 'slug' | 'options'>) => `${item.slug}|${Object.entries(item.options).sort().map(([k, v]) => `${k}:${v}`).join(',')}`

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable: cart lasts for this page view only */
  }
}

/**
 * Cart held in this browser only. Prices are always recalculated from the catalogue, never stored,
 * and the server must re-price and re-check stock before any real order.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [demo, setDemoState] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(read<CartItem[]>(CART_KEY, []))
    setDemoState(read<boolean>(DEMO_KEY, false))
    setHydrated(true)
  }, [])

  useEffect(() => { if (hydrated) write(CART_KEY, items) }, [items, hydrated])
  useEffect(() => { if (hydrated) write(DEMO_KEY, demo) }, [demo, hydrated])

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap((item) => {
      const product = getProduct(item.slug)
      if (!product) return []
      const variant = variantsFor(product, demo).variants.find((v) => Object.entries(item.options).every(([k, val]) => v.options[k] === val))
      const unitPrice = priceFor(product, demo, variant)
      return [{ ...item, product, unitPrice, available: unitPrice !== undefined && variant?.inStock !== false, key: lineKey(item) }]
    })
    return {
      items,
      lines,
      hydrated,
      demo,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + (line.unitPrice ?? 0) * line.quantity, 0),
      // Turning the demo off removes demo-priced items so nothing unpriced can reach checkout.
      setDemo: (next) => { setDemoState(next); if (!next) setItems((current) => current.filter((item) => getProduct(item.slug)?.price !== undefined)) },
      add: (item) => setItems((current) => {
        const key = lineKey(item)
        const existing = current.find((line) => lineKey(line) === key)
        if (existing) return current.map((line) => (lineKey(line) === key ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + item.quantity) } : line))
        return [...current, item]
      }),
      update: (key, quantity) => setItems((current) => current.map((line) => (lineKey(line) === key ? { ...line, quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)) } : line))),
      remove: (key) => setItems((current) => current.filter((line) => lineKey(line) !== key)),
      clear: () => setItems([]),
    }
  }, [items, demo, hydrated])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

/** Persistent notice while the demo shop is on, with a one-tap exit. */
export function DemoShopBanner() {
  const { demo, setDemo } = useCart()
  if (!demo) return null
  return (
    <div className="sticky top-0 z-40 bg-sand text-ink" role="status">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 text-xs font-bold lg:px-8">
        <span className="flex items-center gap-2"><FlaskConical className="size-4 shrink-0" aria-hidden />Demo shop: example prices, sizes and stock. Nothing can be bought.</span>
        <button type="button" onClick={() => setDemo(false)} className={`inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full bg-ink px-3 text-white ${focusRing}`}><X className="size-3.5" aria-hidden />Exit demo</button>
      </div>
    </div>
  )
}

export function DemoShopToggle({ className = 'border-ink/20' }: { className?: string }) {
  const { demo, setDemo } = useCart()
  if (demo) return null
  return (
    <button type="button" onClick={() => setDemo(true)} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-bold ${focusRing} ${className}`}>
      <FlaskConical className="size-4" aria-hidden />Preview the shop with demo prices
    </button>
  )
}
