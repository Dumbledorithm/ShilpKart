import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  console.log('--- ENTERING PROTECT MIDDLEWARE ---'); // --- ADD THIS ---
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's ID and attach to the request object
      // We exclude the password from being returned
      req.user = await User.findById(decoded.id).select('-password');
      console.log('USER FOUND IN PROTECT:', req.user); // --- ADD THIS ---


      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('ERROR IN PROTECT MIDDLEWARE:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  console.log('--- ENTERING ADMIN MIDDLEWARE ---'); // --- ADD THIS ---
  if (req.user && req.user.isAdmin) {
    console.log('USER IS ADMIN. PROCEEDING...'); // --- ADD THIS ---
    next();
  } else {
    console.log('USER IS NOT ADMIN. BLOCKING ACCESS.'); // --- ADD THIS ---
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

const artisan = (req, res, next) => {
    // An admin should also have artisan privileges
    if (req.user && (req.user.isArtisan || req.user.isAdmin)) {
      next();
    } else {
      res.status(401).json({ message: 'Not authorized as an artisan' });
    }
  };

export { protect, admin, artisan };