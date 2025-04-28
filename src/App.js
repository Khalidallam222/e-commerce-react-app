
// src/App.js
import React, { useState } from 'react';
import Navbar from './Navbar';
// import MainContent from './MainContent'; // Keep or remove as needed
import ProductList from './ProductList'; // Import ProductList
import CartView from './CartView'; // Import CartView
// Remove state lifting for displayText if MainContent is removed or doesn't need it
// const [appDisplayText, setAppDisplayText] = useState("Initial Message");

function App() {
  const [showCart, setShowCart] = useState(false); // State to toggle cart view
  // You could connect the cart icon click to setShowCart later in Navbar

  const toggleCart = () => {
     setShowCart(prevShow => !prevShow);
  }

  return (
    <>
      {/* Pass toggleCart function if you want Navbar icon to toggle it */}
      <Navbar  onCartIconClick={toggleCart}  />
      {/* <MainContent displayText={appDisplayText} setDisplayText={setAppDisplayText} /> */}
      {/* You might want to conditionally render ProductList OR CartView */}
      {/* Or show both */}
      <ProductList /> {/* Add the product list */}
      {showCart && <CartView />} {/* Conditionally render CartView */}
    </>
  );
}

export default App;