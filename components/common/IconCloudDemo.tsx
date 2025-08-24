"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

import React from "react";
import { LoadingBundle } from "../layout/LoadingBundle";
import { LoadingWait } from "../layout/LoadingWait";

import { getAboutData } from "@/lib/content";

/* ------------------------------------------------------------------------- */
/*                             Lazy Import Bundle                            */
/* ------------------------------------------------------------------------- */

const IconCloud = dynamic(
  () => import("../ui/IconCloud").then((m) => m.IconCloud),
  {
    loading: () => <LoadingBundle />,
    ssr: false,
  }
);

/* ------------------------------------------------------------------------- */
/*                               Main Component                              */
/* ------------------------------------------------------------------------- */

const { fundamentals } = getAboutData().personalize;

export const IconCloudDemo = () => {
  const { ref: refContainer, inView: containerInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={refContainer} className="container-item-grid">
      {containerInView ? (
        <IconCloud images={fundamentals} className="w-fit h-fit" />
      ) : (
        <LoadingWait />
      )}
    </div>
  );
};
