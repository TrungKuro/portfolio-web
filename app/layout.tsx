import "./globals.css";

import { ThemeProvider } from "next-themes";

import { Geist, Geist_Mono } from "next/font/google";

//! Tạm thời không dùng API Metadata
// import { Metadata } from "next";
// import { PortfolioMetadata } from "@/data/seo/metadata";

import { PortfolioMetadata } from "@/data/seo/PortfolioMetadata";
import { StructuredData } from "@/data/seo/StructuredData";

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
