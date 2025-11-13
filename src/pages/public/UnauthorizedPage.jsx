import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-600 mb-8">
        You do not have the necessary permissions to view this page.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  );
};

export default UnauthorizedPage;