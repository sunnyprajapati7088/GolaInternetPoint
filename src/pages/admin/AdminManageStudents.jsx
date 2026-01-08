import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = "http://localhost:5000/api";

// CSS for animations
const styles = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
`;

const AdminManageStudents = () => {
  // States for students and enrollments
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form states for enrollment
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [otherCharge, setOtherCharge] = useState(0);
  const [admissionDate, setAdmissionDate] = useState("");
  const [enquirySource, setEnquirySource] = useState("");

  // Edit modal states
  const [showEditEnrollmentModal, setShowEditEnrollmentModal] = useState(false);
  const [editEnrollmentData, setEditEnrollmentData] = useState({
    _id: "",
    studentId: "",
    courseId: "",
    discount: 0,
    paymentMode: 0,
    paymentStatus: 0,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Marksheet modal states
  const [showMarksheetModal, setShowMarksheetModal] = useState(false);
  const [marksheetEnrollment, setMarksheetEnrollment] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subjectMarks, setSubjectMarks] = useState({});

  /* ================= HELPERS ================= */
  const getHeaders = () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    return auth?.token ? { Authorization: `Bearer ${auth.token}` } : {};
  };

  const getAuthData = () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    return {
      createdBy: auth?.userId || auth?.user || null,
      app_id: auth?.app_id || 0,
    };
  };

  const notify = (msg, type = "info") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 4000);
  };

  // Calculate net fees
  const calculateNetFee = (courseId) => {
    const course = courses.find(c => c._id === courseId);
    if (!course) return 0;
    const purchasePrice = course.fee || 0;
    const discountAmount = (discount / 100) * purchasePrice;
    return purchasePrice - discountAmount + Number(otherCharge || 0);
  };

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const headers = getHeaders();

        // Fetch students, courses, categories, enrollments in parallel
        const [studentsRes, coursesRes, enrollmentsRes] = await Promise.all([
          axios.get(`${API}/users`, { headers }),
          axios.get(`${API}/courses/listCourses`, { headers }),
          axios.get(`${API}/enrollments`, { headers }).catch(() => ({ data: { data: [] } })),
        ]);

        setStudents(studentsRes.data.data || []);
        setCourses(coursesRes.data.data || []);
        setEnrollments(enrollmentsRes.data.data || []);

        // Fetch subjects
        const subjRes = await axios.get(`${API}/subjects/listSubjects`, { headers }).catch(() => ({ data: { data: [] } }));
        setSubjects(subjRes.data.data || []);

        // Extract unique categories from courses
        const uniqueCategories = Array.from(
          new Map(
            (coursesRes.data.data || [])
              .filter(c => c.programId?.name)
              .map(c => [c.programId._id, c.programId])
          ).values()
        );
        setCategories(uniqueCategories);
      } catch (err) {
        notify("Failed to load data", "error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  /* ================= CREATE ENROLLMENT ================= */
  const handleCreateEnrollment = async () => {
    if (!selectedStudent || !selectedCourse) {
      notify("Please select student and course", "error");
      return;
    }

    try {
      setLoading(true);
      const course = courses.find(c => c._id === selectedCourse);
      const purchasePrice = course?.fee || 0;
      const discountAmount = (discount / 100) * purchasePrice;
      const totalPrice = purchasePrice - discountAmount + Number(otherCharge || 0);

      const payload = {
        studentId: selectedStudent,
        courseId: selectedCourse,
        purchasePrice,
        discount: discountAmount,
        totalPrice,
        otherCharge: Number(otherCharge || 0),
        admissionDate: admissionDate || null,
        // enquirySource: enquirySource || "",
        paymentMode,
        paymentStatus,
        ...getAuthData(),
      };

      await axios.post(`${API}/enrollments`, payload, { headers: getHeaders() });
      notify("Enrollment created successfully", "success");

      // Reset form and refresh enrollments
      setSelectedStudent("");
      setSelectedCategory("");
      setSelectedCourse("");
      setDiscount(0);
      setOtherCharge(0);
      setAdmissionDate("");
      setEnquirySource("");
      setPaymentMode(0);
      setPaymentStatus(0);

      const res = await axios.get(`${API}/enrollments`, { headers: getHeaders() });
      setEnrollments(res.data.data || []);
    } catch (err) {
      notify("Failed to create enrollment", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ENROLLMENT ================= */
  const openEditEnrollmentModal = (enrollment) => {
    setEditEnrollmentData({
      _id: enrollment._id,
      studentId: enrollment.studentId?._id || enrollment.studentId,
      courseId: enrollment.courseId?._id || enrollment.courseId,
      discount: enrollment.discount || 0,
      paymentMode: enrollment.paymentMode || 0,
      paymentStatus: enrollment.paymentStatus || 0,
    });
    setShowEditEnrollmentModal(true);
  };

  const submitEditEnrollment = async () => {
    try {
      setLoading(true);
      const course = courses.find(c => c._id === editEnrollmentData.courseId);
      const purchasePrice = course?.fee || 0;
      const totalPrice = purchasePrice - editEnrollmentData.discount;

      await axios.put(
        `${API}/enrollments/updateEnrollment/${editEnrollmentData._id}`,
        {
          discount: editEnrollmentData.discount,
          totalPrice,
          paymentMode: editEnrollmentData.paymentMode,
          paymentStatus: editEnrollmentData.paymentStatus,
          ...getAuthData(),
        },
        { headers: getHeaders() }
      );

      notify("Enrollment updated successfully", "success");
      setShowEditEnrollmentModal(false);

      const res = await axios.get(`${API}/enrollments`, { headers: getHeaders() });
      setEnrollments(res.data.data || []);
    } catch (err) {
      notify("Failed to update enrollment", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ENROLLMENT ================= */
  const handleDeleteEnrollment = async (enrollmentId) => {
    if (!window.confirm("Delete this enrollment?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API}/enrollments/deleteEnrollment/${enrollmentId}`, {
        headers: getHeaders(),
      });

      notify("Enrollment deleted successfully", "success");

      const res = await axios.get(`${API}/enrollments/listEnrollments`, { headers: getHeaders() });
      setEnrollments(res.data.data || []);
    } catch (err) {
      notify("Failed to delete enrollment", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE STUDENT ================= */
  const handleDeleteStudent = async (student) => {
    if (!window.confirm(`Delete ${student.name}? This cannot be undone.`)) return;

    try {
      setLoading(true);
      await axios.delete(`${API}/users/${student._id}`, { headers: getHeaders() });

      notify("Student deleted successfully", "success");

      const res = await axios.get(`${API}/users`, { headers: getHeaders() });
      setStudents(res.data.data || []);
    } catch (err) {
      notify("Failed to delete student", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= MARKSHEET FUNCTIONS ================= */
  const openMarksheetModal = (enrollment) => {
    setMarksheetEnrollment(enrollment);
    setSubjectMarks({});
    setShowMarksheetModal(true);
  };

  const handleSubmitMarksheet = async () => {
    if (!marksheetEnrollment) return;

    try {
      setLoading(true);
      const studentId = marksheetEnrollment.studentId?._id || marksheetEnrollment.studentId;
      const courseId = marksheetEnrollment.courseId?._id || marksheetEnrollment.courseId;
      const enrollmentId = marksheetEnrollment._id;

      let totalMaxMarks = 0;
      let totalObtainedMarks = 0;

      // Build subject marks array and calculate totals
      const marksData = Object.entries(subjectMarks).map(([subjectId, marks]) => {
        const obMarks = Number(marks) || 0;
        const maxMarks = 100; // As per UI input
        totalMaxMarks += maxMarks;
        totalObtainedMarks += obMarks;

        return {
          subjectId,
          marksObtained: obMarks,
          maxMarks: maxMarks
        };
      });

      if (marksData.length === 0) {
        notify("Please enter marks for at least one subject", "error");
        setLoading(false);
        return;
      }

      // Calculate Grade
      const percentage = (totalObtainedMarks / totalMaxMarks) * 100;
      let grade = 'F';
      if (percentage >= 80) grade = 'A+';
      else if (percentage >= 70) grade = 'A';
      else if (percentage >= 60) grade = 'B';
      else if (percentage >= 50) grade = 'C';
      else if (percentage >= 33) grade = 'D';

      const payload = {
        studentId,
        courseId,
        enrollmentId,
        subjectMarks: marksData,
        totalMarks: totalMaxMarks,
        totalObtained: totalObtainedMarks,
        grade,
        ...getAuthData(),
      };

      console.log("Marksheet payload:", payload);

      await axios.post(`http://localhost:5000/api/marksheets/createMarksheet`, payload, { headers: getHeaders() });

      notify("Marksheet submitted successfully", "success");
      setShowMarksheetModal(false);
      setMarksheetEnrollment(null);
      setSubjectMarks({});
    } catch (err) {
      notify(err.response?.data?.message || "Failed to submit marksheet", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner />
          <p className="text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <style>{styles}</style>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold">GolaInternetPoint</h1>
          <p className="text-indigo-100 text-sm sm:text-base mt-1">Student & Enrollment Management</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">

        {/* Toast Notification */}
        {message && (
          <div className={`fixed top-4 right-4 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-xl flex items-center gap-3 animate-slide-in ${message.type === "success" ? "bg-green-500" :
              message.type === "error" ? "bg-red-500" : "bg-blue-500"
            } text-white text-sm sm:text-base max-w-xs sm:max-w-sm`}>
            <span className="text-lg">{
              message.type === "success" ? "✅" :
                message.type === "error" ? "❌" : "ℹ️"
            }</span>
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* STUDENTS SECTION */}
        <Section title="👥 All Students" subtitle="Manage student registrations" icon="🎓">
          <div className="flex gap-2 mb-4">
            <Link to="/admin/add-student" className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-2.5 rounded-lg font-medium transition transform hover:scale-105 active:scale-95">
              + Add Student
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Registration ID</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase hidden sm:table-cell">Email</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase hidden md:table-cell">Mobile</th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No students found</td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 font-mono">{student.registrationId}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{student.email}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{student.mobileNo}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm font-medium text-right space-x-2">
                        <button onClick={() => { setSelectedStudent(student._id); notify('Selected student for enrollment', 'info'); }} className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition text-xs sm:text-sm">
                          Enroll
                        </button>
                        <button onClick={() => handleDeleteStudent(student)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs sm:text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ENROLLMENT SECTION */}
        <Section title="📝 Manage Enrollments" subtitle="Link students to courses with pricing" icon="💼">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
              <Select value={selectedStudent} onChange={setSelectedStudent} options={students.map(s => ({ _id: s._id, name: `${s.name} (${s.registrationId})` }))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
              <Select value={selectedCategory} onChange={setSelectedCategory} options={categories} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <Select value={selectedCourse} onChange={setSelectedCourse} options={selectedCategory ? courses.filter(c => c.programId?._id === selectedCategory) : courses} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <Input value={String(discount)} onChange={setDiscount} placeholder="Discount % (e.g. 10)" type="number" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Charge (₹)</label>
              <Input value={String(otherCharge)} onChange={setOtherCharge} placeholder="Other Charge (₹)" type="number" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Admission</label>
              <Input value={admissionDate} onChange={setAdmissionDate} placeholder="Date of Admission" type="date" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Source</label>
              <Select value={enquirySource} onChange={setEnquirySource} options={[
                { _id: 'walkin', name: 'Walk-in' },
                { _id: 'referral', name: 'Referral' },
                { _id: 'online', name: 'Online' },
                { _id: 'other', name: 'Other' },
              ]} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
              <Select value={String(paymentMode)} onChange={(v) => setPaymentMode(Number(v))} options={[
                { _id: 0, name: "Offline" },
                { _id: 1, name: "Online" },
              ]} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <Select value={String(paymentStatus)} onChange={(v) => setPaymentStatus(Number(v))} options={[
                { _id: 0, name: "Pending" },
                { _id: 1, name: "Completed" },
                { _id: 2, name: "Failed" },
              ]} />
            </div>
          </div>

          {selectedCourse && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-blue-600 font-medium">Purchase Price</div>
                  <div className="text-xl font-bold text-blue-900">₹{courses.find(c => c._id === selectedCourse)?.fee || 0}</div>
                </div>
                <div>
                  <div className="text-blue-600 font-medium">Discount ({discount}%)</div>
                  <div className="text-xl font-bold text-blue-900">₹{((discount / 100) * (courses.find(c => c._id === selectedCourse)?.fee || 0)).toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-blue-600 font-medium">Net Fee</div>
                  <div className="text-xl font-bold text-green-700">₹{calculateNetFee(selectedCourse).toFixed(0)}</div>
                </div>
              </div>
            </div>
          )}

          <ActionButton onClick={handleCreateEnrollment} loading={loading} label="+ Create Enrollment" />

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Enrollment List</h3>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Reg. ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Course</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Discount</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Other</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrollments.length === 0 ? (
                    <tr><td colSpan="9" className="px-6 py-8 text-center text-gray-500">No enrollments yet</td></tr>
                  ) : (
                    enrollments.map((enrollment) => {
                      const student = students.find(s => s._id === (enrollment.studentId?._id || enrollment.studentId));
                      const course = courses.find(c => c._id === (enrollment.courseId?._id || enrollment.courseId));
                      return (
                        <tr key={enrollment._id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 text-sm text-gray-900">{student?.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 font-mono">{student?.registrationId}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{course?.name}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700">₹{enrollment.purchasePrice}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700">₹{enrollment.discount}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700">₹{enrollment.otherCharge || 0}</td>
                          <td className="px-4 py-3 text-sm text-right font-bold text-green-700">₹{enrollment.totalPrice}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${enrollment.paymentStatus === 1 ? 'bg-green-100 text-green-800' : enrollment.paymentStatus === 2 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {enrollment.paymentStatus === 1 ? 'Paid' : enrollment.paymentStatus === 2 ? 'Failed' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium space-x-2">
                            <button onClick={() => openMarksheetModal(enrollment)} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">Marksheet</button>
                            <button onClick={() => openEditEnrollmentModal(enrollment)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Edit</button>
                            <button onClick={() => handleDeleteEnrollment(enrollment._id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Delete</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* EDIT ENROLLMENT MODAL */}
        {showEditEnrollmentModal && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="absolute inset-0 bg-black opacity-50 z-10" onClick={() => setShowEditEnrollmentModal(false)} />
            <div className="bg-white rounded-xl p-6 relative z-20 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Edit Enrollment</h3>
              <div className="space-y-3">
                <Input value={String(editEnrollmentData.discount)} onChange={(v) => setEditEnrollmentData({ ...editEnrollmentData, discount: Number(v) })} placeholder="Discount Amount" type="number" />
                <Select value={String(editEnrollmentData.paymentMode)} onChange={(v) => setEditEnrollmentData({ ...editEnrollmentData, paymentMode: Number(v) })} options={[
                  { _id: 0, name: "Offline" },
                  { _id: 1, name: "Online" },
                ]} />
                <Select value={String(editEnrollmentData.paymentStatus)} onChange={(v) => setEditEnrollmentData({ ...editEnrollmentData, paymentStatus: Number(v) })} options={[
                  { _id: 0, name: "Pending" },
                  { _id: 1, name: "Completed" },
                  { _id: 2, name: "Failed" },
                ]} />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition" onClick={() => setShowEditEnrollmentModal(false)}>Cancel</button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2" onClick={submitEditEnrollment} disabled={loading}>
                  {loading && <Spinner />}
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MARKSHEET MODAL */}
        {showMarksheetModal && (
          <MarksheetModal
            enrollment={marksheetEnrollment}
            subjects={subjects}
            subjectMarks={subjectMarks}
            setSubjectMarks={setSubjectMarks}
            onSubmit={handleSubmitMarksheet}
            onClose={() => setShowMarksheetModal(false)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

/* ================= UI HELPERS ================= */

const Spinner = () => (
  <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const Section = ({ title, subtitle, icon, children }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 sm:p-6 space-y-4">
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
    </div>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{children}</div>
);

const Input = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Select = ({ value, onChange, options }) => (
  <select
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Select</option>
    {options.map((o) => (
      <option key={o._id} value={o._id}>{o.name}</option>
    ))}
  </select>
);

const ActionButton = ({ onClick, loading, label }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 text-white px-6 py-2.5 sm:py-3 rounded-lg font-medium transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
  >
    {loading && <Spinner />}
    {label}
  </button>
);

// MARKSHEET MODAL
const MarksheetModal = ({ enrollment, subjects, subjectMarks, setSubjectMarks, onSubmit, onClose, loading }) => {
  if (!enrollment) return null;

  const student = enrollment.studentId || {};
  const course = enrollment.courseId || {};
  const courseId = typeof course === 'string' ? course : course._id;

  // Filter subjects for this course
  const enrollmentSubjects = subjects.filter((s) => {
    if (!s.courseId) return false;
    const sCourseId = typeof s.courseId === 'string' ? s.courseId : s.courseId._id;
    return sCourseId === courseId;
  });

  console.log("Course ID:", courseId);
  console.log("All subjects:", subjects, student);
  console.log("Filtered subjects:", enrollmentSubjects);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 bg-black opacity-50 z-10" onClick={onClose} />
      <div className="bg-white rounded-xl p-6 relative z-20 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6">📝 Student Marksheet</h3>

        {/* Student & Course Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-medium">Student</p>
              <p className="text-gray-900 font-semibold">{student?.name || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Registration ID</p>
              <p className="text-gray-900 font-mono">{student?.registrationId || '-'}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-gray-600 font-medium">Course</p>
              <p className="text-gray-900 font-semibold">{course?.name || '-'}</p>
            </div>
          </div>
        </div>

        {/* Subject Marks Input */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Subject Marks (Out of 100)</h4>
          <div className="space-y-3 bg-gray-50 rounded-lg p-4">
            {enrollmentSubjects.length === 0 ? (
              <p className="text-gray-500 text-sm">No subjects assigned to this course</p>
            ) : (
              enrollmentSubjects.map((subject) => (
                <div key={subject._id} className="flex items-center gap-3">
                  <label className="flex-1 text-sm font-medium text-gray-700">{subject.name}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={subjectMarks[subject._id] || ''}
                    onChange={(e) => setSubjectMarks({ ...subjectMarks, [subject._id]: e.target.value })}
                    placeholder="0-100"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-gray-500 text-sm w-8">/ 100</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading && <Spinner />}
            Submit Marksheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminManageStudents;