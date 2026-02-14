'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { AdminSidebar } from '@/components/admin-sidebar'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    primaryColor: '#FAE5E5',
    secondaryColor: '#D4E5D4',
    accentColor: '#D4AF87',
    logoUrl: '',
    businessPhone: '212612345678',
  })

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const handleColorChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    alert('Paramètres sauvegardés!')
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-2xl">
          <h1 className="text-4xl font-serif font-semibold mb-8">Paramètres du site</h1>

          {/* Settings Form */}
          <div className="bg-card rounded-lg border border-border p-8 space-y-6">
            {/* Color Scheme */}
            <div>
              <h2 className="font-serif font-semibold text-lg mb-4">Palette de couleurs</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Couleur primaire
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) =>
                        handleColorChange('primaryColor', e.target.value)
                      }
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      readOnly
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Couleur secondaire
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) =>
                        handleColorChange('secondaryColor', e.target.value)
                      }
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      readOnly
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Couleur d&apos;accent
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) =>
                        handleColorChange('accentColor', e.target.value)
                      }
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.accentColor}
                      readOnly
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Logo & Images */}
            <div>
              <h2 className="font-serif font-semibold text-lg mb-4">Images</h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  URL du logo
                </label>
                <input
                  type="text"
                  value={settings.logoUrl}
                  onChange={(e) =>
                    handleColorChange('logoUrl', e.target.value)
                  }
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-serif font-semibold text-lg mb-4">Informations de contact</h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Numéro WhatsApp
                </label>
                <input
                  type="text"
                  value={settings.businessPhone}
                  onChange={(e) =>
                    handleColorChange('businessPhone', e.target.value)
                  }
                  placeholder="212612345678"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Format: Code pays + numéro (sans +)
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-border">
              <Button
                onClick={handleSave}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full md:w-auto"
              >
                Sauvegarder les paramètres
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
