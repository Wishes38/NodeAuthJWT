import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { globalLimiter } from './utils/rateLimiter.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(globalLimiter);

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

export default app;
