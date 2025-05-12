"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);
require("dotenv/config"); // ✅ This loads .env variables
const supabase_js_1 = require("@supabase/supabase-js");
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_KEY must be provided');
}
exports.supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
