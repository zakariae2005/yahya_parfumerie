// store/productStore.ts

import { create } from 'zustand'
import { Product, CreateProductInput, UpdateProductInput, ProductFilters } from '@/types/product'

interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  filters: ProductFilters
  
  // Actions
  fetchProducts: () => Promise<void>
  fetchProductById: (id: string) => Promise<Product | null>
  createProduct: (data: CreateProductInput) => Promise<Product | null>
  updateProduct: (id: string, data: UpdateProductInput) => Promise<Product | null>
  deleteProduct: (id: string) => Promise<boolean>
  setFilters: (filters: ProductFilters) => void
  clearFilters: () => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  filters: {},

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      set({ products: data, loading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      })
    }
  },

  fetchProductById: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/products/${id}`)
      if (!response.ok) throw new Error('Failed to fetch product')
      const data = await response.json()
      set({ loading: false })
      return data
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      })
      return null
    }
  },

  createProduct: async (data: CreateProductInput) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create product')
      const newProduct = await response.json()
      set((state) => ({ 
        products: [...state.products, newProduct],
        loading: false 
      }))
      return newProduct
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      })
      return null
    }
  },

  updateProduct: async (id: string, data: UpdateProductInput) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update product')
      const updatedProduct = await response.json()
      set((state) => ({
        products: state.products.map((p) => 
          p.id === id ? updatedProduct : p
        ),
        loading: false
      }))
      return updatedProduct
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      })
      return null
    }
  },

  deleteProduct: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete product')
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        loading: false
      }))
      return true
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      })
      return false
    }
  },

  setFilters: (filters: ProductFilters) => {
    set({ filters })
  },

  clearFilters: () => {
    set({ filters: {} })
  },
}))