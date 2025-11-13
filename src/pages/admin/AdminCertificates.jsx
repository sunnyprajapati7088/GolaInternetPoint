import React from 'react';

// This component is mostly static, as verification is handled by the public page.
// In a real app, this would also pull from `useData`
const AdminCertificates = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Issued Certificates</h1>
        <p className="text-gray-600 mb-6">View and verify all certificates issued across all franchises.</p>
        
        {/* Mock Certificate List */}
        <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Amit Sharma</h2>
                    <p className="text-sm text-gray-600">Course: Advanced Web Development</p>
                    <p className="text-sm font-mono text-blue-600">ID: CERT-S1001-AWD</p>
                </div>
                <button 
                  onClick={() => alert('Verification page would open')}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Verify
                </button>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Priya Singh</h2>
                    <p className="text-sm text-gray-600">Course: Data Science with Python</p>
                    <p className="text-sm font-mono text-blue-600">ID: CERT-S1002-DSP</p>
                </div>
                <button 
                  onClick={() => alert('Verification page would open')}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Verify
                </button>
            </div>
        </div>
    </div>
);

export default AdminCertificates;