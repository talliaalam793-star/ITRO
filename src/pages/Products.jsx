// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // For addToCart
import { products } from '../data/products.js';  // Real product data

// Category images from real searches
const categoryImages = {
  'All': 'https://i1.pickpik.com/photos/734/454/404/knitting-handwork-hobby-handmade-preview.jpg',
  'Sweater': 'https://get.pxhere.com/photo/pattern-clothing-outerwear-wool-sweater-crochet-knitting-textile-art-clothes-cardigan-fashion-accessory-983219.jpg',
  'Cardigan': 'https://live.staticflickr.com/2878/11353963065_c2a319f4f3_b.jpg',
  'Home Decor': 'https://images.pexels.com/photos/11449240/pexels-photo-11449240.jpeg',
  'Hair Accessories': 'https://get.pxhere.com/photo/petal-cute-decoration-pattern-green-lace-fashion-clothing-baby-hook-crochet-knitting-textile-art-newborn-accessories-handmade-bow-clothes-hobby-fashion-accessory-1275190.jpg',
  'Gloves': 'https://get.pxhere.com/photo/winter-pattern-wool-thread-crochet-knitting-textile-art-hands-fingers-mixed-gloves-coloured-fashion-accessory-678112.jpg',
  'Bag': 'https://i2.pickpik.com/photos/645/601/318/bag-crocheting-yarn-diy-preview.jpg',
  'Scarfs': 'https://images.pexels.com/photos/19814912/pexels-photo-19814912/free-photo-of-folded-crochet-scarf.jpeg',
};

