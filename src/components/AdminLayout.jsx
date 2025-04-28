import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen relative">
      <div className="hidden md:block">
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      
      <div 
        className={`md:hidden fixed inset-y-0 left-0 z-30 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}
      
      <main className="flex-grow p-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden mb-4 p-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        <Outlet /> 
      </main>
    </div>
  );
}