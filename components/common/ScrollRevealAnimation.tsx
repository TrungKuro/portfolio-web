// Scroll Reveal Animation: "fade-in" + "slide-in"

"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  duration?: number;
}

export default function Reveal({
  children,
  delay = 0,
  threshold = 0.2,
  duration = 0.8,
}: RevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  // inView : false -> true  | from "hidden"  to "visible"
  // inView : true  -> false | from "visible" to "hidden"

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration, delay }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}
