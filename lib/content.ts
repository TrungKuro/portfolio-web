/* ------------------------------------------------------------------------- */
/*                         Load JSON từ CMS "Sanity"                         */
/* ------------------------------------------------------------------------- */

//?

/* ------------------------------------------------------------------------- */
/*                        Load JSON từ thư mục "data"                        */
/* ------------------------------------------------------------------------- */

import header from "@/data/sections/header.json";
import about from "@/data/sections/about.json";
import skills from "@/data/sections/skills.json";
import projects from "@/data/sections/projects.json";
import contact from "@/data/sections/contact.json";
import footer from "@/data/sections/footer.json";
//
import indexData from "@/data/sections/index.json";

// Các hàm Export để dùng tại các Section
export const getHeaderData = () => header;
export const getAboutData = () => about;
export const getSkillsData = () => skills;
export const getProjectsData = () => projects;
export const getContactData = () => contact;
export const getFooterData = () => footer;
//
export const getIndexData = () => indexData;
