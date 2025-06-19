// client/src/app/layout.js
import './globals.css'; // Your global Tailwind CSS file
import { Inter } from 'next/font/google';
import Header from '../components/Header'; // Import the new Header component
import Footer from '../components/Footer'; // Assuming you have your Footer component here

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'KS Jewels',
  description: 'Your premium jewelry store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Top promotional banner - can be placed here if it's universal for all pages */}
        <div className="text-center bg-white text-xs py-2 border-b border-gray-200">
          FREE SHIPPING & EASY RETURNS!
        </div>

        <Header /> {/* Render the Header component here. It will be on every page. */}

        {/* This is where your page-specific content (from page.js, [id]/page.js, etc.) will be rendered */}
        {children}

        {/* Footer will also appear on every page if placed here */}
        <Footer />
      </body>
    </html>
  );
}