import React from 'react';
import { ICONS } from './ICONS';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ role, route, onClose }) => {
  const navigate = useNavigate(); // <-- Use the hook here!

  const ADMIN_LINKS = [
    { name: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
    { name: 'Manage Courses', icon: 'book', path: '/admin/courses' },
    { name: 'Manage Franchise', icon: 'building', path: '/admin/franchises' },
    { name: 'Manage Students', icon: 'users', path: '/admin/students' },
    { name: 'Certificates', icon: 'award', path: '/admin/certificates' },
    { name: 'Reports', icon: 'fileText', path: '/admin/reports' },
  ];

  const FRANCHISE_LINKS = [
    { name: 'Dashboard', icon: 'dashboard', path: '/franchise/dashboard' },
    { name: 'Add Student', icon: 'userPlus', path: '/franchise/add-student' },
    { name: 'Manage Students', icon: 'users', path: '/franchise/manage-students' },
    { name: 'Issue Certificate', icon: 'award', path: '/franchise/issue-certificate' },
    { name: 'Issue ID Card', icon: 'idCard', path: '/franchise/issue-id' },
    { name: 'Study Material', icon: 'book', path: '/franchise/study-material' },
  ];

  const STUDENT_LINKS = [
    { name: 'Dashboard', icon: 'dashboard', path: '/student/dashboard' },
    { name: 'My Courses', icon: 'book', path: '/student/courses' },
    { name: 'My Certificates', icon: 'award', path: '/student/certificates' },
    { name: 'My ID Card', icon: 'idCard', path: '/student/id-card' },
    { name: 'Online Exam', icon: 'fileText', path: '/student/exam' },
  ];

  const links =
    role === 'admin'
      ? ADMIN_LINKS
      : role === 'franchise'
      ? FRANCHISE_LINKS
      : STUDENT_LINKS;

  const SidebarLink = ({ link }) => {
    const Icon = ICONS[link.icon];
    const isActive = route === link.path; // Use 'route' prop
    return (
      <button
        onClick={() => {
          navigate(link.path); // <-- Use the hook's navigate
          onClose(); // Close mobile menu on navigation
        }}
        className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-200 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span className="font-medium">{link.name}</span>
      </button>
    );
  };

  return (
    <aside className="flex flex-col w-64 h-full bg-gray-800 p-4 space-y-2">
      <div className="flex justify-between items-center md:hidden">
        <span className="text-white text-xl font-bold p-2">Menu</span>
        <button onClick={onClose} className="p-2 text-gray-300 hover:text-white">
          <ICONS.x className="h-6 w-6" />
        </button>
      </div>
      <div className="border-t border-gray-700 md:hidden"></div>
      {links.map((link) => (
        <SidebarLink key={link.path} link={link} />
      ))}
    </aside>
  );
};

export default Sidebar;