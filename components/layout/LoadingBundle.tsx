import React from "react";

export const LoadingBundle = () => {
  return (
    <div className="container-item-grid z-15 bg-background">
      {/*
       * Spinner Loading Icon
       * - "fallback" trong giai đoạn tải BUNDLE component
       */}
      <div className="loader-atomic" />
    </div>
  );
};
