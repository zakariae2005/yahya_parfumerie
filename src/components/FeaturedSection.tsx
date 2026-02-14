'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function FeaturedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-20 overflow-hidden bg-background"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Replace with your actual image */}
              <Image
                src="/images/hair.jpg"
                alt="Hair styling tools collection"
                fill
                className="object-cover"
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
            </div>

            {/* Floating accent element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse-slow" />
          </div>

          {/* Right: Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight">
              Bouclez, Lissez et Soufflez
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Explorez nos collections de sèche-cheveux, lisseurs, boucleurs et brosses soufflantes en un clic !
              <br />
              <span className="text-foreground font-medium mt-2 inline-block">
                Tout en bénéficiant de 2 ans de garantie
              </span>
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/appareils">
                <Button
                  size="lg"
                  className="group bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-full"
                >
                  DÉCOUVRIR
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Decorative line element */}
            <div className="pt-8">
              <div className="w-24 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}