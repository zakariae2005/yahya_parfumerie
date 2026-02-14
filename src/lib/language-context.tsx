'use client'

import React from "react"

import { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'fr' | 'ar'

export const translations = {
  fr: {
    explorer: 'EXPLORER',
    cart: 'Panier',
    account: 'Compte',
    search: 'Rechercher',
    products: 'Produits',
    skincare: 'Soins de la peau',
    makeup: 'Maquillage',
    brands: 'Marques',
    contact: 'Contact',
    aboutUs: 'À propos',
    freeShipping: 'Livraison Gratuite',
    freeShippingDesc: 'Profitez de la livraison gratuite sur toutes les commandes',
    support24_7: 'Support 24/7',
    support24_7Desc: 'Notre équipe est disponible 24/7',
    authentic: 'Produits Authentiques',
    authenticDesc: '100% originaux et certifiés',
    viewAllProducts: 'Voir tous les produits',
    bestOfSkincare: 'MEILLEURS SOINS POUR LA PEAU',
    topBrandsMakeup: 'MAQUILLAGE DES MEILLEURES MARQUES',
    explore: 'EXPLORER',
    addToCart: 'Ajouter au panier',
    addWishlist: 'Ajouter à la liste de souhaits',
    quickView: 'Aperçu rapide',
    home: 'Accueil',
  },
  ar: {
    explorer: 'استكشف',
    cart: 'سلة',
    account: 'حساب',
    search: 'بحث',
    products: 'المنتجات',
    skincare: 'العناية بالبشرة',
    makeup: 'المكياج',
    brands: 'العلامات التجارية',
    contact: 'اتصل',
    aboutUs: 'عن',
    freeShipping: 'شحن مجاني',
    freeShippingDesc: 'استمتع بالشحن المجاني على جميع الطلبات',
    support24_7: 'دعم على مدار الساعة',
    support24_7Desc: 'فريقنا متاح على مدار الساعة',
    authentic: 'منتجات أصلية',
    authenticDesc: '100% أصلي ومعتمد',
    viewAllProducts: 'عرض جميع المنتجات',
    bestOfSkincare: 'أفضل العناية بالبشرة',
    topBrandsMakeup: 'مستحضرات المكياج من أفضل العلامات التجارية',
    explore: 'استكشف',
    addToCart: 'أضف إلى السلة',
    addWishlist: 'أضف إلى قائمة الرغبات',
    quickView: 'عرض سريع',
    home: 'الرئيسية',
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.fr) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null
    if (saved && (saved === 'fr' || saved === 'ar')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: keyof typeof translations.fr): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        isRTL: language === 'ar',
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
