// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isMobile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const lightPink = '#FFB6C1';    // Light pink like in your image (not hot pink)
  const darkText = '#4B0082';     // Dark indigo for ITRO + links + cart (matches image text color)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      style={{
        backgroundColor: lightPink,         // Changed to light pink as in your image
        height: '99px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        color: darkText,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '100%',
      }}
    >
      {/* Container to limit max width to 1277px and center */}
      <div style={{
        width: '100%',
        maxWidth: '1277px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo section - left */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo/logo.png" 
            alt="ITRO Logo" 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '15px',
            }} 
          />
          <span style={{ 
            fontSize: '32px', 
            fontWeight: 'bold',
            color: darkText,              // ITRO text dark, not hot pink
          }}>
            ITRO
          </span>
        </div>

        {/* Right side: Links or Hamburger + Cart */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
        }}>
          {/* Desktop: Horizontal links */}
          {!isMobile && (
            <ul 
              style={{
                display: 'flex',
                listStyle: 'none',
                gap: '30px',
                margin: 0,
                padding: 0,
                marginRight: '30px',  // Space before cart
              }}
            >
              <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }}>Home</Link></li>
              <li><Link to="/products" style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }}>Product</Link></li>
              <li><Link to="/customize" style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }}>Customize</Link></li>
              <li><Link to="/contact" style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }}>Contact us</Link></li>
              <li><Link to="/about" style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }}>About us</Link></li>
              <li><Link to="/login" style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }}>Login</Link></li>
            </ul>
          )}

          {/* Mobile: Hamburger icon */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '32px',
                cursor: 'pointer',
                color: darkText,
                marginRight: '20px',  // Space before cart
              }}
            >
              ☰
            </button>
          )}

          {/* Cart icon (always visible) */}
          <Link 
            to="/cart" 
            style={{ 
              fontSize: '28px', 
              textDecoration: 'none', 
              color: 'inherit' 
            }}
          >
            🛒
          </Link>
        </div>
      </div>

      {/* Mobile menu (dropdown when open) */}
      {isMobile && isMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '99px',  // Below navbar
            left: 0,
            width: '100%',
            backgroundColor: lightPink,
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 999,
          }}
        >
          <ul 
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <li>
              <Link 
                to="/" 
                style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }} 
                onClick={() => setIsMenuOpen(false)}  // Close menu on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }} 
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
            </li>
            <li>
              <Link 
                to="/customize" 
                style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }} 
                onClick={() => setIsMenuOpen(false)}
              >
                Customize
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }} 
                onClick={() => setIsMenuOpen(false)}
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }} 
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                style={{ textDecoration: 'none', color: 'inherit', fontSize: '18px' }} 
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}