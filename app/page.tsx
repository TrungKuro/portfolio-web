import NavHomeIcon from "@/public/assets/icons/navigation/nav-home.svg";
import NavAboutIcon from "@/public/assets/icons/navigation/nav-about.svg";
import NavSkillsIcon from "@/public/assets/icons/navigation/nav-skills.svg";
import NavProjectsIcon from "@/public/assets/icons/navigation/nav-projects.svg";
import NavContactIcon from "@/public/assets/icons/navigation/nav-contact.svg";

import { getHeaderData } from "@/lib/content";
import { FloatingNavbar } from "@/components/common/FloatingNavbar";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

import { Suspense } from "react";
import { LoadingSection } from "@/components/layout/LoadingSection";

//! Cấu hình mặc định là SSG
//  Hoặc dùng: export const dynamic = "force-static"; // -> ép SSG
//  (Static Site Generation) -> phù hợp cho Web Portfolio
export default function Home() {
  const { navItems } = getHeaderData();

  const navItemsWithIcons = [
    {
      name: navItems[0].name,
      link: navItems[0].link,
      icon: <NavHomeIcon className="h-6 w-6 fill-white hover:fill-purple" />,
    },
    {
      name: navItems[1].name,
      link: navItems[1].link,
      icon: <NavAboutIcon className="h-6 w-6 fill-white hover:fill-purple" />,
    },
    {
      name: navItems[2].name,
      link: navItems[2].link,
      icon: <NavSkillsIcon className="h-6 w-6 fill-white hover:fill-purple" />,
    },
    {
      name: navItems[3].name,
      link: navItems[3].link,
      icon: (
        <NavProjectsIcon className="h-6 w-6 fill-white hover:fill-purple" />
      ),
    },
    {
      name: navItems[4].name,
      link: navItems[4].link,
      icon: <NavContactIcon className="h-6 w-6 fill-white hover:fill-purple" />,
    },
  ];

  return (
    //! "page" luôn nên là Component Server
    //  - Và vì NextJs đã tự động tách code cho Component Server
    //  - Nên chỉ cần bọc các component con trong <Suspense>
    //  - Bạn có thể sử dụng tính năng "streaming" để gửi dần các phần UI từ server đến client
    //! Đây là kỹ thuật Streaming UI

    <main className="relative mx-auto flex flex-col items-center justify-center overflow-clip bg-black-100 px-5 sm:px-10">
      <div className="w-full max-w-7xl">
        {/* Navigation */}
        <FloatingNavbar navItems={navItemsWithIcons} />

        {/* Header */}
        <Suspense fallback={<LoadingSection />}>
          <Hero id={navItems[0].id} />
        </Suspense>

        {/* Body */}
        <Suspense fallback={<LoadingSection />}>
          <About id={navItems[1].id} />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <Skills id={navItems[2].id} />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <Projects id={navItems[3].id} />
        </Suspense>

        {/* Footer */}
        <Suspense fallback={<LoadingSection />}>
          <Contact id={navItems[4].id} />
        </Suspense>
      </div>
    </main>
  );
}
