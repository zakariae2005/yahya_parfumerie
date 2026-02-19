'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star, MessageCircle } from 'lucide-react'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    router.push('/cart')
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

 

  return (
    <div className="group bg-white overflow-hidden border border-black/8 hover:border-black/20 hover:shadow-lg transition-all duration-500">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-72 overflow-hidden bg-[#f5f5f3] cursor-pointer">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black/20 text-sm font-light italic tracking-wider">Pas d&apos;image</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          {product.brand && (
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-medium">
              {product.brand}
            </p>
          )}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-black/70 text-black/70'
                      : 'text-black/15'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-black/30 ml-1">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-medium text-black text-base line-clamp-2 leading-relaxed min-h-[2.5rem] mb-3">
          {product.name}
        </h3>

        {/* Thin divider */}
        <div className="w-8 h-px bg-black/20 mb-3" />

        <div className="mb-4">
          <p className="text-xl font-semibold text-black tracking-wide">
            {product.price.toFixed(2)} <span className="text-sm font-normal text-black/50">DH</span>
          </p>
        </div>

        {/* Two Action Buttons */}
        <div className="flex flex-col gap-2">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-none text-xs font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border ${
              isAdded
                ? 'bg-black border-black text-white'
                : 'bg-white border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            <ShoppingCart size={14} />
            <span>{isAdded ? 'Ajouté ✓' : 'Ajouter au panier'}</span>
          </button>

          {/* WhatsApp Button */}
         <button
          onClick={handleOrderNow}
          className="w-full py-2.5 px-4 rounded-none bg-black text-white text-xs font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:bg-black/80 border border-black"
        >
          <ShoppingCart size={14} />
          <span>Commander maintenant</span>
        </button>
        </div>
      </div>
    </div>
  )
}