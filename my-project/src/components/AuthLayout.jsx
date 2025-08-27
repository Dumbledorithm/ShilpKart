import React from 'react';

// --- UPDATED: Accept imageUrl as a prop ---
const AuthLayout = ({ children, imageUrl }) => {
  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        {children}
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          // --- UPDATED: Use the imageUrl prop with a fallback ---
          src={imageUrl || "https://placehold.co/1200/F3EAD8/A2673B?text=ShilpKart"}
          alt="ShilpKart artisanal products"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;