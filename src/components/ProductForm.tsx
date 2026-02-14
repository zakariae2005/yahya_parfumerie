'use client'

import { useState, useEffect, useRef } from 'react'
import { useProductStore } from '@/store/productStore'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { X, Upload, Trash2, Search } from 'lucide-react'

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
  onSuccess?: () => void
}

const CATEGORIES = [
  'PARFUM',
  'MAQUILLAGE',
  'CHEVEUX',
  'SOIN DE VISAGE',
  'CORPS & DOUCHE',
  'Appareils Électriques'
]

const SUBCATEGORIES: Record<string, string[]> = {
  'PARFUM': ['Parfum Femme', 'Parfum Homme'],
  'MAQUILLAGE': ['Teint', 'Yeux', 'Sourcils', 'Lèvres', 'Ongles', 'Palette Maquillage'],
  'CHEVEUX': ['Soins Cheveux', 'Coloration'],
  'SOIN DE VISAGE': [],
  'CORPS & DOUCHE': [],
  'Appareils Électriques': []
}

const BRANDS = ['Dior', 'Chanel', "L'Oréal", 'Estée Lauder', 'MAC', 'Lancôme', 'Clinique']

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const { createProduct, updateProduct, loading } = useProductStore()
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    price: product?.price || 0,
    description: product?.description || '',
    category: product?.category || '',
    subcategory: product?.subcategory || '',
    images: product?.images || [] as string[],
    rating: product?.rating || 0,
    reviews: product?.reviews || 0,
  })

  const [brandSearch, setBrandSearch] = useState(product?.brand || '')
  const [showBrandDropdown, setShowBrandDropdown] = useState(false)
  const [filteredBrands, setFilteredBrands] = useState(BRANDS)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const brandInputRef = useRef<HTMLInputElement>(null)

  // Get available subcategories based on selected category
  const availableSubcategories = formData.category 
    ? SUBCATEGORIES[formData.category] || [] 
    : []

  // Reset subcategory when category changes
  useEffect(() => {
    if (formData.category && !availableSubcategories.includes(formData.subcategory)) {
      setFormData((prev) => ({ ...prev, subcategory: '' }))
    }
  }, [formData.category, availableSubcategories, formData.subcategory])

  // Filter brands based on search
  useEffect(() => {
    if (brandSearch) {
      const filtered = BRANDS.filter((brand) =>
        brand.toLowerCase().includes(brandSearch.toLowerCase())
      )
      setFilteredBrands(filtered)
    } else {
      setFilteredBrands(BRANDS)
    }
  }, [brandSearch])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        brandInputRef.current &&
        !brandInputRef.current.contains(event.target as Node)
      ) {
        setShowBrandDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleBrandSearch = (value: string) => {
    setBrandSearch(value)
    setFormData((prev) => ({ ...prev, brand: value }))
    setShowBrandDropdown(true)
    if (errors.brand) {
      setErrors((prev) => ({ ...prev, brand: '' }))
    }
  }

  const selectBrand = (brand: string) => {
    setBrandSearch(brand)
    setFormData((prev) => ({ ...prev, brand }))
    setShowBrandDropdown(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files])
      
      // Create preview URLs
      const newImageUrls = files.map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImageUrls],
      }))

      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: '' }))
      }
    }
  }

  const removeImage = (index: number) => {
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(formData.images[index])
    
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis'
    if (formData.price <= 0) newErrors.price = 'Le prix doit être supérieur à 0'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const uploadImagesToServer = async (files: File[]): Promise<string[]> => {
    // This function will upload images to your server/cloud storage
    // For now, I'll create a placeholder that you'll need to implement
    const uploadedUrls: string[] = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        // Replace this with your actual upload endpoint
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) throw new Error('Upload failed')

        const data = await response.json()
        uploadedUrls.push(data.url) // Assuming the response contains a url field
      } catch (error) {
        console.error('Error uploading image:', error)
        throw error
      }
    }

    return uploadedUrls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      let finalImages = formData.images

      // Upload new images if any
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImagesToServer(imageFiles)
        // Replace blob URLs with actual URLs
        finalImages = uploadedUrls
      }

      const submitData = {
        ...formData,
        images: finalImages,
        // Only include optional fields if they have values
        brand: formData.brand || undefined,
        description: formData.description || undefined,
        category: formData.category || undefined,
        subcategory: formData.subcategory || undefined,
      }

      if (product) {
        // Update existing product
        const updated = await updateProduct(product.id, submitData)
        if (updated) {
          onSuccess?.()
          onClose()
        }
      } else {
        // Create new product
        const created = await createProduct(submitData)
        if (created) {
          onSuccess?.()
          onClose()
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors((prev) => ({ 
        ...prev, 
        submit: 'Une erreur est survenue lors de la sauvegarde' 
      }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-semibold">
            {product ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nom du produit *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="ex: Anti-Aging Serum"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Brand with Search */}
          <div className="relative" ref={brandInputRef}>
            <label className="block text-sm font-medium mb-2">
              Marque
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
              <Search 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                size={18} 
              />
            </div>
            
            {showBrandDropdown && filteredBrands.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredBrands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => selectBrand(brand)}
                    className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Catégorie
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Sélectionner une catégorie</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Subcategory - Only show if category has subcategories */}
          {availableSubcategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Sous-catégorie
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Sélectionner une sous-catégorie</option>
                {availableSubcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
              {errors.subcategory && (
                <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>
              )}
            </div>
          )}

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Prix (€) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="180.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Décrivez le produit..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Images
            </label>
            <div className="mb-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-accent hover:bg-accent/90"
              >
                <Upload size={18} className="mr-2" />
                Télécharger des images
              </Button>
            </div>
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
          </div>

          {/* Rating and Reviews */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Note (0-5)
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="5"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="4.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre d&apos;avis
              </label>
              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="67"
              />
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90"
              disabled={loading}
            >
              {loading
                ? 'Chargement...'
                : product
                ? 'Modifier'
                : 'Créer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}