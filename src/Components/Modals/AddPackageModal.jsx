import React, { useEffect, useState } from "react";
import { vendorCategory } from "../../Api/VendorApi";

const AddPackageModal = ({ isOpen, onClose, onAddPackage }) => {
  const [localState, setLocalState] = useState({
    camera: "",
    video: "",
    both: "",
    categoryName: "",
    subCategoryName: "",
  });

  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  const { camera, video, both, categoryName, subCategoryName } = localState;

  const handleAddPackage = async () => {
    try {
      // Pass the local state to the onAddPackage function
      onAddPackage(localState);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    vendorCategory().then((response) => {
      const vendorCategory = response.data.vendorCategory;
      setCategory(vendorCategory);
    });
  }, []);

  const categoryHandler = (e) => {
    const selectedName = e.target.value;
    setLocalState((prevState) => ({
      ...prevState,
      categoryName: selectedName,
    }));
    const selectedCategory = category.find(
      (category) => category.name === selectedName
    );
    setSubcategory(selectedCategory.subcategory);
  };

  const subcategoryHandler = (e) => {
    const selectedSubName = e.target.value;
    setLocalState((prevState) => ({
      ...prevState,
      subCategoryName: selectedSubName,
    }));
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto z-40`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Content goes here */}
              {/* Input fields for package details */}
              <div className="mt-3 text-center sm:mt-0 w-full sm:text-left">
                <h3
                  className="text-lg leading-6 text-center font-medium text-gray-900"
                  id="modal-headline"
                >
                  Add Package
                </h3>
                <div className="mt-2">
                  {/* Category Dropdown */}
                  <label
                    htmlFor="category"
                    className="block font-sans font-bold text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={categoryName}
                    onChange={(e) => {
                      categoryHandler(e);
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {category.map((value, index) => (
                      <option key={index} value={value.name}>
                        {value.name}
                      </option>
                    ))}
                  </select>

                  {/* Subcategory Dropdown */}
                  <label
                    htmlFor="subcategory"
                    className="block mt-3 font-sans font-bold text-gray-700"
                  >
                    Subcategory
                  </label>
                  <select
                    id="subCategory"
                    name="subCategory"
                    value={subCategoryName}
                    placeholder="select category"
                    onChange={(e) => {
                      subcategoryHandler(e);
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="" disabled>
                      Select Subcategory
                    </option>
                   
                    {subcategory.map((value, index) => (
                      <option key={index} value={value.name}>
                        {value.name}
                      </option>
                    ))}
                  </select>

                  {/* Add more input fields as needed */}
                  <div className="flex flex-row">
                    <label className="w-1/3 py-4 font-sans font-bold">
                      for Camera:
                    </label>
                    <input
                      type="number"
                      name="camera"
                      value={camera}
                      onChange={handleChange}
                      placeholder="₹ Price"
                      className="mt-3 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div className="flex flex-row">
                    <label className="w-1/3 py-4 font-sans font-bold">
                      for Video:
                    </label>
                    <input
                      type="number"
                      name="video"
                      value={video}
                      onChange={handleChange}
                      placeholder="₹ Price"
                      className="mt-3 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div className="flex flex-row">
                    <label className="w-1/3 py-4 font-sans font-bold ">
                      Both :
                    </label>
                    <input
                      type="number"
                      name="both"
                      value={both}
                      onChange={handleChange}
                      placeholder="₹ Price"
                      className="mt-3 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center ">
            <button
              onClick={handleAddPackage}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#872341] text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add Package
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
