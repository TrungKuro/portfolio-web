import Image from "next/image";
import React from "react";
import { ScrollRevealAnimation } from "../layout/ScrollRevealAnimation";
import { HeadingHighlight } from "../common/HeadingHighlight";
import { BtnMoveBorder } from "../common/BtnMoveBorder";
import { Lens } from "../ui/Lens";
import { AnimatedTooltip } from "../ui/AnimatedTooltip";
import { getSkillsData } from "@/lib/content";

export const Skills = ({ id }: { id: string }) => {
  const { skill, techStack } = getSkillsData();

  return (
    <section id={id}>
      <ScrollRevealAnimation>
        <div className="flex flex-col items-center pt-30">
          <HeadingHighlight
            title={skill.title}
            wordHighlight={skill.titleHighlight}
          />

          <div className="mt-10 grid w-full grid-cols-1 gap-5 lg:grid-cols-4 lg:gap-10">
            {techStack.categories.map(
              ({ categoryName, thumbnail, alt, items }) => (
                <BtnMoveBorder
                  key={`${categoryName}-${thumbnail}`}
                  duration={Math.floor(Math.random() * 10000 + 10000)}
                  borderRadius="1.75rem"
                  className="border-slate-800 text-white"
                >
                  <div className="flex h-full w-full flex-row gap-3 p-3 md:gap-5 lg:gap-10">
                    {/* THUMBNAIL */}
                    <Lens zoomFactor={5} lensSize={100}>
                      <div
                        // Từ (md:) trở xuống | Chiều rộng = 64px
                        // Từ (md:) trở lên   | Chiều rộng = 80px
                        // Từ (lg:) trở lên   | Chiều rộng = 128px
                        className="relative h-full w-16 cursor-zoom-in md:w-20 lg:w-32"
                      >
                        <Image
                          src={thumbnail}
                          alt={alt}
                          fill
                          //! Đáng lẽ đặt -> sizes="(min-width: 1024px) 128px, (min-width: 768px) 80px, 64px"
                          // Nhưng vì có kết hợp với <Lens> có hệ số ảnh là 5
                          // Và vì các ảnh này cũng không phải ảnh SVG -> Nên cần đặt lại "sizes" với:
                          // - Từ (md:) trở xuống | 64 x 5 = 320px
                          // - Từ (md:) trở lên   | 80 x 5 = 400px
                          // - Từ (lg:) trở lên   | 128 x 5 = 640px
                          sizes="(min-width: 1024px) 640px, (min-width: 768px) 400px, 320px"
                          // 1rem = 16px -> 1.75rem = 28px
                          // p-3  = 12px
                          //
                          // Border Radius OUTER : 28px
                          // Padding             : 12px
                          // Border Radius INNER : 16px (28-12)
                          className="rounded-tl-[16px] rounded-bl-[16px] object-cover"
                        />
                      </div>
                    </Lens>

                    {/* CONTENT */}
                    <div className="w-full">
                      <h1 className="text-start text-xl font-bold md:text-2xl">
                        {categoryName}
                      </h1>

                      <div className="mt-3 flex flex-wrap items-center justify-start gap-3">
                        <AnimatedTooltip
                          items={items.map((item, idx) => ({
                            id: idx,
                            name: item.name,
                            designation: item.type,
                            image: item.icon,
                            isBg: item.isBackground,
                          }))}
                          classNameBg="bg-foreground rounded-tl-sm rounded-br-sm"
                          classNameTitle="text-cool-gray"
                          classNameSubTitle="text-lavender"
                        />
                      </div>
                    </div>
                  </div>
                </BtnMoveBorder>
              ),
            )}
          </div>
        </div>
      </ScrollRevealAnimation>
    </section>
  );
};
