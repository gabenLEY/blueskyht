"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { IoSettingsOutline } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdSettingsApplications } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdRssFeed } from "react-icons/md";
import { MdPublish } from "react-icons/md";
import Modal from '../utils/Modal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [content , setContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const createPost = async (text : string) => {
    try {
      const response = await fetch(`/api/feeds/create-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text}), // Sending feedId as an argument
      });

      await response.json();
      setIsModalOpen(!isModalOpen)
      return;
      //console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = ()=>{
    console.log(content)
    createPost(content)
  }


  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(!isModalOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500  z-50">
      {/* Container for the navbar */}
      <div className="max-w-screen-xl mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link href="/home">HTsky 🇭🇹</Link>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-6 text-white items-center">
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
          <div>
            <div onClick={openModal} className='border border-white bg-blue-500 hover:bg-blue-300   rounded-xl shadow-xl'>
              <button className='flex gap-1 items-center px-3  py-1'><span className='font-semibold text-white'>Post</span> <MdPublish className='text-lg font-bold text-white' /></button>
            </div>
          </div>
        </div>

        {/* Hamburger Menu for small screens */}
        <div className="md:hidden">
          <div className='flex items-center gap-2'>
            <div onClick={openModal} className='border border-white bg-blue-500 hover:bg-blue-200   rounded-xl shadow-xl'>
              <button className='flex gap-1 items-center px-3  py-1'><span className='font-semibold text-white'>Post</span> <MdPublish className='text-lg font-bold text-white' /></button>
            </div>
             <button onClick={toggleMenu} className="text-white">
               {isMenuOpen ? <IoSettings className='text-3xl' /> : <IoSettingsOutline className='text-3xl' />}
             </button>
          </div>
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

      <Modal isOpen={isModalOpen}>
        <div>
            <div className="text-gray-600 mb-6 space-y-2">
              <div>
                 <div>
                    <textarea 
                      name="content"
                      value={content}
                      onChange={(e)=>setContent(e.target.value)}
                      placeholder='What is happening?'
                      className="px-3 py-2 placeholder:text-gray-500 placeholder:font-bold rounded-lg bg-gray-100 border outline-none w-full" 
                      id=""></textarea>
                 </div>
              </div>
            </div>
        </div>
       <div className='flex items-center gap-2'>
       <button
          onClick={()=>handlePost()}
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Post
        </button>
        <button
          onClick={closeModal}
          className="mt-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
       </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
