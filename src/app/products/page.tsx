'use client'

import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { ProductCard } from '@/components/product-card'

const CATEGORIES_WITH_SUBCATEGORIES = {
  'PARFUM': ['Parfum Femme', 'Parfum Homme'],
  'MAQUILLAGE': ['Teint', 'Yeux', 'Sourcils', 'Lèvres', 'Ongles', 'Palette Maquillage'],
  'CHEVEUX': ['Soins Cheveux', 'Coloration'],
  'SOIN DE VISAGE': [],
  'CORPS & DOUCHE': [],
  'Appareils Électriques': []
}

export default function ProductsPage() {
  const { products, fetchProducts, loading } = useProductStore()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0 && product.category && !selectedCategories.includes(product.category)) return false
    if (selectedSubcategories.length > 0 && product.subcategory && !selectedSubcategories.includes(product.subcategory)) return false
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      return (
        product.name.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search)
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
      case 'name-asc': return a.name.localeCompare(b.name)
      case 'name-desc': return b.name.localeCompare(a.name)
      default: return b.reviews - a.reviews
    }
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
      if (!newCategories.includes(category)) {
        const subcats = (CATEGORIES_WITH_SUBCATEGORIES[category as keyof typeof CATEGORIES_WITH_SUBCATEGORIES] || []) as string[]
        setSelectedSubcategories((prevSub) => prevSub.filter((sub) => !subcats.includes(sub)))
      }
      return newCategories
    })
  }

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((s) => s !== subcategory) : [...prev, subcategory]
    )
  }

  const toggleCategoryExpanded = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSubcategories([])
    setSearchTerm('')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedSubcategories.length > 0

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        {/* Page Header — same pattern as all sections */}
        <div className="mb-10 border-b border-black/10 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Catalogue</p>
          <h1 className="text-3xl md:text-5xl font-serif text-black mb-2">Tous les produits</h1>
          <div className="w-16 h-px bg-black mt-6" />
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={18} />
          <input
            type="text"
            placeholder="Rechercher des produits..."
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

              {/* Thin divider */}
              <div className="w-full h-px bg-black/8 mb-6" />

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-[0.2em] text-black/40 mb-4">Catégories</h3>
                <div className="space-y-1">
                  {Object.entries(CATEGORIES_WITH_SUBCATEGORIES).map(([category, subcategories]) => (
                    <div key={category}>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-black/5 px-2 py-1.5 transition-colors flex-1">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-3.5 h-3.5 border-black/20 text-black focus:ring-black/20 accent-black"
                          />
                          <span className="text-xs uppercase tracking-[0.15em] text-black/70">{category}</span>
                        </label>
                        {subcategories.length > 0 && (
                          <button
                            onClick={() => toggleCategoryExpanded(category)}
                            className="p-1 hover:bg-black/5 transition-colors"
                          >
                            {expandedCategories.includes(category)
                              ? <ChevronUp size={14} className="text-black/30" />
                              : <ChevronDown size={14} className="text-black/30" />}
                          </button>
                        )}
                      </div>

                      {/* Subcategories */}
                      {subcategories.length > 0 && expandedCategories.includes(category) && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-black/10 pl-3">
                          {subcategories.map((subcategory) => (
                            <label
                              key={subcategory}
                              className="flex items-center gap-2 cursor-pointer hover:bg-black/5 px-2 py-1 transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSubcategories.includes(subcategory)}
                                onChange={() => toggleSubcategory(subcategory)}
                                disabled={!selectedCategories.includes(category)}
                                className="w-3.5 h-3.5 border-black/20 accent-black disabled:opacity-30"
                              />
                              <span className="text-xs text-black/40 tracking-wide">
                                {subcategory}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-black/8">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3">Filtres actifs</h3>
                  <div className="space-y-2">
                    {selectedCategories.map((cat) => (
                      <div key={cat} className="flex items-center justify-between text-xs bg-black text-white px-3 py-1.5">
                        <span className="uppercase tracking-wider">{cat}</span>
                        <button onClick={() => toggleCategory(cat)} className="hover:opacity-60 ml-2">×</button>
                      </div>
                    ))}
                    {selectedSubcategories.map((sub) => (
                      <div key={sub} className="flex items-center justify-between text-xs border border-black/20 text-black/60 px-3 py-1.5">
                        <span className="tracking-wide">{sub}</span>
                        <button onClick={() => toggleSubcategory(sub)} className="hover:opacity-60 ml-2">×</button>
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
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
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
                  <option value="name-asc">Nom: A-Z</option>
                  <option value="name-desc">Nom: Z-A</option>
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
                  {hasActiveFilters || searchTerm
                    ? 'Aucun produit trouvé avec ces filtres'
                    : 'Aucun produit disponible pour le moment'}
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