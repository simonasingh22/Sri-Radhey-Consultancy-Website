import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Primary Page Content Router Outlet */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Sticky Call-To-Action WhatsApp Bubble */}
      <WhatsAppButton />
    </div>
  );
}
