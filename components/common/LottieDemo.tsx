import React from "react";
import Lottie from "react-lottie";
import animationData from "@/data/confetti.json";

export const LottieDemo = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <Lottie
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
