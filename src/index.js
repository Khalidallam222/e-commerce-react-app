// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.css';
import App from './App';
import { CartProvider } from './context/CartContext'; // Import the provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* Wrap App with the provider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);