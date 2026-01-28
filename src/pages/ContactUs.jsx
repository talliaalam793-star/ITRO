// src/pages/ContactUs.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
// Note: Do NOT import or render Footer here → global footer from layout is sufficient

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fff0f5, #fce4ec)',
      paddingTop: '100px',
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* 
        Global Navbar/Header is already present via layout 
        → Do NOT add another <Navbar /> or header here
      */}

      {/* SECTION 1: WHO WE ARE */}
      <div style={{
        maxWidth: '1200px',
        margin: '4rem auto',
        padding: '0 5%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '3rem',
        alignItems: 'center',
      }}>
        {/* LEFT: Text content */}
        <div style={{
          flex: 1,
          minWidth: '340px',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#c2185b',
            marginBottom: '1.8rem',
          }}>
            Who We Are
          </h2>

          <p style={{
            fontSize: '1.15rem',
            color: '#444',
            lineHeight: '1.85',
            marginBottom: '1.4rem',
          }}>
            ITRO is a passionate handmade crochet brand born in Pakistan, dedicated to creating unique, high-quality pieces woven with love and grace. Every item is crafted by skilled artisans who pour heart into every stitch.
          </p>

          <p style={{
            fontSize: '1.15rem',
            color: '#444',
            lineHeight: '1.85',
            marginBottom: '1.4rem',
          }}>
            What makes us special? We focus on custom designs — you dream it, we crochet it! From cozy blankets and trendy bags to elegant tops and hair accessories, we use premium yarn and attention to detail so you feel the difference.
          </p>

          <p style={{
            fontSize: '1.15rem',
            color: '#444',
            lineHeight: '1.85',
          }}>
            ITRO is more than crochet — it's about bringing warmth, style, and joy into your life, one handmade piece at a time.
          </p>
        </div>

        {/* RIGHT: Circular clickable brand logo */}
        <div style={{
          flex: '0 0 280px',
          textAlign: 'center',
        }}>
          <img
            src="/logo/logo.png"
            alt="ITRO Brand Logo"
            onClick={() => setShowModal(true)}
            style={{
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              objectFit: 'cover',
              cursor: 'pointer',
              border: '6px solid #ffe4f0',
              boxShadow: '0 6px 20px rgba(173, 20, 87, 0.15)',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      </div>

      {/* SECTION 2: CONTACT FORM + INFORMATION */}
      <div style={{
        maxWidth: '1200px',
        margin: '5rem auto 6rem',
        padding: '0 5%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4rem',
      }}>
        {/* LEFT: Message Form */}
        <div style={{
          flex: 1,
          minWidth: '340px',
        }}>
          <h3 style={{
            fontSize: '2rem',
            color: '#ad1457',
            marginBottom: '1.6rem',
            textAlign: 'center',
          }}>
            Send Us a Message
          </h3>

          <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
          }}>
            <input
              type="email"
              placeholder="Your Email Address *"
              required
              style={{
                padding: '1rem',
                border: '2px solid #ffccdd',
                borderRadius: '10px',
                fontSize: '1.05rem',
              }}
            />

            <textarea
              placeholder="Your Message / Feedback *"
              rows={6}
              required
              style={{
                padding: '1rem',
                border: '2px solid #ffccdd',
                borderRadius: '10px',
                fontSize: '1.05rem',
                resize: 'vertical',
              }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: '#d81b60',
                color: 'white',
                border: 'none',
                padding: '1.1rem',
                borderRadius: '50px',
                fontSize: '1.15rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ad1457'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d81b60'}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT: Contact Information */}
        <div style={{
          flex: 1,
          minWidth: '300px',
        }}>
          <h3 style={{
            fontSize: '2rem',
            color: '#ad1457',
            marginBottom: '1.6rem',
            textAlign: 'center',
          }}>
            Contact Information
          </h3>

          <div style={{
            fontSize: '1.1rem',
            color: '#444',
            lineHeight: '2.1',
          }}>
            <p><strong>Phone:</strong> +92 300 1234567</p>
            <p><strong>Instagram:</strong> @itrohandmade</p>
            <p><strong>Facebook:</strong> /itrohandmade</p>
          </div>
        </div>
      </div>

      {/* ─── Logo Click Popup ─── */}
      {showModal && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.45)',
              zIndex: 1000,
            }}
            onClick={() => setShowModal(false)}
          />

          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(0.9)',
              maxWidth: '380px',
              width: '90%',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
              zIndex: 1100,
              opacity: 0,
              animation: 'fadeScaleIn 0.35s ease-out forwards',
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '1.6rem',
                color: '#ad1457',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <p style={{
              fontSize: '1.15rem',
              color: '#555',
              lineHeight: '1.6',
              marginTop: '1rem',
              whiteSpace: 'pre-line',
            }}>
              Thanks for contacting us 🌸<br />
              We’re always happy to hear from you.
            </p>
          </div>
        </>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeScaleIn {
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>

      {/* 
        Global Footer from layout is already present 
        → Do NOT add <Footer /> here
      */}
    </div>
  );
};

export default ContactUs;