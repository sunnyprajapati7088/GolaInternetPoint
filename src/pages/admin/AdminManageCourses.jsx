import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

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
  const [message, setMessage] = useState("");

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

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
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
      notify("✅ Program created");
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 space-y-10">

      {/* Toast */}
      {message && (
        <div className="fixed top-4 right-4 z-50 bg-black text-white px-5 py-2 rounded shadow">
          {message}
        </div>
      )}

      {/* PROGRAMS */}
      <Section title="📚 Programs" subtitle="Create and manage academic programs">
        <Grid>
          <Input value={programName} onChange={setProgramName} placeholder="Program Name *" />
          <Input value={programImage} onChange={setProgramImage} placeholder="Image URL (optional)" />
        </Grid>
        <ActionButton onClick={handleCreateProgram} loading={loading} label="Create Program" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {programs.map((p) => (
            <div key={p._id} className="bg-gray-50 border rounded px-3 py-2 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{p._id}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-blue-600" onClick={() => handleEditProgram(p)}>Edit</button>
                <button className="text-sm text-red-600" onClick={() => handleDeleteProgram(p._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* COURSES */}
      <Section title="📖 Courses" subtitle="Courses under each program">
        <Grid>
          <Select value={selectedProgramForCourse} onChange={setSelectedProgramForCourse} options={programs} />
          <Input value={courseCode} onChange={setCourseCode} placeholder="Course Code *" />
          <Input value={courseName} onChange={setCourseName} placeholder="Course Name *" />
          <Input value={courseFee} onChange={setCourseFee} placeholder="Course Fee" />
          <Input value={admissionFee} onChange={setAdmissionFee} placeholder="Admission Fee" />
          <Input value={duration} onChange={setDuration} placeholder="Duration (e.g. 6 months)" />
        </Grid>
        <ActionButton onClick={handleCreateCourse} loading={loading} label="Create Course" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {courses.map((c) => (
            <div key={c._id} className="bg-gray-50 border rounded px-3 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.name} <span className="text-xs text-gray-400">({c.code})</span></div>
                  <div className="text-xs text-gray-500">Program: {c.programId?.name || c.programId}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-blue-600" onClick={() => handleEditCourse(c)}>Edit</button>
                  <button className="text-sm text-red-600" onClick={() => handleDeleteCourse(c._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SUBJECTS */}
      <Section title="✏️ Subjects" subtitle="Subjects mapped to courses">
        <Grid>
          <Select value={selectedProgramForSubject} onChange={setSelectedProgramForSubject} options={programs} />
          <Select value={selectedCourse} onChange={setSelectedCourse} options={coursesForSubject} disabled={!selectedProgramForSubject} />
          <Input value={subjectName} onChange={setSubjectName} placeholder="Subject Name *" />
          <Input value={subjectMarks} onChange={setSubjectMarks} placeholder="Marks" />
        </Grid>
        <ActionButton onClick={handleCreateSubject} loading={loading} label="Create Subject" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {subjects.map((s) => (
            <div key={s._id} className="bg-gray-50 border rounded px-3 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-gray-500">Course: {s.courseId?.name || s.courseId} • Marks: {s.marks}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-blue-600" onClick={() => handleEditSubject(s)}>Edit</button>
                  <button className="text-sm text-red-600" onClick={() => handleDeleteSubject(s._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* VIEW DASHBOARD: Programs -> Courses -> Subjects (collapsible) */}
      <Section title="🔎 View Dashboard" subtitle="Browse programs, their courses and subjects">
        <div className="space-y-3">
          {programs.map((p) => (
            <div key={p._id} className="border rounded p-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-gray-500">{p._id}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-sm text-blue-600"
                    onClick={() => setExpandedProgram(expandedProgram === p._id ? null : p._id)}
                  >
                    {expandedProgram === p._id ? "Collapse" : "Expand"}
                  </button>
                  <button className="text-sm text-blue-600" onClick={() => handleEditProgram(p)}>Edit</button>
                  <button className="text-sm text-red-600" onClick={() => handleDeleteProgram(p._id)}>Delete</button>
                </div>
              </div>

              {expandedProgram === p._id && (
                <div className="mt-3 space-y-2">
                  {getCoursesForProgram(p._id).map((c) => (
                    <div key={c._id} className="border rounded p-2 bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{c.name} <span className="text-xs text-gray-400">({c.code})</span></div>
                          <div className="text-xs text-gray-500">Fee: {c.fee} | Duration: {c.duration}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="text-sm text-blue-600"
                            onClick={() => setExpandedCourse(expandedCourse === c._id ? null : c._id)}
                          >
                            {expandedCourse === c._id ? "Hide Subjects" : "Show Subjects"}
                          </button>
                          <button className="text-sm text-blue-600" onClick={() => handleEditCourse(c)}>Edit</button>
                          <button className="text-sm text-red-600" onClick={() => handleDeleteCourse(c._id)}>Delete</button>
                        </div>
                      </div>

                      {expandedCourse === c._id && (
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {getSubjectsForCourse(c._id).length === 0 ? (
                            <div className="text-sm text-gray-500">No subjects for this course</div>
                          ) : (
                            getSubjectsForCourse(c._id).map((s) => (
                              <div key={s._id} className="bg-gray-50 border rounded px-3 py-2 text-sm flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{s.name}</div>
                                  <div className="text-xs text-gray-500">Marks: {s.marks}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="text-sm text-blue-600" onClick={() => handleEditSubject(s)}>Edit</button>
                                  <button className="text-sm text-red-600" onClick={() => handleDeleteSubject(s._id)}>Delete</button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
      {/* EDIT MODALS */}
      {showEditProgramModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40 z-10" onClick={() => setShowEditProgramModal(false)} />
          <div className="bg-white rounded-lg p-6 relative z-20 w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">Edit Program</h3>
            <Input value={editProgramData.name} onChange={(v) => setEditProgramData({ ...editProgramData, name: v })} placeholder="Program Name" />
            <Input value={editProgramData.image} onChange={(v) => setEditProgramData({ ...editProgramData, image: v })} placeholder="Image URL" />
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2" onClick={() => setShowEditProgramModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submitEditProgram}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showEditCourseModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40 z-10" onClick={() => setShowEditCourseModal(false)} />
          <div className="bg-white rounded-lg p-6 relative z-20 w-full max-w-md space-y-3">
            <h3 className="text-lg font-bold">Edit Course</h3>
            <Select value={editCourseData.programId} onChange={(v) => setEditCourseData({ ...editCourseData, programId: v })} options={programs} />
            <Input value={editCourseData.code} onChange={(v) => setEditCourseData({ ...editCourseData, code: v })} placeholder="Course Code" />
            <Input value={editCourseData.name} onChange={(v) => setEditCourseData({ ...editCourseData, name: v })} placeholder="Course Name" />
            <Input value={String(editCourseData.fee)} onChange={(v) => setEditCourseData({ ...editCourseData, fee: v })} placeholder="Fee" />
            <Input value={String(editCourseData.admissionFee)} onChange={(v) => setEditCourseData({ ...editCourseData, admissionFee: v })} placeholder="Admission Fee" />
            <Input value={editCourseData.duration} onChange={(v) => setEditCourseData({ ...editCourseData, duration: v })} placeholder="Duration" />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2" onClick={() => setShowEditCourseModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submitEditCourse}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showEditSubjectModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40 z-10" onClick={() => setShowEditSubjectModal(false)} />
          <div className="bg-white rounded-lg p-6 relative z-20 w-full max-w-md space-y-3">
            <h3 className="text-lg font-bold">Edit Subject</h3>
            <Select value={editSubjectData.programId} onChange={(v) => setEditSubjectData({ ...editSubjectData, programId: v })} options={programs} />
            <Select value={editSubjectData.courseId} onChange={(v) => setEditSubjectData({ ...editSubjectData, courseId: v })} options={getCoursesForProgram(editSubjectData.programId || selectedProgramForSubject)} />
            <Input value={editSubjectData.name} onChange={(v) => setEditSubjectData({ ...editSubjectData, name: v })} placeholder="Subject Name" />
            <Input value={String(editSubjectData.marks)} onChange={(v) => setEditSubjectData({ ...editSubjectData, marks: v })} placeholder="Marks" />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2" onClick={() => setShowEditSubjectModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submitEditSubject}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= UI HELPERS ================= */

const Section = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-xl shadow p-5 sm:p-6 space-y-4">
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
);

const Input = ({ value, onChange, placeholder }) => (
  <input
    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Select = ({ value, onChange, options, disabled }) => (
  <select
    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
  >
    {loading ? "Please wait..." : label}
  </button>
);

const ResponsiveList = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
    {items.map((i, idx) => (
      <div key={idx} className="bg-gray-50 border rounded px-3 py-2">
        {i}
      </div>
    ))}
  </div>
);

export default AdminManageCourses;
