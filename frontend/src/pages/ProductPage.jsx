import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <Link to="/">
        <Button variant="outline" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </Link>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square">
          <img
            src={product.image || `https://placehold.co/600x600/EBD4CB/86685D?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg border"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>
          <p className="text-muted-foreground mt-2">{product.category}</p>
          <p className="text-3xl font-semibold text-primary my-4">₹{product.price.toLocaleString()}</p>
          <p className="text-secondary-foreground leading-relaxed text-base">{product.description}</p>
          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.countInStock > 0 ? `${product.countInStock} in Stock` : 'Out of Stock'}
                </span>
            </div>
            <Button size="lg" className="w-full text-base" disabled={product.countInStock === 0} onClick={() => onAddToCart(product)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;