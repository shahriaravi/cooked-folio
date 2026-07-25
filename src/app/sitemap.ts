import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/writing";
import { getAllCraftComponents } from "@/lib/craft";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shahriaravi.me";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/craft`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/donate`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const posts = getAllPosts().map((post) => ({
    url: `${base}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const craftComponents = getAllCraftComponents().map((c) => ({
    url: `${base}/craft/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts, ...craftComponents];
}