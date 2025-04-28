// src/MainContent.js
import React, { useState, useEffect } from 'react'; // Import useState and useEffect

function MainContent() {
  // State for circle color, try reading from localStorage first
  const [circleColor, setCircleColor] = useState(localStorage.getItem("circleColor") || '#00b7b7');
  // State for the text displayed below the circle
  const [displayText, setDisplayText] = useState("Click the circle to start countdown!");
  // State for image visibility
  const [isImageVisible, setIsImageVisible] = useState(true); // Assume visible initially
  // State for the current countdown number
  const [countdownNumber, setCountdownNumber] = useState(null); // Start as null

  // Handler for double-clicking the image
  const handleImageDoubleClick = () => {
    setIsImageVisible(false);
  };

  // Handler for clicking the circle
  const handleCircleClick = () => {
    // Generate and set random color, update localStorage
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setCircleColor(randomColor);
    localStorage.setItem("circleColor", randomColor);

    // Start the countdown
    setCountdownNumber(5); // Start from 5
    setDisplayText('5');   // Immediately display '5'
  };

  // Effect Hook for the countdown timer logic
  useEffect(() => {
    // If countdown is not active or finished, do nothing
    if (countdownNumber === null || countdownNumber <= 0) {
      if (countdownNumber === 0) {
        setDisplayText("Done!"); // Show "Done!" when it hits zero
      }
      setCountdownNumber(null); // Reset the number to stop the effect
      return; // Exit the effect
    }

    // Set a timeout to decrease the number after 1 second
    const timerId = setTimeout(() => {
      const nextNumber = countdownNumber - 1;
      setCountdownNumber(nextNumber);
      setDisplayText(String(nextNumber)); // Update display text immediately
    }, 1000);

    // --- Cleanup Function ---
    // This is crucial! It runs when the component unmounts OR before the effect runs again.
    // It prevents memory leaks and unexpected behavior if the countdown is restarted quickly.
    return () => {
      clearTimeout(timerId);
    };
    // --- End Cleanup ---

  }, [countdownNumber]); // Dependency array: This effect re-runs ONLY when countdownNumber changes

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // State for image opacity
  const [imageOpacity, setImageOpacity] = useState(0);

  // Effect for fade-in on component mount (and when visibility changes)
  useEffect(() => {
    // If the image is meant to be hidden, ensure opacity is 0
    if (!isImageVisible) {
      setImageOpacity(0);
      return; // Don't start the interval if hidden
    }

    // Reset opacity to 0 before starting fade-in (if becoming visible again)
    setImageOpacity(0);

    let currentOpacity = 0;
    const intervalId = setInterval(() => {
      currentOpacity += 0.02; // Adjust speed as needed
      if (currentOpacity >= 1) {
        currentOpacity = 1;
        clearInterval(intervalId); // Stop when fully opaque
        // setDisplayText("Welcome to the sneaker store!"); // Optional: change text after fade-in
      }
      setImageOpacity(currentOpacity);
    }, 30); // Interval time (milliseconds)

    // Cleanup function to clear interval if component unmounts or visibility changes
    return () => clearInterval(intervalId);

  }, [isImageVisible]); // Dependency: Re-run if isImageVisible changes

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// State for fetched sneaker data
const [sneakersData, setSneakersData] = useState([]);
// State to track loading status
const [isLoading, setIsLoading] = useState(false);
// State to toggle sneaker list visibility
const [isListVisible, setIsListVisible] = useState(false);

// Async function to fetch data
const fetchSneakers = async () => {
  setIsLoading(true);         // Set loading true
  setIsListVisible(false);    // Hide previous list if any
  setDisplayText("Fetching sneaker data..."); // Update display

  try {
    // Using the placeholder API from your original code
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) { // Basic error check
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const albums = await response.json();
    // Simulate sneaker data from album titles
    const sneakers = albums.slice(0, 5).map(album => `Sneaker ${album.id}: ${album.title}`);
    setSneakersData(sneakers);
    setDisplayText("Sneaker data fetched!");
    setIsListVisible(true); // Show the list now
  } catch (error) {
    console.error("Error fetching sneakers data:", error);
    setDisplayText("Error fetching data!");
    setSneakersData([]); // Clear data on error
  } finally {
    setIsLoading(false); // Set loading false regardless of outcome
    // Reset display text after a delay, only if no countdown is active
    setTimeout(() => {
      if (countdownNumber === null) { // Check if countdown finished
         setDisplayText("Click the circle to start countdown!");
      }
    }, 2000);
  }
};

// Handler for the fetch button click
const handleFetchClick = () => {
  // Simple toggle logic: If list is visible, hide it. If hidden, fetch data.
   if (isListVisible) {
       setIsListVisible(false);
   } else {
       fetchSneakers(); // Fetch only when showing the list
   }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="main-content">
      {/* Apply color via inline style and add onClick */}
      <div className="teal-circle"
        style={{ backgroundColor: circleColor }} // Inline style for dynamic color
        onClick={handleCircleClick}
      >
        {/* Conditionally render the image based on state and add onDoubleClick */}
        {isImageVisible && (
          <img
            src="/sneaker.png"
            alt="Sneaker"
            className="sneaker-image"
            onDoubleClick={handleImageDoubleClick}
            style={{ opacity: imageOpacity }} // Apply fade-in effect
            // Add onClick for notifications later
          />
        )}
      </div>
      {/* Display text from state */}
      <div className="countdown-display">{displayText}</div>

      {/* Fetch button and list (logic to be added) */}
    <button
    className="fetch-sneakers-btn"
    onClick={handleFetchClick}
    disabled={isLoading} // Disable button while loading
    >
    {isLoading ? 'Loading...' : (isListVisible ? 'Hide Sneakers' : 'Fetch Sneakers')}
    </button>


  {/* Conditionally render the sneaker list */}
  {isListVisible && (
    <div className="sneakers-list">
      <ul> {/* Use a <ul> for semantic list */}
        {sneakersData.map((sneaker, index) => (
          // IMPORTANT: Add a unique key prop for each list item for React's reconciliation
          <li key={index}>{sneaker}</li> // Using index as key here is okay since the list is static once fetched
        ))}
        {sneakersData.length === 0 && !isLoading && <li>No sneakers found.</li>} {/* Message if empty */}
      </ul>
    </div>
  )}
  </div>
  );
}

export default MainContent;