"use client"
import React, { useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login: React.FC = () => {
  const r = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {

      const result = await signIn("bluesky", {
        handle: identifier,
        password: password,
        redirect: false,
        callbackUrl: "/home",
      });

      if (result?.error) {
        setError('Invalid login credentials. Please try again.');
      } else {
        toast.success('Successfully created!');
        toast.loading("wait....")
        //console.log(result)
        // Redirect or handle success
        r.push('/home')// Redirect to dashboard
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-4 text-blue-500">
          <FaTwitter size={50} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log in to Twitter
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
