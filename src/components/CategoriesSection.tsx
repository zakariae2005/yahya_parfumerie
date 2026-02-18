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
    { name: 'Maquillage', href: '/products/maquillage', image: '/images/m1.jpg' },
    { name: 'Soins Cheveux', href: '/products/cheveux', image: '/images/h1.jpg' },
    { name: 'Soin de Visage', href: '/products/soin-de-visage', image: '/images/c1.jpg' },
    { name: 'Corps & Douche', href: '/products/corps-douche', image: '/images/s11.jpg' },
    { name: 'Parfums', href: '/products/parfum', image: '/images/pa.jpg' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 md:py-16 bg-[#f5f5f3] border-t border-b border-black/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header — same pattern as FeaturedProducts */}
        <div
          className={`mb-10 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Univers</p>
          <h2 className="text-3xl md:text-4xl font-serif text-black">Toutes les Catégories</h2>
          <div className="w-16 h-px bg-black mt-6" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group flex flex-col items-center transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Square image — sharp corners matching card style */}
              <div className="relative w-full aspect-square overflow-hidden mb-4 border border-black/8 group-hover:border-black/20 transition-all duration-500">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay on hover — matching hero & split banner */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Centered label overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="border border-white text-white text-xs uppercase tracking-widest px-4 py-2">
                    Voir
                  </span>
                </div>
              </div>

              {/* Category Name */}
              <h3 className="text-sm font-medium text-black uppercase tracking-[0.15em] text-center transition-colors duration-300 group-hover:text-black/50">
                {category.name}
              </h3>

              {/* Underline — same thin line motif */}
              <div className="mt-2 h-px w-0 bg-black transition-all duration-500 group-hover:w-8" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}