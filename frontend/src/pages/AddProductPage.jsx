import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createProduct } from '../api';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    countInStock: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createProduct(formData);
      alert('Product submitted for approval!');
      navigate('/dashboard/artisan');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product.');
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Add a New Product</CardTitle>
          <CardDescription>Fill out the details below. Your product will be submitted for admin approval.</CardDescription>
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
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="https://example.com/image.jpg" required value={formData.image} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" required value={formData.description} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full">Submit for Approval</Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default AddProductPage;