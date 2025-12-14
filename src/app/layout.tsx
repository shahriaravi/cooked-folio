import "./globals.css";

import { Providers } from "@/components/layout/Providers";
import { InitialSplash } from "@/components/ui/InitialSplash";
import { constructMetadata } from "@/lib/site-config";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = constructMetadata({
  title: "avi.portfolio",
  description:
    "software engineer & founder. fueled by caffeine, anime and production bugs.",
  icons: "/favicon.ico",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistMono.className} bg-background text-foreground antialiased selection:bg-primary/20`}
      >
        <Providers>
          <InitialSplash>{children}</InitialSplash>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}