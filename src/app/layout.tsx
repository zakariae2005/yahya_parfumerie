import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

import './globals.css'
import { LayoutWrapper } from "@/components/layout-wrapper"


const playfair = Playfair_Display({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luxe Beauté - Cosmétiques Premium',
  description: 'Découvrez notre collection exclusive de cosmétiques haut de gamme. Produits authentiques de luxe.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} style={{
        '--font-display': playfair.style.fontFamily,
        '--font-body': inter.style.fontFamily,
      } as React.CSSProperties}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
