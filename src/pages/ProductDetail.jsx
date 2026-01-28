// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';

const ProductDetail = () => {
  const { id } = useParams(); 
  const { products, addToCart } = useAppContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Find product by ID
    const found = products.find(p => p.id === Number(id));
    if (found) {
      setProduct(found);
    }
    setLoading(false);
  }, [id, products]);

  if (loading) {
    return (
      <div className="detail-loading">
        <Navbar />
        <div className="skeleton-detail">
          <div className="skeleton-image-big"></div>
          <div className="skeleton-info">
            <div className="skeleton-text big-title"></div>
            <div className="skeleton-text price"></div>
            <div className="skeleton-text description"></div>
            <div className="skeleton-text button"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found">
        <Navbar />
        <h1>Product Not Found</h1>
        <p>Sorry, we couldn't find that product.</p>
        <Footer />
      </div>
    );
  }

  const imagePath = `/products/product (${product.id}).jfif`;

  return (
    <div className="product-detail-page">
      <Navbar />

      <div className="detail-container">
        <div className="product-image-section">
          <img
            src={imagePath}
            alt={product.name}
            className="main-product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
            }}
          />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>

          <div className="price-block">
            <span className="current-price">
              PKR {product.price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <>
                <span className="old-price">
                  PKR {Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}
                </span>
                <span className="discount-tag">-{product.discount}% OFF</span>
              </>
            )}
          </div>

          <p className="product-description">
            {product.description || 'Beautiful handmade crochet item, crafted with love and care. Perfect for everyday style or special occasions.'}
          </p>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="qty-controls">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="add-to-cart-btn"
              onClick={() => {
                addToCart({ ...product, quantity });
                alert(`${product.name} (${quantity}) added to cart!`);
              }}
            >
              Add to Cart
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>

          {product.category && (
            <p className="category-tag">
              Category: <strong>{product.category}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Related Products Section (simple) */}
      <section className="related-products">
        <h2>You May Also Like</h2>
        <div className="related-grid">
          {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;