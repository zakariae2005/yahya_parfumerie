'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function FeaturedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 md:py-16 bg-black border-t border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: Image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Sharp-cornered image — no rounded-xl, matching card style */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/hair.jpg"
                alt="Hair styling tools collection"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Dark overlay — consistent with hero & split banner */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Decorative thin line — same motif as all sections */}
            <div className="w-16 h-px bg-white/20 mt-6" />
          </div>

          {/* Right: Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            {/* Eyebrow label — same as FeaturedProducts / SplitBanner */}
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Appareils Électriques</p>

            {/* Thin divider */}
            <div className="w-16 h-px bg-white/20" />

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white leading-tight">
              Bouclez, Lissez et Soufflez
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-xl tracking-wide">
              Explorez nos collections de sèche-cheveux, lisseurs, boucleurs et brosses soufflantes en un clic !
            </p>

            <p className="text-sm text-white/80 font-medium tracking-wide">
              Tout en bénéficiant de 2 ans de garantie
            </p>

            {/* CTA — same style as hero button, inverted for dark bg */}
            <div className="pt-4">
              <Link href="/appareils">
                <button className="group border border-white/60 text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs px-10 py-3 flex items-center gap-3">
                  DÉCOUVRIR
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}