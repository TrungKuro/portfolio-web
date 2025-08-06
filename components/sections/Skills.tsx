"use-client";

import React from "react";
import { ScrollRevealAnimation } from "../layout/ScrollRevealAnimation";
import { HeadingHighlight } from "../common/HeadingHighlight";
import { BtnMoveBorder } from "../common/BtnMoveBorder";
import { getSkillsData } from "@/lib/content";
import Image from "next/image";
import { AnimatedTooltip } from "../ui/AnimatedTooltip";

export const Skills = ({ id }: { id: string }) => {
  const { skill, techStack } = getSkillsData();

  return (
    <section id={id}>
      <ScrollRevealAnimation>
        <div className="pt-30 flex flex-col items-center">
          <HeadingHighlight
            title={skill.title}
            wordHighlight={skill.titleHighlight}
          />

          <div className="w-full mt-10 grid lg:grid-cols-4 grid-cols-1 gap-5 lg:gap-10">
            {techStack.categories.map(({ categoryName, thumbnail, items }) => (
              <BtnMoveBorder
                key={categoryName}
                duration={Math.floor(Math.random() * 10000 + 10000)}
                borderRadius="1.75rem"
                className="text-white border-slate-800"
              >
                <div className="flex h-full w-full p-3 flex-row gap-3 md:gap-5 lg:gap-10">
                  {/* THUMBNAIL */}
                  <div className="relative h-full lg:w-32 md:w-20 w-16">
                    <Image
                      src={thumbnail}
                      alt={categoryName}
                      fill
                      // 1rem = 16px -> 1.75rem = 28px
                      // p-3  = 12px
                      //
                      // Border Radius OUTER : 28px
                      // Padding             : 12px
                      // Border Radius INNER : 16px (28-12)
                      className="object-cover rounded-bl-[16px] rounded-tl-[16px]"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="w-full">
                    <h1 className="text-start text-xl md:text-2xl font-bold ">
                      {categoryName}
                    </h1>

                    <div className="flex flex-wrap items-center justify-start gap-3 mt-3">
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
            ))}
          </div>
        </div>
      </ScrollRevealAnimation>
    </section>
  );
};
