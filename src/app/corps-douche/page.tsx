'use client'

import { CategoryPageTemplate } from "@/components/category-page-template"



export default function CorpsDouchePage() {
  return (
     <CategoryPageTemplate
      category="CORPS & DOUCHE"
      title="Corps & Douche"
      description="Découvrez nos produits pour le corps"
      placeholder="Rechercher des produits corps & douche..."
      subcategories={['Gel douche', 'Crème corps', 'Huile corps', 'Gommage', 'Déodorant', 'Lotion']}
    />
  )
}