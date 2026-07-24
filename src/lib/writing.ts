import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const WRITING_DIR = path.join(process.cwd(), "src/content/writing");

export interface PostFrontmatter {
  title: string;
  date: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  wordCount: number;
}

export interface Post extends PostMeta {
  content: string;
}

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

function getAllFilenames(): string[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  return fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function parseFile(filename: string): Post {
  const fullPath = path.join(WRITING_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    slug: slugify(filename),
    title: frontmatter.title,
    date: frontmatter.date,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} m`,
    wordCount: stats.words,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const filenames = getAllFilenames();
  const posts = filenames.map((filename) => {
    const post = parseFile(filename);
    const { content, ...meta } = post;
    return meta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filenames = getAllFilenames();
  const filename = filenames.find((f) => slugify(f) === slug);
  if (!filename) return null;
  return parseFile(filename);
}

export function getAllSlugs(): string[] {
  return getAllFilenames().map(slugify);
}

export function getRelatedPosts(currentSlug: string, limit = 4): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}