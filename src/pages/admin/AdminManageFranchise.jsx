import React from 'react';
import { useData } from '../../contexts/DataContext';

const AdminManageFranchise = () => {
  const { franchises, loading } = useData();

  if (loading) return <div>Loading...</div>;

  return (
     <div className="bg-white rounded-lg shadow-md">
       <div className="flex justify-between items-center p-6 border-b">
           <h1 className="text-2xl font-bold text-gray-900">Manage Franchises</h1>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
             Add New Franchise
           </button>
       </div>
       <div className="p-6">
           <ul className="space-y-4">
             {franchises.map(f => (
                 <li key={f.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                     <div>
                         <h2 className="text-lg font-bold text-gray-800">{f.name} ({f.id})</h2>
                         <p className="text-sm text-gray-600">Owner: {f.owner} | Students: {f.students}</p>
                     </div>
                     <div className="space-x-2">
                         <button className="text-sm px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600">View</button>
                         <button className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Edit</button>
                         <button className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">Disable</button>
                     </div>
                 </li>
             ))}
           </ul>
       </div>
    </div>
  );
};

export default AdminManageFranchise;