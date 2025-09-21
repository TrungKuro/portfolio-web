/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React from "react";
import { Lamp } from "../ui/Lamp";
import { FaLocationArrow } from "react-icons/fa";
import { HeadingHighlight } from "../common/HeadingHighlight";
import { MagicButton } from "../common/MagicButton";
import { BtnCopy } from "../common/BtnCopy";
import { BtnSocialMedia } from "../common/BtnSocialMedia";
import { getFooterData } from "@/lib/content";

export const Contact = ({ id }: { id: string }) => {
  const { contact, background, address, copyright, socialMedia } =
    getFooterData();

  return (
    <footer id={id}>
      <div className="relative z-0 pb-30 max-sm:pt-30">
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

          <div className="mt-10 grid auto-rows-auto gap-5 md:grid-cols-[1fr_auto] md:gap-10">
            <div className="content-custom grid gap-3 text-center tracking-widest md:text-left">
              <p className="font-extrabold text-cool-gray">{contact.intro}</p>
              <p className="font-extralight text-lavender">{contact.message}</p>
            </div>

            <div className="grid place-content-center gap-3 transition-all duration-200 ease-out">
              {address.map(({ iconName, title, content, link }) => (
                <div
                  key={`address=${iconName}`}
                  className="grid grid-cols-[auto_1fr] gap-3"
                >
                  <div className="flex items-center justify-center">
                    <BtnCopy iconName={iconName} content={content} />
                  </div>

                  <div className="content-custom place-content-center">
                    <p className="font-extrabold text-cool-gray">{title}</p>
                    <p className="font-extralight text-lavender hover:font-medium hover:text-cyan">
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

        <div className="absolute bottom-0 left-0 -z-1 h-full w-full">
          <img
            // Vẫn nên dùng <img> thay <Image> vì đây là ảnh SVG
            src={background.img}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col-reverse items-center justify-between md:flex-row">
          <p className="text-sm font-light max-md:m-6 md:text-base md:font-normal">
            {`© ${new Date().getFullYear()} ${copyright}. All rights reserved.`}
          </p>

          <div className="flex flex-col items-center justify-between transition-all duration-200 ease-out md:flex-row">
            <div className="flex items-center gap-6 md:gap-3">
              {socialMedia.core.map(({ id, name, alt, icon, url }) => (
                <BtnSocialMedia
                  key={`socialMediaCore=${id}`}
                  name={name}
                  alt={alt}
                  icon={icon}
                  url={url}
                  className="hover:border-purple"
                />
              ))}
            </div>

            <span className="block h-0.5 w-full rounded-full bg-overlay-white max-md:my-6 md:mx-3 md:h-10 md:w-0.5" />

            <div className="flex items-center gap-6 md:gap-3">
              {socialMedia.branding.map(({ id, name, alt, icon, url }) => (
                <BtnSocialMedia
                  key={`socialMediaBranding=${id}`}
                  name={name}
                  alt={alt}
                  icon={icon}
                  url={url}
                  className="hover:border-blue"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
