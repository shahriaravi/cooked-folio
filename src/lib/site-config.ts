import { Metadata } from "next";

// =================================================================================
// 1. BASE CONFIGURATION
// =================================================================================

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://avi.byontriq.xyz";

export const siteConfig = {
  name: "avi",
  username: "shahriaravi_",
  description: "founder & swe @byontriq. building things with next.js, caffeine & monke energy.",
  url: BASE_URL,
  ogImage: "/og-img.png",
  links: {
    twitter: "https://twitter.com/shahriaravi_",
    github: "https://github.com/shahriaravi",
  },
};

// =================================================================================
// 2. METADATA GENERATOR
// =================================================================================

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string | Array<any>;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "avi — software engineer & founder",
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    // 1. Basic Metadata
    title: {
      default: title,
      template: `%s`,
    },
    description,
    
    // 2. Open Graph (Facebook, Discord, etc.)
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: "avi.portfolio",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },

    // 3. Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@shahriaravi_",
    },

    // 4. Icons
    icons: {
      icon: icons,
      shortcut: icons,
      apple: icons,
    },

    // 5. Technical SEO
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}