/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

export const IconCloud = ({ icons, images, className }: IconCloudProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);
  const animationFrameRef = useRef<number>(null);
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);

  const sizeRender = 40; //! Là kích thước gốc khi render
  const dprRef = useRef<number>(1);
  const displaySizeRef = useRef<{ width: number; height: number }>({
    width: 400,
    height: 400,
  });

  // Create icon canvases once when icons/images change
  useEffect(() => {
    if (!icons && !images) return;

    const items = icons || images || [];
    imagesLoadedRef.current = new Array(items.length).fill(false);

    const newIconCanvases = items.map((item, index) => {
      const pixelRatio = (window.devicePixelRatio || 1) * 1.25; //! Điều chỉnh theo "devicePixelRatio" có "oversample" nhẹ
      const size = sizeRender * pixelRatio; //! Tăng từ "sizeRender" lên độ phân giải "pixelRatio" lần

      const offscreen = document.createElement("canvas");
      offscreen.width = size;
      offscreen.height = size;
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        //! Sử dụng "devicePixelRatio" cho màn hình độ phân giải cao
        offCtx.scale(pixelRatio, pixelRatio);

        //! Bật anti-aliasing cho context
        offCtx.imageSmoothingEnabled = true;
        offCtx.imageSmoothingQuality = "high";

        if (images) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index] as string;
          img.onload = async () => {
            try {
              await img.decode(); // Thêm decode() để đảm bảo ảnh được load hoàn toàn
              offCtx.clearRect(0, 0, sizeRender, sizeRender);
              offCtx.drawImage(img, 0, 0, sizeRender, sizeRender);
              imagesLoadedRef.current[index] = true;
            } catch (error) {
              // console.warn(`Failed to decode image ${index}:`, error);
              imagesLoadedRef.current[index] = true; // Vẫn đánh dấu loaded
            }
          };
        } else {
          const svgString = renderToString(item as React.ReactElement);
          const optimizedSvg = svgString
            .replace(/\s+/g, " ") // Loại bỏ whitespace thừa
            .replace(/<!--.*?-->/g, "") // Loại bỏ comments
            .trim(); //! Optimize SVG string trước khi encode

          const img = new Image();
          img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            optimizedSvg
          )}`; //! Sử dụng encodeURIComponent thay vì btoa cho UTF-8 support
          img.onload = async () => {
            try {
              await img.decode();
              offCtx.clearRect(0, 0, sizeRender, sizeRender);
              offCtx.drawImage(img, 0, 0, sizeRender, sizeRender);
              imagesLoadedRef.current[index] = true;
            } catch (error) {
              // console.warn(`Failed to decode SVG ${index}:`, error);
              imagesLoadedRef.current[index] = true;
            }
          };
        }
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const items = icons || images || [];
    const newIcons: Icon[] = [];
    const numIcons = items.length || 20;

    // Fibonacci sphere parameters
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      newIcons.push({
        x: x * 100,
        y: y * 100,
        z: z * 100,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = displaySizeRef.current.width / 2 + rotatedX;
      const screenY = displaySizeRef.current.height / 2 + rotatedY;

      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );

        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    });

    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //! Bật anti-aliasing cho context
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const centerX = displaySizeRef.current.width / 2;
      const centerY = displaySizeRef.current.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) {
          setTargetRotation(null);
        }
      } else if (!isDragging) {
        rotationRef.current = {
          x:
            rotationRef.current.x +
            (dy / displaySizeRef.current.height) * speed,
          y:
            rotationRef.current.y + (dx / displaySizeRef.current.width) * speed,
        };
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));

        ctx.save();
        ctx.translate(
          displaySizeRef.current.width / 2 + rotatedX,
          displaySizeRef.current.height / 2 + rotatedY
        );
        ctx.scale(scale, scale);

        // 1) Draw blurred, rounded white background (not affecting image sharpness)
        const pad = 6; // extra margin around icon (proportional to icon base size)
        const bgSize = sizeRender + pad * 2;
        const radius = 8; // rounded corner radius
        const blurPx = 6; // desired blur in CSS px (constant in screen px)
        ctx.save();
        ctx.filter = `blur(${(blurPx / Math.max(0.001, scale)).toFixed(2)}px)`; // keep blur constant vs depth
        ctx.globalAlpha = 1; // background alpha independent from depth
        ctx.fillStyle = "rgba(253, 253, 254, 0.70)";
        drawRoundedRect(
          ctx,
          -(bgSize / 2),
          -(bgSize / 2),
          bgSize,
          bgSize,
          radius
        );
        ctx.fill();
        ctx.restore();

        // 2) Draw the icon sharply
        ctx.globalAlpha = opacity; // keep your depth fade for the icon
        if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          //! Vẽ với kích thước "sizeRender"x"sizeRender" nhưng từ canvas có "size"x"size" lớn hơn (downscaling cho chất lượng tốt hơn)
          ctx.drawImage(
            iconCanvasesRef.current[index],
            -(sizeRender / 2),
            -(sizeRender / 2),
            sizeRender,
            sizeRender
          );
        }

        ctx.restore();
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation]);

  // Context settings + handle DPR & resize
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      dprRef.current = dpr;

      const width = Math.round(rect.width || 400);
      const height = Math.round(rect.height || 400);
      displaySizeRef.current = { width, height };

      // Buffer size in device pixels
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));

      // Keep visual size in CSS pixels
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
        ctx.scale(dpr, dpr); // draw in CSS pixels
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
    };

    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 400, height: 400 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn(
        "rounded-lg hover:cursor-grab active:cursor-grabbing",
        className
      )}
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  );
};
