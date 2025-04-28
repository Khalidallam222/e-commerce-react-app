// src/ProductCard.js
import React from 'react';
import AddToCartButton from './AddToCartButton'; // Import the button


function ProductCard({ product }) { // Receive product data as a prop
  // Basic error handling if product is missing
  if (!product) {
    return <div>Product data is missing.</div>;
  }

  return (
    <div className="product-card"> {/* Add styling for product-card in style.css */}
      <img src={product.image} alt={product.name} className="product-image" /> {/* Style product-image */}
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      {/* Use the AddToCartButton component */}
      <AddToCartButton product={product} />
    </div>
  );
}

export default ProductCard;