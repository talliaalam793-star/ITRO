// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Customize from './pages/Customize.jsx';
import ContactUs from './pages/ContactUs.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function ProtectedRoute({ children }) {
  const { user } = useAppContext();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    // Initial check in case window size changed before mount
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppProvider>
      <Router>
        <div
          className={isMobile ? 'app-mobile' : 'app-desktop'}
          style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        >
          <Navbar isMobile={isMobile} />   {/* ← pass isMobile so Navbar can adapt */}

          <main style={{ flex: 1 }}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/cart" element={<Cart />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer isMobile={isMobile} />   {/* ← optional: Footer can also adapt */}
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;