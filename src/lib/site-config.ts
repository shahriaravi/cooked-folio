import { Metadata } from "next";

// =================================================================================
// 1. BASE CONFIGURATION
// =================================================================================

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

export const siteConfig = {
  name: "avi",
  username: "shahriaravi_",
  description:
    "code alchemist ⚗️ building things. turning ideas into products. founder @byontriq",
  url: BASE_URL,
  ogImage: "/og-image.png?v1",
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
  other?: Record<string, string>;
}

export function constructMetadata({
  title = "avi — code alchemist ⚗️",
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  other,
}: MetadataProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s`,
    },
    description,

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

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@shahriaravi_",
    },

    icons: {
      icon: icons,
      shortcut: icons,
      apple: icons,
    },

    metadataBase: new URL(siteConfig.url),

    other: {
      "darkreader-lock": "",
      ...(other || {}),
    },

    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}