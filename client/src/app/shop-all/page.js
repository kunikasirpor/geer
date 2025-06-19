// client/src/app/shop-all/page.js
'use client'; // This is a client component

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard'; // Assuming you have a ProductCard component

export default function ShopAllPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all products from your API
    fetch('http://localhost:5000/api/products')
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
        console.error("Failed to fetch all products:", e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div className="text-center py-10">Loading all products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading products: {error.message}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(prod => (
          <ProductCard
            key={prod.id}
            product={{
              id: prod.id,
              name: prod.name,
              image: prod.imageUrl, // Maps imageUrl from backend to 'image' prop for ProductCard
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