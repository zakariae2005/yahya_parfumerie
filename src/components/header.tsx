'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, Search, User, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useCartStore, useCartItemCount } from '@/store/cartStore'
import { SearchBar } from './SearchBar'
import { megaMenuData } from '@/lib/mega-menu-data';


export function Header() {
  const { language, setLanguage, t, isRTL } = useLanguage()
  const itemCount = useCartItemCount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpenMenus, setMobileOpenMenus] = useState<Record<string, boolean>>({})
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const categoryLinks = [
    { label: 'PARFUM', href: '/parfums' },
    { label: 'MAQUILLAGE', href: '/maquillage' },
    { label: 'CHEVEUX', href: '/cheveux' },
    { label: 'SOIN DE VISAGE', href: '/soin-visage' },
    { label: 'CORPS & DOUCHE', href: '/corps-douche' },
    { label: 'Appareils Électriques', href: '/appareils' },
  ]

  const handleMouseEnter = (href: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setActiveMenu(href)
  }

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150)
  }

  const toggleMobileMenu = (href: string) => {
    setMobileOpenMenus((prev) => ({ ...prev, [href]: !prev[href] }))
  }

  useEffect(() => {
    const handler = () => setActiveMenu(null)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <header className={`fixed top-0 w-full bg-black backdrop-blur-sm border-b border-white/10 z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="hidden md:block w-full"><SearchBar /></div>
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
              title={t('search')}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={18} />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-center">
            <div className="text-3xl md:text-4xl font-serif font-semibold text-white tracking-widest">YAHYA</div>
            <div className="text-xs md:text-sm text-accent font-light tracking-[0.3em]">PARFUMERIE</div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <div className="hidden md:flex items-center gap-2 border-r border-white/20 pr-3">
              <button onClick={() => setLanguage('fr')} className={`text-xs font-semibold transition-colors uppercase ${language === 'fr' ? 'text-accent' : 'text-white/50 hover:text-white'}`}>FR</button>
              <div className="text-white/30">/</div>
              <button onClick={() => setLanguage('ar')} className={`text-xs font-semibold transition-colors uppercase ${language === 'ar' ? 'text-accent' : 'text-white/50 hover:text-white'}`}>AR</button>
            </div>

            <Link href="/account" className="hidden md:flex p-2 hover:bg-white/10 rounded-lg transition-colors items-center gap-2 text-white">
              <User size={18} />
              <span className="text-xs uppercase tracking-wide">{t('account') || 'Connexion'}</span>
            </Link>

            <Link href="/cart" className="relative text-white">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </div>
              )}
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden py-4 border-t border-white/10"><SearchBar /></div>
        )}

        {/* ── DESKTOP Category Navigation ── */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 py-4 border-t border-white/10 relative">
          {categoryLinks.map((item) => {
            const hasMenu = !!megaMenuData[item.href]
            const isActive = activeMenu === item.href
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasMenu && handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-xs lg:text-sm font-medium transition-colors uppercase tracking-wide whitespace-nowrap ${
                    isActive ? 'text-accent' : 'text-white/80 hover:text-accent'
                  }`}
                >
                  {item.label}
                  {hasMenu && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${isActive ? 'rotate-180 text-accent' : ''}`}
                    />
                  )}
                </Link>
              </div>
            )
          })}

          {/* Mega Menu */}
          {activeMenu && megaMenuData[activeMenu] && (
            <div
              className="absolute top-full left-0 right-0 z-50 pt-0"
              style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
              onMouseEnter={() => handleMouseEnter(activeMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-black border-b border-white/10 shadow-xl px-8 py-6 w-full">
                <div
                  className="max-w-[1400px] mx-auto grid gap-8"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(megaMenuData[activeMenu].length, 4)}, 1fr)`,
                  }}
                >
                  {megaMenuData[activeMenu].map((section) => (
                    <div key={section.title}>
                      <Link
                        href={`${activeMenu}?category=${encodeURIComponent(section.title)}`}
                        className="block text-xs font-bold text-white uppercase tracking-wider mb-2 hover:text-accent transition-colors"
                      >
                        {section.title}
                      </Link>
                      {section.items.length > 0 && (
                        <ul className="space-y-1">
                          {section.items.map((sub) => (
                            <li key={sub}>
                              <Link
                                href={`${activeMenu}?category=${encodeURIComponent(section.title)}&sub=${encodeURIComponent(sub)}`}
                                className="text-xs text-white/50 hover:text-accent transition-colors block py-0.5"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* ── MOBILE Navigation ── */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
            {/* Language */}
            <div className="flex items-center justify-center gap-3 py-4 border-b border-white/10">
              <button onClick={() => setLanguage('fr')} className={`text-sm font-semibold uppercase ${language === 'fr' ? 'text-accent' : 'text-white/50'}`}>FR</button>
              <div className="text-white/30">/</div>
              <button onClick={() => setLanguage('ar')} className={`text-sm font-semibold uppercase ${language === 'ar' ? 'text-accent' : 'text-white/50'}`}>AR</button>
            </div>

            {/* Categories */}
            {categoryLinks.map((item) => {
              const hasMenu = !!megaMenuData[item.href]
              const isOpen = !!mobileOpenMenus[item.href]
              return (
                <div key={item.href} className="border-b border-white/10 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-3 text-sm font-medium text-white/80 hover:text-accent transition-colors uppercase tracking-wide"
                    >
                      {item.label}
                    </Link>
                    {hasMenu && (
                      <button onClick={() => toggleMobileMenu(item.href)} className="p-3 text-white/60 hover:text-accent transition-colors">
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Mobile accordion content */}
                  {hasMenu && isOpen && (
                    <div className="pb-3 pl-4 bg-white/5">
                      {megaMenuData[item.href].map((section) => (
                        <div key={section.title} className="pt-3">
                          <Link
                            href={`${item.href}?category=${encodeURIComponent(section.title)}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs font-bold text-white uppercase tracking-wider mb-1 hover:text-accent transition-colors"
                          >
                            {section.title}
                          </Link>
                          {section.items.length > 0 && (
                            <ul className="pl-3">
                              {section.items.map((sub) => (
                                <li key={sub}>
                                  <Link
                                    href={`${item.href}?category=${encodeURIComponent(section.title)}&sub=${encodeURIComponent(sub)}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-xs text-white/50 hover:text-accent transition-colors block py-1"
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Account */}
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-sm font-medium text-white/80 hover:text-accent transition-colors uppercase tracking-wide border-t border-white/10 mt-2"
            >
              {t('account') || 'CONNEXION'}
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}