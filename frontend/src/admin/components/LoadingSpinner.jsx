import React from 'react';

const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-16 text-text-muted">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    <p className="mt-4 text-sm">{label}</p>
  </div>
);

export default LoadingSpinner;
