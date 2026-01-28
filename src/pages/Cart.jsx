import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, setCart } = useAppContext();

  // step: cart | checkout | success
  const [step, setStep] = useState('cart');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const confirmOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill all details');
      return;
    }

    const order = {
      customer: form,
      items: cart,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    console.log('ORDER CONFIRMED:', order); // later send to backend / WhatsApp

    setCart([]);       // clear cart
    setStep('success');
  };

  // 🟢 EMPTY CART
  if (cart.length === 0 && step !== 'success') {
    return (
      <h2 style={{ marginTop: '120px', textAlign: 'center' }}>
        Your cart is empty 🛒
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      {/* STEP 1: CART */}
      {step === 'cart' && (
        <>
          <h2>Your Cart</h2>

          {cart.map((item) => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.img} />

              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Rs {item.price}</p>

                <div style={styles.qty}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 style={{ textAlign: 'right' }}>Total: Rs {totalPrice}</h3>

          <button style={styles.primaryBtn} onClick={() => setStep('checkout')}>
            Buy Now
          </button>
        </>
      )}

      {/* STEP 2: CHECKOUT */}
      {step === 'checkout' && (
        <>
          <h2>Delivery Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            style={styles.textarea}
          />

          <h3>Total: Rs {totalPrice}</h3>

          <button style={styles.primaryBtn} onClick={confirmOrder}>
            Confirm Order
          </button>

          <button style={styles.backBtn} onClick={() => setStep('cart')}>
            ← Back to Cart
          </button>
        </>
      )}

      {/* STEP 3: SUCCESS */}
      {step === 'success' && (
        <div style={{ textAlign: 'center' }}>
          <h2>🎉 Order Confirmed!</h2>
          <p>Thank you for your order.</p>
          <p>We will contact you soon.</p>

          <button
            style={styles.primaryBtn}
            onClick={() => setStep('cart')}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '120px',
    padding: '2rem',
    maxWidth: '600px',
    marginInline: 'auto',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  item: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '1rem',
  },
  img: {
    width: '90px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  qty: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 0',
  },
  removeBtn: {
    background: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    height: '80px',
  },
  primaryBtn: {
    width: '100%',
    padding: '12px',
    background: '#ff69b4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  backBtn: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    background: '#eee',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Cart;
