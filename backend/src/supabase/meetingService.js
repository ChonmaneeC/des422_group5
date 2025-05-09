import { supabase } from './supabaseClient';

export async function createMeeting({ title, date, note }) {
  const user = (await supabase.auth.getUser()).data.user;
  return await supabase.from('meetings').insert([{ title, date, note, creator_id: user.id }]);
}

export async function updateMeeting(meetingId, updates) {
  return await supabase.from('meetings').update(updates).eq('id', meetingId);
}