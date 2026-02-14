'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useProductStore } from '@/store/productStore'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'

export function SpecialOffers() {
  const { t } = useLanguage()
  const { products, loading, error, fetchProducts } = useProductStore()
  const { addItem } = useCartStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addedProductId, setAddedProductId] = useState<string | null>(null)

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    
    // Show feedback
    setAddedProductId(product.id)
    setTimeout(() => setAddedProductId(null), 2000)
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView)

  // Loading state
  if (loading) {
    return (
      <section className="py-8 md:py-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">Offres spéciales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 md:h-56 bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-5 bg-muted rounded w-1/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-9 bg-muted rounded" />
                    <div className="h-9 bg-muted rounded" />
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
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">Offres spéciales</h2>
          <div className="text-center py-12 bg-card rounded-xl">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchProducts} variant="outline">
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
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">Offres spéciales</h2>
          <div className="text-center py-12 bg-card rounded-xl">
            <p className="text-muted-foreground mb-4">Aucun produit disponible pour le moment</p>
            <Link href="/admin">
              <Button variant="outline">Ajouter des produits</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
   <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif">Produits les plus vendus</h2>
        </div>
        
        {products.length > itemsPerView && (
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={handlePrev}
              className="p-2 hover:bg-primary rounded-lg transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 hover:bg-primary rounded-lg transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              {/* Product Image */}
              <Link href={`/products/${product.id}`}>
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 cursor-pointer">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-300 text-sm font-light italic">Pas d&apos;image</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-5">
                <div className='flex items-center justify-between'>
                  {/* Brand */}
                  {product.brand && (
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
                      {product.brand}
                    </p>
                  )}
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
       
                {/* Product Name */}
                <h3 className="font-medium text-gray-900 text-base line-clamp-2 leading-relaxed min-h-[2.5rem]">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-xl font-semibold text-gray-900">
                    {product.price.toFixed(2)} DH
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col">
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`w-full py-2.5 px-4 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                      addedProductId === product.id 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
                    <span>{addedProductId === product.id ? 'Ajouté ✓' : t('addToCart')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              {t('viewAllProducts')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}