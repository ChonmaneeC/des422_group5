import { supabase } from './supabaseClient';

export async function inviteUserToMeeting(meetingId, inviteeId) {
  return await supabase.from('meeting_invites').insert([{ meeting_id: meetingId, invitee_id: inviteeId }]);
}