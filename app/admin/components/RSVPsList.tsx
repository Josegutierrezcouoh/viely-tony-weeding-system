'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase-client'

interface RSVP {
  id: string
  invitation_id: string
  confirmed_guests: number
  attending: boolean
  created_at: string
  invitations?: {
    guest_name: string
    code: string
    max_guests: number
  }
}

interface RSVPsListProps {
  onUpdate: () => void
}

export default function RSVPsList({ onUpdate }: RSVPsListProps) {
  const supabase = createClient()
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'attending' | 'not-attending'>('all')

  useEffect(() => {
    loadRSVPs()
  }, [])

  const loadRSVPs = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select(`
          *,
          invitations (
            guest_name,
            code,
            max_guests
          )
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setRsvps(data || [])
    } catch (error) {
      console.error('Error loading RSVPs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRSVPs = rsvps.filter(rsvp => {
    if (filter === 'attending') return rsvp.attending
    if (filter === 'not-attending') return !rsvp.attending
    return true
  })

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este RSVP?')) return
    
    try {
      const { error } = await supabase
        .from('rsvps')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      await loadRSVPs()
      onUpdate()
    } catch (error) {
      console.error('Error deleting RSVP:', error)
      alert('Error al eliminar el RSVP')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Cargando RSVPs...</div>
  }

  return (
    <div>
      {/* Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'all'
              ? 'bg-rose-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todos ({rsvps.length})
        </button>
        <button
          onClick={() => setFilter('attending')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'attending'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Asisten ({rsvps.filter(r => r.attending).length})
        </button>
        <button
          onClick={() => setFilter('not-attending')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'not-attending'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          No Asisten ({rsvps.filter(r => !r.attending).length})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invitado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confirmados
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRSVPs.map((rsvp) => (
              <tr key={rsvp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {rsvp.invitations?.guest_name || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {rsvp.invitations?.code}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rsvp.attending ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      ✓ Asiste
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      ✗ No Asiste
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rsvp.attending ? (
                    <span className="font-medium">
                      {rsvp.confirmed_guests} / {rsvp.invitations?.max_guests}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(rsvp.created_at).toLocaleDateString('es-ES')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(rsvp.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRSVPs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron RSVPs
        </div>
      )}
    </div>
  )
}
