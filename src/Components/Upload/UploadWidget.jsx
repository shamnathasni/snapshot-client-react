import React, { useEffect, useRef, useState } from 'react';
import {userImage} from "../../Api/UserApi"

function UploadWidget({ onImageUpload, isImage }) {
  const cloudinary = useRef();
  const widget = useRef();

  const upload =async(data)=>{
    try {
      const response = await userImage(data)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    cloudinary.current = window.cloudinary;
    widget.current = cloudinary.current.createUploadWidget(
      {
        cloudName: 'ddaksct8s',
        uploadPreset: 'ro65vieu',
      },
       function (error, result) {
        if (!error && result && result.event === 'success') {
          // Pass the uploaded image URL to the parent component
          onImageUpload(result.info.secure_url);
           upload(result.info.secure_url)
        }
      }
    );
  }, [onImageUpload]);

  return (
    <div>
      <button onClick={() => widget.current.open()}>{isImage ? "Edit image" : "Upload image"}</button>
    </div>
  );
}

export default UploadWidget;
