"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
  allowExpandToParent = false, // dùng khi muốn CHILDREN mở rộng kích thước theo PARENT (không cần đặt kích thước cố định)
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
  allowExpandToParent?: boolean;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)",
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <a
      className={cn(
        "group/pin relative z-50 cursor-pointer",
        containerClassName,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || "/"}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Invisible wrapper để tạo chiều cao thực cho grid
       *
       * Vì CHILDREN được lồng liên tiếp trong 2 lớp <div> có POSITION ABSOLUTE
       * Mà các lớp <div> lại lấy kích thước theo lớp <a> POSITION RELATIVE
       * Trong khi lớp <a> lại không nhận được kích thước trực tiếp từ CHILDREN
       * Nên cần lớp <div> "vô hình" này lấy kích thước của CHILDREN cộng sẵn với kích thước "viền khung hình" cho <a>
       */}
      {allowExpandToParent ? (
        <div
          className={cn(
            // Sau khi có toàn bộ kích thước của phần tử CHILDREN
            // Cần đệm thêm PADDING 18px = PADDING 14px + BORDER 2px
            // Để cung cấp kích thước cho <a>
            "invisible p-[18px]",
            className,
          )}
        >
          {children}
        </div>
      ) : null}

      {/* Visible content với absolute positioning */}
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          allowExpandToParent ? "h-full w-full" : "", // !!!
        )}
      >
        <div
          style={{
            transform: transform,
          }}
          className={cn(
            // Đây là kích thước "viền khung hình" bọc quanh CHILDREN
            // p-4      -> 16px
            // border-2 -> 2px
            "absolute top-1/2 left-1/2 flex items-start justify-start overflow-hidden rounded-2xl border-2 border-white/[0.1] p-4 shadow-[0_8px_16px_rgb(0_0_0/0.4)] transition duration-700 group-hover/pin:border-white/[0.2]",
            allowExpandToParent ? "h-full w-full" : "", // !!!
          )}
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>

      <PinPerspective title={title} />
    </a>
  );
};

export const PinPerspective = ({ title }: { title?: string }) => {
  return (
    <motion.div className="pointer-events-none z-[60] flex h-full w-full items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100">
      <div className="inset-0 -mt-7 h-full w-full flex-none">
        {/* Khung nội dung "link" của CARD */}
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div className="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10">
            {/* Đường dẫn */}
            <span className="relative z-20 inline-block py-0.5 text-xs/5 font-medium tracking-wide text-[#fdfdfe]">
              {title}
            </span>

            {/* Hiệu ứng màu viền dưới của khung */}
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40" />
          </div>
        </div>

        {/* Hiệu ứng tâm chấn của CARD */}
        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          //! ml-[0.09375rem] mt-4
          className="absolute top-1/2 left-1/2 mt-4 ml-[0.09375rem] -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute top-1/2 left-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute top-1/2 left-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute top-1/2 left-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>

        <>
          {/* Thân PIN */}
          <motion.div className="absolute right-1/2 bottom-1/2 h-1/4 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-cyan-500 blur-[2px] transition-transform group-hover/pin:h-1/2" />
          <motion.div className="absolute right-1/2 bottom-1/2 h-1/4 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-cyan-500 transition-transform group-hover/pin:h-1/2" />

          {/* Tâm PIN */}
          <motion.div className="absolute right-1/2 bottom-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-cyan-600 blur-[3px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-cyan-300" />
        </>
      </div>
    </motion.div>
  );
};
