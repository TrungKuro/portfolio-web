import type { Metadata } from "next";
import { seoConfig } from "./seo-config";

export const PortfolioMetadata: Metadata = {
  // ✅ Base URL đúng cách
  metadataBase: new URL(seoConfig.baseUrl),

  // ✅ Title tối ưu SEO (< 60 ký tự)
  title: "Hoang Trung - Full-Stack Developer | React, Next.js, Flutter Expert",

  // ✅ Description tối ưu (155-160 ký tự)
  description:
    "Full-Stack Developer specializing in React, Next.js, and Flutter. 3+ years experience building scalable web & mobile apps with TypeScript, Node.js, and modern tech stack. Based in Ho Chi Minh City, available for remote projects.",

  // ✅ Open Graph cho social media
  openGraph: {
    title: "Hoang Trung - Full-Stack Developer Portfolio",
    description:
      "Experienced Full-Stack Developer with expertise in React, Next.js, Flutter, and TypeScript. Building clean, scalable applications with modern tech stack.",
    url: seoConfig.baseUrl,
    siteName: "Hoang Trung Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: seoConfig.images.ogImage,
        width: 1200,
        height: 630,
        alt: "Hoang Trung - Full-Stack Developer",
      },
    ],
  },

  // ✅ Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Hoang Trung - Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, Flutter. Available for remote projects worldwide.",
    images: [seoConfig.images.profileImage],
  },

  // ✅ Keywords strategy tốt
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Flutter Developer",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Mobile Developer",
    "Remote Developer",
    "Freelancer",
    "Ho Chi Minh City",
    "Vietnam Developer",
    "Portfolio",
  ],

  authors: [{ name: "Hoang Trung" }],
  creator: "Hoang Trung",
  publisher: "Hoang Trung",

  // Structured Data
  other: {
    "google-site-verification": seoConfig.verification.google,
    "msvalidate.01": seoConfig.verification.bing,
  },

  // ✅ Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: seoConfig.baseUrl,
  },
};

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

/***
 * Các điểm mạnh của meta description này:
 *
 * 1. Title Tag Optimization
 * - Chứa tên thương hiệu: "Hoang Trung"
 * - Keywords chính: "Full-Stack Developer", "React", "Next.js", "Flutter"
 * - Dưới 60 ký tự để tránh bị cắt trên Google
 *
 * 2. Description Tag
 * - Dài 155-160 ký tự (tối ưu cho Google)
 * - Chứa keywords quan trọng
 * - Call-to-action: "available for remote projects"
 * - Địa điểm: "Ho Chi Minh City"
 *
 * 3. Keywords Strategy
 * - Primary: Full-Stack Developer, React, Next.js, Flutter
 * - Secondary: TypeScript, JavaScript, Node.js
 * - Long-tail: Remote Developer Vietnam, Ho Chi Minh City Developer
 * - Semantic: Web Developer, Mobile Developer, Frontend, Backend
 *
 * 4. Local SEO
 * - "Ho Chi Minh City" cho local search
 * - "Vietnam Developer" cho regional targeting
 *
 * 5. Social Media Optimization
 * - Open Graph tags cho Facebook, LinkedIn
 * - Twitter Cards cho Twitter
 * - Rich previews khi share link
 ***/

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

/***
 * ⚠️ Thay thế các placeholder:
 * - https://your-domain.com → domain thực tế
 * - Social media links → links thực tế
 *
 * Test metadata với tools như:
 * - Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/)
 * - Twitter Card Validator (https://cards-dev.x.com/validator)
 * - Google Rich Results Test (https://search.google.com/test/rich-results)
 ***/
