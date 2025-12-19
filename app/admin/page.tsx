'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase-client'
import StatsCards from './components/StatsCards'
import InvitationsList from './components/InvitationsList'
import RSVPsList from './components/RSVPsList'
import type { User } from '@supabase/supabase-js'

interface Stats {
  totalInvitations: number
  totalGuests: number
  confirmedGuests: number
  pendingRSVPs: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats>({
    totalInvitations: 0,
    totalGuests: 0,
    confirmedGuests: 0,
    pendingRSVPs: 0
  })
  const [activeTab, setActiveTab] = useState<'invitations' | 'rsvps'>('invitations')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Obtener invitaciones
      const { data: invitations, error: invError } = await supabase
        .from('invitations')
        .select('*')
      
      if (invError) throw invError

      // Obtener RSVPs
      const { data: rsvps, error: rsvpError } = await supabase
        .from('rsvps')
        .select('*')
      
      if (rsvpError) throw rsvpError

      const totalGuests = invitations?.reduce((sum, inv) => sum + (inv.max_guests || 0), 0) || 0
      const confirmedGuests = rsvps?.reduce((sum, rsvp) => sum + (rsvp.confirmed_guests || 0), 0) || 0
      const pendingRSVPs = (invitations?.length || 0) - (rsvps?.length || 0)

      setStats({
        totalInvitations: invitations?.length || 0,
        totalGuests,
        confirmedGuests,
        pendingRSVPs
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif text-rose-900">Panel Admin</h1>
              <p className="text-sm text-gray-600">Viely & Tony Wedding - 02 Enero, 2026</p>
              {user && <p className="text-xs text-gray-500 mt-1">{user.email}</p>}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:text-rose-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Tabs */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('invitations')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'invitations'
                    ? 'border-rose-600 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Invitaciones
              </button>
              <button
                onClick={() => setActiveTab('rsvps')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'rsvps'
                    ? 'border-rose-600 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                RSVPs
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'invitations' ? (
              <InvitationsList onUpdate={loadStats} />
            ) : (
              <RSVPsList onUpdate={loadStats} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
