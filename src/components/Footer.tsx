"use client"
import React from 'react';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Footer Top Section */}
        <div className="flex justify-between items-center md:flex-row flex-col">
          <div className="text-xl font-bold">
            <p>&copy; {new Date().getFullYear()} BlueSky 🇭🇹</p>
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="hover:text-gray-200">Home</Link>
            <Link href="/" className="hover:text-gray-200">About</Link>
            <Link href="/" className="hover:text-gray-200">Contact</Link>
            <Link href="/" className="hover:text-gray-200">Privacy Policy</Link>
          </div>
        </div>

        {/* Footer Bottom Section (Social Media Icons) */}
        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-6">
            {/* Social Media Icons */}
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-white text-3xl cursor-pointer" />
             </Link>
             <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
               <FaGithub className="text-white text-3xl cursor-pointer" />
             </Link>
          </div>
        </div>

        {/* Footer Bottom Section (Contact Info) */}
        <div className="mt-6 text-center text-sm text-gray-200">
          <p>For support, contact us at: <Link href="mailto:support@example.com" className="hover:text-gray-400">support@blueskyht.com</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;