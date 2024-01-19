import React from 'react';
import AdminNavbar from '../../Components/Layouts/AdminNavbar';
import Graph from '../../Components/Admin/Graph';

function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <div className="flex justify-center items-center h-screen">
        <Graph />
      </div>
    </div>
  );
}

export default AdminDashboard;
