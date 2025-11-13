import React, { useState } from 'react';
import { ICONS } from '../../components/ICONS';

const VerifyPage = () => {
    const [id, setId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        setLoading(true);
        setResult(null);
        // Simulate API call
        setTimeout(() => {
            if (id === 'CERT-S1001-AWD') {
                setResult({
                    valid: true,
                    studentName: 'Amit Sharma',
                    courseName: 'Advanced Web Development',
                    date: '10/10/2024',
                    id: 'CERT-S1001-AWD'
                });
            } else {
                setResult({ valid: false });
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Verify Certificate</h1>
                <div className="flex space-x-2">
                    <input 
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Enter Certificate ID"
                        className="flex-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
            </div>

            {result && (
                <div className="mt-8">
                    {result.valid ? (
                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <ICONS.badgeCheck className="h-10 w-10 text-green-600 mr-4" />
                                <div>
                                    <h2 className="text-xl font-bold text-green-800">Certificate Verified</h2>
                                    <p className="text-gray-700 mt-2"><strong>Student:</strong> {result.studentName}</p>
                                    <p className="text-gray-700"><strong>Course:</strong> {result.courseName}</p>
                                    <p className="text-gray-700"><strong>Date:</strong> {result.date}</p>
                                    <p className="text-gray-700 font-mono"><strong>ID:</strong> {result.id}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <ICONS.x className="h-10 w-10 text-red-600 mr-4" />
                                <div>
                                    <h2 className="text-xl font-bold text-red-800">Invalid Certificate</h2>
                                    <p className="text-gray-700 mt-2">The certificate ID you entered was not found. Please check the ID and try again.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyPage;