import React from 'react';
import Footer from '../Footer';  // Import your Footer component
import Navbar from '../includs/Navbar';
import SessionWrapper from './SessionWrapper';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-blue-50">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
