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
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  console.log(subcategoryName, "subcategoryName");
  console.log(categoryName, "categoryName");
  const navigate = useNavigate();
  const vendorId = useSelector((state) => state.Vendor.vendor._id);
  console.log(vendorId, "vendorId");
  const schema = z.object({
    studioName: z.string().min(2, { message: "Studio name is too short" }),
    city: z.string().min(2, { message: "City name is too short" }),
    about: z.string().min(10, { message: "About text is too short" }),
    category: z.array(z.string(),{message:"select category"}),
    subcategory: z.array(z.string(),{message:"select subcategory"})
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [coverImageFile, setCoverImageFile] = useState("");
  const [galleryImageFile, setGalleryImageFile] = useState("");

  const handleImage = (file, type) => {
    if (type === "cover") {
      setCoverImageFile(file);
    } else if (type === "gallery") {
      setGalleryImageFile(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("studioName", data.studioName);
    formData.append("city", data.city);
    formData.append("about", data.about);
    formData.append("category", categoryName);
    formData.append("subcategory", subcategoryName);
    formData.append("coverImage", coverImageFile);
    formData.append("galleryImage", galleryImageFile);
    formData.append("vendorId", vendorId);

    const response = await StudioFormApi(formData);
    if (response.data.status) {
      toast(response.data.alert);
      navigate("/vendor/studio");
      console.log("Form submitted!", data);
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
          handleImage(result.info.secure_url, "cover");
          console.log(result.info.secure_url, "result.info.files");
          handleImage(result.info.secure_url, "gallery");
        }
      }
    );
  }, []);

  useEffect(() => {
    vendorCategory().then((response) => {
      const vendorCategory = response.data.vendorCategory;
      console.log(category, "vendorCategory");

      setCategory(vendorCategory);
    });
  }, []);

  const categoryHandler = async (e) => {
    const selectedName = e.target.value;
    setCategoryName(selectedName);
    const selectedCategory = category.find(
      (category) => category.name === selectedName
    );
    setSubcategory(selectedCategory.subcategory);
    console.log(selectedCategory, "selectedCategory");
  };

  const subcategoryHandler = async (e) => {
    const selectedSubName = e.target.value;
    setSubcategoryName(selectedSubName);
  };

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
      <div className="mb-5">
        <label
          htmlFor="base-input-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category
        </label>

        <select
          type="select"
          id="category"
          {...register("category")}
          placeholder="select category"
          onChange={(e) => {
            categoryHandler(e);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          multiple
        >
          <option>Select a category</option>
          {category.map((value, index) => (
            <option key={index} value={value.name}>
              {value.name}
            </option>
          ))}
        </select>
        <div className="mb-5">
          <label
            htmlFor="base-input-1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sub Category
          </label>
          <select
            type="select"
            id="subcategory"
            {...register("subcategory")}
            placeholder="select category"
            onChange={(e) => {
              subcategoryHandler(e);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            multiple
          >
            <option>Select a subcategory</option>
            {subcategory.map((value, index) => (
              <option key={index} value={value.name}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-5 flex flex-row">
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
            {...register("coverImage")}
            onChange={() => widget.current.open()}
            className="hidden"
          />
          <label htmlFor="cover-image-upload" className="ml-2 cursor-pointer">
            <FontAwesomeIcon icon={faFileUpload} size="1x" />
          </label>
        </div>
        {errors.coverImage && (
          <span className="text-red">{errors.coverImage.message}</span>
        )}
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
            {...register("galleryImage")}
            onChange={() => widget.current.open()}
            className="hidden"
          />
          <label htmlFor="gallery-image-upload" className="ml-2 cursor-pointer">
            <FontAwesomeIcon icon={faFileUpload} size="1x" />
          </label>
        </div>
        {errors.galleryImage && (
          <span className="text-red">{errors.galleryImage.message}</span>
        )}
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
