import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';

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
      <section className="bg-stone-100 dark:bg-stone-800 border-b">
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Discover Authentic Handmade Crafts
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A curated marketplace connecting you with the finest artisans from across the nation.
          </p>
          <SearchBox />
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center md:text-left">
          {keyword ? `Search Results for "${keyword}"` : 'Featured Products'}
        </h2>
        {loading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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