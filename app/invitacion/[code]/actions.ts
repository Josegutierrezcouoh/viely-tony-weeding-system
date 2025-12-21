// app/invitation/[code]/actions.ts
'use server'

import { supabase } from '../../lib/supabase'

export async function confirmRSVP(
  invitationId: string,
  confirmedGuests: number
) {
  const { error } = await supabase.from('rsvps').insert({
    invitation_id: invitationId,
    confirmed_guests: confirmedGuests,
    attending: confirmedGuests > 0
  })
  
  if (error) {
    throw new Error(error.message)
  }
  
  return { success: true }
}

export async function updateRSVP(
  rsvpId: string,
  attending: boolean,
  confirmedGuests: number
) {
  const { error } = await supabase
    .from('rsvps')
    .update({
      attending,
      confirmed_guests: attending ? confirmedGuests : 0
    })
    .eq('id', rsvpId)
  
  if (error) {
    throw new Error(error.message)
  }
  
  return { success: true }
}
