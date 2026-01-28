// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '', // email or user ID
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock login success (in real app → call backend)
    const success = login(formData.identifier, formData.password);

    if (success) {
      alert('Login successful! Welcome back 💖');
      navigate('/profile');
    } else {
      setError('Invalid email/user ID or password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fff0f5, #fce4ec)',
      paddingTop: '100px',
      fontFamily: 'Arial, sans-serif',
    }}>

      <div style={{
        maxWidth: '500px',
        margin: '4rem auto',
        padding: '0 5%',
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#ad1457',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          Login to ITRO
        </h1>

        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <input
            type="text"
            name="identifier"
            placeholder="Email or User ID *"
            value={formData.identifier}
            onChange={handleChange}
            required
            style={{
              padding: '1rem',
              border: '2px solid #ffccdd',
              borderRadius: '12px',
              fontSize: '1.1rem',
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: '1rem',
              border: '2px solid #ffccdd',
              borderRadius: '12px',
              fontSize: '1.1rem',
            }}
          />

          {error && (
            <p style={{
              color: '#d32f2f',
              textAlign: 'center',
              fontSize: '1rem',
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              background: '#d81b60',
              color: 'white',
              border: 'none',
              padding: '1.2rem',
              borderRadius: '50px',
              fontSize: '1.25rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#ad1457';
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#d81b60';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Login
          </button>

          <p style={{
            textAlign: 'center',
            color: '#555',
            marginTop: '1rem',
          }}>
            Don't have an account?{' '}
            <a href="/signup" style={{ color: '#d81b60', textDecoration: 'none', fontWeight: 'bold' }}>
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Removed <Footer /> here – keep only the global one */}
    </div>
  );
};

export default Login;