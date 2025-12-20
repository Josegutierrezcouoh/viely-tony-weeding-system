'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase-client'

interface Invitation {
  id: string
  code: string
  guest_name: string
  type: string
  max_guests: number
  estimated_guests: number
  created_at: string
}

interface InvitationsListProps {
  onUpdate: () => void
}

export default function InvitationsList({ onUpdate }: InvitationsListProps) {
  const supabase = createClient()
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingInvitation, setEditingInvitation] = useState<Invitation | null>(null)

  useEffect(() => {
    loadInvitations()
  }, [])

  const loadInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setInvitations(data || [])
    } catch (error) {
      console.error('Error loading invitations:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredInvitations = invitations.filter(inv =>
    inv.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyInvitationLink = (code: string) => {
    const url = `${window.location.origin}/invitacion/${code}`
    navigator.clipboard.writeText(url)
    alert('¡Link copiado al portapapeles!')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta invitación?')) return
    
    try {
      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      await loadInvitations()
      onUpdate()
    } catch (error) {
      console.error('Error deleting invitation:', error)
      alert('Error al eliminar la invitación')
    }
  }

  const handleEdit = (invitation: Invitation) => {
    setEditingInvitation(invitation)
    setShowEditModal(true)
  }

  if (loading) {
    return <div className="text-center py-8">Cargando invitaciones...</div>
  }

  return (
    <div>
      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
        >
          + Nueva Invitación
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
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invitados
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvitations.map((invitation) => (
              <tr key={invitation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{invitation.guest_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {invitation.code}
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    {invitation.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invitation.estimated_guests} / {invitation.max_guests}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => copyInvitationLink(invitation.code)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Copiar link"
                  >
                    🔗
                  </button>
                  <button
                    onClick={() => handleEdit(invitation)}
                    className="text-green-600 hover:text-green-800"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(invitation.id)}
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

      {filteredInvitations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron invitaciones
        </div>
      )}

      {showAddModal && (
        <AddInvitationModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            loadInvitations()
            onUpdate()
            setShowAddModal(false)
          }}
        />
      )}

      {showEditModal && editingInvitation && (
        <EditInvitationModal
          invitation={editingInvitation}
          onClose={() => {
            setShowEditModal(false)
            setEditingInvitation(null)
          }}
          onSuccess={() => {
            loadInvitations()
            onUpdate()
            setShowEditModal(false)
            setEditingInvitation(null)
          }}
        />
      )}
    </div>
  )
}

// Modal para agregar invitación
function AddInvitationModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const supabase = createClient()
  const [formData, setFormData] = useState({
    guest_name: '',
    type: 'individual',
    max_guests: 1,
    estimated_guests: 1
  })
  const [loading, setLoading] = useState(false)

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('invitations')
        .insert({
          code: generateCode(),
          ...formData
        })
      
      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error creating invitation:', error)
      alert('Error al crear la invitación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-serif text-purple-900 mb-4">Nueva Invitación</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Invitado
            </label>
            <input
              type="text"
              required
              value={formData.guest_name}
              onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="individual">Individual</option>
              <option value="pareja">Pareja</option>
              <option value="familia">Familia</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo Invitados
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.max_guests}
                onChange={(e) => setFormData({...formData, max_guests: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimado
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.estimated_guests}
                onChange={(e) => setFormData({...formData, estimated_guests: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Modal para editar invitación
function EditInvitationModal({ 
  invitation, 
  onClose, 
  onSuccess 
}: { 
  invitation: Invitation
  onClose: () => void
  onSuccess: () => void 
}) {
  const supabase = createClient()
  const [formData, setFormData] = useState({
    guest_name: invitation.guest_name,
    type: invitation.type,
    max_guests: invitation.max_guests,
    estimated_guests: invitation.estimated_guests
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('invitations')
        .update(formData)
        .eq('id', invitation.id)
      
      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error updating invitation:', error)
      alert('Error al actualizar la invitación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-serif text-purple-900 mb-4">Editar Invitación</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Invitado
            </label>
            <input
              type="text"
              required
              value={formData.guest_name}
              onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="individual">Individual</option>
              <option value="pareja">Pareja</option>
              <option value="familia">Familia</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo Invitados
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.max_guests}
                onChange={(e) => setFormData({...formData, max_guests: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimado
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.estimated_guests}
                onChange={(e) => setFormData({...formData, estimated_guests: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Código:</strong> <code className="bg-white px-2 py-1 rounded">{invitation.code}</code>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              El código no se puede modificar
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
