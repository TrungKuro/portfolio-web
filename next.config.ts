import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

interface WebpackRule {
  test?: {
    test?: (path: string) => boolean;
  };
  issuer?: {
    and?: string[];
  };
  resourceQuery?:
    | {
        not?: RegExp[];
      }
    | RegExp;
  exclude?: RegExp;
  use?: string[];
}

const nextConfig: NextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: WebpackRule) =>
      rule.test?.test?.(".svg")
    );

    if (!fileLoaderRule) {
      throw new Error("File loader rule not found");
    }

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  compiler: {
    // Chỉ xóa console trong production
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    // Danh sách các gói được "tối ưu tự động" không cần thêm vào
    //   - https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports
    //!  - Chỉ thêm "tên gói chính" (PACKAGE-LEVEL) vào đây
    optimizePackageImports: [
      //! Đây là danh sách các gói từ script "analyze-imports.js" sau khi quét project có sử dụng "barrel-import"
      //
      // "react", // ❌ đây là gói cốt lõi, không cần optimize
      // "next", // ❌ gói cốt lõi của Next.js
      //
      // Đây là các module cụ thể, không phải package-level
      // "next/link",
      // "next/image",
      // "next/font/google",
      // "next/dynamic",
      // "react-dom/server",
      //
      // "react-icons/fa", // ❌ có hỗ trợ "react-icons" tự động
      // "@mui/material/Tooltip", // ❌ có hỗ trợ "@mui/material" tự động

      // 3D Libraries
      "three",
      "three-globe",
      "@react-three/fiber",
      "@react-three/drei",

      // UI Libraries
      "motion", // thay vì "motion/react"

      // Other libraries
      "next-themes",
      "react-intersection-observer",
      "lottie-react",
    ],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
