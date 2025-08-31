import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    if (user) {
      loadProducts();
    }
  }, [user]);

  const handleDelete = async (productId) => {
    // We can replace this with our custom alert later
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((p) => p._id !== productId));
      } catch (err) {
        alert('Failed to delete product.');
      }
    }
  };

  if (!user || !user.isArtisan) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Artisan Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage your products and view their status.</p>
        </div>
        <Link to="/dashboard/artisan/add-product">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Products</CardTitle>
          <CardDescription>
            Products you have submitted for approval.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading your products...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">You have not added any products yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md bg-secondary" />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={product.isApproved ? 'default' : 'secondary'} className="bg-primary/10 text-primary hover:bg-primary/20">
                      {product.isApproved ? 'Approved' : 'Pending Review'}
                    </Badge>
                    <Link to={`/dashboard/artisan/edit/${product._id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
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