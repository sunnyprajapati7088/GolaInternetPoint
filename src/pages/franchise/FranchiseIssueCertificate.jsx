import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import Card from '../../components/Card';

const FranchiseDashboard = () => {
  const { user } = useAuth();
  // Get all data, then filter
  const { students, courses, loading } = useData();

  if (loading) return <div>Loading...</div>;

  // Filter students for *this* franchise
  const myStudents = students.filter(s => s.franchise === user.center);
  const pendingCertificates = myStudents.length // Just a mock number for now

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Franchise Dashboard</h1>
      <p className="text-lg text-gray-600 mb-6">Welcome, {user.name} ({user.center})</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="My Students"
          value={myStudents.length}
          iconName="users"
        />
        <Card
          title="Courses Offered"
          value={courses.length}
          iconName="book"
        />
        <Card title="Pending Certificates" value={pendingCertificates} iconName="award" />
      </div>
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Student List</h2>
          <ul className="divide-y divide-gray-200">
              {myStudents.length > 0 ? myStudents.slice(0, 5).map(s => ( // Show top 5
                <li key={s.id} className="py-3 flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{s.name}</span>
                    <span className="text-sm text-gray-500">{s.course}</span>
                </li>
              )) : (
                <p className="text-gray-500">You haven't added any students yet.</p>
              )}
          </ul>
      </div>
    </div>
  );
};

export default FranchiseDashboard;