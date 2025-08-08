import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import { getAboutData } from "@/lib/content";
import { ScrollRevealAnimation } from "../layout/ScrollRevealAnimation";
import { HeadingHighlight } from "../common/HeadingHighlight";
import { cn } from "@/lib/utils";

export const About = ({ id }: { id: string }) => {
  const { about, bentoGridClassName, bentoGridItems } = getAboutData();

  return (
    <section id={id}>
      <ScrollRevealAnimation>
        <div className="pt-30 flex flex-col items-center">
          <HeadingHighlight
            title={about.title}
            wordHighlight={about.titleHighlight}
          />

          <BentoGrid className={cn("mt-10 w-full mx-auto", bentoGridClassName)}>
            {bentoGridItems.map(
              (
                {
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
                },
                idx
              ) => (
                <BentoGridItem
                  key={idx}
                  className={className}
                  //
                  title={title}
                  description={description}
                  contentClassName={contentClassName}
                  titleClassName={titleClassName}
                  descriptionClassName={descriptionClassName}
                  //
                  img={img}
                  spareImg={spareImg}
                  imgClassName={imgClassName}
                  spareImgClassName={spareImgClassName}
                  //
                  specialEffect={specialEffect}
                />
              )
            )}
          </BentoGrid>
        </div>
      </ScrollRevealAnimation>
    </section>
  );
};
