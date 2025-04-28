// src/AddToCartButton.js
import React from 'react';
import { useCart } from './context/CartContext'; // Import the custom hook

function AddToCartButton({ product }) {
  const { addToCart } = useCart(); // Consume the context

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button className="add-to-cart-btn" onClick={handleAddToCart}> {/* Style this button */}
      Add to Cart
    </button>
  );
}

export default AddToCartButton;