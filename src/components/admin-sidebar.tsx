'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import {
  Package,
  Settings,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { clearAdminSession } from '@/lib/admin-auth'


export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { icon: Package, label: 'Produits', href: '/admin/products' },
    { icon: Settings, label: 'Paramètres', href: '/admin/settings' },
  ]

  const handleLogout = () => {
    clearAdminSession()
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-serif font-semibold">Luxe Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-primary'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-2 bg-transparent"
          size="sm"
        >
          <LogOut size={16} />
          Déconnexion
        </Button>
      </div>
    </aside>
  )
}
