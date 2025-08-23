import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { fetchMyProducts, deleteProduct } from '../api';

const ArtisanDashboard = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchMyProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch your products.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((p) => p._id !== productId));
        alert('Product deleted successfully.');
      } catch (err) {
        alert('Failed to delete product.');
      }
    }
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Artisan Dashboard
        </h1>
        <Link to="/dashboard/artisan/add-product">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Products</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading your products...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && products.length === 0 ? (
            <p className="text-muted-foreground">You have not added any products yet.</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={product.isApproved ? 'default' : 'secondary'}>
                      {product.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                    <Button variant="ghost" size="icon" disabled>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product._id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtisanDashboard;