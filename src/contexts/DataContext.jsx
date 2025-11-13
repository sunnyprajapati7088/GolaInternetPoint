import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiGetCourses, apiGetStudents, apiGetFranchises, apiAddStudent } from '../api';

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

// This provider will fetch data on load and hold our in-memory "database"
export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data from our "dummy" API (the JSON files)
  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseRes, studentRes, franchiseRes] = await Promise.all([
          apiGetCourses(),
          apiGetStudents(),
          apiGetFranchises(),
        ]);
        setCourses(courseRes.data);
        setStudents(studentRes.data);
        setFranchises(franchiseRes.data);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // --- THIS IS THE "WRITE" FUNCTION ---
  // It calls the API stub AND updates our local state.
  const addStudent = async (studentPayload) => {
    try {
      // 1. Call the "API". In a real app, we'd get the *new* student back.
      const res = await apiAddStudent(studentPayload);
      const newStudent = res.data; // The simulated new student

      // 2. Add the new student to our local state
      setStudents(prevStudents => [...prevStudents, newStudent]);
      return newStudent;

    } catch (err) {
      console.error("Failed to add student", err);
      throw err; // Re-throw to let the form handle it
    }
  };

  const value = {
    courses,
    students,
    franchises,
    loading,
    addStudent,
    // ...addCourse, addFranchise functions would go here
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};