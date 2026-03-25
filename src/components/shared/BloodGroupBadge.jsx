import React from 'react';

const BloodGroupBadge = ({ group, size = 'md' }) => {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5 font-bold'
  };

  return (
    <span className={`${sizes[size]} bg-primary-light text-primary border border-primary/20 rounded-md font-bold inline-flex items-center justify-center`}>
      {group}
    </span>
  );
};

export default BloodGroupBadge;
