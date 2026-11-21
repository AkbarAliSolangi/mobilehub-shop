import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Step 1: useNavigate import kiya
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Step 2: useNavigate ko initialize kiya
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ user: '', comment: '', rating: 5 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add to Cart Function
  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, quantity);
    } else {
      alert('Sorry, this product is out of stock!');
    }
  };

  // Buy Now Function (Yahan useNavigate use hua hai)
  const handleBuyNow = () => {
    if (product.stock > 0) {
      addToCart(product, quantity); // Pehle cart mein add karo
      
      // Step 3: window.location.href ki jagah navigate() use karo
      navigate('/checkout'); 
    } else {
      alert('Sorry, this product is out of stock!');
    }
  };

  // Review Submit Function
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/products/${id}/review`, reviewForm);
      alert('Review submitted successfully!');
      setReviewForm({ user: '', comment: '', rating: 5 });
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/shop" className="back-link">← Back to Shop</Link>

        <div className="product-detail-grid">
          <div className="product-images">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-category">{product.category}</p>
            
            <div className="product-rating">
              {'⭐'.repeat(Math.round(product.rating))}
              <span className="rating-count">({product.reviews?.length || 0} reviews)</span>
            </div>

            <div className="product-price">
              <span className="price">Rs. {product.price.toLocaleString()}</span>
            </div>

            <p className="warranty">✓ {product.warranty}</p>
            <p className="stock">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </p>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <input 
                type="number" 
                value={quantity} 
                min="1" 
                max={product.stock}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="product-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="product-specifications">
                <h3>Specifications</h3>
                <table>
                  <tbody>
                    {product.specifications.ram && (
                      <tr><td><strong>RAM</strong></td><td>{product.specifications.ram}</td></tr>
                    )}
                    {product.specifications.rom && (
                      <tr><td><strong>Storage</strong></td><td>{product.specifications.rom}</td></tr>
                    )}
                    {product.specifications.processor && (
                      <tr><td><strong>Processor</strong></td><td>{product.specifications.processor}</td></tr>
                    )}
                    {product.specifications.camera && (
                      <tr><td><strong>Camera</strong></td><td>{product.specifications.camera}</td></tr>
                    )}
                    {product.specifications.battery && (
                      <tr><td><strong>Battery</strong></td><td>{product.specifications.battery}</td></tr>
                    )}
                    {product.specifications.display && (
                      <tr><td><strong>Display</strong></td><td>{product.specifications.display}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="reviews-section">
          <h2>Customer Reviews</h2>

          <form className="review-form" onSubmit={handleSubmitReview}>
            <h3>Write a Review</h3>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={reviewForm.user}
              onChange={(e) => setReviewForm({...reviewForm, user: e.target.value})}
              required
            />
            <select 
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
            >
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Good</option>
              <option value="3">⭐⭐⭐ Average</option>
              <option value="2">⭐⭐ Poor</option>
              <option value="1">⭐ Terrible</option>
            </select>
            <textarea 
              placeholder="Write your review..." 
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
              required
            />
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>

          <div className="reviews-list">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <strong>{review.user}</strong>
                    <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <span className="review-date">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;