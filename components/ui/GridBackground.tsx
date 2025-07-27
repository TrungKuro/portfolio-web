import { cn } from "@/lib/utils";
import React from "react";

export const GridBackground = () => {
  return (
    <div className="h-screen w-full absolute top-0 left-0 flex items-center justify-center bg-white dark:bg-black-100">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:70px_70px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_2px,transparent_2px),linear-gradient(to_bottom,#e4e4e7_2px,transparent_2px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_2px,transparent_2px),linear-gradient(to_bottom,#262626_2px,transparent_2px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />
    </div>
  );
};
