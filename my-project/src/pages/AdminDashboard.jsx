import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllUsers, verifyArtisan, fetchAllProducts, approveProduct, rejectArtisan, rejectProduct } from '../api';

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
      setError('Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      loadData();
    }
  }, [user]);

  const handleVerifyArtisan = async (userId) => {
    try {
      await verifyArtisan(userId);
      setUsers(users.map(u => u._id === userId ? { ...u, artisanDetails: { ...u.artisanDetails, verified: true } } : u));
      alert('Artisan verified!');
    } catch (err) {
      alert('Failed to verify artisan.');
    }
  };

  const handleRejectArtisan = async (userId) => {
    if (window.confirm('Are you sure you want to reject and delete this artisan application? This action cannot be undone.')) {
      try {
        await rejectArtisan(userId);
        setUsers(users.filter(u => u._id !== userId));
        alert('Artisan application rejected and user removed.');
      } catch (err) {
        alert('Failed to reject artisan.');
      }
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await approveProduct(productId);
      setProducts(products.map(p => p._id === productId ? { ...p, isApproved: true } : p));
      alert('Product approved!');
    } catch (err) {
      alert('Failed to approve product.');
    }
  };

  const handleRejectProduct = async (productId) => {
    if (window.confirm('Are you sure you want to reject and delete this product? This action cannot be undone.')) {
      try {
        await rejectProduct(productId);
        setProducts(products.filter(p => p._id !== productId));
        alert('Product rejected and removed.');
      } catch (err) {
        alert('Failed to reject product.');
      }
    }
  };

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const unverifiedArtisans = users.filter(u => u.isArtisan && !u.artisanDetails.verified);
  const unapprovedProducts = products.filter(p => !p.isApproved);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Verify new artisans and approve product listings.</p>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading dashboard data...</div>
      ) : error ? (
        <div className="text-center py-10 text-destructive">{error}</div>
      ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Artisan Verification Section */}
          <Card>
            <CardHeader>
              <CardTitle>Artisan Verification</CardTitle>
              <CardDescription>Review and verify new artisan accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              {unverifiedArtisans.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No artisans are pending verification.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {unverifiedArtisans.map(artisan => (
                    <div key={artisan._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{artisan.artisanDetails.shopName}</h3>
                        <p className="text-sm text-muted-foreground">{artisan.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => handleVerifyArtisan(artisan._id)}>Verify</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectArtisan(artisan._id)}>Reject</Button>
                      </div>
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
              <CardDescription>Review and approve new products.</CardDescription>
            </CardHeader>
            <CardContent>
              {unapprovedProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No products are pending approval.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {unapprovedProducts.map(product => (
                    <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg">
                       <div className="flex items-center gap-4">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md bg-secondary" />
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">by {product.user?.name || 'N/A'}</p>
                          </div>
                        </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => handleApproveProduct(product._id)}>Approve</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectProduct(product._id)}>Reject</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;