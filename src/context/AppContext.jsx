import React, { createContext, useState, useEffect, useContext } from 'react';
import { products as initialProducts } from '../data/products';

// Create Context
const AppContext = createContext();

// Custom hook
export const useAppContext = () => useContext(AppContext);

// Provider
export const AppProvider = ({ children }) => {
  // Products
  const [products, setProducts] = useState([]);

  // Cart
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Loading
  const [isLoading, setIsLoading] = useState(true);

  // User (mock)
  const [user, setUser] = useState(null);

  // Load products once
  useEffect(() => {
    setTimeout(() => {
      setProducts(initialProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  // Update cart count
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    const normalized = {
      id: product.id,
      name: product.name || product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    setCart((prev) => {
      const exists = prev.find((item) => item.id === normalized.id);

      if (exists) {
        return prev.map((item) =>
          item.id === normalized.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, normalized];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Login (mock)
  const login = (email, password) => {
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider
      value={{
        products,
        isLoading,
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCart,       // ✅ IMPORTANT
        user,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
