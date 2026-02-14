'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { products } from '@/lib/products'
import { AdminSidebar } from '@/components/admin-sidebar'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const totalProducts = products.length
  const totalRevenue = products.reduce((sum, p) => sum + p.price * 2, 0) // Mock calculation
  const totalOrders = 24 // Mock number
  const totalCustomers = 156 // Mock number

  const stats = [
    { icon: Package, label: 'Produits', value: totalProducts, color: 'bg-primary' },
    { icon: ShoppingCart, label: 'Commandes', value: totalOrders, color: 'bg-secondary' },
    { icon: DollarSign, label: 'Revenu', value: `${totalRevenue}€`, color: 'bg-accent' },
    { icon: Users, label: 'Clients', value: totalCustomers, color: 'bg-primary/80' },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-4xl font-serif font-semibold mb-8">Aperçu</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-semibold">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon size={24} className="text-foreground" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
                </div>
              )
            })}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
              <h2 className="font-serif font-semibold text-lg mb-4">Commandes récentes</h2>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-primary rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Commande #200{idx}</p>
                      <p className="text-xs text-muted-foreground">Il y a {idx * 2} heures</p>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                        {idx % 2 === 0 ? 'Livré' : 'En cours'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-serif font-semibold text-lg mb-4">Produits populaires</h2>
              <div className="space-y-3">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="p-3 bg-primary rounded-lg">
                    <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.reviews} avis
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
