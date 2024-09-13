import React, { useEffect, useRef } from "react";

const Modal = React.memo(({ isOpen = false, onClose, children, title = '' }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 min-w-[550px] min-h-[300px] flex flex-col justify-around"
      >
        <div className="text-2xl font-bold mb-4">{title}</div>
        {children}
      </div>
    </div>
  );
});

export default Modal;
