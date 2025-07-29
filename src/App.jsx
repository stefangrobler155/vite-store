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

export default function App() {

  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path='/product/:id' element={<SingleProduct />} />
      </Routes>
    <Footer />
    </>
    
  );
}
