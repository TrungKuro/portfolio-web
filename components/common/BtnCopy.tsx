"use client";

import React, { useEffect, useState } from "react";
import { IconSVG } from "../common/IconSVG";
import Tooltip from "@mui/material/Tooltip";
import { cn } from "@/lib/utils";
import { debugError } from "@/lib/logger";

export const BtnCopy = ({
  iconName,
  content,
}: {
  iconName: string;
  content: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch (error) {
      debugError("Error when copy: ", error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Tooltip title={copied ? "Copied!" : "Click to Copy"} arrow>
      <button
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        disabled={copied}
        onClick={handleCopy}
        className={cn(
          "hover:scale-90 hover:cursor-copy",
          copied ? "scale-90 opacity-50" : "opacity-100",
        )}
      >
        <IconSVG
          iconName={iconName}
          className="size-8 rounded-lg border-1 border-foreground stroke-[1px] p-1.5 text-foreground sm:size-9 sm:border-2 sm:stroke-[1.5px] lg:size-11 lg:border-3 lg:stroke-[2px]"
        />
      </button>
    </Tooltip>
  );
};
