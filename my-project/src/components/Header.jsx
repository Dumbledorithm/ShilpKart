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
    <header className="bg-card border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <span>ShilpKart</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground transform translate-x-1/2 -translate-y-1/2">
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
                  <Button variant="outline">
                    <ShieldCheck className="mr-2 h-4 w-4" /> Admin Panel
                  </Button>
                </Link>
              )}
              {/* Artisan Button */}
              {user.isArtisan && !user.isAdmin && (
                <Link to="/dashboard/artisan">
                  <Button variant="outline">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Button>
                </Link>
              )}
              
              <Button variant="ghost" size="icon" onClick={handleLogoutClick} title="Logout">
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

















































