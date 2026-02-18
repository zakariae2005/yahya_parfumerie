'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { ProductCard } from '@/components/product-card'

const BRANDS = [
  "Hugo Boss", "Dior", "Dolce & Gabbana", "Elie Saab", "Giorgio Armani",
  "Givenchy", "Hermès", "Jean Paul Gaultier", "Lancôme", "Valentino",
  "Yves Saint Laurent", "Saphir", "Montblanc", "Prada",
]

const SUBCATEGORIES = ['Soins Cheveux', 'Coloration']

export default function CheveuxPage() {
  const { products, fetchProducts, loading } = useProductStore()
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const filteredProducts = products.filter((product) => {
    if (product.category !== 'CHEVEUX') return false
    if (selectedBrands.length > 0 && product.brand && !selectedBrands.includes(product.brand)) return false
    if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false
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
    setSelectedSubcategory('')
    setSearchTerm('')
  }

  const hasActiveFilters = selectedBrands.length > 0 || !!selectedSubcategory

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        {/* Page Header */}
        <div className="mb-10 border-b border-black/10 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Collection</p>
          <h1 className="text-3xl md:text-5xl font-serif text-black mb-2">Cheveux</h1>
          <div className="w-16 h-px bg-black mt-6" />
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={18} />
          <input
            type="text"
            placeholder="Rechercher des produits capillaires..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 focus:border-black/30 focus:outline-none text-sm text-black placeholder:text-black/30 tracking-wide transition-colors duration-200"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">

          {/* Filters Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white border border-black/8 p-6 sticky top-28">

              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-lg text-black">Filtres</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors duration-200"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              <div className="w-full h-px bg-black/8 mb-6" />

              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-[0.2em] text-black/40 mb-4">Type</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedSubcategory('')}
                    className={`w-full text-left px-3 py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
                      selectedSubcategory === ''
                        ? 'bg-black text-white'
                        : 'text-black/60 hover:bg-black/5'
                    }`}
                  >
                    Tous
                  </button>
                  {SUBCATEGORIES.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`w-full text-left px-3 py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
                        selectedSubcategory === sub
                          ? 'bg-black text-white'
                          : 'text-black/60 hover:bg-black/5'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-black/8 mb-6" />

              {/* Brand Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-black/40 mb-4">Marques</h3>
                <div className="space-y-1">
                  {BRANDS.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer hover:bg-black/5 px-2 py-1.5 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-3.5 h-3.5 border-black/20 accent-black"
                      />
                      <span className="text-xs tracking-wide text-black/60">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-black/8">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3">Filtres actifs</h3>
                  <div className="space-y-2">
                    {selectedSubcategory && (
                      <div className="flex items-center justify-between text-xs bg-black text-white px-3 py-1.5">
                        <span className="uppercase tracking-wider">{selectedSubcategory}</span>
                        <button onClick={() => setSelectedSubcategory('')} className="hover:opacity-60 ml-2">×</button>
                      </div>
                    )}
                    {selectedBrands.map((brand) => (
                      <div key={brand} className="flex items-center justify-between text-xs border border-black/20 text-black/60 px-3 py-1.5">
                        <span className="tracking-wide">{brand}</span>
                        <button onClick={() => toggleBrand(brand)} className="hover:opacity-60 ml-2">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Products Section */}
          <div className="md:col-span-3">

            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/10">
              <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-3">
                <label className="text-xs uppercase tracking-[0.15em] text-black/40">Trier par</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-black/10 text-xs uppercase tracking-wider text-black focus:outline-none focus:border-black/30 transition-colors duration-200 cursor-pointer"
                >
                  <option value="popularity">Popularité</option>
                  <option value="newest">Nouveautés</option>
                  <option value="price-asc">Prix: faible à élevé</option>
                  <option value="price-desc">Prix: élevé à faible</option>
                  <option value="rating">Évaluation</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white overflow-hidden animate-pulse border border-black/5">
                    <div className="h-64 bg-black/5" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-black/5 rounded w-2/3" />
                      <div className="h-4 bg-black/5 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-black/8">
                <p className="text-black/40 text-sm tracking-wide mb-4">
                  Aucun produit trouvé avec ces filtres
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs uppercase tracking-widest border border-black text-black px-6 py-2 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
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