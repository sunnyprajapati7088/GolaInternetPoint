import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import IdCard from '../../components/IdCard';

const StudentMyIDCard = () => {
  const { user } = useAuth();

  const handleDownload = () => {
    // This uses the browser's print dialog.
    // It works with the print-specific CSS we'll add.
    window.print();
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center no-print">
        My ID Card
      </h1>
      {/* This 'printable-area' div is key */}
      <div className="printable-area">
        <IdCard user={user} />
      </div>
      <button 
        onClick={handleDownload}
        className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 no-print"
      >
        Download ID Card
      </button>
    </div>
  );
};
export default StudentMyIDCard;