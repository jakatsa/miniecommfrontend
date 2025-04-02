import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Please wait while we load the application...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
