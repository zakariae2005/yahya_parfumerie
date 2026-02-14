'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      id: 1,
      name: 'Sophie Martin',
      text: 'Produits exceptionnels et livraison très rapide. Je suis ravie de la qualité !',
      rating: 5,
      image: 'SM',
    },
    {
      id: 2,
      name: 'Marie Dupont',
      text: 'Excellent service client et produits authentiques. Je recommande vivement !',
      rating: 5,
      image: 'MD',
    },
    {
      id: 3,
      name: 'Claire Laurent',
      text: 'Superbe sélection de marques de luxe. Prochaine commande déjà prévue.',
      rating: 5,
      image: 'CL',
    },
    {
      id: 4,
      name: 'Éva Rousseau',
      text: 'Site très agréable et facilité de navigation. Paiement sécurisé. Merci !',
      rating: 5,
      image: 'ER',
    },
    {
      id: 5,
      name: 'Nina Lefevre',
      text: 'Les meilleurs prix pour les cosmétiques de qualité. Je suis cliente régulière.',
      rating: 5,
      image: 'NL',
    },
  ]

  const itemsPerView = 3
  const maxIndex = Math.max(0, reviews.length - itemsPerView)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className=" bg-background max-w-7xl mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-serif">Avis clients</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 hover:bg-primary rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-primary rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all"
          >
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className="text-accent text-lg">
                  ★
                </span>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
              {review.text}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold text-accent">
                {review.image}
              </div>
              <div>
                <p className="font-semibold text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground">Client vérifié</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
