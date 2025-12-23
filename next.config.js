/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "ts", "tsx"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.scdn.co", port: "", pathname: "/image/**" },
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
    formats: ["image/webp"],
  },

  reactStrictMode: true,
};

module.exports = nextConfig;