import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from './ICONS';

/**
 * Helper for Navbar Links (now using <Link>)
 */
const NavLink = ({ to, children, ...props }) => (
  <Link
    to={to}
    {...props}
    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </Link>
);

/**
 * Navigation Bar Component
 * Displays top navigation links, logo, and login/logout buttons.
 */
const Navbar = ({ user, onLogout, onToggleMobileMenu }) => {
  // Determine the correct "home" path for the logo
  const homePath = user ? `/${user.role}/dashboard` : '/';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            {user && (
              <button
                onClick={onToggleMobileMenu}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ICONS.menu className="h-6 w-6" />
              </button>
            )}
            {/* Logo */}
            <Link
              to={homePath}
              className="flex-shrink-0 flex items-center cursor-pointer ml-2 md:ml-0"
            >
              <span className="text-2xl font-bold text-blue-600">Gola Internet Point</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/verify">Verify Certificate</NavLink>
            {user ? (
              <button
                onClick={onLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile Login/Logout (when no user is logged in) */}
          {!user && (
              <div className="md:hidden">
                <Link
                  to="/login"
                  className="px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Login
                </Link>
              </div>
          )}

            {/* Mobile Logout (when user is logged in) */}
            {user && (
              <div className="md:hidden">
                <button
                  onClick={onLogout}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <ICONS.logOut className="h-6 w-6 text-red-600" />
                </button>
              </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;