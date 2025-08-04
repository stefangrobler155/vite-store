// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Downloads from './pages/Downloads'; // Add import
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import MyOrders from './pages/MyOrders';
import MyAccount from './pages/MyAccount';
import Products from './pages/Products';
import Auth from './pages/Auth';
import SingleProduct from './pages/SingleProduct';
import Dashboard from './pages/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { logoutUser } from './utils/api';

export default function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem('cart')) || []);
    };
    window.addEventListener('storage', handleStorageChange);
    localStorage.setItem('cart', JSON.stringify(cart));
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [cart]);

  const addToCart = (product) => {
    const currentCart = [...cart];
    const productExists = currentCart.find((item) => item.id === product.id);

    if (productExists) {
      productExists.quantity += 1;
    } else {
      product.quantity = 1;
      currentCart.push(product);
    }

    setCart(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    toast.success('Item Added To Cart');
  };

  const removeCartItem = (product) => {
    if (window.confirm('You are about to remove this item from your cart!')) {
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Product removed from Cart!');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCart([]);
      localStorage.setItem('cart', JSON.stringify([]));
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed: ' + error.message);
    }
  };

  function ProtectedRoute({ children }) {
    return localStorage.getItem('jwt') ? children : <Navigate to="/auth" />;
  }

  return (
    <>
      <NavBar cartItem={cart} handleLogout={handleLogout} />
      <div className="container">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products handleAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart handleRemoveItem={removeCartItem} cart={cart} />} />
          <Route path="/checkout" element={<Checkout handleRemoveItem={removeCartItem} cart={cart} />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/product/:productId" element={<SingleProduct handleAddToCart={addToCart} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/downloads/:orderId"
            element={
              <ProtectedRoute>
                <Downloads />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}