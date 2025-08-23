import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User as UserIcon, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';

const Header = ({ cartItemCount, user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary cursor-pointer">
          Desi Etsy
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Admin Button */}
              {user.isAdmin && (
                <Link to="/dashboard/admin">
                  <Button variant="destructive">
                    <ShieldCheck className="mr-2 h-4 w-4" /> Admin
                  </Button>
                </Link>
              )}
              {/* Artisan Button (only shows if user is an artisan but NOT an admin) */}
              {user.isArtisan && !user.isAdmin && (
                <Link to="/dashboard/artisan">
                  <Button variant="outline">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Button>
                </Link>
              )}
              
              <span className="text-sm font-medium hidden sm:inline">Hi, {user.name.split(' ')[0]}</span>
              
              <Button variant="ghost" size="icon" onClick={handleLogoutClick}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button>
                <UserIcon className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;