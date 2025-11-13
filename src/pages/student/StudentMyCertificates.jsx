import React from 'react';
import {CertificateCard} from '../../components/CertificateCard';
import { useAuth } from '../../contexts/AuthContext';

const StudentMyCertificates = () => {
  const { user } = useAuth(); // Get the logged-in student's name

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center no-print">My Certificates</h1>
      
      {/* This 'printable-area' will be used for downloading */}
      <div className="printable-area">
        <CertificateCard 
          studentName={user.name} // Use the dynamic user name
          courseName="Advanced Web Development"
          date="10/10/2024"
          id="CERT-S1001-AWD"
        />
      </div>

      <button 
        onClick={() => window.print()} // Use the same print trick
        className="w-full max-w-3xl mx-auto mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 no-print"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default StudentMyCertificates;