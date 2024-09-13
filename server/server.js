import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import { config } from './config/config.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Resource not found'
    });
});

const PORT = config.PORT;

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
        process.exit(1); 
    }
}

startServer();
