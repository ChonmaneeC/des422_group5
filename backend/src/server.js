"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config"); // Import config
const supabaseClient_1 = require("./supabase/supabaseClient"); // Import supabase client
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import user routes
const postRoutes_1 = __importDefault(require("./routes/postRoutes")); // Import post routes
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
dotenv_1.default.config();
const app = (0, express_1.default)();
if (config_1.env.NODE_ENV === "development") {
}
app.use((0, cors_1.default)({ origin: "*" })); // แก้เป็น * สำหรับทุก origin
app.use(express_1.default.json());
// RoutesAV
app.use('/api/user', userRoutes_1.default);
app.use('/api/post', postRoutes_1.default);
// app.get('/', (req, res) => {
//     res.send('Hello from Backend!');
// });
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabaseClient_1.supabase.from('users').select('id');
        console.log("Data:", data);
        if (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: 'Error fetching user data' });
        }
        else if (data) {
            console.log("User data:", data);
            res.json({ message: data[0] });
        }
        else {
            console.log("No user data found");
            res.status(404).json({ message: 'No user data found' });
        }
    }
    catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ message: 'Unexpected error occurred' });
    }
    // console.log("Fetching users...");
    // supabase.from('users').select('name').limit(1).single<User>()
    //     .then(({data, error}: {data: User | null, error: PostgrestError | null}) => {
    //         console.log("Data:", data);
    //         if (data !== null) {
    //             res.json({ message: data.name });
    //         } else {
    //             console.error("Error:", error);
    //             res.status(500).json({ message: 'Error fetching user data' });
    //         }
    //     });
}));
// เช็คว่า Supabase เชื่อมต่อได้ไหม
// Check if Supabase is reachable
app.get('/supabase/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield supabaseClient_1.supabase.from('users').select('id').limit(1);
        if (error) {
            console.error("Supabase error:", error);
            res.status(500).json({ status: 'Supabase is not reachable', error: error.message });
        }
        else {
            res.json({ status: 'Supabase is reachable' });
        }
    }
    catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ status: 'Supabase is not reachable', error: 'Unexpected error occurred' });
    }
}));
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});
// 🛠️ Serve React frontend (ถ้าไม่ใช่ dev mode)
// if (config.nodeEnv !== "development") {
const frontendBuildPath = path_1.default.join(__dirname, "../../frontend/build");
app.use(express_1.default.static(frontendBuildPath));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(frontendBuildPath, "index.html"));
});
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }
// Start the server
app.listen(config_1.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🚀 Server running on port ${config_1.env.PORT}`);
    const { error } = yield supabaseClient_1.supabase.from('users').select('id').limit(1);
    if (error) {
        console.error("❌ Supabase connection failed:", error.message);
    }
    else {
        console.log("✅ Supabase connected successfully!");
    }
}));
