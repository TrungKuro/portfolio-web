"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationControls,
} from "motion/react";
import { cn } from "@/lib/utils";
import { debugLog } from "@/lib/logger";

/**
 * 🎯 CONTEXT ĐỂ CHIA SẺ DỮ LIỆU GIỮA CÁC COMPONENT
 * - Tạo một context để chia sẻ tham chiếu (ref) của container
 * - Mục đích: Giới hạn phạm vi kéo thả của card trong container
 * - Tránh card bị kéo ra ngoài màn hình
 */
const DraggableContainerContext =
  React.createContext<DraggableContextValue | null>(null);

/**
 * 🎮 DRAGGABLE CARD COMPONENT - THÀNH PHẦN CARD CÓ THỂ KÉO THẢ
 *
 * Component này tạo ra một thẻ card với các tính năng:
 * 1. Kéo thả tự do trong phạm vi container
 * 2. Hiệu ứng 3D khi di chuyển chuột (tilt effect)
 * 3. Hiệu ứng vật lý khi thả card (quán tính, nảy)
 * 4. Hiệu ứng ánh sáng và độ mờ theo vị trí chuột
 */
export const DraggableCardBody = ({
  className,
  children,
  //
  positionTop = 0, // Vị trí ban đầu từ trên-xuống (%)
  positionLeft = 0, // Vị trí ban đầu từ trái-phải (%)
  levelRotate = 0, // Góc xoay ban đầu (độ)
  //
  deepZ = 0, // Độ sâu z (z-index)
}: {
  className?: string;
  children?: React.ReactNode;
  //
  positionTop?: number;
  positionLeft?: number;
  levelRotate?: number;
  //
  deepZ?: number;
}) => {
  /**
   * 📊 CÁC GIÁ TRỊ THEO DÕI VỊ TRÍ CHUỘT
   * - mouseX, mouseY: Theo dõi vị trí chuột so với tâm thẻ
   * - Được sử dụng để tính toán các hiệu ứng 3D
   */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls(); // Điều khiển animation thủ công khi cần

  /**
   * 🚄 THEO DÕI VẬN TỐC DI CHUYỂN CHUỘT
   * - Tính vận tốc dựa trên sự thay đổi vị trí mouseX, mouseY
   * - Dùng để tạo hiệu ứng vật lý khi thả card (quán tính)
   */
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  /**
   * 🔧 CẤU HÌNH SPRING CHO HIỆU ỨNG ĐÀN HỒI
   * - stiffness: Độ cứng lò xo (càng cao càng cứng, phản ứng nhanh)
   * - damping: Độ giảm chấn (càng cao càng ít dao động)
   * - mass: Khối lượng vật thể (càng nặng càng chậm phản ứng)
   */
  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  /**
   * 🔄 HIỆU ỨNG XOAY THEO TRỤC X (LÊN/XUỐNG)
   * - Khi chuột ở trên tâm thẻ (mouseY âm) → xoay thẻ xuống dưới (rotateX dương)
   * - Khi chuột ở dưới tâm thẻ (mouseY dương) → xoay thẻ lên trên (rotateX âm)
   * - Tạo hiệu ứng thẻ "nghiêng" theo hướng nhìn
   */
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig,
  );

  /**
   * 🔄 HIỆU ỨNG XOAY THEO TRỤC Y (TRÁI/PHẢI)
   * - Khi chuột ở bên trái (mouseX âm) → xoay thẻ sang trái (rotateY âm)
   * - Khi chuột ở bên phải (mouseX dương) → xoay thẻ sang phải (rotateY dương)
   * - Tạo hiệu ứng thẻ "theo" hướng di chuyển chuột
   */
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig,
  );

  /**
   * 💡 HIỆU ỨNG ĐỘ MỜ THEO VỊ TRÍ CHUỘT
   * - Ở giữa thẻ (mouseX = 0): độ mờ = 1 (sáng nhất)
   * - Ở 2 bên thẻ (mouseX = ±300): độ mờ = 0.8 (mờ hơn)
   * - Tạo cảm giác thẻ "sáng" nhất khi chuột ở giữa
   */
  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig,
  );

  /**
   * ✨ HIỆU ỨNG ÁNH SÁNG PHẢN CHIẾU
   * - Ở giữa thẻ (mouseX = 0): không có ánh sáng phản chiếu
   * - Ở 2 bên thẻ (mouseX = ±300): có ánh sáng phản chiếu nhẹ (opacity = 0.2)
   * - Tạo hiệu ứng kim loại hoặc thủy tinh phản chiếu ánh sáng
   */
  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig,
  );

  /**
   * 🖱️ XỬ LÝ KHI CHUỘT DI CHUYỂN TRÊN THẺ
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e; // Vị trí chuột trong cửa sổ trình duyệt

    // Lấy thông tin vị trí và kích thước hiện tại của thẻ
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };

    // Tính toán tâm của thẻ
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Tính khoảng cách từ vị trí chuột đến tâm thẻ
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Cập nhật giá trị motion để trigger các hiệu ứng
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  /**
   * 🏠 RESET HIỆU ỨNG KHI CHUỘT RỜI KHỎI THẺ
   * - Đưa tất cả giá trị về 0 để thẻ trở về trạng thái ban đầu
   */
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Lấy tham chiếu container từ context để giới hạn phạm vi kéo thả
  const contextValue = React.useContext(DraggableContainerContext);
  const { containerRef, highestZ } = contextValue || {};

  return (
    <motion.div
      ref={cardRef}
      drag // Bật tính năng kéo thả
      dragConstraints={containerRef}
      onMouseDown={(e) => {
        const el = e.currentTarget as HTMLElement;
        if (Number(el.style.zIndex) < highestZ!.current) {
          highestZ!.current += 1;
          debugLog("New highestZ: ", highestZ!.current);
          // 🚀 Hiệu ứng mượt mà khi đưa card lên trên
          controls.start({
            zIndex: highestZ!.current,
            scale: [1, 1.05, 1], // Phóng to nhẹ rồi về lại
            filter: [
              "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
              "drop-shadow(0px 8px 12px rgba(0,0,0,0.3))",
              "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))",
            ],
            transition: { duration: 0.5, ease: "easeOut" },
          });
        }
      }}
      /**
       * 🎯 XỬ LÝ KHI THẢ THẺ SAU KHI KÉO
       * Tạo hiệu ứng vật lý thực tế với quán tính và độ nảy
       */
      onDragEnd={(_, info) => {
        // Bước 1: Reset góc xoay về 0 với animation mượt mà
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        });

        // Bước 2: Lấy vận tốc hiện tại của thẻ tại thời điểm thả
        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();

        // Bước 3: Tính tổng độ lớn vận tốc (vector magnitude)
        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX +
            currentVelocityY * currentVelocityY,
        );

        // Bước 4: Tính độ nảy dựa trên vận tốc (càng nhanh càng nảy nhiều)
        const bounce = Math.min(0.8, velocityMagnitude / 1000);

        // Bước 5: Tạo hiệu ứng quán tính cho trục X
        // Thẻ sẽ tiếp tục di chuyển theo hướng vận tốc với độ giảm dần
        animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1], // Ease curve tùy chỉnh cho chuyển động tự nhiên
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });

        // Bước 6: Tạo hiệu ứng quán tính cho trục Y (tương tự trục X)
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
      /**
       * 🎨 ÁP DỤNG CÁC HIỆU ỨNG ĐÃ TÍNH TOÁN
       */
      style={{
        rotateX, // Xoay theo trục X
        rotateY, // Xoay theo trục Y
        opacity, // Độ mờ
        willChange: "transform", // Tối ưu performance
        //! Vị trí và góc xoay ban đầu của card trong container
        top: `${positionTop}%`,
        left: `${positionLeft}%`,
        rotate: levelRotate,
        //
        zIndex: deepZ,
      }}
      animate={controls} // Sử dụng animation controls
      whileHover={{ scale: 1.02 }} // Phóng to nhẹ khi hover
      onMouseMove={handleMouseMove} // Lắng nghe di chuyển chuột
      onMouseLeave={handleMouseLeave} // Lắng nghe chuột rời khỏi thẻ
      /**
       * 📐 CẤU HÌNH KÍCH THƯỚC RESPONSIVE
       * - Mobile (default): 80x96px | Chiều rộng hình = 80 - (6 x 2) = 68px
       * - Tablet (sm:): 160x192px   | Chiều rộng hình = 160 - (12 x 2) = 136px
       * - Desktop (lg:): 240x288px  | Chiều rộng hình = 240 - (18 x 2) = 204px
       */
      className={cn(
        "flex flex-col items-center justify-between overflow-hidden bg-background shadow-2xl transform-3d",
        "h-24 w-20 gap-y-1.5 rounded-lg p-1.5 sm:h-48 sm:w-40 sm:p-3 lg:h-72 lg:w-60 lg:p-4.5",
        "absolute hover:cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      {children}

      {/* 
        ✨ LỚP OVERLAY TẠO HIỆU ỨNG ÁNH SÁNG PHẢN CHIẾU
        - Một lớp div phủ lên trên thẻ với độ mờ thay đổi
        - Tạo hiệu ứng như ánh sáng chiếu vào bề mặt kim loại/thủy tinh
        - pointer-events-none: không cản trở tương tác chuột
      */}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-foreground select-none"
      />
    </motion.div>
  );
};

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

