'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useProductStore } from '@/store/productStore'
import { ProductCard } from '@/components/product-card'

export function FeaturedProducts() {
  const { t } = useLanguage()
  const { products, loading, error, fetchProducts } = useProductStore()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const itemsPerView = 4
  const maxIndex = Math.max(0, products.length - itemsPerView)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView)

  // Loading state
  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-[#f5f5f3] border-t border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-black">Produits en vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse border border-black/5 shadow-sm">
                <div className="h-48 md:h-56 bg-black/5" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-black/5 rounded w-1/3" />
                  <div className="h-4 bg-black/5 rounded w-2/3" />
                  <div className="h-5 bg-black/5 rounded w-1/4" />
                  <div className="h-3 bg-black/5 rounded w-1/2" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-9 bg-black/5 rounded" />
                    <div className="h-9 bg-black/5 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 md:py-20 bg-[#f5f5f3] border-t border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-black">Produits en vedette</h2>
          <div className="text-center py-12 bg-white rounded-xl border border-black/5 shadow-sm">
            <p className="text-red-500 mb-4">{error}</p>
            <Button
              onClick={fetchProducts}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              Réessayer
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // Empty state
  if (products.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-[#f5f5f3] border-t border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-black">Produits en vedette</h2>
          <div className="text-center py-12 bg-white rounded-xl border border-black/5 shadow-sm">
            <p className="text-black/50 mb-4">Aucun produit disponible pour le moment</p>
            <Link href="/admin">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                Ajouter des produits
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 md:py-16 bg-[#f5f5f3] border-t border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Collection</p>
            <h2 className="text-3xl md:text-4xl font-serif text-black">Produits les plus vendus</h2>
          </div>

          {/* Navigation arrows — moved to header row */}
          {products.length > itemsPerView && (
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center border border-black/20 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                aria-label="Précédent"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center border border-black/20 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                aria-label="Suivant"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Thin decorative divider */}
        <div className="w-16 h-px bg-black mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-black text-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-xs px-10"
            >
              {t('viewAllProducts')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}