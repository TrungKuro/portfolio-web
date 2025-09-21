import Link from "next/link";
import React from "react";
import { Spotlight } from "../ui/Spotlight";
import { GridBackground } from "../ui/GridBackground";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import { TypewriterEffect } from "../ui/TypewriterEffect";
import { MagicButton } from "../common/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { getHeaderData } from "@/lib/content";

export const Hero = ({ id }: { id: string }) => {
  const { hero, cv } = getHeaderData();

  return (
    <header id={id}>
      <div className="h-screen py-30">
        <div>
          <Spotlight
            className="-top-40 -left-10 h-screen md:-top-20 md:-left-32"
            fill="white"
          />
          <Spotlight
            className="top-10 left-full h-[80vh] w-[50vw]"
            fill="purple"
          />
          <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
        </div>

        <GridBackground />

        <div className="relative z-10 my-20 flex justify-center">
          <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
            <p className="max-w-80 text-center text-xs tracking-widest text-blue uppercase md:text-base lg:text-xl">
              {hero.greeting}
            </p>

            <TextGenerateEffect
              words={hero.name}
              wordHighlight={hero.nameHighlight}
              className="text-center text-4xl md:text-6xl lg:text-8xl"
            />

            <div className="my-4 flex items-center justify-center space-x-2 text-base tracking-wider md:text-xl lg:text-3xl">
              <p className="text-white">{hero.introducePrefix}</p>
              <TypewriterEffect
                texts={hero.roles}
                textClassName="text-blue uppercase font-bold"
              />
              <p className="font-bold text-purple">.</p>
            </div>

            <Link href={cv.download} download className="mt-5 md:mt-10">
              <MagicButton
                title={cv.title}
                icon={<FaLocationArrow />}
                position="right"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
