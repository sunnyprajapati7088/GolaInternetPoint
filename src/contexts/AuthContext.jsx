import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (role) => {
    let userData;
    if (role === 'admin') {
      userData = { name: 'Admin User', role: 'admin' };
    } else if (role === 'franchise') {
      userData = { name: 'Franchise Owner', role: 'franchise', center: 'City Center, Delhi' };
    } else {
      userData = { name: 'Demo Student', role: 'student', id: 'S1001' };
    }
    setUser(userData);
    return userData; // Return user to help router navigate
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
