import React, { useEffect, useRef, useState } from "react";
import { userImage } from "../../Api/UserApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";

function UploadWidget({ onImageUpload, isImage }) {
  const cloudinary = useRef();
  const widget = useRef();

  const upload = async (data) => {
    try {
      const response = await userImage(data);
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
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          // Pass the uploaded image URL to the parent component
          onImageUpload(result.info.secure_url);
          upload(result.info.secure_url);
        }
      }
    );
  }, [onImageUpload]);

  return (
    <div className="flex justify-center items-center gap-2">
      <button className="font-semibold" onClick={() => widget.current.open()}>
        {isImage ? "Edit Image" : "Upload Image"}
      </button>
      <FontAwesomeIcon icon={faCloudUpload} />
    </div>
  );
}

export default UploadWidget;
