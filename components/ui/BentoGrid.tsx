"use client";
/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./BackgroundGradientAnimation";
import { GlobeDemo } from "../common/GlobeDemo";
import { useState } from "react";
import Lottie from "react-lottie";
import animationData from "@/data/confetti.json";
import { MagicButton } from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";

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
  //!!!! bỏ đi cái đám này
  // const leftLists = ["React.js", "Next.js", "Node.js", "Nest.js"];
  // const rightLists = ["HTML5", "CSS3", "JavaScript (ES6)", "TypeScript"];

  // const [copied, setCopied] = useState(false); // Use for Lottie animation

  // const handleCopy = () => {
  //   navigator.clipboard.writeText("hdh.trung.96@gmail.com");
  //   setCopied(true);
  // };

  //! Nếu "contentClassName" có chứa `group-hover/bento:translate-` hoặc `group-hover/bento:-translate-` thì không dùng mặc định
  const hasCustomTranslate = /group-hover\/bento:-?translate-/.test(
    contentClassName || ""
  );

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
            alt={spareImg}
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
            alt={img}
            className={cn(
              "w-full h-full absolute object-cover object-center",
              imgClassName
            )}
          />
        )}

        {/* Hiệu ứng đặc biệt */}
        {specialEffect === "background-gradient-animation" && (
          <BackgroundGradientAnimation />
        )}
        {specialEffect === "globe" && <GlobeDemo />}

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

          {/* 

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, index) => (
                  <span
                    key={index}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132e]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132e]"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132e]"></span>
                {rightLists.map((item, index) => (
                  <span
                    key={index}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132e]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                <Lottie
                  options={{
                    loop: copied,
                    autoplay: copied,
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={200}
                  width={400}
                />
              </div>
              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                otherClasses="!bg-[#161a31]"
                handleClick={handleCopy}
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
