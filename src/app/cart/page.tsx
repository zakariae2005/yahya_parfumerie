'use client'

import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { useCartStore, useCartTotal } from "@/store/cartStore"
import { generateWhatsAppLink } from "@/lib/whatsapp"

export default function CartPage() {
  const { t, isRTL } = useLanguage()
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const total = useCartTotal()

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      alert('Votre panier est vide')
      return
    }
    const whatsappLink = generateWhatsAppLink(items, total)
    window.open(whatsappLink, '_blank')
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className={`min-h-screen bg-[#f5f5f3] ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

          {/* Page Header */}
          <div className="mb-10 border-b border-black/10 pb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Boutique</p>
            <h1 className="text-3xl md:text-5xl font-serif text-black">Votre panier</h1>
            <div className="w-16 h-px bg-black mt-6" />
          </div>

          <div className="bg-white border border-black/8 p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-8 border border-black/10 flex items-center justify-center">
              <ShoppingBag size={32} className="text-black/30" />
            </div>
            <h2 className="text-2xl font-serif text-black mb-3">Votre panier est vide</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-10">Découvrez nos produits de luxe</p>
            <Link href="/products">
              <button className="border border-black text-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-xs px-10 py-3">
                {t('explorer') || 'Explorer'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-[#f5f5f3] ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        {/* Page Header */}
        <div className="mb-10 border-b border-black/10 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Boutique</p>
          <h1 className="text-3xl md:text-5xl font-serif text-black">Panier</h1>
          <div className="w-16 h-px bg-black mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white border border-black/8 hover:border-black/20 transition-colors duration-300 p-6 flex gap-5"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden bg-[#f5f5f3] border border-black/5">
                    {item.product.images && item.product.images.length > 0 ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-black/20 italic">Pas d&apos;image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    {item.product.brand && (
                      <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-1">
                        {item.product.brand}
                      </p>
                    )}
                    <h3 className="font-serif text-base text-black mb-2 leading-snug">
                      {item.product.name}
                    </h3>

                    {/* Thin divider */}
                    <div className="w-8 h-px bg-black/20 mb-3" />

                    <p className="text-sm font-semibold text-black mb-4 tracking-wide">
                      {item.product.price.toFixed(2)} <span className="font-normal text-black/40">DH</span>
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-black/20 w-fit">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-black hover:text-white transition-colors duration-200"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-black border-x border-black/20 py-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-black hover:text-white transition-colors duration-200"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-semibold text-base text-black tracking-wide">
                      {(item.quantity * item.product.price).toFixed(2)} <span className="text-xs font-normal text-black/40">DH</span>
                    </p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-black/30 hover:text-black transition-colors duration-200"
                      aria-label="Supprimer du panier"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link href="/products">
                <button className="w-full border border-black/20 text-black/60 hover:border-black hover:text-black transition-all duration-300 uppercase tracking-widest text-xs py-3">
                  Continuer les achats
                </button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-black/8 p-6 sticky top-28">

              <h2 className="font-serif text-xl text-black mb-6">Résumé</h2>
              <div className="w-full h-px bg-black/8 mb-6" />

              {/* Line items */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-[0.15em] text-black/40">Sous-total</span>
                  <span className="text-sm font-medium text-black">{total.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-[0.15em] text-black/40">Livraison</span>
                  <span className="text-xs uppercase tracking-wider text-black/60">Gratuite</span>
                </div>
              </div>

              <div className="w-full h-px bg-black/8 mb-6" />

              {/* Total */}
              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-lg text-black">Total</span>
                <span className="font-serif text-2xl font-semibold text-black">
                  {total.toFixed(2)} <span className="text-sm font-normal text-black/40">DH</span>
                </span>
              </div>

              {/* WhatsApp Checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-black text-white hover:bg-black/80 transition-all duration-300 uppercase tracking-widest text-xs py-4 flex items-center justify-center gap-3 mb-4"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Commander via WhatsApp
              </button>

              <p className="text-xs text-center text-black/30 tracking-wide">
                Vous serez redirigé vers WhatsApp pour finaliser votre commande
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}