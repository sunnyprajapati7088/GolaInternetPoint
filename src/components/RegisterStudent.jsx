import React, { useState } from "react";
import axios from 'axios';

const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  EMPLOYEE: "employee",
  STUDENT: "student",
};

const CreateUser = () => {
  const [form, setForm] = useState({
    registrationId: "",
    app_id: "",
    name: "",
    mobileNo: "",
    email: "",
    password: "",
    role: ROLES.STUDENT,

    studentProfile: {
      fatherName: "",
      motherName: "",
      gender: "",
      dateOfBirth: "",
      admissionYear: "",
      nationality: "Indian",
      category: "",
      religion: "",
      maritalStatus: "Unmarried",
      qualification: "",
      address: "",
      state: "",
      district: "",
      pincode: "",
    },

    employeeProfile: {
      department: "",
      designation: "",
      joiningDate: "",
      salary: "",
      qualification: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);

  // On mount, load app_id from localStorage
  React.useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth') || 'null');
      if (auth && auth.app_id) {
        setForm(prev => ({ ...prev, app_id: String(auth.app_id) }));
      }
    } catch (err) {
      // ignore
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile field changes (student or employee)
  const handleProfileChange = (profileType, e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [profileType]: {
        ...prev[profileType],
        [name]: value,
      },
    }));
  };

  // submit the form to register endpoint
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build payload
    const payload = {
      // registrationId may be generated server-side; we'll create one if not provided
      ...(form.registrationId && { registrationId: form.registrationId }),
      app_id: form.app_id ? Number(form.app_id) : 0, // Use from localStorage (auto-filled)
      name: form.name,
      mobileNo: form.mobileNo,
      email: form.email,
      password: form.password,
      role: form.role,
      ...(form.role === ROLES.STUDENT && { studentProfile: form.studentProfile }),
      ...(form.role === ROLES.EMPLOYEE && { employeeProfile: form.employeeProfile }),
    };

    // Read auth/user from localStorage and attach `user` if available
    try {
      const stored = JSON.parse(localStorage.getItem('auth') || localStorage.getItem('user') || 'null');
      if (stored && stored.userId) payload.user = stored.userId;
      else if (stored && stored.user) payload.user = stored.user;
    } catch (err) {
      // ignore parse errors
    }

    // If registrationId not provided, generate: GICT + last 3 digits of phone + 3 random digits
    if (!payload.registrationId) {
      const phone = (payload.mobileNo || '') + '';
      const last3 = phone.slice(-3).padStart(3, '0');
      const rand3 = Math.floor(100 + Math.random() * 900).toString();
      payload.registrationId = `GICT${last3}${rand3}`;
    }

    setSubmitting(true);
    // Build headers with Bearer token from localStorage
    const headers = {};
    try {
      const stored = JSON.parse(localStorage.getItem('auth') || 'null');
      if (stored && stored.token) {
        headers['Authorization'] = `Bearer ${stored.token}`;
      }
    } catch (err) {
      // ignore
    }

    axios.post('http://localhost:5000/api/auth/register', payload, { headers })
      .then((res) => {
        console.log('Register response', res.data);
        alert('User created successfully');
        // Optionally save created user to localStorage under 'user'
        try {
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) {}

        // Reset form (keep role default)
        setForm({
          registrationId: '',
          app_id: '',
          name: '',
          mobileNo: '',
          email: '',
          password: '',
          role: ROLES.STUDENT,
          studentProfile: {
            fatherName: '',
            motherName: '',
            gender: '',
            dateOfBirth: '',
            admissionYear: '',
            nationality: 'Indian',
            category: '',
            religion: '',
            maritalStatus: 'Unmarried',
            qualification: '',
            address: '',
            state: '',
            district: '',
            pincode: '',
          },
          employeeProfile: {
            department: '',
            designation: '',
            joiningDate: '',
            salary: '',
            qualification: '',
          },
        });
      })
      .catch((err) => {
        console.error('Register error', err?.response || err.message || err);
        const msg = err?.response?.data?.message || 'Failed to create user';
        alert(msg);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 text-center">
          Create User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Core Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* <input name="registrationId" placeholder="Registration ID (optional)" onChange={handleChange} className="input" />
            <input name="app_id" placeholder="App ID" onChange={handleChange} className="input" /> */}
            <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
            <input name="mobileNo" placeholder="Mobile Number" onChange={handleChange} className="input" />
            <input name="email" placeholder="Email" onChange={handleChange} className="input" />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" />
          </div>

          {/* Role */}
          <select name="role" value={form.role} onChange={handleChange} className="input">
            {Object.values(ROLES).map((r) => (
              <option key={r} value={r}>{r.toUpperCase()}</option>
            ))}
          </select>

          {/* Student Profile */}
          {form.role === ROLES.STUDENT && (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-indigo-600 mb-3">Student Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="fatherName" placeholder="Father Name" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="motherName" placeholder="Mother Name" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <select name="gender" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input">
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input type="date" name="dateOfBirth" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="admissionYear" placeholder="Admission Year (2025-26)" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="qualification" placeholder="Qualification" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="category" placeholder="Category" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="religion" placeholder="Religion" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="address" placeholder="Address" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="state" placeholder="State" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="district" placeholder="District" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
                <input name="pincode" placeholder="Pincode" onChange={(e)=>handleProfileChange("studentProfile", e)} className="input" />
              </div>
            </div>
          )}

          {/* Employee Profile */}
          {form.role === ROLES.EMPLOYEE && (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-indigo-600 mb-3">Employee Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="department" placeholder="Department" onChange={(e)=>handleProfileChange("employeeProfile", e)} className="input" />
                <input name="designation" placeholder="Designation" onChange={(e)=>handleProfileChange("employeeProfile", e)} className="input" />
                <input type="date" name="joiningDate" onChange={(e)=>handleProfileChange("employeeProfile", e)} className="input" />
                <input name="salary" placeholder="Salary" onChange={(e)=>handleProfileChange("employeeProfile", e)} className="input" />
                <input name="qualification" placeholder="Qualification" onChange={(e)=>handleProfileChange("employeeProfile", e)} className="input" />
              </div>
            </div>
          )}

          <button disabled={submitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold">
            {submitting ? 'Creating…' : 'Create User'}
          </button>

        </form>
      </div>

      {/* Tailwind Input Utility */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
          }
        `}
      </style>
    </section>
  );
};

export default CreateUser;
