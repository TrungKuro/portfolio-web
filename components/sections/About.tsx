import React from "react";
import { HeadingHighlight } from "../common/HeadingHighlight";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import { cn } from "@/lib/utils";
import { getAboutData } from "@/lib/content";

export const About = ({ id }: { id: string }) => {
  const { about, bentoGridClassName, bentoGridItems } = getAboutData();

  return (
    <section id={id}>
      <div className="flex flex-col items-center pt-30">
        <HeadingHighlight
          title={about.title}
          wordHighlight={about.titleHighlight}
        />

        <BentoGrid className={cn("mx-auto mt-10 w-full", bentoGridClassName)}>
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
                imgH,
                imgW,
                spareImgH,
                spareImgW,
                imgClassName,
                spareImgClassName,
                //
                specialEffect,
              },
              idx,
            ) => (
              <BentoGridItem
                key={`${idx}-${title}`}
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
                imgH={imgH}
                imgW={imgW}
                spareImgH={spareImgH}
                spareImgW={spareImgW}
                imgClassName={imgClassName}
                spareImgClassName={spareImgClassName}
                //
                specialEffect={specialEffect}
              />
            ),
          )}
        </BentoGrid>
      </div>
    </section>
  );
};
