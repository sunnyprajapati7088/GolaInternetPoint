import   { useState } from "react";
import React from "react";
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Home', 'Courses', 'Apply', 'Toppers', 'Contact',];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <a href="#" className="flex-shrink-0 text-2xl font-bold text-indigo-600">
            Gola Internet Point
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <a 
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150"
              >
                {link}
              </a>
            ))}
            <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg pb-2">
          {navLinks.map(link => (
            <a 
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              {link}
            </a>
          ))}
          <div className="px-4 pt-2">
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;