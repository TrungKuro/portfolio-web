"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const AnimatedTooltip = ({
  items,
  classNameBg = "",
  classNameTitle = "",
  classNameSubTitle = "",
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
    isBg: boolean;
  }[];
  classNameBg?: string;
  classNameTitle?: string;
  classNameSubTitle?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const target = event.target as HTMLDivElement;
      const halfWidth = target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="relative"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div
                  className={cn(
                    "relative z-30 text-base font-bold text-white",
                    classNameTitle
                  )}
                >
                  {item.name}
                </div>
                <div className={cn("text-xs text-white", classNameSubTitle)}>
                  {item.designation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className={cn(
              "relative size-8 sm:size-9 md:size-10 lg:size-11 transition-transform hover:scale-110 hover:z-30 object-contain object-center",
              item.isBg ? classNameBg : ""
            )}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              onMouseMove={handleMouseMove}
            />
          </div>
        </div>
      ))}
    </>
  );
};
