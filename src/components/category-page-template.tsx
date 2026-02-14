'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { ProductCard } from '@/components/product-card'

const BRANDS = ['Dior', 'Chanel', "L'Oréal", 'Estée Lauder', 'MAC', 'Lancôme', 'Clinique']

interface CategoryPageTemplateProps {
  category: string
  title: string
  description: string
  placeholder: string
}

export function CategoryPageTemplate({ category, title, description, placeholder }: CategoryPageTemplateProps) {
  const { products, fetchProducts, loading } = useProductStore()
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const filteredProducts = products.filter((product) => {
    if (product.category !== category) return false
    if (selectedBrands.length > 0 && product.brand && !selectedBrands.includes(product.brand)) return false
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      return (
        product.name.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search)
      )
    }
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default: return b.reviews - a.reviews
    }
  })

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <aside className="md:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-semibold text-lg">Filtres</h2>
                {selectedBrands.length > 0 && (
                  <button onClick={clearFilters} className="text-sm text-accent hover:underline">
                    Réinitialiser
                  </button>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-3">Marques</h3>
                <div className="space-y-2">
                  {BRANDS.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer hover:bg-secondary px-2 py-1 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="popularity">Popularité</option>
                <option value="newest">Nouveautés</option>
                <option value="price-asc">Prix: faible à élevé</option>
                <option value="price-desc">Prix: élevé à faible</option>
                <option value="rating">Évaluation</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                    <div className="h-64 bg-muted" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-6 bg-muted rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl">
                <p className="text-muted-foreground mb-4">Aucun produit trouvé avec ces filtres</p>
                <button onClick={clearFilters} className="text-accent hover:underline">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}