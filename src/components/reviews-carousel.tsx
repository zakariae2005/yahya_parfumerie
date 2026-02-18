'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    { id: 1, name: 'Sophie Martin', text: 'Produits exceptionnels et livraison très rapide. Je suis ravie de la qualité !', rating: 5, image: 'SM' },
    { id: 2, name: 'Marie Dupont', text: 'Excellent service client et produits authentiques. Je recommande vivement !', rating: 5, image: 'MD' },
    { id: 3, name: 'Claire Laurent', text: 'Superbe sélection de marques de luxe. Prochaine commande déjà prévue.', rating: 5, image: 'CL' },
    { id: 4, name: 'Éva Rousseau', text: 'Site très agréable et facilité de navigation. Paiement sécurisé. Merci !', rating: 5, image: 'ER' },
    { id: 5, name: 'Nina Lefevre', text: 'Les meilleurs prix pour les cosmétiques de qualité. Je suis cliente régulière.', rating: 5, image: 'NL' },
  ]

  const itemsPerView = 3
  const maxIndex = Math.max(0, reviews.length - itemsPerView)

  const handleNext = () => setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-10 md:py-16 bg-[#f5f5f3] border-t border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header — same pattern as FeaturedProducts */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Témoignages</p>
            <h2 className="text-3xl md:text-4xl font-serif text-black">Avis clients</h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center border border-black/20 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center border border-black/20 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Thin decorative divider */}
        <div className="w-16 h-px bg-black mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-black/8 hover:border-black/20 hover:shadow-md transition-all duration-300 p-6"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-black/70 text-sm">★</span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-black/50 mb-6 leading-relaxed text-sm line-clamp-3 tracking-wide">
                {review.text}
              </p>

              {/* Thin divider */}
              <div className="w-8 h-px bg-black/20 mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-black/20 flex items-center justify-center text-xs font-semibold text-black/40 tracking-wider">
                  {review.image}
                </div>
                <div>
                  <p className="text-sm font-medium text-black tracking-wide">{review.name}</p>
                  <p className="text-xs text-black/30 uppercase tracking-[0.2em]">Client vérifié</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}