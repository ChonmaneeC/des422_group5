import { createClient } from "@supabase/supabase-js";
import { env } from "../config";

// Remove unnecessary validation (already handled by Zod)
export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
);