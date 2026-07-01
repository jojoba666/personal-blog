import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostFrontmatter, PostQuery, TagWithCount } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

/** 获取所有已发布文章（按日期倒序） */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const filenames = fs.readdirSync(POSTS_DIR);

  const posts = filenames
    .filter((fn) => fn.endsWith(".mdx"))
    .map((fn) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, fn), "utf-8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;

      if (fm.draft) return null;

      const wordCount = content.split(/\s+/).length;
      return {
        slug: fm.slug || fn.replace(/\.mdx$/, ""),
        frontmatter: fm,
        content,
        readingTime: Math.max(1, Math.ceil(wordCount / 300)),
        wordCount,
        year: new Date(fm.date).getFullYear(),
        prevPost: null,
        nextPost: null,
      } as Post;
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

  // 填充相邻文章导航
  for (let i = 0; i < posts.length; i++) {
    if (i > 0) {
      posts[i].prevPost = {
        slug: posts[i - 1].slug,
        title: posts[i - 1].frontmatter.title,
        date: posts[i - 1].frontmatter.date,
      };
    }
    if (i < posts.length - 1) {
      posts[i].nextPost = {
        slug: posts[i + 1].slug,
        title: posts[i + 1].frontmatter.title,
        date: posts[i + 1].frontmatter.date,
      };
    }
  }

  return posts;
}

/** 按 slug 获取单篇文章 */
export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

/** 查询文章列表（分页、标签过滤） */
export function queryPosts(query: PostQuery) {
  let posts = getAllPosts();

  if (query.tag) {
    posts = posts.filter((p) => p.frontmatter.tags?.includes(query.tag!));
  }
  if (query.category) {
    posts = posts.filter((p) => p.frontmatter.category === query.category);
  }

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 10;
  const total = posts.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;

  return {
    posts: posts.slice(start, start + pageSize),
    total,
    totalPages,
  };
}

/** 获取所有标签及其计数 */
export function getAllTags(): TagWithCount[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  for (const p of posts) {
    for (const tag of p.frontmatter.tags ?? []) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** 搜索文章 */
export function searchPosts(q: string): Post[] {
  const kw = q.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.frontmatter.title.toLowerCase().includes(kw) ||
      p.frontmatter.description.toLowerCase().includes(kw) ||
      p.content.toLowerCase().includes(kw) ||
      p.frontmatter.tags?.some((t) => t.toLowerCase().includes(kw))
  );
}
