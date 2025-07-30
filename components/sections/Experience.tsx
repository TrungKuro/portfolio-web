/* eslint-disable @next/next/no-img-element */
import { getIndexData } from "@/lib/content";
import React from "react";
import { Button } from "../ui/MovingBorder";
import Reveal from "../common/ScrollRevealAnimation";

const Experience = ({ id }: { id: string }) => {
  const { workExperience } = getIndexData();

  return (
    <section id={id}>
      <Reveal>
        <div className="py-20">
          <h1 className="heading">
            My <span className="text-purple">work experience</span>
          </h1>
          <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
            {workExperience.map(({ id, thumbnail, title, desc }) => (
              <Button
                key={id}
                duration={Math.floor(Math.random() * 10000 + 10000)}
                borderRadius="1.75rem"
                className="flex-1 text-white border-neutral-200 dark:border-slate-800"
              >
                <div className="flex flex-col lg:flex-row lg:items-center p-3 md:p-5 lg:p-10 py-6 gap-2">
                  <img
                    src={thumbnail}
                    alt={thumbnail}
                    className="lg:w-32 md:w-20 w-16"
                  />
                  <div className="lg:ms-5">
                    <h1 className="text-start text-xl md:text-2xl font-bold ">
                      {title}
                    </h1>
                    <p className="text-start text-white-100 mt-3 font-semibold">
                      {desc}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Experience;
