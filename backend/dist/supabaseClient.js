"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("./config");
// ตรวจสอบว่ามีค่าครบไหม
if (!config_1.config.supabaseUrl || !config_1.config.supabaseAnonKey) {
    console.error("❌ Missing Supabase URL or Key in .env");
    process.exit(1);
}
const supabase = (0, supabase_js_1.createClient)(config_1.config.supabaseUrl, config_1.config.supabaseAnonKey);
exports.default = supabase;
