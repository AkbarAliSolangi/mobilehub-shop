import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About MobileHub</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            MobileHub is Pakistan's leading online destination for mobile phones and accessories. 
            We provide genuine products at competitive prices with fast delivery across the country.
          </p>
        </section>

        <section className="about-section">
          <h2>Marketing Strategy</h2>
          <div className="strategy-grid">
            <div className="strategy-card">
              <h3>📱 Social Media Marketing</h3>
              <p>Active presence on Facebook, Instagram, TikTok, and YouTube with daily posts, reels, and tech reviews.</p>
            </div>
            
            <div className="strategy-card">
              <h3>🎯 Influencer Partnerships</h3>
              <p>Collaborating with tech YouTubers and bloggers for product reviews and unboxing videos.</p>
            </div>
            
            <div className="strategy-card">
              <h3>💰 Seasonal Discounts</h3>
              <p>Special offers during Eid, Independence Day, New Year, and flash sales every weekend.</p>
            </div>
            
            <div className="strategy-card">
              <h3>⭐ Customer Reviews</h3>
              <p>Encouraging customers to leave reviews and ratings to build trust and attract new buyers.</p>
            </div>
            
            <div className="strategy-card">
              <h3>🎁 Referral Program</h3>
              <p>Get Rs. 1,000 off for every friend you refer to MobileHub.</p>
            </div>
            
            <div className="strategy-card">
              <h3>🚚 Fast Delivery</h3>
              <p>2-3 days delivery in major cities with free shipping on orders above Rs. 10,000.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Choose MobileHub?</h2>
          <ul className="benefits-list">
            <li>✓ 100% Genuine Products with Official Warranty</li>
            <li>✓ Competitive Prices with Price Matching Guarantee</li>
            <li>✓ 7-Day Hassle-Free Return Policy</li>
            <li>✓ 24/7 Customer Support</li>
            <li>✓ Secure Payment Options (COD & Online)</li>
            <li>✓ Wide Range of Products (50+ items)</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Area of Success</h2>
          <div className="success-grid">
            <div className="success-card">
              <h3>🎯 Target Audience</h3>
              <p>Students, young professionals, and tech enthusiasts aged 18-35 years</p>
            </div>
            
            <div className="success-card">
              <h3>📍 Coverage Area</h3>
              <p>Major cities: Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and expanding to 10+ cities</p>
            </div>
            
            <div className="success-card">
              <h3>💡 Unique Selling Points</h3>
              <p>Genuine products, fast delivery, excellent customer service, and competitive pricing</p>
            </div>
          </div>
        </section>
        <section className="about-section">
         <h2>Products Worth & Inventory</h2>
         <div className="inventory-stats">
           <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-number">50+</p>
           </div>
         <div className="stat-card">
         <h3>Categories</h3>
         <p className="stat-number">8</p>
         </div>
    <div className="stat-card">
      <h3>Inventory Value</h3>
      <p className="stat-number">Rs. 2.13 Crore</p>
    </div>
    <div className="stat-card">
      <h3>Monthly Revenue Target</h3>
      <p className="stat-number">Rs. 8.7 Million</p>
    </div>
  </div>
</section>

        <div className="cta-section">
          <h2>Ready to Shop?</h2>
          <Link to="/shop" className="btn btn-primary btn-large">
            Browse Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;