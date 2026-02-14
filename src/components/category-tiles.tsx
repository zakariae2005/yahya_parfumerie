'use client'

import Link from 'next/link'
import Image from 'next/image'

export function CategoryTiles() {
  const categories = [
    { label: 'VISAGE', subcategory: 'Teint', image: '/images/f.jpg' },
    { label: 'YEUX', subcategory: 'Yeux', image: '/images/e.jpg' },
    { label: 'LEVRES', subcategory: 'Lèvres', image: '/images/l.jpg' },
  ]

  return (
    <section className="py-16 md:py-20 bg-background max-w-7xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">Parcourir par catégorie</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.subcategory} 
            href={`/maquillage?subcategory=${encodeURIComponent(category.subcategory)}`}
          >
            <div className="h-64 md:h-80 rounded-xl overflow-hidden group cursor-pointer relative">
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white text-shadow">
                  {category.label}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}