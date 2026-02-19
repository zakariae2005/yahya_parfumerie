'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Share2, ChevronLeft, Star, Check, Plus, Minus } from 'lucide-react'
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
    if (products.length === 0) fetchProducts()
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
      <div className="min-h-screen bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="animate-pulse">
            <div className="h-3 bg-black/5 w-32 mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="h-96 md:h-[500px] bg-black/5 mb-3" />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-black/5" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-3 bg-black/5 w-24" />
                <div className="h-10 bg-black/5 w-3/4" />
                <div className="h-4 bg-black/5 w-32" />
                <div className="h-8 bg-black/5 w-24" />
                <div className="h-20 bg-black/5" />
                <div className="h-10 bg-black/5 w-32" />
                <div className="h-12 bg-black/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not found
  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f5f3] flex items-center justify-center">
        <div className="text-center bg-white border border-black/8 p-16">
          <h1 className="text-2xl font-serif text-black mb-3">Produit non trouvé</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-8">Ce produit n&apos;existe pas ou a été supprimé.</p>
          <Link href="/products">
            <button className="border border-black text-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-xs px-8 py-3">
              Retour aux produits
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        {/* Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors duration-200 mb-10"
        >
          <ChevronLeft size={14} />
          Retour aux produits
        </Link>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

          {/* Image Gallery */}
          <div>
            <div className="relative h-96 md:h-[520px] overflow-hidden bg-white border border-black/8 mb-3">
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-black/20 italic">Pas d&apos;image</span>
                </div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`h-24 relative overflow-hidden border-2 transition-colors duration-200 ${
                      selectedImage === idx ? 'border-black' : 'border-black/10 hover:border-black/30'
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
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-3">{product.brand}</p>
            )}

            <h1 className="text-3xl md:text-4xl font-serif text-black mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'fill-black/70 text-black/70' : 'text-black/15'}
                  />
                ))}
              </div>
              <span className="text-xs text-black/40 tracking-wide">
                {product.rating.toFixed(1)} ({product.reviews} avis)
              </span>
            </div>

            {/* Thin divider */}
            <div className="w-16 h-px bg-black mb-6" />

            {/* Price */}
            <p className="text-3xl font-serif font-semibold text-black mb-6 tracking-wide">
              {product.price.toFixed(2)} <span className="text-base font-normal text-black/40">DH</span>
            </p>

            {product.description && (
              <p className="text-sm text-black/50 leading-relaxed mb-8 tracking-wide">
                {product.description}
              </p>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-[0.2em] text-black/40 mb-3">Quantité</label>
              <div className="flex items-center border border-black/20 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-black hover:text-white transition-colors duration-200"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-medium text-black border-x border-black/20 py-3">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-black hover:text-white transition-colors duration-200"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  isAdded
                    ? 'bg-black text-white'
                    : 'border border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={14} />
                    Ajouté au panier
                  </>
                ) : (
                  <>
                    <ShoppingCart size={14} />
                    {t('addToCart')}
                  </>
                )}
              </button>
              <button className="border border-black/20 text-black/40 hover:border-black hover:text-black transition-all duration-300 px-4">
                <Share2 size={16} />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-black/10 pt-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-black/40 mb-4">Détails du produit</h3>
              <ul className="space-y-3">
                {product.category && (
                  <li className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-[0.15em] text-black/40">Catégorie</span>
                    <span className="text-xs font-medium text-black uppercase tracking-wider">{product.category}</span>
                  </li>
                )}
                {product.subcategory && (
                  <li className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-[0.15em] text-black/40">Sous-catégorie</span>
                    <span className="text-xs font-medium text-black">{product.subcategory}</span>
                  </li>
                )}
                {product.brand && (
                  <li className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-[0.15em] text-black/40">Marque</span>
                    <span className="text-xs font-medium text-black">{product.brand}</span>
                  </li>
                )}
                <li className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-[0.15em] text-black/40">Prix</span>
                  <span className="text-xs font-medium text-black">{product.price.toFixed(2)} DH</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-[0.15em] text-black/40">Note moyenne</span>
                  <span className="text-xs font-medium text-black">{product.rating.toFixed(1)}/5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-black/10 pt-16 mb-20">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Vous aimerez aussi</p>
              <h2 className="text-3xl font-serif text-black">Produits similaires</h2>
              <div className="w-16 h-px bg-black mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link key={relProduct.id} href={`/products/${relProduct.id}`}>
                  <div className="group bg-white border border-black/8 hover:border-black/20 hover:shadow-md transition-all duration-300">
                    <div className="h-48 md:h-56 relative overflow-hidden bg-[#f5f5f3]">
                      {relProduct.images && relProduct.images.length > 0 ? (
                        <Image
                          src={relProduct.images[0]}
                          alt={relProduct.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-black/20 italic">Pas d&apos;image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {relProduct.brand && (
                        <p className="text-xs uppercase tracking-[0.15em] text-black/40 mb-1">{relProduct.brand}</p>
                      )}
                      <h3 className="font-medium text-black text-sm mb-2 line-clamp-2 leading-relaxed">
                        {relProduct.name}
                      </h3>
                      <div className="w-6 h-px bg-black/20 mb-2" />
                      <p className="text-base font-semibold text-black mb-3">
                        {relProduct.price.toFixed(2)} <span className="text-xs font-normal text-black/40">DH</span>
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          addItem(relProduct, 1)
                        }}
                        className="w-full py-2 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={12} />
                        Ajouter
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="border-t border-black/10 pt-16">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Témoignages</p>
            <h2 className="text-3xl font-serif text-black">Avis clients</h2>
            <div className="w-16 h-px bg-black mt-6" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="bg-white border border-black/8 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 border border-black/20 flex items-center justify-center text-xs font-semibold text-black/40 flex-shrink-0">
                    SM
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black tracking-wide">Sophie Martin</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-black/30">Achat vérifié</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-black/70 text-black/70" />
                  ))}
                </div>
                <div className="w-8 h-px bg-black/20 mb-3" />
                <p className="text-sm text-black/50 leading-relaxed tracking-wide">
                  Produit exceptionnel et livraison très rapide. Je suis ravie de la qualité!
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}