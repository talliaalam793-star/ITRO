// src/pages/Customize.jsx
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Customize.css';

const Customize = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);

  // Load saved messages from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('customizeChat')) || [];
    setMessages(saved);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customizeChat', JSON.stringify(messages));
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(true);
    clearTimeout(window.typingTimer);
    window.typingTimer = setTimeout(() => setIsTyping(false), 2000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input.trim(),
      sender: 'client',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsTyping(false);

    // Simulate "new message notification" to you (shop owner)
    setUnread((prev) => prev + 1);
    alert(`New message from client!\n\n"${input.trim()}"\n\n(Email simulation: Sent to tallia@example.com)`);

    // Optional: fake reply after 2–4 seconds (you can remove this)
    setTimeout(() => {
      const replies = [
        "Thank you for your message! We're reviewing your customization idea.",
        "Got it! Would you like any specific colors or size adjustments?",
        "We love this idea ❤️ Let me check availability and get back to you shortly.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: randomReply,
          sender: 'shop',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, Math.random() * 2000 + 2000);
  };

  return (
    <div className="customize-page">

      <section className="customize-hero">
        <svg className="wave-bg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#fce4ec"
            fillOpacity="0.85"
            d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,112C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        <div className="hero-content">
          <h1>Customize Your Design</h1>
          <p>Talk to us about your dream crochet piece — we're listening!</p>
        </div>
      </section>

      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with ITRO</h2>
          {unread > 0 && <span className="unread-badge">{unread} new</span>}
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <p>Start typing your idea below...</p>
              <small>We usually reply within a few minutes during business hours</small>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'client' ? 'client-msg' : 'shop-msg'}`}
              >
                <div className="message-bubble">{msg.text}</div>
                <span className="message-time">{msg.time}</span>
              </div>
            ))
          )}

          {isTyping && (
            <div className="typing-indicator">Client is typing...</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your customization idea here..."
            autoFocus
          />
          <button type="submit" disabled={!input.trim()}>
            Send
          </button>
        </form>
      </div>

    </div>
  );
};

export default Customize;