import { supabase } from './supabaseClient';

export async function getNotificationsForUser(userId) {
  return await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
}

export async function markNotificationAsRead(notificationId) {
  return await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
}