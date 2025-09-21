import React from "react";

export const LoadingSection = () => {
  return (
    <div className="pt-30 pb-20">
      {/* Skeleton Container */}
      <div className="animate-pulse space-y-4 bg-background p-4">
        {/* Skeleton Head */}
        <div className="h-6 w-1/3 rounded bg-purple"></div>
        {/* Skeleton Title */}
        <div className="h-4 w-full rounded bg-lavender"></div>
        {/* Skeleton Sub-Title */}
        <div className="h-4 w-5/6 rounded bg-cool-gray"></div>
        {/* Skeleton Content */}
        <div className="h-64 w-full rounded bg-overlay-white"></div>
      </div>
    </div>
  );
};
