// client/src/components/Footer.js
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 pt-16 pb-8 px-4 sm:px-6 lg:px-8"> {/* Adjusted padding */}
      <div className="container mx-auto max-w-6xl"> {/* Max width container */}
        {/* Large Brand Name */}
        <div className="text-center mb-12"> {/* Increased bottom margin */}
          <h2 className="text-6xl md:text-8xl font-extrabold text-gray-700 tracking-tight leading-none uppercase">
            KS JEWELS
          </h2>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-300 pb-10 mb-8"> {/* Added border-b and adjusted gap/padding */}

          {/* About/Shop Links Column 1 */}
          <div className="flex flex-col space-y-2"> {/* Use flex-col and space-y for vertical list */}
            <Link href="/about" className="text-sm hover:text-gray-900 transition-colors">ABOUT</Link>
            <Link href="/sizing" className="text-sm hover:text-gray-900 transition-colors">SIZING</Link>
            <Link href="/ambassador" className="text-sm hover:text-gray-900 transition-colors">AMBASSADOR</Link>
            <Link href="/shipping" className="text-sm hover:text-gray-900 transition-colors">SHIPPING</Link>
          </div>

          {/* Care/Contact Links Column 2 */}
          <div className="flex flex-col space-y-2">
            <Link href="/care" className="text-sm hover:text-gray-900 transition-colors">CARE</Link>
            <Link href="/return" className="text-sm hover:text-gray-900 transition-colors">RETURN</Link>
            <Link href="/contact" className="text-sm hover:text-gray-900 transition-colors">CONTACT</Link>
            <Link href="/terms" className="text-sm hover:text-gray-900 transition-colors">TERMS</Link>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Connect</h4> {/* Added a subtle heading */}
            <a href="https://instagram.com/ksjewels" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-gray-900 transition-colors">
               Instagram
            </a>
            <a href="https://youtube.com/ksjewels" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-gray-900 transition-colors">
               YouTube
            </a>
            <a href="https://tiktok.com/ksjewels" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-gray-900 transition-colors">
              TikTok
            </a>
          </div>

          {/* Contact Email Column */}
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">TO REACH US, EMAIL:</h4>
            <a href="mailto:contact@ksjewels.co" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">contact@ksjewels.co</a>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="text-center text-sm text-gray-600">
          &copy; {currentYear} KS JEWELS
        </div>
      </div>
    </footer>
  );
}