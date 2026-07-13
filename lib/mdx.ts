import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTimeFn from "reading-time";
import type { CategorySlug } from "./site";

export type ArticleFrontmatter = {
  title: string;
  description: string;
  keywords?: string[];
  category: CategorySlug;
  author?: string;
  date: string;
  readingTime?: string;
  image?: string;
  imageAlt?: string;
  draft?: boolean;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
  readingMinutes: number;
};

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function ensureDir(): void {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

export function getArticleSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;
  const stats = readingTimeFn(content);
  return {
    ...fm,
    slug,
    content,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    readingTime: fm.readingTime ?? `${Math.max(1, Math.round(stats.minutes))} min`,
  };
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== null && a.draft !== true)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const all = getAllArticles().filter((a) => a.slug !== article.slug);
  const sameCat = all.filter((a) => a.category === article.category);
  const others = all.filter((a) => a.category !== article.category);
  return [...sameCat, ...others].slice(0, limit);
}

const CATEGORIES_DIR = path.join(process.cwd(), "content", "categories");

export function getCategoryContent(slug: CategorySlug): string | null {
  const filePath = path.join(CATEGORIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  return content;
}
