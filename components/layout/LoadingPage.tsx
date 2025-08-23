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
       */}
      <div className="logo-custom animate-bounce">
        <Image
          src={logo.img}
          alt={logo.alt}
          priority={true} //!
          fill
          sizes="(min-width: 1024px) 128px, (min-width: 768px) 96px, 64px"
        />
      </div>

      {/* Text branding */}
      <p className="text-purple title-custom animate-pulse">
        Loading my portfolio...
      </p>
    </div>
  );
};
