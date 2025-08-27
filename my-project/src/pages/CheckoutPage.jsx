import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CheckoutPage = ({ cart, onPlaceOrder }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingPrice = subtotal > 1000 ? 0 : 100;
  const taxPrice = Math.round(subtotal * 0.05);
  const totalPrice = subtotal + shippingPrice + taxPrice;

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      orderItems: cart.map(item => ({ ...item, product: item._id })),
      shippingAddress: { address, city, postalCode, country },
      paymentMethod: 'Razorpay',
      itemsPrice: subtotal,
      taxPrice,
      shippingPrice,
      totalPrice,
    };
    onPlaceOrder(orderData, navigate);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="shipping-form" onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" required value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Lucknow" required value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" placeholder="226001" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="India" required value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
              </form>
            </CardContent>
          </Card>
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
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span>₹{taxPrice.toLocaleString()}</span></div>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span><span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <Button type="submit" form="shipping-form" size="lg" className="w-full mt-4">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;