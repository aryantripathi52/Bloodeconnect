import React from 'react';

const StatusBadge = ({ status, type = 'default' }) => {
  const types = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${types[type] || types.default} uppercase tracking-wider`}>
      {status}
    </span>
  );
};

export default StatusBadge;
