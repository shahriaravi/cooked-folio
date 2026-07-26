import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

export const siteConfig = {
  name: "Shahriar Avi",
  shortName: "avi",
  username: "shahriaravi_",
  title: "Shahriar Avi",
  description:
    "Shahriar Avi is a design engineer and founder of Byontriq. Building apps, websites, and extensions with obsessive attention to detail. Working globally.",
  url: BASE_URL,
  ogImage: `${BASE_URL}/opengraph-image`,
  keywords: [
  "Shahriar Avi",
  "Avi",
  "shahriaravi",
  "shahriaravi.me",
  "design engineer",
  "design engineer portfolio",
  "product engineer",
  "product engineer portfolio",
  "Byontriq",
  "Byontriq founder",
  "founder design engineer",
  "indie developer",
  "solo developer",
  "indie hacker",
  "creative developer",
  "frontend developer with design skills",
  "UI engineer",
  "interaction designer",
  "web designer developer",
  "Next.js developer",
  "TypeScript developer",
  "React developer",
  "Tailwind CSS developer",
  "MDX blog",
  "shadcn ui developer",
  "component library developer",
  "micro interactions developer",
  "animation developer",
  "editorial web design",
  "portfolio design engineer",
  "hire design engineer",
  "hire product engineer",
  "hire indie developer",
  "design engineer Bangladesh",
  "design engineer for hire",
  "freelance design engineer",
  "Bangladesh developer",
  "Bangladeshi design engineer",
  "software engineer Bangladesh",
  "design engineer USA",
  "design engineer Germany",
  "design engineer India",
  "open source developer",
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
          alt: "Shahriar Avi, Design Engineer and Founder of Byontriq",
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