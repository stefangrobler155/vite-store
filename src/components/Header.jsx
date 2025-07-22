import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
        <div className="header__navbar">
            <h1 className="header__logo">Test Store</h1>
            <nav className="header__nav">
                <Link to="/" className="header__nav-link">Home</Link>
                <Link to="/cart" className="header__nav-link">Cart</Link>
                <Link to="/checkout" className="header__nav-link">Checkout</Link>
            </nav>
        </div>
    </header>
  );
}