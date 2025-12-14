import React from 'react';

const Progress = (props) => {
  // Destructure props for clarity
  const { value, type } = props;

  // Choose color based on type
  const getColor = () => {
    if (type === 'success') return 'bg-green-500';
    if (type === 'error') return 'bg-pink-600';
    if (type === 'warning') return 'bg-orange-600';
    return 'bg-blue-500'; // default color
  };

  return (
    <div className="w-[100px] h-[8px] bg-gray-200 rounded-md overflow-hidden">
      <span
        className={`block h-full ${getColor()} transition-all duration-500`}
        style={{ width: `${value}%` }}
      ></span>
    </div>
  );
};

export default Progress;
