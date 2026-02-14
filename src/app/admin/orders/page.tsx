'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { MessageCircle, Eye } from 'lucide-react'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { AdminSidebar } from '@/components/admin-sidebar'

export default function AdminOrdersPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const orders = [
    {
      id: 2001,
      customer: 'Sophie Martin',
      total: 245,
      status: 'delivered',
      date: '2024-01-15',
      items: 3,
    },
    {
      id: 2002,
      customer: 'Marie Dupont',
      total: 85,
      status: 'pending',
      date: '2024-01-14',
      items: 1,
    },
    {
      id: 2003,
      customer: 'Claire Laurent',
      total: 320,
      status: 'processing',
      date: '2024-01-14',
      items: 4,
    },
    {
      id: 2004,
      customer: 'Éva Rousseau',
      total: 155,
      status: 'delivered',
      date: '2024-01-13',
      items: 1,
    },
  ]

  const statusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    processing: { bg: 'bg-blue-100', text: 'text-blue-700' },
    delivered: { bg: 'bg-green-100', text: 'text-green-700' },
  }

  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    processing: 'En cours',
    delivered: 'Livré',
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-4xl font-serif font-semibold mb-8">Gestion des commandes</h1>

          {/* Orders Table */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Commande</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Client</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Articles</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-primary/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">#{order.id}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm">{order.items}</td>
                    <td className="px-6 py-4 text-sm font-medium">{order.total}€</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[order.status].bg
                        } ${statusColors[order.status].text}`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center gap-2">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                        title="Envoyer le message WhatsApp"
                      >
                        <MessageCircle size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Affichage de {orders.length} commande{orders.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Précédent
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
