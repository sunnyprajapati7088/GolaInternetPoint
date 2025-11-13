import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const FranchiseAddStudent = () => {
  const { courses, addStudent } = useData();
  const { user } = useAuth(); // To get franchise center info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseId: courses.length > 0 ? courses[0].id : '',
    totalFee: '',
    feePaid: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Find the selected course name
    const selectedCourse = courses.find(c => c.id.toString() === formData.courseId);

    // 2. Create the payload
    const payload = {
      id: `S${Math.floor(1000 + Math.random() * 9000)}`, // Dummy ID
      name: formData.name,
      email: formData.email,
      course: selectedCourse ? selectedCourse.title : 'Unknown Course',
      franchise: user.center, // From logged-in user!
      // ...add fee info if your student object needs it
    };

    try {
      // 3. Call the "API" (which adds to our DataContext)
      await addStudent(payload);
      
      alert(`Student "${payload.name}" added successfully!`);
      // 4. Clear the form
      setFormData({
        name: '', email: '', courseId: courses[0].id, totalFee: '', feePaid: '',
      });
    } catch (err) {
      alert("Error adding student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Your original JSX form ---
  // Just make sure to link `value` and `onChange` for each input
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Enroll New Student</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm"
        />
        {/* ... other inputs for email, etc. ... */}
        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm"
        >
          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        {/* ... other inputs ... */}
        <div className="text-right">
          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? 'Enrolling...' : 'Enroll Student'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default FranchiseAddStudent;