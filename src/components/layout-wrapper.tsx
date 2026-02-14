'use client'

import React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'  
import { LanguageProvider } from '@/lib/language-context'
import { CartProvider } from '@/lib/cart-context'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Header />
        <main className="pt-32">
          {children}
        </main>
        <Footer />
        <Toaster />  
      </CartProvider>
    </LanguageProvider>
  )
}