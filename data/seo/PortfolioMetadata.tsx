import React from "react";

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

export const PortfolioMetadata = () => {
  return (
    <>
      {/* ✅ Essential Meta Tags */}
      <title>
        Hoang Trung - Full-Stack Developer | React, Next.js, Flutter Expert
      </title>
      <meta
        name="description"
        content="Full-Stack Developer specializing in React, Next.js, and Flutter. 3+ years experience building scalable web & mobile apps with TypeScript, Node.js, and modern tech stack. Based in Ho Chi Minh City, available for remote projects."
      />
      <meta
        name="keywords"
        content="Full-Stack Developer, React Developer, Next.js Developer, Flutter Developer, TypeScript, JavaScript, Node.js, Frontend Developer, Backend Developer, Web Developer, Mobile Developer, Remote Developer, Freelancer, Ho Chi Minh City, Vietnam Developer, Portfolio"
      />
      <meta name="author" content="Hoang Trung" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <link rel="canonical" href="http://localhost:3000" />

      {/* ✅ Open Graph Meta Tags */}
      <meta
        property="og:title"
        content="Hoang Trung - Full-Stack Developer Portfolio"
      />
      <meta
        property="og:description"
        content="Experienced Full-Stack Developer with expertise in React, Next.js, Flutter, and TypeScript. Building clean, scalable applications with modern tech stack."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://localhost:3000" />
      <meta
        property="og:image"
        content="http://localhost:3000/images/profile/about-me-251123.jpg"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Hoang Trung - Full-Stack Developer"
      />
      <meta property="og:site_name" content="Hoang Trung Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* ✅ Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Hoang Trung - Full-Stack Developer" />
      <meta
        name="twitter:description"
        content="Full-Stack Developer specializing in React, Next.js, Flutter. Available for remote projects worldwide."
      />
      <meta
        name="twitter:image"
        content="http://localhost:3000/images/profile/about-me-100922.jpg"
      />
    </>
  );
};
