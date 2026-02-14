// types/product.ts

export interface Product {
  id: string
  name: string
  brand?: string
  price: number
  description?: string
  category?: string
  subcategory?: string // Add this
  images: string[]
  rating: number
  reviews: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateProductInput {
  name: string
  brand?: string
  price: number
  description?: string
  category?: string
  subcategory?: string // Add this
  images?: string[]
  rating?: number
  reviews?: number
}

export interface UpdateProductInput {
  name?: string
  brand?: string
  price?: number
  description?: string
  category?: string
  subcategory?: string // Add this
  images?: string[]
  rating?: number
  reviews?: number
}

export interface ProductFilters {
  category?: string
  subcategory?: string // Add this
  brand?: string
  minPrice?: number
  maxPrice?: number
  searchTerm?: string
}