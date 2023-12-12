import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "../../Components/Layouts/AdminNavbar";
import { TERipple } from "tw-elements-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { addsubCategory } from "../../Api/AdminApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function AdminAddSubcategory() {
  const [subName, setSubName] = useState("");
  const [subImage, setSubImage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const categoryId = location.state.Id;
  console.log(categoryId, "categoryId");
  const categoryName = location.state.name;

  const handleSubcategory = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", subName);
      formData.append("image", subImage);
      console.log(categoryId, "categoryId2");
      // Log formData for debugging purposes
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      const response = await addsubCategory({ formData, categoryId });

      if (response.data.status) {
        navigate("/admin/subcategorylist");
        toast(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleImage = (e) => {
  //   setSubImage(e.target.files[0]);
  // };

  //.................image uploading........................//

  const cloudinary = useRef();
  const widget = useRef();

  useEffect(() => {
    cloudinary.current = window.cloudinary;
    widget.current = cloudinary.current.createUploadWidget(
      {
        cloudName: "ddaksct8s",
        uploadPreset: "ro65vieu",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          // Pass the uploaded image URL to the parent component
          handleImageUpload(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleImageUpload = (selectedImage) => {
    // Update the local state with the selected image
    setSubImage(selectedImage);
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex justify-center items-center py-12">
        <div className="block w-4/12 rounded-lg bg-s p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <h2 className="text-2xl font-semibold mb-4 text-center font-serif text-[#22092C]">
            Add Subcategory for {categoryName}
          </h2>
          <form action="/admin/addsubcategory" method="post" enctype="multipart/form-data" className="py-5">
            {/* <!--E-mail input--> */}
            <input
              type="text"
              onChange={(e) => {
                setSubName(e.target.value);
              }}
              placeholder="subcategory"
              className="h-8 w-full rounded-[4px] py-3 shadow-md text-center mb-4 border border-slate-300 placeholder:font-serif placeholder:text-[#645c5c]"
            />
            <label htmlFor="file-input">
              <div className="h-8 w-full rounded-[4px] p-6 mb-4 shadow-md flex flex-row items-center justify-center gap-2 border border-slate-300">
                <span className="font-serif font-extralight text-[#645c5c] text-base ">
                  upload image
                </span>
                <FontAwesomeIcon icon={faFileUpload} />
              </div>
            </label>
            <input
              name="file-input"
              id="file-input"
              type="file"
              onChange={() => widget.current.open()}
              style={{ display: "none" }}
              accept="image/*"
              placeholder="upload image"
              className="h-8 w-full rounded-[4px] p-6 mb-4 shadow-md text-center  border border-slate-300 placeholder:italic"
            />

            {/* <!--Submit button--> */}
            <TERipple rippleColor="light" className="w-full">
              <button
                className="block w-full rounded bg-[#22092C] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                onClick={handleSubcategory}
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

export default AdminAddSubcategory;
