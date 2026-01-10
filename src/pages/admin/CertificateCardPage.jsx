import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CertificateCard from '../../components/CertificateCard';

const CertificateCardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { marksheet } = location.state || {};

    console.log(marksheet);
    if (!marksheet) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <p className="text-xl mb-4">No marksheet data found.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 pt-1">
            <div className="flex justify-between max-w-4xl mx-auto mb-6 no-print">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 shadow-lg"
                >
                    ← Back
                </button>
                <button
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 shadow-lg font-bold flex items-center gap-2"
                >
                    🖨️ Print Marksheet
                </button>
            </div>

            <div className="print-area">
                <CertificateCard data={marksheet} />
            </div>

            <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { padding: 0; margin: 0; }
          body, html { background: white; }
        }
      `}</style>
        </div>
    );
};

export default CertificateCardPage;
