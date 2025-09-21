import React from "react";

export const LoadingWait = () => {
  return (
    <div className="container-item-grid z-15 bg-background">
      {/*
       * Spinner Loading Icon
       * - "fallback" trong giai đoạn trước khi tải BUNDLE component
       */}
      <div className="loader-gear" />
    </div>
  );
};
