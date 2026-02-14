import { HeroSection } from '@/components/hero-section'
import { FeaturedProducts } from '@/components/featured-products'
import { SplitBanner } from '@/components/split-banner'
import { CategoryTiles } from '@/components/category-tiles'
import { ReviewsCarousel } from '@/components/reviews-carousel'
import { FeaturedSection } from '@/components/FeaturedSection'
import { CategoriesSection } from '@/components/CategoriesSection'
import { SpecialOffers } from '@/components/SpecialOffers'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <SpecialOffers />
      <SplitBanner />
      <CategoryTiles />
      <FeaturedSection />
      <CategoriesSection />
      <ReviewsCarousel />
    </>
  )
}
