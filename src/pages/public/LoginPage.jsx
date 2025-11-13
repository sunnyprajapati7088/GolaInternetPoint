import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ICONS } from '../../components/ICONS';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    try {
      // 1. Call the login function from our context
      const userData = login(role);
      
      // 2. Navigate to the correct dashboard
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (userData.role === 'franchise') {
        navigate('/franchise/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error("Failed to login", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Login As
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('admin')}
            className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all"
          >
            <ICONS.dashboard className="h-6 w-6 mr-3" />
            Login as Admin
          </button>
          <button
            onClick={() => handleLogin('franchise')}
            className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-all"
          >
            <ICONS.building className="h-6 w-6 mr-3" />
            Login as Franchise
          </button>
          <button
            onClick={() => handleLogin('student')}
            className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
          >
            <ICONS.users className="h-6 w-6 mr-3" />
            Login as Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;   