import 'dotenv/config';  // Load environment variables
import { z } from 'zod';

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);  // Log the variable to check if it's loaded
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);  // Log the variable to check if it's loaded

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),  // Changed to number
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
