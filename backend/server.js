import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
// ... other imports
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Add this line
import orderRoutes from './routes/orderRoutes.js';
// ... other app setup

// API routes

// ... rest of the file


dotenv.config();
connectDB();

const app = express();

// Middleware to allow cross-origin requests
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes); // Add this line

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));