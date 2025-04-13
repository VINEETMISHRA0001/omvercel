import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/user.routes.js';
import carRoutes from './routes/car.routes.js';
import reviewRoutes from './routes/review.routes.js';
import tourRoutes from './routes/tour.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import blogRoutes from './routes/blog.routes.js';
import carbookingRoutes from './routes/carBooking.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import contactRoutes from './routes/contact.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://haridwarrishikeshtourism.in', 'http://localhost:5174'],
    credentials: true,
  })
);

// Serve static files from the /tmp directory in production
if (process.env.NODE_ENV === 'production') {
  app.use('/uploads', express.static('/tmp/uploads'));
} else {
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
}

// Create uploads directory if it doesn't exist
if (process.env.NODE_ENV === 'production') {
  const uploadsDir = '/tmp/uploads';
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} else {
  const uploadsDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cars', carRoutes);
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/carBookings', carbookingRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/settings', settingsRoutes);

app.get('/', (req, res) => res.send('API is running...'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
