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
            "bg-opacity-75 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-overlay-white bg-black-200 saturate-180 backdrop-blur-lg backdrop-filter hover:scale-110",
            className,
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
