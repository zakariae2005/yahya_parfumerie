'use client'

import { CategoryPageTemplate } from "@/components/category-page-template"

export default function SoinVisagePage() {
  return (
    <CategoryPageTemplate
      category="SOIN DE VISAGE"
      title="Soin de Visage"
      description="Découvrez nos soins pour le visage"
      placeholder="Rechercher des soins visage..."
      subcategories={['Hydratant', 'Anti-âge', 'Nettoyant', 'Contour des yeux', 'Masque', 'Sérum']}
    />
  )
}