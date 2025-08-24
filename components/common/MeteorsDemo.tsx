"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

import React from "react";
import { LoadingBundle } from "../layout/LoadingBundle";
import { LoadingWait } from "../layout/LoadingWait";

/* ------------------------------------------------------------------------- */
/*                             Lazy Import Bundle                            */
/* ------------------------------------------------------------------------- */

const Meteors = dynamic(() => import("../ui/Meteors").then((m) => m.Meteors), {
  loading: () => <LoadingBundle />,
  ssr: false,
});

/* ------------------------------------------------------------------------- */
/*                               Main Component                              */
/* ------------------------------------------------------------------------- */

export const MeteorsDemo = () => {
  const { ref: refContainer, inView: containerInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={refContainer} className="container-item-grid">
      {containerInView ? <Meteors number={20} /> : <LoadingWait />}
    </div>
  );
};
