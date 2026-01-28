// src/pages/AboutUs.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';     // ← kept import, but only used once at bottom
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';

const AboutUs = () => {
  const { products } = useAppContext();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fff0f5, #fce4ec)',
      paddingTop: '100px',
      fontFamily: 'Arial, sans-serif',
    }}>

      {/* ─── Hero / Title with Wave ─── (unchanged) */}
      <section style={{
        position: 'relative',
        textAlign: 'center',
        padding: '5rem 5% 8rem',   // bottom padding prevents wave overlap
        overflow: 'hidden',
        background: '#ffccdd',
      }}>
        <svg
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '220px',
          }}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fce4ec"
            fillOpacity="0.85"
            d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,112C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        <h1 style={{
          fontSize: '3.8rem',
          color: '#ad1457',
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 2,
        }}>
          About Us
        </h1>

        <p style={{
          fontSize: '1.7rem',
          color: '#880e4f',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          Discover the heart behind every stitch
        </p>
      </section>

      {/* ─── Main Content: Two Columns ─── */}
      <div style={{
        maxWidth: '1400px',
        margin: '5rem auto',
        padding: '0 5%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '4rem',
      }}>
        {/* LEFT SIDE: Static “Who We Are” section */}
        <div style={{
          flex: '1 1 45%',
          minWidth: '400px',
        }}>
          <h2 style={{
            fontSize: '2.6rem',
            color: '#c2185b',
            marginBottom: '1.8rem',
          }}>
            Who We Are
          </h2>

          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="ITRO Team"
            style={{
              width: '100%',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              marginBottom: '2rem',
            }}
          />

          <p style={{
            fontSize: '1.18rem',
            color: '#444',
            lineHeight: '1.9',
            marginBottom: '1.5rem',
          }}>
            At ITRO, we are more than just a crochet brand — we are a team of passionate artisans who believe that every thread tells a story. Founded with love in Pakistan, ITRO is built on the belief that true beauty lies in handmade craftsmanship. Each piece is 100% handmade with the finest quality yarn, careful attention to detail, and genuine care poured into every single stitch.
          </p>

          <p style={{
            fontSize: '1.18rem',
            color: '#444',
            lineHeight: '1.9',
            marginBottom: '1.5rem',
          }}>
            What makes us special? Quality is our promise — 100% premium materials, durable stitching, vibrant colors that last, and designs that feel personal and unique. We don’t mass-produce; every item is lovingly crafted by skilled hands, ensuring softness, comfort, and elegance that you can feel the moment you touch it.
          </p>

          <p style={{
            fontSize: '1.18rem',
            color: '#444',
            lineHeight: '1.9',
            marginBottom: '1.5rem',
          }}>
            From cozy blankets and stylish bags to elegant tops, hair accessories, and home decor — ITRO creates pieces that bring warmth, joy, and grace into your everyday life. We specialize in custom orders — you dream it, we weave it with heart. Our customers choose us because they feel the difference: no machine-made perfection, only real human touch and soul.
          </p>

          <p style={{
            fontSize: '1.18rem',
            color: '#444',
            lineHeight: '1.9',
          }}>
            Thank you for being part of the ITRO family. We crochet not just products — we crochet memories, love, and beauty, one stitch at a time.
          </p>
        </div>

        {/* RIGHT SIDE: Auto-scrolling Product Cards (horizontal) */}
        <div style={{
          flex: '1 1 45%',
          minWidth: '400px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#c2185b',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>
            Our Creations
          </h2>

          <div style={{
            display: 'flex',
            width: 'max-content',
            animation: 'scrollLeft 80s linear infinite',
            gap: '2rem',
          }}>
            {/* Original set */}
            {products.map(product => (
              <div key={product.id} style={{ width: '280px', flexShrink: 0 }}>
                <ProductCard product={product} />
              </div>
            ))}

            {/* Duplicate set for seamless infinite loop */}
            {products.map(product => (
              <div key={`dup-${product.id}`} style={{ width: '280px', flexShrink: 0 }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Scroll animation ─── */}
      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Optional: slower on mobile */
        @media (max-width: 768px) {
          [data-scroll-container] {
            animation-duration: 120s;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;