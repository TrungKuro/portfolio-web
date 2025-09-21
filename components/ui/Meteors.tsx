"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MeteorData {
  delay: number;
  duration: number;
}

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;
  const [meteorData, setMeteorData] = useState<MeteorData[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Tạo Meteors Array trực tiếp trong useEffect, thay vì tạo "meteors" ngoài sẽ bị ESLint yêu cầu đặt vào Array Dependencies
    const meteors = new Array(meteorCount).fill(true);

    // Generate random values only on the client side
    const data = meteors.map(() => ({
      delay: Math.random() * 5, // Random delay between 0-5s
      duration: Math.floor(Math.random() * (10 - 5) + 5), // Random duration between 5-10s
    }));
    setMeteorData(data);
    setIsClient(true);
  }, [meteorCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Tạo Meteors Array để render */}
      {Array.from({ length: meteorCount }, (_, idx) => {
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered

        // Use default values during SSR, actual random values after hydration
        const delay = isClient && meteorData[idx] ? meteorData[idx].delay : 0;
        const duration =
          isClient && meteorData[idx] ? meteorData[idx].duration : 5;

        return (
          <span
            key={`meteor=${idx}`}
            className={cn(
              "absolute h-0.5 w-0.5 rotate-[45deg] animate-meteor-effect rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px", // Start above the container
              left: position + "px",
              animationDelay: delay + "s",
              animationDuration: duration + "s",
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
