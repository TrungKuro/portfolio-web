/* eslint-disable @next/next/no-img-element */
import { getIndexData } from "@/lib/content";
import React from "react";
import { PinContainer } from "../ui/3DPin";
import { FaLocationArrow } from "react-icons/fa";
import { ScrollRevealAnimation } from "../layout/ScrollRevealAnimation";

export const Projects = ({ id }: { id: string }) => {
  const { projects } = getIndexData();

  return (
    <section id={id}>
      <ScrollRevealAnimation>
        <div className="pt-10 pb-20">
          <h1 className="heading">
            A small selection of{" "}
            <span className="text-purple">recent projects</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
            {projects.map(({ id, title, des, img, iconLists, link }) => (
              <div
                className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
                key={id}
              >
                <PinContainer title={link} href={link}>
                  <div className="relative flex items-center justify-center sm:w-[570px] sm:h-[40vh] mb-10 w-[80vw] h-[30vh] overflow-hidden">
                    <div>
                      <img
                        src="/bg.png"
                        alt="bg-img"
                        className="w-full h-full relative overflow-hidden lg:rounded-3xl bg-[#13162d]"
                      />
                    </div>
                    <img
                      src={img}
                      alt={title}
                      className="z-10 absolute bottom-0"
                    />
                  </div>
                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                    {title}
                  </h1>
                  <p className="lg:text-xl lg:font-normal text-sm font-light line-clamp-2">
                    {des}
                  </p>
                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center">
                      {iconLists.map((icon, index) => (
                        <div
                          key={icon}
                          className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex items-center justify-center"
                          style={{
                            transform: `translateX(-${10 * index}px)`,
                          }}
                        >
                          <img src={icon} alt={icon} className="p-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                      Check Live Site
                    </p>
                    <FaLocationArrow className="ms-3" color="#cbacf9" />
                  </div>
                </PinContainer>
              </div>
            ))}
          </div>
        </div>
      </ScrollRevealAnimation>
    </section>
  );
};
