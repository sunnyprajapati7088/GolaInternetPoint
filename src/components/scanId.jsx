import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { API } from '../config';

function ScanId() {
  const { userIdToFetch } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(userIdToFetch);
    const fetchUserData = async () => {
      try {
        setLoading(true);

        if (!userIdToFetch) {
          setError("User ID not found in URL");
          setLoading(false);
          return;
        }

        // Fetch marksheet data
        const res = await axios.get(`${API}/marksheets/${userIdToFetch}`);
        const data = res.data.data || res.data;

        if (data) {
          navigate('/admin/certificate-card', { state: { marksheet: data } });
        } else {
          setError("No marksheet data found for this ID.");
        }

      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to verify ID or fetch marksheet.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userIdToFetch, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Verifying ID...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mb-4">❌</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Verification Failed</h2>
        <p className="text-red-500 mb-6">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  return null; // Should redirect
}

export default ScanId;
