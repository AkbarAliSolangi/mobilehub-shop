import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = 'http://localhost:5000/api/products';
        const params = new URLSearchParams();
        
        if (category) params.append('category', category);
        if (searchTerm) params.append('search', searchTerm);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchTerm]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="shop">
      <div className="container">
        <h1>{category ? `${category}s` : 'All Products'}</h1>

        {/* Filters */}
        <div className="shop-filters">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={category} 
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Smartphone">Smartphones</option>
              <option value="Cover">Covers</option>
              <option value="Charger">Chargers</option>
              <option value="USB Cable">USB Cables</option>
              <option value="Earphone">Earphones</option>
              <option value="Power Bank">Power Banks</option>
              <option value="Screen Protector">Screen Protectors</option>
              <option value="Smart Watch">Smart Watches</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Search:</label>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;