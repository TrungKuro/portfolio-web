import Image from "next/image";
import React from "react";
import { getHeaderData } from "@/lib/content";

const { logo } = getHeaderData();

export const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-background">
      {/* Logo animation
       * Nếu logo file Vector (.svg) dùng <img> là tối ưu.
       * Ngược lại, ...
       *  - nếu logo file Bitmap
       *  - không có các dạng ảnh tối ưu cho web như (.webp)
       *  - dùng <Image> với tải ưu tiên "priority"
       *
       *  Nếu priority={true}
       *  - The resource http://... was preloaded using link preload but not used within a few seconds from the window's load event
       *  - Please make sure it has an appropriate `as` value and it is preloaded intentionally
       *
       *  Nếu priority={false}
       *  - Image with src "/xxx.png" was detected as the Largest Contentful Paint (LCP)
       *  - Please add the "priority" property if this image is above the fold
       */}
      <div className="w-[30%] max-sm:w-[50%] h-auto animate-bounce">
        <Image
          src={logo.img}
          alt={logo.alt}
          height={500}
          width={500}
          className="object-contain"
          priority //! Tự động preload (Next.js sẽ tự động thêm as="image")
        />
      </div>

      {/* Text branding */}
      <p className="text-purple heading animate-pulse">
        Loading my portfolio...
      </p>
    </div>
  );
};
