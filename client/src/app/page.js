// client/src/app/page.js
'use client'
import { useEffect, useState } from 'react'
import HeroCarousel from '../components/HeroCarousel'
import ProductCard from '../components/ProductCard'
import AnimatedButton from '../components/AnimatedButton'
import Link from 'next/link' // Import Link for navigation

// Define your collection data statically here
// IMPORTANT: The 'categorySlug' here must match the 'category' values you set in your database
// For example, if your database has 'Necklaces', use 'Necklaces' here.
const shopFromOurCollections = [
  {
    id: 1,
    name: 'BRACELETS',
    imageUrl: '/Bracelete.jpg', // Path to your static image in public folder
    categorySlug: 'Bracelets', // This will be used in the URL and sent to backend for filtering
  },
  {
    id: 2,
    name: 'RINGS',
    imageUrl: '/Rings.jpg',
    categorySlug: 'Rings',
  },
  {
    id: 3,
    name: 'EARRINGS',
    imageUrl: '/Earring.jpg',
    categorySlug: 'Earrings',
  },
  {
    id: 4,
    name: 'NECKLACES',
    imageUrl: '/Necklace.jpg',
    categorySlug: 'Necklaces',
  },
];

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // This fetches ALL products initially for your June Restock/New In sections
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products for homepage:", error));
  }, [])

  // Slice products for different sections
  const previewItems = products.slice(0, 6)
  const newInItems = products.slice(6, 12) // This was commented out in a previous version, but is good for future use.

  return (
    <main>
      <HeroCarousel />

      {/* Jewelry Preview (JUNE RESTOCK / BEST SELLERS) */}
      <section id="jewelry" className="px-4 py-10">
        <h2 className="text-center text-3xl font-semibold mb-6">BEST SELLERS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
          {previewItems.map(prod => (
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
        <div className="flex justify-center mt-8">
          <Link href="/shop-all" passHref>
            <AnimatedButton text="SHOP ALL" />
          </Link>
        </div>
      </section>


      {/* Shop From Our Collections Section (Using static images and linking to category pages) */}
      <section className="px-4 py-10 bg-gray-50">
        <h2 className="text-center text-3xl font-semibold mb-10">Shop From Our Collections</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {shopFromOurCollections.map(collection => (
            <Link key={collection.id} href={`/collections/${collection.categorySlug.toLowerCase()}`} passHref>
              <div className="text-center cursor-pointer">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={collection.imageUrl} // Static image path from public folder
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-md font-medium text-gray-700">{collection.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}