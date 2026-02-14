'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'

export function HeroSection() {
  const { t } = useLanguage()
  const [currentImage, setCurrentImage] = useState(0)

  // Array of background images
  const images = [
    '/images/hero1.jpeg', // Replace with your actual image paths
    '/images/hero2.jpeg',
    '/images/hero3.jpeg',
  ]

  useEffect(() => {
    // Auto-advance slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background Images with Smooth Transitions */}
      <div className="absolute inset-0 -z-20">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImage
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
            style={{
              transitionProperty: 'opacity, transform',
            }}
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

      {/* Dark Overlay with Animated Opacity */}
      <div 
        className="absolute inset-0 bg-black/40 -z-10 transition-opacity duration-1000"
        key={currentImage}
      />

      {/* Decorative Elements with Pulse Animation */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '4s' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '4s', animationDelay: '2s' }}
      />

      {/* Content with Fade-in Animation */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-white relative z-10">
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 text-balance animate-fade-in-up"
          key={`title-${currentImage}`}
        >
          Beauté de Luxe
        </h1>

        <p 
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-balance text-white/90 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Découvrez notre collection exclusive de cosmétiques premium des plus grandes marques du monde
        </p>

        <div 
          className="animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Link href="/products">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t('explorer')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentImage
                ? 'w-12 h-2 bg-accent'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}