// import axios from 'axios';

// // --- API Stubs ---
// // These functions are ready for you to swap in your real API endpoints.

// /**
//  * For now, this just reads from the public/data JSON files.
//  * In the future, this would be:
//  * return axios.get('https://api.Gola Internet Point.com/courses');
//  */
// export const apiGetCourses = () => {
//   return axios.get('/data/courses.json');
// };

// export const apiGetFranchises = () => {
//   return axios.get('/data/franchises.json');
// };

// export const apiGetStudents = () => {
//   return axios.get('/data/students.json');
// };

// /**
//  * This simulates a POST request. It just returns the payload
//  * wrapped in a Promise to mimic an async API call.
//  */
// export const apiAddStudent = (studentPayload) => {
//   console.log('API STUB: Sent payload to server:', studentPayload);
//   // In a real app:
//   // return axios.post('https://api.Gola Internet Point.com/students', studentPayload);
//   
//   // For our demo, just return the data we "sent"
//   return Promise.resolve({ data: studentPayload });
// };



import axios from 'axios';

// --- API Stubs ---

export const apiGetCourses = () => {
  return axios.get('/data/courses.json');
};

export const apiGetFranchises = () => {
  return axios.get('/data/franchises.json');
};

export const apiGetStudents = () => {
  return axios.get('/data/students.json');
};

/**
 * This simulates a POST request.
 * It now takes the payload, adds a "demo fixed value" (like a
 * server status), and returns the *new* object.
 */
export const apiAddStudent = (studentPayload) => {
  console.log('API STUB: Sent payload to server:', studentPayload);
  
  // In a real app:
  // return axios.post('https://api.Gola Internet Point.com/students', studentPayload);
  
  // --- MODIFIED SECTION ---
  // Create the new "server" response by merging the payload
  // with our demo fixed values.
  const serverResponse = {
    ...studentPayload, // This is what the user sent
    
    // These are the "demo fixed values" added by the "server"
    enrollmentStatus: "Confirmed",
    serverTimestamp: new Date().toISOString() 
  };
  // --- END MODIFIED SECTION ---

  // For our demo, return the *new* serverResponse object
  return Promise.resolve({ data: serverResponse });
};

/**
 * Simulate updating a student on the server.
 * Accepts the `id` and an object with updated fields.
 */
export const apiUpdateStudent = (id, updatePayload) => {
  console.log(`API STUB: Update student ${id}`, updatePayload);

  // In a real app this would be: axios.put(`/students/${id}`, updatePayload)
  const updated = {
    id,
    ...updatePayload,
    serverTimestamp: new Date().toISOString(),
  };

  return Promise.resolve({ data: updated });
};

/**
 * Simulate deleting a student on the server.
 */
export const apiDeleteStudent = (id) => {
  console.log(`API STUB: Delete student ${id}`);
  // In a real app: return axios.delete(`/students/${id}`)
  return Promise.resolve({ data: { id } });
};