"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/assets/lottie/topictalk-icon.json";

export const LottieDemo = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
        className="h-[50%] w-auto"
      />
    </div>
  );
};
