// src/pages/Profile.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { user } = useAppContext(); // from your AppContext (mock user)

  // Mock order history (in real app, fetch from backend)
  const orders = [
    {
      id: 'ORD-001',
      date: '2026-01-10',
      items: 'Floral Crochet Top, Pink Flower Bag',
      total: 2400,
      status: 'Delivered',
      shippingAddress: 'House 123, Street 45, F-11, Islamabad',
      tracking: 'LEP123456789PK',
    },
    {
      id: 'ORD-002',
      date: '2026-01-15',
      items: 'Cat Ear Crochet Bag',
      total: 800,
      status: 'Processing',
      shippingAddress: 'House 123, Street 45, F-11, Islamabad',
      tracking: 'Pending',
    },
    {
      id: 'ORD-003',
      date: '2026-01-18',
      items: 'Rose Pattern Blanket',
      total: 2500,
      status: 'Shipped',
      shippingAddress: 'House 123, Street 45, F-11, Islamabad',
      tracking: 'LEP987654321PK',
    },
    {
      id: 'ORD-004',
      date: '2026-01-20',
      items: 'Daisy Crop Top',
      total: 1600,
      status: 'Cancelled',
      shippingAddress: 'House 123, Street 45, F-11, Islamabad',
      tracking: 'N/A',
    },
  ];

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #fff0f5, #fce4ec)',
        paddingTop: '100px',
        textAlign: 'center',
      }}>
        <Navbar />
        <h1 style={{ fontSize: '3rem', color: '#ad1457', margin: '5rem 0' }}>
          Please Login First
        </h1>
        <p style={{ fontSize: '1.4rem', color: '#555' }}>
          You need to be logged in to view your profile and orders.
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
          marginBottom: '3rem',
        }}>
          My Profile
        </h1>

        {/* Personal Info Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          marginBottom: '3rem',
        }}>
          <h2 style={{
            fontSize: '2rem',
            color: '#c2185b',
            marginBottom: '1.5rem',
          }}>
            Account Information
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '1.5rem',
            fontSize: '1.15rem',
            color: '#444',
          }}>
            <div style={{ fontWeight: 'bold' }}>Full Name:</div>
            <div>{user.name || 'Tallia'}</div>

            <div style={{ fontWeight: 'bold' }}>Email / ID:</div>
            <div>{user.email || 'tallia@example.com'}</div>

            <div style={{ fontWeight: 'bold' }}>Phone:</div>
            <div>+92 300 1234567</div>

            <div style={{ fontWeight: 'bold' }}>Default Shipping Address:</div>
            <div>
              House 123, Street 45, F-11<br />
              Islamabad, Pakistan
            </div>
          </div>

          <button
            style={{
              marginTop: '2rem',
              background: '#d81b60',
              color: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.1rem',
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
            Edit Profile
          </button>
        </div>

        {/* Order History Table */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{
            fontSize: '2rem',
            color: '#c2185b',
            marginBottom: '2rem',
          }}>
            My Orders
          </h2>

          {orders.length === 0 ? (
            <p style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              color: '#777',
              padding: '3rem 0',
            }}>
              You haven't placed any orders yet.
            </p>
          ) : (
            <div style={{
              overflowX: 'auto',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '1.05rem',
              }}>
                <thead>
                  <tr style={{
                    background: '#ffccdd',
                    color: '#c2185b',
                  }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Items</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Shipping Address</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{
                      borderBottom: '1px solid #eee',
                    }}>
                      <td style={{ padding: '1rem' }}>{order.id}</td>
                      <td style={{ padding: '1rem' }}>{order.date}</td>
                      <td style={{ padding: '1rem' }}>{order.items}</td>
                      <td style={{ padding: '1rem' }}>PKR {order.total.toLocaleString()}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.4rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.95rem',
                          fontWeight: 'bold',
                          background:
                            order.status === 'Delivered' ? '#4caf50' :
                            order.status === 'Shipped' ? '#2196f3' :
                            order.status === 'Processing' ? '#ff9800' :
                            order.status === 'Cancelled' ? '#d32f2f' :
                            order.status === 'Returned' ? '#9e9e9e' : '#757575',
                          color: 'white',
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>{order.shippingAddress}</td>
                      <td style={{ padding: '1rem' }}>{order.tracking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;