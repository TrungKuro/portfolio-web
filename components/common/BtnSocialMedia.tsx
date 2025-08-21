/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { cn } from "@/lib/utils";

export const BtnSocialMedia = ({
  name,
  alt,
  icon,
  url,
  className,
}: {
  name: string;
  alt: string;
  icon: string;
  url: string;
  className?: string;
}) => {
  return (
    <Tooltip title={name} arrow>
      <button
        type="button"
        aria-label={name}
        onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      >
        <div
          className={cn(
            "w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-overlay-white hover:scale-110 transition-all duration-200 ease-out",
            className
          )}
        >
          <img
            src={icon}
            alt={alt}
            width={25}
            height={25}
            loading="lazy"
            decoding="async"
            className="pointer-events-none select-none"
          />
        </div>
      </button>
    </Tooltip>
  );
};
