import fs from "fs";
import path from "path";
import matter from "gray-matter";

const LAB_DIR = path.join(process.cwd(), "src/content/lab");

export interface LabFrontmatter {
  title: string;
  description: string;
  component: string;
  dependencies?: string[];
  tags?: string[];
}

export interface LabMeta {
  slug: string;
  title: string;
  description: string;
  component: string;
  dependencies: string[];
  tags: string[];
}

export interface LabComponent extends LabMeta {
  content: string;
}

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

function getAllFilenames(): string[] {
  if (!fs.existsSync(LAB_DIR)) return [];
  return fs
    .readdirSync(LAB_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function parseFile(filename: string): LabComponent {
  const fullPath = path.join(LAB_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = data as LabFrontmatter;

  return {
    slug: slugify(filename),
    title: frontmatter.title,
    description: frontmatter.description,
    component: frontmatter.component,
    dependencies: frontmatter.dependencies ?? [],
    tags: frontmatter.tags ?? [],
    content,
  };
}

export function getAllLabComponents(): LabMeta[] {
  const filenames = getAllFilenames();
  const components = filenames.map((filename) => {
    const comp = parseFile(filename);
    const { content, ...meta } = comp;
    return meta;
  });

  return components.sort((a, b) => a.title.localeCompare(b.title));
}

export function getLabComponentBySlug(slug: string): LabComponent | null {
  const filenames = getAllFilenames();
  const filename = filenames.find((f) => slugify(f) === slug);
  if (!filename) return null;
  return parseFile(filename);
}

export function getAllLabSlugs(): string[] {
  return getAllFilenames().map(slugify);
}