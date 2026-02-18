'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'

export function HeroSection() {
  const { t } = useLanguage()
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    '/images/hero1.jpeg',
    '/images/hero2.jpeg',
    '/images/hero3.jpeg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative w-full h-[500px] md:h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Images */}
      <div className="absolute inset-0 -z-20">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <Image
              src={image}
              alt={`Hero background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay — matching the black header/footer */}
      <div className="absolute inset-0 bg-black/60 -z-10 transition-opacity duration-1000" key={currentImage} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-white relative z-10">
        {/* Eyebrow label — same style as FeaturedProducts subtitle */}
        <p
          className="text-xs uppercase tracking-[0.4em] text-white/50 mb-4 animate-fade-in-up"
          key={`label-${currentImage}`}
        >
          Parfumerie Yahya
        </p>

        {/* Thin decorative divider — same as FeaturedProducts */}
        <div className="w-16 h-px bg-white/30 mx-auto mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }} />

        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 text-balance animate-fade-in-up"
          key={`title-${currentImage}`}
        >
          Beauté de Luxe
        </h1>

        <p
          className="text-sm md:text-base mb-10 max-w-xl mx-auto text-white/60 tracking-wide animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Découvrez notre collection exclusive de cosmétiques premium des plus grandes marques du monde
        </p>

        {/* CTA — same style as FeaturedProducts "View all" button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link href="/products">
            <button className="border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs px-10 py-3">
              {t('explorer')}
            </button>
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`transition-all duration-500 ${
              index === currentImage
                ? 'w-12 h-px bg-white'
                : 'w-4 h-px bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}