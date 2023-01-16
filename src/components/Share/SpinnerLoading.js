import React from "react";

const SpinnerLoading = () => {
  return (
    <div className="flex items-center justify-center align-center min-h-screen ">
      <div className="w-16 h-16 border-b-2 border-orange-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinnerLoading;
