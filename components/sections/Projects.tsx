/* eslint-disable @next/next/no-img-element */

import React from "react";
import { ScrollRevealAnimation } from "../layout/ScrollRevealAnimation";
import { HeadingHighlight } from "../common/HeadingHighlight";
import { BtnLink } from "../common/BtnLink";
import { PinContainer } from "../ui/PinContainer";
import { FaLocationArrow } from "react-icons/fa";
import { getProjectsData } from "@/lib/content";

export const Projects = ({ id }: { id: string }) => {
  const { project, personalProjects } = getProjectsData();

  return (
    <section id={id}>
      <ScrollRevealAnimation disableOnMobile={true}>
        <div className="flex flex-col items-center pt-30">
          <HeadingHighlight
            title={project.title}
            wordHighlight={project.titleHighlight}
          />

          <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:gap-10">
            {personalProjects.map(
              ({ title, description, imageProject, iconLists, links }, idx) => (
                <div key={`${idx}-${title}`} className="flex flex-col">
                  <PinContainer
                    title={`👉🏻 ${title}`}
                    content={`💬 ${description}`}
                    href={links.live}
                    allowExpandToParent={true}
                  >
                    {/* Hình demo dự án */}
                    <div className="relative flex items-center justify-center">
                      {/* Hình nền */}
                      <picture
                        // BorderRadius_outer = rounded-2xl → tương đương 1rem = 16px
                        // Padding            = p-4         → tương đương 1rem = 16px
                        //
                        // Trường hợp "góc vuông đụng cong", cần xử lý cho mềm mượt
                        // rounded-lg	0.5rem  = 8px	        → Mềm hơn chút, vẫn hợp
                        className="h-full w-full rounded-lg bg-black-200"
                      >
                        <source
                          srcSet={imageProject.background.webp}
                          type="image/webp"
                        />
                        <source
                          srcSet={imageProject.background.png}
                          type="image/png"
                        />
                        <img
                          src={imageProject.background.png}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>

                      {/* Hình dự án */}
                      <img
                        src={imageProject.src}
                        alt={imageProject.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute h-full w-full rounded-lg"
                      />
                    </div>

                    {/* Tên dự án */}
                    <h1 className="mt-7 mb-3 line-clamp-1 text-base font-bold subpixel-antialiased md:text-xl lg:text-2xl">
                      {title}
                    </h1>

                    {/* Mô tả dự án */}
                    <p className="line-clamp-2 text-sm font-light subpixel-antialiased lg:text-xl lg:font-normal">
                      {description}
                    </p>

                    {/* Danh sách công nghệ sử dụng */}
                    <div className="mt-7 mb-3 flex items-center justify-between">
                      <div className="flex items-center">
                        {iconLists.map((icon, index) => (
                          <div
                            key={`${title}-${icon.alt}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.2] bg-black lg:h-10 lg:w-10"
                            style={{
                              transform: `translateX(-${10 * index}px)`,
                            }}
                          >
                            <img
                              //! Vẫn dùng <img> thay vì <Image>
                              // Lý do Icons thường nhỏ (<div 5KB)
                              // - Overhead của Next.js Image (13KB) > lợi ích
                              // - Load time difference không đáng kể
                              src={icon.src}
                              alt={icon.alt}
                              loading="lazy"
                              decoding="async"
                              className="aspect-square w-full object-contain p-2"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nút xem dự án */}
                    <div className="flex items-center justify-center">
                      <p className="content-custom flex text-pink subpixel-antialiased">
                        Check Live Site
                      </p>
                      <FaLocationArrow className="ms-3 text-pink" />
                    </div>
                  </PinContainer>
                  <div className="flex flex-auto justify-between gap-4 pt-4">
                    <BtnLink
                      name="Client"
                      url={links.client}
                      isDisabled={links.client ? false : true}
                      className="flex-auto"
                    />
                    <BtnLink
                      name="Server"
                      url={links.server}
                      isDisabled={links.server ? false : true}
                      className="flex-auto"
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </ScrollRevealAnimation>
    </section>
  );
};
