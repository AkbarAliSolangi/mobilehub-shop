import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isCategoryActive = (category) => {
    return location.pathname === '/shop' && location.search === `?category=${encodeURIComponent(category)}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/assets/logo.png" alt="MobileHub Logo" className="logo-img" />
          <span className="logo-text">MobileHub</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={`navbar-link ${isActive('/shop') && !location.search ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/shop?category=Smartphone" 
            className={`navbar-link ${isCategoryActive('Smartphone') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Smartphones
          </Link>
          <Link 
            to="/shop?category=Smart Watch" 
            className={`navbar-link ${isCategoryActive('Smart Watch') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Smart Watches
          </Link>
          <Link 
            to="/about" 
            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-icon">
            <FiShoppingCart size={24} />
            <span className="cart-count">{getCartCount()}</span>
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;