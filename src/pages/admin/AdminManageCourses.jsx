import React from 'react';
import { useData } from '../../contexts/DataContext';

const AdminManageCourses = () => {
  const { courses, loading } = useData();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
          Add New Course
        </button>
      </div>
      <div className="p-6">
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{course.title}</h2>
                <p className="text-sm text-gray-600">{course.duration} | ₹{course.fee}</p>
              </div>
              <div className="space-x-2">
                <button className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Edit</button>
                <button className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminManageCourses;