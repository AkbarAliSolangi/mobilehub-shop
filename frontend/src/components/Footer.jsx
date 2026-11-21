function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>MobileHub</h3>
          <p>Your trusted online destination for mobile phones and accessories.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📧 info@mobilehub.com</p>
          <p>📞 +92 300 1234567</p>
          <p>📍 Karachi, Pakistan</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 MobileHub Online Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;