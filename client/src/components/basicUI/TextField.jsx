import React from "react";

const TextField = React.memo(({ placeholder = '', type = 'text', value = '', onChange = () => {} }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-4 mt-6 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
});

export default TextField;