/**
 * 🎯 CONTEXT ĐỂ CHIA SẺ DỮ LIỆU GIỮA CÁC COMPONENT
 */
// Định nghĩa type cho context value
interface DraggableContextValue {
  containerRef: React.RefObject<HTMLDivElement | null>;
  highestZ: React.RefObject<number>;
}

/**
 * 📦 DRAGGABLE CARD CONTAINER - CONTAINER CHỨA CÁC CARD KÉO THẢ
 *
 * Component này:
 * 1. Tạo một container với perspective 3D
 * 2. Cung cấp context cho các card con để giới hạn phạm vi kéo thả
 * 3. Đảm bảo các card không bị kéo ra ngoài container
 */
export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  // Tạo ref để tham chiếu đến DOM element của container
  const containerRef = useRef<HTMLDivElement>(null);

  // Tạo ref để tham chiếu đến giá trị z-index cao nhất
  const highestZ = useRef(0);

  // Tạo object chứa tất cả shared values
  const contextValue: DraggableContextValue = {
    containerRef,
    highestZ,
    //! Thêm giá trị muốn share
  };

  // Xác định số lượng CARD có trong CONTAINER để xác định z-index cao nhất
  useEffect(() => {
    highestZ.current = containerRef.current?.children.length ?? 0;
    debugLog("Init highestZ: ", highestZ.current);
  }, []);

  return (
    <DraggableContainerContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn(
          "[perspective:3000px]", // Thiết lập perspective 3D cho hiệu ứng xoay
          className,
        )}
      >
        {children}
      </div>
    </DraggableContainerContext.Provider>
  );
};
