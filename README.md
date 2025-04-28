# React Sneaker Store (E-commerce App)

A simple e-commerce front-end application built with React, showcasing basic features like product listing, filtering, sorting, and a shopping cart. This project was created as part of learning React fundamentals.

![Alt text for the image](public/image.png)

## Features Implemented

*   **Product Listing:** Displays a list of available sneakers.
*   **Filtering:** Allows users to filter products by category (e.g., Running, Casual).
*   **Sorting:** Allows users to sort products by price (Low to High, High to Low).
*   **Shopping Cart:**
    *   Add products to the cart.
    *   View items in the cart.
    *   Update item quantities in the cart.
    *   Remove items from the cart.
    *   Display total item count in the navbar.
    *   Display total price in the cart view.
*   **Responsive Design:** Basic responsiveness implemented for different screen sizes.
*   **Navbar:** Includes navigation links (static), search input (logs term), and cart icon with item count.
*   **(Optional: Mention other features like the Teal Circle interaction if kept)**

## Technologies Used

*   **React:** JavaScript library for building user interfaces.
    *   React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`) for state management and side effects.
    *   React Context API for global shopping cart state management.
*   **JavaScript (ES6+)**
*   **CSS3:** For styling components and layout.
*   **Font Awesome (react-fontawesome):** For icons.
*   **Create React App:** For project setup and build tooling.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v16 or later recommended - You used v22.15.0)
*   npm (usually comes with Node.js) or yarn
*   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or if you prefer yarn:
    # yarn install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    # or
    # yarn start
    ```
2.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Project Structure (Brief Overview)

```
sneaker-react-app/
├── public/             # Static assets (images, index.html)
├── src/                # Main application source code
│   ├── components/     # (Optional) Could move reusable components here later
│   ├── context/        # React Context files (CartContext.js)
│   ├── data/           # Dummy data (products.js)
│   ├── App.js          # Main application component
│   ├── Navbar.js       # Navigation bar component
│   ├── ProductList.js  # Component listing products + controls
│   ├── ProductCard.js  # Component for a single product display
│   ├── CartView.js     # Component displaying the shopping cart
│   ├── AddToCartButton.js # Button component using CartContext
│   ├── index.js        # Entry point, renders App, wraps CartProvider
│   ├── style.css       # Global styles
│   └── ...             # Other files
├── .gitignore          # Files/folders ignored by Git
├── package.json        # Project metadata and dependencies
└── README.md           # This file
```

## Known Issues / Future Improvements

*   Uses dummy product data; needs integration with a real backend API.
*   Cart state is lost on page refresh (needs persistence like `localStorage` or backend).
*   No user authentication or checkout process.
*   Filtering/sorting options could be expanded.
*   Further UI/UX refinements and accessibility improvements.
*   Implement routing for separate Cart page using React Router.


## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

 Based on concepts learned from [Eng. Ahmed Wasfey's E-commerce Course].