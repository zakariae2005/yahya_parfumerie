'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Heart, ShoppingCart, Search, User } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useCartStore } from '@/store/cartStore'


export function Header() {
  const { language, setLanguage, t, isRTL } = useLanguage()
  const { itemCount } = useCartStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const categoryLinks = [
    { label: 'PARFUM', href: '/parfums' },
    { label: 'MAQUILLAGE', href: '/maquillage' },
    { label: 'CHEVEUX', href: '/cheveux' },
    { label: 'SOIN DE VISAGE', href: '/soin-visage' },
    { label: 'CORPS & DOUCHE', href: '/corps-douche' },
    { label: 'Appareils Électriques', href: '/appareils' },
  ]

  return (
    <header className={`fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Top Bar with Search, Logo, and Actions */}
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Left: Search */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-primary rounded-lg transition-colors flex items-center gap-2"
              title={t('search')}
            >
              <Search size={18} />
              <span className="hidden md:inline text-sm uppercase tracking-wide">
                {t('search') || 'Recherche'}
              </span>
            </button>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="flex-shrink-0 text-center">
            <div className="text-3xl md:text-4xl font-serif font-semibold text-foreground tracking-widest">
              YAHYA
            </div>
            <div className="text-xs md:text-sm text-accent font-light tracking-[0.3em]">
              PARFUMERIE
            </div>
          </Link>

          {/* Right: Language, User, Wishlist, Cart */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Toggle */}
            <div className="hidden md:flex items-center gap-2 border-r border-border pr-3">
              <button
                onClick={() => setLanguage('fr')}
                className={`text-xs font-semibold transition-colors uppercase ${
                  language === 'fr' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                FR
              </button>
              <div className="text-muted-foreground">/</div>
              <button
                onClick={() => setLanguage('ar')}
                className={`text-xs font-semibold transition-colors uppercase ${
                  language === 'ar' ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                AR
              </button>
            </div>

            {/* User Icon */}
            <Link
              href="/account"
              className="hidden md:flex p-2 hover:bg-primary rounded-lg transition-colors items-center gap-2"
            >
              <User size={18} />
              <span className="text-xs uppercase tracking-wide">
                {t('account') || 'Connexion'}
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-primary rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 py-4 border-t border-border">
          {categoryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs lg:text-sm font-medium text-foreground hover:text-accent transition-colors uppercase tracking-wide whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {/* Language Toggle for Mobile */}
            <div className="flex items-center justify-center gap-3 py-4 border-b border-border">
              <button
                onClick={() => setLanguage('fr')}
                className={`text-sm font-semibold transition-colors uppercase ${
                  language === 'fr' ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                FR
              </button>
              <div className="text-muted-foreground">/</div>
              <button
                onClick={() => setLanguage('ar')}
                className={`text-sm font-semibold transition-colors uppercase ${
                  language === 'ar' ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                AR
              </button>
            </div>

            {/* Category Links */}
            {categoryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-0 text-sm font-medium text-foreground hover:text-accent transition-colors uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}

            {/* Account Link for Mobile */}
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-0 text-sm font-medium text-foreground hover:text-accent transition-colors uppercase tracking-wide border-t border-border mt-2"
            >
              {t('account') || 'CONNEXION'}
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}