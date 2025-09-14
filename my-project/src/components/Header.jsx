import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart, User as UserIcon, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import SearchBox from './SearchBox';

const Header = ({ cartItemCount, user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
          <img src="/Vector.svg" alt="Logo" className="h-8 w-8" />
          <span>ShilpKart</span>
        </Link>

        <div className="hidden md:flex flex-grow justify-center">
          <SearchBox />
        </div>

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Hi, {user?.name?.split(' ')[0]}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/my-orders">My Orders</Link>
                </DropdownMenuItem>
              {user.isAdmin && <DropdownMenuItem asChild><Link to="/dashboard/admin">Admin Panel</Link></DropdownMenuItem>}
              {user.isArtisan && !user.isAdmin && <DropdownMenuItem asChild><Link to="/dashboard/artisan">Artisan Dashboard</Link></DropdownMenuItem>}
              {!user.isArtisan && !user.isAdmin && (
                <DropdownMenuItem asChild><Link to="/become-artisan">Become a Seller</Link></DropdownMenuItem>
              )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick} className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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









































