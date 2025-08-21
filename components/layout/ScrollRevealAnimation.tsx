"use client";

import { motion, useAnimate } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface RevealProps {
  children: React.ReactNode;
  threshold?: number;
  duration?: number;
}

export const ScrollRevealAnimation = ({
  children,
  threshold = 0.2,
  duration = 0.8,
}: RevealProps) => {
  const [scope, animate] = useAnimate();
  const [ref, inView] = useInView({ threshold });

  //! Sử dụng hiệu ứng fade + zoom (opacity + scale)
  useEffect(() => {
    if (inView) {
      animate(
        scope.current,
        { opacity: 1, scale: 1 },
        { duration: duration, ease: "easeOut" }
      );
    } else {
      animate(
        scope.current,
        { opacity: 0, scale: 0.9 },
        { duration: duration, ease: "easeIn" }
      );
    }
  }, [inView, animate, scope, duration]);

  return (
    <motion.div ref={scope}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
