import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Get token from localStorage for Authorization header
        const auth = JSON.parse(localStorage.getItem('auth') || 'null');
        const headers = {};
        if (auth && auth.token) {
          headers['Authorization'] = `Bearer ${auth.token}`;
        }

        const res = await axios.get('http://localhost:5000/api/users', { headers });
        setStudents(res.data.data || res.data || []);
      } catch (err) {
        console.error('Failed to fetch users', err);
        alert('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handlers for edit/delete actions
  const handleEdit = async (student) => {
    try {
      const newName = window.prompt('Student name:', student.name);
      if (newName === null) return; // cancelled
      
      const updatePayload = { ...student, name: newName };
      
      // Get token from localStorage
      const auth = JSON.parse(localStorage.getItem('auth') || 'null');
      const headers = {};
      if (auth && auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`;
      }

      // PUT to update endpoint (e.g., /api/users/:id)
      await axios.put(`http://localhost:5000/api/users/${student._id || student.id}`, updatePayload, { headers });
      
      // Refresh the list
      const res = await axios.get('http://localhost:5000/api/users', { headers });
      setStudents(res.data.data || res.data || []);
      alert('Student updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update student');
    }
  };

  const handleDelete = async (student) => {
    const ok = window.confirm(`Delete ${student.name}? This cannot be undone.`);
    if (!ok) return;
    try {
      // Get token from localStorage
      const auth = JSON.parse(localStorage.getItem('auth') || 'null');
      const headers = {};
      if (auth && auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`;
      }

      // DELETE endpoint
      await axios.delete(`http://localhost:5000/api/users/${student._id || student.id}`, { headers });
      
      // Refresh the list
      const res = await axios.get('http://localhost:5000/api/users', { headers });
      setStudents(res.data.data || res.data || []);
      alert('Student deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to delete student');
    }
  };

  if (loading) {
    return <div>Loading Student Data...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Manage All Students</h1>
                <Link to="/admin/add-student" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">create student</Link>

        {/* The "Add" button is on the franchise page, but admin could have one too */}
      </div>
      <div className="p-6">
        {/* This list is now dynamic! If you use the "Add Student" form,
          new students will appear here until you refresh the page.
        */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student._id || student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{student.registrationId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.mobileNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button onClick={() => handleEdit(student)} className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button onClick={() => handleDelete(student)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManageStudents;