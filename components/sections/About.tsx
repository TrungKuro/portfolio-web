import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import { getIndexData } from "@/lib/content";
import { ScrollRevealAnimation } from "../layout/ScrollRevealAnimation";

export const About = ({ id }: { id: string }) => {
  const { gridItems } = getIndexData();

  return (
    <section id={id}>
      <ScrollRevealAnimation>
        <BentoGrid className="w-full pt-10 pb-20">
          {gridItems.map(
            ({
              id,
              title,
              description,
              className,
              img,
              imgClassName,
              titleClassName,
              spareImg,
            }) => (
              <BentoGridItem
                id={id}
                key={id}
                title={title}
                description={description}
                className={className}
                img={img}
                imgClassName={imgClassName}
                titleClassName={titleClassName}
                spareImg={spareImg}
              />
            )
          )}
        </BentoGrid>
      </ScrollRevealAnimation>
    </section>
  );
};
