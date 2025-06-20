# Project Overview

This application serves as a simplified e-commerce platform for jewelry. The frontend allows users to browse products, view product details, and interact with various parts of the site. The backend provides a RESTful API for managing product data.

# Features:

Frontend (Next.js)
Homepage: Displays a hero carousel, best-selling products, and shop-by-collection sections.
Product Listing: Shows a grid of all available products.
Product Detail Page: Displays individual product information, including main image and selectable alternate images (if available), price, description, and placeholder options/specifications.
Dynamic Footer Content.
Styling: Utilizes Tailwind CSS for responsive and modern UI.
Custom Text Component: Implemented a "crystal text" effect for brand names KS JEWELS using pure CSS and Tailwind, replacing a static image.
Backend (Express.js)
Provides product data to the frontend via RESTful API endpoints.
Handles fetching single product details and filtered product lists.


# Tech Stack
Frontend:
Next.js (React Framework)
React
Tailwind CSS
Backend:
Node.js
Express.js
Database/Data Storage:
MySql


# How to Run the Project
Follow these steps to set up and run the project locally:

1) Clone the repository:
git clone https://github.com/kunikasirpor/geer
cd geer


2) Start the Backend Server:
cd backend
npm install
npm start

The backend server will typically run on http://localhost:5000


3) Start the Frontend Application:
cd ../client
npm install
npm run dev

The frontend application will typically run on http://localhost:3000

4) Access the Application:
navigate to http://localhost:3000.
