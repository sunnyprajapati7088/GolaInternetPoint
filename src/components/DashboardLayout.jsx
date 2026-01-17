import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { ICONS } from './ICONS';

// This component provides the layout for all dashboard pages
const DashboardLayout = () => {
    const { user } = useAuth();
    const location = useLocation(); // To get the current path for the sidebar
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!user) return null; // Should be handled by ProtectedRoute, but good to have

    return (
        <div className="flex flex-1 relative min-h-screen bg-gray-900">

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 z-40">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-gray-300 hover:text-white p-1"
                    >
                        <ICONS.menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-white text-lg">Dashboard</span>
                </div>
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
            </div>

            {/* Desktop Sidebar (Fixed) */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="w-64 h-full fixed top-0 left-0 z-30">
                    <Sidebar
                        role={user.role}
                        route={location.pathname}
                        onClose={() => { }}
                    />
                </div>
            </div>

            {/* Mobile Sidebar (Drawer) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    {/* Sidebar Content */}
                    <div className="relative w-64 h-full bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
                        <Sidebar
                            role={user.role}
                            route={location.pathname}
                            onClose={() => setIsMobileMenuOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-8 md:pt-8 md:ml-64 w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;