import React from "react";

const Button = React.memo(({ children, className = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-5 mt-6 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
    >
      {children}
    </button>
  );
});

export default Button;
