import React from 'react';

const StudentMyCourses = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Enrolled Courses</h1>
        {/* Mock Course List */}
        <div className="p-4 border rounded-lg mb-4">
          <h3 className="text-lg font-bold text-blue-700">Advanced Web Development</h3>
          <p className="text-gray-600 mt-2">Progress: <strong>75%</strong></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Go to Course
          </button>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-bold text-gray-700">Data Science with Python (Upcoming)</h3>
          <p className="text-gray-600 mt-2">Starts: 01/12/2025</p>
        </div>
    </div>
);

export default StudentMyCourses;