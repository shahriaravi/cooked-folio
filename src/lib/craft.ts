import fs from "fs";
import matter from "gray-matter";
import path from "path";

const CRAFT_DIR = path.join(process.cwd(), "src/content/craft");

export interface CraftFrontmatter {
  title: string;
  description: string;
  component: string;
  dependencies?: string[];
  tags?: string[];
  order?: number;
}

export interface CraftMeta {
  slug: string;
  title: string;
  description: string;
  component: string;
  dependencies: string[];
  tags: string[];
  order: number;
}

export interface CraftComponent extends CraftMeta {
  content: string;
}

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

function getAllFilenames(): string[] {
  if (!fs.existsSync(CRAFT_DIR)) return [];
  return fs
    .readdirSync(CRAFT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function parseFile(filename: string): CraftComponent {
  const fullPath = path.join(CRAFT_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = data as CraftFrontmatter;

  return {
    slug: slugify(filename),
    title: frontmatter.title,
    description: frontmatter.description,
    component: frontmatter.component,
    dependencies: frontmatter.dependencies ?? [],
    tags: frontmatter.tags ?? [],
    order: frontmatter.order ?? 999,
    content,
  };
}

export function getAllCraftComponents(): CraftMeta[] {
  const filenames = getAllFilenames();
  const components = filenames.map((filename) => {
    const comp = parseFile(filename);
    const { content, ...meta } = comp;
    return meta;
  });

  return components.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export function getCraftComponentBySlug(slug: string): CraftComponent | null {
  const filenames = getAllFilenames();
  const filename = filenames.find((f) => slugify(f) === slug);
  if (!filename) return null;
  return parseFile(filename);
}

export function getAllCraftSlugs(): string[] {
  return getAllFilenames().map(slugify);
}