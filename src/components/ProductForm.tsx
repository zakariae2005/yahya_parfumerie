'use client'

import { useState, useEffect, useRef } from 'react'
import { useProductStore } from '@/store/productStore'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { X, Upload, Trash2, Search } from 'lucide-react'
import {
  CATEGORIES,
  SUBCATEGORIES,
  MEGACATEGORIES,
  BRANDS_BY_CATEGORY,
  ALL_BRANDS,
} from '@/lib/product-taxonomy'

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
  onSuccess?: () => void
}

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const { createProduct, updateProduct, loading } = useProductStore()

  const [formData, setFormData] = useState({
    name:         product?.name         || '',
    brand:        product?.brand        || '',
    price:        product?.price        || 0,
    description:  product?.description  || '',
    category:     product?.category     || '',
    subcategory:  product?.subcategory  || '',
    megacategory: product?.megacategory || '',
    images:       product?.images       || [] as string[],
    rating:       product?.rating       || 0,
    reviews:      product?.reviews      || 0,
  })

  const [brandSearch, setBrandSearch]         = useState(product?.brand || '')
  const [showBrandDropdown, setShowBrandDropdown] = useState(false)
  const [imageFiles, setImageFiles]           = useState<File[]>([])
  const [errors, setErrors]                   = useState<Record<string, string>>({})
  const fileInputRef  = useRef<HTMLInputElement>(null)
  const brandInputRef = useRef<HTMLInputElement>(null)

  // ─── Derived lists ───────────────────────────────────────────────────────────
  const availableSubcategories: string[] =
    formData.category ? (SUBCATEGORIES[formData.category] ?? []) : []

  const availableMegacategories: string[] =
    formData.subcategory ? (MEGACATEGORIES[formData.subcategory] ?? []) : []

  const availableBrands: string[] =
    formData.category ? (BRANDS_BY_CATEGORY[formData.category] ?? ALL_BRANDS) : ALL_BRANDS

  const filteredBrands = brandSearch
    ? availableBrands.filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()))
    : availableBrands

  // ─── Reset cascading fields on parent change ─────────────────────────────────
  useEffect(() => {
    if (formData.category && !availableSubcategories.includes(formData.subcategory)) {
      setFormData((prev) => ({ ...prev, subcategory: '', megacategory: '' }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.category])

  useEffect(() => {
    if (formData.subcategory && !availableMegacategories.includes(formData.megacategory)) {
      setFormData((prev) => ({ ...prev, megacategory: '' }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.subcategory])

  // ─── Close brand dropdown on outside click ───────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandInputRef.current && !brandInputRef.current.contains(event.target as Node)) {
        setShowBrandDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' || name === 'reviews'
        ? parseFloat(value) || 0
        : value,
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleBrandSearch = (value: string) => {
    setBrandSearch(value)
    setFormData((prev) => ({ ...prev, brand: value }))
    setShowBrandDropdown(true)
    if (errors.brand) setErrors((prev) => ({ ...prev, brand: '' }))
  }

  const selectBrand = (brand: string) => {
    setBrandSearch(brand)
    setFormData((prev) => ({ ...prev, brand }))
    setShowBrandDropdown(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setImageFiles((prev) => [...prev, ...files])
    const newUrls = files.map((f) => URL.createObjectURL(f))
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...newUrls] }))
    if (errors.images) setErrors((prev) => ({ ...prev, images: '' }))
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(formData.images[index])
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name  = 'Le nom est requis'
    if (formData.price <= 0)   newErrors.price = 'Le prix doit être supérieur à 0'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const uploadImagesToServer = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = []
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      const response = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      uploadedUrls.push(data.url)
    }
    return uploadedUrls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      let finalImages = formData.images
      if (imageFiles.length > 0) {
        finalImages = await uploadImagesToServer(imageFiles)
      }

      const submitData = {
        ...formData,
        images:       finalImages,
        brand:        formData.brand        || undefined,
        description:  formData.description  || undefined,
        category:     formData.category     || undefined,
        subcategory:  formData.subcategory  || undefined,
        megacategory: formData.megacategory || undefined,
      }

      if (product) {
        const updated = await updateProduct(product.id, submitData)
        if (updated) { onSuccess?.(); onClose() }
      } else {
        const created = await createProduct(submitData)
        if (created) { onSuccess?.(); onClose() }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors((prev) => ({ ...prev, submit: 'Une erreur est survenue lors de la sauvegarde' }))
    }
  }

  // ─── UI ──────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-semibold">
            {product ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Nom du produit *</label>
            <input
              type="text" name="name" value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="ex: Anti-Aging Serum"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* ── Category ── */}
          <div>
            <label className="block text-sm font-medium mb-2">Catégorie</label>
            <select
              name="category" value={formData.category} onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Sélectionner une catégorie</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* ── Subcategory (shown only when category has subcategories) ── */}
          {availableSubcategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Sous-catégorie</label>
              <select
                name="subcategory" value={formData.subcategory} onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Sélectionner une sous-catégorie</option>
                {availableSubcategories.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          {/* ── Mega-category (shown only when subcategory has items) ── */}
          {availableMegacategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Méga-catégorie</label>
              <select
                name="megacategory" value={formData.megacategory} onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Sélectionner une méga-catégorie</option>
                {availableMegacategories.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          )}

          {/* ── Brand with search (filtered by category) ── */}
          <div className="relative" ref={brandInputRef}>
            <label className="block text-sm font-medium mb-2">
              Marque
              {formData.category && (
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  ({availableBrands.length} marques pour {formData.category})
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => handleBrandSearch(e.target.value)}
                onFocus={() => setShowBrandDropdown(true)}
                className="w-full px-4 py-2 pr-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Rechercher ou saisir une marque"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            </div>

            {showBrandDropdown && filteredBrands.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredBrands.map((brand) => (
                  <button
                    key={brand} type="button" onClick={() => selectBrand(brand)}
                    className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Prix (DH) *</label>
            <input
              type="number" name="price" value={formData.price}
              onChange={handleInputChange} step="0.01" min="0"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="180.00"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description" value={formData.description}
              onChange={handleInputChange} rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Décrivez le produit..."
            />
          </div>

          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <div className="mb-3">
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              <Button type="button" onClick={() => fileInputRef.current?.click()} className="w-full bg-accent hover:bg-accent/90">
                <Upload size={18} className="mr-2" />
                Télécharger des images
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg border border-border" />
                    <button
                      type="button" onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Note (0-5)</label>
              <input
                type="number" name="rating" value={formData.rating}
                onChange={handleInputChange} step="0.1" min="0" max="5"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="4.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nombre d&apos;avis</label>
              <input
                type="number" name="reviews" value={formData.reviews}
                onChange={handleInputChange} min="0"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="67"
              />
            </div>
          </div>

          {/* Submit error */}
          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90" disabled={loading}>
              {loading ? 'Chargement...' : product ? 'Modifier' : 'Créer'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}