// SEO Configuration - Centralized config for all SEO-related settings
export const seoConfig = {
  // ✅ Dynamic base URL với fallback
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // ✅ [ robots.txt ] configuration
  robots: {
    disallowPaths: [
      "/api/", // Ẩn API routes nếu có
      "/_next/", // Ẩn Next.js internal files
      "/admin/", // Ẩn admin pages nếu có
      "*.json", // Ẩn data files
      "/data/", // Ẩn data files
      "/.env*", // Ẩn environment files
    ],
    allowPaths: ["/images/", "/assets/", "/public/"],
  },

  // ✅ [ sitemap.ts ] configuration
  sitemap: {
    staticPages: [
      {
        path: "",
        changeFrequency: "monthly" as const,
        priority: 1.0,
      },
    ],
    sectionPages: [
      {
        path: "#about",
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        path: "#skills",
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        path: "#projects",
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        path: "#contact",
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ],
  },

  // ✅ Social media links thực tế
  socialMedia: {
    github: "https://github.com/TrungKuro",
    linkedin: "https://www.linkedin.com/in/trungkuro/",
    twitter: "https://x.com/Trung_Kuro",
  },

  // ✅ Verification codes
  verification: {
    google: "your-google-verification-code",
    bing: "your-bing-verification-code",
  },

  // ✅ Image paths for OG and structured data
  images: {
    profileImage: "/images/profile/about-me-100922.jpg",
    ogImage: "/images/profile/about-me-251123.jpg",
  },
};
