// Structured Data JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hoang Trung",
  jobTitle: "Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React, Next.js, and Flutter with 3+ years experience building scalable web & mobile applications.",
  url: seoConfig.baseUrl,
  image: `${seoConfig.baseUrl}${seoConfig.images.profileImage}`,
  sameAs: [
    seoConfig.socialMedia.github,
    seoConfig.socialMedia.linkedin,
    seoConfig.socialMedia.twitter,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "Vietnam",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Flutter",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Material-UI",
    "Express.js",
    "MySQL",
    "MongoDB",
    "Firebase",
    "Git",
    "Figma",
    "Web Development",
    "Mobile Development",
    "Frontend Development",
    "Backend Development",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Developer",
    occupationLocation: {
      "@type": "City",
      name: "Ho Chi Minh City, Vietnam",
    },
    skills: [
      "React Development",
      "Next.js Development",
      "Flutter Development",
      "TypeScript Programming",
      "JavaScript Programming",
      "Node.js Development",
      "Database Design",
      "API Development",
      "Mobile App Development",
      "Web Application Development",
    ],
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Engineering Background", // Có thể thêm tên trường cụ thể nếu muốn
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelance Developer",
  },
};

// Website Structured Data
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hoang Trung Portfolio",
  description:
    "Full-Stack Developer Portfolio showcasing React, Next.js, and Flutter projects",
  url: seoConfig.baseUrl,
  author: {
    "@type": "Person",
    name: "Hoang Trung",
  },
  inLanguage: "en",
  copyrightYear: new Date().getFullYear(),
  genre: "Portfolio",
};

// Professional Service Structured Data
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Hoang Trung - Full-Stack Development Services",
  description:
    "Professional web and mobile application development services using React, Next.js, and Flutter",
  provider: {
    "@type": "Person",
    name: "Hoang Trung",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Web Development",
    "Mobile App Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
  ],
  url: seoConfig.baseUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "Vietnam",
  },
};

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

import React from "react";
import { seoConfig } from "./seo-config";

export const StructuredData = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
    </>
  );
};

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

/***
 * Các loại Structured Data đã thêm:
 *
 * 1. Person Schema
 * - Thông tin cá nhân, kỹ năng, địa chỉ
 * - Giúp Google hiểu bạn là ai và làm gì
 * - Có thể xuất hiện trong Knowledge Panel
 *
 * 2. WebSite Schema
 * - Thông tin về trang web portfolio
 * - Tối ưu cho site links trong search results
 * - Cải thiện site authority
 *
 * 3. ProfessionalService Schema
 * - Dịch vụ phát triển phần mềm của bạn
 * - Targeting cho local business search
 * - Hiển thị rich snippets cho services
 *
 * Lợi ích của JSON-LD này:
 * ✅ Rich Snippets: Có thể hiển thị với rating, location, skills
 * ✅ Knowledge Panel: Google có thể tạo knowledge panel cho bạn
 * ✅ Local SEO: Tối ưu cho tìm kiếm "developer in Ho Chi Minh City"
 * ✅ Voice Search: Tối ưu cho câu hỏi như "Who is Hoang Trung?"
 * ✅ Social Media: LinkedIn, Facebook hiểu rõ hơn profile của bạn
 ***/

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

/***
 * 👉🏻 Test Structured Data:
 * - Google Rich Results Test
 * - Schema.org Validator
 *
 * 🏆 Monitor Performance:
 * - Google Search Console
 * - Theo dõi rich snippets xuất hiện
 ***/
