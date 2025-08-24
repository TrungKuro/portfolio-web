"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

import React from "react";
import { LoadingBundle } from "../layout/LoadingBundle";
import { LoadingWait } from "../layout/LoadingWait";

/* ------------------------------------------------------------------------- */
/*                             Lazy Import Bundle                            */
/* ------------------------------------------------------------------------- */

const BackgroundGradientAnimation = dynamic(
  () =>
    import("../ui/BackgroundGradientAnimation").then(
      (m) => m.BackgroundGradientAnimation
    ),
  {
    loading: () => <LoadingBundle />,
    ssr: false,
  }
);

/* ------------------------------------------------------------------------- */
/*                               Main Component                              */
/* ------------------------------------------------------------------------- */

export const BackgroundGradientAnimationDemo = () => {
  const { ref: refContainer, inView: containerInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={refContainer} className="container-item-grid">
      {containerInView ? <BackgroundGradientAnimation /> : <LoadingWait />}
    </div>
  );
};
