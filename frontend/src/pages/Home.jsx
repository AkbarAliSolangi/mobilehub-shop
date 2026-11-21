import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?category=Smartphone');
        setFeaturedProducts(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { name: 'Smartphones', icon: '📱', link: '/shop?category=Smartphone' },
    { name: 'Covers', icon: '🛡️', link: '/shop?category=Cover' },
    { name: 'Chargers', icon: '🔌', link: '/shop?category=Charger' },
    { name: 'Earphones', icon: '🎧', link: '/shop?category=Earphone' },
    { name: 'Power Banks', icon: '🔋', link: '/shop?category=Power Bank' },
    { name: 'Smart Watches', icon: '⌚', link: '/shop?category=Smart Watch' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
    <section className="hero">
      <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to MobileHub</h1>
          <p>Your One-Stop Shop for Mobile Phones & Accessories</p>
           <p className="hero-subtitle">Genuine Products | Best Prices | Fast Delivery</p>
           <Link to="/shop" className="btn btn-primary">
           Shop Now
          </Link>
        </div>
    </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className="category-card">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Smartphones</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to="/shop" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">✓</span>
              <h3>100% Genuine Products</h3>
              <p>All products come with official warranty</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🚚</span>
              <h3>Fast Delivery</h3>
              <p>2-3 days delivery across Pakistan</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💳</span>
              <h3>Secure Payment</h3>
              <p>Multiple payment options including COD</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔄</span>
              <h3>Easy Returns</h3>
              <p>7-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;