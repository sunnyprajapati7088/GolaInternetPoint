import React from 'react';
import { ICONS } from './ICONS'; // It needs the icons!
import QRCodeDisplay from './QRCodeDisplay'; // And the QR code!

/**
 * ID Card Component
 */
const IdCard = ({ user }) => {
  // Mock data for the student, as the user object only has name/role
  const student = {
    ...user,
    photoUrl: 'https://placehold.co/150x150/EBF8FF/3182CE?text=Student',
    course: 'Advanced Web Development',
    center: 'City Center, Delhi',
    enrollNo: 'ENR-S1001',
    validTill: '12/2026'
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 max-w-sm mx-auto w-full">
      <div className="text-center mb-4 border-b-2 border-blue-200 pb-2">
        <h1 className="text-2xl font-bold text-blue-700">Gola Internet Point Academy</h1>
        <p className="text-sm font-medium text-gray-600">{student.center}</p>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <img
          src={student.photoUrl}
          alt="Student Photo"
          className="w-36 h-36 rounded-full border-4 border-blue-300 shadow-md"
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
          <p className="text-lg font-medium text-blue-600">{student.course}</p>
        </div>
        <div className="w-full pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Enrollment No.</span>
            <span className="text-sm font-mono text-gray-800">{student.enrollNo}</span>
          </div>
            <div className="flex justify-between">
            <span className="text-sm text-gray-500">Valid Till</span>
            <span className="text-sm font-medium text-gray-800">{student.validTill}</span>
          </div>
        </div>
        <div className="pt-4">
          <QRCodeDisplay value={`https://Gola Internet Point.com/verify/student/${student.id}`} />
        </div>
      </div>
    </div>
  );
};

// Make sure this is a DEFAULT export
export default IdCard;
