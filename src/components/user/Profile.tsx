"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';

// Define the UserProfile interface
 type UserProfile = {
  did: string; // Decentralized Identifier
  didrequired?: boolean; // Whether DID is required
  handle: string; // User handle (e.g., @username)
  handlerequired?: boolean; // Whether the handle is required
  displayName?: string; // Display name, <= 640 characters
  description?: string; // User description, <= 2560 characters
  avatar?: string; // URI for the avatar image
  banner?: string; // URI for the banner image
  followersCount?: number; // Number of followers
  followsCount?: number; // Number of users followed
  postsCount?: number; // Number of posts

  associated?: {
    [key: string]: unknown; // Additional associated data
  };

  joinedViaStarterPack?: {
    [key: string]: unknown; // Starter pack details
  };

  indexedAt?: string; // ISO date-time string for when indexed
  createdAt?: string; // ISO date-time string for when created

  viewer?: {
    [key: string]: unknown; // Viewer-specific information
  };

  labels?: object[]; // Array of labels

  pinnedPost?: {
    [key: string]: unknown; // Details about the pinned post
  };
}


const Profile: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUser, seIsUser] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState({
    displayName: user?.displayName || "",
    description: user?.description || "",
  });
  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };





  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const load_profile = async (handle : string) => {
    try {
      const response = await fetch(`/api/feeds/get-my-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle}), // Sending feedId as an argument
      });

      if (!response.ok) {
        throw new Error('Failed to like feed');
      }

      const data = await response.json();
      seIsUser(true);
      setUser(data)
      //console.log(data); // Handle response from the backend (e.g., updated feed info)
      //setLikedFeeds((prev) => [...prev, data]); // Add liked feed to state
    } catch (error) {
      console.error('Error liking feed:', error);
    }
  };
  const edit_profile = async (displayName : string, description : string) => {
    try {
      const response = await fetch(`/api/feeds/edit-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName, description}), // Sending feedId as an argument
      });

      if (!response.ok) {
        throw new Error('Failed to like feed');
      }

      const data = await response.json();
      if(data === true){
         toast.success("Profile update successfully")
         setIsUpdate(true)
         if(session){
            load_profile(session.user.bskySession.handle)
          }
          toggleModal()
      } else {
        toast.error("Profile not update check you data")
        //setIsUpdate(false)
      }
      console.log(data); // Handle response from the backend (e.g., updated feed info)
      //setLikedFeeds((prev) => [...prev, data]); // Add liked feed to state
    } catch (error) {
      console.error('Error liking feed:', error);
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    const { displayName,  description} = profile;
    edit_profile(displayName, description)
    // Add your save logic here (e.g., API call)
  };

  React.useEffect(() => {
    if(session){
      load_profile(session.user.bskySession.handle)
      //console.log(session.user.bskySession.handle)
    }
    
  }, [session]);


  React.useEffect(()=>{
    if(user !== null){
     console.log(user)
     setProfile({
      displayName: user.displayName || "",
      description: user.description || "",
    });
    }
    console.log("user")
   },[isUser])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>You are not logged in</div>
  }

  const BANNER = "https://via.placeholder.com/1200x300";
  const PROFILE = "https://via.placeholder.com/150";


  

  return (
    <>
   {user !== null ? (<div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-700">
        <img
          src={user.banner === null ? BANNER : user.banner}
          alt="Cover"
          className="object-cover w-full h-full"
        />
        {/* Profile Image */}
        <div className="absolute bottom-[-50px] left-6">
          <img
            src={user.avatar === null ? PROFILE : user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="px-6 pt-12 pb-6">
        {/* Name and Buttons */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-600">{user.displayName}</h1>
            <p className="text-sm  text-blue-500">@{user.handle}</p>
          </div>
          <div className="flex gap-2">
            <button 
            onClick={toggleModal} 
            className="bg-gray-200  px-2 pb-1 rounded-md hover:bg-gray-300">
              <span className="text-sm text-gray-700 font-semibold">Edit Profile</span>
            </button>
            <button className="bg-gray-200 px-2 rounded-lg">
              <AiOutlineShareAlt />
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-600 mb-6">
          {user?.description}
        </p>

        {/* Stats */}
        <div className="flex gap-8 text-center">
          <div className="flex gap-1 items-center">
            <p className="text-lg font-bold text-gray-600">{user?.followersCount}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-lg font-bold text-gray-600">{user?.followsCount}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-lg font-bold text-gray-600">{user?.postsCount}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>
            <div>
              <button onClick={toggleModal}><AiFillCloseCircle className="text-red-500 text-2xl" /></button>
            </div>
            </div>
            <div className="text-gray-600 mb-6 space-y-2">
              <div>
                 <div>
                    <label htmlFor="" className="pb-3 font-semibold">Display name</label>
                    <input 
                      type="text" 
                      name="displayName"
                      value={profile.displayName}
                      onChange={handleChange}
                      className="px-3 py-2 rounded-lg bg-gray-100 border outline-none w-full" />
                 </div>
              </div>
              <div>
                 <div>
                    <label htmlFor="" className="pb-3 font-semibold">Description</label>
                    <textarea 
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg bg-gray-100 border outline-none w-full" 
                     id=""></textarea>
                    {/* <input type="text" className="px-3 py-2 rounded-lg bg-gray-100 border outline-none w-full" /> */}
                 </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white font-semibold px-4 py-3 rounded-md hover:bg-blue-600 w-full"
                onClick={() => handleSave()}
              >
                Save Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>) : (
      <div>
        <p>Loading..</p>
      </div>
    )}
    <Toaster />
    </>
  );
};

export default Profile;