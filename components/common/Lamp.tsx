"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const Lamp = ({
  heightFrame = 100, // đơn vị [vh]
  scaleY = 125, // đơn vị %
  // scaleX = 150, // đơn vị %
  background = "slate-950",
  colorLamp = "cyan-400",
  lightInner = "cyan-400",
  lightOuter = "cyan-500",
  className = "",
}: {
  heightFrame?: number;
  scaleY?: number;
  // scaleX?: number;
  background?: string;
  colorLamp?: string;
  lightInner?: string;
  lightOuter?: string;
  className?: string;
}) => {
  const getColor = (color: string) => {
    // Bảng ánh xạ một số màu tailwind phổ biến sang mã hex
    const colorMap: Record<string, string> = {
      "slate-950": "#020617",
      "cyan-400": "#22d3ee",
      "cyan-500": "#06b6d4",
      transparent: "transparent",
      // Thêm các màu khác nếu cần
      "black-100": "rgba(0, 3, 25, 1)",
    };
    return colorMap[color] || color;
  };

  return (
    <div
      className={cn("relative flex w-full z-0", className)}
      style={{
        height: `${heightFrame}vh`,
        backgroundColor: getColor(background) || undefined,
      }}
    >
      <div
        className="relative flex items-center justify-center w-full isolate z-0"
        style={{
          transform: `scaleY(${scaleY / 100})`,
        }}
      >
        {/* Mái che đèn */}
        <div
          className="absolute z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{
            backgroundColor: getColor(background) || undefined,
          }}
        />
        {/* Thân đèn */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute z-50 h-1 w-[30rem] rounded-full -translate-y-[7rem]"
          style={{
            backgroundColor: getColor(colorLamp) || undefined,
          }}
        />
        {/* Vùng ánh sáng "trung tâm" của ĐÈN */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{
            backgroundColor: getColor(lightInner) || undefined,
          }}
        />
        {/* Vùng ánh sáng "viền ngoài" của ĐÈN */}
        <div
          className="absolute z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            backgroundColor: getColor(lightOuter) || undefined,
          }}
        />
        {/* Vùng ánh sáng chuyển động theo THÂN ĐÈN khi mở rộng bên TRÁI */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div
            className="absolute w-[100%] left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{
              backgroundColor: getColor(background) || undefined,
            }}
          />
          <div
            className="absolute w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"
            style={{
              backgroundColor: getColor(background) || undefined,
            }}
          />
        </motion.div>
        {/* Vùng ánh sáng chuyển động theo THÂN ĐÈN khi mở rộng bên PHẢI */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute left-1/2 h-56 w-[30rem] bg-gradient-conic text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div
            className="absolute w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"
            style={{
              backgroundColor: getColor(background) || undefined,
            }}
          />
          <div
            className="absolute w-[100%] right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{
              backgroundColor: getColor(background) || undefined,
            }}
          />
        </motion.div>
        {/* Vùng ánh sáng "trung tâm" dưới ĐẤT */}
        {/* <div
          className="absolute top-1/2 h-48 w-full translate-y-12 blur-2xl"
          style={{
            backgroundColor: getColor(background) || undefined,
            transform: `scaleX(${scaleX / 100})`,
          }}
        /> */}
        {/* Vùng ánh sáng "viền ngoài" dưới ĐẤT */}
        {/* <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" /> */}
      </div>
    </div>
  );
};
