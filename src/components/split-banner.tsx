'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'

export function SplitBanner() {
  const { t } = useLanguage()

  return (
    <section className="py-10 md:py-16 bg-[#f5f5f3] border-t border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header — same pattern as FeaturedProducts */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2">Univers</p>
          <h2 className="text-3xl md:text-4xl font-serif text-black">Explorez nos univers</h2>
          <div className="w-16 h-px bg-black mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skincare Panel */}
          <Link href="/products?category=skincare" className="block group">
            <div className="relative h-96 overflow-hidden">
              <Image
                src="/images/po1.jpeg"
                alt="Skincare"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay — matching hero's black/60 feel */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                {/* Thin line above */}
                <div className="w-8 h-px bg-white/40 mb-4 group-hover:w-16 transition-all duration-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">Collection</p>
                <h3 className="text-3xl md:text-4xl font-serif font-semibold text-white text-balance mb-6">
                  {t('bestOfSkincare')}
                </h3>
                {/* CTA — same as hero button */}
                <span className="border border-white/60 text-white text-xs uppercase tracking-widest px-8 py-2.5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  Découvrir
                </span>
              </div>
            </div>
          </Link>

          {/* Makeup Panel */}
          <Link href="/products?category=makeup" className="block group">
            <div className="relative h-96 overflow-hidden">
              <Image
                src="/images/po2.jpeg"
                alt="Makeup"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-500" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="w-8 h-px bg-white/40 mb-4 group-hover:w-16 transition-all duration-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">Collection</p>
                <h3 className="text-3xl md:text-4xl font-serif font-semibold text-white text-balance mb-6">
                  {t('topBrandsMakeup')}
                </h3>
                <span className="border border-white/60 text-white text-xs uppercase tracking-widest px-8 py-2.5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  Découvrir
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}