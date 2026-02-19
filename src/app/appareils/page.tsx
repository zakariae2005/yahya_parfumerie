'use client'

import { CategoryPageTemplate } from "@/components/category-page-template"


export default function AppareilsPage() {
  return (
    <CategoryPageTemplate
      category="Appareils Électriques"
      title="Appareils Électriques"
      description="Découvrez nos appareils de beauté"
      placeholder="Rechercher des appareils..."
      subcategories={['Sèche-cheveux', 'Lisseur', 'Boucleur', 'Brosse soufflante', 'Épilateur', 'Rasoir']}
    />
  )
}