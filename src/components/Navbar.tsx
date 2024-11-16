"use client"
import React, { useState } from 'react';

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
          <a href="/">BlueSky 🇭🇹</a>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          <a href="/" className="text-white hover:text-gray-200">Profile</a>
          <a href="/" className="text-white hover:text-gray-200">Notifications</a>
          <a href="/" className="text-white hover:text-gray-200">Settings</a>
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
          <a href="/" className="block hover:text-gray-200">Home</a>
          <a href="/profile" className="block hover:text-gray-200">Profile</a>
          <a href="/notifications" className="block hover:text-gray-200">Notifications</a>
          <a href="/settings" className="block hover:text-gray-200">Settings</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
