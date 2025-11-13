import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import IdCard from '../../components/IdCard';
import { ICONS } from '../../components/ICONS';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Welcome, {user.name}!
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              My Active Course
            </h2>
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <h3 className="text-lg font-bold text-blue-700">Advanced Web Development</h3>
                <p className="text-gray-600 mt-2">Progress: <strong>75%</strong></p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Continue Learning
                </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/student/courses')}
                  className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <ICONS.book className="h-10 w-10 text-blue-600 mb-2" />
                    <span className="font-medium text-gray-700">My Courses</span>
                </button>
                <button 
                  onClick={() => navigate('/student/certificates')}
                  className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <ICONS.award className="h-10 w-10 text-green-600 mb-2" />
                    <span className="font-medium text-gray-700">My Certificates</span>
                </button>
            </div>
          </div>
        </div>

        {/* Right Column: ID Card */}
        <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">My ID Card</h2>
            <div onClick={() => navigate('/student/id-card')} className="cursor-pointer transition-transform hover:scale-105">
                <IdCard user={user} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;