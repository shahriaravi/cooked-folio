import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shahriaravi.me";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const posts = getAllPosts().map((post) => ({
    url: `${base}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}