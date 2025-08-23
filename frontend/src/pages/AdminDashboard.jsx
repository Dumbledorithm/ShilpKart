import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchAllUsers, verifyArtisan, fetchAllProducts, approveProduct } from '../api';

const AdminDashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersResponse, productsResponse] = await Promise.all([
        fetchAllUsers(),
        fetchAllProducts(),
      ]);
      setUsers(usersResponse.data);
      setProducts(productsResponse.data);
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVerifyArtisan = async (userId) => {
    try {
      await verifyArtisan(userId);
      // Update the user's status in the local state to reflect the change immediately
      setUsers(users.map(u => u._id === userId ? { ...u, artisanDetails: { ...u.artisanDetails, verified: true } } : u));
      alert('Artisan verified!');
    } catch (err) {
      alert('Failed to verify artisan.');
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await approveProduct(productId);
      // Update the product's status in the local state
      setProducts(products.map(p => p._id === productId ? { ...p, isApproved: true } : p));
      alert('Product approved!');
    } catch (err) {
      alert('Failed to approve product.');
    }
  };


  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const unverifiedArtisans = users.filter(u => u.isArtisan && !u.artisanDetails.verified);
  const unapprovedProducts = products.filter(p => !p.isApproved);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Artisan Verification Section */}
        <Card>
          <CardHeader>
            <CardTitle>Artisan Verification</CardTitle>
            <CardDescription>Review and verify new artisan accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            {unverifiedArtisans.length === 0 ? (
              <p className="text-muted-foreground">No artisans are pending verification.</p>
            ) : (
              <div className="space-y-4">
                {unverifiedArtisans.map(artisan => (
                  <div key={artisan._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{artisan.artisanDetails.shopName}</h3>
                      <p className="text-sm text-muted-foreground">{artisan.name} - {artisan.email}</p>
                    </div>
                    <Button onClick={() => handleVerifyArtisan(artisan._id)}>Verify</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Approval Section */}
        <Card>
          <CardHeader>
            <CardTitle>Product Approval</CardTitle>
            <CardDescription>Review and approve new products submitted by artisans.</CardDescription>
          </CardHeader>
          <CardContent>
            {unapprovedProducts.length === 0 ? (
              <p className="text-muted-foreground">No products are pending approval.</p>
            ) : (
              <div className="space-y-4">
                {unapprovedProducts.map(product => (
                  <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg">
                     <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">by {product.user?.name || 'N/A'}</p>
                        </div>
                      </div>
                    <Button onClick={() => handleApproveProduct(product._id)}>Approve</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;