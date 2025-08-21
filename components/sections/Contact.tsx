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
                    <BtnCopy iconName={iconName} content={content} />
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
            {`© ${new Date().getFullYear()} ${copyright}. All rights reserved.`}
          </p>

          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="flex items-center md:gap-3 gap-6">
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

            <span className="block w-full h-0.5 max-md:my-6 md:w-0.5 md:h-10 md:mx-3 bg-overlay-white rounded-full" />

            <div className="flex items-center md:gap-3 gap-6">
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
