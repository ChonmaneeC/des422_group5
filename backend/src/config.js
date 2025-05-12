"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config"); // Load environment variables
const zod_1 = require("zod");
console.log('SUPABASE_URL:', process.env.SUPABASE_URL); // Log the variable to check if it's loaded
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY); // Log the variable to check if it's loaded
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().default(5000), // Changed to number
    SUPABASE_URL: zod_1.z.string().url(),
    SUPABASE_ANON_KEY: zod_1.z.string(),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
}
exports.env = _env.data;
