import React from "react";

const TextBox = ({ label = '', text = '', isEditable = false, setText = () => {} }) => {
  return (
    <div className="flex flex-col">
      <label className="text-left text-base font-medium text-gray-500">
        {label}
      </label>
      <input
        type="text"
        value={text}
        readOnly={!isEditable}
        onChange={(e) => setText(e.target.value)}
        className={`mt-1 p-2 border border-gray-300 rounded-md sm:text-sm focus:outline-none ${isEditable ? "bg-white" : "bg-[#f9f9f9]"}`}
      />
    </div>
  );
};

export default React.memo(TextBox);
