'use client'

import { CategoryPageTemplate } from "@/components/category-page-template"

export default function ParfumsPage() {
  return (
    <CategoryPageTemplate
      category="PARFUM"
      title="Parfums"
      description="Découvrez notre collection de parfums"
      placeholder="Rechercher des parfums..."
      subcategories={['Parfums Femme', 'Parfums Homme', 'Parfums Arabe', 'Les Coffrets']}
    />
  )
}