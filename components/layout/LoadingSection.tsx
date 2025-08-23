import React from "react";

export const LoadingSection = () => {
  return (
    <div className="pt-30 pb-20">
      {/* Skeleton Container */}
      <div className="p-4 space-y-4 animate-pulse bg-background">
        {/* Skeleton Head */}
        <div className="h-6 w-1/3 bg-purple rounded"></div>
        {/* Skeleton Title */}
        <div className="h-4 w-full bg-lavender rounded"></div>
        {/* Skeleton Sub-Title */}
        <div className="h-4 w-5/6 bg-cool-gray rounded"></div>
        {/* Skeleton Content */}
        <div className="h-64 w-full bg-overlay-white rounded"></div>
      </div>
    </div>
  );
};
