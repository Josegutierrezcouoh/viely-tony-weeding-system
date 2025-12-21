'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase-client'
import { updateRSVP } from '@/app/invitacion/[code]/actions'

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
  const [editingRsvp, setEditingRsvp] = useState<RSVP | null>(null)
  const [editAttending, setEditAttending] = useState<boolean>(true)
  const [editConfirmedGuests, setEditConfirmedGuests] = useState<number>(1)
  const [saving, setSaving] = useState(false)

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

  const handleEdit = (rsvp: RSVP) => {
    setEditingRsvp(rsvp)
    setEditAttending(rsvp.attending)
    setEditConfirmedGuests(rsvp.confirmed_guests || 1)
  }

  const handleSaveEdit = async () => {
    if (!editingRsvp) return
    
    setSaving(true)
    try {
      await updateRSVP(
        editingRsvp.id,
        editAttending,
        editAttending ? editConfirmedGuests : 0
      )
      
      setEditingRsvp(null)
      await loadRSVPs()
      onUpdate()
    } catch (error) {
      console.error('Error updating RSVP:', error)
      alert('Error al actualizar el RSVP')
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingRsvp(null)
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
              ? 'bg-purple-600 text-white'
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(rsvp)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(rsvp.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
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

      {/* Modal de Edición */}
      {editingRsvp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Editar RSVP
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Invitado</p>
              <p className="text-lg font-medium text-gray-900">
                {editingRsvp.invitations?.guest_name}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Estado de asistencia
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditAttending(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    editAttending
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ✓ Asiste
                </button>
                <button
                  type="button"
                  onClick={() => setEditAttending(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    !editAttending
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ✗ No Asiste
                </button>
              </div>
            </div>

            {editAttending && (
              <div className="mb-6">
                <label htmlFor="editGuests" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de invitados confirmados
                </label>
                <input
                  type="number"
                  id="editGuests"
                  min="1"
                  max={editingRsvp.invitations?.max_guests || 1}
                  value={editConfirmedGuests}
                  onChange={(e) => setEditConfirmedGuests(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Máximo: {editingRsvp.invitations?.max_guests}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCancelEdit}
                disabled={saving}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
