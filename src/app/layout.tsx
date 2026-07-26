import "./globals.css";

import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Providers } from "@/components/layout/Providers";
import { SiteFooterWrapper } from "@/components/layout/SiteFooterWrapper";
import { constructMetadata, siteConfig } from "@/lib/site-config";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

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
    "https://shahriaravi.me",
  ],
  jobTitle: "Design Engineer",
  description:
    "Shahriar Avi is a design engineer and founder of Byontriq. Building apps, websites, and extensions with obsessive attention to detail.",
  knowsAbout: [
    "Design Engineering",
    "Product Engineering",
    "Web Development",
    "TypeScript",
    "Next.js",
    "React",
    "Product Design",
    "Micro Interactions",
    "Indie Development",
    "Mobile Applications",
    "Browser Extensions",
  ],
  nationality: "Bangladeshi",
  worksFor: {
    "@type": "Organization",
    name: "Byontriq",
    url: "https://byontriq.dev",
    description:
      "Software studio founded by Shahriar Avi, building apps, websites, and extensions.",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shahriar Avi",
  alternateName: ["avi.portfolio", "shahriaravi.me"],
  url: siteConfig.url,
  description:
    "Personal portfolio of Shahriar Avi, design engineer and founder of Byontriq.",
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

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    if (theme === 'light') {
      document.documentElement.style.colorScheme = 'light';
      document.documentElement.style.backgroundColor = '#eef1f5';
    } else {
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.style.backgroundColor = '#0a1024';
    }
    document.documentElement.setAttribute('data-theme-ready', 'true');
  } catch (e) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    document.documentElement.style.backgroundColor = '#0a1024';
    document.documentElement.setAttribute('data-theme-ready', 'true');
  }
})();
`;

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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-[100dvh] flex-col font-sans bg-background text-foreground antialiased selection:bg-primary/20"
      >
        <Providers>
          <NavbarWrapper />
          <div className="flex-1">{children}</div>
          <SiteFooterWrapper />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
