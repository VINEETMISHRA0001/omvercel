import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
let dbConnection;
try {
  dbConnection = await connectDB();
  console.log('MongoDB Connected:', dbConnection.connection.host);
} catch (err) {
  console.error('MongoDB connection error:', err);
  // Don't exit in production, let the serverless function handle it
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
}

// Start server only in development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel
export default app;
