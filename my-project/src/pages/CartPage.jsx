import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CartPage = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingPrice = subtotal > 1000 ? 0 : 100; // Example shipping logic
  const total = subtotal + shippingPrice;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-secondary/50">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-secondary rounded-md overflow-hidden">
                    <img
                      src={item.image || `https://placehold.co/100x100/EBD4CB/86685D?text=...`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => onUpdateQuantity(item._id, parseInt(e.target.value, 10))}
                    className="w-16 text-center h-9"
                  />
                  <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item._id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>₹{shippingPrice.toLocaleString()}</span></div>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span><span>₹{total.toLocaleString()}</span>
                </div>
                <Link to="/checkout" className="w-full">
                  <Button size="lg" className="w-full mt-4">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;