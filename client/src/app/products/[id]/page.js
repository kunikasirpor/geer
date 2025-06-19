// client/src/app/products/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Hook to get dynamic route parameters

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params; // Get the product ID from the URL

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(''); // New state for the currently displayed main image

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError(new Error('Product not found.'));
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data = await response.json();
        setProduct(data);
        // Set the main image to imageUrl by default when product data is loaded
        setMainImage(data.imageUrl);
      } catch (e) {
        console.error("Failed to fetch product details:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-fetch if the ID changes

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error.message}</p>
        <p>Please check the product ID or try again later.</p>
      </div>
    );
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found.</div>;
  }

  // Combine imageUrl and altImage for thumbnails
  const images = [];
  if (product.imageUrl) {
    images.push(product.imageUrl);
  }
  if (product.altImage) { // Check if altImage exists
    images.push(product.altImage);
  }
  // If you later add a column for product.additionalImages (as a JSON string of URLs), you could do:
  // if (product.additionalImages) {
  //   try {
  //     const parsedAdditionalImages = JSON.parse(product.additionalImages);
  //     images.push(...parsedAdditionalImages);
  //   } catch (e) {
  //     console.error("Failed to parse additionalImages:", e);
  //   }
  // }


  // Render product details once fetched
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images Section */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={mainImage} // Use the mainImage state here
            alt={product.name}
            className="w-full max-w-lg object-contain rounded-lg shadow-md mb-4" // Added mb-4 for spacing
          />

          {/* Thumbnail Gallery */}
          {images.length > 0 && (
            <div className="flex mt-2 space-x-3"> {/* Adjusted spacing and top margin */}
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    mainImage === imgSrc ? 'border-gray-800' : 'border-transparent hover:border-gray-400' // Highlight active thumbnail
                  } transition-all duration-200`}
                  onClick={() => setMainImage(imgSrc)} // Set this image as the main image on click
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 flex flex-col justify-start">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-800 mb-4">Rs. {product.price}</p>
          <div className="flex items-center mb-4 text-gray-600">
            <span className="text-yellow-500">★★★★★</span> ({product.reviews} reviews)
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description || 'No description available.'}</p>

          {/* This is just a placeholder for options like 'Chain Option' from your screenshot */}
          <div className="mb-6">
            <label htmlFor="chainOption" className="block text-sm font-medium text-gray-700 mb-2">CHAIN OPTION:</label>
            <select
              id="chainOption"
              name="chainOption"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {/* You'll need to populate this dynamically from your product data if available */}
              {product.chainOptions && product.chainOptions.length > 0 ? (
                  product.chainOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                  ))
              ) : (
                  <option>BOX CHAIN</option> // Default if no specific chain options from product
              )}
            </select>
          </div>

          <button className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold">
            ADD TO CART RS. {product.price}
          </button>

          {/* Small Feature Icons (Made by EVANGE, Free Shipping, Fast Delivery) */}
          <div className="flex justify-around items-center mt-6 text-sm text-gray-600">
            <div className="flex flex-col items-center">
              <img src="/star.png" alt="Made by KUNIKA" className="h-6 w-6 mb-1" />
              <span>MADE BY KUNIKA</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/shipping.png" alt="Free Shipping" className="h-6 w-6 mb-1" />
              <span>FREE SHIPPING</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/delivery.png" alt="Fast Delivery" className="h-6 w-6 mb-1" />
              <span>FAST DELIVERY</span>
            </div>
          </div>

          {/* Accordion for Product Details, Specifications, Shipping */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <details className="py-2 border-b border-gray-200">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                PRODUCT DETAILS
                <span className="text-gray-500 text-lg">›</span>
              </summary>
              <div className="mt-2 text-sm text-gray-700">
                <p>{product.description}</p>
              </div>
            </details>
            <details className="py-2 border-b border-gray-200">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                SPECIFICATIONS
                <span className="text-gray-500 text-lg">›</span>
              </summary>
              <div className="mt-2 text-sm text-gray-700">
                <p>Material: {product.material || 'Not specified'}</p>
                <p>Weight: {product.weight || 'Not specified'}</p>
                {/* You can add more specs here if your product data includes them */}
                <p>Category: {product.category || 'Not specified'}</p>
              </div>
            </details>
            <details className="py-2">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                SHIPPING
                <span className="text-gray-500 text-lg">›</span>
              </summary>
              <div className="mt-2 text-sm text-gray-700">
                <p>Standard shipping usually takes 3-5 business days.</p>
                <p>Refer to our shipping policy for more details.</p>
              </div>
            </details>
          </div>

        </div>
      </div>
    </div>
  );
}