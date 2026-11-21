import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'COD'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty! Please add products before checkout.');
      return;
    }

    setLoading(true);

    // Products array backend ke format mein
    const products = cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));

    const orderData = {
      userId: '6754321098abcdef12345678', // Temporary user ID
      products: products,
      shippingAddress: {
        name: formData.name,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      paymentMethod: formData.paymentMethod
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      console.log('Order response:', response.data);
      
      // 1. Cart clear karo
      clearCart();
      
      // 2. Seedha Confirmation page par bhej do (Alert nahi aayega)
      navigate(`/order-confirmation?orderId=${response.data.order._id}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      const errorMsg = error.response?.data?.message || 'Error placing order. Please try again.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const deliveryCharges = getCartTotal() > 10000 ? 0 : 200;
  const total = getCartTotal() + deliveryCharges;

  return (
    <div className="checkout">
      <div className="container">
        <h1>Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty. Please add products before checkout.</p>
            <button onClick={() => navigate('/shop')} className="btn btn-primary">
              Go to Shop
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Shipping Address Section */}
            <div className="form-section">
              <h2>Shipping Address</h2>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Street Address *</label>
                <input 
                  type="text" 
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>State/Province</label>
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>ZIP Code</label>
                  <input 
                    type="text" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="form-section">
              <h2>Payment Method</h2>
              
              <div className="payment-options">
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleChange}
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>

                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value="Online Payment"
                    checked={formData.paymentMethod === 'Online Payment'}
                    onChange={handleChange}
                  />
                  <span>Online Payment</span>
                </label>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="form-section">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item._id} className="order-item">
                    <img src={item.image} alt={item.name} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px'}} />
                    <div className="order-item-info">
                      <p><strong>{item.name}</strong></p>
                      <p>Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</p>
                    </div>
                    <p className="order-item-price">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>Rs. {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>{deliveryCharges === 0 ? 'FREE' : `Rs. ${deliveryCharges}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary btn-large"
              disabled={loading}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {loading ? 'Processing Order...' : 'Place Order'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Checkout;