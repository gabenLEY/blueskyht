"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      {/* Container for the navbar */}
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">BlueSky 🇭🇹</Link>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-200">Home</Link>
          <Link href="/" className="text-white hover:text-gray-200">Profile</Link>
          <Link href="/" className="text-white hover:text-gray-200">Notifications</Link>
          <Link href="/" className="text-white hover:text-gray-200">Settings</Link>
        </div>

        {/* Hamburger Menu for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white space-y-4 px-4 py-3">
          <Link href="/" className="block hover:text-gray-200">Home</Link>
          <Link href="/profile" className="block hover:text-gray-200">Profile</Link>
          <Link href="/notifications" className="block hover:text-gray-200">Notifications</Link>
          <Link href="/settings" className="block hover:text-gray-200">Settings</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
