import React, { useState } from "react";
import axios from 'axios';
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { API } from '../config';

const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  EMPLOYEE: "employee",
  STUDENT: "student",
};

const CLOUDINARY_CLOUD_NAME = 'dgud4y1lt'; // Verify this is correct
const CLOUDINARY_UPLOAD_PRESET = 'ssrct163'; // Verify this exists in your Cloudinary account

const CreateUser = () => {
  const [form, setForm] = useState({
    registrationId: "",
    app_id: "",
    name: "",
    mobileNo: "",
    email: "",
    password: "",
    role: ROLES.STUDENT,
    profileImage: "",

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
  const [uploadProgress, setUploadProgress] = useState({});

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

  const optimizeImage = (file, maxSizeMB = 1) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Resize logic (maintain aspect ratio)
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1600;

        if (width > height && width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        } else if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Compression loop
        let quality = 0.9;
        const compress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject("Compression failed");

              if (blob.size / 1024 / 1024 <= maxSizeMB || quality <= 0.5) {
                resolve(
                  new File([blob], file.name, { type: "image/jpeg" })
                );
              } else {
                quality -= 0.1;
                compress();
              }
            },
            "image/jpeg",
            quality
          );
        };

        compress();
      };

      img.onerror = reject;
    });
  };

  const uploadImageToCloudinary = async (file, fieldName) => {
    try {
      // ❌ Only images
      if (!file.type.startsWith("image/")) {
        alert("Only image files allowed");
        return;
      }

      setUploadProgress((prev) => ({ ...prev, [fieldName]: true }));

      // 🔹 Always compress image before uploading
      let compressedFile = file;
      try {
        compressedFile = await optimizeImage(file, 0.8); // Compress to max 0.8MB
      } catch (compressError) {
        console.warn("Image compression failed, uploading original:", compressError);
        // Fallback to original file if compression fails
        compressedFile = file;
      }

      const uploadData = new FormData();
      uploadData.append("file", compressedFile);
      uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Cloudinary error response:", errText);
        throw new Error(errText || "Upload failed");
      }

      const data = await response.json();
      setUploadProgress((prev) => ({ ...prev, [fieldName]: false }));

      return data.secure_url;
    } catch (error) {
      setUploadProgress((prev) => ({ ...prev, [fieldName]: false }));

      console.error("Upload error:", error);
      alert("Image upload failed. Please try again.");
      throw error;
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      if (files && files[0]) {
        try {
          const url = await uploadImageToCloudinary(files[0], name);
          if (url) {
            setForm(prev => ({ ...prev, [name]: url }));
          }
        } catch (error) {
          // Error already handled in upload function
        }
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
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

  // 🔹 PDF Generation Function
  const generateRegistrationPDF = async (data) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const themeColor = [41, 128, 185]; // A formal Blue
      const lightGray = [240, 240, 240];
      const darkText = [44, 62, 80];

      // Helper for clean data
      const safeValue = (v) =>
        v === undefined || v === null || String(v).trim() === ""
          ? "N/A"
          : String(v);

      const formattedDate = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      // 1️⃣ Border Frame (Double Line for classical look)
      doc.setDrawColor(...themeColor);
      doc.setLineWidth(1);
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.rect(7, 7, pageWidth - 14, pageHeight - 14);

      // 2️⃣ Header Section
      // Logo
      const logoUrl = "https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768646881/logoInternetPoint_ljrgb9.png";
      if (logoUrl) {
        try {
          const img = new Image();
          img.src = logoUrl;
          img.crossOrigin = "Anonymous";
          await new Promise((res) => { img.onload = res; img.onerror = res; });
          doc.addImage(img, "PNG", 15, 12, 22, 22);
        } catch (e) { /* ignore */ }
      }

      // Title Centered
      doc.setTextColor(...themeColor);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("GOLA INTERNET POINT", pageWidth / 2, 20, { align: "center" });

      doc.setTextColor(100);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Computer Education & Skills Development", pageWidth / 2, 26, { align: "center" });

      // Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 38, pageWidth - 15, 38);

      // Sub-Title
      doc.setFontSize(14);
      doc.setTextColor(...darkText);
      doc.setFont("helvetica", "bold");
      doc.text("REGISTRATION SLIP", pageWidth / 2, 48, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(120);
      doc.text(`Date: ${formattedDate}`, pageWidth / 2, 54, { align: "center" });


      // 3️⃣ User Photo (Top Right of Info) & QR Code
      let photoY = 65;
      const photoSize = [35, 45];

      // QR Code (Absolute Top Right Corner relative to header)
      const regId = safeValue(data.registrationId);
      if (regId !== "N/A") {
        const qrURL = `https://gola-internet-point.vercel.app/verify/${regId}`;
        try {
          const qrBase64 = await QRCode.toDataURL(qrURL, { width: 100, margin: 0, color: { dark: "#2C3E50", light: "#FFF" } });
          doc.addImage(qrBase64, "PNG", pageWidth - 35, 12, 22, 22);
        } catch (e) { }
      }

      // Profile Photo
      if (data.profileImage) {
        try {
          const pImg = new Image();
          pImg.src = data.profileImage;
          pImg.crossOrigin = "Anonymous";
          await new Promise((res) => { pImg.onload = res; pImg.onerror = res; });
          doc.addImage(pImg, "JPEG", pageWidth - 20 - photoSize[0], photoY, photoSize[0], photoSize[1]);

          // Photo Border
          doc.setDrawColor(200);
          doc.rect(pageWidth - 20 - photoSize[0], photoY, photoSize[0], photoSize[1]);
        } catch (e) { }
      } else {
        // Placeholder Box if no image
        doc.setDrawColor(200);
        doc.setFillColor(245, 245, 245);
        doc.rect(pageWidth - 20 - photoSize[0], photoY, photoSize[0], photoSize[1], 'FD');
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text("No Photo", pageWidth - 20 - (photoSize[0] / 2), photoY + (photoSize[1] / 2), { align: "center" });
      }

      // 4️⃣ Data Table (Left aligned, structured)
      let y = 65;
      const leftColX = 20;
      const valueColX = 70;
      const rowHeight = 9;

      const drawSectionTitle = (title) => {
        y += 4;
        doc.setFillColor(...lightGray);
        doc.setDrawColor(220);
        doc.rect(15, y, pageWidth - 30 - (data.profileImage ? 0 : 0), 8, 'F'); // Full width background

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...themeColor);
        doc.text(title.toUpperCase(), 20, y + 5.5);
        y += 12;
      };

      const drawRow = (label, value) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(80);
        doc.text(label, leftColX, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(...darkText);

        // Split long text
        const maxValWidth = pageWidth - valueColX - 65; // Leave space for photo on right
        const lines = doc.splitTextToSize(value, maxValWidth);

        doc.text(lines, valueColX, y);
        y += Math.max(rowHeight, lines.length * 5); // Dynamic height
      };

      drawSectionTitle("Candidate Details");

      drawRow("Registration ID", safeValue(data.registrationId));
      drawRow("Full Name", safeValue(data.name));
      const sp = data.studentProfile || {};
      drawRow("Father's Name", safeValue(sp.fatherName));
      drawRow("Mother's Name", safeValue(sp.motherName));
      drawRow("Date of Birth", safeValue(sp.dateOfBirth));
      drawRow("Gender", safeValue(sp.gender));
      drawRow("Mobile No", safeValue(data.mobileNo));
      drawRow("Email ID", safeValue(data.email));

      // Ensure we clear the photo height before next section if widely separated
      if (y < (photoY + photoSize[1] + 10)) {
        y = photoY + photoSize[1] + 15;
      }

      drawSectionTitle("Experience & Address");
      drawRow("Qualification", safeValue(sp.qualification));
      drawRow("Address", `${safeValue(sp.address)}, ${safeValue(sp.district)}`);
      drawRow("State / Pincode", `${safeValue(sp.state)} - ${safeValue(sp.pincode)}`);

      // 5️⃣ Footer
      const footerY = pageHeight - 40;
      doc.setDrawColor(200);
      doc.line(20, footerY, pageWidth - 20, footerY);

      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text("This is a computer generated slip, signature is not required.", pageWidth / 2, footerY + 8, { align: "center" });

      doc.setFontSize(11);
      doc.setTextColor(...themeColor);
      doc.setFont("helvetica", "bold");
      doc.text("Thank you for choosing Gola Internet Point!", pageWidth / 2, footerY + 16, { align: "center" });

      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.setFont("helvetica", "normal");
      doc.text("Visit us at: www.golainternet.com", pageWidth / 2, footerY + 22, { align: "center" });

      // Save
      const fileName = `Registration_${safeValue(data.name).replace(/\s+/g, "_")}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error("PDF Error:", error);
      alert("Failed to generate PDF");
    }
  };

  // submit the form to register endpoint
  const handleSubmit = (e) => {
    e.preventDefault();

    if (uploadProgress.profileImage) {
      alert("Please wait for image upload to complete.");
      return;
    }

    // Build payload
    const payload = {
      // registrationId may be generated server-side; we'll create one if not provided
      ...(form.registrationId && { registrationId: form.registrationId }),
      app_id: form.app_id ? Number(form.app_id) : 0, // Use from localStorage (auto-filled)
      name: form.name,
      mobileNo: form.mobileNo,
      email: form.email,
      password: form.password,
      profileImage: form.profileImage,
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

    axios.post(`${API}/auth/register`, payload, { headers })
      .then((res) => {
        console.log('Register response', res.data);
        alert('User created successfully. Downloading Receipt...');

        // Generate PDF
        const userData = res.data.data || res.data.user || payload; // Fallback to payload if response structure differs
        // Ensure payload details (like profile image url) are merged if not in response
        const completeData = { ...payload, ...userData };
        generateRegistrationPDF(completeData);

        // Optionally save created user to localStorage under 'user'
        try {
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) { }

        // Reset form (keep role default)
        setForm({
          registrationId: '',
          app_id: '',
          name: '',
          mobileNo: '',
          email: '',
          password: '',
          profileImage: '',
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
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="input" />
            <input name="mobileNo" placeholder="Mobile Number" value={form.mobileNo} onChange={handleChange} className="input" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="input" />

            <div className="relative">
              <input type="file" name="profileImage" accept="image/*" onChange={handleChange} className="input" />
              {uploadProgress.profileImage && <p className="text-xs text-blue-600 mt-1">Uploading image...</p>}
              {form.profileImage && !uploadProgress.profileImage && <p className="text-xs text-green-600 mt-1">Image uploaded!</p>}
            </div>

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
                <input name="fatherName" placeholder="Father Name" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="motherName" placeholder="Mother Name" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <select name="gender" onChange={(e) => handleProfileChange("studentProfile", e)} className="input">
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input type="date" name="dateOfBirth" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="admissionYear" placeholder="Admission Year (2025-26)" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="qualification" placeholder="Qualification" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="category" placeholder="Category" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="religion" placeholder="Religion" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="address" placeholder="Address" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="state" placeholder="State" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="district" placeholder="District" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
                <input name="pincode" placeholder="Pincode" onChange={(e) => handleProfileChange("studentProfile", e)} className="input" />
              </div>
            </div>
          )}

          {/* Employee Profile */}
          {form.role === ROLES.EMPLOYEE && (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-indigo-600 mb-3">Employee Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="department" placeholder="Department" onChange={(e) => handleProfileChange("employeeProfile", e)} className="input" />
                <input name="designation" placeholder="Designation" onChange={(e) => handleProfileChange("employeeProfile", e)} className="input" />
                <input type="date" name="joiningDate" onChange={(e) => handleProfileChange("employeeProfile", e)} className="input" />
                <input name="salary" placeholder="Salary" onChange={(e) => handleProfileChange("employeeProfile", e)} className="input" />
                <input name="qualification" placeholder="Qualification" onChange={(e) => handleProfileChange("employeeProfile", e)} className="input" />
              </div>
            </div>
          )}

          <button disabled={submitting || Object.values(uploadProgress).some(p => p)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400">
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
