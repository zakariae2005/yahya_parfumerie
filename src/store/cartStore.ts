// store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const items = get().items
        const existing = items.find((i) => i.product.id === product.id)
        set({
          items: existing
            ? items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              )
            : [...items, { product, quantity }],
        })
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
)

// ── Selectors (use these everywhere instead of getTotal/getItemCount) ──
export const useCartItemCount = () =>
  useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  )

export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  )