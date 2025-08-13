/* eslint-disable @next/next/no-img-element */

import React from "react";
import { ScrollRevealAnimation } from "../layout/ScrollRevealAnimation";
import { HeadingHighlight } from "../common/HeadingHighlight";
import { PinContainer } from "../ui/PinContainer";
import { FaLocationArrow } from "react-icons/fa";
import { getProjectsData } from "@/lib/content";

export const Projects = ({ id }: { id: string }) => {
  const { project, personalProjects } = getProjectsData();

  return (
    <section id={id}>
      <ScrollRevealAnimation>
        <div className="pt-30 flex flex-col items-center">
          <HeadingHighlight
            title={project.title}
            wordHighlight={project.titleHighlight}
          />

          <div className="mt-10 w-full grid md:grid-cols-2 grid-cols-1 gap-5 lg:gap-10">
            {personalProjects.map(
              (
                {
                  title,
                  description,
                  backgroundProject,
                  image,
                  iconLists,
                  links,
                },
                idx
              ) => (
                <PinContainer
                  key={idx}
                  title={links.live}
                  href={links.live}
                  allowExpandToParent={true}
                >
                  {/* Hình demo dự án */}
                  <div className="relative flex items-center justify-center">
                    {/* Hình nền */}
                    <img
                      src={backgroundProject}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      // BorderRadius_outer = rounded-2xl → tương đương 1rem = 16px
                      // Padding            = p-4         → tương đương 1rem = 16px
                      //
                      // Trường hợp "góc vuông đụng cong", cần xử lý cho mềm mượt
                      // rounded-lg	0.5rem  = 8px	        → Mềm hơn chút, vẫn hợp
                      className="w-full h-full rounded-lg bg-black-200"
                    />

                    {/* Hình dự án */}
                    <img
                      src={image}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="z-10 absolute bottom-0"
                    />
                  </div>

                  {/* Tên dự án */}
                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 mt-7 mb-3">
                    {title}
                  </h1>

                  {/* Mô tả dự án */}
                  <p className="lg:text-xl lg:font-normal text-sm font-light line-clamp-2">
                    {description}
                  </p>

                  {/* Danh sách công nghệ sử dụng */}
                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center">
                      {iconLists.map((icon, index) => (
                        <div
                          key={icon.alt}
                          className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex items-center justify-center"
                          style={{
                            transform: `translateX(-${10 * index}px)`,
                          }}
                        >
                          <img
                            //! Vẫn dùng <img> thay vì <Image>
                            // Lý do Icons thường nhỏ (< 5KB)
                            // - Overhead của Next.js Image (13KB) > lợi ích
                            // - Load time difference không đáng kể
                            src={icon.src}
                            alt={icon.alt}
                            loading="lazy"
                            decoding="async"
                            className="p-2 w-full aspect-square object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nút xem dự án */}
                  <div className="flex items-center justify-center">
                    <p className="flex content-custom text-pink">
                      Check Live Site
                    </p>
                    <FaLocationArrow className="ms-3 text-pink" />
                  </div>
                </PinContainer>
              )
            )}
          </div>
        </div>
      </ScrollRevealAnimation>
    </section>
  );
};
