import React, { useEffect, useState } from "react";
import axios from "axios";

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
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
`;

const AdminManageCourses = () => {
  /* ================= STATES ================= */
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Program
  const [programName, setProgramName] = useState("");
  const [programImage, setProgramImage] = useState("");

  // Course
  const [selectedProgramForCourse, setSelectedProgramForCourse] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [admissionFee, setAdmissionFee] = useState("");
  const [duration, setDuration] = useState("");

  // Subject
  const [selectedProgramForSubject, setSelectedProgramForSubject] = useState("");
  const [coursesForSubject, setCoursesForSubject] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectMarks, setSubjectMarks] = useState("");

  // View/Display
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  // Edit modals state
  const [showEditProgramModal, setShowEditProgramModal] = useState(false);
  const [editProgramData, setEditProgramData] = useState({ _id: "", name: "", image: "" });

  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [editCourseData, setEditCourseData] = useState({ _id: "", name: "", code: "", fee: 0, admissionFee: 0, duration: "", programId: "" });

  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false);
  const [editSubjectData, setEditSubjectData] = useState({ _id: "", name: "", marks: 0, programId: "", courseId: "" });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("programs");
  const [dashboardProgramFilter, setDashboardProgramFilter] = useState("");
  const [dashboardCourseFilter, setDashboardCourseFilter] = useState("");

  /* ================= HELPERS ================= */
  const getHeaders = () => {
    const auth = JSON.parse(localStorage.getItem("user") || "null");
    return auth?.token ? { Authorization: `Bearer ${auth.token}` } : {};
  };

  const getAuthData = () => {
    const auth = JSON.parse(localStorage.getItem("user") || "null");
    return {
      createdBy: auth?.userId || auth?.user || null,
      app_id: auth?.app_id || 0,
    };
  };

  const notify = (msg, type = "info") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 4000);
  };

  // Helper to get courses for a program
  const getCoursesForProgram = (programId) => {
    return courses.filter((c) => c.programId._id === programId);
  };

  // Helper to get subjects for a course
  const getSubjectsForCourse = (courseId) => {
    return subjects.filter((s) => s.courseId._id === courseId);
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchPrograms();
    fetchCourses();
    fetchSubjects();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await axios.get(`${API}/programs/listPrograms`, {
        headers: getHeaders(),
      });
      setPrograms(res.data.data || []);
    } catch {
      notify("❌ Failed to fetch programs");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses/listCourses`, {
        headers: getHeaders(),
      });
      setCourses(res.data.data || []);
    } catch {
      notify("❌ Failed to fetch courses");
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`${API}/subjects/listSubjects`, {
        headers: getHeaders(),
      });
      setSubjects(res.data.data || []);
    } catch {
      notify("❌ Failed to fetch subjects");
    }
  };

  /* ================= SUBJECT COURSE FILTER ================= */
  useEffect(() => {
    if (selectedProgramForSubject) {
      const filtered = courses.filter(
        (c) => c.programId._id === selectedProgramForSubject
      );
      setCoursesForSubject(filtered);
      setSelectedCourse("");
    } else {
      setCoursesForSubject([]);
      setSelectedCourse("");
    }
  }, [selectedProgramForSubject, courses]);

  /* ================= CREATE ================= */
  const handleCreateProgram = async () => {
    if (!programName.trim()) return notify("Program name required");
    try {
      setLoading(true);
      await axios.post(
        `${API}/programs/createProgram`,
        { name: programName, image: programImage, ...getAuthData() },
        { headers: getHeaders() }
      );
      notify("✅ Program created", "success");
      setProgramName("");
      setProgramImage("");
      fetchPrograms();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    if (!selectedProgramForCourse || !courseCode || !courseName)
      return notify("All course fields required");

    try {
      setLoading(true);
      await axios.post(
        `${API}/courses/createCourse`,
        {
          code: courseCode,
          name: courseName,
          fee: Number(courseFee) || 0,
          admissionFee: Number(admissionFee) || 0,
          duration,
          programId: selectedProgramForCourse,
          ...getAuthData(),
        },
        { headers: getHeaders() }
      );
      notify("✅ Course created");
      setCourseCode("");
      setCourseName("");
      setCourseFee("");
      setAdmissionFee("");
      setDuration("");
      fetchCourses();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async () => {
    if (!selectedProgramForSubject || !selectedCourse || !subjectName)
      return notify("All subject fields required");

    try {
      setLoading(true);
      await axios.post(
        `${API}/subjects/createSubject`,
        {
          name: subjectName,
          marks: Number(subjectMarks) || 0,
          programId: selectedProgramForSubject,
          courseId: selectedCourse,
          ...getAuthData(),
        },
        { headers: getHeaders() }
      );
      notify("✅ Subject created");
      setSubjectName("");
      setSubjectMarks("");
      fetchSubjects();
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT / DELETE HANDLERS ================= */
  const handleEditProgram = async (program) => {
    // Deprecated: use modal-based edit. kept for backward-compat.
    openEditProgramModal(program);
  };

  const handleDeleteProgram = async (programId) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API}/programs/${programId}`, {
        headers: getHeaders(),
      });
      notify("✅ Program deleted");
      fetchPrograms();
      fetchCourses();
      fetchSubjects();
    } catch (err) {
      notify("❌ Failed to delete program");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = async (course) => {
    // Deprecated: open modal instead
    openEditCourseModal(course);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API}/courses/${courseId}`, {
        headers: getHeaders(),
      });
      notify("✅ Course deleted");
      fetchCourses();
      fetchSubjects();
    } catch (err) {
      notify("❌ Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubject = async (subject) => {
    // Deprecated: open modal instead
    openEditSubjectModal(subject);
  };

  const handleDeleteSubject = async (subjectId) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API}/subjects/${subjectId}`, {
        headers: getHeaders(),
      });
      notify("✅ Subject deleted");
      fetchSubjects();
    } catch (err) {
      notify("❌ Failed to delete subject");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OPEN / SUBMIT MODALS ================= */
  const openEditProgramModal = (program) => {
    setEditProgramData({ _id: program._id, name: program.name || "", image: program.image || "" });
    setShowEditProgramModal(true);
  };

  const submitEditProgram = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${API}/programs/${editProgramData._id}`,
        { name: editProgramData.name, image: editProgramData.image, ...getAuthData() },
        { headers: getHeaders() }
      );
      notify("✅ Program updated");
      setShowEditProgramModal(false);
      fetchPrograms();
    } catch (err) {
      notify("❌ Failed to update program");
    } finally {
      setLoading(false);
    }
  };

  const openEditCourseModal = (course) => {
    setEditCourseData({
      _id: course._id,
      name: course.name || "",
      code: course.code || "",
      fee: course.fee || 0,
      admissionFee: course.admissionFee || 0,
      duration: course.duration || "",
      programId: course.programId?._id || course.programId || "",
    });
    setShowEditCourseModal(true);
  };

  const submitEditCourse = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${API}/courses/${editCourseData._id}`,
        {
          name: editCourseData.name,
          code: editCourseData.code,
          fee: Number(editCourseData.fee) || 0,
          admissionFee: Number(editCourseData.admissionFee) || 0,
          duration: editCourseData.duration,
          programId: editCourseData.programId,
          ...getAuthData(),
        },
        { headers: getHeaders() }
      );
      notify("✅ Course updated");
      setShowEditCourseModal(false);
      fetchCourses();
    } catch (err) {
      notify("❌ Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  const openEditSubjectModal = (subject) => {
    setEditSubjectData({
      _id: subject._id,
      name: subject.name || "",
      marks: subject.marks || 0,
      programId: subject.programId?._id || subject.programId || "",
      courseId: subject.courseId?._id || subject.courseId || "",
    });
    setShowEditSubjectModal(true);
  };

  const submitEditSubject = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${API}/subjects/${editSubjectData._id}`,
        {
          name: editSubjectData.name,
          marks: Number(editSubjectData.marks) || 0,
          programId: editSubjectData.programId,
          courseId: editSubjectData.courseId,
          ...getAuthData(),
        },
        { headers: getHeaders() }
      );
      notify("✅ Subject updated");
      setShowEditSubjectModal(false);
      fetchSubjects();
    } catch (err) {
      notify("❌ Failed to update subject");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold">📚 Course Management</h1>
          <p className="text-blue-100 text-sm sm:text-base mt-1">Manage programs, courses, and subjects</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        
        {/* Toast Notification */}
        {message && (
          <div className={`fixed top-4 right-4 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-xl flex items-center gap-3 animate-slide-in ${
            message.type === "success" ? "bg-green-500" : 
            message.type === "error" ? "bg-red-500" : "bg-blue-500"
          } text-white text-sm sm:text-base max-w-xs sm:max-w-sm`}>
            <span className="text-lg">{
              message.type === "success" ? "✅" : 
              message.type === "error" ? "❌" : "ℹ️"
            }</span>
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Tabbar */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab('programs')} className={`px-4 py-2 rounded ${activeTab === 'programs' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Programs</button>
            <button onClick={() => setActiveTab('courses')} className={`px-4 py-2 rounded ${activeTab === 'courses' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Courses</button>
            <button onClick={() => setActiveTab('subjects')} className={`px-4 py-2 rounded ${activeTab === 'subjects' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Subjects</button>
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded ml-auto ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>View Dashboard</button>
          </div>
        </div>

        {/* PROGRAMS SECTION */}
        {activeTab === 'programs' && (
          <Section title="📚 Programs" subtitle="Create and manage academic programs" icon="🎓">
          <Grid>
            <Input value={programName} onChange={setProgramName} placeholder="Program Name *" />
            <Input value={programImage} onChange={setProgramImage} placeholder="Image URL (optional)" />
          </Grid>
          <ActionButton onClick={handleCreateProgram} loading={loading} label="+ Create Program" />
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Program</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.length === 0 ? (
                  <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">No programs yet</td></tr>
                ) : (
                  programs.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{p._id}</td>
                      <td className="px-4 py-3 text-right text-sm space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => handleEditProgram(p)}>Edit</button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => handleDeleteProgram(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </Section>
        )}

        {/* COURSES SECTION */}
        {activeTab === 'courses' && (
          <Section title="📖 Courses" subtitle="Courses under each program" icon="📝">
          <Grid>
            <Select value={selectedProgramForCourse} onChange={setSelectedProgramForCourse} options={programs} />
            <Input value={courseCode} onChange={setCourseCode} placeholder="Course Code *" />
            <Input value={courseName} onChange={setCourseName} placeholder="Course Name *" />
            <Input value={courseFee} onChange={setCourseFee} placeholder="Course Fee" />
            <Input value={admissionFee} onChange={setAdmissionFee} placeholder="Admission Fee" />
            <Input value={duration} onChange={setDuration} placeholder="Duration (e.g. 6 months)" />
          </Grid>
          <ActionButton onClick={handleCreateCourse} loading={loading} label="+ Create Course" />
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Program</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Fee</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Admission</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Duration</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.length === 0 ? (
                  <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No courses yet</td></tr>
                ) : (
                  courses.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{c.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{c.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{c.programId?.name || c.programId}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">₹{c.fee}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">₹{c.admissionFee}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{c.duration}</td>
                      <td className="px-4 py-3 text-right text-sm space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => handleEditCourse(c)}>Edit</button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => handleDeleteCourse(c._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </Section>
        )}

        {/* SUBJECTS SECTION */}
        {activeTab === 'subjects' && (
          <Section title="✏️ Subjects" subtitle="Subjects mapped to courses" icon="📖">
          <Grid>
            <Select value={selectedProgramForSubject} onChange={setSelectedProgramForSubject} options={programs} />
            <Select value={selectedCourse} onChange={setSelectedCourse} options={coursesForSubject} disabled={!selectedProgramForSubject} />
            <Input value={subjectName} onChange={setSubjectName} placeholder="Subject Name *" />
            <Input value={subjectMarks} onChange={setSubjectMarks} placeholder="Marks" />
          </Grid>
          <ActionButton onClick={handleCreateSubject} loading={loading} label="+ Create Subject" />
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Program</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Marks</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No subjects yet</td></tr>
                ) : (
                  subjects.map((s) => (
                    <tr key={s._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{s.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{s.courseId?.name || s.courseId}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{s.programId?.name || s.programId}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">{s.marks}</td>
                      <td className="px-4 py-3 text-right text-sm space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => handleEditSubject(s)}>Edit</button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => handleDeleteSubject(s._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </Section>
        )}

        {/* VIEW DASHBOARD */}
      {activeTab === 'dashboard' && (
        <Section title="🔎 View Dashboard" subtitle="Browse programs, their courses and subjects">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                <Select value={dashboardProgramFilter} onChange={(v) => { setDashboardProgramFilter(v); setDashboardCourseFilter(""); }} options={programs} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <Select
                  value={dashboardCourseFilter}
                  onChange={setDashboardCourseFilter}
                  options={dashboardProgramFilter ? courses.filter((c) => c.programId?._id === dashboardProgramFilter) : courses}
                />
              </div>
            </div>

            <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Program</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Course</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Subject</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Marks</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(() => {
                    const rows = [];
                    const filteredPrograms = programs.filter((p) => !dashboardProgramFilter || p._id === dashboardProgramFilter);
                    if (filteredPrograms.length === 0) {
                      return <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No results</td></tr>;
                    }
                    filteredPrograms.forEach((p) => {
                      const programCourses = dashboardCourseFilter
                        ? courses.filter((c) => c._id === dashboardCourseFilter && (c.programId?._id === p._id || c.programId === p._id))
                        : getCoursesForProgram(p._id);

                      if (programCourses.length === 0) {
                        rows.push(
                          <tr key={`p-${p._id}`} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">-</td>
                            <td className="px-4 py-3 text-sm text-gray-600">-</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-700">-</td>
                            <td className="px-4 py-3 text-right text-sm">
                              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 mr-2" onClick={() => handleEditProgram(p)}>Edit</button>
                              <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => handleDeleteProgram(p._id)}>Delete</button>
                            </td>
                          </tr>
                        );
                      } else {
                        programCourses.forEach((c) => {
                          const subjectsForCourse = getSubjectsForCourse(c._id);
                          if (subjectsForCourse.length === 0) {
                            rows.push(
                              <tr key={`c-${c._id}`} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{c.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">-</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-700">-</td>
                                <td className="px-4 py-3 text-right text-sm">
                                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 mr-2" onClick={() => handleEditCourse(c)}>Edit</button>
                                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => handleDeleteCourse(c._id)}>Delete</button>
                                </td>
                              </tr>
                            );
                          } else {
                            subjectsForCourse.forEach((s) => {
                              rows.push(
                                <tr key={`s-${s._id}`} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                                  <td className="px-4 py-3 text-sm text-gray-700">{c.name}</td>
                                  <td className="px-4 py-3 text-sm text-gray-700">{s.name}</td>
                                  <td className="px-4 py-3 text-sm text-right text-gray-700">{s.marks}</td>
                                  <td className="px-4 py-3 text-right text-sm">
                                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 mr-2" onClick={() => handleEditSubject(s)}>Edit</button>
                                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={() => handleDeleteSubject(s._id)}>Delete</button>
                                  </td>
                                </tr>
                              );
                            });
                          }
                        });
                      }
                    });
                    return rows;
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
      )}
      {/* EDIT MODALS */}
      {showEditProgramModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-10" onClick={() => setShowEditProgramModal(false)} />
          <div className="bg-white rounded-xl p-6 relative z-20 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Edit Program</h3>
            <div className="space-y-3">
              <Input value={editProgramData.name} onChange={(v) => setEditProgramData({ ...editProgramData, name: v })} placeholder="Program Name" />
              <Input value={editProgramData.image} onChange={(v) => setEditProgramData({ ...editProgramData, image: v })} placeholder="Image URL" />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition" onClick={() => setShowEditProgramModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2" onClick={submitEditProgram} disabled={loading}>
                {loading && <Spinner />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditCourseModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-10" onClick={() => setShowEditCourseModal(false)} />
          <div className="bg-white rounded-xl p-6 relative z-20 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Course</h3>
            <div className="space-y-3">
              <Select value={editCourseData.programId} onChange={(v) => setEditCourseData({ ...editCourseData, programId: v })} options={programs} />
              <Input value={editCourseData.code} onChange={(v) => setEditCourseData({ ...editCourseData, code: v })} placeholder="Course Code" />
              <Input value={editCourseData.name} onChange={(v) => setEditCourseData({ ...editCourseData, name: v })} placeholder="Course Name" />
              <Input value={String(editCourseData.fee)} onChange={(v) => setEditCourseData({ ...editCourseData, fee: v })} placeholder="Fee" />
              <Input value={String(editCourseData.admissionFee)} onChange={(v) => setEditCourseData({ ...editCourseData, admissionFee: v })} placeholder="Admission Fee" />
              <Input value={editCourseData.duration} onChange={(v) => setEditCourseData({ ...editCourseData, duration: v })} placeholder="Duration" />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition" onClick={() => setShowEditCourseModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2" onClick={submitEditCourse} disabled={loading}>
                {loading && <Spinner />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditSubjectModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-10" onClick={() => setShowEditSubjectModal(false)} />
          <div className="bg-white rounded-xl p-6 relative z-20 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Edit Subject</h3>
            <div className="space-y-3">
              <Select value={editSubjectData.programId} onChange={(v) => setEditSubjectData({ ...editSubjectData, programId: v })} options={programs} />
              <Select value={editSubjectData.courseId} onChange={(v) => setEditSubjectData({ ...editSubjectData, courseId: v })} options={getCoursesForProgram(editSubjectData.programId || selectedProgramForSubject)} />
              <Input value={editSubjectData.name} onChange={(v) => setEditSubjectData({ ...editSubjectData, name: v })} placeholder="Subject Name" />
              <Input value={String(editSubjectData.marks)} onChange={(v) => setEditSubjectData({ ...editSubjectData, marks: v })} placeholder="Marks" />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition" onClick={() => setShowEditSubjectModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2" onClick={submitEditSubject} disabled={loading}>
                {loading && <Spinner />}
                Save
              </button>
            </div>
          </div>
        </div>
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

const Input = ({ value, onChange, placeholder }) => (
  <input
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Select = ({ value, onChange, options, disabled }) => (
  <select
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">{disabled ? "Select Program First" : "Select"}</option>
    {options.map((o) => (
      <option key={o._id} value={o._id}>{o.name}</option>
    ))}
  </select>
);

const ActionButton = ({ onClick, loading, label }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white px-6 py-2.5 sm:py-3 rounded-lg font-medium transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
  >
    {loading && <Spinner />}
    {label}
  </button>
);

export default AdminManageCourses;
