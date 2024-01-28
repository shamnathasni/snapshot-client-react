import React from "react";
import AdminNavbar from "../../Components/Layouts/AdminNavbar";
import Graph from "../../Components/Admin/Graph";
import VendorGraph from "../../Components/Admin/VendorGraph";

function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      <div className="grid grid-cols-2 px-5 bg-slate-50">
        <div className="flex justify-center items-center h-screen">
          <Graph />
        </div>
        <div className="flex justify-center items-center">
          <VendorGraph />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
