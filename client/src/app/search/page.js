// client/src/app/search/page.js
'use client'

import { useEffect, useState } from 'react'; // FIXED: Correct import for useState and useEffect
import { useSearchParams } from 'next/navigation'; // For reading URL query parameters
import ProductCard from '../../components/ProductCard'; // Re-use your ProductCard component

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query'); // Get the 'query' parameter from the URL

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      setLoading(false);
      setProducts([]); // No query, no results
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch products based on the search query
    fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(searchQuery)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(e => {
        console.error("Failed to fetch search results:", e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery]); // Re-run effect if search query changes

  if (loading) {
    return <div className="text-center py-10">Searching for "{searchQuery}"...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error fetching search results: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Search Results for "{searchQuery}"
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(prod => (
            <ProductCard
              key={prod.id}
              product={{
                id: prod.id,
                name: prod.name,
                image: prod.imageUrl, // Map imageUrl from backend to 'image' for ProductCard
                altImage: prod.altImage,
                price: prod.price,
                reviews: prod.reviews
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}