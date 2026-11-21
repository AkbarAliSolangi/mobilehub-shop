import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const deliveryCharges = getCartTotal() > 10000 ? 0 : 200;
  const total = getCartTotal() + deliveryCharges;

  return (
    <div className="cart">
      <div className="container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="price">Rs. {item.price.toLocaleString()}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <p>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    <button 
                      className="btn-remove" 
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>Rs. {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charges:</span>
                <span>{deliveryCharges === 0 ? 'FREE' : `Rs. ${deliveryCharges}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary btn-large">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;