// src/ProductList.js
import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { dummyProducts } from './data/products'; // Import dummy data

function ProductList() {
  const [products, setProducts] = useState([]);
  // Add state for filtering/sorting 
  const [categoryFilter, setCategoryFilter] = useState('All'); // e.g., 'All', 'Running', 'Casual'
  const [sortBy, setSortBy] = useState('default'); // e.g., 'default', 'price-asc', 'price-desc'

  // Simulate fetching data on component mount
  useEffect(() => {
    // In a real app, you'd fetch from an API here:
    // fetch('/api/products')
    //   .then(res => res.json())
    //   .then(data => setProducts(data));
    setProducts(dummyProducts); // Use dummy data for now
    // setFilteredProducts(dummyProducts); // Initialize filtered list later
  }, []); // Empty dependency array means run once on mount





  // --- Filtering and Sorting Logic ---
  // useMemo recalculates only when dependencies change, improving performance
  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // 1. Apply Category Filter
    if (categoryFilter !== 'All') {
      result = result.filter(product => product.category === categoryFilter);
    }

    // 2. Apply Sorting
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price); // Sort ascending by price
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price); // Sort descending by price
        break;
      // Add more cases for sorting by name, etc.
      case 'default':
      default:
        // No sorting or sort by original order (or ID)
         result = [...result].sort((a, b) => a.id - b.id); // Example: Sort by ID as default
        break;
    }

    return result; // The final list to display

  }, [products, categoryFilter, sortBy]); // Dependencies for useMemo
  // --- End Filtering and Sorting Logic ---

  // Get unique categories for the filter dropdown
  const categories = useMemo(() =>
    ['All', ...new Set(products.map(p => p.category))]
  , [products]);

  // Handlers to update state
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Now use 'filteredAndSortedProducts' for rendering
  const productsToDisplay = filteredAndSortedProducts;









  return (
    <div className="product-list-container">
      <h2>Our Products</h2>

      {/* --- Filter and Sort Controls --- */}
      <div className="controls"> {/* Style .controls in CSS */}
        <label htmlFor="category-filter">Filter by Category:</label>
        <select id="category-filter" value={categoryFilter} onChange={handleCategoryChange}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          {/* Add more sorting options */}
        </select>
      </div>
      {/* --- End Controls --- */}

      <div className="product-list">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products match your criteria.</p> // Updated message
        )}
      </div>
    </div>
  );
}

export default ProductList;