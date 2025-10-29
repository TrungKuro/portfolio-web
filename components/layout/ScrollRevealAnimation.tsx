"use client";

import { motion, useAnimate } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  threshold?: number;
  duration?: number;
  disableOnMobile?: boolean; // Prop mới
}

export const ScrollRevealAnimation = ({
  children,
  threshold = 0.2,
  duration = 0.8,
  disableOnMobile = false, // Mặc định false để giữ behavior cũ
}: RevealProps) => {
  const [scope, animate] = useAnimate();
  const [ref, inView] = useInView({ threshold });
  const [isMdOrLarger, setIsMdOrLarger] = useState(true); // Mặc định true để tránh flash

  // Kiểm tra breakpoint md (768px)
  useEffect(() => {
    if (!disableOnMobile) return; // Không cần check nếu không disable

    const checkScreenSize = () => {
      setIsMdOrLarger(window.innerWidth >= 768); // md breakpoint
    };

    // Check lần đầu
    checkScreenSize();

    // Listen resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [disableOnMobile]);

  // Sử dụng hiệu ứng fade + zoom (opacity + scale)
  useEffect(() => {
    // Nếu disableOnMobile = true và màn hình < md, bỏ qua animation
    if (disableOnMobile && !isMdOrLarger) {
      animate(
        scope.current,
        { opacity: 1, scale: 1 },
        { duration: 0 }, // Instant, không có animation
      );
      return;
    }

    if (inView) {
      animate(
        scope.current,
        { opacity: 1, scale: 1 },
        { duration: duration, ease: "easeOut" },
      );
    } else {
      animate(
        scope.current,
        { opacity: 0, scale: 0.9 },
        { duration: duration, ease: "easeIn" },
      );
    }
  }, [inView, animate, scope, duration, disableOnMobile, isMdOrLarger]);

  return (
    <motion.div ref={scope}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
