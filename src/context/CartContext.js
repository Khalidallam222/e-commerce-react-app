// src/context/CartContext.js
import React, { createContext, useState, useContext, useMemo } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create a Provider Component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // State to hold items: [{ id, name, price, quantity, image }, ...]

  // Function to add an item (or increase quantity)
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    console.log("Added to cart:", product.name); // Feedback
  };

  // Function to remove an item completely
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Function to update quantity (increase/decrease)
  const updateQuantity = (productId, amount) => { // amount can be +1 or -1
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + amount) } // Ensure quantity doesn't go below 0
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  // Calculate total items count
  const itemCount = useMemo(() =>
    cartItems.reduce((total, item) => total + item.quantity, 0)
  , [cartItems]);

  // Calculate total price
  const totalPrice = useMemo(() =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  , [cartItems]);

  // Value provided by the context
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    itemCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Create a custom hook for easy consumption
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}