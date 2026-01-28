// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';

const Signup = () => {
  const { login } = useAppContext(); // reuse login after signup
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    address: '',
    email: '',
    userId: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, age, address, email, userId, phone, password, confirmPassword } = formData;

    if (!fullName || !age || !address || !email || !userId || !phone || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (age < 13) {
      setError('You must be at least 13 years old');
      return;
    }

    // Mock signup success → auto-login
    const success = login(email, password); // sets user in context

    if (success) {
      alert(
        `🎉 Signup Successful!\n\n` +
        `Welcome, ${fullName}!\n` +
        `User ID: ${userId}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `You are now logged in. Start shopping! 💖`
      );
      navigate('/profile');
    } else {
      setError('Something went wrong — try again');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fff0f5, #fce4ec)',
      paddingTop: '100px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Navbar />

      <div style={{
        maxWidth: '550px',
        margin: '3rem auto',
        padding: '0 5%',
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#ad1457',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          Create Your ITRO Account
        </h1>

        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.4rem',
        }}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={{ padding: '1rem', border: '2px solid #ffccdd', borderRadius: '12px', fontSize: '1.1rem' }}
          />

          <input
            type="number"
            name="age"
            placeholder="Age *"
            value={formData.age}
            onChange={handleChange}
            required
            min="13"
            style={{ padding: '1rem', border: '2px solid #ffccdd', borderRadius: '12px', fontSize: '1.1rem' }}
          />

          <input
            type="text"
            name="address"
            placeholder="Complete Address *"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ padding: '1rem', border: '2px solid #ffccdd', borderRadius: '12px', fontSize: '1.1rem' }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '1rem', border: '2px solid #ffccdd', borderRadius: '12px', fontSize: '1.1rem' }}
          />

          <input
            type="text"
            name="userId"
            placeholder="Choose User ID (unique) *"
            value={formData.userId}
            onChange={handleChange}
            required
            style={{ padding: '1rem', border: '2px solid #ffccdd', borderRadius: '12px', fontSize: '1.1rem' }}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (for contact) *"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ padding: '1rem', border: '2px solid #ffccdd', borderRadius: '12px', fontSize: '1.1rem' }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: '1rem', border: '2px solid #ffccdd', borderRadius: '12px', fontSize: '1.1rem' }}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password *"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ padding: '1rem', border: '2px solid #ffccdd', borderRadius: '12px', fontSize: '1.1rem' }}
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
              marginTop: '1rem',
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
            Sign Up
          </button>

          <p style={{
            textAlign: 'center',
            color: '#555',
            marginTop: '1rem',
          }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#d81b60', textDecoration: 'none', fontWeight: 'bold' }}>
              Login
            </a>
          </p>
        </form>
      </div>

      {/* Removed <Footer /> here – keep only the global one */}
    </div>
  );
};

export default Signup;