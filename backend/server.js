import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectDB from './config/db.js';
import configurePassport from './config/passport.js'; // --- NEW ---

// Route imports
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js'; // --- NEW ---

dotenv.config();
connectDB();
configurePassport(passport); // --- NEW ---

const app = express();

app.use(cors());
app.use(express.json());

// --- NEW: Express session middleware ---
app.use(
  session({
    secret: 'keyboard cat', // Replace with a real secret in your .env
    resave: false,
    saveUninitialized: false,
  })
);

// --- NEW: Passport middleware ---
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes); // --- NEW ---

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));