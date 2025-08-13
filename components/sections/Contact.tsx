/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { HeadingHighlight } from "../common/HeadingHighlight";
import { MagicButton } from "../common/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { IconSVG } from "../common/IconSVG";
import { Lamp } from "../ui/Lamp";
import Tooltip from "@mui/material/Tooltip";
import { getFooterData } from "@/lib/content";

export const Contact = ({ id }: { id: string }) => {
  const { contact, background, address, copyright, socialMedia } =
    getFooterData();

  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const handleCopy = async (content: string, iconName: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied((prev) => ({ ...prev, [iconName]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [iconName]: false }));
      }, 3000);
    } catch (err) {
      console.error("Error when copy:", err);
    }
  };

  return (
    <footer id={id}>
      <div className="relative max-sm:pt-30 pb-30 z-0">
        <div className="flex flex-col items-center">
          <Lamp
            heightFrame={66}
            scaleY={130}
            background="black-100"
            className="-z-2 max-sm:hidden sm:translate-y-[19rem] md:translate-y-[18rem] lg:translate-y-[17rem] xl:translate-y-[16rem] 2xl:translate-y-[15rem]"
          />
          <HeadingHighlight
            title={contact.title}
            wordHighlight={contact.titleHighlight}
          />

          <div className="mt-10 grid auto-rows-auto md:grid-cols-[1fr_auto] gap-5 md:gap-10">
            <div className="grid gap-3 text-center md:text-left tracking-widest content-custom">
              <p className="text-cool-gray font-extrabold">{contact.intro}</p>
              <p className="text-lavender font-extralight">{contact.message}</p>
            </div>

            <div className="grid gap-3 place-content-center">
              {address.map(({ iconName, title, content, link }) => (
                <div
                  key={`address=${iconName}`}
                  className="grid grid-cols-[auto_1fr] gap-3"
                >
                  <div className="flex justify-center items-center">
                    <Tooltip title="Click to Copy" arrow>
                      <button
                        disabled={copied[iconName]}
                        onClick={() => handleCopy(content, iconName)}
                        className={`hover:cursor-copy hover:scale-90 transition-transform ${
                          copied[iconName]
                            ? "opacity-50 scale-90"
                            : "opacity-100"
                        }`}
                      >
                        <IconSVG
                          iconName={iconName}
                          className="border-1 sm:border-2 lg:border-3 stroke-[1px] sm:stroke-[1.5px] lg:stroke-[2px] border-foreground p-1.5 rounded-lg size-8 sm:size-9 lg:size-11 text-foreground"
                        />
                      </button>
                    </Tooltip>
                  </div>

                  <div className="place-content-center content-custom">
                    <p className="text-cool-gray font-extrabold">{title}</p>
                    <p className="text-lavender font-extralight hover:text-cyan hover:font-medium">
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {content}
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="" className="my-16">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </Link>
        </div>

        <div className="w-full h-full absolute left-0 bottom-0 -z-1">
          <img
            // Vẫn nên dùng <img> thay <Image> vì đây là ảnh SVG
            src={background.img}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex md:flex-row flex-col-reverse justify-between items-center">
          <p className="md:text-base text-sm md:font-normal font-light max-md:m-6">
            {copyright}
          </p>

          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="flex items-center md:gap-3 gap-6">
              {socialMedia.core.map(({ id, name, icon, url }) => (
                <Tooltip key={`socialMediaCore=${id}`} title={name} arrow>
                  <button
                    type="button"
                    aria-label={name}
                    onClick={() =>
                      window.open(url, "_blank", "noopener,noreferrer")
                    }
                  >
                    <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-overlay-white hover:border-purple hover:scale-110 transition-all duration-200 ease-out">
                      <img
                        src={icon}
                        alt={`icons-${name}`}
                        width={25}
                        height={25}
                        loading="lazy"
                        decoding="async"
                        className="pointer-events-none select-none"
                      />
                    </div>
                  </button>
                </Tooltip>
              ))}
            </div>

            <span className="block w-full h-0.5 max-md:my-6 md:w-0.5 md:h-10 md:mx-3 bg-overlay-white rounded-full" />

            <div className="flex items-center md:gap-3 gap-6">
              {socialMedia.branding.map(({ id, name, icon, url }) => (
                <Tooltip key={`socialMediaBranding=${id}`} title={name} arrow>
                  <button
                    type="button"
                    aria-label={name}
                    onClick={() =>
                      window.open(url, "_blank", "noopener,noreferrer")
                    }
                  >
                    <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-overlay-white hover:border-blue hover:scale-110 transition-all duration-200 ease-out">
                      <img
                        src={icon}
                        alt={`icons-${name}`}
                        width={25}
                        height={25}
                        loading="lazy"
                        decoding="async"
                        className="pointer-events-none select-none"
                      />
                    </div>
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