// Styles (unchanged)
const styles = {
  container: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    gap: '20px',
  },
  sidebar: {
    width: '250px',
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: '100px',
    height: 'fit-content',
    transition: 'all 0.3s ease',
  },
  sidebarCard: {
    textAlign: 'center',
  },
  categoryTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ff69b4',
    marginBottom: '20px',
  },
  categoryButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  categoryButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  categoryImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ff69b4',
    transition: 'border-color 0.3s ease',
  },
  activeCategoryImage: {
    borderColor: '#d81b60',
  },
  categoryLabel: {
    marginTop: '10px',
    fontSize: '1rem',
    color: '#ff69b4',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
  activeCategoryLabel: {
    color: '#d81b60',
  },
  main: {
    flex: 1,
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '30px',
  },
  filterHeading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ff69b4',
  },
  filterRight: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  sortSelect: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  viewToggle: {
    display: 'flex',
    gap: '10px',
  },
  viewButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    background: '#ffe4e1',
    color: '#ff69b4',
  },
  activeViewButton: {
    background: '#ff69b4',
    color: '#fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  productCardGrid: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    padding: '15px',
    textAlign: 'center',
  },
  productCardList: {
    display: 'flex',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    padding: '15px',
  },
  productImageGrid: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '15px',
  },
  productImageList: {
    width: '30%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '12px',
    marginRight: '20px',
  },
  productDetailsList: {
    flex: 1,
  },
  title: {
    fontSize: '1.4rem',
    color: '#333',
    marginBottom: '10px',
    textDecoration: 'none',
  },
  shortDesc: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '10px',
  },
  price: {
    fontSize: '1.3rem',
    color: '#ff69b4',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  discountBadge: {
    background: '#d81b60',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    marginLeft: '10px',
  },
  rating: {
    fontSize: '1rem',
    color: '#ff69b4',
    marginBottom: '15px',
  },
  addButton: {
    padding: '10px 20px',
    background: '#ff69b4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    marginRight: '10px',
  },
  buyButton: {
    padding: '10px 20px',
    background: '#d81b60',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  mobileToggle: {
    display: 'none',
    background: '#ff69b4',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};

// Categories in specified order
const categories = [
  'All', 'Sweater', 'Cardigan', 'Home Decor', 'Hair Accessories', 'Gloves', 'Bag', 'Scarfs'
];

function Products() {
  const { addToCart } = useAppContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [viewMode, setViewMode] = useState('grid');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsDrawerOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((p) => {
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Sweater') return p.category === 'sweater/cardigan' && p.name.toLowerCase().includes('sweater');
      if (selectedCategory === 'Cardigan') return p.category === 'sweater/cardigan' && p.name.toLowerCase().includes('cardigan');
      if (selectedCategory === 'Home Decor') return p.category === 'home decor';
      if (selectedCategory === 'Hair Accessories') return p.category === 'hair accessories';
      if (selectedCategory === 'Gloves') return p.category === 'socks/gloves' && p.name.toLowerCase().includes('gloves');
      if (selectedCategory === 'Bag') return p.category === 'scarfs/bag' && p.name.toLowerCase().includes('bag');
      if (selectedCategory === 'Scarfs') return p.category === 'scarfs/bag' && p.name.toLowerCase().includes('scarf');
      return false;
    })
    .sort((a, b) => {
      if (sortBy === 'Popular') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'Newest') return b.id - a.id;
      if (sortBy === 'Price Low to High') return a.price - b.price;
      if (sortBy === 'Price High to Low') return b.price - a.price;
      return 0;
    });

  const sidebarContent = (
    <div style={styles.sidebarCard}>
      <h3 style={styles.categoryTitle}>Catalogue</h3>
      <div style={styles.categoryButtons}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={styles.categoryButton}
            onClick={() => {
              setSelectedCategory(cat);
              if (isMobile) setIsDrawerOpen(false);
            }}
          >
            <img
              src={categoryImages[cat]}
              alt={cat}
              style={{
                ...styles.categoryImage,
                ...(selectedCategory === cat ? styles.activeCategoryImage : {}),
              }}
            />
            <span
              style={{
                ...styles.categoryLabel,
                ...(selectedCategory === cat ? styles.activeCategoryLabel : {}),
              }}
            >
              {cat}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {isMobile ? (
        <>
          <button style={styles.mobileToggle} onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            {isDrawerOpen ? 'Close Catalogue' : 'Open Catalogue'}
          </button>
          {isDrawerOpen && <aside style={{ ...styles.sidebar, position: 'absolute', zIndex: 10 }}>{sidebarContent}</aside>}
        </>
      ) : (
        <aside style={styles.sidebar}>{sidebarContent}</aside>
      )}

      <main style={styles.main}>
        <div style={styles.filterBar}>
          <h2 style={styles.filterHeading}>Pick Your Choices</h2>
          <div style={styles.filterRight}>
            <select style={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option>Popular</option>
              <option>Newest</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
            </select>
            <div style={styles.viewToggle}>
              <button
                style={{ ...styles.viewButton, ...(viewMode === 'grid' ? styles.activeViewButton : {}) }}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                style={{ ...styles.viewButton, ...(viewMode === 'list' ? styles.activeViewButton : {}) }}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>No products available</p>
        ) : (
          <div style={viewMode === 'grid' ? styles.grid : styles.list}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={viewMode === 'grid' ? styles.productCardGrid : styles.productCardList}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={viewMode === 'grid' ? styles.productImageGrid : styles.productImageList}
                />
                <div style={viewMode === 'list' ? styles.productDetailsList : {}}>
                  <Link to={`/product/${product.id}`} style={styles.title}>{product.name}</Link>
                  <p style={styles.shortDesc}>{product.description}</p>
                  <p style={styles.price}>
                    ${product.price.toFixed(2)}
                    {product.discount && <span style={styles.discountBadge}>-{product.discount}%</span>}
                  </p>
                  <p style={styles.rating}>{product.rating || 4.5} ⭐ ({product.reviews || 0} reviews)</p>
                  <button style={styles.addButton} onClick={() => addToCart(product)}>Add to Cart</button>
                  <button 
                    style={styles.buyButton} 
                    onClick={() => {
                      addToCart(product);
                      navigate('/cart');  // or '/checkout' if you have
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;