// Modal.js
import React from "react";

function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#e5bac7] bg-opacity-50">
      <div className="bg-white flex  flex-col items-center justify-center p-6 rounded-md">
        {children}
        <button
          onClick={onClose}
          className="mt-4 text-[#872341] hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
