/* eslint-disable @next/next/no-img-element */
import React from "react";
import { InfiniteMovingCards } from "../ui/InfiniteMovingCards";
import { getIndexData } from "@/lib/content";
import { ScrollRevealAnimation } from "../layout/ScrollRevealAnimation";

export const Clients = ({ id }: { id: string }) => {
  const { companies, testimonials } = getIndexData();

  return (
    <section id={id}>
      <ScrollRevealAnimation>
        <div className="pt-10 pb-20">
          <h1 className="heading">
            Kind words from{" "}
            <span className="text-purple">satisfied clients</span>
          </h1>
          <div className="flex flex-col items-center mt-10">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
              {companies.map(({ id, img, name, nameImg }) => (
                <div key={id} className="flex md:max-w-60 max-w-32 gap-2">
                  <img src={img} alt={name} className="w-5 md:w-10" />
                  <img src={nameImg} alt={name} className="w-20 md:w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollRevealAnimation>
    </section>
  );
};
