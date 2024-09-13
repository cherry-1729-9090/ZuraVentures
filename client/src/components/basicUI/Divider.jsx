import React from 'react';

const Divider = ({ className = '' }) => {
  return (
    <div className={`w-[80%] h-[1px] bg-slate-300 ${className}`}></div>
  );
};

export default Divider;
