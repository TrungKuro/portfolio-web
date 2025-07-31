"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const TypewriterEffect = ({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 1000,
  loopDelay = 2000,
  textClassName,
  showCursor = true,
  loop = true,
  startDelay = 10,
}: {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  loopDelay?: number;
  textClassName?: string;
  showCursor?: boolean;
  loop?: boolean;
  startDelay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (texts.length === 0) return;

    const startAnimation = () => {
      let timeout;

      if (isTyping) {
        // Typing animation
        if (charIndex < Array.from(texts[currentIndex]).length) {
          timeout = setTimeout(() => {
            const characters = Array.from(texts[currentIndex]);
            setDisplayText(characters.slice(0, charIndex + 1).join(""));
            setCharIndex((prev) => prev + 1);
          }, typeSpeed);
        } else {
          // Finished typing current text
          timeout = setTimeout(() => {
            setIsTyping(false);
            setCharIndex(texts[currentIndex].length);
          }, pauseTime);
        }
      } else {
        // Deleting animation
        if (charIndex > 0) {
          timeout = setTimeout(() => {
            const characters = Array.from(texts[currentIndex]);
            setDisplayText(characters.slice(0, charIndex - 1).join(""));
            setCharIndex((prev) => prev - 1);
          }, deleteSpeed);
        } else {
          // Finished deleting, move to next text
          const nextIndex = (currentIndex + 1) % texts.length;

          if (nextIndex === 0 && !loop) {
            // If not looping and reached the end, stop
            return;
          }

          timeout = setTimeout(
            () => {
              setCurrentIndex(nextIndex);
              setIsTyping(true);
              setCharIndex(0);
            },
            nextIndex === 0 ? loopDelay : pauseTime
          );
        }
      }

      return () => clearTimeout(timeout);
    };

    const initialTimeout = setTimeout(startAnimation, startDelay);
    return () => clearTimeout(initialTimeout);
  }, [
    texts,
    currentIndex,
    charIndex,
    isTyping,
    typeSpeed,
    deleteSpeed,
    pauseTime,
    loopDelay,
    loop,
    startDelay,
  ]);

  return (
    <p
      className={cn(textClassName ?? "text-5xl text-white uppercase font-bold")}
    >
      {displayText}
      {showCursor && (
        <span
          className="border-r-2 border-white animate-pulse"
          aria-hidden="true"
        ></span>
      )}
    </p>
  );
};
