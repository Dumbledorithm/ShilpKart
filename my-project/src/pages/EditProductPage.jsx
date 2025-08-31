import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProductById, updateProduct, uploadImage } from '../api';

const EditProductPage = () => {
  const { id: productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    countInStock: '',
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductById(productId);
        setFormData({
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
          countInStock: data.countInStock,
        });
      } catch (err) {
        setError('Failed to fetch product data.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const { data } = await uploadImage(file);
      setFormData({ ...formData, image: data.image });
    } catch (err) {
      setError('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateProduct(productId, formData);
      alert('Product updated successfully! It will be re-submitted for approval.');
      navigate('/dashboard/artisan');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  return (
    <div className="container mx-auto flex justify-center items-center py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Product</CardTitle>
          <CardDescription>Update the details below. Your product will be re-submitted for admin approval.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" required value={formData.price} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="countInStock">Count In Stock</Label>
                <Input id="countInStock" type="number" required value={formData.countInStock} onChange={handleChange} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Home Decor, Apparel" required value={formData.category} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image-upload">Image</Label>
              <Input id="image-upload" type="file" onChange={handleFileUpload} />
              {uploading && <p className="text-sm text-muted-foreground">Uploading image...</p>}
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" className="h-24 w-24 object-cover rounded-md mt-2" />
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" required value={formData.description} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? 'Waiting for upload...' : 'Update Product'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default EditProductPage;