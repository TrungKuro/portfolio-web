import { MetadataRoute } from "next";
import { seoConfig } from "@/data/seo/seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const { baseUrl, sitemap: sitemapConfig } = seoConfig;

  // Static pages
  const staticPages = sitemapConfig.staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Section pages (for anchor links - optional but helpful for SEO)
  const sectionPages = sitemapConfig.sectionPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticPages, ...sectionPages];
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
 * # http://localhost:3000/sitemap.xml
 ***/

/***
 * Validate online:
 * - Google Search Console: Submit sitemap
 * - Bing Webmaster Tools: Submit sitemap
 ***/

/***
 * Next.js App Router Requirements:
 *
 * ```
 * app/sitemap.ts → Tự động generate /sitemap.xml
 * ```
 *
 * ⚠️ PHẢI ở thư mục app/ để Next.js nhận diện
 ***/
