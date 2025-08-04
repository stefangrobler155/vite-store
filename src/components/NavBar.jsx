// src/components/NavBar.jsx
import { Link } from 'react-router-dom';

export default function NavBar({ cartItem, handleLogout }) {
  const isLoggedIn = !!localStorage.getItem('jwt');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">My Shop</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart ({cartItem.length})
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-orders">My Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-account">My Account</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">Login/Signup</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}