"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  //! Tham chiếu của <div> CONTAINER
  const containerRef = useRef<HTMLDivElement>(null);
  //! Tham chiếu của <div> INTERACTIVE so với VIEWPORT
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  //! Dùng "useRef" phù hợp lưu snapshot ban đầu, để không phải đưa những dữ liệu này vào Array Dependencies theo yêu cầu của ESLint
  //
  // Những dữ liệu này được sử dụng theo cách cố định, không thay đổi trong suốt thời gian component render
  // Nên không cần phải đưa vào [] để theo sát giá trị mới và làm tăng thêm quá trình so sánh để phát hiện re-render
  // Đặc biệt nếu [] chứa object/array/function sẽ làm render liên tục (vì so sánh === sẽ luôn khác, khiến effect chạy lại liên tục)
  // Các dữ liệu này được lưu trữ trong suốt vòng đời component, chi phí bộ nhớ rất nhỏ (thường không đáng kể so với DOM)
  //
  const gradientBackgroundStartRef = useRef(gradientBackgroundStart);
  const gradientBackgroundEndRef = useRef(gradientBackgroundEnd);
  const firstColorRef = useRef(firstColor);
  const secondColorRef = useRef(secondColor);
  const thirdColorRef = useRef(thirdColor);
  const fourthColorRef = useRef(fourthColor);
  const fifthColorRef = useRef(fifthColor);
  const pointerColorRef = useRef(pointerColor);
  const sizeRef = useRef(size);
  const blendingValueRef = useRef(blendingValue);

  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStartRef.current
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEndRef.current
    );
    document.body.style.setProperty("--first-color", firstColorRef.current);
    document.body.style.setProperty("--second-color", secondColorRef.current);
    document.body.style.setProperty("--third-color", thirdColorRef.current);
    document.body.style.setProperty("--fourth-color", fourthColorRef.current);
    document.body.style.setProperty("--fifth-color", fifthColorRef.current);
    document.body.style.setProperty("--pointer-color", pointerColorRef.current);
    document.body.style.setProperty("--size", sizeRef.current);
    document.body.style.setProperty(
      "--blending-value",
      blendingValueRef.current
    );
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }

      // Smooth animation: gradually move towards target position
      setCurX((prevCurX) => {
        const newCurX = prevCurX + (tgX - prevCurX) / 5;
        return newCurX;
      });
      setCurY((prevCurY) => {
        const newCurY = prevCurY + (tgY - prevCurY) / 5;
        return newCurY;
      });
    }

    move();
  }, [tgX, tgY]);

  // Apply transform whenever curX or curY changes
  useEffect(() => {
    if (interactiveRef.current) {
      interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
    }
  }, [curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && interactiveRef.current) {
      // Lấy vị trí của CONTAINER so với VIEWPORT
      const containerRect = containerRef.current.getBoundingClientRect();

      //! event.clientX và event.clientY là vị trí của con trỏ chuột so với VIEWPORT (không phải so với element)

      // Tính vị trí con trỏ chuột so với CONTAINER
      const mouseXInContainer = event.clientX - containerRect.left;
      const mouseYInContainer = event.clientY - containerRect.top;

      // Tính vị trí cần transform để tâm INTERACTIVE nằm tại vị trí con trỏ chuột
      // INTERACTIVE có kích thước full container, nên tâm ban đầu ở giữa container
      const containerCenterX = containerRect.width / 2;
      const containerCenterY = containerRect.height / 2;

      // Offset cần thiết để di chuyển tâm INTERACTIVE đến vị trí con trỏ
      const targetX = mouseXInContainer - containerCenterX;
      const targetY = mouseYInContainer - containerCenterY;

      setTgX(targetX);
      setTgY(targetY);
    }
  };

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      //! Đây là CONTAINER
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "hover:cursor-move w-full h-full absolute overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={className}>{children}</div>

      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-100`
          )}
        />

        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-100`
          )}
        />

        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-100`
          )}
        />

        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)]`,
            `animate-fourth`,
            `opacity-70`
          )}
        />

        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-100`
          )}
        />

        {interactive && (
          <div
            //! Đây là INTERACTIVE
            ref={interactiveRef}
            // TÂM GIỮA của INTERACTIVE sẽ nằm ngay chính giữa TÂM của CONTAINER lúc đầu
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full top-0 left-0`,
              `opacity-70`
            )}
          />
        )}
      </div>
    </div>
  );
};
