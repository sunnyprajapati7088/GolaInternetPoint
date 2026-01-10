import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts & Nav
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import CoursesPage from './pages/public/CoursesPage';
import VerifyPage from './pages/public/VerifyPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManageCourses from './pages/admin/AdminManageCourses';
import AdminManageFranchise from './pages/admin/AdminManageFranchise';
import AdminCertificates from './pages/admin/AdminCertificates';

// Franchise Pages
import FranchiseDashboard from './pages/franchise/FranchiseDashboard';
import FranchiseAddStudent from './pages/franchise/FranchiseAddStudent';
import FranchiseIssueCertificate from './pages/franchise/FranchiseIssueCertificate';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentMyCourses from './pages/student/StudentMyCourses';
import StudentMyCertificates from './pages/student/StudentMyCertificates';
import StudentMyIDCard from './pages/student/StudentMyIDCard';

// Stubs
import PageStub from './components/PageStub';
import ComputerTrainingLandingPage from './pages/LandingPage';
import Header from './pages/LandingPageComponentes/LandingComponent';
import CreateUser from './components/RegisterStudent';
import AdminManageStudents from './pages/admin/AdminManageStudents';
import ScanId from './components/scanId';
import CertificateCardPage from './pages/admin/CertificateCardPage';


// We need a wrapper to provide navigate to the Navbar
const AppRouter = () => {
       const { user, logout } = useAuth();
       const navigate = useNavigate();

       return (
              <>
                     <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Header />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/scanid/:userIdToFetch" element={<ScanId />} />
                            <Route path="/courses" element={<CoursesPage />} />
                            <Route path="/verify" element={<VerifyPage />} />
                            <Route path="certificates" element={<StudentMyCertificates />} />

                            {/* Admin Routes */}
                            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                                   <Route path="/admin" element={<DashboardLayout />}>
                                          <Route path="dashboard" element={<AdminDashboard />} />
                                          <Route path="courses" element={<AdminManageCourses />} />
                                          <Route path="franchises" element={<AdminManageFranchise />} />
                                          <Route path="students" element={<AdminManageStudents title="Manage Students" />} />
                                          <Route path="certificates" element={<AdminCertificates />} />
                                          <Route path="reports" element={<PageStub title="View Reports" />} />
                                          <Route path="/admin/add-student" element={<CreateUser title="Add Student" />} />
                                   </Route>
                                   {/* Standalone Admin Pages (No Sidebar) */}
                                   <Route path="/admin/certificate-card" element={<CertificateCardPage />} />
                            </Route>

                            {/* Franchise Routes */}
                            <Route element={<ProtectedRoute allowedRoles={['franchise']} />}>
                                   <Route path="/franchise" element={<DashboardLayout />}>
                                          <Route path="dashboard" element={<FranchiseDashboard />} />
                                          <Route path="add-student" element={<FranchiseAddStudent />} />
                                          <Route path="manage-students" element={<PageStub title="Manage My Students" />} />
                                          <Route path="issue-certificate" element={<FranchiseIssueCertificate />} />
                                          <Route path="issue-id" element={<PageStub title="Issue ID Card" />} />
                                   </Route>
                            </Route>

                            {/* Student Routes */}
                            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                                   <Route path="/student" element={<DashboardLayout />}>
                                          <Route path="dashboard" element={<StudentDashboard />} />
                                          <Route path="courses" element={<StudentMyCourses />} />
                                          <Route path="certificates" element={<StudentMyCertificates />} />
                                          <Route path="id-card" element={<StudentMyIDCard />} />
                                          <Route path="exam" element={<PageStub title="Online Exam" />} />
                                   </Route>
                            </Route>

                            {/* Not Found */}
                            <Route path="*" element={<NotFoundPage />} />
                     </Routes>
              </>
       );
};

export default AppRouter;