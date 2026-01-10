import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { API } from '../config';

function ScanId() {
  const { userId } = useParams();

  // State for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data from /api/auth/{userId}
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const auth = JSON.parse(localStorage.getItem("auth") || "null");
        const userIdToFetch = userId || auth?.userId;

        if (!userIdToFetch) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        // Fetch from /api/auth/{userId} - no token needed
        const res = await axios.get(`${API}/auth/${userIdToFetch}`);

        // Store data in state
        setUserData(res.data.data || res.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Render based on state
  if (loading) {
    return <div className="p-4"><p className="text-center">Loading...</p></div>;
  }

  if (error) {
    return <div className="p-4"><p className="text-center text-red-600">Error: {error}</p></div>;
  }

  if (!userData) {
    return <div className="p-4"><p className="text-center text-gray-500">No user data found</p></div>;
  }

  // Display user data
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">User Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold">{userData.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Registration ID</p>
            <p className="text-lg font-semibold">{userData.registrationId || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg">{userData.email || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mobile No</p>
            <p className="text-lg">{userData.mobileNo || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg capitalize">{userData.role || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-lg">{userData.status === 1 ? "Active" : "Inactive"}</p>
          </div>
        </div>

        {userData.studentProfile && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-xl font-bold mb-3">Student Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Father's Name</p>
                <p className="text-lg">{userData.studentProfile.fatherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mother's Name</p>
                <p className="text-lg">{userData.studentProfile.motherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-lg">{userData.studentProfile.DOB || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-lg capitalize">{userData.studentProfile.gender || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Qualification</p>
                <p className="text-lg">{userData.studentProfile.qualification || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-lg">{userData.studentProfile.address || "N/A"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScanId;
