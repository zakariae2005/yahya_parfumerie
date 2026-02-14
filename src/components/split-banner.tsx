'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'

export function SplitBanner() {
  const { t } = useLanguage()

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-16 md:py-20 max-w-7xl mx-auto px-4 md:px-6">
      {/* Skincare Panel */}
      <div className="relative h-96 rounded-xl overflow-hidden group">
        {/* Background Image */}
        <Image
          src="/images/po1.jpeg" // replace with your skincare image
          alt="Skincare"
          fill
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-white text-balance">
            {t('bestOfSkincare')}
          </h3>
          <Link href="/products?category=skincare">
            <Button className="bg-white hover:bg-white/90 text-foreground font-semibold">
              {t('explore')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Makeup Panel */}
      <div className="relative h-96 rounded-xl overflow-hidden group">
        {/* Background Image */}
        <Image
          src="/images/po2.jpeg" // replace with your makeup image
          alt="Makeup"
          fill
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-white text-balance">
            {t('topBrandsMakeup')}
          </h3>
          <Link href="/products?category=makeup">
            <Button className="bg-white hover:bg-white/90 text-foreground font-semibold">
              {t('explore')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
