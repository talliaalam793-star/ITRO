// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="itro-footer">
      <div className="footer-container">
        <div className="footer-section feedback">
          <h3>Feedback</h3>
          <textarea placeholder="Your thoughts..." rows="5"></textarea>
          <button className="send-btn">Send Message</button>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p><strong>Number:</strong> +92 300 1234567</p>
          <p><strong>Instagram:</strong> @itro_handmade</p>
          <p><strong>Facebook:</strong> /itro.crochet</p>
          <p><strong>WhatsApp:</strong> +92 300 1234567</p>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© 2026 ITRO - Woven with Grace</small>
      </div>
    </footer>
  );
};

export default Footer;