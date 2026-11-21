import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      axios.get(`http://localhost:5000/api/orders/${orderId}`)
        .then(response => {
          setOrder(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching order:', error);
          setLoading(false);
        });
    }
  }, [orderId]);

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  return (
    <div className="order-confirmation">
      <div className="container">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-id">Order ID: {orderId}</p>
        
        {order && (
          <div className="order-details">
            <h2>Order Details</h2>
            <div className="detail-row">
              <span>Order Number:</span>
              <strong>{orderId}</strong>
            </div>
            <div className="detail-row">
              <span>Order Date:</span>
              <strong>{new Date(order.createdAt).toLocaleString()}</strong>
            </div>
            <div className="detail-row">
              <span>Payment Method:</span>
              <strong>{order.paymentMethod}</strong>
            </div>
            <div className="detail-row">
              <span>Total Amount:</span>
              <strong>Rs. {(order.totalAmount + order.deliveryCharges).toLocaleString()}</strong>
            </div>

            <h3>Shipping Address</h3>
            <div className="address-box">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>

            <h3>Order Items</h3>
            <div className="order-items-summary">
              {order.products.map((item, index) => (
                <div key={index} className="order-item-summary">
                  <img src={item.product?.image || 'https://via.placeholder.com/60' } alt={item.product?.name} />
                  <div className="item-info">
                    <p><strong>{item.product?.name || 'Product'}</strong></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <p className="item-total">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="order-total-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>Rs. {order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>{order.deliveryCharges === 0 ? 'FREE' : `Rs. ${order.deliveryCharges}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>Rs. {(order.totalAmount + order.deliveryCharges).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <div className="confirmation-actions">
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link to="/" className="btn btn-secondary">
            Go to Home
          </Link>
        </div>

        <div className="thank-you-note">
          <p>Thank you for shopping with MobileHub!</p>
          <p>We will send you order confirmation via email/SMS soon.</p>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;