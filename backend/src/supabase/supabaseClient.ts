import { createClient } from "@supabase/supabase-js";
import { config } from "../config";

// ตรวจสอบว่ามีค่าครบไหม
if (!config.supabaseUrl || !config.supabaseAnonKey) {
    console.error("❌ Missing Supabase URL or Key in .env");
    process.exit(1);
}

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
export default supabase;
