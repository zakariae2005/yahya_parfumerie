'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { AdminSidebar } from '@/components/admin-sidebar'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-4xl font-serif font-semibold mb-8">Aperçu</h1>
        </div>
      </div>
    </div>
  )
}
