'use client'

import React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { LanguageProvider } from '@/lib/language-context'

// CartProvider is gone — Zustand needs no provider
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <Toaster />
    </LanguageProvider>
  )
}