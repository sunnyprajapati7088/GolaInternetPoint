import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import AppRouter from './router';

// App.js is now just for providers
export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
          <AppRouter />
        </div>
      </DataProvider>
    </AuthProvider>
  );
}