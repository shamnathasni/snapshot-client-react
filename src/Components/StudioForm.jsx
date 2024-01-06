import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StudioFormApi, vendorCategory } from "../Api/VendorApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StudioForm() {
  const navigate = useNavigate();
  const vendorId = useSelector((state) => state.Vendor.vendor._id);
  const schema = z.object({
    studioName: z.string().min(2, { message: "Studio name is too short" }),
    city: z.string().min(2, { message: "City name is too short" }),
    about: z.string().min(10, { message: "About text is too short" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [coverImageFile, setCoverImageFile] = useState("");
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("studioName", data.studioName);
    formData.append("city", data.city);
    formData.append("about", data.about);
    formData.append("coverImage", coverImageFile);
    
    // Append gallery images to FormData
    galleryImageFiles.forEach((file, index) => {
      formData.append(`galleryImage[${index}]`, file);
    });
    
    formData.append("vendorId", vendorId);

    const response = await StudioFormApi(formData);
    if (response.data.status) {
      toast(response.data.alert);
      navigate("/vendor/studio");
      console.log("Form submitted!", formData);
    } else {
      toast(response.data.alert);
    }
  };

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
          setCoverImageFile(result.info.secure_url);
          console.log(result.info.secure_url, "result.info.files");
        }
      }
    );
  }, []);

  const cloudinary1 = useRef();
  const widget1 = useRef();

  useEffect(() => {
    cloudinary1.current = window.cloudinary;
    widget1.current = cloudinary1.current.createUploadWidget(
      {
        cloudName: "ddaksct8s",
        uploadPreset: "ro65vieu",
        multiple:true
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          setGalleryImageFiles((prevFiles) => [...prevFiles, result.info.secure_url]);
          console.log(result.info.secure_url, "result.info.files");
        }
      }
    );
  }, []);
  
  return (
    <form
      className="w-2/5 mx-auto"
      action="/vendor/createStudio"
      method="post"
      enctype="multipart/form-data"
    >
      <div className="mb-5">
        <label
          htmlFor="base-input-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name of studio
        </label>
        <input
          type="text"
          id="base-input-1"
          {...register("studioName")}
          placeholder="name of your studio"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.studioName && (
          <span className="text-red">errors.studioName.message</span>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="base-input-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name of city
        </label>
        <input
          type="text"
          id="base-input-1"
          {...register("city")}
          placeholder="name of your city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.city && <span className="text-red">errors.city.message</span>}
      </div>
      <div className="mb-5">
        <label
          htmlFor="base-input-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          About
        </label>
        <input
          type="text"
          id="base-input-1"
          {...register("about")}
          placeholder="About your studio"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.about && <span className="text-red">errors.about.message</span>}
      </div>
      <div className="mb-5 flex flex-row">
        {/* <div>
          <button onClick={() => widget.current.open()}>upload</button>
        </div> */}
        <label
          htmlFor="cover-image-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Cover Image
        </label>
        <div className="flex items-center">
          <input
           type="file"
            id="cover-image-input"
           
            onChange={() => widget.current.open()}
            className="hidden"
          />
          <label htmlFor="cover-image-upload" className="ml-2 cursor-pointer">
            <FontAwesomeIcon icon={faFileUpload} size="1x" />
          </label>
        </div>
     
      </div>
      {/* ... other form inputs ... */}
      <div className="mb-5  flex flex-row">
        <label
          htmlFor="gallery-image-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Gallery Image
        </label>
        <div className="flex items-center">
          <input
            type="file"
            id="gallery-image-input"
          multiple
            onChange={() => widget1.current.open()}
            className="hidden"
          />
          <label htmlFor="gallery-image-upload" className="ml-2 cursor-pointer">
            <FontAwesomeIcon icon={faFileUpload} size="1x" />
          </label>
        </div>
        
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="bg-[#872341] text-white w-full p-2.5 rounded-lg hover:bg-[#cfaab5] hover:text-[#872341] focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default StudioForm;
