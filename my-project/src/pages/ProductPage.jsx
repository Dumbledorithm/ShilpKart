import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from 'lucide-react';

const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Could not find this product.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <Link to="/" className="inline-block mb-8">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </Link>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Side: Image */}
        <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
          <img
            src={product.image || `https://placehold.co/600x600/EBD4CB/86685D?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{product.category}</p>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="text-sm text-muted-foreground">(No reviews yet)</span>
          </div>

          <p className="text-3xl font-bold text-foreground my-6">₹{product.price.toLocaleString()}</p>
          
          <p className="text-secondary-foreground leading-relaxed text-base mb-8">{product.description}</p>
          
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {product.countInStock > 0 ? `In Stock (${product.countInStock} available)` : 'Out of Stock'}
                </span>
            </div>
            <Button 
              size="lg" 
              className="w-full text-base" 
              disabled={product.countInStock === 0} 
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;