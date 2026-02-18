'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Product } from '@/types/product'

export function SearchBar() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        searchProducts(searchQuery)
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchProducts = async (query: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/products?searchTerm=${encodeURIComponent(query)}`)
      if (response.ok) {
        const products = await response.json()
        setSuggestions(products.slice(0, 5)) // Limit to 5 suggestions
        setIsOpen(true)
      }
    } catch (error) {
      console.error('Error searching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    setSuggestions([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleSelectProduct = () => {
    setSearchQuery('')
    setSuggestions([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true)
          }}
          placeholder={t('search') || 'Recherche'}
          className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (suggestions.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {t('loading') || 'Chargement...'}
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    onClick={handleSelectProduct}
                    className="flex items-center gap-3 p-3 hover:bg-primary transition-colors border-b border-border last:border-b-0"
                  >
                    {/* Product Image */}
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                        <Search size={20} className="text-muted-foreground" />
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {product.name}
                      </div>
                      {product.brand && (
                        <div className="text-xs text-muted-foreground">
                          {product.brand}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-sm font-semibold text-accent">
                      {product.price.toFixed(2)} {'DH'}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {t('no_results') || 'Aucun résultat trouvé'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}