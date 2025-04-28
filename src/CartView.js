// src/CartView.js
import React from 'react';
import { useCart } from './context/CartContext';

function CartView() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return <div className="cart-view"><h2>Your Cart is Empty</h2></div>;
  }

  return (
    <div className="cart-view"> {/* Style .cart-view */}
      <h2>Your Cart</h2>
      <ul className="cart-items-list"> {/* Style .cart-items-list */}
        {cartItems.map(item => (
          <li key={item.id} className="cart-item"> {/* Style .cart-item */}
            <img src={item.image} alt={item.name} className="cart-item-image" /> {/* Style image */}
            <div className="cart-item-details">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Remove</button> {/* Style remove button */}
          </li>
        ))}
      </ul>
      <div className="cart-total"> {/* Style total */}
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn">Proceed to Checkout</button> {/* Style checkout */}
      </div>
    </div>
  );
}

export default CartView;