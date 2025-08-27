import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../api';
import { Button } from '@/components/ui/button';
import BentoGrid from '../components/BentoGrid';
import Marquee from '@/components/Marquee';

const HomePage = () => {
  const { keyword, pageNumber } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const craftForms = [
    "Madhubani Painting",
    "Block Printing",
    "Blue Pottery",
    "Handloom Weaving",
    "Warli Art",
    "Terracotta Crafts",
    "Pashmina Shawls",
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // We fetch more products than needed for the grid to have fallbacks
        const { data } = await fetchProducts(keyword, pageNumber);
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [keyword, pageNumber]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] min-h-[400px] bg-cover bg-center flex items-center justify-center text-white rounded-lg overflow-hidden"
        style={{ backgroundImage: "url('/potter.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 text-transparent bg-clip-text">
            Discover the Soul of India, Handmade with Love
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Explore authentic crafts from talented artisans across the nation.
          </p>
          <Button size="lg">Explore Crafts</Button>
        </div>
      </section>
       <div className="mt-8">
        <Marquee items={craftForms} />
      </div>

      {/* Products Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
          Featured Collections
        </h2>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <BentoGrid products={products} />
        )}
      </div>
    </div>
  );
};

export default HomePage;