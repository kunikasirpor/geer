// src/components/ProductCard.js
'use client'

import { useState } from 'react'
import Link from 'next/link' // Ensure Link is imported correctly

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/products/${product.id}`} passHref>
      <div
        className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center cursor-pointer transform hover:-translate-y-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-full h-[220px] overflow-hidden rounded-md">
          <img
            // This line expects 'product.image' for default and 'product.altImage' for hover.
            // The fix is in the parent components (like page.js and shop-all/page.js)
            // to map 'imageUrl' from the database to 'image' for this component.
            src={hovered ? product.altImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        <p className="text-sm text-gray-600 mt-2">★★★★★ ({product.reviews})</p>
        <h3 className="font-semibold text-base mt-1">{product.name}</h3>
        <p className="text-base font-medium text-gray-800">Rs. {product.price}</p>
      </div>
    </Link>
  )
}