import { supabase } from './supabaseClient';

export async function sendMessage({ full_name, email, subject, message }) {
  return await supabase.from('messages').insert([{ full_name, email, subject, message }]);
}