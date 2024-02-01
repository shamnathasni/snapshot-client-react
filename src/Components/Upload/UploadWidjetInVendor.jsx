import React, { useEffect, useRef, useState } from "react";
import { uploadStudioImages } from "../../Api/VendorApi";

function UploadWidgetInVendor({studioId}) {
  const cloudinary = useRef();
  const widget = useRef();

  const upload = async (data) => {
    try {
      const response = await uploadStudioImages(data,studioId)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    cloudinary.current = window.cloudinary;
    widget.current = cloudinary.current.createUploadWidget(
      {
        cloudName: "ddaksct8s",
        uploadPreset: "ro65vieu",
        multiple: true,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          // Pass the uploaded image URL to the parent component
          upload(result.info.secure_url);
        }
      }
    );
  }, [upload]);

  return (
    <div className="flex justify-center items-center gap-2">
      <button className="font-semibold bg-[#872341] text-white w-[60px] text-center rounded-[9px] mb-3 p-2" onClick={() => widget.current.open()}>
        Add+
      </button>
     
    </div>
  );
}

export default UploadWidgetInVendor;
