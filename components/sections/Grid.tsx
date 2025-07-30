/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { BentoGrid, BentoGridItem } from "../BentoGrid";
import { title } from "process";
import { getIndexData } from "@/lib/content";
import Reveal from "../common/ScrollRevealAnimation";

const Grid = ({ id }: { id: string }) => {
  const { gridItems } = getIndexData();

  return (
    <section id={id}>
      <Reveal>
        <BentoGrid className="w-full py-20">
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
      </Reveal>
    </section>
  );
};

export default Grid;
