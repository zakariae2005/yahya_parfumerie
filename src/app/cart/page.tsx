'use client'

import React from "react"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, MessageCircle } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { useCartStore } from "@/store/cartStore"
import { generateWhatsAppLink } from "@/lib/whatsapp"

export default function CartPage() {
  const { t, isRTL } = useLanguage()
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const [showCheckout, setShowCheckout] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    promoCode: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppOrder = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      alert('Veuillez remplir tous les champs')
      return
    }

    const whatsappLink = generateWhatsAppLink(items, total, formData)
    window.open(whatsappLink, '_blank')
  }

  if (items.length === 0 && !showCheckout) {
    return (
      <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <h1 className="text-4xl font-serif font-semibold mb-8">Votre panier</h1>
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <h2 className="text-2xl font-serif font-semibold mb-4">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-6">Découvrez nos produits de luxe</p>
            <Link href="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                {t('explorer') || 'Explorer'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl font-serif font-semibold mb-8">Panier</h1>

        {!showCheckout ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-card rounded-lg p-6 border border-border flex gap-4"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg flex-shrink-0 relative overflow-hidden bg-muted">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                          <span className="text-xs text-muted-foreground">Pas d&apos;image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      {item.product.brand && (
                        <p className="text-xs text-muted-foreground font-medium mb-1">
                          {item.product.brand}
                        </p>
                      )}
                      <h3 className="font-serif font-semibold text-lg mb-2">
                        {item.product.name}
                      </h3>
                      <p className="text-lg font-semibold text-accent mb-3">
                        {item.product.price.toFixed(2)} DH
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 bg-primary rounded-lg w-fit px-3 py-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="hover:opacity-60"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="hover:opacity-60"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-semibold">
                        {(item.quantity * item.product.price).toFixed(2)} DH
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continuer les achats
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="font-serif font-semibold text-lg mb-6">
                  Résumé de la commande
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{total.toFixed(2)} DH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frais de port</span>
                    <span className="text-accent">Gratuit</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-accent">{total.toFixed(2)} DH</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Code promo"
                    value={formData.promoCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        promoCode: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold mb-3"
                  onClick={() => setShowCheckout(true)}
                >
                  Procéder au paiement
                </Button>

                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continuer les achats
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-8">
                <h2 className="font-serif font-semibold text-2xl mb-6">
                  Informations de livraison
                </h2>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+212 6 12 34 56 78"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Rue de la Paix"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Casablanca"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </form>

                <div className="mt-8 flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleWhatsAppOrder}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    <MessageCircle size={20} className="mr-2" />
                    Commander via WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="font-serif font-semibold text-lg mb-6">
                  Résumé de la commande
                </h2>

                <div className="space-y-3 max-h-96 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>{(item.quantity * item.product.price).toFixed(2)} DH</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-accent">{total.toFixed(2)} DH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}