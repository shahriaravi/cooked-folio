import "./globals.css";

import { Providers } from "@/components/layout/Providers";
import { InitialSplash } from "@/components/common/InitialSplash";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { SiteFooterWrapper } from "@/components/layout/SiteFooterWrapper";
import { constructMetadata, siteConfig } from "@/lib/site-config";
import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = constructMetadata();

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shahriar Avi",
  alternateName: ["Avi", "shahriaravi", "shahriaravi_"],
  url: siteConfig.url,
  image: `${siteConfig.url}/avatar/avatar.png`,
  sameAs: [
    "https://twitter.com/shahriaravi_",
    "https://github.com/shahriaravi",
    "https://yoavi.fun",
    "https://shahriaravi.me",
  ],
  jobTitle: "Software Engineer",
  description:
    "Shahriar Avi is a software engineer, indie developer, and founder of Byontriq. Building Mate — a wallet tracker app.",
  knowsAbout: [
    "Software Engineering",
    "Web Development",
    "TypeScript",
    "Next.js",
    "React",
    "Product Design",
    "Indie Development",
    "Mobile Applications",
    "Wallet Tracker",
  ],
  nationality: "Bangladeshi",
  worksFor: {
    "@type": "Organization",
    name: "Byontriq",
    url: "https://byontriq.dev",
    description:
      "Software company founded by Shahriar Avi, building Mate wallet tracker app.",
  },
  owns: {
    "@type": "SoftwareApplication",
    name: "Mate",
    description: "A wallet tracker app built by Shahriar Avi via Byontriq.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS, Android",
    author: {
      "@type": "Person",
      name: "Shahriar Avi",
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shahriar Avi",
  alternateName: ["avi.portfolio", "yoavi.fun", "shahriaravi.me"],
  url: siteConfig.url,
  description:
    "Personal portfolio of Shahriar Avi — software engineer, indie developer, and founder of Byontriq.",
  author: {
    "@type": "Person",
    name: "Shahriar Avi",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${GeistMono.variable} darkreader-ignore`}
      data-darkreader-ignore=""
    >
      <head>
        <meta name="darkreader-lock" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="flex min-h-[100dvh] flex-col font-sans bg-background text-foreground antialiased selection:bg-primary/20">
        <Providers>
          <InitialSplash>
            <NavbarWrapper />
            <div className="flex-1">{children}</div>
            <SiteFooterWrapper />
          </InitialSplash>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}