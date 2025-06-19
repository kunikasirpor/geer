// src/components/HeroCarousel.js
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const images = [
  '/banner1.jpg',
  '/banner2.jpg'
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="relative w-full h-[90vh] bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      {/* NO HEADER HERE ANYMORE. The header is now in layout.js. */}

      {/* Overlay with "JUNE RESTOCK" text */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white bg-black/20">
        <div>
          <h2 className="text-lg md:text-2xl tracking-wider">JUNE RESTOCK</h2>
          <p className="text-sm">use code JUN25 for 20% off</p>
          <Link href="/shop-all" passHref>
            <button className="mt-4 bg-white text-black px-6 py-2 font-medium hover:bg-gray-200">
              SHOP ALL
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}