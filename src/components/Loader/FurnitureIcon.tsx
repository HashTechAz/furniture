import React from 'react';

const FurnitureIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M6 19V11C6 9.34315 7.34315 8 9 8H15C16.6569 8 18 9.34315 18 11V19" 
        stroke="#2D303B" 
        strokeWidth="1.5"
      />
      <path 
        d="M6 15H18" 
        stroke="#2D303B" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M6 19V21" 
        stroke="#2D303B" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M18 19V21" 
        stroke="#2D303B" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M5 11H6" 
        stroke="#2D303B" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M18 11H19" 
        stroke="#2D303B" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M9 5L9.5 8" 
        stroke="#2D303B" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M15 5L14.5 8" 
        stroke="#2D303B" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M7 5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5" 
        stroke="#2D303B" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default FurnitureIcon;
