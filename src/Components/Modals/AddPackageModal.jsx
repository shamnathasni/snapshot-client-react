import React, { useState } from "react";

const AddPackageModal = ({ isOpen, onClose, onAddPackage }) => {
  const [packageDetails, setPackageDetails] = useState({
    category: "",
    subcategory: "",
    packageName: "",
    price: "",
    // Add more package details as needed
  });

  const handleInputChange = (e) => {
    setPackageDetails({
      ...packageDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPackage = () => {
    onAddPackage(packageDetails);
    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Content goes here */}
              {/* Input fields for package details */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Add Package
                </h3>
                <div className="mt-2">
                  {/* Category Dropdown */}
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={handleInputChange}
                    value={packageDetails.category}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="" disabled>Select Category</option>
                    {/* Add your category options here */}
                    <option value="camera">Camera</option>
                    <option value="video">Video</option>
                    <option value="both">Both</option>
                  </select>

                  {/* Subcategory Dropdown */}
                  <label htmlFor="subcategory" className="block mt-3 text-sm font-medium text-gray-700">
                    Subcategory
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    onChange={handleInputChange}
                    value={packageDetails.subcategory}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="" disabled>Select Subcategory</option>
                    {/* Add your subcategory options here */}
                    <option value="wedding">Wedding</option>
                    <option value="portrait">Portrait</option>
                    <option value="event">Event</option>
                    {/* Add more subcategories as needed */}
                  </select>

                  {/* Add more input fields as needed */}
                  <input
                    type="text"
                    name="packageName"
                    value={packageDetails.packageName}
                    onChange={handleInputChange}
                    placeholder="Package Name"
                    className="mt-3 p-2 border border-gray-300 rounded-md w-full"
                  />

                  <input
                    type="text"
                    name="price"
                    value={packageDetails.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className="mt-3 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
