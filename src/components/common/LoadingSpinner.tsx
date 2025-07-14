import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-10 space-x-2">
    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <span className="text-blue-500">로딩 중...</span>
  </div>
);

export default LoadingSpinner;
