// App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Add more routes as needed */}
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
        {/* Default fallback route */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    <Footer />
    </>
    
  );
}
