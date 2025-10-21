"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const BtnLink = ({
  name,
  url,
  isDisabled,
  className,
}: {
  name: string;
  url: string;
  isDisabled: boolean;
  className?: string;
}) => {
  return (
    <button
      type="button"
      aria-label={name}
      onClick={() =>
        isDisabled ? null : window.open(url, "_blank", "noopener,noreferrer")
      }
      className={cn(
        "relative cursor-pointer p-[3px]",
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div
        className={cn(
          "group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200",
          isDisabled ? "" : "hover:bg-transparent",
        )}
      >
        {name}
      </div>
    </button>
  );
};
