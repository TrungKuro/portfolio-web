import React from "react";

export const LoadingBundle = () => {
  return (
    <div className="container-item-grid bg-background z-15">
      {/*
       * Spinner Loading Icon
       * - "fallback" trong giai đoạn tải BUNDLE component
       */}
      <div className="loader-atomic" />
    </div>
  );
};
