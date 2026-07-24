import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

export const siteConfig = {
  name: "Shahriar Avi",
  shortName: "avi",
  username: "shahriaravi_",
  title: "Shahriar Avi",
  description:
    "Shahriar Avi is a software engineer, indie developer, and founder of Byontriq. Building Mate — a wallet tracker app. Based in Bangladesh, working globally.",
  url: BASE_URL,
  ogImage: `${BASE_URL}/og-image.png?v1`,
  keywords: [
    "Shahriar Avi",
    "Avi",
    "shahriaravi",
    "Byontriq",
    "Byontriq founder",
    "Mate app",
    "Mate wallet tracker",
    "wallet tracker app",
    "software engineer Bangladesh",
    "indie developer",
    "solo developer",
    "web engineer",
    "web designer",
    "full stack developer",
    "Next.js developer",
    "TypeScript developer",
    "React developer",
    "software engineer",
    "frontend engineer",
    "product engineer",
    "indie hacker",
    "Bangladesh developer",
    "Bangladeshi software engineer",
    "software engineer USA",
    "software engineer Germany",
    "software engineer India",
    "open source developer",
    "yoavi.fun",
    "shahriaravi.me",
  ],
  links: {
    twitter: "https://twitter.com/shahriaravi_",
    github: "https://github.com/shahriaravi",
  },
  author: {
    name: "Shahriar Avi",
    url: BASE_URL,
    twitter: "@shahriaravi_",
  },
};

interface MetadataProps {
  noIndex?: boolean;
  other?: Record<string, string>;
  canonicalUrl?: string;
}

export function constructMetadata({
  noIndex = false,
  other,
  canonicalUrl = siteConfig.url,
}: MetadataProps = {}): Metadata {
  return {
    title: "Shahriar Avi",
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,

    openGraph: {
      title: "Shahriar Avi",
      description: siteConfig.description,
      url: canonicalUrl,
      siteName: "Shahriar Avi",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: "Shahriar Avi — Software Engineer & Founder of Byontriq",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Shahriar Avi",
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.author.twitter,
      site: siteConfig.author.twitter,
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },

    metadataBase: new URL(siteConfig.url),

    alternates: {
      canonical: canonicalUrl,
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    other: {
      "darkreader-lock": "",
      ...(other || {}),
    },
  };
}