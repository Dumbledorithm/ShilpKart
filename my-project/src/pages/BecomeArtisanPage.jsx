import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { becomeArtisan } from '../api';

const BecomeArtisanPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await becomeArtisan({ shopName, location });
      onLoginSuccess(data); // Update the global user state with the new role
      navigate('/dashboard/artisan'); // Redirect to the artisan dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Become a Seller on ShilpKart</CardTitle>
          <CardDescription>Fill out your shop details below to start selling your crafts.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div className="grid gap-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                placeholder="e.g., Creative Pottery"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Your Location (City, State)</Label>
              <Input
                id="location"
                placeholder="e.g., Jaipur, Rajasthan"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit Application</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BecomeArtisanPage;