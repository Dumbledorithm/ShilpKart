import React from 'react';
import { Link } from 'react-router-dom';

const BentoGrid = ({ products = [] }) => {
  // Helper to get a product safely, with a fallback
  const getProduct = (index) => products[index] || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Large Cell (2x2) */}
      <Link to={`/product/${getProduct(0)._id}`} className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-lg">
        <img 
          src={getProduct(0).image || 'https://placehold.co/600x600/F3EAD8/A2673B?text=Pottery'} 
          alt={getProduct(0).name || 'Featured Product'} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <h3 className="text-2xl font-bold text-white">{getProduct(0).name || 'Handmade Pottery'}</h3>
        </div>
      </Link>

      {/* Small Cell (1x1) */}
      <Link to={`/product/${getProduct(1)._id}`} className="group relative overflow-hidden rounded-lg">
        <img 
          src={getProduct(1).image || 'https://placehold.co/300x300/D1E2C4/4B5D4B?text=Textiles'} 
          alt={getProduct(1).name || 'Category'} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
          <h3 className="text-lg font-bold text-white">{getProduct(1).name || 'Textiles'}</h3>
        </div>
      </Link>

      {/* Small Cell (1x1) */}
      <Link to={`/product/${getProduct(2)._id}`} className="group relative overflow-hidden rounded-lg">
        <img 
          src={getProduct(2).image || 'https://placehold.co/300x300/E8D8C9/8C6D52?text=Jewelry'} 
          alt={getProduct(2).name || 'Category'} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
          <h3 className="text-lg font-bold text-white">{getProduct(2).name || 'Jewelry'}</h3>
        </div>
      </Link>

      {/* Medium Cell (2x1) */}
      <Link to={`/product/${getProduct(3)._id}`} className="md:col-span-2 group relative overflow-hidden rounded-lg">
        <img 
          src={getProduct(3).image || 'https://placehold.co/600x300/F0E5DE/A67B5B?text=Decor'} 
          alt={getProduct(3).name || 'Category'} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <h3 className="text-2xl font-bold text-white">{getProduct(3).name || 'Home Decor'}</h3>
        </div>
      </Link>
    </div>
  );
};

export default BentoGrid;