import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components, Layout & Pages
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import CustomAlert from './components/CustomAlert';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CheckoutPage from './pages/CheckoutPage';
import ArtisanDashboard from './pages/ArtisanDashboard';
import AddProductPage from './pages/AddProductPage';
import AdminDashboard from './pages/AdminDashboard';
import MyOrdersPage from './pages/MyOrdersPage';
import EditProductPage from './pages/EditProductPage';
import BecomeArtisanPage from './pages/BecomeArtisanPage';

// API
import { createOrder } from './api';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] =  useState(null);

  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
    title: '',
    description: '',
  });

  const showAlert = (title, description) => {
    setAlertInfo({ isOpen: true, title, description });
  };

  const closeAlert = () => {
    setAlertInfo({ isOpen: false, title: '', description: '' });
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setCart([]);
  };

  const handleAddToCart = (productToAdd) => {
    if (!user) {
      showAlert('Login Required', 'Please log in to add items to your cart.');
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === productToAdd._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === productToAdd._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...productToAdd, qty: 1 }];
    });
    showAlert('Success!', `${productToAdd.name} has been added to the cart.`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, qty: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const handlePlaceOrder = async (orderData, navigate) => {
    if (!user) {
      showAlert('Login Required', 'Please login to place an order.');
      navigate('/login');
      return;
    }
    try {
      await createOrder(orderData);
      showAlert('Order Placed!', 'Your order has been placed successfully.');
      setCart([]);
      navigate('/');
    } catch (error) {
      showAlert('Order Failed', error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Header
          cartItemCount={cart.reduce((sum, item) => sum + item.qty, 0)}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-grow">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<SignupPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/cart" element={<CartPage cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />} />

            {/* --- Protected Routes --- */}
            <Route path="/checkout" element={
              <ProtectedRoute user={user}>
                <CheckoutPage cart={cart} onPlaceOrder={handlePlaceOrder} />
              </ProtectedRoute>
            }/>
            <Route path="/my-orders" element={
              <ProtectedRoute user={user}>
                <MyOrdersPage />
              </ProtectedRoute>
            }/>
            <Route path="/become-artisan" element={
              <ProtectedRoute user={user}>
                <BecomeArtisanPage onLoginSuccess={handleLoginSuccess} />
              </ProtectedRoute>
            }/>
            <Route path="/dashboard/artisan" element={
              <ProtectedRoute user={user} requiredRole="artisan">
                <ArtisanDashboard user={user} />
              </ProtectedRoute>
            }/>
            <Route path="/dashboard/artisan/add-product" element={
              <ProtectedRoute user={user} requiredRole="artisan">
                <AddProductPage />
              </ProtectedRoute>
            }/>
            <Route path="/dashboard/artisan/edit/:id" element={
              <ProtectedRoute user={user} requiredRole="artisan">
                <EditProductPage />
              </ProtectedRoute>
            }/>
            <Route path="/dashboard/admin" element={
              <ProtectedRoute user={user} requiredRole="admin">
                <AdminDashboard user={user} />
              </ProtectedRoute>
            }/>
          </Routes>
        </main>
        <CustomAlert
          isOpen={alertInfo.isOpen}
          onClose={closeAlert}
          title={alertInfo.title}
          description={alertInfo.description}
        />
      </div>
    </Router>
  );
}

export default App;