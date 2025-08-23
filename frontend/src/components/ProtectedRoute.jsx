import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, requiredRole, children }) => {
  // 1. Check if the user is logged in at all
  if (!user) {
    // If not, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // 2. Check if a specific role is required for this route
  if (requiredRole === 'artisan' && !user.isArtisan) {
    // If the user is not an artisan, redirect them to the home page
    return <Navigate to="/" replace />;
  }

  if (requiredRole === 'admin' && !user.isAdmin) {
    // If the user is not an admin, redirect them to the home page
    return <Navigate to="/" replace />;
  }

  // 3. If all checks pass, render the actual page component
  return children;
};

export default ProtectedRoute;