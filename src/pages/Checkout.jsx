// src/pages/Checkout.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';

const Checkout = () => {
  const { cart } = useAppContext();

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const shippingFee = 250;
  const codExtra = 100;
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const extraFee = paymentMethod === 'cod' ? codExtra : 0;
  const grandTotal = subtotal + shippingFee + extraFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert('Please fill in all required fields!');
      return;
    }

    const methodText = paymentMethod === 'cod' 
      ? `Cash on Delivery (+ PKR ${codExtra} extra)`
      : 'Online Payment (No extra fee)';

    alert(
      `🎉 Order Placed Successfully!\n\n` +
      `Name: ${formData.fullName}\n` +
      `Phone/WhatsApp: ${formData.phone}\n` +
      `Address: ${formData.address}, ${formData.city}\n` +
      `Items: ${cart.length} (Subtotal: PKR ${subtotal.toLocaleString()})\n` +
      `Shipping: PKR ${shippingFee.toLocaleString()}\n` +
      `Payment Method: ${methodText}\n` +
      `Grand Total: PKR ${grandTotal.toLocaleString()}\n` +
      `Notes: ${formData.notes || 'None'}\n\n` +
      `Thank you for shopping with ITRO! We will contact you soon 💖`
    );

    // In real app: clear cart, redirect to thank you page, send to backend
  };

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #fff0f5, #fce4ec)',
        paddingTop: '100px',
        textAlign: 'center',
      }}>
        <Navbar />
        <h1 style={{ fontSize: '3rem', color: '#ad1457', margin: '4rem 0' }}>
          Your Cart is Empty
        </h1>
        <p style={{ fontSize: '1.4rem', color: '#555' }}>
          Add some beautiful crochet items before checkout!
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fff0f5, #fce4ec)',
      paddingTop: '100px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Navbar />

      <section style={{
        maxWidth: '1100px',
        margin: '3rem auto',
        padding: '0 5%',
      }}>
        <h1 style={{
          fontSize: '3.2rem',
          color: '#ad1457',
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          Checkout
        </h1>

        <div style={{
          display: 'flex',
          gap: '3rem',
          flexWrap: 'wrap',
        }}>
          {/* Left: Cart Summary */}
          <div style={{
            flex: 2,
            minWidth: '400px',
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: '#c2185b',
                marginBottom: '1.5rem',
              }}>
                Order Items
              </h2>

              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    padding: '1.5rem 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <img
                    src={`/products/product (${item.id}).jfif`}
                    alt={item.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=Item'}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: '#880e4f',
                      marginBottom: '0.5rem',
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#555',
                      marginBottom: '0.8rem',
                    }}>
                      PKR {item.price.toLocaleString()} × {item.quantity || 1}
                    </p>
                    <p style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#c2185b',
                    }}>
                      PKR {(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary + Form + Payment Options */}
          <div style={{
            flex: 1,
            minWidth: '350px',
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '120px',
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: '#c2185b',
                marginBottom: '1.5rem',
              }}>
                Order Summary
              </h2>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '1.1rem',
              }}>
                <span>Subtotal ({cart.length} items)</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '1.1rem',
              }}>
                <span>Shipping Fee</span>
                <span>PKR {shippingFee.toLocaleString()}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '1.1rem',
              }}>
                <span>Payment Method Extra</span>
                <span>{paymentMethod === 'cod' ? `+ PKR ${codExtra}` : 'PKR 0'}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#ad1457',
                paddingTop: '1rem',
                borderTop: '1px solid #eee',
                marginBottom: '2rem',
              }}>
                <span>Grand Total</span>
                <span>PKR {grandTotal.toLocaleString()}</span>
              </div>

              {/* Payment Options */}
              <h3 style={{
                fontSize: '1.5rem',
                color: '#c2185b',
                marginBottom: '1rem',
              }}>
                Payment Method
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem',
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    style={{ width: '20px', height: '20px' }}
                  />
                  Cash on Delivery (+ PKR {codExtra} extra)
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    style={{ width: '20px', height: '20px' }}
                  />
                  Online Payment (No extra fee)
                </label>
              </div>

              {/* Shipping Form */}
              <h3 style={{
                fontSize: '1.5rem',
                color: '#c2185b',
                marginBottom: '1rem',
              }}>
                Shipping Details
              </h3>

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
              }}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '1rem',
                    border: '2px solid #ffccdd',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                  }}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone / WhatsApp Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '1rem',
                    border: '2px solid #ffccdd',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                  }}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Complete Address *"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '1rem',
                    border: '2px solid #ffccdd',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                  }}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '1rem',
                    border: '2px solid #ffccdd',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                  }}
                />

                <textarea
                  name="notes"
                  placeholder="Order Notes / Special Instructions (optional)"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    padding: '1rem',
                    border: '2px solid #ffccdd',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                    resize: 'vertical',
                  }}
                />

                <button
                  type="submit"
                  style={{
                    background: '#d81b60',
                    color: 'white',
                    border: 'none',
                    padding: '1.3rem',
                    borderRadius: '50px',
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '1.5rem',
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
                  Place Order - PKR {grandTotal.toLocaleString()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;