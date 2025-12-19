import { supabase } from '../../lib/supabase'

type PageProps = {
  params: Promise<{
    code: string
  }>
}

export default async function InvitationPage({ params }: PageProps) {
  const { code } = await params
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('code', code)
    .single()

  if (error || !invitation) {
    return <div>Invitación no encontrada</div>
  }

  return (
    <div>
      <h1>Bienvenidos</h1>
      <p>{invitation.guest_name}</p>
      <p>
        Cupos máximos: {invitation.max_guests}
      </p>
    </div>
  )
}
