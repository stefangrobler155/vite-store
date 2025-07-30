import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Router } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import MyOrders from './pages/MyOrders';
import MyAccount from './pages/MyAccount';
import Products from './pages/Products';
import Auth from './pages/Auth';
import SingleProduct from './pages/SingleProduct';
import "./utils/api"
import { ToastContainer, toast } from "react-toastify"
import { useState } from 'react';

export default function App() {
  const [cart, setCart] = useState([])
  
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    
    const productExists = cart.find(item => item.id === product.id  )
    if (productExists) {
      productExists.quantity += 1;
    }else{
      product.quantity = 1;
      cart.push(product)
    }

    setCart([...cart])
    localStorage.setItem("cart", JSON.stringify(cart))
    
    toast.success("Item Added To Cart")
    console.log(product);
    
  }
  return (
    <>
    <NavBar cartItem={cart} />
     <div className="container">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products handleAddToCart={addToCart}  />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path='/product/:productId' element={<SingleProduct handleAddToCart={addToCart} />} />
      </Routes>
      </div>
    <Footer />
    </>
    
  );
}
