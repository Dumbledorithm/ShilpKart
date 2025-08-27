import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchMyOrders } from '../api';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const { data } = await fetchMyOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch your orders.');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          My Orders
        </h1>
        <p className="text-muted-foreground mt-1">View your complete order history.</p>
      </div>

      {loading ? (
        <p>Loading your orders...</p>
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground">You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <CardTitle>Order #{order._id.substring(0, 8)}</CardTitle>
                  <CardDescription>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant={order.isDelivered ? 'default' : 'secondary'} className="mt-2 sm:mt-0">
                  {order.isDelivered ? 'Delivered' : 'Processing'}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-secondary"/>
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.qty} x ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/50 p-4 rounded-b-lg">
                <p className="font-semibold text-right w-full">
                  Total: ₹{order.totalPrice.toLocaleString()}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;