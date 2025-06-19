// client/src/components/Header.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setShowSearchBar(false)
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  // Function to close search bar if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the search bar/form, but not on the search icon itself
      if (
        showSearchBar &&
        !event.target.closest('.search-form-container') && // Class for the search input div
        !event.target.closest('.search-icon-button') // Class for the search icon button
      ) {
        setShowSearchBar(false);
        setSearchTerm(''); // Clear search term when closing
      }
    };

    if (showSearchBar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchBar]);


  return (
    // This header will now be sticky at the top, and appear on all pages.
    <header className="sticky top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-white/90 z-20 shadow-sm"> {/* Added sticky and shadow for better visual separation */}
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/shop-all" className="hover:text-gray-900 transition-colors">SHOP</Link>
      </div>
      <Link href="/"> {/* Link the logo to the homepage */}
        <h1 className="text-2xl font-bold">Ks jewels</h1>
      </Link>
      <div className="flex items-center gap-4 text-xl"> {/* Added items-center for alignment */}
        {/* Search Bar Container */}
        <div className={`relative flex items-center transition-all duration-300 ease-in-out ${showSearchBar ? 'w-64' : 'w-0'}`}>
          {/* Input field, conditionally rendered */}
          {showSearchBar && (
            <form onSubmit={handleSearchSubmit} className="search-form-container relative w-full flex items-center bg-gray-100 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="SHOP KS JEWELS"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm bg-transparent border-none outline-none text-gray-800"
                autoFocus
              />
              <button type="submit" className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-500 hover:text-gray-800">
                  <img src="/search-icon.png" alt="Search" className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        {/* Search Button (icon) - Toggles the search bar visibility */}
        <button
          onClick={() => setShowSearchBar(!showSearchBar)} // Toggle search bar
          className="search-icon-button flex items-center justify-center p-1 rounded-full hover:bg-gray-200"
          aria-label="Toggle Search Bar"
        >
          <img src="/search-icon.png" alt="Search" className="h-6 w-6" />
        </button>
      </div>
    </header>
  )
}