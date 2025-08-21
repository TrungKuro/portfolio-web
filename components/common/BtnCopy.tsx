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
          "hover:cursor-copy hover:scale-90 transition-transform",
          copied ? "opacity-50 scale-90" : "opacity-100"
        )}
      >
        <IconSVG
          iconName={iconName}
          className="border-1 sm:border-2 lg:border-3 stroke-[1px] sm:stroke-[1.5px] lg:stroke-[2px] border-foreground p-1.5 rounded-lg size-8 sm:size-9 lg:size-11 text-foreground"
        />
      </button>
    </Tooltip>
  );
};
