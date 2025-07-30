import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { getHeaderData } from "@/lib/content";
import NavHomeIcon from "@/public/assets/icons/nav-home.svg";
import NavAboutIcon from "@/public/assets/icons/nav-about.svg";
import NavSkillsIcon from "@/public/assets/icons/nav-skills.svg";
import NavProjectsIcon from "@/public/assets/icons/nav-projects.svg";
import NavContactIcon from "@/public/assets/icons/nav-contact.svg";

import Hero from "@/components/sections/Hero";
import Grid from "@/components/sections/Grid";
import RecentProjects from "@/components/sections/RecentProjects";
import Clients from "@/components/sections/Clients";
import Experience from "@/components/sections/Experience";
import Approach from "@/components/sections/Approach";
import Footer from "@/components/sections/Footer";

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
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full">
        {/* Navigation */}
        <FloatingNavbar navItems={navItemsWithIcons} />

        {/* Header */}
        <Hero id={navItems[0].id} />

        {/* Body */}
        <Grid id={navItems[1].id} />
        <RecentProjects id={navItems[2].id} />
        <Clients id={navItems[3].id} />
        <Experience id="" />
        <Approach id="" />

        {/* Footer */}
        <Footer id={navItems[4].id} />
      </div>
    </main>
  );
}
