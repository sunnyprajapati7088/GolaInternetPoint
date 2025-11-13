import React from 'react';
import QRCodeDisplay from './QRCodeDisplay'; // It needs the QR code!

/**
 * Certificate Card Component
 */
// Note: This is a NAMED export, so you MUST import it with { }
export const CertificateCard = ({ studentName, courseName, date, id }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-blue-200 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
          Certificate of Completion
        </h2>
        <h1 className="text-4xl font-bold text-blue-700 mt-2">Gola Internet PointAcademy</h1>
      </div>
      <p className="text-lg text-center text-gray-600 mb-6">
        This certificate is proudly presented to
      </p>
      <h3 className="text-5xl font-bold text-center text-gray-900 mb-8">
        {studentName}
      </h3>
      <p className="text-lg text-center text-gray-600 mb-6">
        for successfully completing the course
      </p>
      <h4 className="text-3xl font-semibold text-center text-blue-600 mb-10">
        {courseName}
      </h4>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-gray-500">Date of Issue</p>
          <p className="text-lg font-medium text-gray-800">{date}</p>
          <p className="text-sm text-gray-500 mt-4">Certificate ID</p>
          <p className="text-lg font-mono text-gray-800">{id}</p>
        </div>
        <QRCodeDisplay value={`https://Gola Internet Point.com/verify/certificate/${id}`} />
      </div>
    </div>
  );
};

// This file does NOT have a default export, on purpose.