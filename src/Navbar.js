// src/Navbar.js
import React, { useState } from 'react'; // Import useState
// You could import FontAwesome icons as components for a better React approach
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCart } from './context/CartContext'; // Import useCart

function Navbar({ onCartIconClick }) {

  const { itemCount } = useCart(); // Consume context to get itemCount
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for logo text toggle
  const [isWelcome, setIsWelcome] = useState(false);
  // State for search input value
  const [searchTerm, setSearchTerm] = useState('');

  // Handler function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Update state based on previous state
  };

  // Handler function to toggle the logo text
  const toggleLogoText = () => {
    setIsWelcome(!isWelcome);
  };

  // Handler for changes in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handler for pressing Enter in the search input
  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      console.log("Search term:", searchTerm); // Log the term
      setSearchTerm(''); // Clear the input after submit
    }
  };


  return (
    <nav className="navbar">
      {/* First Row */}
      <div className="nav-top">
        <div className="menu-logo">
          {/* Add onClick to the menu icon */}
          <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
          </div>
          {/* Add onClick and conditional text to the logo */}
          <div className="logo" onClick={toggleLogoText}>
            {isWelcome ? "Welcome!" : "Sneakers"} {/* Render text based on state */}
          </div>
        </div>
        <div className="search-field">
          {/* Bind input value to state and add event handlers */}
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}          // Controlled component
            onChange={handleSearchChange} // Handle typing
            onKeyDown={handleSearchSubmit} // Handle Enter key
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" /> {/* Add className if needed */}
        </div>
        <div className="nav-icons">
            {/* Add onClick handler to the container div */}
            <div className="cart-icon-container"  onClick={onCartIconClick}> {/* Optional container for styling */}
                <FontAwesomeIcon icon={faShoppingCart} />
                {itemCount > 0 && ( // Display count only if > 0
                        <span className="cart-item-count">{itemCount}</span> // Style this span
                      )}
                </div>
        <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
      {/* Second Row */}
      {/* Conditionally add the 'active' class based on state */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#">AIR FORCE</a></li>
        <li><a href="#">JORDAN</a></li>
        <li><a href="#">BLAZER</a></li>
        <li><a href="#">CRATER</a></li>
        <li><a href="#">HIPPIE</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;