import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UnauthorizedPage from '../pages/public/UnauthorizedPage';

// This component protects routes based on user login and role
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // 1. Not logged in? Redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in, but wrong role? Show "Unauthorized".
  if (!allowedRoles.includes(user.role)) {
    return <UnauthorizedPage />;
  }

  // 3. Logged in and correct role? Show the page.
  // <Outlet /> is the placeholder for the page component (e.g., AdminDashboard)
  return <Outlet />;
};

export default ProtectedRoute;