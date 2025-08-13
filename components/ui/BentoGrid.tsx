/* eslint-disable @next/next/no-img-element */

import { DraggableCardDemo } from "../common/DraggableCardDemo";
import { GlobeDemo } from "../common/GlobeDemo";
import { IconCloudDemo } from "../common/IconCloudDemo";
import { LottieDemo } from "../common/LottieDemo";
import { Meteors } from "./Meteors";
import { BackgroundGradientAnimation } from "./BackgroundGradientAnimation";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      // Thuộc tính này được thiếp lập bên dữ liệu JSON
      // Kích hoạt khi (md:)
      //
      // Tỉ lệ cũ (4:3) = 12 CỘT : 9 DÒNG
      // | card 1 = 6:5 | card 2 = 6:3 | card 3 = 6:2
      // | card 4 = 5:3 | card 5 = 7:3 | card 6 = 12:1
      //
      // Tỉ lệ mới (16:10) = 16 CỘT : 10 DÒNG
      // | card 1 = 8:5 | card 2 = 8:3  | card 3 = 8:2
      // | card 4 = 6:3 | card 5 = 10:3 | card 6 = 16:2
      className={cn("grid mx-auto", className)}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  //
  title,
  description,
  contentClassName,
  titleClassName,
  descriptionClassName,
  //
  img,
  spareImg,
  imgClassName,
  spareImgClassName,
  //
  specialEffect,
}: {
  className?: string;
  //
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  //
  img?: string;
  spareImg?: string;
  imgClassName?: string;
  spareImgClassName?: string;
  //
  specialEffect?: string;
}) => {
  //! Nếu "contentClassName" có chứa `group-hover/bento:translate-` hoặc `group-hover/bento:-translate-` thì không dùng mặc định
  const hasCustomTranslate = /group-hover\/bento:-?translate-/.test(
    contentClassName || ""
  );

  //! Đổi <img> qua dùng <Image> cho HÌNH NỀN CHÍNH và HÌNH NỀN PHỤ
  //
  // Dùng alt="" vì ảnh chỉ là trang trí, tránh ảnh hưởng SEO
  //
  // "fill"
  //  - Tự động set position: absolute; top: 0; left: 0; width: 100%; height: 100%
  //  - Không cần "w-full h-full absolute" nữa
  //
  // sizes="100vw"
  //  - Giúp Next.js chỉ tải ảnh kích thước cần thiết cho viewport → giảm dung lượng
  //
  // "priority"
  // - true: tải ngay (ảnh trên fold, ảnh chính)
  // - false: lazy load mặc định
  // Vì là ảnh nền hỗ trợ nên mình chọn "lazy load" cũng là chế độ mặc định, để ảnh chỉ cần load khi user cuộn viewport tới
  //
  //! Nhưng vì các ảnh mình dùng là SVG, nên dùng <img> vẫn tối ưu hơn
  //! Tuy nhiên nếu không phải là ảnh SVG thì việc layout các ảnh kích thước lớn dùng <Image> sẽ tốt hơn

  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-custom",
        className
      )}
    >
      <div className="relative w-full h-full">
        {/* Hình nền phụ */}
        {spareImg && (
          <img
            src={spareImg}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn(
              "w-full h-full absolute object-cover object-center",
              spareImgClassName
            )}
          />
        )}

        {/* Hình nền chính */}
        {img && (
          <img
            src={img}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn(
              "w-full h-full absolute object-cover object-center",
              imgClassName
            )}
          />
        )}

        {/* Hiệu ứng đặc biệt */}
        {specialEffect === "draggable-card" && <DraggableCardDemo />}
        {specialEffect === "globe" && <GlobeDemo />}
        {specialEffect === "icon-cloud" && <IconCloudDemo />}
        {specialEffect === "lottie" && <LottieDemo />}
        {specialEffect === "meteors" && <Meteors number={20} />}
        {specialEffect === "background-gradient-animation" && (
          <BackgroundGradientAnimation />
        )}

        {/* Nội dung */}
        <div
          className={cn(
            //  Nếu "contentClassName" có chứa ...(Regex)... thì không dùng mặc định
            //! Nếu muốn bỏ mặc định thì dùng chuỗi nhận diện giả ví dụ như `group-hover/bento:translate-none`
            !hasCustomTranslate && "group-hover/bento:translate-x-2",
            // Luôn thêm các class cố định
            "transition duration-200 relative z-10 w-full h-full flex flex-col space-y-3 p-5 lg:p-10",
            //! Mouse events pass through -> tắt để các lớp "absolute" bên dưới có thể nhận Event Mouse | không ảnh hưởng hiệu ứng vì phần tử đã được liên kết Event với phần tử gốc
            "pointer-events-none",
            // Và cuối cùng là "contentClassName" truyền vào
            contentClassName
          )}
        >
          {/* Tiêu đề */}
          {title && (
            <div
              className={cn(
                "font-sans font-extrabold text-lavender title-custom",
                titleClassName
              )}
            >
              {title}
            </div>
          )}

          {/* Miêu tả */}
          {description && (
            <div
              className={cn(
                "font-sans font-extralight text-cool-gray sub-title-custom",
                descriptionClassName
              )}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
