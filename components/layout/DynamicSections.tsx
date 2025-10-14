"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { LoadingSection } from "@/components/layout/LoadingSection";

/* ------------------------------------------------------------------------- */

//! 👇 Dynamic import ...Sections
//
// const [name_section] = dynamic(() => import("@/components/sections/[name_section]").then(mod => mod.[name_section]), {
//   ssr: false, // ⛔ Không render ở server → chỉ client load khi cần
//   loading: () => <LoadingSection />, // ⏳ Hiển thị khi đang tải
// });

const About = dynamic(
  () => import("@/components/sections/About").then((mod) => mod.About),
  {
    ssr: false,
    loading: () => <LoadingSection />,
  },
);

const Skills = dynamic(
  () => import("@/components/sections/Skills").then((mod) => mod.Skills),
  {
    ssr: false,
    loading: () => <LoadingSection />,
  },
);

const Projects = dynamic(
  () => import("@/components/sections/Projects").then((mod) => mod.Projects),
  {
    ssr: false,
    loading: () => <LoadingSection />,
  },
);

const Contact = dynamic(
  () => import("@/components/sections/Contact").then((mod) => mod.Contact),
  {
    ssr: false,
    loading: () => <LoadingSection />,
  },
);

/* ------------------------------------------------------------------------- */

export const DynamicSections = ({ ids }: { ids: string[] }) => {
  return (
    <>
      {/* Body */}
      <Suspense fallback={<LoadingSection />}>
        <About id={ids[0]} />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Skills id={ids[1]} />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Projects id={ids[2]} />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<LoadingSection />}>
        <Contact id={ids[3]} />
      </Suspense>
    </>
  );
};
