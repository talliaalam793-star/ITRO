// index.js - ITRO Backend Server

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Test route - to check if server is running
app.get('/', (req, res) => {
  res.send('ITRO Backend is running! 🚀');
});

// Email sending route (from Customize chat)
app.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Create transporter with Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ITRO Client" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // sends to you
    replyTo: email, // so you can reply directly to client
    subject: `New Customization Message from ${name}`,
    text: `
      New message from client!

      Name: ${name}
      Email: ${email}
      Message:
      ${message}

      Reply directly to this email to respond.
    `,
    html: `
      <h2>New Customization Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
      <p>Reply to this email to get back to the client!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Order placement route (from Checkout)
app.post('/place-order', async (req, res) => {
  const { fullName, phone, address, city, notes, cartItems, paymentMethod, total } = req.body;

  if (!fullName || !phone || !address || !city || !cartItems || !paymentMethod) {
    return res.status(400).json({ error: 'Missing required order details' });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to you (shop owner)
  const ownerMail = {
    from: `"ITRO Order" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Order Received - ${fullName}`,
    text: `
      New order placed!

      Customer: ${fullName}
      Phone/WhatsApp: ${phone}
      Address: ${address}, ${city}
      Payment: ${paymentMethod} ${paymentMethod === 'cod' ? '(+100 extra)' : '(Online)'}
      Total: PKR ${total}

      Items:
      ${cartItems.map(item => `- ${item.name} x${item.quantity || 1} = PKR ${item.price * (item.quantity || 1)}`).join('\n')}

      Notes: ${notes || 'None'}
    `,
  };

  // Email to customer (confirmation)
  const customerMail = {
    from: `"ITRO Team" <${process.env.EMAIL_USER}>`,
    to: req.body.email || 'client@example.com', // use email from form if you add it
    subject: 'Your ITRO Order Confirmation',
    text: `
      Thank you for your order, ${fullName}!

      Order Summary:
      ${cartItems.map(item => `- ${item.name} x${item.quantity || 1}`).join('\n')}
      Subtotal: PKR ${subtotal}
      Shipping: PKR 250
      ${paymentMethod === 'cod' ? 'Extra COD Fee: PKR 100' : 'Payment: Online'}
      Grand Total: PKR ${total}

      We will prepare your order soon and update you via WhatsApp.
      Expected shipping in 2-4 days.

      Love from ITRO 💖
    `,
  };

  try {
    await transporter.sendMail(ownerMail);
    await transporter.sendMail(customerMail);
    res.status(200).json({ success: true, message: 'Order placed and emails sent!' });
  } catch (error) {
    console.error('Order email error:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`ITRO Backend running on http://localhost:${port}`);
  console.log('Ready to receive messages and orders!');
});