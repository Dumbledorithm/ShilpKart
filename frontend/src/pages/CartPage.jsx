import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft } from 'lucide-react';

const CartPage = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || `https://placehold.co/100x100/EBD4CB/86685D?text=...`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => onUpdateQuantity(item._id, parseInt(e.target.value, 10))}
                      className="w-16 text-center"
                    />
                    <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item._id)}>
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="p-6 border rounded-lg sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout" className="w-full">
                <Button size="lg" className="w-full mt-6">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;