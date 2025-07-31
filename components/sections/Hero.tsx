import React from "react";
import { Spotlight } from "../ui/Spotlight";
import { GridBackground } from "../ui/GridBackground";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import { MagicButton } from "../ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { getHeaderData } from "@/lib/content";
import { TypewriterEffect } from "../common/TypewriterEffect";
import Link from "next/link";

export const Hero = ({ id }: { id: string }) => {
  const { hero, cv } = getHeaderData();

  return (
    <header id={id}>
      <div className="pb-20 pt-36">
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="top-10 left-full h-[80vh] w-[50vw]"
            fill="purple"
          />
          <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
        </div>

        <GridBackground />

        <div className="flex justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <p className="uppercase tracking-widest text-xs md:text-base lg:text-xl text-center text-blue-100 max-w-80">
              {hero.greeting}
            </p>

            <TextGenerateEffect
              words={hero.name}
              wordHighlight={3}
              className="text-center text-4xl md:text-6xl lg:text-8xl"
            />

            <div className="flex justify-center items-center space-x-2 my-4 tracking-wider text-base md:text-xl lg:text-3xl">
              <p className="text-white">{hero.introducePrefix}</p>
              <TypewriterEffect
                texts={hero.roles}
                textClassName="text-blue-100 uppercase font-bold"
              />
              <p className="text-purple font-bold">.</p>
            </div>

            <Link href={cv.download} download>
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
