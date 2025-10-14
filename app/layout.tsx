import "./globals.css";

import { ThemeProvider } from "next-themes";

import { Geist, Geist_Mono } from "next/font/google";

//! Tạm thời không dùng API Metadata
// import { Metadata } from "next";
// import { PortfolioMetadata } from "@/data/seo/metadata";

import { PortfolioMetadata } from "@/data/seo/PortfolioMetadata";
import { StructuredData } from "@/data/seo/StructuredData";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ⭐ THÊM: hiển thị fallback ngay, swap khi font ready
  preload: true,
  fallback: ["system-ui", "arial"], // ⭐ THÊM: fallback stack
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // ⭐ THÊM
  preload: true,
  fallback: ["courier new", "monospace"], // ⭐ THÊM
});

//! Vô hiệu tạm thời vì lý do nào đó API Metadata hoạt động chưa đúng
// export const metadata: Metadata = PortfolioMetadata;

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* MetaData */}
        <PortfolioMetadata />
        {/* JSON-LD Structured Data */}
        <StructuredData />
        {/* 🔥 Inline Critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --background: #ffffff;
              --foreground: #171717;
            }
            @media (prefers-color-scheme: dark) {
              :root {
                --background: #1e1e2f;
                --foreground: #fdfdfe;
              }
            }
            html {
              scroll-behavior: smooth;
            }
            body {
              background: var(--background);
              color: var(--foreground);
              font-family: Arial, Helvetica, sans-serif;
            }
            * {
              user-select: none;
            }
          `,
          }}
        />
      </head>
      <body
        className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
