'use client'

import { CategoryPageTemplate } from "@/components/category-page-template"

export default function CheveuxPage() {
  return (
    <CategoryPageTemplate
      category="CHEVEUX"
      title="Cheveux"
      description="Découvrez nos produits capillaires"
      placeholder="Rechercher des produits capillaires..."
      subcategories={['Soins Cheveux', 'Type de Cheveux', 'Coloration', 'Coloration sans ammoniaque']}
    />
  )
}