"use client";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "motion/react";

// Context để chia sẻ "ref" của CONTAINER giữa các CARD
const DraggableContainerContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null);

// CARD có thể kéo thả với hiệu ứng 3D
export const DraggableCardBody = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  // Giá trị vị trí chuột tương đối so với tâm thẻ
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls(); // Điều khiển animation thủ công

  // Tính toán vận tốc của chuột khi di chuyển (để tạo hiệu ứng vật lý)
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  // Cấu hình spring cho hiệu ứng đàn hồi mượt mà
  const springConfig = {
    stiffness: 100, // Độ cứng lò xo
    damping: 20, // Độ giảm chấn
    mass: 0.5, // Khối lượng vật thể
  };

  // Hiệu ứng xoay theo trục X (lên/xuống) dựa trên vị trí chuột Y
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]), // Chuột lên trên → xoay xuống, chuột xuống dưới → xoay lên
    springConfig
  );

  // Hiệu ứng xoay theo trục Y (trái/phải) dựa trên vị trí chuột X
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]), // Chuột trái → xoay trái, chuột phải → xoay phải
    springConfig
  );

  // Hiệu ứng độ mờ - thẻ sáng nhất ở giữa, mờ dần ở 2 bên
  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig
  );

  // Hiệu ứng ánh sáng phản chiếu - tạo độ bóng nhẹ ở 2 bên
  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig
  );

  // Xử lý khi chuột di chuyển trên thẻ
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e; // Vị trí chuột trong viewport

    // Lấy thông tin vị trí và kích thước của thẻ
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };

    // Tính tâm của thẻ
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Tính khoảng cách từ chuột đến tâm thẻ
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Cập nhật giá trị motion để tạo hiệu ứng
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  // Reset hiệu ứng khi chuột rời khỏi thẻ
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag // Cho phép kéo thả
      dragConstraints={React.useContext(DraggableContainerContext) || undefined} // Sử dụng CONTAINER constraint
      onClick={onClick} // Thêm onClick handler
      onDragEnd={(event, info) => {
        // Reset góc xoay về 0 với hiệu ứng spring
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        });

        // Lấy vận tốc hiện tại của thẻ khi thả
        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();

        // Tính độ lớn tổng vận tốc (theo công thức Pythagoras)
        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX +
            currentVelocityY * currentVelocityY
        );

        // Tính độ nảy dựa trên vận tốc (càng nhanh càng nảy nhiều, tối đa 0.8)
        const bounce = Math.min(0.8, velocityMagnitude / 1000);

        // Tạo hiệu ứng quán tính cho trục X
        animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1], // Ease curve tùy chỉnh
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });

        // Tạo hiệu ứng quán tính cho trục Y
        animate(info.point.y, info.point.y + currentVelocityY * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });
      }}
      style={{
        rotateX, // Áp dụng xoay X
        rotateY, // Áp dụng xoay Y
        opacity, // Áp dụng độ mờ
        willChange: "transform", // Tối ưu performance cho transform
      }}
      animate={controls} // Sử dụng animation controls
      whileHover={{ scale: 1.02 }} // Phóng to nhẹ khi hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "flex flex-col justify-between items-center overflow-hidden shadow-2xl shadow-foreground/10 transform-3d bg-background",
        "rounded-lg gap-y-1.5 p-1.5 h-24 w-20 md:p-3 md:h-48 md:w-40 lg:p-4.5 lg:h-72 lg:w-60",
        "absolute hover:cursor-pointer active:z-50 active:cursor-grabbing",
        className
      )}
    >
      {children}
      {/* Lớp overlay tạo hiệu ứng ánh sáng phản chiếu */}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-foreground select-none"
      />
    </motion.div>
  );
};

// CONTAINER để chứa các CARD kéo thả
export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <DraggableContainerContext.Provider value={containerRef}>
      <div ref={containerRef} className={cn("[perspective:3000px]", className)}>
        {children}
      </div>
    </DraggableContainerContext.Provider>
  );
};
