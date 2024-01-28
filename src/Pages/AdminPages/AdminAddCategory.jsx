import React, { useState } from "react";
import AdminNavbar from "../../Components/Layouts/AdminNavbar";
import { TEInput, TERipple } from "tw-elements-react";
import { addCategory } from "../../Api/AdminApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminAddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCategory({ category });

      if (response.data.status) {
        navigate("/admin/categorylist");
        toast(response.data.alert);
      } else {
        toast(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex justify-center items-center py-12">
        <div className="block w-4/12 rounded-lg bg-s p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <h2 className="text-2xl font-semibold mb-4 text-center font-serif text-[#22092C]">
            Add Category
          </h2>
          <form className="py-5" onSubmit={handleSubmit}>
            <TEInput
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Name of the category"
              className="h-8 w-full rounded-[4px] py-3 shadow-md text-center mb-4 border border-slate-300 placeholder:font-serif placeholder:text-[#645c5c]"
            />
            <TERipple rippleColor="light" className="w-full">
              <button
                type="submit"
                className="block w-full rounded bg-[#22092C] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
              >
                Upload
              </button>
            </TERipple>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminAddCategory;
