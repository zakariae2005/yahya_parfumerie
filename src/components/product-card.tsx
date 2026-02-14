'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 cursor-pointer">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-300 text-sm font-light italic">Pas d&apos;image</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between">
          {product.brand && (
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
              {product.brand}
            </p>
          )}
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
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-medium text-gray-900 text-base line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="mb-4">
          <p className="text-xl font-semibold text-gray-900">
            {product.price.toFixed(2)} DH
          </p>
        </div>

        <div className="flex flex-col">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
              isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
            <span>{isAdded ? 'Ajouté ✓' : 'Ajouter au panier'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}