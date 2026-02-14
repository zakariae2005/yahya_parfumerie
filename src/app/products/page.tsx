'use client'

import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { ProductCard } from '@/components/product-card'

const BRANDS = ['Dior', 'Chanel', "L'Oréal", 'Estée Lauder', 'MAC', 'Lancôme', 'Clinique']

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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategories.length > 0 && product.category && !selectedCategories.includes(product.category)) {
      return false
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0 && product.subcategory && !selectedSubcategories.includes(product.subcategory)) {
      return false
    }

    // Brand filter
    if (selectedBrands.length > 0 && product.brand && !selectedBrands.includes(product.brand)) {
      return false
    }

    // Search filter
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

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return b.reviews - a.reviews // popularity
    }
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
      
      // If unchecking a category, also remove its subcategories
      if (!newCategories.includes(category)) {
        const subcats = (CATEGORIES_WITH_SUBCATEGORIES[category as keyof typeof CATEGORIES_WITH_SUBCATEGORIES] || []) as string[]
        setSelectedSubcategories((prevSub) => 
          prevSub.filter((sub) => !subcats.includes(sub))
        )
      }
      
      return newCategories
    })
  }

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const toggleCategoryExpanded = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSubcategories([])
    setSelectedBrands([])
    setSearchTerm('')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedSubcategories.length > 0 || selectedBrands.length > 0

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
            Tous les produits
          </h1>
          <p className="text-muted-foreground">
            Découvrez notre collection complète de produits de beauté
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-semibold text-lg">Filtres</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-accent hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Categories Filter with Subcategories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Catégories</h3>
                <div className="space-y-1">
                  {Object.entries(CATEGORIES_WITH_SUBCATEGORIES).map(([category, subcategories]) => (
                    <div key={category}>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-secondary px-2 py-1.5 rounded transition-colors flex-1">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                        {subcategories.length > 0 && (
                          <button
                            onClick={() => toggleCategoryExpanded(category)}
                            className="p-1 hover:bg-secondary rounded transition-colors"
                          >
                            {expandedCategories.includes(category) ? (
                              <ChevronUp size={16} className="text-muted-foreground" />
                            ) : (
                              <ChevronDown size={16} className="text-muted-foreground" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Subcategories */}
                      {subcategories.length > 0 && expandedCategories.includes(category) && (
                        <div className="ml-6 mt-1 space-y-1 border-l-2 border-border pl-2">
                          {subcategories.map((subcategory) => (
                            <label
                              key={subcategory}
                              className="flex items-center gap-2 cursor-pointer hover:bg-secondary px-2 py-1 rounded transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSubcategories.includes(subcategory)}
                                onChange={() => toggleSubcategory(subcategory)}
                                disabled={!selectedCategories.includes(category)}
                                className="w-4 h-4 rounded border-border text-accent focus:ring-accent disabled:opacity-50"
                              />
                              <span className="text-sm text-muted-foreground">
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

              {/* Brands Filter */}
              <div>
                <h3 className="font-medium mb-3">Marques</h3>
                <div className="space-y-2">
                  {BRANDS.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer hover:bg-secondary px-2 py-1 rounded transition-colors"
                    >
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

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-medium mb-3 text-sm">Filtres actifs:</h3>
                  <div className="space-y-2">
                    {selectedCategories.map((cat) => (
                      <div
                        key={cat}
                        className="flex items-center justify-between text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                      >
                        <span>{cat}</span>
                        <button
                          onClick={() => toggleCategory(cat)}
                          className="hover:opacity-70"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {selectedSubcategories.map((sub) => (
                      <div
                        key={sub}
                        className="flex items-center justify-between text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                      >
                        <span>{sub}</span>
                        <button
                          onClick={() => toggleSubcategory(sub)}
                          className="hover:opacity-70"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {selectedBrands.map((brand) => (
                      <div
                        key={brand}
                        className="flex items-center justify-between text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                      >
                        <span>{brand}</span>
                        <button
                          onClick={() => toggleBrand(brand)}
                          className="hover:opacity-70"
                        >
                          ×
                        </button>
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="text-sm text-muted-foreground">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Trier par:</label>
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
                  <option value="name-asc">Nom: A-Z</option>
                  <option value="name-desc">Nom: Z-A</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
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
                <p className="text-muted-foreground mb-4">
                  {hasActiveFilters || searchTerm
                    ? 'Aucun produit trouvé avec ces filtres'
                    : 'Aucun produit disponible pour le moment'}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-accent hover:underline font-medium"
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