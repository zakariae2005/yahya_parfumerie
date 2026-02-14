'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Share2, ChevronLeft, Star, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { useProductStore } from '@/store/productStore'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types/product'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const { t } = useLanguage()
  const resolvedParams = use(params)
  const { products, fetchProductById, fetchProducts } = useProductStore()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      const productData = await fetchProductById(resolvedParams.id)
      setProduct(productData)
      setLoading(false)
    }

    loadProduct()
  }, [resolvedParams.id, fetchProductById])

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [products.length, fetchProducts])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-32 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="h-96 md:h-[500px] bg-muted rounded-xl mb-4" />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-muted rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-24" />
                <div className="h-12 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-32" />
                <div className="h-8 bg-muted rounded w-24" />
                <div className="h-20 bg-muted rounded" />
                <div className="h-12 bg-muted rounded w-32" />
                <div className="h-12 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-semibold mb-2">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-4">Ce produit n&apos;existe pas ou a été supprimé.</p>
          <Link href="/products">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <Link href="/products" className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ChevronLeft size={16} />
          Retour aux produits
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="h-96 md:h-[500px] rounded-xl mb-4 relative overflow-hidden bg-muted">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <span className="text-muted-foreground">Pas d&apos;image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5" />
              <button className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-lg transition-all">
                <Heart size={20} className="text-accent" />
              </button>
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`h-24 rounded-lg border-2 transition-colors relative overflow-hidden bg-muted ${
                      selectedImage === idx ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {product.brand && (
              <p className="text-xs text-muted-foreground font-medium mb-2">{product.brand}</p>
            )}
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.reviews} avis)
              </span>
            </div>

            <p className="text-3xl font-semibold text-accent mb-6">
              {product.price.toFixed(2)} DH
            </p>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantité</label>
              <div className="flex items-center gap-4 bg-primary rounded-lg w-fit px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-lg font-semibold hover:opacity-60"
                >
                  −
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-lg font-semibold hover:opacity-60"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className={`flex-1 font-semibold transition-colors ${
                  isAdded 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-accent hover:bg-accent/90'
                } text-accent-foreground`}
              >
                {isAdded ? (
                  <>
                    <Check size={20} className="mr-2" />
                    Ajouté au panier
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" />
                    {t('addToCart')}
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline">
                <Share2 size={20} />
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-serif font-semibold mb-4">Détails du produit</h3>
              <ul className="space-y-3 text-sm">
                {product.category && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Catégorie:</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </li>
                )}
                {product.subcategory && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Sous-catégorie:</span>
                    <span className="font-medium capitalize">{product.subcategory}</span>
                  </li>
                )}
                {product.brand && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Marque:</span>
                    <span className="font-medium">{product.brand}</span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Prix:</span>
                  <span className="font-medium">{product.price.toFixed(2)} DH</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Note moyenne:</span>
                  <span className="font-medium">{product.rating.toFixed(1)}/5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-semibold mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relProduct) => (
                <Link key={relProduct.id} href={`/products/${relProduct.id}`}>
                  <div className="group bg-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="h-48 md:h-56 relative overflow-hidden bg-muted">
                      {relProduct.images && relProduct.images.length > 0 ? (
                        <Image
                          src={relProduct.images[0]}
                          alt={relProduct.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                          <span className="text-muted-foreground text-sm">Pas d&apos;image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5" />
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Heart size={18} className="text-accent" />
                      </button>
                    </div>

                    <div className="p-4">
                      {relProduct.brand && (
                        <p className="text-xs text-muted-foreground mb-1 font-medium">
                          {relProduct.brand}
                        </p>
                      )}
                      <h3 className="font-serif font-semibold text-base mb-2 line-clamp-2">
                        {relProduct.name}
                      </h3>
                      <p className="text-lg font-semibold text-accent mb-3">
                        {relProduct.price.toFixed(2)} DH
                      </p>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(relProduct.rating)
                                ? 'fill-accent text-accent'
                                : 'text-muted-foreground'
                            }
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({relProduct.reviews})
                        </span>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          addItem(relProduct, 1)
                        }}
                        className="w-full py-2 px-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <ShoppingCart size={14} />
                        <span className="hidden sm:inline text-xs">Ajouter</span>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-3xl font-serif font-semibold mb-8">Avis clients</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold text-accent">
                    SM
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Sophie Martin</p>
                    <p className="text-xs text-muted-foreground">Achat vérifié</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground">Produit exceptionnel et livraison très rapide. Je suis ravie de la qualité!</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}