import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';
import Paginate from '../components/Paginate';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const { keyword, pageNumber } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProducts(keyword, pageNumber);
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [keyword, pageNumber]);

  return (
    <>
      {/* --- NEW: Full-Width Hero Section --- */}
      <section 
        className="relative h-[60vh] min-h-[400px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/potter.png')" }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Discover the Soul of India, Handmade with Love
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Explore authentic crafts from talented artisans across the nation.
          </p>
          <Button size="lg">Explore Crafts</Button>
        </div>
      </section>

      {/* Products Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
          Our Featured Products
        </h2>

        {loading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;