import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:3000", // URL ของ Frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Backend!');    
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

