import Image from 'next/image'
import { supabase } from '../../lib/supabase'
import InvitationCover from './InvitationCover'

type PageProps = {
  params: Promise<{
    code: string
  }>
}

function InvitationNotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-purple-50 flex items-center justify-center">
      <div className="text-center p-12 bg-white rounded-lg shadow-xl border border-purple-100 max-w-md">
        <svg className="w-16 h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-serif text-purple-900 mb-4">Invitación no encontrada</h1>
        <p className="text-gray-600">El código de invitación no es válido o ha expirado.</p>
      </div>
    </div>
  )
}

export default async function InvitationPage({ params }: PageProps) {
  const { code } = await params
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select(`
    *,
    rsvps (
      confirmed_guests,
      attending,
      created_at
    )
  `)
    .eq('code', code)
    .single()

  if (error || !invitation) {
    return <InvitationNotFound />
  }

  return <InvitationCover invitation={invitation} />
}


