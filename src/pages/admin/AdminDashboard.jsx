import React from 'react';
import Card from '../../components/Card';
import { useData } from '../../contexts/DataContext';

const AdminDashboard = () => {
  const { franchises, students, courses, loading } = useData();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Total Franchises"
          value={franchises.length}
          iconName="building"
        />
        <Card
          title="Total Students"
          value={students.length}
          iconName="users"
        />
        <Card title="Total Courses" value={courses.length} iconName="book" />
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Franchise Approvals</h2>
        <p className="text-gray-600">No pending approvals.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;