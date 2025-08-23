import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signupUser } from '../api';

const SignupPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isArtisan, setIsArtisan] = useState(false);
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const userData = { name, email, password, isArtisan, shopName, location };
    try {
      const { data } = await signupUser(userData);
      onLoginSuccess(data);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create your account to start shopping or selling.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isArtisan" checked={isArtisan} onChange={(e) => setIsArtisan(e.target.checked)} />
              <Label htmlFor="isArtisan">Register as an Artisan</Label>
            </div>
            {isArtisan && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input id="shopName" required={isArtisan} value={shopName} onChange={(e) => setShopName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" required={isArtisan} value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">Create Account</Button>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;