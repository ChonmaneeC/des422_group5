import { supabase } from './supabaseClient';

export async function respondToTimeSlot(meetingId, inviteeId, timeRange, isAvailable) {
  return await supabase.from('invitee_time_responses').insert([
    { meeting_id: meetingId, invitee_id: inviteeId, time_range: timeRange, is_available: isAvailable }
  ]);
}