import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import { API } from '../../config';

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

  // Dashboard Filters
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

  const getCoursesForProgram = (programId) => {
    return courses.filter((c) => c.programId._id === programId || c.programId === programId);
  };

  const getSubjectsForCourse = (courseId) => {
    return subjects.filter((s) => s.courseId._id === courseId || s.courseId === courseId);
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchPrograms();
    fetchCourses();
    fetchSubjects();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await axios.get(`${API}/programs/listPrograms`, { headers: getHeaders() });
      setPrograms(res.data.data || []);
    } catch {
      notify("❌ Failed to fetch programs", "error");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses/listCourses`, { headers: getHeaders() });
      setCourses(res.data.data || []);
    } catch {
      notify("❌ Failed to fetch courses", "error");
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`${API}/subjects/listSubjects`, { headers: getHeaders() });
      setSubjects(res.data.data || []);
    } catch {
      notify("❌ Failed to fetch subjects", "error");
    }
  };

  /* ================= SUBJECT COURSE FILTER ================= */
  useEffect(() => {
    if (selectedProgramForSubject) {
      const filtered = courses.filter((c) => (c.programId._id || c.programId) === selectedProgramForSubject);
      setCoursesForSubject(filtered);
      setSelectedCourse("");
    } else {
      setCoursesForSubject([]);
      setSelectedCourse("");
    }
  }, [selectedProgramForSubject, courses]);

  /* ================= CREATE HANDLERS ================= */
  const handleCreateProgram = async () => {
    if (!programName.trim()) return notify("Program name required", "error");
    try {
      setLoading(true);
      await axios.post(`${API}/programs/createProgram`, { name: programName, image: programImage, ...getAuthData() }, { headers: getHeaders() });
      notify("✅ Program created", "success");
      setProgramName("");
      setProgramImage("");
      fetchPrograms();
    } catch {
      notify("❌ Failed to create program", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    if (!selectedProgramForCourse || !courseCode || !courseName) return notify("All course fields required", "error");
    try {
      setLoading(true);
      await axios.post(`${API}/courses/createCourse`, {
        code: courseCode, name: courseName, fee: Number(courseFee) || 0, admissionFee: Number(admissionFee) || 0,
        duration, programId: selectedProgramForCourse, ...getAuthData(),
      }, { headers: getHeaders() });
      notify("✅ Course created", "success");
      setCourseCode(""); setCourseName(""); setCourseFee(""); setAdmissionFee(""); setDuration("");
      fetchCourses();
    } catch {
      notify("❌ Failed to create course", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async () => {
    if (!selectedProgramForSubject || !selectedCourse || !subjectName) return notify("All subject fields required", "error");
    try {
      setLoading(true);
      await axios.post(`${API}/subjects/createSubject`, {
        name: subjectName, marks: Number(subjectMarks) || 0, programId: selectedProgramForSubject,
        courseId: selectedCourse, ...getAuthData(),
      }, { headers: getHeaders() });
      notify("✅ Subject created", "success");
      setSubjectName(""); setSubjectMarks("");
      fetchSubjects();
    } catch {
      notify("❌ Failed to create subject", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT / DELETE HANDLERS ================= */
  const handleEditProgram = (program) => {
    setEditProgramData({ _id: program._id, name: program.name || "", image: program.image || "" });
    setShowEditProgramModal(true);
  };

  const submitEditProgram = async () => {
    try {
      setLoading(true);
      await axios.patch(`${API}/programs/${editProgramData._id}`, { name: editProgramData.name, image: editProgramData.image, ...getAuthData() }, { headers: getHeaders() });
      notify("✅ Program updated", "success");
      setShowEditProgramModal(false);
      fetchPrograms();
    } catch {
      notify("❌ Failed to update program", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProgram = async (programId) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API}/programs/${programId}`, { headers: getHeaders() });
      notify("✅ Program deleted", "success");
      fetchPrograms(); fetchCourses(); fetchSubjects();
    } catch {
      notify("❌ Failed to delete program", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course) => {
    setEditCourseData({
      _id: course._id, name: course.name || "", code: course.code || "", fee: course.fee || 0,
      admissionFee: course.admissionFee || 0, duration: course.duration || "",
      programId: course.programId?._id || course.programId || "",
    });
    setShowEditCourseModal(true);
  };

  const submitEditCourse = async () => {
    try {
      setLoading(true);
      await axios.patch(`${API}/courses/${editCourseData._id}`, {
        name: editCourseData.name, code: editCourseData.code, fee: Number(editCourseData.fee) || 0,
        admissionFee: Number(editCourseData.admissionFee) || 0, duration: editCourseData.duration,
        programId: editCourseData.programId, ...getAuthData(),
      }, { headers: getHeaders() });
      notify("✅ Course updated", "success");
      setShowEditCourseModal(false);
      fetchCourses();
    } catch {
      notify("❌ Failed to update course", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API}/courses/${courseId}`, { headers: getHeaders() });
      notify("✅ Course deleted", "success");
      fetchCourses(); fetchSubjects();
    } catch {
      notify("❌ Failed to delete course", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubject = (subject) => {
    setEditSubjectData({
      _id: subject._id, name: subject.name || "", marks: subject.marks || 0,
      programId: subject.programId?._id || subject.programId || "",
      courseId: subject.courseId?._id || subject.courseId || "",
    });
    setShowEditSubjectModal(true);
  };

  const submitEditSubject = async () => {
    try {
      setLoading(true);
      await axios.patch(`${API}/subjects/${editSubjectData._id}`, {
        name: editSubjectData.name, marks: Number(editSubjectData.marks) || 0,
        programId: editSubjectData.programId, courseId: editSubjectData.courseId, ...getAuthData(),
      }, { headers: getHeaders() });
      notify("✅ Subject updated", "success");
      setShowEditSubjectModal(false);
      fetchSubjects();
    } catch {
      notify("❌ Failed to update subject", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API}/subjects/${subjectId}`, { headers: getHeaders() });
      notify("✅ Subject deleted", "success");
      fetchSubjects();
    } catch {
      notify("❌ Failed to delete subject", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ANIMATIONS ================= */
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Course Management
            </h1>
            <p className="text-gray-400 mt-1">Manage programs, courses, and subjects efficiently</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-800/50 backdrop-blur-md p-1 rounded-xl border border-white/10">
            {['programs', 'courses', 'subjects', 'dashboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {tab === 'dashboard' ? 'View Dashboard' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, y: -20, x: 50 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, x: 50 }}
              className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 flex items-center gap-3 ${message.type === "success" ? "bg-green-500/20 text-green-300 border-green-500/30" :
                message.type === "error" ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                }`}
            >
              <span className="text-xl">{message.type === "success" ? "✅" : message.type === "error" ? "⚠️" : "ℹ️"}</span>
              <span className="font-medium">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Sections */}
        <AnimatePresence mode="wait">

          {/* PROGRAMS TAB */}
          {activeTab === 'programs' && (
            <motion.div key="programs" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
              <Section title="Academic Programs" subtitle="Create and manage programs" icon="🎓">
                <Grid>
                  <Input value={programName} onChange={setProgramName} placeholder="Program Name *" />
                  <Input value={programImage} onChange={setProgramImage} placeholder="Image URL (optional)" />
                  <ActionButton onClick={handleCreateProgram} loading={loading} label="Create Program" />
                </Grid>

                <Table headers={["Program Name", "Program ID", "Actions"]}>
                  {programs.length === 0 ? <NoData colSpan={3} /> : programs.map((p) => (
                    <motion.tr key={p._id} variants={itemVariants} className="group hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{p.name}</td>
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">{p._id}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <IconButton onClick={() => handleEditProgram(p)} color="blue" icon="✏️" />
                        <IconButton onClick={() => handleDeleteProgram(p._id)} color="red" icon="🗑️" />
                      </td>
                    </motion.tr>
                  ))}
                </Table>
              </Section>
            </motion.div>
          )}

          {/* COURSES TAB */}
          {activeTab === 'courses' && (
            <motion.div key="courses" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
              <Section title="Course Catalog" subtitle="Manage courses under programs" icon="📚">
                <Grid cols={3}>
                  <Select value={selectedProgramForCourse} onChange={setSelectedProgramForCourse} options={programs} placeholder="Select Program *" />
                  <Input value={courseCode} onChange={setCourseCode} placeholder="Course Code *" />
                  <Input value={courseName} onChange={setCourseName} placeholder="Course Name *" />
                  <Input value={courseFee} onChange={setCourseFee} placeholder="Course Fee" type="number" />
                  <Input value={admissionFee} onChange={setAdmissionFee} placeholder="Admission Fee" type="number" />
                  <Input value={duration} onChange={setDuration} placeholder="Duration (e.g. 6 Months)" />
                </Grid>
                <div className="mt-4 flex justify-end">
                  <ActionButton onClick={handleCreateCourse} loading={loading} label="Create Course" />
                </div>

                <div className="mt-6">
                  <Table headers={["Course Name", "Code", "Program", "Fee", "Duration", "Actions"]}>
                    {courses.length === 0 ? <NoData colSpan={6} /> : courses.map((c) => (
                      <motion.tr key={c._id} variants={itemVariants} className="group hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{c.name}</td>
                        <td className="px-6 py-4 text-indigo-300 font-mono text-xs">{c.code}</td>
                        <td className="px-6 py-4 text-gray-300 text-sm">{c.programId?.name || c.programId}</td>
                        <td className="px-6 py-4 text-green-400 font-bold">₹{c.fee}</td>
                        <td className="px-6 py-4 text-gray-300 text-sm">{c.duration}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <IconButton onClick={() => handleEditCourse(c)} color="blue" icon="✏️" />
                          <IconButton onClick={() => handleDeleteCourse(c._id)} color="red" icon="🗑️" />
                        </td>
                      </motion.tr>
                    ))}
                  </Table>
                </div>
              </Section>
            </motion.div>
          )}

          {/* SUBJECTS TAB */}
          {activeTab === 'subjects' && (
            <motion.div key="subjects" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
              <Section title="Subject Mapping" subtitle="Map subjects to courses" icon="📝">
                <Grid cols={2}>
                  <Select value={selectedProgramForSubject} onChange={setSelectedProgramForSubject} options={programs} placeholder="Select Program *" />
                  <Select value={selectedCourse} onChange={setSelectedCourse} options={coursesForSubject} disabled={!selectedProgramForSubject} placeholder="Select Course *" />
                  <Input value={subjectName} onChange={setSubjectName} placeholder="Subject Name *" />
                  <Input value={subjectMarks} onChange={setSubjectMarks} placeholder="Max Marks" type="number" />
                </Grid>
                <div className="mt-4 flex justify-end">
                  <ActionButton onClick={handleCreateSubject} loading={loading} label="Add Subject" />
                </div>

                <div className="mt-6">
                  <Table headers={["Subject", "Course", "Program", "Marks", "Actions"]}>
                    {subjects.length === 0 ? <NoData colSpan={5} /> : subjects.map((s) => (
                      <motion.tr key={s._id} variants={itemVariants} className="group hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{s.name}</td>
                        <td className="px-6 py-4 text-gray-300 text-sm">{s.courseId?.name || s.courseId}</td>
                        <td className="px-6 py-4 text-gray-400 text-xs">{s.programId?.name || s.programId}</td>
                        <td className="px-6 py-4 text-yellow-400 font-bold">{s.marks}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <IconButton onClick={() => handleEditSubject(s)} color="blue" icon="✏️" />
                          <IconButton onClick={() => handleDeleteSubject(s._id)} color="red" icon="🗑️" />
                        </td>
                      </motion.tr>
                    ))}
                  </Table>
                </div>
              </Section>
            </motion.div>
          )}

          {/* DASHBOARD VIEW TAB */}
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
              <Section title="Curriculum Overview" subtitle="Browse the full hierarchy" icon="🔎">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <Select value={dashboardProgramFilter} onChange={(v) => { setDashboardProgramFilter(v); setDashboardCourseFilter(""); }} options={programs} placeholder="Filter by Program" />
                  <Select value={dashboardCourseFilter} onChange={setDashboardCourseFilter} options={dashboardProgramFilter ? courses.filter((c) => (c.programId?._id || c.programId) === dashboardProgramFilter) : courses} placeholder="Filter by Course" />
                </div>

                <div className="overflow-x-auto rounded-xl border border-indigo-500/20">
                  <table className="min-w-full divide-y ">
                    <thead className="bg-indigo-950/50">
                      <tr>
                        {["Program", "Course", "Subject", "Marks", "Actions"].map(h => (
                          <th key={h} className="px-6 py-4 text-left text-xs font-bold text-indigo-200 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-500/10 text-gray-300 bg-transparent">
                      {(() => {
                        const rows = [];
                        const filteredPrograms = programs.filter((p) => !dashboardProgramFilter || p._id === dashboardProgramFilter);
                        if (filteredPrograms.length === 0) return <NoData colSpan={5} />;

                        filteredPrograms.forEach((p) => {
                          const programCourses = dashboardCourseFilter
                            ? courses.filter((c) => c._id === dashboardCourseFilter && (c.programId?._id === p._id || c.programId === p._id))
                            : getCoursesForProgram(p._id);

                          if (programCourses.length === 0) {
                            rows.push(
                              <tr key={`p-${p._id}`} className="hover:bg-white/5 transition">
                                <td className="px-6 py-4 text-white font-medium">{p.name}</td>
                                <td className="px-6 py-4 text-gray-500">-</td>
                                <td className="px-6 py-4 text-gray-500">-</td>
                                <td className="px-6 py-4 text-gray-500">-</td>
                                <td className="px-6 py-4 space-x-2">
                                  <IconButton onClick={() => handleEditProgram(p)} color="blue" icon="✏️" />
                                  <IconButton onClick={() => handleDeleteProgram(p._id)} color="red" icon="🗑️" />
                                </td>
                              </tr>
                            );
                          } else {
                            programCourses.forEach((c) => {
                              const subjectsForCourse = getSubjectsForCourse(c._id);
                              if (subjectsForCourse.length === 0) {
                                rows.push(
                                  <tr key={`c-${c._id}`} className="hover:bg-white/5 transition">
                                    <td className="px-6 py-4 text-gray-300">{p.name}</td>
                                    <td className="px-6 py-4 text-white font-medium">{c.name}</td>
                                    <td className="px-6 py-4 text-gray-500">-</td>
                                    <td className="px-6 py-4 text-gray-500">-</td>
                                    <td className="px-6 py-4 space-x-2">
                                      <IconButton onClick={() => handleEditCourse(c)} color="blue" icon="✏️" />
                                      <IconButton onClick={() => handleDeleteCourse(c._id)} color="red" icon="🗑️" />
                                    </td>
                                  </tr>
                                );
                              } else {
                                subjectsForCourse.forEach((s) => {
                                  rows.push(
                                    <tr key={`s-${s._id}`} className="hover:bg-white/5 transition">
                                      <td className="px-6 py-4 text-gray-400 text-xs">{p.name}</td>
                                      <td className="px-6 py-4 text-gray-300">{c.name}</td>
                                      <td className="px-6 py-4 text-indigo-200 font-medium">{s.name}</td>
                                      <td className="px-6 py-4 text-yellow-400 font-bold">{s.marks}</td>
                                      <td className="px-6 py-4 space-x-2">
                                        <IconButton onClick={() => handleEditSubject(s)} color="blue" icon="✏️" />
                                        <IconButton onClick={() => handleDeleteSubject(s._id)} color="red" icon="🗑️" />
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
              </Section>
            </motion.div>
          )}

        </AnimatePresence>

        {/* MODALS */}
        <Modal isOpen={showEditProgramModal} onClose={() => setShowEditProgramModal(false)} title="Edit Program">
          <Input value={editProgramData.name} onChange={(v) => setEditProgramData({ ...editProgramData, name: v })} placeholder="Program Name" />
          <Input value={editProgramData.image} onChange={(v) => setEditProgramData({ ...editProgramData, image: v })} placeholder="Image URL" />
          <div className="flex justify-end gap-3 mt-6">
            <ActionButton onClick={() => setShowEditProgramModal(false)} label="Cancel" variant="secondary" />
            <ActionButton onClick={submitEditProgram} loading={loading} label="Save Changes" />
          </div>
        </Modal>

        <Modal isOpen={showEditCourseModal} onClose={() => setShowEditCourseModal(false)} title="Edit Course">
          <Select value={editCourseData.programId} onChange={(v) => setEditCourseData({ ...editCourseData, programId: v })} options={programs} placeholder="Program" />
          <Input value={editCourseData.code} onChange={(v) => setEditCourseData({ ...editCourseData, code: v })} placeholder="Course Code" />
          <Input value={editCourseData.name} onChange={(v) => setEditCourseData({ ...editCourseData, name: v })} placeholder="Course Name" />
          <div className="grid grid-cols-2 gap-4">
            <Input value={String(editCourseData.fee)} onChange={(v) => setEditCourseData({ ...editCourseData, fee: v })} placeholder="Fee" type="number" />
            <Input value={String(editCourseData.admissionFee)} onChange={(v) => setEditCourseData({ ...editCourseData, admissionFee: v })} placeholder="Admission Fee" type="number" />
          </div>
          <Input value={editCourseData.duration} onChange={(v) => setEditCourseData({ ...editCourseData, duration: v })} placeholder="Duration" />
          <div className="flex justify-end gap-3 mt-6">
            <ActionButton onClick={() => setShowEditCourseModal(false)} label="Cancel" variant="secondary" />
            <ActionButton onClick={submitEditCourse} loading={loading} label="Save Changes" />
          </div>
        </Modal>

        <Modal isOpen={showEditSubjectModal} onClose={() => setShowEditSubjectModal(false)} title="Edit Subject">
          <Select value={editSubjectData.programId} onChange={(v) => setEditSubjectData({ ...editSubjectData, programId: v })} options={programs} placeholder="Program" />
          <Select value={editSubjectData.courseId} onChange={(v) => setEditSubjectData({ ...editSubjectData, courseId: v })} options={getCoursesForProgram(editSubjectData.programId)} placeholder="Course" />
          <Input value={editSubjectData.name} onChange={(v) => setEditSubjectData({ ...editSubjectData, name: v })} placeholder="Subject Name" />
          <Input value={String(editSubjectData.marks)} onChange={(v) => setEditSubjectData({ ...editSubjectData, marks: v })} placeholder="Marks" type="number" />
          <div className="flex justify-end gap-3 mt-6">
            <ActionButton onClick={() => setShowEditSubjectModal(false)} label="Cancel" variant="secondary" />
            <ActionButton onClick={submitEditSubject} loading={loading} label="Save Changes" />
          </div>
        </Modal>

      </div>
    </div>
  );
};

/* ================= UI COMPONENTS ================= */

const Section = ({ title, subtitle, icon, children }) => (
  <motion.div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
      <div className="p-3 bg-indigo-500/20 rounded-xl text-2xl">{icon}</div>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
    {children}
  </motion.div>
);

const Grid = ({ children, cols = 2 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-4`}>{children}</div>
);

const Input = ({ value, onChange, placeholder, type = "text" }) => (
  <div className="relative group">
    <input
      type={type}
      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-gray-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
  </div>
);

const Select = ({ value, onChange, options, disabled, placeholder }) => (
  <div className="relative group">
    <select
      className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all disabled:opacity-50 appearance-none cursor-pointer"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" className="bg-slate-900 text-gray-400">{placeholder || "Select"}</option>
      {options.map((o) => (
        <option key={o._id} value={o._id} className="bg-slate-900 text-white">{o.name}</option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
  </div>
);

const ActionButton = ({ onClick, loading, label, variant = "primary" }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`px-6 py-3 rounded-xl font-medium transition-all transform active:scale-95 flex items-center justify-center gap-2 ${variant === "secondary"
      ? "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
    {label}
  </button>
);

const IconButton = ({ onClick, icon, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg transition-colors ${color === 'red' ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400'
      }`}
  >
    {icon}
  </button>
);

const Table = ({ headers, children }) => (
  <div className="overflow-x-auto rounded-xl border border-indigo-500/20">
    <table className="min-w-full divide-y ">
      <thead className="bg-indigo-950/50">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className={`px-6 py-4 text-xs font-bold text-indigo-200 uppercase tracking-wider ${i === headers.length - 1 ? 'text-right' : 'text-left'}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-indigo-500/10 text-gray-300 bg-transparent">
        {children}
      </tbody>
    </table>
  </div>
);

const NoData = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="px-6 py-12 text-center text-gray-500 italic bg-transparent">
      No data available
    </td>
  </tr>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#1e293b] rounded-2xl p-6 relative z-10 w-full max-w-lg border border-white/10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">✕</button>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminManageCourses;
