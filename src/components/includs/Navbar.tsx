"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { IoSettingsOutline } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { SlFeed } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { MdSettingsApplications } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdRssFeed } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500  z-50">
      {/* Container for the navbar */}
      <div className="max-w-screen-xl mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link href="/home">BlueSky 🇭🇹</Link>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-6 text-white">
        <Link onClick={toggleMenu} href="/home" className="block hover:text-gray-200">
           <p className='flex items-center'><span className='pr-2'><MdRssFeed className='text-lg font-semibold' /></span> <span className='text-md font-semibold'>Feeds</span></p>
          </Link>
          <Link onClick={toggleMenu} href="/home/notifications" className="block hover:text-gray-200">
            <p className='flex items-center'><span className='pr-2'><IoNotificationsCircleSharp className='text-lg font-semibold' /></span> <span className='text-md font-semibold'>Notifications</span></p>
          </Link>
           <Link onClick={toggleMenu} href="/home/profile" className="block hover:text-gray-200">
            <p className='flex items-center'><span className='pr-2'><CgProfile className='text-lg font-semibold' /></span> <span className='text-md font-semibold'>Profile</span></p>
          </Link>
          <Link onClick={toggleMenu} href="/settings" className="block hover:text-gray-200">
           <p className='flex items-center'><span className='pr-2'><MdSettingsApplications className='text-lg font-semibold' /></span> <span className='text-md font-semibold'>Settings</span></p>
          </Link>
        </div>

        {/* Hamburger Menu for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <IoSettings className='text-2xl' /> : <IoSettingsOutline className='text-2xl' />}
          </button>
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-50 text-blue-600  space-y-4 px-4 py-4">
          <Link onClick={toggleMenu} href="/home" className="block hover:text-gray-200">
           <p className='flex items-center'><span className='pr-2'><MdRssFeed className='text-lg font-semibold' /></span> <span className='text-md font-semibold'>Feeds</span></p>
          </Link>
          <Link onClick={toggleMenu} href="/home/notifications" className="block hover:text-gray-200">
            <p className='flex items-center'><span className='pr-2'><IoNotificationsCircleSharp className='text-lg font-semibold' /></span> <span className='text-md font-semibold'>Notifications</span></p>
          </Link>
           <Link onClick={toggleMenu} href="/home/profile" className="block hover:text-gray-200">
            <p className='flex items-center'><span className='pr-2'><CgProfile className='text-lg font-semibold' /></span> <span className='text-md font-semibold'>Profile</span></p>
          </Link>
          <Link onClick={toggleMenu} href="/settings" className="block hover:text-gray-200">
           <p className='flex items-center'><span className='pr-2'><MdSettingsApplications className='text-lg font-semibold' /></span> <span className='text-md font-semibold'>Settings</span></p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
