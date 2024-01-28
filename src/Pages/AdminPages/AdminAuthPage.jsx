import React from "react";
import AdminLoginForm from "../../Components/Auth/AdminLoginForm";

function AdminAuthPage() {
  return (
    <div>
      <div className="w-full h-screen bg-admin-auth-background bg-cover flex justify-center items-center">
        <div className="w-8/12 h-5/6 bg-[#fcf5ff] shadow-lg rounded-[4px] grid grid-cols-2">
          <div
            style={{
              backgroundImage: "url(/Authentication/adminLogin.jpg)",
              backgroundSize: "cover",
            }}
            className="rounded-l-[4px]"
          ></div>
          <div className="flex justify-center items-center flex-col">
            <div>
              <span className="flex items-center justify-center font-MyFont text-[#872341] ">
                Admin
              </span>
              <header className="font-bold text-3xl pb-5">Sign In</header>
            </div>
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAuthPage;
