import React, { useEffect, useRef, useState } from 'react';

function UploadWidget({ onImageUpload, isImage }) {
  const cloudinary = useRef();
  const widget = useRef();

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
