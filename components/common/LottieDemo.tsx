"use client";

import React from "react";
import Lottie from "react-lottie";
import animationData from "@/public/assets/lottie/topictalk-icon.json";

export const LottieDemo = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <Lottie
        height={"50%"}
        width={"auto"}
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
      />
    </div>
  );
};
