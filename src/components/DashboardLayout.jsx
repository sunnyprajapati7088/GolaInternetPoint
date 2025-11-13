import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';

// This component provides the layout for all dashboard pages
const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation(); // To get the current path for the sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Your original mobile menu logic would go here
  // ...

  if (!user) return null; // Should be handled by ProtectedRoute, but good to have

  return (
    <div className="flex flex-1 relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 h-full fixed">
          <Sidebar
            role={user.role}
            route={location.pathname} // Use react-router's path
            onClose={() => {}}
          />
        </div>
      </div>

      {/* Mobile Menu (your logic) */}
      {/* ... */}
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 md:ml-64">
        <Outlet /> {/* This is where the nested page (e.g., AdminDashboard) will render */}
      </main>
   </div>
  );
};

export default DashboardLayout;