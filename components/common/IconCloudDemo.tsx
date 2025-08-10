import React from "react";
import { IconCloud } from "../ui/IconCloud";
import { getAboutData } from "@/lib/content";

const { fundamentals } = getAboutData().personalize;

export const IconCloudDemo = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <IconCloud images={fundamentals} className="w-fit h-fit" />
    </div>
  );
};
