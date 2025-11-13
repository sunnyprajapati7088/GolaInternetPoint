import React from 'react';
import { useData } from '../../contexts/DataContext';

const CoursesPage = () => {
  // Get courses from our global state
  const { courses, loading } = useData();

  if (loading) {
    return (
      <div className="text-center p-12">
        <h1 className="text-2xl font-bold">Loading Courses...</h1>
      </div>
    );
  }

  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-bold text-blue-700 mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-4"><strong>Duration:</strong> {course.duration}</p>
                    <p className="text-2xl font-bold text-gray-800 mb-4">₹{course.fee}</p>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                        Learn More
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};

export default CoursesPage;