import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; // Import useSearchParams
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser,fetchUserProfile } from '../api';
import { Chrome } from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const googleLoginUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/auth/google`;

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const handleGoogleRedirect = async () => {
        try {
          localStorage.setItem('userInfo', JSON.stringify({ token }));
          const { data: userProfile } = await fetchUserProfile();
          const fullUserData = { ...userProfile, token };
          onLoginSuccess(fullUserData);
          
          // 4. Finally, navigate to the homepage.
          navigate('/');
        } catch (e) {
          setError('Could not fetch user profile after Google login.');
          localStorage.removeItem('userInfo'); // Clean up on failure
        }
      };
      handleGoogleRedirect();
    }
  }, [searchParams, onLoginSuccess, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginUser({ email, password });
      onLoginSuccess(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">Sign in</Button>
            
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <a href={googleLoginUrl} className="w-full">
              <Button variant="outline" className="w-full" type="button">
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
            </a>

            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;