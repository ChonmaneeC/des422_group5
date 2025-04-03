import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from "./config"; // Import config
import supabase from './supabaseClient'; // Import supabase client
import userRoutes from "./routes/userRoutes"; // Import user routes
import postRoutes from "./routes/postRoutes"; // Import post routes
import path from "path";

const app = express();
if (config.nodeEnv === "development") {
}
app.use(cors({ origin: "*" }));  // แก้เป็น * สำหรับทุก origin

app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello from Backend!');
// });

app.get('/users', async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('id');
        console.log("Data:", data);
        if (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: 'Error fetching user data' });
        }
        else if (data) {
            console.log("User data:", data);
            res.json({ message: data[0] });
        } else {
            console.log("No user data found");
            res.status(404).json({ message: 'No user data found' });
        }
    } catch (err) {
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
});

// เช็คว่า Supabase เชื่อมต่อได้ไหม
// Check if Supabase is reachable
app.get('/supabase/status', async (req, res) => {
    try {
        const { error } = await supabase.from('users').select('id').limit(1);
        if (error) {
            console.error("Supabase error:", error);
            res.status(500).json({ status: 'Supabase is not reachable', error: error.message });
        } else {
            res.json({ status: 'Supabase is reachable' });
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ status: 'Supabase is not reachable', error: 'Unexpected error occurred' });
    }
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

// 🛠️ Serve React frontend (ถ้าไม่ใช่ dev mode)
// if (config.nodeEnv !== "development") {
    const frontendBuildPath = path.join(__dirname, "../../frontend/build");
    app.use(express.static(frontendBuildPath));

    app.get("/", (req, res) => {
        res.sendFile(path.join(frontendBuildPath, "index.html"));
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

// Start the server
app.listen(config.port, async () => {
    console.log(`🚀 Server running on port ${config.port}`);
    const { error } = await supabase.from('users').select('id').limit(1);
    if (error) {
        console.error("❌ Supabase connection failed:", error.message);
    } else {
        console.log("✅ Supabase connected successfully!");
    }
});