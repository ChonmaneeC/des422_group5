console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);
import 'dotenv/config'; // ✅ This loads .env variables
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be provided');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
