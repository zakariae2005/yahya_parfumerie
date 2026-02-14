'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Category {
  name: string
  href: string
  image: string
}

export function CategoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const categories: Category[] = [
    {
      name: 'Maquillage',
      href: '/products/maquillage',
      image: '/images/m1.jpg',
    },
    {
      name: 'Soins Cheveux',
      href: '/products/cheveux',
      image: '/images/h1.jpg',
    },
    {
      name: 'Soin de Visage',
      href: '/products/soin-de-visage',
      image: '/images/c1.jpg',
    },
    {
      name: 'Corps & Douche',
      href: '/products/corps-douche',
      image: '/images/s11.jpg',
    },
    {
      name: 'Parfums',
      href: '/products/parfum',
      image: '/images/pa.jpg',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
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
      className="relative w-full py-16 md:py-24 bg-background overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground">
            Toutes les Catégories
          </h2>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group flex flex-col items-center transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Circular Image Container */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-4 md:mb-6">
                {/* Hover Ring Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-110" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-accent/0 group-hover:border-accent/30 transition-all duration-500 scale-100 group-hover:scale-110" />
              </div>

              {/* Category Name */}
              <h3 className="text-base md:text-lg font-semibold text-foreground text-center transition-colors duration-300 group-hover:text-accent">
                {category.name}
              </h3>

              {/* Underline Animation */}
              <div className="mt-2 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full rounded-full" />
            </Link>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div
          className={`mt-16 flex justify-center transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div 
              className="w-2 h-2 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
            <div 
              className="w-2 h-2 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}