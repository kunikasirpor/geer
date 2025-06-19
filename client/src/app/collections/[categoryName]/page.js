// client/src/app/collections/[categoryName]/page.js
'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // For reading URL dynamic parameters
import ProductCard from '../../../components/ProductCard'; // Re-use your ProductCard component

export default function CollectionCategoryPage() {
  const params = useParams();
  const { categoryName } = params; // Get the dynamic categoryName from the URL

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryName) {
      setLoading(false);
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    // Convert categoryName from URL (e.g., 'bracelets') to match your backend's expected casing (e.g., 'Bracelets')
    // This assumes your backend category names are capitalized. Adjust if not.
    const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    fetch(`http://localhost:5000/api/products/filter?category=${encodeURIComponent(formattedCategoryName)}`)
      .then(async (res) => {
        if (!res.ok) {
          // If the backend sends a 404 for no products found, handle it gracefully
          if (res.status === 404) {
            return { products: [], message: 'No products found for this category' };
          }
          const errorData = await res.json();
          throw new Error(`HTTP error! status: ${res.status}, Message: ${errorData.message || res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        // If the backend returns a message property, it means no products were found but it wasn't a hard error
        if (data.message && data.products && data.products.length === 0) {
            setProducts([]);
            setError(new Error(data.message)); // Set an error message if desired
        } else {
            setProducts(data);
        }
      })
      .catch(e => {
        console.error("Failed to fetch products by category:", e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryName]); // Re-run effect if categoryName changes

  if (loading) {
    return <div className="text-center py-10">Loading {categoryName} collection...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading collection: {error.message}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-10">No products found for "{categoryName}".</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(prod => (
          <ProductCard
            key={prod.id}
            product={{
              id: prod.id,
              name: prod.name,
              image: prod.imageUrl,
              altImage: prod.altImage,
              price: prod.price,
              reviews: prod.reviews
            }}
          />
        ))}
      </div>
    </div>
  );
}