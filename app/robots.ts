import { MetadataRoute } from "next";
import { seoConfig } from "@/data/seo/seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: seoConfig.robots.disallowPaths,
    },
    sitemap: `${seoConfig.baseUrl}/sitemap.xml`,
    host: seoConfig.baseUrl,
  };
}

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

/***
 * Test locally:
 * # Chạy development server
 *
 * ```
 * npm run dev
 * ```
 *
 * # Kiểm tra các URLs:
 * # http://localhost:3000/robots.txt
 ***/

/***
 * Validate online:
 * - SEO Tools: Test robots.txt compliance
 ***/

/***
 * Next.js App Router Requirements:
 *
 * ```
 * app/robots.ts → Tự động generate /robots.txt
 * ```
 *
 * ⚠️ PHẢI ở thư mục app/ để Next.js nhận diện
 ***/
