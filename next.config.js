/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "ts", "tsx"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co", port: "", pathname: "/image/**" },
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
    formats: ["image/webp"],
  },

experimental: {
  outputFileTracingIncludes: {
    "/opengraph-image": [
      "./public/images/og-bg.png",
      "./public/avatar/avatar.png",
      "./public/fonts/Inter-Regular.ttf",
      "./public/fonts/Inter-Bold.ttf",
    ],
    "/writing/opengraph-image": [
      "./public/images/og-bg.png",
      "./public/avatar/avatar.png",
      "./public/fonts/Inter-Regular.ttf",
      "./public/fonts/Inter-Bold.ttf",
    ],
    "/writing/[slug]/opengraph-image": [
      "./public/images/og-bg.png",
      "./public/avatar/avatar.png",
      "./public/fonts/Inter-Regular.ttf",
      "./public/fonts/Inter-Bold.ttf",
      "./src/content/writing/**/*.mdx",
    ],
  },
},

  reactStrictMode: true,
};

module.exports = nextConfig;